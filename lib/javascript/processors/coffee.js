var TerraformError = require("../../error").TerraformError
var path           = require("path")
var fs             = require("fs")

exports.compile = function(rootPath, filePath, options, callback){

  var srcFullPath = path.resolve(rootPath, filePath)

  fs.readFile(srcFullPath, function(err, data){

    /**
     * File not Found
     */

    if(err && err.code === 'ENOENT') return callback(null, null)

    /**
     * Read File Error
     */

    if(err) return callback(err)

    /**
     * Lookup Directories
     */

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
      var script = cs.compile(data.toString(), { bare: true })
    }catch(e){
      var errors = e
      errors.source = "CoffeeScript"
      errors.dest = "JavaScript"
      errors.filename = filePath
      errors.stack = data.toString()
      errors.lineno = parseInt(errors.location.first_line ? errors.location.first_line + 1 : -1)
      var script = null
      var error = new TerraformError(errors)
    }finally{
      return callback(error, script)
    }

    // var render = function(ext, data, cb) {
    //   processors[ext].compile(srcPath, data, function(err, js) {
    //     if (err) return cb(err)

    //     /**
    //      * Consistently minify
    //      */
    //     cb(null, js, minifyOpts)
    //   })
    // }

    // render(ext, data, callback)

  })

  // try{
  //   var cs = require("coffeescript")
  // }catch(e){
  //   try{
  //     var cs = require(process.cwd() + "/node_modules/coffeescript")
  //   }catch(e){
  //     console.log(e)
  //     console.log("--------------------------------------------------")
  //     console.log(" Oops: `coffeescript` not found                   ")
  //     console.log()
  //     console.log("    run: `npm install coffeescript --save-dev`")
  //     console.log()
  //     console.log("--------------------------------------------------")
  //     console.log()
  //     process.exit(1)
  //   }
  // }

  // try{
  //   var errors = null
  //   var script = cs.compile(fileContents.toString(), { bare: true })
  // }catch(e){
  //   var errors = e
  //   errors.source = "CoffeeScript"
  //   errors.dest = "JavaScript"
  //   errors.filename = filePath
  //   errors.stack = fileContents.toString()
  //   errors.lineno = parseInt(errors.location.first_line ? errors.location.first_line + 1 : -1)
  //   var script = null
  //   var error = new TerraformError(errors)
  // }finally{
  //   callback(error, script)
  // }
}
