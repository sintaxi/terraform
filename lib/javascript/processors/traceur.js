var TerraformError = require("../../error").TerraformError

var fs = require('fs')
var es6ifyCompile = require('es6ify/compile')
var traceurRuntime = fs.readFileSync(require('es6ify').runtime).toString()

function compile (path, contents) {
  var result = es6ifyCompile(path, contents), error, e
  if (result.error) {
    error = result.error.split(':') || []
    e = new Error()
    e.lineno = error[1] || -1
    e.message = result.error
    throw e
  }
  return result.source;
}

exports.compile = function (filePath, fileContents, callback) {
  var error = null, script, patchedRuntime

  try {
    // traceur patch https://github.com/google/traceur-compiler/pull/323
    patchedRuntime = traceurRuntime.replace(/'use strict'/,
                                            "'use strict';\n  if (global.$traceurRuntime) { return; }")
    script = patchedRuntime + compile(filePath, fileContents.toString())
  } catch (e) {
    e.source = "TraceurScript"
    e.dest = "JavaScript"
    e.filename = filePath
    e.stack = fileContents.toString()
    error = new TerraformError(e)
    script = null
  } finally {
    callback(error, script)
  }
}
