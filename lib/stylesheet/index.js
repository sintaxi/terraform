var path         = require("path")
var fs           = require("fs")
var helpers      = require('../helpers')

/**
 * Build Processor list for stylesheets.
 *
 * same as doing...
 *
 *    var processors = {
 *      "less"   : require("./processors/less"),
 *      "stylus" : require("./processors/stylus")
 *    }
 *
 */

var processors = {}
helpers.processors["css"].forEach(function(sourceType){
  processors[sourceType] = require("./processors/" + sourceType)
})

module.exports = function(rootPath, filePath, options, callback){

  if(!callback) {
    callback  = options
    options   = {}
  }

  var ext = path.extname(filePath).replace(/^\./, '')
  return processors[ext].compile(rootPath, filePath, options, callback)

  // var srcPath = path.resolve(root, filePath)
  // var ext     = path.extname(srcPath).replace(/^\./, '')


  // fs.readFile(srcPath, function(err, data){

  //   /**
  //    * File not Found
  //    */

  //   if(err && err.code === 'ENOENT') return callback(null, null)

  //   /**
  //    * Read File Error
  //    */

  //   if(err) return callback(err)


  //   *
  //    * Lookup Directories
     

  //   var dirs = [
  //     path.dirname(srcPath),
  //     path.dirname(path.resolve(root))
  //   ]

  //   /**
  //    * Lookup Directories
  //    */
  //   var render = processors[ext].compile(srcPath, dirs, data, function(err, css, sourcemap) {
  //     if (err) return callback(err);
  //     return callback(null, css.toString(), sourcemap)
  //   })

  // })

}
