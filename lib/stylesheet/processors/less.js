var less = require("less")

exports.compile = function(filePath, dirs, fileContents, callback){

  var parser = new(less.Parser)({
    paths:    dirs,     // Specify search paths for @import directives
    filename: filePath  // Specify a filename, for better error messages
  })

  parser.parse(fileContents.toString(), function (e, tree) {

    //console.log()
    //console.log(e)



    if(e){
      // console.log()
      // for(var k in e){
      //   console.log(k, e[k])
      // }
      return callback({
        name: "Less Parse Error",
        message: e.message,
        stack: less.formatError(e)
      })
    }else{
      try{
        var error = null
        var css = tree.toCSS({ compress: true })
      }catch(e){
        // console.log()
        // for(var k in e){
        //   console.log(k, e[k])
        // }
        var error = {
          name: "Less Error",
          message: e.message,
          stack: less.formatError(e) }
        var css = null
      }
      callback(error, css)
    }
  })
}

