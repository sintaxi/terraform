var should    = require('should')
var polymer   = require('../')

describe("render()", function(){

  describe('Page Not Found', function(){

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

  describe('ingore', function(){

    it('should ignore if starts with underscore.', function(done){
      var reply = polymer.helpers.shouldIgnore('_beep.json')
      reply.should.be.true
      done()
    })

    it('should not ignore if doesnt start with underscore.', function(done){
      var reply = polymer.helpers.shouldIgnore('boop.json')
      reply.should.be.false
      done()
    })

    it('should ignore if nested file starts with underscore.', function(done){
      var reply = polymer.helpers.shouldIgnore('beep/_boop.json')
      reply.should.be.true
      done()
    })

    it('should ignore any part of tree starts with underscore.', function(done){
      var reply = polymer.helpers.shouldIgnore('foo/_bar/baz.json')
      reply.should.be.true
      done()
    })

    it('should not ignore if no part of tree starts with underscore.', function(done){
      var reply = polymer.helpers.shouldIgnore('foo/bar/baz.json')
      reply.should.be.false
      done()
    })

    it('should allow underscore in names.', function(done){
      var reply = polymer.helpers.shouldIgnore('foo_/beep.json')
      reply.should.be.false
      done()
    })

  })

})