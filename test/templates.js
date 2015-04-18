var should  = require('should')
var polymer = require('../')

describe("templates", function(){

  var root = __dirname + "/fixtures/templates"
  var poly = polymer.root(root)

  describe(".ejs", function(){
    it("should render ejs file", function(done){
      poly.render("bio.ejs", function(error, body){
        should.not.exist(error)
        should.exist(body)
        body.should.include("<h1>Hello EJS</h1>")
        done()
      })
    })

    it("should minify beyond preprocessor", function(done){
      poly.render("bio.ejs", function(error, body){
        should.not.exist(error)
        body.should.not.include("\n\n")
        done()
      })
    })
  })

  describe(".md", function(){
    it("should render markdown file", function(done){
      poly.render("stuff.md", function(error, body){
        should.not.exist(error)
        should.exist(body)
        body.should.include("<h1>hello markdown</h1>")
        body.should.include("<p>")
        body.should.include('<code class="language-json">')
        body.should.not.include('<code class="lang-json">')
        done()
      })
    })

    it("should minify beyond preprocessor", function(done){
      poly.render("stuff.md", function(error, body){
        should.not.exist(error)
        body.should.not.include("\n\n")
        done()
      })
    })

    it("should render markdown file encoded in UTF-8 with BOM", function(done){
      poly.render("bom.md", function(error, body){
        should.not.exist(error)
        should.exist(body)
        body.should.include("<h1>file with bom marker</h1>")
        done()
      })
    })
  })

  describe(".jade", function(){

    it("should give deprecated !!! warning", function(done){
      poly.render("deprecated/jade/index.jade", function(error, body){
        should.not.exist(error)
        should.exist('`!!!` is deprecated, you must now use `doctype`')
        should.exist(body)
        done()
      })
    })

    it("should have jade partial layout and include working", function(done){
      poly.render("index.jade", function(error, body){
        should.not.exist(error)
        should.exist(body)
        body.should.include("<h1>Sintaxi</h1>")
        body.should.include("<h2>Hello World</h2>")
        body.should.include("<h3>Brock Whitten</h3>")
        body.should.include("<h4>Vancouver</h4>")
        done()
      })
    })

    it("should minify beyond preprocessor", function(done){
      poly.render("index.jade", function(error, body){
        should.not.exist(error)
        body.should.not.include("\n\n")
        done()
      })
    })

    it("should pass in partials from the global object", function(done){
      poly.render("index.jade", function(error, body){
        should.not.exist(error)
        should.exist(body)
        body.should.include("<h1>Sintaxi</h1>")
        body.should.include("<h2>Hello World</h2>")
        body.should.include("<h3>Brock Whitten</h3>")
        body.should.include("<h4>Vancouver</h4>")
        done()
      })
    })

    it("should return errors if error found", function(done){
      poly.render("invalid.jade", function(error, body){
        should.not.exist(body)
        should.exist(error)
        error.should.have.property("name")
        error.should.have.property("message")
        error.should.have.property("stack")
        done()
      })
    })

    it("should extend from a file with absolute path", function(done){
      poly.render("extend.jade", function(error, body){
        should.not.exist(error)
        should.exist(body)
        body.should.include("<h1>Sintaxi</h1>")
        body.should.include("<h2>Hello World</h2>")
        body.should.include("<h3>Brock Whitten</h3>")
        body.should.include("<h4>Vancouver</h4>")
        done()
      })
    })

  })

})
