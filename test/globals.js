var should  = require('should')
var polymer = require('../')

describe("data", function(){

  describe("valid", function(){
    var root = __dirname + "/fixtures/globals"
    var poly = polymer.root(root, { "title": "Default Title" })

    it("should have global available by default", function(done){
      poly.render("index.jade", function(error, body){
        should.not.exist(error)
        should.exist(body)
        body.should.include("<title>Default Title</title>")
        done()
      })
    })

    it("should be able to override globals in the template vars", function(done){
      poly.render("about.jade", function(error, body){
        should.not.exist(error)
        should.exist(body)
        body.should.include("<title>About Page</title>")
        done()
      })
    })
    
    it("should include global in nunjucks", function(done) {
      poly.render("index.nunjucks", function(error, body) {
        should.not.exist(error)
        should.exist(body)
        body.should.include("<title>Default Title</title>")
        done()
      })
    })
    
    it("should provide context for custom partial tag", function(done){
      poly.render("partialGlobals.nunjucks", function(error, body) {
        should.not.exist(error)
        should.exist(body)
        body.should.include("<title>Default Title</title>")
        done()
      })
    })

  })

})