var less = require("less")

exports.compile = function(filePath, dirs, fileContents, callback){

  var parser = new(less.Parser)({
    paths:    dirs,     // Specify search paths for @import directives
    filename: filePath  // Specify a filename, for better error messages
  })

  parser.parse(fileContents.toString(), function (e, tree) {
    if(e){
      return callback({
        name: "Less " + e.type,
        message: e.message,
        stack: less.formatError(e)
      })
    }else{
      try{
        var error = null
        var css = tree.toCSS({ compress: true })
      }catch(e){
        //console.log(e)
        var error = {
          name: "Less " + e.type,
          message: e.message,
          stack: less.formatError(e) }
        var css = null
      }
      callback(error, css)
    }
  })
}

