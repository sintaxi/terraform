var esbuild = require('esbuild');
var sveltePlugin = require('esbuild-svelte');

function init() {
  return function (options) {
    var plugin = sveltePlugin({
      // TODO: This will cause CSS to be generated that we don't need (the server already served it).
      // I don't see a way to disable that entirely.
      compilerOptions: {
        hydratable: true,
        css: true,
      },
    });

    return esbuild.build(
      Object.assign(options, {
        plugins: [plugin],
      })
    );
  };
}

module.exports = init;
