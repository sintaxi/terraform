var should    = require('should')
var polymer   = require('../')

describe("underscores", function(){

  var root = __dirname + "/fixtures/underscores"

  it("should ignore file beginning with underscore", function(done){
    polymer.root(root).render("_beep.jade", function(error, body){
      should.not.exist(error)
      should.not.exist(body)
      done()
    })
  })

})