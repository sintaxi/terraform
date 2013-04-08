var fs   = require('fs')
var path = require('path')
var helpers = require('./lib/helpers')

var processors = {
  "jade" : require("./lib/processors/jade"),
  "less" : require("./lib/processors/less")
}

exports.project = function(root, globals){
  
  return {
    
    process: function(sourcePath, locals, callback){
      
      var layoutPath = fetchLayout()
      
      var template = function(sourcePath, locals, cb){
        
      }
      
      template( { layout: layoutPath })
    }
    
  }
  
}

// export
exports.path = helpers.outputFilename

exports.process = function(sourcePath, options, callback){
  
  // get extension
  var ext = path.extname(sourcePath).replace(/^\./, '')
  
  var info = {
    sourcePath: sourcePath,
    sourceType: ext,
    outputPath: helpers.outputPath(sourcePath),
    outputType: helpers.outputType(sourcePath),
  }
  
  // giddy up!
  processors[ext](sourcePath, options, function(error, contents){
    callback(error, info, contents)
  }) 
  
}