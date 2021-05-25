
var TerraformError = require("../../error").TerraformError
var path           = require("path")
var esbuild        = require("esbuild")

exports.compile = function(rootPath, filePath, options, callback){
  console.log(rootPath, filePath)
  var srcFullPath = path.resolve(rootPath, filePath)

  // var publicPath = filePath.replace(/\.js\.cjs$/, ".js").replace(/\.cjs$/, ".js")
  // console.log(publicPath)
  try{
    var errors = null
    var results = esbuild.buildSync({
      //inject: [__dirname + "/react-shim.js"],
      absWorkingDir: rootPath,
      entryPoints: [srcFullPath],
      //outfile: publicPath,
      bundle: true,
      write: false,
      minify: options.hasOwnProperty("minify") ? options.minify : false,
      plugins: [],
    })
    var script = results.outputFiles[0]["text"]
  }catch(e){
    var errorObject = e.errors[0]
    var errors = errorObject
    errors.source = "CommonJS"
    errors.dest = "JavaScript"
    errors.filename = filePath
    errors.stack = errorObject["text"]
    errors.lineno = parseInt(errorObject["location"]["line"])
    var script = null
    var error = new TerraformError(errors)
  }finally{
    return callback(error, script)
  }
}
