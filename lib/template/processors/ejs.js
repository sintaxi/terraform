var ejs = require('ejs')

exports.compile = function(fileContents, options){
  return ejs.compile(fileContents.toString(), options)
}