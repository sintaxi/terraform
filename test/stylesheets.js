var should  = require('should')
var polymer = require('../')

describe("stylesheets", function(){

  describe(".less", function(){

    var root = __dirname + '/fixtures/stylesheets/less'
    var poly = polymer.root(root)

    it("should have basic css file", function(done){
      poly.render("main.less", function(error, body){
        should.not.exist(error)
        body.should.include("background:#ffc0cb")
        body.should.include("-webkit-font-feature-settings")
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
        body.should.include("background:#ffc0cb")
        body.should.include("-webkit-font-feature-settings")
        done()
      })
    })

  })

  describe(".scss", function(){

    var root = __dirname + '/fixtures/stylesheets/scss'
    var poly = polymer.root(root)

    console.log(root);

    it("should have basic css file", function(done){
      poly.render("main.scss", function(error, body){
        should.not.exist(error)
        should.exist(body)
        body.should.include("background:#ffc3cd")
        body.should.include("color:#000")
        body.should.include("-webkit-font-feature-settings")
        done()
      })
    })

  })

  describe(".sass", function(){

    var root = __dirname + '/fixtures/stylesheets/sass'
    var poly = polymer.root(root)

    console.log(root);

    it("should have basic css file", function(done){
      poly.render("main.sass", function(error, body){
        should.not.exist(error)
        should.exist(body)
        body.should.include("background:#ffc3cd")
        body.should.include("color:#000")
        body.should.include("-webkit-font-feature-settings")
        done()
      })
    })

  })

})
