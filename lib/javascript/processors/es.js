var babel = require("babel-core")
var TerraformError = require("../../error").TerraformError

exports.compile = function(filePath, fileContents, callback) {
  var script = null
  var error = null
  try {
    script = babel.transform(fileContents.toString()).code
  } catch (e) {
    e.source = "Babel"
    e.dest = "JavaScript"
    e.filename = filePath
    e.lineno = parseInt(e.loc.line)
    error = new TerraformError(e)
    if (global.token) delete global.token // remove babel leak
  }finally{
    callback(error, script)
  }
}
