var jade = require('jade')

module.exports = function(fileContents, options){

  return {
    compile: function(){
      return jade.compile(fileContents, options)
    },

    parseError: function(error){
      return error
    }
  }

}
