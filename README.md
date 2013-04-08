# polymer

Pre-processor for the Harp APF.

## Usage

    var polymer = require('polymer')

    polymer.process("foo.jade", { root: __dirname }, function(error, info, body){
      console.log(body)
    })



var polymer = require('polymer')
var project = polymer.project("/foobar", globals)

project.process(path, locals, function(error, info, body){
  
})