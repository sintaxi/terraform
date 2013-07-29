var jade = require('jade')
var TerraformError = require("../../error").TerraformError

module.exports = function(fileContents, options){

  return {
    compile: function(){
      return jade.compile(fileContents, options)
    },

    parseError: function(error){
      var arr = error.message.split("\n")

      error.lineno  = error.lineno || arr[0].split(":")[1]
      error.message = arr[arr.length - 1]
      error.name      = error.name
      error.source    = "Jade"
      error.dest      = "HTML"
      error.filename  = error.path || options.filename
      error.stack     = fileContents.toString()

      return new TerraformError(error)
    }
  }

}
