var ls = require("LiveScript")
var TerraformError = require("../../error").TerraformError

exports.compile = function(filePath, fileContents, callback){
  try{
    var errors = null
    var script = ls.compile(fileContents.toString(), { bare: true })
  }catch(e){
    var errors = {}
    errors.source = "LiveScript"
    errors.dest = "JavaScript"
    errors.filename = filePath
    errors.location = { first_line: 0 }
    if (/Error: ([^:]+) on line (\d+): (.+)/.test(e)){  
        errors.name = RegExp.$1
        errors.location.first_line = Number(RegExp.$2)
        errors.message = RegExp.$3
    }
    errors.stack = fileContents.toString()
    errors.lineno = parseInt(errors.location.first_line ? errors.location.first_line + 1 : -1)
    var script = null
    var error = new TerraformError(errors)
  }finally{
    callback(error, script)
  }
}
