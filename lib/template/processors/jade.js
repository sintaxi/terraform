var jade = require('jade')

module.exports = function(filePath, fileContents){
  return jade.compile(fileContents, { filename: filePath })
}