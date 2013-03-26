var should    = require('should')
var processor = require('../')

describe("basic", function(){
  
  it("should exist", function(done){
    should.exist(processor)
    processor.should.have.property("process")
    done()
  })
  
  it("should have jade partial layout and include working", function(done){
    processor.process("index.jade", { root: __dirname + "/jade-fixtures" }, function(error, contents){
      should.not.exist(error)
      contents.should.include("<h1>Sintaxi</h1>")
      contents.should.include("<h2>Hello World</h2>")
      contents.should.include("<h3>Brock Whitten</h3>")
      contents.should.include("<h4>Vancouver</h4>")
      done()
    })
  })
  
  it("should return errors if error found", function(done){
    processor.process("invalid.jade", { root: __dirname + "/jade-fixtures" }, function(error, contents){
      should.exist(error)
      should.not.exist(contents)
      done()
    })
  })
  
})