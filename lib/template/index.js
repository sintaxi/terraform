var scope   = require("./scope")
var helpers = require('../helpers')
var fs      = require('fs')

module.exports = function(filePath, options, callback){
  if(!options) options = {}
  
  // TODO: calculate globals
  if(!options.hasOwnProperty("globals")){
    options.globals = { public: helpers.dataTree(options.root) }
  }
  
  // TODO: calculate current
  if(!options.hasOwnProperty("current")){
    options.current = helpers.getCurrent(filePath)
  }
  
  // TODO: calculate layout
  if(!options.hasOwnProperty("layout")){
    options.layout = helpers.findFirstFile(options.root, ["_layout.jade", "_layout.html.jade"])
  }
  
  if(!options.hasOwnProperty("locals")){
    options.locals = {}
  }
  
  // copy over the templateLocals
  var templateLocals = helpers.walkData(options.current.path, options.globals.public)
  
  for(var local in templateLocals)
    options.locals[local] = templateLocals[local]
 
 // layout
 if(options.layout)
  options.locals['layout'] = options.layout
 
  try{
    var output = scope(options.root, { "globals": options.globals, "current": options.current }).partial(filePath, options.locals)
    callback(null, output)
  }catch(err){
    callback(err)
  }
  
}