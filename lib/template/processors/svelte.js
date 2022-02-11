// We need this so Svelte components can import other Svelte files.
// Because the compiled component still contains require("./foo.svelte") calls.
require('svelte/register')({
  extensions: ['.svelte'],
  hydratable: true,
});

var path = require('path');
var requireFromString = require('require-from-string');
var rpc = require('sync-rpc');
var devalue = require('devalue');
var { compile } = require('svelte/compiler');
var TerraformError = require('../../error').TerraformError;

var esbuildClient = rpc(path.join(__dirname, 'svelte-esbuild-worker.js'));

module.exports = function (fileContents, options) {
  return {
    compile: function () {
      var serverResult = compile(fileContents.toString(), {
        generate: 'ssr',
        format: 'cjs',
        hydratable: true,
      });

      var componentModule = requireFromString(serverResult.js.code, options.filename, {
        appendPaths: [],
      });

      var Component = componentModule.default;
      var hasProgessiveFlag = componentModule.progressive;

      // Progressive components cannot use exports such as `partial` because they don't work on the client.
      if (hasProgessiveFlag) {
        for (var i = 0; i < serverResult.vars.length; i++) {
          var v = serverResult.vars[i];

          // Exposing "public" would mean serializing the entire object to the client.
          if (['partial', 'public'].includes(v.export_name)) {
            throw new Error(`Cannot use "${v.export_name}" in progressive components`);
          }
        }
      }

      return function render(args) {
        var rendered = Component.render(Object.assign({}, args, { enhanced: false }));

        var clientScript = '';

        // Compile the client script if needed.
        if (hasProgessiveFlag) {
          // E.g. `current`, but only if it is actually used.
          var extraProps = {};

          // For every exported component prop that is also a local, add it to the props.
          // In other words: if a component uses a local such as `current` it will be serialized to the client.
          serverResult.vars.forEach(function (v) {
            // Exported component variable.
            if (!v.module && v.export_name) {
              if (
                // Only expose these two for now, since I see value in both and they're trivial.
                ['current', 'environment'].includes(v.export_name) &&
                Object.prototype.hasOwnProperty.call(args, v.export_name)
              ) {
                extraProps[v.export_name] = args[v.export_name];
              }
            }
          });

          // TODO: In case we want to remove inline scripts and use external scripts,
          // we can just generate a nanoid() and add that to the div
          // instead of relying on the position (previousElementSibling) here.
          var clientWrapper = `
            import Component from ${devalue(options.filename)}

            new Component({
              // The <div> wrapper right before this script.
              target: document.currentScript.previousElementSibling,
              hydrate: true,
              props: {
                enhanced: true,
                ...(${devalue(extraProps)})
              }
            });
          `;

          clientScript = esbuildClient({
            stdin: {
              contents: clientWrapper,
              resolveDir: path.dirname(options.filename),
              sourcefile: 'harp-svelte-inline-wrapper.js',
            },
            bundle: true,
            minify: true,
            write: false,
          }).outputFiles[0].text;
        }

        var styleBlock = '';

        if (serverResult.css.code) {
          styleBlock = `<style>${rendered.css.code}</style>`;
        }

        var scriptBlock = '';

        if (clientScript) {
          scriptBlock = `<script>${clientScript}</script>`;
        }

        return `<div style="display: contents;">${rendered.html}</div>${scriptBlock}${styleBlock}`;
      };
    },

    parseError: function (error) {
      console.error(error);
      var arr = error.message.split('\n');
      var path_arr = arr[0].split(':');

      error.lineno = parseInt(error.lineno || path_arr[path_arr.length - 1] || -1);
      error.message = arr[arr.length - 1];
      error.source = 'Svelte';
      error.dest = 'HTML';
      error.filename = error.path || options.filename;
      error.stack = fileContents.toString();

      return new TerraformError(error);
    },
  };
};
