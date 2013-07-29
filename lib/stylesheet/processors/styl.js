var stylus = require("stylus")
var TerraformError = require("../../error").TerraformError



exports.compile = function(filePath, dirs, fileContents, callback){
  stylus(fileContents.toString(), {
    filename: filePath,
    paths: dirs
  }).render(function(err, css){
    if(err){
      // we are reverse engineering this formatException() function...
      // https://github.com/LearnBoost/stylus/blob/master/lib/utils.js#L86

      var chunks    = err.message.split('\n\n')

      var arr       = chunks[0].split('\n')
      err.filename  = arr[0].split(':')[0]
      err.lineno    = parseInt(err.lineno || arr[0].split(':')[1] || -1)

      var arr2      = chunks[1].split('\n')
      err.message   = arr2[0]

      err.source    = "Stylus"
      err.dest      = "CSS"
      err.name      = "Stylus Error"
      err.lineno    = err.lineno || 99
      err.filename  = filePath
      err.stack     = fileContents
      var error     = new TerraformError(err)
    }

    callback(error, css)
  })
}