var should    = require('should')
var polymer   = require('../')

describe("JSON", function(){

  describe(".cson", function(){
    var root = __dirname + "/fixtures/json/cson"
    var poly = polymer.root(root)

    it("should convert CSON to JSON", function(done){
      poly.render("data.cson", function(errors, body){
        should.not.exist(errors)
        should.exist(body)
        done()
      })
    })
    it("should return errors if syntax is invalid", function(done){
      poly.render("invalid.cson", function(errors, body){
        should.exist(errors)
        should.not.exist(body)
        errors.should.have.property("name")
        errors.should.have.property("message")
        errors.should.have.property("stack")
        done()
      })
    })

  })
  
  describe(".hjson", function() {
    var root = __dirname + "/fixtures/json/hjson"
    var poly = polymer.root(root)

    it("should convert Hjson to JSON", function(done){
      poly.render("data.hjson", function(errors, body){
        should.not.exist(errors)
        should.exist(body)
        done()
      })
    })
    it("should return errors if property name is missing", function(done){
      poly.render("invalid.hjson", function(errors, body){
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
