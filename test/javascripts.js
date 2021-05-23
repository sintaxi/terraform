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
    it("should minify beyond preprocessor", function(done){
      poly.render("main.coffee", function(errors, body){
        should.not.exist(errors)
        //body.should.not.include("\n\n")
        done()
      })
    })
    it("shouldn’t strip unused javascript when minifying", function(done){
      poly.render("unused.coffee", function(errors, body){
        should.not.exist(errors)
        body.should.include("alert")
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

  // describe("browserify", function() {
  // 	var root = __dirname + "/fixtures/javascripts/browserify"
	 //  var poly = polymer.root(root)

  //   process.chdir(root)

  //   it("should require coffeescript file in coffeescript", function(done) {
  //     poly.render("require_coffee.coffee", function(errors, body) {
  //       should.not.exist(errors)
  //       body.should.include("MODULE_NOT_FOUND")
  //       done()
  //     })
  //   })
  //   it("should require javascript file in coffeescript", function(done) {
  //     poly.render("require_js.coffee", function(errors, body) {
  //       should.not.exist(errors)
  //       body.should.include("MODULE_NOT_FOUND")
  //       done()
  //     })
  //   })
  //   it("should require coffeescript file in javascript", function(done) {
  //     poly.render("require_coffee.js", function(errors, body) {
  //       should.not.exist(errors)
  //       body.should.include("MODULE_NOT_FOUND")
  //       done()
  //     })
  //   })
  //   it("should require javascript file in javascript", function(done) {
  //     poly.render("require_js.js", function(errors, body) {
  //       should.not.exist(errors)
  //       body.should.include("MODULE_NOT_FOUND")
  //       done()
  //     })
  //   })
  //   it("should skip commented require in coffeescript", function(done) {
  //     poly.render("comment.coffee", function(errors, body) {
  //       should.not.exist(errors)
  //       body.should.not.include("MODULE_NOT_FOUND")
  //       done()
  //     })
  //   })
  //   it("should skip commented require in javascript", function(done) {
  //     poly.render("comment.js", function(errors, body) {
  //       should.not.exist(errors)
  //       body.should.not.include("MODULE_NOT_FOUND")
  //       done()
  //     })
  //   })
  //   it("should skip already declared require in coffeescript", function(done) {
  //     poly.render("declared.coffee", function(errors, body) {
  //       should.not.exist(errors)
  //       body.should.not.include("MODULE_NOT_FOUND")
  //       done()
  //     })
  //   })
  //   it("should skip already declared require in javascript", function(done) {
  //     poly.render("declared.js", function(errors, body) {
  //       should.not.exist(errors)
  //       body.should.not.include("MODULE_NOT_FOUND")
  //       done()
  //     })
  //   })
  //   it("should require javascript file in heavily nested coffeescript", function(done) {
  //     poly.render("nested/way/in/here/nested.coffee", function(errors, body) {
  //       should.not.exist(errors)
  //       body.should.include("MODULE_NOT_FOUND")
  //       done()
  //     })
  //   })
  //   it("should require javascript file in heavily nested javascript file", function(done) {
  //     poly.render("nested/way/in/here/nested.js", function(errors, body) {
  //       should.not.exist(errors)
  //       body.should.include("MODULE_NOT_FOUND")
  //       done()
  //     })
  //   })
  // })

})
