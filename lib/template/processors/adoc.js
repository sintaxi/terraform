var asciidoctor = require('asciidoctorjs-npm-wrapper').Asciidoctor;
var TerraformError = require("../../error").TerraformError

module.exports = function(fileContents, options){

  return {
    compile: function(){
      return function (locals){
        return asciidoctor.$render(fileContents.toString())
      }
    },

    parseError: function(error){
      error.stack = fileContents.toString()
      return new TerraformError(error)
    }
  }

}
