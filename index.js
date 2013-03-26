var fs   = require('fs')
var path = require('path')
var jade = require("./lib/processors/jade")

var map = {
  "html"  : ["jade"],
  "css"   : ["less"]
}

exports.path = function(sourcePath, callback){
  return sourcePath
}

exports.process = function(sourcePath, options, callback){
  jade(sourcePath, options, function(error, contents){
    callback(error, contents)
  })
  
}