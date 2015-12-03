var should    = require('should')
var polymer   = require('../')

describe("current", function(){

  describe("base", function(){
    var root = __dirname + "/fixtures/current/base"
    var poly = polymer.root(root)

    it("should use a relative path in the root", function(done){
      poly.render("index.jade", function(error, body){
        should.not.exist(error)
        should.exist(body)
        body.should.include("<h1>Matthew Carter</h1>")
        body.should.include("<link href=\"main.css\" rel=\"stylesheet\" type=\"text/css\">")
        done()
      })
    })

    it("should use a relative path when nested", function(done){
      poly.render("georgia/verdana/helvetica/index.ejs", function(error, body){
        should.not.exist(error)
        should.exist(body)
        body.should.include("<h1>Matthew Carter</h1>")
        body.should.include("<link href=\"../../../main.css\" rel=\"stylesheet\" type=\"text/css\">")
        done()
      })
    })

  })

  describe("path", function(){
    var root = __dirname + "/fixtures/current/path"
    var poly = polymer.root(root)

    it("should provide current path", function(done){
      poly.render("index.jade", function(error, body){
        should.not.exist(error)
        should.exist(body)
        body.should.include("<h1>index</h1>")
        done()
      })
    })

    it("should provide current path in to an index page in a subdirectory", function(done){
      poly.render("one/two/index.jade", function(error, body){
        should.not.exist(error)
        should.exist(body)
        body.should.include("<li><a href=\"#\">one</a>")
        body.should.include("<li><a href=\"#\">two</a>")
        body.should.include("<li><a href=\"#\">index</a>")
        done()
      })
    })


    it("should provide current path to a non-index page in a subdirectory", function(done){
      poly.render("one/two/three/about.jade", function(error, body){
        should.not.exist(error)
        should.exist(body)
        body.should.include("<li><a href=\"#\">one</a>")
        body.should.include("<li><a href=\"#\">two</a>")
        body.should.include("<li><a href=\"#\">three</a>")
        body.should.include("<li><a href=\"#\">about</a>")
        body.should.not.include("index")
        done()
      })
    })

    it("should provide a portion of the current path", function(done){
      poly.render("contact/index.ejs", function(error, body){
        should.not.exist(error)
        should.exist(body)
        body.should.include("<title>contact</title>")
        done()
      })
    })


  })

  describe("source", function(){
    var root = __dirname + "/fixtures/current/source"
    var poly = polymer.root(root)

    it("should provide the current source", function(done){
      poly.render("about.jade", function(error, body){
        should.not.exist(error)
        should.exist(body)
        body.should.include("<a href=\"about\" class=\"active\">About</a>")
        done()
      })
    })

  })

})