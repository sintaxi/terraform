var ejs = require('ejs')

exports.compile = ejs.compile

exports.parseError = function(error){
  return error
}