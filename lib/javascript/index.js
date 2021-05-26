var path       = require("path")
var fs         = require("fs")
var helpers    = require('../helpers')

/**
 * Build Processor list for javascripts.
 *
 * same as doing...
 *
 *    var processors = {
 *      "cjs"    : require("./processors/cjs")  
 *      "coffee" : require("./processors/coffee")
 *    }
 *
 */
var extensions = [], processors = {}
helpers.processors["js"].forEach(function(sourceType){
  extensions.push('.' + sourceType)
  processors[sourceType] = require("./processors/" + sourceType)
})

module.exports = function(rootPath, filePath, options, callback){
  
  if(!callback) {
    callback  = options
    options   = {}
  }

  var ext = path.extname(filePath).replace(/^\./, '')
  return processors[ext].compile(rootPath, filePath, options, callback)

  // fs.readFile(srcPath, function(err, data){

  //   /**
  //    * File not Found
  //    */

  //   if(err && err.code === 'ENOENT') return callback(null, null)

  //   /**
  //    * Read File Error
  //    */

  //   if(err) return callback(err)

  //   /**
  //    * Lookup Directories
  //    */

  //   var render = function(ext, data, cb) {
  //     processors[ext].compile(srcPath, data, function(err, js) {
  //       if (err) return cb(err)
  //       /**
  //        * Consistently minify
  //        */
  //       cb(null, js)
  //     })
  //   }

  //   render(ext, data, callback)

  // })

}
