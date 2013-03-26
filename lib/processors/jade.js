var jade    = require("jade")
var path    = require("path")
var fs      = require("fs")
var helpers = require("../helpers")

module.exports = function(file, options, callback){
  
  var root    = options.root
  var locals  = options.locals || {}
  
  if(!locals.hasOwnProperty("globals"))
    locals.globals = {}
  
  var scopedPartial = function(dirname, partentLocals){
    
    // allow zero locals
    if(!partentLocals)
      partentLocals = {}

    // return partial function
    return function(relPath, partialLocals){
      
      // add ext if it does not exist
      if(path.extname(relPath) != ".jade") relPath += ".jade"
      
      // resolve paths
      var filePath      = path.resolve(dirname, relPath)
      var fileContents  = fs.readFileSync(filePath)
      var render        = jade.compile(fileContents, { filename: filePath })
      var locals        = {}

      // copy over the parentLocals
      for(var local in partentLocals)
        locals[local] = partentLocals[local]

      // copy over the locals
      for(var local in partialLocals)
        locals[local] = partialLocals[local]

      // pass a properly scoped partial function as a local
      locals.partial  = scopedPartial(path.dirname(filePath), locals)

      // render the partial
      return render(locals)
    }
  }
  
  // set current before starting
  var namespace = file.split(".")[0].split("/")

  locals.current = {
    source: namespace[namespace.length -1],
    path: namespace
  }
  
  // copy over the templateLocals
  var templateLocals = helpers.walkData(namespace, locals.globals.public || {})
  
  for(var local in templateLocals)
    locals[local] = templateLocals[local]
  
  // render partial
  try{
    var html = scopedPartial(path.resolve(root), locals)(file)
    
    ////////////////////
    // layout
    ////////////////////

    if(templateLocals && templateLocals.hasOwnProperty("layout")){
      if(templateLocals["layout"] === false){
        var customLayoutPath = false
      }else{
        var customLayoutPath = path.resolve(root, templateLocals["layout"])
      }
    }else{
      // relative layout
      var absolutePath  = path.resolve(root, file)
      var dirname       = path.dirname(absolutePath)
      var layoutPath    = path.resolve(dirname, "_layout.jade")

      // default layout
      var defaultLayoutPath = path.resolve(root, "_layout.jade")      
    }

    if(customLayoutPath !== false){
      if(fs.existsSync(customLayoutPath)){
        locals.yield = html
        var html = scopedPartial(path.resolve(root), locals)(customLayoutPath)
      }else if(fs.existsSync(layoutPath)){
        locals.yield = html
        var html = scopedPartial(path.resolve(root), locals)(layoutPath) 
      }else if(fs.existsSync(defaultLayoutPath)){
        locals.yield = html
        var html = scopedPartial(path.resolve(root), locals)(defaultLayoutPath)
      }      
    }
    
    callback(null, html)
  }catch(e){
    return callback(e)
  }
  
}
