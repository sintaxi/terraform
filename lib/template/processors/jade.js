var jade = require('jade')

exports.compile = function(fileContents, options){
  return jade.compile(fileContents, options)
}