
var fs          = require('fs')
var path        = require('path')
var stylesheet  = require('./lib/stylesheet')
var template    = require('./lib/template')

// expose helpers
var helpers = exports.helpers = require('./lib/helpers')

exports.root = function(root, callback){

  var layout  = helpers.findFirstFile(root, ["_layout.jade", "_layout.html.jade"])
  var data    = helpers.dataTree(root)

  return {

    /**
     * Render
     *
     * This is the main method to to render a view. This function is
     * responsible to for figuring out the layout to use and sets the
     * `current` object.
     *
     */

    render: function(filePath, locals, callback){

      if(!callback){
        callback = locals
        locals   = {}
      }

      var ext = path.extname(filePath).replace(/^\./, '')

      if(["jade", "md"].indexOf(ext) !== -1) {

        /**
         * Current
         */

        locals.current = helpers.getCurrent(filePath)

        /**
         * Layout If no layout is passed in we want to use the default layout.
         *
         * Layout Priority:
         *
         *    1. passed into partial() function.
         *    2. in `_data.json` file.
         *    3. default layout.
         *    4. no layout
         */

        if(!locals.hasOwnProperty('layout')){

          /**
           * default layout
           */

          locals['layout'] = layout


          /**
           * _data.json layout
           */

          var templateLocals = helpers.walkData(locals.current.path, data)

          if(templateLocals && templateLocals.hasOwnProperty('layout')){
            locals['layout'] = templateLocals['layout']
          }

        }

        var output = template(root, { globals: { public: data } }).partial(filePath, locals)

        callback(null, output)

      }else if(["less"].indexOf(ext) !== -1){
        stylesheet(root, filePath, callback)
      }


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