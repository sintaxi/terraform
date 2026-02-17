var jade = require('../../cache/jade-node')
var marked = require('marked')
var TerraformError = require("../../error").TerraformError

// Register markdown filter for jade templates
jade.filters.markdown = function(str, options) {
  return marked.parse(str)
}

module.exports = function(fileContents, options){

  return {
    compile: function(){
      return jade.compile(fileContents, options)
    },

    parseError: function(error){

      var arr = error.message.split("\n")
      var path_arr = arr[0].split(":")

      error.lineno    = parseInt(error.lineno || path_arr[path_arr.length -1] || -1)
      error.message   = arr[arr.length - 1]
      error.name      = error.name
      error.source    = "Jade"
      error.dest      = "HTML"
      error.filename  = error.path || options.filename
      error.stack     = fileContents.toString()

      return new TerraformError(error)
    }
  }

}
