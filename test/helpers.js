var should    = require('should')
var polymer   = require('../')

describe("helpers", function(){

  it("should handle missing template file.", function(done){
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

  describe('priority list', function(){

    it('should return all possible file names for html ordered by priority.', function(done){
      var list = polymer.helpers.buildPriorityList('index.html')
      list.should.be.an.instanceOf(Array)
      list.should.have.lengthOf(4)
      var plist = "index.jade, index.md, index.html.jade, index.html.md".split(', ')
      list.should.eql(plist)
      done()
    })

    it('should build priority list for css file.', function(done){
      var list = polymer.helpers.buildPriorityList('main.css')
      list.should.be.an.instanceOf(Array)
      list.should.have.lengthOf(2)
      list.should.eql("main.less, main.css.less".split(', '))
      done()
    })

    it('should build priority list assuming template file when unknown.', function(done){
      var list = polymer.helpers.buildPriorityList('feed.xml')
      list.should.be.an.instanceOf(Array)
      list.should.have.lengthOf(2)
      list.should.eql('feed.xml.jade, feed.xml.md'. split(', '))
      done()
    })

    it('should look for templates on json files.', function(done){
      var list = polymer.helpers.buildPriorityList('profile.json')
      list.should.be.an.instanceOf(Array)
      list.should.have.lengthOf(2)
      list.should.include('profile.json.jade')
      list.should.include('profile.json.md')
      list.should.eql('profile.json.jade, profile.json.md'. split(', '))
      done()
    })

    it('should look for templates when no ext present.', function(done){
      var list = polymer.helpers.buildPriorityList('appcache')
      list.should.be.an.instanceOf(Array)
      list.should.have.lengthOf(2)
      list.should.eql('appcache.jade, appcache.md'.split(', '))
      done()
    })

    it('should know when filename is already correct.', function(done){
      polymer.helpers.buildPriorityList('index.jade').should.eql(['index.jade'])
      polymer.helpers.buildPriorityList('main.less').should.eql(['main.less'])
      done()
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

    it('should allow underscore in names.', function(done){
      var reply = polymer.helpers.shouldIgnore('foo_/beep.json')
      reply.should.be.false
      done()
    })

  })

  describe('outputPath', function(){
    it('should convert jade to html.', function(done){
      polymer.helpers.outputPath('foobar.html').should.eql('foobar.html')
      polymer.helpers.outputPath('foobar.jade').should.eql('foobar.html')
      polymer.helpers.outputPath('foobar.html.jade').should.eql('foobar.html')
      done()
    })

    it('should convert less to css.', function(done){
      polymer.helpers.outputPath('foobar.css').should.eql('foobar.css')
      polymer.helpers.outputPath('foobar.less').should.eql('foobar.css')
      polymer.helpers.outputPath('foobar.css.less').should.eql('foobar.css')
      done()
    })

    it('should allow alternate file extensions.', function(done){
      polymer.helpers.outputPath('foobar.foo').should.eql('foobar.foo')
      polymer.helpers.outputPath('foobar.bar.jade').should.eql('foobar.bar')
      done()
    })
  })

})