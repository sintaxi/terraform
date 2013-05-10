var fs          = require("fs")
var path        = require("path")

if(process.env.NODE_ENV == "production"){
  var helpers = require('../lru-helpers')
}else{
  var helpers = require('../helpers')
}

var processors = {
  "jade"  : require("./processors/jade"),
  "md"    : require("./processors/md")
}


/**
 * Scope
 *
 * A closure to properly scope the `partial` function so that
 * we can pass the `partial` function into the template and it
 * will have access to the correct local varialbes.
 *
 */

var scope = module.exports = function(projectPath, partentLocals){

  if(!partentLocals) partentLocals = {}

  return {

    /**
     * Partial
     *
     * This is the function for rendering a template. It is has access
     * to the partials of its parent template but accepts locals that
     * will override that the variables that it inherents from its parent.
     * If given a local of `layout` it will use it.
     *
     */

    partial: function(relPath, partialLocals){
      var priorityList    = helpers.buildPriorityList(relPath)
      var relPath         = helpers.findFirstFile(projectPath, priorityList)

      if(relPath === null) return null

      var filePath        = path.resolve(projectPath, relPath)
      var partialCurrent  = helpers.getCurrent(relPath)
      var templateLocals  = helpers.walkData(partialCurrent.path, partentLocals.globals.public)
      var fileContents    = fs.readFileSync(filePath)
      var ext             = path.extname(relPath).replace(/^\./, '')

      /**
       * No file content so we return.
       */


      if(!fileContents) return null


      /**
       * Allow no locals
       */

      if(!partialLocals) partialLocals = {}


      /**
       * Our local object that we will pass into the template.
       */

      var locals = {}


      /**
       * Add the parent locals.
       */

      for(var local in partentLocals){
        locals[local] = partentLocals[local]
      }


      /**
       * Add the locals the are added to the `_data.json` file.
       * We ignore the `layout` value here because the layout
       * property should not be inherited when just being called
       * as a partial.
       */

      for(var local in templateLocals){
        if(local !== 'layout') locals[local] = templateLocals[local]
      }


      /**
       * Finally we add the locals that were passed into the partial.
       */

      for(var local in partialLocals){
        locals[local] = partialLocals[local]
      }


      /**
       * We don't want to have the child partials inherit `layout` so
       * we need to assign it to a varialbe so that we can delete it.
       */

      if(locals.hasOwnProperty("layout")){
        var layout = locals["layout"]
      }


      /**
       * We delete the layout because the children partials should not
       * inherit the layout of its parent.
       */

      delete locals["layout"]


      /**
       * Pass a properly scoped partial function as a local notice how
       * the locals are passed in with it. These become the parentLocals.
       */

      locals.partial = scope(path.dirname(filePath), locals).partial


      /**
       * If the partial has a layout we render the partial first and pass
       * that in as `yield` property when we render the layout.
       *
       *  note - layouts get the same scope as the partial
       *
       */

      var render = processors[ext](filePath, fileContents)

      if(layout){
        return scope(projectPath, locals).partial(layout, { yield: render(locals) })
      }else{
        return render(locals)
      }

    }
  }

}
