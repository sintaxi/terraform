var fs = require('fs')
var path = require('path')

var map = {
  "html"  : ["jade"],
  "css"   : ["less"]
}

exports.path = function(sourcePath, callback){
  return sourcePath
}

exports.process = function(sourcePath, callback){
  callback(null)
}