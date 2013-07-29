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
        done()
      })
    })

  })

})