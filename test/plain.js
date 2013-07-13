var should    = require('should')
var polymer   = require('../')

describe("plain", function(){

  var root = __dirname + "/fixtures/plain"
  var poly = polymer.root(root)

  it("should fire callback when", function(done){
    poly.render("index.html", function(error, body){
      should.not.exist(body)
      should.not.exist(error)
      done()
    })
  })

})