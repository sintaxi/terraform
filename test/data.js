var should    = require('should')
var polymer   = require('../')

describe("date", function(){

  var root = __dirname + "/fixtures/data"
  var poly = polymer.root(root)

  it("should be available in the layouts", function(done){
    poly.render("index.jade", function(error, body){
      should.not.exist(error)
      should.exist(body)
      body.should.include("<h1>My Articles</h1>")
      body.should.include("<h5>Earth people, New York to California</h5>")
      done()
    })
  })

  it("should be available in the template", function(done){
    poly.render("articles/hello-jupiter.jade", function(error, body){
      should.not.exist(error)
      should.exist(body)
      body.should.include("<h3>I was born on Jupiter</h3>")
      done()
    })
  })

})