var path         = require("path")
var fs           = require("fs")
var helpers      = require('../helpers')
var autoprefixer = require('autoprefixer')

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

module.exports = function(root, filePath, callback){

  var srcPath = path.resolve(root, filePath)
  var ext     = path.extname(srcPath).replace(/^\./, '')

  var _data   = helpers.dataTree(root)
  var _path   = helpers.getCurrent(filePath).path
  var locals  = helpers.walkData(_path, _data)

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

    var dirs = [
      path.dirname(srcPath),
      path.dirname(path.resolve(root))
    ]

    /**
     * Lookup Directories
     */
    var render = processors[ext].compile(srcPath, dirs, data, function(err, css) {
      if (err) return callback(err);

      /**
       * Process with autoprefixer, if desired (default: TRUE)
       */
      if (!locals || !locals.hasOwnProperty("_autoprefixer") || locals._autoPrefixer) {
          if (locals && typeof locals._autoprefixer === "object") {
              css = autoprefixer(locals._autoprefixer).process(css).css;
          } else {
              css = autoprefixer.process(css).css;
          }
      }
      callback(null, css);
    })

  })

}