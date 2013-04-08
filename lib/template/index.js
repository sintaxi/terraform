var scope = require("./scope")

module.exports = function(filePath, options, callback){
  
  /**
   * TODO:
   *  - collect globals
   *  - pass in current
   *  - find layout
   */
 
  try{
    var output = scope(options.root, { "globals": {} }).partial(filePath, { layout: "_layout.jade" })
    callback(null, output)
  }catch(err){
    callback(err)
  }
  
}