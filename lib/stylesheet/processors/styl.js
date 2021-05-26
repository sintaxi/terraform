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

  // there must be a better way to do this...
  try{
    var stylus = require("stylus")
  }catch(e){
    try{
      var stylus = require(process.cwd() + "/node_modules/stylus")
    }catch(e){
      console.log(e)
      console.log("--------------------------------------------------")
      console.log(" Oops: `stylus` not found                         ")
      console.log()
      console.log("    run: `npm install stylus --save-dev`")
      console.log()
      console.log("--------------------------------------------------")
      console.log()
      process.exit(1)
    }
  }

  var style = stylus(fileContents.toString())
    style.set('filename', srcFullPath)
    style.set('paths', dirs)
    style.set('compress', true)
    style.set('include css', true)
    style.set('sourcemap', {
      'comment': false,
      'inline': false
    })

    style.render(function(err, css){

      if(err){
        // we are reverse engineering this formatException() function...
        // https://github.com/LearnBoost/stylus/blob/master/lib/utils.js#L86

        var chunks    = err.message.split('\n\n')
        var arr       = chunks[0].split('\n')
        err.filename  = parseInt(arr[0].split(':')[0] || -1)
        var path_arr  = arr[0].split(':')
        err.lineno    = parseInt(err.lineno || path_arr[path_arr.length -2] || -1)
        var arr2      = chunks[1].split('\n')
        err.message   = arr2[0].replace(/"/g, '\\"')
        err.source    = "Stylus"
        err.dest      = "CSS"
        err.name      = "Stylus Error"
        err.filename  = filePath
        err.stack     = fileContents.toString()
        var error     = new TerraformError(err)
      }

    callback(error, css, style.sourcemap)
  });

}
