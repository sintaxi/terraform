var should    = require('should')
var processor = require('../')

describe("partials", function(){
  
  var root = __dirname + "/fixtures/partials"
  
  it("should have jade partial layout and include working", function(done){
    processor.process("index.jade", { root: root }, function(errors, info, body){
      should.not.exist(errors)
      should.exist(body)
      body.should.include("<h1>Hello</h1>")
      body.should.include("<h2>Hello World</h2>")
      body.should.include("<h2>Hello Brazil</h2>")
      body.should.include("<h2>Hello Canada</h2>")
      done()
    })
  })
  
})