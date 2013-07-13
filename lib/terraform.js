var fs          = require('fs')
var path        = require('path')
var stylesheet  = require('./stylesheet')
var template    = require('./template')
var javascript  = require('./javascript')
var helpers     = require('./helpers')


/**
 * Expose Helpers
 *
 * We expose the helpers so that other libraries my use them.
 * Terraform is much more useful with these helpers.
 *
 */

exports.helpers = helpers


/**
 * Root
 *
 * This sets the home base directory for the app which affects
 * where we begin walking to build the home directory.
 *
 */

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


      /**
       * We ignore files that start with underscore
       */

      if(helpers.shouldIgnore(filePath)) return callback(null, null)


      /**
       * If template file we need to set current and other locals
       */

      if(helpers.isTemplate(filePath)) {

        /**
         * Current
         */

        locals.current = helpers.getCurrent(filePath)


        /**
         * If no layout is passed in we want to use the default layout.
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

        /**
         * TODO: understand again why we are doing this.
         */

        try{
          var error   = null
          var output  = template(root, templateObject).partial(filePath, locals)
        }catch(e){
          var error   = e
          var output  = null
        }finally{
          callback(error, output)
        }

      }else if(helpers.isStylesheet(filePath)){
        stylesheet(root, filePath, callback)
      }else if(helpers.isJavaScript(filePath)){
        javascript(root, filePath, callback)
      }else{
        callback(null, null)
      }


    }
  }

}
