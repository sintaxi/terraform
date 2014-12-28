var cs = require("coffee-react")
var TerraformError = require("../../error").TerraformError

exports.compile = function(filePath, fileContents, callback){
  try{
    var errors = null
    var script = cs.compile(fileContents.toString(), { bare: true })
  }catch(e){
    var errors = e
    errors.source = "CJSX"
    errors.dest = "JavaScript"
    errors.filename = filePath
    errors.stack = fileContents.toString()
    errors.lineno = parseInt(errors.location.first_line ? errors.location.first_line + 1 : -1)
    var script = null
    var error = new TerraformError(errors)
  }finally{
    callback(error, script)
  }
}
