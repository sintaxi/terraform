var should    = require('should')
var polymer   = require('../')

describe("helpers", function(){

  describe('.priorityList(filename)', function(){

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
      // TODO: Implement Me.
      //polymer.helpers.buildPriorityList('main.less').should.eql(['main.less'])
      done()
    })

  })

  describe('.outputPath(filename)', function(){
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

  describe('.outputType(filename)', function(){
    it('should know source type.', function(done){
      polymer.helpers.outputType("foo.html").should.eql("html")
      polymer.helpers.outputType("foo.jade").should.eql("html")
      polymer.helpers.outputType("foo.md").should.eql("html")
      polymer.helpers.outputType("foo.css").should.eql("css")
      polymer.helpers.outputType("foo.less").should.eql("css")
      done()
    })
  })

  describe('.shouldIgnore(filename)', function(){

    it('should return true if file begins with underscore.', function(done){
      polymer.helpers.shouldIgnore('_foo.html').should.be.true
      done()
    })

    it('should return false file doesnt end with underscore.', function(done){
      polymer.helpers.shouldIgnore('foo.html').should.be.false
      polymer.helpers.shouldIgnore('foo_.html').should.be.false
      polymer.helpers.shouldIgnore('f_oo.html').should.be.false
      polymer.helpers.shouldIgnore('f____.html').should.be.false
      done()
    })

    it('should return true if any directory in path starts with underscore.', function(done){
      polymer.helpers.shouldIgnore('foo/_bar.html').should.be.true
      polymer.helpers.shouldIgnore('foo/_bar/baz.html').should.be.true
      polymer.helpers.shouldIgnore('_foo/bar/baz.html').should.be.true
      polymer.helpers.shouldIgnore('/_foo/bar/baz.html').should.be.true
      done()
    })

  })

  describe('.isTemplate(filename)', function(){

    it('should return true if jade file.', function(done){
      polymer.helpers.isTemplate('foo.jade').should.be.true
      polymer.helpers.isTemplate('foo/bar/baz.jade').should.be.true
      done()
    })

    it('should return true if markdown file.', function(done){
      polymer.helpers.isTemplate('foo.md').should.be.true
      polymer.helpers.isTemplate('foo/bar/baz.md').should.be.true
      done()
    })

    it('should return false if less file.', function(done){
      polymer.helpers.isTemplate('foo.less').should.be.false
      polymer.helpers.isTemplate('foo/bar/baz.less').should.be.false
      done()
    })

  })

})