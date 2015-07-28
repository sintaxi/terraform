var Hjson          = require("hjson")
var TerraformError = require("../../error").TerraformError

exports.compile = function(filePath, fileContents, callback){

  var formatError = function(e){
    return new TerraformError({
      source: "Hjson",
      dest: "JSON",
      lineno: parseInt(e.line || -1),
      name: e.type + "Error",
      filename: filePath,
      message: e.message,
      stack: fileContents.toString()
    })
  }

  try {
    var obj = Hjson.parse(fileContents.toString())
    callback(null, obj)
  } catch (ex) {
    callback(formatError(ex))
  }
}
