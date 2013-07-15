var cs = require("coffee-script")

exports.compile = function(filePath, fileContents, callback){
  try{
    var errors = null
    var script = cs.compile(fileContents.toString(), { bare: true })
  }catch(e){
    var errors = e
    errors.source = "CoffeeScript"
    errors.dest = "JavaScript"
    errors.filename = filePath
    errors.stack = fileContents.toString()
    errors.lineno = errors.location.first_line
    var script = null
  }finally{
    callback(errors, script)
  }
}
