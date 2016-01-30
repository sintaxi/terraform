var nunjucks = require('nunjucks')


/**
 * Partial tag for Nunjucks
 * 
 * Usage: {% partial fileName="partial.md", locals={stuff: 'will be passed to partial context'} %}
 */
 

function partialTag(locals) {
  this.tags = ['partial']
  
  this.parse = function(parser, nodes, lexer) {
    var tok = parser.nextToken()
    var args = parser.parseSignature(null, true)
    var fileName = args.children[0].value;
    
    if (args.children[1]) {
      args.children[1].children.map(function(arg) {
        locals[arg.key.value] = arg.value.value
      })
    }
    
    parser.advanceAfterBlockEnd(tok.value)
    
    return new nodes.CallExtension(this, 'run', args)
  }
  
  this.run = function(context, fileName) {
    var output = new nunjucks.runtime.SafeString(locals.partial(fileName))
    return output
  }
}

module.exports = partialTag