var fs          = require('fs')
var path        = require('path')
var helpers     = require('./lib/helpers')

var template    = require('./lib/template')
var stylesheet  = require('./lib/processors/less')

exports.process = function(sourcePath, options, callback){
  
  // get extension
  var ext = path.extname(sourcePath).replace(/^\./, '')
  
  var info = {
    sourcePath: sourcePath,
    sourceType: ext,
    outputPath: helpers.outputPath(sourcePath),
    outputType: helpers.outputType(sourcePath)
  }
  
  if(["jade", "ejs", "md"].indexOf(ext) !== -1) {
    var render = template
  }else if(["less", "style", "sass"].indexOf(ext) !== -1){
    var render = stylesheet
  }
  
  render(sourcePath, options, function(err, output){
    callback(err, info, output)
  })
  
}