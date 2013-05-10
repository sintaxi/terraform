var fs          = require('fs')
var path        = require('path')
var stylesheet  = require('./lib/stylesheet')
var template    = require('./lib/template')

if(process.env.NODE_ENV == "production"){
  var helpers = require('./lib/lru-helpers')
}else{
  var helpers = require('./lib/helpers')
}

// expose helpers
exports.helpers = helpers

exports.root = function(root, globals){

  if(!globals){
    globals  = {}
  }

  var layout  = helpers.findFirstFile(root, ["_layout.jade", "_layout.html.jade"])

  var data    = helpers.dataTree(root)

  var templateObject = { globals: { public: data } }

  for(var key in globals){
    templateObject['globals'][key] = globals[key]
  }


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

      var arr = filePath.split(path.sep)
      var startsWithUnderscore = arr.map(function(i){ return i.indexOf("_") }).indexOf(0) !== -1

      if(startsWithUnderscore) return callback(null, null)

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

        try{
          var error   = null
          var output  = template(root, templateObject).partial(filePath, locals)
        }catch(e){
          var error   = e
          var output  = null
        }finally{
          callback(error, output)
        }

      }else if(["less"].indexOf(ext) !== -1){
        stylesheet(root, filePath, callback)
      }else{
        callback(null, null)
      }


    }
  }

}
