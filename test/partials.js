var should    = require('should')
var polymer   = require('../')

describe("partials", function(){
  
  var root = __dirname + "/fixtures/partials"
  
  it("should have mixes partials with locals", function(done){
    polymer.root(root).render("index.jade", function(error, body){
      should.not.exist(error)
      should.exist(body)
      body.should.include("<h1>Hello</h1>")
      body.should.include("<h2>Hello World</h2>")
      body.should.include("<h2>Hello Brazil</h2>")
      body.should.include("<h2>Hello Canada</h2>")
      body.should.include("<h2>Hello Gastown</h2>")
      done()
    })
  })
  
})