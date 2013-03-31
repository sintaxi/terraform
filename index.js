var fs   = require('fs')
var path = require('path')
var helpers = require('./lib/helpers')

var processors = {
  "jade" : require("./lib/processors/jade"),
  "less" : require("./lib/processors/less")
}


// export
exports.path = helpers.outputFilename

exports.process = function(sourcePath, options, callback){
  
  // get extension
  var ext = path.extname(sourcePath).replace(/^\./, '')
  
  // giddy up!
  processors[ext](sourcePath, options, function(error, contents){
    callback(error, {}, contents)
  }) 
  
}