var marked = require("marked").setOptions({ langPrefix: 'language-' })
var TerraformError = require("../../error").TerraformError

module.exports = function(fileContents, options){

  return {
    compile: function(){
      return function (locals){
        return marked(fileContents.toString())
      }
    },

    parseError: function(error){
      error.stack = fileContents.toString()
      return new TerraformError(error)
    }
  }

}