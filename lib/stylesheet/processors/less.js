var TerraformError = require("../../error").TerraformError
var path  = require("path")
var fs    = require("fs")

exports.compile = function(rootPath, filePath, options, callback){

  // there must be a better way to do this...
  try{
    var less = require("less")
  }catch(e){
    try{
      var less = require(process.cwd() + "/node_modules/less")
    }catch(e){
      console.log(e)
      console.log("--------------------------------------------------")
      console.log(" Oops: `less` not found                         ")
      console.log()
      console.log("    run: `npm install less --save-dev`")
      console.log()
      console.log("--------------------------------------------------")
      console.log()
      process.exit(1)
    }
  }

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

  var formatError = function(e){
    return new TerraformError({
      source: "Less",
      dest: "CSS",
      lineno: parseInt(e.line || -1),
      name: e.type + "Error",
      filename: filePath,
      message: e.message,
      stack: fileContents.toString()
    })
  }


  less.render(fileContents.toString(), {
      paths: dirs,            // Specify search paths for @import directives
      filename: filePath,     // Specify a filename, for better error messages
      compress: false,         // Minify CSS output
      sourceMap: true
    }, function(e, css){
      if (e) return callback(formatError(e))
      var map = css.map || ""
      return callback(null, css.css.toString(), map.toString())
  })
}

