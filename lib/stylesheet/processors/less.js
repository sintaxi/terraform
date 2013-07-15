var less           = require("less")
var TerraformError = require("../../error").TerraformError

exports.compile = function(filePath, dirs, fileContents, callback){

  var parser = new(less.Parser)({
    paths:    dirs,     // Specify search paths for @import directives
    filename: filePath  // Specify a filename, for better error messages
  })

  parser.parse(fileContents.toString(), function (e, tree) {

    if(e){
      var error = new TerraformError({
        source: "Less",
        dest: "CSS",
        lineno: e.line || 99,
        name: e.name + " Error",
        message: e.message,
        filename: filePath,
        stack: fileContents.toString()
      })

      return callback(error)
    }else{
      try{
        var error = null
        var css = tree.toCSS({ compress: true })
      }catch(e){
        var error = new TerraformError({
          source: "Less",
          dest: "CSS",
          lineno: e.line || 99,
          name: e.name + " Error",
          filename: filePath,
          message: e.message,
          stack: fileContents.toString()
        })
        var css = null
      }
      callback(error, css)
    }
  })
}

