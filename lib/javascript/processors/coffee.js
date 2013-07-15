var cs = require("coffee-script")
var TerraformError = require("../../error").TerraformError

exports.compile = function(filePath, fileContents, callback){
  try{
    var errors = null
    var script = cs.compile(fileContents.toString(), { bare: true })
  }catch(e){
    var errors = e
    errors.source = "CoffeeScript"
    errors.dest = "JavaScript"
    errors.filename = filePath
    errors.stack = fileContents.toString()
    errors.lineno = errors.location.first_line
    var script = null
    var error = new TerraformError(errors)
  }finally{
    callback(error, script)
  }
}
