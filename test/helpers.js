var should    = require('should')
var polymer   = require('../')

describe("helpers", function(){

  it("should handle missing template file", function(done){
    polymer.root(__dirname + "/fixtures/data").render("missing.jade", function(error, body){
      should.not.exist(error)
      should.not.exist(body)
      done()
    })
  })

  it("should handle missing stylesheet file", function(done){
    polymer.root(__dirname + "/fixtures/data").render("missing.less", function(error, body){
      should.not.exist(error)
      should.not.exist(body)
      done()
    })
  })

  describe('priority list', function(){

    it('should build priority list for html file', function(done){
      var list = polymer.helpers.buildPriorityList('index.html')
      list.should.be.an.instanceOf(Array)
      list.should.have.lengthOf(4)
      list.should.include('index.jade')
      list.should.include('index.md')
      list.should.include('index.html.jade')
      list.should.include('index.html.md')
      done()
    })

    it('should build priority list for css file', function(done){
      var list = polymer.helpers.buildPriorityList('main.css')
      list.should.be.an.instanceOf(Array)
      list.should.have.lengthOf(2)
      list.should.include('main.less')
      list.should.include('main.css.less')
      done()
    })

    it('should build priority list assuming template file when unknown', function(done){
      var list = polymer.helpers.buildPriorityList('feed.xml')
      list.should.be.an.instanceOf(Array)
      list.should.have.lengthOf(2)
      list.should.include('feed.xml.jade')
      list.should.include('feed.xml.md')
      done()
    })

    it('should build priority list assuming template file when asking for json', function(done){
      var list = polymer.helpers.buildPriorityList('profile.json')
      list.should.be.an.instanceOf(Array)
      list.should.have.lengthOf(2)
      list.should.include('profile.json.jade')
      list.should.include('profile.json.md')
      done()
    })

    it('should build priority list assuming template file when missing ext', function(done){
      var list = polymer.helpers.buildPriorityList('appcache')
      list.should.be.an.instanceOf(Array)
      list.should.have.lengthOf(2)
      list.should.include('appcache.jade')
      list.should.include('appcache.md')
      done()
    })

    it('should know when file is right', function(done){
      var list = polymer.helpers.buildPriorityList('index.jade')
      list.should.be.an.instanceOf(Array)
      list.should.have.lengthOf(1)
      list.should.include('index.jade')
      done()
    })

  })

  describe('ingore', function(){

    it('should ignore if starts with underscore', function(done){
      var reply = polymer.helpers.shouldIgnore('_beep.json')
      reply.should.be.true
      done()
    })

    it('should not ignore if doesnt start with underscore', function(done){
      var reply = polymer.helpers.shouldIgnore('boop.json')
      reply.should.be.false
      done()
    })

    it('should ignore if nested file starts with underscore', function(done){
      var reply = polymer.helpers.shouldIgnore('beep/_boop.json')
      reply.should.be.true
      done()
    })

    it('should ignore any part of tree starts with underscore', function(done){
      var reply = polymer.helpers.shouldIgnore('foo/_bar/baz.json')
      reply.should.be.true
      done()
    })

    it('should allow underscore in names', function(done){
      var reply = polymer.helpers.shouldIgnore('foo_/beep.json')
      reply.should.be.false
      done()
    })

  })

})