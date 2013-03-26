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
  
})