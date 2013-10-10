var sass = require("node-sass")
var TerraformError = require("../../error").TerraformError

exports.compile = function(filePath, dirs, fileContents, callback){
  sass.render({
    file: filePath,
    success: function(css) {
      callback(null, css);
    },
    error: function(error) {
      err.source    = "Sass"
      err.dest      = "CSS"
      err.name      = "Sass Error"
      err.lineno    = err.lineno || 99
      err.filename  = filePath
      err.stack     = fileContents
      var arr       = err.message.split("\n\n")
      err.message   = arr[arr.length - 1].split("\n")[0]
      var error     = new TerraformError(err)
      callback(error);
    }
  });
}


