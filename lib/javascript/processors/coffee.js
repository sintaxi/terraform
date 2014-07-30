var cs = require("coffee-script")
var TerraformError = require("../../error").TerraformError

exports.compile = function(filePath, fileContents, callback){
  try{
    var errors = null
    //source maps off by default, unless `NODE_ENV=dev harp server app.js` is run.
    var useMaps = process.env.coffee_map || process.env.NODE_ENV=="dev"?true:false;
    var script = cs.compile(fileContents.toString(), { bare: true , map : useMaps })
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
