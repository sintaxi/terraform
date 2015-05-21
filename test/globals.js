
var should  = require('should')
var polymer = require('../')

describe("data", function(){

  describe("valid", function(){
    var root = __dirname + "/fixtures/globals"
    var poly = polymer.root(root, { "title": "Default Title", "name": "Annie Person" })

    it("should have global available by default", function(done){
      poly.render("index.jade", function(error, body){
        should.not.exist(error)
        should.exist(body)
        body.should.include("<title>Default Title</title>")
      })
      poly.render("contact.hbs", function(error, body){
        should.not.exist(error)
        should.exist(body)
        body.should.include("<h1>Annie Person</h1>")
        done()
      })

    })

    it("should be able to override globals in the template vars", function(done){
      poly.render("about.jade", function(error, body){
        should.not.exist(error)
        should.exist(body)
        body.should.include("<title>About Page</title>")
      })
      poly.render("blog.hbs", function(error, body){
        should.not.exist(error)
        should.exist(body)
        body.should.include("<h1>Blog Page</h1>")
        done()
      })
    })

  })

})
