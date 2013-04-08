var fs      = require('fs')
var path    = require('path')
var helpers = require('./lib/helpers')
var scope   = require('./lib/partial')

exports.process = function(sourcePath, options, callback){
  
  // get extension
  var ext = path.extname(sourcePath).replace(/^\./, '')
  
  var info = {
    sourcePath: sourcePath,
    sourceType: ext,
    outputPath: helpers.outputPath(sourcePath),
    outputType: helpers.outputType(sourcePath),
  }
  
  var proj = scope(options.root, { "globals": {} })
  
  try{
    var output = proj.partial(sourcePath, { layout: "_layout.jade" })
    callback(null, info, output)
  }catch(e){
    callback(e, info)
  }
  
}