var path = require('path')
var fs   = require('fs')

/**
 * find first file
 *
 * Takes a directory and an array of files. Returns the first file in the list that exists.
 *
 *    findFile(["foo.html", "foo.jade", "foo.html.jade"])
 *      => "foo.jade"
 *
 * returns null if no file is found.
 *
 */

exports.findFirstFile = function(dir, arr) {
  var fullPath  = path.resolve(dir)
  var list      = fs.readdirSync(dir)
  var first     = null

  if(list){
    arr.reverse().map(function(item){
      if(list.indexOf(item) !== -1){
        first = item
      }
    })
  }

  return first
}

/**
 *
 * Checks if Object is empty
 * returns true or false
 *
 */

var isEmpty = function(obj) {
  for(var prop in obj) {
    if(obj.hasOwnProperty(prop))
      return false;
  }
  return true;
}


/**
 *
 * Walks directory and build the data object.
 *
 * If we call the dataTree on the public dir
 *
 *     public/
 *       |- _data.json
 *       |- articles/
 *       |   `- _data.json
 *       `- people
 *           `- _data.json
 *
 * We get the following...
 *
 *     {
 *       "data": {...},
 *       "articles": {
 *         "data": {...}
 *       },
 *       "people": {
 *         "data": {...}
 *       }
 *     }
 *
 */

var dataTree = exports.dataTree = function (filename) {
  var dirPath   = path.resolve(filename)
  var list      = fs.readdirSync(dirPath)
  var obj       = {}
  obj.contents  = []

  try{
    var dataPath = path.resolve(dirPath, "_data.json")
    var fileData = fs.readFileSync(dataPath)
    obj.data     = JSON.parse(fileData)
  }catch(e){
    // data file failed or does not exist
  }

  list.forEach(function(file){
    var filePath = path.resolve(dirPath, file)
    var stat     = fs.statSync(filePath)

    if(stat.isDirectory()){
      if(file[0] !== "_"){
        var d = dataTree(filePath)
        if(!isEmpty(d))
          obj[file] = d
      }
    }else{
      if(["_", "."].indexOf(file[0]) === -1 ) obj.contents.push(outputPath(file))
    }
  })

  if(obj.contents.length == 0)
    delete obj.contents

  return obj
}


/**
 *
 * Walk Data Tree
 *
 * recursive function that returns the data object accociated with path.
 *
 *     var globals = {
 *       "public": {
 *         "articles": {
 *           "data": {
 *             "hello-world": "You Found Me!"
 *           }
 *         }
 *       }
 *     }
 *
 *     walkData(["public", "articles", "hello-world"], globals) => "You Found Me!"
 */

var walkData = exports.walkData = function(tail, obj){
  var tail = tail.slice(0)  // clone array.
  var head = tail.shift()

  if(obj.hasOwnProperty(head)){
    return walkData(tail, obj[head])
  }else if(obj.hasOwnProperty("data")){
    return obj["data"][head]
      ? obj["data"][head]
      : null

  }else{
    return null
  }
}


/**
 *
 * getCurrent
 *
 * returns current object based on the path of source file
 *
 *    getCurrent("foo/bar/baz.jade")
 *      => { path: ["foo", "bar", "baz"], source: "baz" }
 *
 *    getCurrent("index.html")
 *      => { path: ["index"], source: "index" }
 *
 */

exports.getCurrent = function(sourcePath){

  // this could be a tad smarter
  var namespace = sourcePath.split(".")[0].split("/")

  return {
    source: namespace[namespace.length -1],
    path: namespace
  }
}


/**
 *
 * sourceType
 *
 * returns processor based on file path
 *
 *    sourceType("foobar.jade")  =>  "jade"
 *    sourceType("foobar.less")  =>  "less"
 *    sourceType("foobar")       =>  null
 *
 */

exports.sourceType = function(sourcePath){
  return path.extname(sourcePath).replace(/^\./, '')
}


/**
 *
 * Walk Data Tree
 *
 * recursive function that returns the data object accociated with path.
 *
 *     var globals = {
 *       "public": {
 *         "articles": {
 *           "data": {
 *             "hello-world": "You Found Me!"
 *           }
 *         }
 *       }
 *     }
 *
 *     walkData(["public", "articles", "hello-world"], globals) => "You Found Me!"
 */

var walkData = exports.walkData = function(tail, obj){
  var tail = tail.slice(0)  // clone array.
  var head = tail.shift()

  if(obj.hasOwnProperty(head)){
    return walkData(tail, obj[head])
  }else if(obj.hasOwnProperty("data")){
    return obj["data"][head]
      ? obj["data"][head]
      : null

  }else{
    return null
  }
}


/**
 *
 * Output Path
 *
 * returns output path output for given source file
 *
 * eg.
 *     foo.jade => foo.html
 *     foo.html.jade => foo.html
 */

var outputPath = exports.outputPath = function(source){
  var arr = source.split(".")

  if(arr.length >= 3){
    source = source.replace(/.md$/, "")
    source = source.replace(/.jade$/, "")
    source = source.replace(/.less$/, "")
  }else{
    source = source.replace(/.jade$/, ".html")
    source = source.replace(/.md$/,   ".html")
    source = source.replace(/.less$/, ".css")
  }

  return source
}


/**
 *
 * Output Type
 *
 * returns output type source file
 *
 * eg.
 *     foo.jade => foo.html
 *     foo.html.jade => foo.html
 */

var outputType = exports.outputType = function(source){
  var op = outputPath(source)
  return path.extname(op).replace(/^\./, '')
}

