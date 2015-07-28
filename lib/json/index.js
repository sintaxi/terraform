var path       = require("path")
var fs         = require("fs")
var helpers    = require('../helpers')

/**
 * Build Processor list for JSON data.
 *
 * same as doing...
 *
 *    var processors = {
 *      "cson" : require("./processors/cson")
 *    }
 *
 */
var extensions = [], processors = {}, exceptionHandler = null

helpers.processors["json"].forEach(function(sourceType){
  extensions.push('.' + sourceType)
  processors[sourceType] = require("./processors/" + sourceType)
})

module.exports = function(root, filePath, callback){

  var srcPath = path.resolve(root, filePath)
  var ext     = path.extname(srcPath).replace(/^\./, '')

  fs.readFile(srcPath, function(err, data){

    /**
     * File not Found
     */

    if(err && err.code === 'ENOENT') return callback(null, null)

    /**
     * Read File Error
     */

    if(err) return callback(err)

    /**
     * Lookup Directories
     */

    processors[ext].compile(srcPath, data, function(err, obj) {
      if (err) return callback(err)

      var post = JSON.stringify(obj)
      callback(null, post)
    })

  })

}
