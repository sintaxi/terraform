var stylus = require("stylus")
var TerraformError = require("../../error").TerraformError

exports.compile = function(filePath, dirs, fileContents, callback){
  stylus(fileContents.toString(), {
    filename: filePath,
    paths: dirs
  }).render(function(err, css){
    if(err){
      err.source    = "Stylus"
      err.dest      = "CSS"
      err.name      = "Stylus Error"
      err.lineno    = err.lineno || 99
      err.filename  = filePath
      err.stack     = fileContents
      var arr       = err.message.split("\n\n")
      err.message   = arr[arr.length - 1].split("\n")[0]
      var error     = new TerraformError(err)
    }
    callback(error, css)
  })
}