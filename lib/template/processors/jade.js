var jade = require('jade')

module.exports = function(fileContents, options){

  return {
    compile: function(){
      return jade.compile(fileContents, options)
    },

    parseError: function(error){
      var arr = error.message.split("\n\n")
      var first = arr[0]
      var second = arr[1]

      var message = arr[arr.length - 1].toString()



      console.log("-----------")
      console.log(error.message)
      console.log("-----------")
      error.source  = "Jade"
      error.dest    = "HTML"
      error.filename = error.path
      error.lineno  = error.lineno || 1
      error.stack   = fileContents.toString()
      // Jade masshes a stacktrace in with its message.
      // We need to pull it out.
      var arr = error.message.split("\n\n")
      error.message = arr[arr.length - 1].toString()

      return error
    }
  }

}
