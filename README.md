# terraform

Foolproof Asset Pipeline used in the Harp APF.

## Usage

    var terraform = require('terraform')
    var planet    = terraform.root('path/to/project')

    planet.render('index.jade', function(error, body){
      console.log(body)
    })