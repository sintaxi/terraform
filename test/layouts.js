var should    = require('should')
var polymer   = require('../')

describe("layout", function(){

  describe("none", function(){
    var root = __dirname + "/fixtures/layouts/none"
    var poly = polymer.root(root)

    it("should render with no layout", function(done){
      poly.render("index.jade", function(errors, body){
        should.not.exist(errors)
        should.exist(body)
        body.should.eql("<h2>Home Page</h2>")
        done()
      })
    })

    it("should render with no layout too", function(done){
      poly.render("false/layout-false.jade", function(errors, body){
        should.not.exist(errors)
        should.exist(body)
        body.should.eql("<h2>Layout Explicitly Set to False</h2>")
        done()
      })
    })
  })

  describe("base", function(){
    var root = __dirname + "/fixtures/layouts/base"
    var poly = polymer.root(root)

    it("should render with layout in base", function(done){
      poly.render("index.jade", function(errors, body){
        should.not.exist(errors)
        should.exist(body)
        body.should.include("<h1>Layout in Base</h1>")
        body.should.include("<h2>Home Page</h2>")
        done()
      })
    })
  })

  describe("deep", function(){
    var root = __dirname + "/fixtures/layouts/deep"
    var poly = polymer.root(root)

    it("should render with layout in deep", function(done){
      poly.render("nested/something.jade", function(errors, body){
        should.not.exist(errors)
        should.exist(body)
        body.should.include("<h1>Nested Layout</h1>")
        body.should.include("<h2>Something</h2>")
        done()
      })
    })

    it("should render with cascading layout", function(done){
      poly.render("nested/deeply/heyo.jade", function(errors, body){
        should.not.exist(errors)
        should.exist(body)
        body.should.include("<h1>Nested Layout</h1>")
        body.should.include("<h2>Heyo</h2>")
        done()
      })
    })

    it("should render with relative explicit layout", function(done){
      poly.render("nested/deeply/relative.jade", function(errors, body){
        should.not.exist(errors)
        should.exist(body)
        body.should.include("<h1>Another Layout</h1>")
        body.should.include("<h2>Relative</h2>")
        done()
      })
    })

    it("should render with relative explicit layout 2", function(done){
      poly.render("nested/deeply/relative2.jade", function(errors, body){
        should.not.exist(errors)
        should.exist(body)
        body.should.include("<h1>Layout in Base</h1>")
        body.should.include("<h2>Relative 2</h2>")
        done()
      })
    })

  })

})
