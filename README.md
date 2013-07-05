# terraform

Foolproof Asset Pipeline used in the Harp APF.

![](https://s3-us-west-2.amazonaws.com/harp-misc/terraform.jpg)

## Install

    npm install terraform

## Usage

    var terraform = require('terraform')
    var planet    = terraform.root('path/to/project')

    planet.render('index.jade', function(error, body){
      console.log(body)
    })
    
## Tests

    npm test

![](https://s3-us-west-2.amazonaws.com/harp-misc/terraform-tests.png)
