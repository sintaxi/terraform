var should    = require('should')
var polymer   = require('../')

describe("partials", function(){

  var root = __dirname + "/fixtures/partials"
  var poly = polymer.root(root)

  it("should have mixes partials with locals", function(done){
    poly.render("index.jade", function(error, body){
      // console.log("in callback")
      // console.log("error:", error)
      // console.log("body:", body)
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

  // it("should be able to reference partial without ext", function(done){
  //   poly.render("noext.jade", function(error, body){
  //     should.not.exist(error)
  //     should.exist(body)
  //     body.should.include("<h2>Hello Brazil</h2>")
  //     done()
  //   })
  // })
})