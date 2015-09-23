var TerraformError = require("../../error").TerraformError
var asciidoctor = require('asciidoctor.js')();
var opal = asciidoctor.Opal;
var processor = asciidoctor.Asciidoctor();

module.exports = function(fileContents, options){

  return {
    compile: function(){
      return function (locals){
        return processor.$convert(fileContents.toString());
      }
    },

    parseError: function(error){
      error.stack = fileContents.toString()
      return new TerraformError(error)
    }
  }

}