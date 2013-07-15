var ejs = require('ejs')

module.exports = function(fileContents, options){

  return {
    compile: function(){
      return ejs.compile(fileContents.toString(), options)
    },

    parseError: function(error){
      error.source   = "EJS"
      error.dest     = "HTML"
      error.lineno   = error.line || 99
      error.filename = error.path || options.filename
      error.stack    = fileContents.toString()

      var arr = error.message.split("\n\n")
      error.message = arr[arr.length - 1].toString()
      return error
    }
  }

}