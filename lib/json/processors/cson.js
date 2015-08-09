var CSON          = require("cson")
var TerraformError = require("../../error").TerraformError

exports.compile = function(filePath, fileContents, callback){

  var formatError = function(e){
    return new TerraformError({
      source: "CSON",
      dest: "JSON",
      lineno: parseInt(e.line || -1),
      name: e.type + "Error",
      filename: filePath,
      message: e.message,
      stack: fileContents.toString()
    })
  }

  CSON.parse(fileContents.toString(), {}, function(err, obj) {
    if (err)
      return callback(formatError(err))
    callback(null, obj)
  })
}
