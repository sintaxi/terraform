var Handlebars = require('handlebars')
var TerraformError = require("../../error").TerraformError

module.exports = function(fileContents, options){

  /**
   * Provides support to load partials.
   *
   * @usage without locals
   *  {{partial '../foo.md'}}
   *
   * @example with provided locals
   *  {{partial '../foo.jade' locals='{ "a": "b" }'}}
   *
   * @returns {Handlebars.SafeString} HTML-safe rendered partial
   */
  Handlebars.registerHelper('partial', function(filePath, options) {
    var locals = options || {};
    if (typeof locals === 'string') locals = JSON.parse(locals)
    return new Handlebars.SafeString(this.partial(filePath, locals))
  });

  return {
    compile: function(){
      return Handlebars.compile(fileContents.toString(), options)
    },

    parseError: function(error){

      var arr = error.message.split("\n")
      var path_arr = arr[0].split(":")

      error.lineno    = parseInt(error.lineno || path_arr[path_arr.length -1] || -1)
      error.message   = arr[arr.length - 1]
      error.name      = error.name
      error.source    = "HBS"
      error.dest      = "HTML"
      error.filename  = error.path || options.filename
      error.stack     = fileContents.toString()

      return new TerraformError(error)
    }
  }

}
