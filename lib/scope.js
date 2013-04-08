var fs    = require("fs")
var path  = require("path")

var processors = {
  "jade" : require("jade")
}

var scope = function(projectPath, partentLocals){
  
  // allow zero locals
  if(!partentLocals) partentLocals = {}
  
  // return partial function
  return {
     
    /**
     * @public
     * @sync
     */
    partial: function(relPath, partialLocals){
      var filePath      = path.resolve(projectPath, relPath)
      var fileContents  = fs.readFileSync(filePath)
      
      if(!fileContents) return null
      
      var ext           = path.extname(relPath).replace(/^\./, '')
      var compile       = require(ext).compile      
      var render        = compile(fileContents, { filename: filePath })
      
      /**
       * Allow no locals
       */
       
      if(!partialLocals) partialLocals = {}

      
      /**
       * Layouts
       * 
       * layout is one value that the child does not inherit.
       * layout property does not cascade but layout may be
       * nested.
       * 
       * Layout Priority List:
       * 
       *    1.`layout` property passed into the partial
       *
       *        partial("somepart.jade", { layout: "somelayout.jade" })
       *
       *    2. value in `_data.json` file.
       *
       *        { "somepart" { layout: "somelayout.jade" } }
       * 
       * We should not walk the tree looking for a default layout
       * This may seem strange at first but it is the responsability
       * of the program to pass in a layout if it wishes and it will
       * have to do the walking.
       *
       */
       
      if(partialLocals.hasOwnProperty("layout")){
        var layout = partialLocals["layout"]
        delete partialLocals["layout"]
      }


      /**
       * Build up locals object inheriting from it parent
       */
       
      var locals = {}

      // copy over the parentLocals
      for(var local in partentLocals)
        locals[local] = partentLocals[local]

      // copy over the partialLocals
      for(var local in partialLocals)
        locals[local] = partialLocals[local]


      /**
       * Pass a properly scoped partial function as a local
       * notice how the locals are passed in with it. These
       * become the parentLocals.
       */

      locals.partial = scope(path.dirname(filePath), locals).partial


      /**
       * If the partial has a layout we render the partial first and pass
       * that in as `yield` property when we render the layout.
       * 
       *  note - layouts get the same scope as the partial
       *
       */
      
      if(layout){
        return scope(projectPath, locals).partial(layout, { yield: render(locals) })
      }else{
        return render(locals)
      }
      
    }    
  }
  
}

module.exports = scope
