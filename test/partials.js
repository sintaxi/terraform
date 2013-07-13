var should    = require('should')
var polymer   = require('../')

describe("partial()", function(){

  var root = __dirname + "/fixtures/partials"
  var poly = polymer.root(root)

  it("should have mixes partials with locals", function(done){
    poly.render("index.jade", function(error, body){
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

  it("should not render file with underscore", function(done){
    poly.render("_places/brazil.jade", function(error, body){
      should.not.exist(error)
      should.not.exist(body)
      done()
    })
  })
})