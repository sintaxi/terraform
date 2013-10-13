var should    = require('should')
var polymer   = require('../')

describe("javascripts", function(){

  describe("traceur", function(){
    var root = __dirname + "/fixtures/javascripts/traceur"
    var poly = polymer.root(root)

    it("should translate traceurscript to javascript", function(done){
      poly.render("main.traceur", function(errors, body){
        should.not.exist(errors)
        should.exist(body)
        body.should.include("add = (function(x, y) {\n  return x + y;\n});\n")
        done()
      })
    })

    it("should return errors if invalid", function(done){
      poly.render("invalid.traceur", function(errors, body){
        should.exist(errors)
        should.not.exist(body)
        errors.should.have.property("name")
        errors.should.have.property("message")
        errors.should.have.property("stack")
        done()
      })
    })

  })

  describe(".coffee", function(){
    var root = __dirname + "/fixtures/javascripts/coffee"
    var poly = polymer.root(root)

    it("should translate coffeescript to javascript", function(done){
      poly.render("main.coffee", function(errors, body){
        should.not.exist(errors)
        should.exist(body)
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
