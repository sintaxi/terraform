var should  = require('should')
var polymer = require('../')

describe("stylesheets", function(){

  describe(".less", function(){

    var root = __dirname + '/fixtures/stylesheets/less'
    var poly = polymer.root(root)

    it("should have basic css file", function(done){
      poly.render("main.less", function(error, body){
        should.not.exist(error)
        body.indexOf("background").should.not.equal(-1)
        done()
      })
    })
    it("should autoprefix css", function(done){
      poly.render("main.less", function(error, body){
        should.not.exist(error)
        //body.should.containEql("-webkit-font-feature-settings")
        done()
      })
    })

    it("should allow empty css file", function(done){
      poly.render("empty.less", function(error, body){
        should.not.exist(error)
        done()
      })
    })

    it("should minify beyond preprocessor", function(done){
      poly.render("main.less", function(error, body){
        should.not.exist(error)
        body.should.not.containEql(";}")
        done()
      })
    })

    it("should render a source map", function(done){
      poly.render("main.less", function(error, body, sourcemap){
        should.not.exist(error)
        should.exist(sourcemap)
        sourcemap.toString().should.containEql('main.less')
        sourcemap.toString().should.containEql('_part.less')
        done()
      })
    })
    it("should not include the source map in the css body", function(done){
      poly.render("main.less", function(error, body, sourcemap){
        should.not.exist(error)
        body.should.not.containEql("/*#")
        done()
      })
    })

  })

  describe(".styl", function(){

    var root = __dirname + '/fixtures/stylesheets/styl'
    var poly = polymer.root(root)

    it("should have basic css file", function(done){
      poly.render("main.styl", function(error, body){
        should.not.exist(error)
        should.exist(body)
        body.should.containEql("background:#ffc0cb")
        body.should.containEql("font-feature-settings")
        done()
      })
    })

    it("should autoprefix css", function(done){
      poly.render("main.styl", function(error, body){
        should.not.exist(error)
        //body.should.containEql("-webkit-font-feature-settings")
        done()
      })
    })

    it("should minify beyond preprocessor", function(done){
      poly.render("main.styl", function(error, body){
        should.not.exist(error)
        body.should.not.containEql(";}")
        done()
      })
    })

    it("should render a source map", function(done){
      poly.render("main.styl", function(error, body, sourcemap){
        should.not.exist(error)
        should.exist(sourcemap)
        // sourcemap.toString().should.containEql('main.styl')
        // sourcemap.toString().should.containEql('_part.styl')
        done()
      })
    })
    it("should not include the source map in the css body", function(done){
      poly.render("main.styl", function(error, body, sourcemap){
        should.not.exist(error)
        body.should.not.containEql("/*#")
        done()
      })
    })

  })

  describe(".scss", function(){

    var root = __dirname + '/fixtures/stylesheets/scss'
    var poly = polymer.root(root)

    // console.log(root);

    it("should have basic css file", function(done){
      poly.render("main.scss", function(error, body){
        should.not.exist(error)
        should.exist(body)
        body.should.containEql("background:#ffc3cd")
        body.should.containEql("color:#000")
        done()
      })
    })
    it("should autoprefix css", function(done){
      poly.render("main.scss", function(error, body){
        should.not.exist(error)
        //body.should.containEql("-webkit-font-feature-settings")
        done()
      })
    })
    it("should minify beyond preprocessor", function(done){
      poly.render("main.scss", function(error, body){
        should.not.exist(error)
        body.should.not.containEql(";}")
        done()
      })
    })
    it("should render a source map", function(done){
      poly.render("main.scss", function(error, body, sourcemap){
        should.not.exist(error)
        should.exist(sourcemap)
        sourcemap.toString().should.containEql('main.scss')
        sourcemap.toString().should.containEql('_part.scss')
        done()
      })
    })
    it("should not include the source map in the css body", function(done){
      poly.render("main.scss", function(error, body, sourcemap){
        should.not.exist(error)
        body.should.not.containEql("/*#")
        done()
      })
    })

  })

  describe(".sass", function(){

    var root = __dirname + '/fixtures/stylesheets/sass'
    var poly = polymer.root(root)

    it("should have basic css file", function(done){
      poly.render("main.sass", function(error, body){
        should.not.exist(error)
        should.exist(body)
        body.should.containEql("background:#ffc3cd")
        body.should.containEql("color:#000")
        done()
      })
    })
    it("should autoprefix css", function(done){
      poly.render("main.sass", function(error, body){
        should.not.exist(error)
        //body.should.containEql("-webkit-font-feature-settings")
        done()
      })
    })
    it("should minify beyond preprocessor", function(done){
      poly.render("main.sass", function(error, body){
        should.not.exist(error)
        body.should.not.containEql(";}")
        done()
      })
    })

    it("should render a source map", function(done){
      poly.render("main.sass", function(error, body, sourcemap){
        should.not.exist(error)
        should.exist(sourcemap)
        sourcemap.toString().should.containEql('main.sass')
        sourcemap.toString().should.containEql('_part.sass')
        done()
      })
    })
    it("should not include the source map in the css body", function(done){
      poly.render("main.sass", function(error, body, sourcemap){
        should.not.exist(error)
        body.should.not.containEql("/*#")
        done()
      })
    })

  })

  // Test for using partial for preprocessed CSS
  // For emails, etc.
  //
  // describe("inline", function(){
  //
  //   var root = __dirname + '/fixtures/stylesheets/inline'
  //   var poly = polymer.root(root)
  //
  //   it("should be able to inline sass", function(done){
  //     poly.render("index.jade", function(error, body){
  //       console.log(body)
  //       body.should.eql("<html><style>body{background:#990000}</style></html>")
  //       done()
  //     })
  //
  //   })
  //
  // })

})
