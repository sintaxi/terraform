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

  describe(".cjsx", function(){
    var root = __dirname + "/fixtures/javascripts/cjsx"
    var poly = polymer.root(root)

    it("should translate cjsx to javascript", function(done){
      poly.render("main.cjsx", function(errors, body){
        should.not.exist(errors)
        should.exist(body)
        done()
      })
    })

    it("should return errors if invalid", function(done){
      poly.render("invalid.cjsx", function(errors, body){
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
