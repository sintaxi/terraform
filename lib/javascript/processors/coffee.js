var cs = require("coffee-script")

exports.compile = function(filePath, fileContents, callback){
  try{
    var errors = null
    var script = cs.compile(fileContents.toString(), { bare: true })
  }catch(e){
    var errors = e
    var script = null
  }finally{
    callback(errors, script)
  }
}
