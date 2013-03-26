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
 * Output Filename
 *
 * returns output path output for given source file
 *
 * eg.
 *     foo.jade => foo.html
 *     foo.html.jade => foo.html
 */

var outputFilename = exports.outputFilename = function(source){
  var arr = source.split(".")
  
  if(arr.length >= 3){
    source = source.replace(/.jade$/, "")
    source = source.replace(/.less$/, "")
  }else{
    source = source.replace(/.jade$/, ".html")
    source = source.replace(/.less$/, ".css")
  }

  return source
}