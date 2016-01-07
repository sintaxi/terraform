var helpers        = require('../../helpers')
var minify         = require('harp-minify')
var TerraformError = require("../../error").TerraformError

exports.compile = function(filePath, fileContents, callback) {
	console.log(helpers.minifyOptions.javascript)
	try {
    var errors = null
    var script = minify.js(fileContents.toString(), helpers.minifyOptions.javascript)
		console.log(script)
  } catch(e) {
		var errors = e
		errors.source = 'JavaScript'
		errors.dest = 'JavaScript'
		errors.filename = filePath
		errors.stack = fileContents.toString()
		errors.lineno = parseInt(errors.location.first_line ? errors.location.first_line + 1 : -1)
		var script = null
		var error = new TerraformError(errors)
	} finally {
		callback(error, script)
	}
}
