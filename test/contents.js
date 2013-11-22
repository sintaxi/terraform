var should    = require('should')
var polymer   = require('../')

describe("contents", function(){

  describe("public", function(){
    it("should return public object", function(done){
      var root = __dirname + "/fixtures/data/valid"
      var poly = polymer.root(root)
      poly.render("pub.json.jade", { "layout": false }, function(err, result){
        var pub = JSON.parse(result)
        should.exist(pub["_contents"])
        done()
      })
    })
  })

})
