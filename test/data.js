var should    = require('should')
var polymer   = require('../')

describe("data", function(){

  describe("valid", function(){
    var root = __dirname + "/fixtures/data/valid"
    var poly = polymer.root(root)

    it("should be available in the layouts", function(done){
      poly.render("index.jade", function(error, body){
        should.not.exist(error)
        should.exist(body)
        body.should.include("<h1>My Articles</h1>")
        body.should.include('<h5 class="feature">Earth people, New York to California</h5>')
        done()
      })
    })

    it("should be available in the template", function(done){
      poly.render("articles/hello-jupiter.jade", function(error, body){
        should.not.exist(error)
        should.exist(body)
        body.should.include("<h3>I was born on Jupiter</h3>")
        body.should.include("<h4>Brock Whitten</h4>")
        done()
      })
    })

    it("should be available to override data when calling partial", function(done){
      poly.render("index.jade", function(error, body){
        should.not.exist(error)
        should.exist(body)
        body.should.include("<h3>I was born on Jupiter</h3>")
        body.should.include("<h4>Kool Keith</h4>")
        done()
      })
    })
  })

  describe("invalid", function(){
    it("should return errors when invalid _data.json file", function(done){
      var root = __dirname + "/fixtures/data/invalid"
      try{
        var poly = polymer.root(root)
      }catch(error){
        should.exist(error)
        error.should.have.property('source', "Data")
        error.should.have.property('dest', "Globals")
        error.should.have.property('lineno')
        error.should.have.property('filename')
        error.should.have.property('message')
        error.should.have.property('stack')
        done()
      }
    })
  })

  describe("missing", function(){
    it("should return errors when missing source directory", function(done){
      var root = __dirname + "/fixtures/data/nonexisting"
      try{
        var poly = polymer.root(root)
      }catch(error){
        should.exist(error)
        error.should.have.property('source', "Config")
        error.should.have.property('dest', "Config")
        error.should.have.property('lineno')
        error.should.have.property('filename')
        error.should.have.property('message')
        error.should.have.property('stack')
        done()
      }
    })
  })

  describe("public", function(){
    it("should return public object", function(done){
      var root = __dirname + "/fixtures/data/valid"
      var poly = polymer.root(root)
      poly.render("pub.json.jade", { "layout": false }, function(err, result){
        var pub = JSON.parse(result)
        should.not.exist(pub[".foo"])
        done()
      })
    })
  })

})