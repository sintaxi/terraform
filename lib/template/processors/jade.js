var jade = require('jade')

exports.compile = jade.compile

exports.parseError = function(error){
  return error
}