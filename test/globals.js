
var should  = require('should')
var polymer = require('../')

describe("data", function(){

  describe("valid", function(){
    var root = __dirname + "/fixtures/globals"
    var poly = polymer.root(root, { "title": "Default Title" })

    it("should have global available by default", function(done){
      poly.render("index.pug", function(error, body){
        should.not.exist(error)
        should.exist(body)
        body.should.include("<title>Default Title</title>")
        done()
      })
    })

    it("should be able to override globals in the template vars", function(done){
      poly.render("about.pug", function(error, body){
        should.not.exist(error)
        should.exist(body)
        body.should.include("<title>About Page</title>")
        done()
      })
    })

  })

})
