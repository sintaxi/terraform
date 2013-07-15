var stylus = require("stylus")

exports.compile = function(filePath, dirs, fileContents, callback){
  stylus(fileContents.toString(), {
    filename: filePath,
    paths: dirs
  }).render(function(err, css){
    if(err){
      err.source  = "Stylus"
      err.dest    = "CSS"
      err.name    = "Stylus Error"
      err.stack   = err.message
      var arr = err.message.split("\n\n")
      err.message = arr[arr.length - 1].split("\n")[0]
    }
    callback(err, css)
  })
}