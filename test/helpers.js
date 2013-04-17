var should    = require('should')
var polymer   = require('../')

describe("helpers", function(){
  // TBD
  it("should handle missing file", function(done){
    polymer.root(__dirname + "/fixtures/data").render("missing.jade", function(error, body){
      should.not.exist(error)
      should.not.exist(body)
      done()
    })
  })
})