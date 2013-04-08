var marked = require("marked")

module.exports = function(filePath, fileContents){
  
  var fileContents = fileContents.toString()
  
  return function(){
    return marked(fileContents)
  }
  
}