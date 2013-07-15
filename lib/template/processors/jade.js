var jade = require('jade')
var TerraformError = require("../../error").TerraformError

module.exports = function(fileContents, options){

  return {
    compile: function(){
      return jade.compile(fileContents, options)
    },

    parseError: function(error){
      //error.name    = error.name
      error.source  = "Jade"
      error.dest    = "HTML"
      error.filename = error.path || options.filename
      error.lineno  = error.lineno || 99
      error.stack   = fileContents.toString()
      // Jade masshes a stacktrace in with its message.
      // We need to pull it out.
      var arr = error.message.split("\n\n")
      error.message = arr[arr.length - 1].toString()

      return new TerraformError(error)
    }
  }

}
