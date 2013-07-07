var stylus = require("stylus")

exports.compile = function(filePath, dirs, fileContents, callback){
  stylus(fileContents.toString(), {
    filename: filePath,
    paths: dirs
  }).render(function(err, css){
    if(err){
      err.name    = "Stylus Error"
      err.stack   = err.message
      err.message = "Something is wrong with your Stylus file"
    }
    callback(err, css)
  })
}