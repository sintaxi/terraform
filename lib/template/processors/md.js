var marked = require("marked").setOptions({ langPrefix: 'language-', headerPrefix: '' })
var TerraformError = require("../../error").TerraformError

module.exports = function(fileContents, options){

  return {
    compile: function(){
      return function (locals){
        return marked(fileContents.toString().replace(/^\uFEFF/, ''))
      }
    },

    parseError: function(error){
      error.stack = fileContents.toString()
      return new TerraformError(error)
    }
  }

}