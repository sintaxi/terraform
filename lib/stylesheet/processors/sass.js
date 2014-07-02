var sass = require("node-sass")
var TerraformError = require("../../error").TerraformError

exports.compile = function(filePath, dirs, fileContents, callback){
  sass.render({
    file: filePath,
    includePaths: dirs,
    success: function(css) {
      callback(null, css);
    },
    error: function(e) {
      var arr = e.split(":")
      var error = new TerraformError ({
        source: "Sass",
        dest: "CSS",
        lineno: arr[1] || 99,
        name: "Sass Error",
        message: (arr[4] ? arr[3].replace("Backtrace", "").trim() + " " + arr[4].trim() : arr[3].trim()).replace(/"/g, '\\"'),
        filename: arr[0] || filePath,
        stack: fileContents.toString()
      })
      return callback(error)
    },
    outputStyle: 'compressed'
  });
}
