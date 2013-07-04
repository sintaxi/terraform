var helpers = require('./helpers')
var lru     = require("lru-cache")
var cache   = lru(500)

var fns = ['buildPriorityList', 'dataTree', 'getCurrent', 'sourceType', 'outputPath', 'outputType', 'shouldIgnore']

fns.forEach(function(fn){
  exports[fn] = function(arg){
    var key   = fn + ':' + arg
    var fresh = cache.get(key)
    if(fresh) return fresh
    var hot = helpers[fn](arg)
    cache.set(key, hot)
    return hot
  }
})

exports.processors    = helpers.processors
exports.findFirstFile = helpers.findFirstFile
exports.walkData      = helpers.walkData
exports.isTemplate    = helpers.isTemplate
exports.isStylesheet  = helpers.isStylesheet
