var should    = require('should')
var polymer   = require('../')

describe("layouts", function(){
  
  describe('implicit', function(){
    var root = __dirname + "/fixtures/layouts/implicit"
        
    it("should use implicit layout if it exists", function(done){
      polymer.root(root).render("index.jade", function(errors, body){
        should.not.exist(errors)
        should.exist(body)
        body.should.include("<h1>Implicit Layout</h1>")
        body.should.include("<h2>Home</h2>")
        done()
      })
    })
    
  })
  
  describe('explicit', function(){
    var root = __dirname + "/fixtures/layouts/explicit"
    it("should use explicit layout if passed in", function(done){
      polymer.root(root).render("index.jade", { layout: "custom_layout.jade" }, function(errors, body){
        should.not.exist(errors)
        should.exist(body)
        body.should.include("<h1>Explicit Layout</h1>")
        body.should.include("<h2>Home</h2>")
        done()        
      })
    })
  })
  
  describe('absent', function(){
    var root = __dirname + "/fixtures/layouts/absent"
    it("should not need to use any layout", function(done){
      polymer.root(root).render("index.jade", function(errors, body){
        should.not.exist(errors)
        should.exist(body)
        body.should.not.include("Layout")
        body.should.include("<h2>Home</h2>")
        done()        
      })
    })
  })
  
})