var TerraformError = require("../../error").TerraformError
var fs             = require("fs")
var path           = require("path")

exports.compile = function(rootPath, filePath, options, callback){

  var srcFullPath = path.resolve(rootPath, filePath)

  try{
    var cs = require("coffeescript")
  }catch(e){
    try{
      var cs = require(process.cwd() + "/node_modules/coffeescript")
    }catch(e){
      console.log(e)
      console.log("--------------------------------------------------")
      console.log(" Oops: `coffeescript` not found                   ")
      console.log()
      console.log("    run: `npm install coffeescript --save-dev`")
      console.log()
      console.log("--------------------------------------------------")
      console.log()
      process.exit(1)
    }
  }

  try{
    var fileContents = fs.readFileSync(srcFullPath)
    var errors = null
    var script = cs.compile(fileContents.toString(), { bare: true })
  }catch(e){
    var errors = e
    errors.source = "CoffeeScript"
    errors.dest = "JavaScript"
    errors.filename = filePath
    errors.stack = fileContents.toString()
    errors.lineno = parseInt(errors.location.first_line ? errors.location.first_line + 1 : -1)
    var script = null
    var error = new TerraformError(errors)
  }finally{
    callback(error, script)
  }
}
