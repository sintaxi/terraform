var less = require("less")

exports.compile = function(filePath, dirs, fileContents, callback){

  var parser = new(less.Parser)({
    paths:    dirs,     // Specify search paths for @import directives
    filename: filePath  // Specify a filename, for better error messages
  })

  parser.parse(fileContents.toString(), function (e, tree) {

    if(e){

      return callback({
        source: "Less",
        dest: "CSS",
        lineno: e.lineno || 1,
        name: "Less Parse Error",
        message: e.message,
        filename: filePath,
        stack: fileContents.toString()
      })
    }else{
      try{
        var error = null
        var css = tree.toCSS({ compress: true })
      }catch(e){
        var error = {
          source: "Less",
          dest: "CSS",
          lineno: e.lineno || 1,
          name: "Less Error",
          filename: filePath,
          message: e.message,
          stack: fileContents.toString() }
        var css = null
      }
      callback(error, css)
    }
  })
}

