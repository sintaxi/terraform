var should    = require('should')
var polymer   = require('../')

describe("errors", function(){

  var root = __dirname + "/fixtures/errors"
  var poly = polymer.root(root)

  it("should get errors obj from jade", function(done){
    poly.render("novar.jade", function(error, body){
      should.not.exist(body)
      should.exist(error)
      // console.log("name", error.name)
      // console.log("message", error.message)
      // console.log("--------")
      // console.log("stack", error.stack)
      // console.log("--------")
      error.should.have.property('name')
      error.should.have.property('message')
      //error.should.have.property('path')
      error.should.have.property('stack')
      done()
    })
  })

  it("should get error if var missing in less", function(done){
    poly.render("novar.less", function(error, body){
      should.not.exist(body)
      should.exist(error)
      error.should.have.property('name')
      error.should.have.property('message')
      //error.should.have.property('path')
      error.should.have.property('stack')
      done()
    })
  })

  it("should get errors if syntax not correct", function(done){
    poly.render("invalid.less", function(error, body){
      should.not.exist(body)
      should.exist(error)
      error.should.have.property('name')
      error.should.have.property('message')
      //error.should.have.property('path')
      error.should.have.property('stack')
      done()
    })
  })

})