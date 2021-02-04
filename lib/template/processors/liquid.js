var { Liquid } = require('liquidjs')
var TerraformError = require("../../error").TerraformError

module.exports = function(fileContents, options){
  return {
    compile: async function(){
      const engine = new Liquid()
      const tpl = engine.parse(fileContents.toString())
      const compiled = await engine.render(tpl, options)

      return compiled
    },

    parseError: function(error){
      var arr = error.message.split("\n")
      var path_arr = arr[0].split(":")

      error.lineno   = parseInt(error.lineno || path_arr[path_arr.length -1] || -1)
      error.message  = arr[arr.length - 1]
      error.name     = error.name
      error.source   = "Liquid"
      error.dest     = "HTML"
      error.filename = error.path || options.filename
      error.stack    = fileContents.toString()

      return new TerraformError(error)
    }
  }

}
