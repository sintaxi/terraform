var scss = require("node-sass")
var eyeglass = require("eyeglass")
var TerraformError = require("../../error").TerraformError

exports.compile = function(filePath, dirs, fileContents, callback){
  var opts = {
    file: filePath,
    includePaths: dirs,
    outputStyle: 'compressed',
    sourceMap: true,
    sourceMapEmbed: false,
    sourceMapContents: true,
    outFile: filePath,
    omitSourceMapUrl: true,
    eyeglass: {
      engines: {
        sass: scss
      }
    }
  }

  scss.render(eyeglass(opts), function (e, css) {
    if (e) {
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
    }
    callback(null, css.css, css.map.toString())
  });
}
