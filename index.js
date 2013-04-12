var fs          = require('fs')
var path        = require('path')
var template    = require('./lib/template')
var stylesheet  = require('./lib/stylesheet')

var scope       = require("./lib/template/scope")


// expose helpers
exports.helpers = helpers = require('./lib/helpers')

exports.root = function(root, callback){
  
  var layout  = helpers.findFirstFile(root, ["_layout.jade", "_layout.html.jade"])
  var data    = helpers.dataTree(root)
  
  return {
    render: function(filePath, locals, callback){
      
      /** 
       * locals are optional
       */
       
      if(!callback){
        callback = locals
        locals   = {}
      }
      
      /** 
       * layout
       */
       
      if(layout) locals['layout'] = layout

      /** 
       * current
       */
       
      locals.current = helpers.getCurrent(filePath)
      
      
      /** 
       * copy over the templateLocals
       */
       
      var templateLocals = helpers.walkData(locals.current.path, data)

      for(var local in templateLocals){
        locals[local] = templateLocals[local]
      }

      /** 
       * render file
       */
       
      var output = scope(root, { globals: { public: data } }).partial(filePath, locals)
      callback(null, output)
    }
  }
  
}

// exports.process = function(sourcePath, options, callback){
//   
//   // get extension
//   var ext = path.extname(sourcePath).replace(/^\./, '')
//   
//   var info = {
//     sourcePath: sourcePath,
//     sourceType: helpers.sourceType(sourcePath),
//     outputPath: helpers.outputPath(sourcePath),
//     outputType: helpers.outputType(sourcePath)
//   }
//   
//   /**
//    * Templates
//    */ 
//   if(["jade", "md"].indexOf(ext) !== -1) {
//     var render = template
//   
//   /**
//    * Stylesheets
//    */
//   }else if(["less"].indexOf(ext) !== -1){
//     var render = stylesheet
//   }
//   
//   render(sourcePath, options, function(err, output){
//     callback(err, info, output)
//   })
//   
// }