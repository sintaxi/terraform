var should    = require('should')
var polymer   = require('../')

describe("javascripts", function(){

  describe(".coffee", function(){
    var root = __dirname + "/fixtures/javascripts/coffee"
    var poly = polymer.root(root)

    it("should translate coffeescript to javascript", function(done){
      poly.render("main.coffee", function(errors, body){
        should.not.exist(errors)
        should.exist(body)
        console.log(body);
        body.should.not.include("\n\n")
        done()
      })
    })

    it("should return errors if invalid", function(done){
      poly.render("invalid.coffee", function(errors, body){
        should.exist(errors)
        should.not.exist(body)
        errors.should.have.property("name")
        errors.should.have.property("message")
        errors.should.have.property("stack")
        done()
      })
    })

  })

})
