var should    = require('should')
var processor = require('../')

describe("basic", function(){

  it("should exist", function(done){
    should.exist(processor)
    processor.should.have.property("process")
    done()
  })

  it("should have jade partial layout and include working", function(done){
    processor.process("index.jade", { root: __dirname + "/jade-fixtures" }, function(error, info, body){
      should.not.exist(error)
      
      should.exist(info)
      info.sourcePath.should.eql("index.jade")
      info.sourceType.should.eql("jade")
      info.outputPath.should.eql("index.html")
      info.outputType.should.eql("html")
      
      should.exist(body)
      body.should.include("<h1>Sintaxi</h1>")
      body.should.include("<h2>Hello World</h2>")
      body.should.include("<h3>Brock Whitten</h3>")
      body.should.include("<h4>Vancouver</h4>")
      done()
    })
  })

  it("should return errors if error found", function(done){
    processor.process("invalid.jade", { root: __dirname + "/jade-fixtures" }, function(error, info, body){
      should.not.exist(body)
      
      should.exist(info)
      info.sourcePath.should.eql("invalid.jade")
      info.sourceType.should.eql("jade")
      info.outputPath.should.eql("invalid.html")
      info.outputType.should.eql("html")
      
      should.exist(error)
      error.should.have.property("name")
      error.should.have.property("message")
      error.should.have.property("stack")
      done()
    })
  })

})