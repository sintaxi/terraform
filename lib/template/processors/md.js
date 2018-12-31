
var TerraformError = require("../../error").TerraformError
var marked = require("marked").setOptions({
  langPrefix: 'language-',
  headerPrefix: '',
  gfm: true,
  tables: true,
  headerIds: false,
})

module.exports = function(fileContents, options){

  return {
    compile: function(){
      return function (locals){
        return marked(fileContents.toString().replace(/^\uFEFF/, ''), options)
      }
    },

    parseError: function(error){
      error.stack = fileContents.toString()
      return new TerraformError(error)
    }
  }

}
