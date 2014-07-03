var should    = require('should')
var polymer   = require('../')

describe("errors", function(){

  var root = __dirname + "/fixtures/errors"
  var poly = polymer.root(root)

  var log = function(error){
    console.log("\n")
    console.log("source     :", error.source)
    console.log("dest       :", error.dest)
    console.log("lineno     :", error.lineno)
    console.log("filename   :", error.filename)
    console.log("message    :", error.message)
    console.log("stacktrace :")
    console.log(error.stack)
  }

  describe(".less", function(){
    it("should get error if var missing in less", function(done){
      poly.render("less/novar.less", function(error, body){
        should.not.exist(body)
        should.exist(error)
        error.should.have.property('source')
        error.should.have.property('dest')
        error.should.have.property('lineno', 3)
        error.should.have.property('filename')
        error.should.have.property('message')
        error.should.have.property('stack')
        done()
      })
    })

    it("should get errors if syntax not correct", function(done){
      poly.render("less/invalid.less", function(error, body){
        should.not.exist(body)
        should.exist(error)
        error.should.have.property('source')
        error.should.have.property('dest')
        error.should.have.property('lineno', 3)
        error.should.have.property('filename')
        error.should.have.property('message')
        error.should.have.property('stack')
        done()
      })
    })
  })

  describe(".ejs", function(){
    it("should get error if var missing var", function(done){
      poly.render("ejs/novar.ejs", function(error, body){
        should.not.exist(body)
        should.exist(error)
        error.should.have.property('source')
        error.should.have.property('dest')
        error.should.have.property('lineno')
        error.should.have.property('filename')
        error.should.have.property('message')
        error.should.have.property('stack')
        done()
      })
    })

    it("should get errors if syntax not correct", function(done){
      poly.render("ejs/invalid.ejs", function(error, body){
        should.not.exist(body)
        should.exist(error)
        error.should.have.property('source')
        error.should.have.property('dest')
        error.should.have.property('lineno')
        error.should.have.property('filename')
        error.should.have.property('message')
        error.should.have.property('stack')
        done()
      })
    })
  })

  describe(".jade", function(){
    it("should get errors obj from jade", function(done){
      poly.render("jade/novar.jade", function(error, body){
        should.not.exist(body)
        should.exist(error)
        error.should.have.property('source')
        error.should.have.property('dest')
        error.should.have.property('lineno')
        error.should.have.property('filename')
        error.should.have.property('message')
        error.should.have.property('stack')
        done()
      })
    })

    it("should error with invalid file", function(done){
      poly.render("jade/invalid.jade", function(error, body){
        should.not.exist(body)
        should.exist(error)
        error.should.have.property('source')
        error.should.have.property('dest')
        error.should.have.property('lineno', 3)
        error.should.have.property('filename')
        error.should.have.property('message')
        error.should.have.property('stack')
        done()
      })
    })

    it("should get template error even with valid layout", function(done){
      poly.render("jade/novar.jade", { layout: "jade/_layout" }, function(error, body){
        should.not.exist(body)
        should.exist(error)
        error.should.have.property('source')
        error.should.have.property('dest')
        error.should.have.property('lineno')
        error.should.have.property('filename')
        error.should.have.property('message')
        error.should.have.property('stack')
        error.stack.should.not.include('layout')
        done()
      })
    })

    it("should get layout error even with invalid layout", function(done){
      poly.render("jade/valid.jade", { layout: "jade/_invalid_layout" }, function(error, body){
        should.not.exist(body)
        should.exist(error)
        error.should.have.property('source')
        error.should.have.property('dest')
        error.should.have.property('lineno', 2)
        error.should.have.property('filename')
        error.should.have.property('message')
        error.should.have.property('stack')
        error.stack.should.include('layout')
        done()
      })
    })

    it("should get correct partial error", function(done){
      poly.render("jade/nested_one.jade", { layout: "jade/_layout" }, function(error, body){
        should.not.exist(body)
        should.exist(error)
        error.should.have.property('source')
        error.should.have.property('dest')
        error.should.have.property('lineno')
        error.should.have.property('filename')
        error.should.have.property('message')
        error.should.have.property('stack')
        error.stack.should.include('three')
        done()
      })
    })
  })



  describe(".styl", function(){
    it("should send proper error object when missing variable.", function(done){
      poly.render("styl/novar.styl", function(error, body){
        should.not.exist(body)
        should.exist(error)
        error.should.have.property('source')
        error.should.have.property('dest')
        error.should.have.property('lineno', 3)
        error.should.have.property('filename')
        error.should.have.property('message')
        error.should.have.property('stack')
        done()
      })
    })

    it("should error with invalid file", function(done){
      poly.render("styl/invalid.styl", function(error, body){
        should.not.exist(body)
        should.exist(error)
        error.should.have.property('source', "Stylus")
        error.should.have.property('dest', "CSS")
        error.should.have.property('lineno', 3)
        error.should.have.property('filename')
        error.should.have.property('message')
        error.should.have.property('stack')
        done()
      })
    })
  })

  describe(".coffee", function(){
    it("should error with invalid file", function(done){
      poly.render("coffee/invalid.coffee", function(error, body){
        should.not.exist(body)
        should.exist(error)
        error.should.have.property('source', "CoffeeScript")
        error.should.have.property('dest', "JavaScript")
        error.should.have.property('lineno', 3)
        error.should.have.property('filename')
        error.should.have.property('message')
        error.should.have.property('stack')
        done()
      })
    })
  })

  describe(".scss", function(){
    it("should get error if var missing in scss", function(done){
      poly.render("scss/novar.scss", function(error, body){
        should.not.exist(body)
        should.exist(error)
        error.should.have.property('source')
        error.should.have.property('dest')
        error.should.have.property('lineno')
        error.should.have.property('filename')
        error.should.have.property('message')
        error.should.have.property('stack')
        done()
      })
    })

    it("should get errors if syntax not correct", function(done){
      poly.render("scss/invalid.scss", function(error, body){
        should.not.exist(body)
        should.exist(error)
        error.should.have.property('source')
        error.should.have.property('dest')
        error.should.have.property('lineno')
        error.should.have.property('filename')
        error.should.have.property('message')
        error.should.have.property('stack')
        done()
      })
    })
  })

  describe(".sass", function(){
    it("should get error if var missing in sass", function(done){
      poly.render("sass/novar.sass", function(error, body){
        should.not.exist(body)
        should.exist(error)
        error.should.have.property('source')
        error.should.have.property('dest')
        error.should.have.property('lineno')
        error.should.have.property('filename')
        error.should.have.property('message')
        error.should.have.property('stack')
        done()
      })
    })

    it("should get errors if syntax not correct", function(done){
      poly.render("sass/invalid.sass", function(error, body){
        should.not.exist(body)
        should.exist(error)
        error.should.have.property('source')
        error.should.have.property('dest')
        error.should.have.property('lineno')
        error.should.have.property('filename')
        error.should.have.property('message')
        error.should.have.property('stack')
        done()
      })
    })
  })

})
