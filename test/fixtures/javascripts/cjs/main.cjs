

var add = require("./add.cjs")

console.log("GLOBAL")

window.get = function(key){
  return window.localStorage.getItem(key)
}

window.set = function(key, val){
  return window.localStorage.setItem(key, val)
}
