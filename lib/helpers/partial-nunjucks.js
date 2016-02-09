var nunjucks = require('nunjucks')


/**
 * Partial tag for Nunjucks
 *
 * Usage: {% partial fileName="partial.md", arg1="Value", arg2="Value"%}
 */

var util = require('util');

function partialTag(locals) {
  this.tags = ['partial']

  this.parse = function(parser, nodes, lexer) {
    var tok = parser.nextToken()
    var args = parser.parseSignature(null, true)
    parser.advanceAfterBlockEnd(tok.value)

    return new nodes.CallExtension(this, 'run', args)
  }

  this.run = function(context, fileName, args) {
    console.log(args)

    for (key in args) {
      locals[key] = args[key]
    }

    var output = new nunjucks.runtime.SafeString(locals.partial(fileName))
    return output
  }
}

module.exports = partialTag