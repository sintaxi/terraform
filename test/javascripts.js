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

    it("should browserify coffeescripts", function(done){
      poly.render("browserify.coffee", function(errors, body){
        should.not.exist(errors)
        should.exist(body)
        body.should.match(/typeof require=="function"/);
        body.should.match(/should = require\('should'\);/);
        done()
      })
    })

    it("should not browserify scripts that don't contain 'require' statements", function(done){
      poly.render("main.coffee", function(errors, body){
        should.not.exist(errors)
        should.exist(body)
        body.should.not.match(/typeof require=="function"/);
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
