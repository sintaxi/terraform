require('svelte/register')({
  extensions: ['.svelte'],
  hydratable: true,
});

var fs = require('fs');
var esbuild = require('esbuild');
var { compile } = require("svelte/compiler");
var TerraformError = require("../../error").TerraformError

module.exports = function(fileContents, options){

  return {
    compile: function(){
      var Component = require(options.filename).default;

      Object.keys(require.cache).forEach(function(key) {
        if(key.endsWith('.svelte')) {
          delete require.cache[key];
        }
      });

      // Now compile again for client side script.
      var result = compile(fileContents.toString(), {
        hydratable: true
      });

      console.log(result);

      fs.writeFileSync('a-temporary-component-file.js', result.js.code);

      var clientWrapper = `
        import Component from './a-temporary-component-file.js'

        let scripts = document.getElementsByTagName('script');
        let thisInlineScript = scripts[scripts.length - 1]

        new Component({
          // The <div> wrapper.
          target: thisInlineScript.previousElementSibling,
          hydrate: true
        });
      `;

      fs.writeFileSync('a-temporary-input-file.js', clientWrapper);

      // Create client bundle
      esbuild.buildSync({
        entryPoints: ['a-temporary-input-file.js'],
        bundle: true,
        minify: true,
        outfile: 'a-temporary-output-file.js',
      })

      var clientScript = fs.readFileSync('a-temporary-output-file.js');

      return function(args) {
        console.log(args);
        var rendered = Component.render(args);
        console.log(rendered);
        return `<div style="display: contents;">${rendered.html}</div><script>${clientScript}</script><style>${rendered.css.code}</style>`;
      };
    },

    parseError: function(error){
      console.error(error);
      var arr = error.message.split("\n")
      var path_arr = arr[0].split(":")

      error.lineno    = parseInt(error.lineno || path_arr[path_arr.length -1] || -1)
      error.message   = arr[arr.length - 1]
      error.name      = error.name
      error.source    = "Svelte"
      error.dest      = "HTML"
      error.filename  = error.path || options.filename
      error.stack     = fileContents.toString()

      return new TerraformError(error)
    }
  }

}
