
var TerraformError = require("../../error").TerraformError
var marked = require("marked")

/**
 * marked v18 defaults already produce the output this processor
 * needs:
 *   - headings without ids       (e.g. <h1>hello markdown</h1>)
 *   - code blocks with a         <code class="language-xxx"> prefix
 *   - GFM + tables enabled
 *
 * so the old setOptions()/custom-renderer/langPrefix/headerIds
 * configuration (removed from marked years ago) is no longer needed.
 */

module.exports = function(fileContents, options){

  return {
    compile: function(){
      return function (locals){
        return marked.parse(fileContents.toString().replace(/^\uFEFF/, ''))
      }
    },

    parseError: function(error){
      error.stack = fileContents.toString()
      return new TerraformError(error)
    }
  }

}
