var path    = require("path")
var fs      = require("fs")
var less    = require("less")

module.exports = function(root, filePath, callback){

  var srcPath = path.resolve(root, filePath)

  fs.readFile(srcPath, function(err, data){
    if(err) return callback(err)

    var dirs = [
      path.dirname(srcPath),
      path.dirname(path.resolve(root))
    ]

    var parser = new(less.Parser)({
      paths:    dirs,     // Specify search paths for @import directives
      filename: filePath  // Specify a filename, for better error messages
    })

    parser.parse(data.toString(), function (err, tree) {
      try{
        var css = tree.toCSS({ compress: true })
        callback(null, css)
      }catch(e){
        callback({
          name: e.type,
          message: e.message,
          stack: less.formatError(e)
        })
      }
    })

  })

}