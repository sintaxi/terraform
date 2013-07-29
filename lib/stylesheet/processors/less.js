var less           = require("less")
var TerraformError = require("../../error").TerraformError



exports.compile = function(filePath, dirs, fileContents, callback){

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

  var parser = new(less.Parser)({
    paths:    dirs,     // Specify search paths for @import directives
    filename: filePath  // Specify a filename, for better error messages
  })

  parser.parse(fileContents.toString(), function (e, tree) {
    if(e) return callback(formatError(e))

    try{
      var error = null
      var css = tree.toCSS({ compress: true })
    }catch(e){
      var error = formatError(e)
      var css = null
    }finally{
      callback(error, css)
    }

  })
}

