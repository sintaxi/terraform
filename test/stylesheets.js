var should  = require('should')
var polymer = require('../')

describe("stylesheets", function(){

  describe(".less", function(){

    var root = __dirname + '/fixtures/stylesheets/less'
    var poly = polymer.root(root)

    it("should have basic css file", function(done){
      poly.render("main.less", function(error, body){
        should.not.exist(error)
        body.should.include("body{background:pink;}")
        done()
      })
    })

    it("should return errors if error found", function(done){
      poly.render("invalid.less", function(error, body){
        should.not.exist(body)
        should.exist(error)
        error.should.have.property("name")
        error.should.have.property("message")
        error.should.have.property("stack")
        done()
      })
    })

  })

  describe(".stylus", function(){

    var root = __dirname + '/fixtures/stylesheets/stylus'
    var poly = polymer.root(root)

    // it("should have basic css file", function(done){
    //   poly.render("main.stylus", function(error, body){
    //     should.not.exist(error)
    //     body.should.include("body{background:pink;}")
    //     done()
    //   })
    // })

    // it("should return errors if error found", function(done){
    //   poly.render("invalid.stylus", function(error, body){
    //     should.not.exist(body)
    //     should.exist(error)
    //     error.should.have.property("name")
    //     error.should.have.property("message")
    //     error.should.have.property("stack")
    //     done()
    //   })
    // })

  })