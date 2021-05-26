var sass = require("sass")
var TerraformError = require("../../error").TerraformError
var path  = require("path")
var fs    = require("fs")

exports.compile = function(rootPath, filePath, options, callback){

  var srcFullPath = path.resolve(rootPath, filePath)
  
  try{
    var fileContents = fs.readFileSync(srcFullPath)
  }catch(e){
    return callback(null, null)
  }

  var dirs = [
    path.dirname(srcFullPath),
    path.dirname(path.resolve(rootPath))
  ]

  sass.render({
    file: srcFullPath,
    includePaths: dirs,
    outputStyle: 'compressed',
    sourceMap: true,
    sourceMapEmbed: false,
    sourceMapContents: true,
    outFile: filePath,
    omitSourceMapUrl: true
  }, function (e, css) {
    if (e) {
      var error = new TerraformError ({
        source: "Sass",
        dest: "CSS",
        lineno: e.line || 99,
        name: "Sass Error",
        message: e.message,
        filename: e.file || filePath,
        stack: fileContents.toString()
      })
      return callback(error)
    }  
    callback(null, css.css.toString(), css.map.toString())
  });
}
