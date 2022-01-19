require('svelte/register')({
  extensions: ['.svelte']
});

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

      return function(args) {
        console.log(args);
        var rendered = Component.render(args);
        console.log(rendered);
        return `${rendered.html}<style>${rendered.css.code}</style>`;
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
