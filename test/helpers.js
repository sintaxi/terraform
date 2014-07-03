var should    = require('should')
var polymer   = require('../')
var path      = require('path')

describe("helpers", function(){

  describe('.priorityList(filename)', function(){

    it('should return all possible file names for html ordered by priority.', function(done){
      var list = polymer.helpers.buildPriorityList('index.html')
      list.should.be.an.instanceOf(Array)
      list.should.have.lengthOf(6)
      var plist = "index.jade, index.ejs, index.md, index.html.jade, index.html.ejs, index.html.md".split(', ')
      list.should.eql(plist)
      done()
    })

    it('should build priority list for css file.', function(done){
      var list = polymer.helpers.buildPriorityList('main.css')
      list.should.be.an.instanceOf(Array)
      list.should.have.lengthOf(8)
      list.should.eql("main.styl, main.less, main.scss, main.sass, main.css.styl, main.css.less, main.css.scss, main.css.sass".split(', '))
      done()
    })

    it('should build priority list assuming template file when unknown.', function(done){
      var list = polymer.helpers.buildPriorityList('feed.xml')
      list.should.be.an.instanceOf(Array)
      list.should.have.lengthOf(3)
      list.should.eql('feed.xml.jade, feed.xml.ejs, feed.xml.md'. split(', '))
      done()
    })

    it('should look for templates on json files.', function(done){
      var list = polymer.helpers.buildPriorityList('profile.json')
      list.should.be.an.instanceOf(Array)
      list.should.have.lengthOf(3)
      list.should.include('profile.json.jade')
      list.should.include('profile.json.ejs')
      list.should.include('profile.json.md')
      list.should.eql('profile.json.jade, profile.json.ejs, profile.json.md'. split(', '))
      done()
    })

    it('should look for templates when no ext present.', function(done){
      var list = polymer.helpers.buildPriorityList('appcache')
      list.should.be.an.instanceOf(Array)
      list.should.have.lengthOf(3)
      list.should.eql('appcache.jade, appcache.ejs, appcache.md'.split(', '))
      done()
    })

    it('should know when filename is already correct.', function(done){
      polymer.helpers.buildPriorityList('index.jade').should.eql(['index.jade'])
      // TODO: Implement Me.
      //polymer.helpers.buildPriorityList('main.less').should.eql(['main.less'])
      done()
    })

  })

  describe('.findNearestLayout(root, filename)', function(){
    it('should find closest layout', function(done){
      var root = path.join(__dirname, 'fixtures', 'layouts', 'base')
      polymer.helpers.findNearestLayout(root, "").should.eql("_layout.jade")
      polymer.helpers.findNearestLayout(root, null).should.eql("_layout.jade")
      done()
    })

    it('should find closest layout', function(done){
      var root = path.join(__dirname, 'fixtures', 'layouts', 'deep')
      polymer.helpers.findNearestLayout(root, "nested").should.eql(['nested', '_layout.jade'].join(path.sep))
      polymer.helpers.findNearestLayout(root, path.join("nested", "deeply")).should.eql(['nested', '_layout.jade'].join(path.sep))
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

    it('should convert ejs to html.', function(done){
      polymer.helpers.outputPath('foobar.html').should.eql('foobar.html')
      polymer.helpers.outputPath('foobar.ejs').should.eql('foobar.html')
      polymer.helpers.outputPath('foobar.html.ejs').should.eql('foobar.html')
      done()
    })

    it('should allow alternate file extensions.', function(done){
      polymer.helpers.outputPath('foobar.foo').should.eql('foobar.foo')
      polymer.helpers.outputPath('foobar.bar.jade').should.eql('foobar.bar')
      polymer.helpers.outputPath('foobar.bar.ejs').should.eql('foobar.bar')
      done()
    })

    it('should not allow alternate file extensions if disabled.', function(done){
      polymer.helpers.outputPath('foobar.foo', false).should.eql('foobar.foo')
      polymer.helpers.outputPath('foobar.bar.jade', false).should.eql('foobar.bar.html')
      polymer.helpers.outputPath('foobar.bar.ejs', false).should.eql('foobar.bar.html')
      done()
    })

    it('should allow dot character on file name.', function(done){
      polymer.helpers.outputPath('foobar-1.0.0.html').should.eql('foobar-1.0.0.html')
      polymer.helpers.outputPath('foobar-1.0.0.jade').should.eql('foobar-1.0.0.html')
      polymer.helpers.outputPath('foobar-1.0.0.html.jade').should.eql('foobar-1.0.0.html')
      polymer.helpers.outputPath('foobar.min.js').should.eql('foobar.min.js')
      polymer.helpers.outputPath('foobar.min.js.coffee').should.eql('foobar.min.js')
      done()
    })

    it('should allow dot character on file path.', function(done){
      polymer.helpers.outputPath('1.0.0/foobar.html').should.eql('1.0.0/foobar.html')
      polymer.helpers.outputPath('1.0.0/foobar.jade').should.eql('1.0.0/foobar.html')
      polymer.helpers.outputPath('1.0.0/foobar.html.jade').should.eql('1.0.0/foobar.html')
      done()
    })

  })

  describe('.outputType(filename)', function(){
    it('should know source type.', function(done){
      polymer.helpers.outputType("foo.html").should.eql("html")
      polymer.helpers.outputType("foo.jade").should.eql("html")
      polymer.helpers.outputType("foo.ejs").should.eql("html")
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
      polymer.helpers.shouldIgnore(path.join('foo', '_bar.html')).should.be.true
      polymer.helpers.shouldIgnore(path.join('foo', '_bar', 'baz.html')).should.be.true
      polymer.helpers.shouldIgnore(path.join('_foo', 'bar', 'baz.html')).should.be.true
      polymer.helpers.shouldIgnore(path.sep + path.join('_foo', 'bar', 'baz.html')).should.be.true
      done()
    })

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
      var reply = polymer.helpers.shouldIgnore(path.join('beep', '_boop.json'))
      reply.should.be.true
      done()
    })

    it('should ignore any part of tree starts with underscore.', function(done){
      var reply = polymer.helpers.shouldIgnore(path.join('foo', '_bar', 'baz.json'))
      reply.should.be.true
      done()
    })

    it('should not ignore if no part of tree starts with underscore.', function(done){
      var reply = polymer.helpers.shouldIgnore(path.join('foo', 'bar', 'baz.json'))
      reply.should.be.false
      done()
    })

    it('should allow underscore in names.', function(done){
      var reply = polymer.helpers.shouldIgnore(path.join('foo_', 'beep.json'))
      reply.should.be.false
      done()
    })

  })

  describe('.isTemplate(filename)', function(){

    it('should return true if jade file.', function(done){
      polymer.helpers.isTemplate(path.join('foo.jade')).should.be.true
      polymer.helpers.isTemplate(path.join('foo', 'bar', 'baz.jade')).should.be.true
      done()
    })

    it('should return true if markdown file.', function(done){
      polymer.helpers.isTemplate(path.join('foo.md')).should.be.true
      polymer.helpers.isTemplate(path.join('foo', 'bar', 'baz.md')).should.be.true
      done()
    })

    it('should return false if less file.', function(done){
      polymer.helpers.isTemplate(path.join('foo.less')).should.be.false
      polymer.helpers.isTemplate(path.join('foo', 'bar', 'baz.less')).should.be.false
      done()
    })

  })

  describe('.isStylesheet(filename)', function(){
    it('should return true if less file.', function(done){
      polymer.helpers.isStylesheet(path.join('foo.less')).should.be.true
      polymer.helpers.isStylesheet(path.join('foo', 'bar', 'baz.less')).should.be.true
      done()
    })

    it('should return false if jade file.', function(done){
      polymer.helpers.isStylesheet(path.join('foo.less')).should.be.true
      polymer.helpers.isStylesheet(path.join('foo', 'bar', 'baz.less')).should.be.true
      done()
    })
  })

  describe('.isJavaScript(filename)', function(){
    it('should return true if coffescript file.', function(done){
      polymer.helpers.isJavaScript(path.join('foo.coffee')).should.be.true
      polymer.helpers.isJavaScript(path.join('foo', 'bar', 'baz.coffee')).should.be.true
      done()
    })

    it('should return false if less file.', function(done){
      polymer.helpers.isStylesheet(path.join('foo.less')).should.be.true
      polymer.helpers.isStylesheet(path.join('foo', 'bar', 'baz.less')).should.be.true
      done()
    })
  })

  describe('.layoutCascade(filename)', function(){

  })

})
