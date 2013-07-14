var marked = require("marked")

exports.compile = function(fileContents){

  var fileContents = fileContents.toString()

  return function(){
    return marked(fileContents)
  }

}