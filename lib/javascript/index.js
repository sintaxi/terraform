var path       = require("path")
var fs         = require("fs")
var helpers    = require('../helpers')
var minify     = require('minify')
var browserify = require('browserify')
var through    = require('through')

/**
 * Build Processor list for javascripts.
 *
 * same as doing...
 *
 *    var processors = {
 *      "coffee" : require("./processors/coffee")
 *    }
 *
 */
var extensions = [], processors = {}, exceptionHandler = null

helpers.processors["js"].forEach(function(sourceType){
  extensions.push('.' + sourceType)
  processors[sourceType] = require("./processors/" + sourceType)
})
processors['js'] = processors['es'] // so it's possible to require .js files

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

    var render = function(ext, data, cb) {
      processors[ext].compile(srcPath, data, function(err, js) {
        if (err) return cb(err)

        /**
         * Consistently minify
         */
        var post = minify.js(js, {
          compress: false,
          mangle: true
        })
        cb(null, post)
      })
    }

    if(helpers.needsBrowserify(data.toString())) {
      var post = '', success = true

      if (exceptionHandler) {
        process.removeListener('uncaughtException', exceptionHandler)
      }
      exceptionHandler = function(err) {
        console.log(err.message)
        if (success) {
          success = false
          render(ext, data, callback)
        }
      }

      process.on('uncaughtException', exceptionHandler)
      
      browserify(srcPath, {extensions: extensions}).transform(function(file) {
        var result = ''
        return through(write, end)

        function write(buf) {
          result += buf
        }
        function end() {
          if(success) {
            var that = this
            render(path.extname(file).replace(/^\./, '').toLowerCase(), result, function(err, data) {
              that.queue(data)
              that.queue(null)
            })
          }
        }
      }).on('error', exceptionHandler).bundle()
      .on('data', function(buf) {
        if (success) {
          post += buf
        }
      }).on('end', function() {
        if (success) {
          callback(null, post)
        }
      })
    }
    else {
      render(ext, data, callback)
    }

  })

}
