var TerraformError = require("../../error").TerraformError

exports.compile = function(filePath, fileContents, callback){

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
