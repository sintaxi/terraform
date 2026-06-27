var sass = require("sass")
var url  = require("url")
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

  try{
    var result = sass.compile(srcFullPath, {
      loadPaths: dirs,
      style: 'compressed',
      sourceMap: true,
      sourceMapIncludeSources: true
    })
  }catch(e){
    var error = new TerraformError({
      source: "Sass",
      dest: "CSS",
      lineno: (e.span && e.span.start ? e.span.start.line + 1 : null) || 99,
      name: "Sass Error",
      message: e.sassMessage || e.message,
      filename: (e.span && e.span.url ? url.fileURLToPath(e.span.url) : null) || filePath,
      stack: fileContents.toString()
    })
    return callback(error)
  }

  callback(null, result.css.toString(), JSON.stringify(result.sourceMap))
}
