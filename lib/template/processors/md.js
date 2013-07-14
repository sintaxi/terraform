var marked = require("marked")

module.exports = function(fileContents, options){

  return {
    compile: function(){
      return function (locals){
        return marked(fileContents.toString())
      }
    },

    parseError: function(error){
      return error
    }
  }

}