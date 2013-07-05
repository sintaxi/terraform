var ejs = require('ejs')

module.exports = function(filePath, fileContents){
  return ejs.compile(fileContents.toString(), { filename: filePath })
}