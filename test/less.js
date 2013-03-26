var should    = require('should')
var processor = require('../')

describe("less", function(){
  
  it("should exist", function(done){
    should.exist(processor)
    processor.should.have.property("process")
    done()
  })
  
  it("should have basic css file", function(done){
    processor.process("main.less", { root: __dirname + "/less-fixtures" }, function(error, contents){
      should.not.exist(error)
      contents.should.include("body{background:pink;}")
      done()
    })
  })
  
  it("should return errors if error found", function(done){
    processor.process("invalid.less", { root: __dirname + "/less-fixtures" }, function(error, contents){
      should.exist(error)
      should.not.exist(contents)
      done()
    })
  })
  
  it("should return errors if error found", function(done){
    processor.process("invalid.less", { root: __dirname + "/less-fixtures" }, function(error, contents){
      should.not.exist(contents)
      should.exist(error)
      error.should.have.property("name")
      error.should.have.property("message")
      error.should.have.property("stack")
      done()
    })
  })
  
})