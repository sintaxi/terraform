var marked = require("marked")

exports.compile = function(fileContents){

  return function(){
    return marked(fileContents)
  }

}

exports.parseError = function(error){
  return error
}