var nunjucks = require('nunjucks')

function partialTag(locals) {
  this.tags = ['partial']
  
  this.parse = function(parser, nodes, lexer) {
    var tok = parser.nextToken()
    var args = parser.parseSignature(null, true)
    parser.advanceAfterBlockEnd(tok.value)
    
    return new nodes.CallExtension(this, 'run', args)
  }
  
  this.run = function(context, args) {
    var output = new nunjucks.runtime.SafeString(locals.partial(args.fileName, args.locals))
    return output
  }
}

module.exports = partialTag