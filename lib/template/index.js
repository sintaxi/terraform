var scope   = require("./scope")
var helpers = require('../helpers')

module.exports = function(filePath, options, callback){
  if(!options) options = {}
  
  // TODO: calculate globals
  if(!options.hasOwnProperty("globals")){  
    options.globals = helpers.dataTree(options.root)
  }
  
  // TODO: calculate current
  if(!options.hasOwnProperty("current")){
    options.current = helpers.getCurrent(filePath)
  }
  
  // TODO: calculate layout
  if(!options.hasOwnProperty("layout")){
    options.layout = "_layout.jade"
  }
 
  try{
    var output = scope(options.root, { "globals": options.globals, "current": options.current }).partial(filePath, { layout: options.layout  })
    callback(null, output)
  }catch(err){
    callback(err)
  }
  
}