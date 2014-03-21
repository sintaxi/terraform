var should    = require('should')
var polymer   = require('../')

describe("render(path, callback)", function(){

  describe("underscore paths", function(){
    var root = __dirname + "/fixtures/render/underscores"

    it("should ignore file beginning with underscore", function(done){
      polymer.root(root).render("_beep.jade", function(error, body){
        should.not.exist(error)
        should.not.exist(body)
        done()
      })
    })


    it("should ignore file if in dir beginning with underscore", function(done){
      polymer.root(root).render("_foo/bar.jade", function(error, body){
        should.not.exist(error)
        should.not.exist(body)
        done()
      })
    })
  })

  describe('invalid paths', function(){
    it("should return (null, null) if file not present.", function(done){
      polymer.root(__dirname + "/fixtures/data/valid").render("missing.jade", function(error, body){
        should.not.exist(error)
        should.not.exist(body)
        done()
      })
    })

    it("should handle missing stylesheet file.", function(done){
      polymer.root(__dirname + "/fixtures/data/valid").render("missing.less", function(error, body){
        should.not.exist(error)
        should.not.exist(body)
        done()
      })
    })
  })

  describe("layouts", function(){

    it("should use implicit layout if it exists", function(done){
      var root = __dirname + "/fixtures/render/layouts/implicit"
      polymer.root(root).render("index.jade", function(errors, body){
        should.not.exist(errors)
        should.exist(body)
        body.should.include("<h1>Implicit Layout</h1>")
        body.should.include("<h2>Home</h2>")
        done()
      })
    })

    it("should not need to use any layout", function(done){
      var root = __dirname + "/fixtures/render/layouts/absent"
      polymer.root(root).render("index.jade", function(errors, body){
        should.not.exist(errors)
        should.exist(body)
        body.should.not.include("Layout")
        body.should.include("<h2>Home</h2>")
        done()
      })
    })

    it("should use explicit layout if passed in", function(done){
      var root = __dirname + "/fixtures/render/layouts/explicit"
      var poly = polymer.root(root)
      poly.render("index.jade", { layout: "custom_layout.jade" }, function(errors, body){
        should.not.exist(errors)
        should.exist(body)
        body.should.not.include('Default Layout')
        body.should.include("<h2>Home</h2>")
        body.should.include("<h1>Explicit Layout</h1>")
        done()
      })
    })

    it("should use explicit layout if present in data.json file", function(done){
      var root = __dirname + "/fixtures/render/layouts/explicit"
      var poly = polymer.root(root)
      poly.render("about.jade", function(errors, body){
        should.not.exist(errors)
        should.exist(body)
        body.should.not.include('Default Layout')
        body.should.include("<h2>About</h2>")
        body.should.include("<h1>Explicit Layout</h1>")
        done()
      })
    })

  })

  describe("partials", function(){
    var root = __dirname + "/fixtures/render/partials"
    var poly = polymer.root(root)

    it("should have mixes partials with locals", function(done){
      poly.render("index.jade", function(error, body){
        should.not.exist(error)
        should.exist(body)
        body.should.include("<h1>Hello</h1>")
        body.should.include("<h2>Hello World</h2>")
        body.should.include("<h2>Hello Brazil</h2>")
        body.should.include("<h2>Hello Canada</h2>")
        body.should.include("<h2>Hello Gastown</h2>")
        done()
      })
    })

    it("should not render file with underscore", function(done){
      poly.render("_places/brazil.jade", function(error, body){
        should.not.exist(error)
        should.not.exist(body)
        done()
      })
    })
  })

  describe("plain", function(){
    var root = __dirname + "/fixtures/render/plain"
    var poly = polymer.root(root)

    it("should fire callback when", function(done){
      poly.render("index.html", function(error, body){
        should.not.exist(body)
        should.not.exist(error)
        done()
      })
    })
  })

  describe("internationalization", function(){

    it("should render special characters in jade", function(done){
      var root = __dirname + "/fixtures/render/internationalization"
      var poly = polymer.root(root)
      poly.render("jade.jade", function(errors, body){
        should.not.exist(errors)
        should.exist(body)
        body.should.include("<h1>“Iñtërnâtiônàlizætiøn”</h1>")
        body.should.include("</html>")
        done()
      })
    })

    it("should render special characters in ejs", function(done){
      var root = __dirname + "/fixtures/render/internationalization"
      var poly = polymer.root(root)
      poly.render("ejs.ejs", function(errors, body){
        should.not.exist(errors)
        should.exist(body)
        body.should.include("<h1>“Iñtërnâtiônàlizætiøn”</h1>")
        body.should.include("</html>")
        done()
      })
    })

    it("should render special characters in markdown", function(done){
      var root = __dirname + "/fixtures/render/internationalization"
      var poly = polymer.root(root)
      poly.render("markdown.md", function(errors, body){
        should.not.exist(errors)
        should.exist(body)
        body.should.include("<h1>“Iñtërnâtiônàlizætiøn”</h1>")
        body.should.include("</html>")
        done()
      })
    })

    it("should render special characters in less", function(done){
      var root = __dirname + "/fixtures/render/internationalization"
      var poly = polymer.root(root)
      poly.render("less.less", function(errors, body){
        should.not.exist(errors)
        should.exist(body)
        body.should.include("body{background:#FF00AA}")
        done()
      })
    })

    it("should render special characters in scss", function(done){
      var root = __dirname + "/fixtures/render/internationalization"
      var poly = polymer.root(root)
      poly.render("scss.scss", function(errors, body){
        should.not.exist(errors)
        should.exist(body)
        body.should.include("body{background:#FF00AA;}")
        done()
      })
    })

    it("should render special characters in stylus", function(done){
      var root = __dirname + "/fixtures/render/internationalization"
      var poly = polymer.root(root)
      poly.render("styl.styl", function(errors, body){
        should.not.exist(errors)
        should.exist(body)
        body.should.include("body{background:#f0a}")
        done()
      })
    })

  })

})
