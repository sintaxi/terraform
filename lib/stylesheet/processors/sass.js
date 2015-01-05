var sass = require("node-sass")
var TerraformError = require("../../error").TerraformError

exports.compile = function(filePath, dirs, fileContents, callback){
  sass.render({
    file: filePath,
    includePaths: dirs,
    success: function(css) {
      callback(null, css.css);
    },
    error: function(e) {
      var error = new TerraformError ({
        source: "Sass",
        dest: "CSS",
        lineno: e.line || 99,
        name: "Sass Error",
        message: e.message,
        filename: e.file || filePath,
        stack: fileContents.toString()
      })
      return callback(error)
    },
    outputStyle: 'compressed'
  });
}
