var nunjucks = require('nunjucks')
var TerraformError = require("../../error").TerraformError
var PartialTag = require('../../helpers/partial-nunjucks.js')

module.exports = function(fileContents, options){

  return {
    compile: function(){
      return function(locals) {
        var env = nunjucks.configure(options.basedir)
        
        env.addExtension('LocalPartial', new PartialTag(locals))
        
        var template = nunjucks.compile(fileContents.toString(), env)
        return template.render(locals)
      }
    },

    parseError: function(error){
      var arr = error.message.split("\n")
      var path_arr = arr[0].split(":")

      error.lineno   = parseInt(error.lineno || path_arr[path_arr.length -1] || -1)
      error.message  = arr[arr.length - 1]
      error.name     = error.name
      error.source   = "NUNJUCKS"
      error.dest     = "HTML"
      error.filename = error.path || options.filename
      error.stack    = fileContents.toString()

      return new TerraformError(error)
    }
  }

}
