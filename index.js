var fs   = require('fs')
var path = require('path')

var processors = {
  "jade" : require("./lib/processors/jade"),
  "less" : require("./lib/processors/less")
}

exports.path = function(sourcePath, callback){
  return sourcePath
}

exports.process = function(sourcePath, options, callback){
  
  // get extension
  var ext = path.extname(sourcePath).replace(/^\./, '')
  
  // giddy up!
  processors[ext](sourcePath, options, function(error, contents){
    callback(error, contents)
  }) 
  
}