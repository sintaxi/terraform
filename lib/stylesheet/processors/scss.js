var scss = require("node-sass")
var TerraformError = require("../../error").TerraformError

exports.compile = function(filePath, dirs, fileContents, callback){
  scss.render({
    file: filePath,
    success: function(css) {
      callback(null, css);
    },
    error: function(e) {
      var arr = e.split(": ")
      var arrg = arr[0].split(":")
      var error = new TerraformError({
        source: "SCSS",
        dest: "CSS",
        lineno: arrg[1] || 99,
        name: "SCSS Error",
        message: arr[3] ? arr[2] + " " + arr[3].trim().replace(/"/g, '\\"') : arr[2].trim(),
        filename: arrg[0] || filePath,
        stack: fileContents.toString()
      })
      return callback(error)
    }
  });
}