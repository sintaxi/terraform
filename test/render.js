var should    = require('should')
var polymer   = require('../')

describe("render()", function(){

  describe('missing file', function(){

    it("should return (null, null) if file not present.", function(done){
      polymer.root(__dirname + "/fixtures/data").render("missing.jade", function(error, body){
        should.not.exist(error)
        should.not.exist(body)
        done()
      })
    })

    it("should handle missing stylesheet file.", function(done){
      polymer.root(__dirname + "/fixtures/data").render("missing.less", function(error, body){
        should.not.exist(error)
        should.not.exist(body)
        done()
      })
    })

  })

})