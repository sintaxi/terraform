var should    = require('should')
var polymer   = require('../')

describe("data", function(){

  var root = __dirname + "/fixtures/data"
  var poly = polymer.root(root)

  it("should be available in the layouts", function(done){
    poly.render("index.jade", function(error, body){
      should.not.exist(error)
      should.exist(body)
      body.should.include("<h1>My Articles</h1>")
      body.should.include('<h5 class="feature">Earth people, New York to California</h5>')
      done()
    })
  })

  it("should be available in the template", function(done){
    poly.render("articles/hello-jupiter.jade", function(error, body){
      should.not.exist(error)
      should.exist(body)
      body.should.include("<h3>I was born on Jupiter</h3>")
      body.should.include("<h4>Brock Whitten</h4>")
      done()
    })
  })

  it("should be available to override data when calling partial", function(done){
    poly.render("index.jade", function(error, body){
      should.not.exist(error)
      should.exist(body)
      body.should.include("<h3>I was born on Jupiter</h3>")
      body.should.include("<h4>Kool Keith</h4>")
      done()
    })
  })

})