var scope   = require("./scope")
var helpers = require('../helpers')
var fs      = require('fs')

// module.exports = function(filePath, options, callback){
//   if(!options) options = {}

//   // globals
//   if(!options.hasOwnProperty("globals"))
//     options.globals = { public: helpers.dataTree(options.root) }

//   // current
//   if(!options.hasOwnProperty("current"))
//     options.current = helpers.getCurrent(filePath)

//   // locals
//   if(!options.hasOwnProperty("locals"))
//     options.locals = {}

//   // layout
//   if(options.layout)
//     options.locals['layout'] = options.layout

//   try{
//     var output = scope(options.root, { "globals": options.globals, "current": options.current }).partial(filePath, options.locals)
//     callback(null, output)
//   }catch(err){
//     callback(err)
//   }

// }