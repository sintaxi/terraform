var should    = require('should')
var processor = require('../')

describe("layouts", function(){
  
  describe('implicit', function(){
    var root = __dirname + "/fixtures/layouts/implicit"
    it("should have jade partial layout and include working", function(done){
      processor.process("index.jade", { root: root }, function(errors, info, body){
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
    it("should have jade partial layout and include working", function(done){
      processor.process("index.jade", { root: root, layout: "custom_layout.jade" }, function(errors, info, body){
        should.not.exist(errors)
        should.exist(body)
        body.should.include("<h1>Explicit Layout</h1>")
        body.should.include("<h2>Home</h2>")
        done()
      })
    })
  })
  
})