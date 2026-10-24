var should   = require('should')
var fs       = require('fs')
var os       = require('os')
var path     = require('path')
var raw      = require('../lib/helpers/raw')
var memoized = require('../lib/helpers/memoized')

describe("memoized helpers", function(){

  var tmp

  beforeEach(function(){
    tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'terraform-memo-'))
    fs.writeFileSync(path.join(tmp, '_layout.jade'), 'h1 layout\n  != yield\n')
    fs.writeFileSync(path.join(tmp, 'index.jade'), 'p hello\n')
  })

  afterEach(function(){
    fs.rmSync(tmp, { recursive: true, force: true })
  })

  it('should wrap findNearestLayout rather than re-export the raw function', function(done){
    memoized.findNearestLayout.should.not.equal(raw.findNearestLayout)
    memoized.findDefaultLayout.should.not.equal(raw.findDefaultLayout)
    done()
  })

  it('should serve findNearestLayout from cache within the ttl', function(done){
    memoized.findNearestLayout(tmp, "").should.eql('_layout.jade')
    fs.unlinkSync(path.join(tmp, '_layout.jade'))
    should(raw.findNearestLayout(tmp, "")).be.null()
    memoized.findNearestLayout(tmp, "").should.eql('_layout.jade')
    done()
  })

  it('should serve findDefaultLayout from cache within the ttl', function(done){
    memoized.findDefaultLayout(tmp, 'index.jade').should.eql('_layout.jade')
    fs.unlinkSync(path.join(tmp, '_layout.jade'))
    should(raw.findDefaultLayout(tmp, 'index.jade')).be.null()
    memoized.findDefaultLayout(tmp, 'index.jade').should.eql('_layout.jade')
    done()
  })

  it('should not let findFirstFile corrupt a cached priority list', function(done){
    var first = memoized.buildPriorityList('_layout.html')
    var order = first.slice()
    memoized.findFirstFile(tmp, first)
    memoized.buildPriorityList('_layout.html').should.eql(order)
    done()
  })

})
