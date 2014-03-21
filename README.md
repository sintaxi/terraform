# terraform

> Terraform is the pre-processor engine for the [Harp](https://github.com/sintaxi/harp) web server. Terraform does not write or serve files. It processes and provides a layout/partial paradigm.

## Features

- pre-processorse
- layouts
- partials
- metadata (via _data.json)
- LRU cache (production mode)

### Supported Pre-Processors

**HTML** – EJS, Jade, Markdown
**CSS** – LESS, Stylus, Sass (SCSS)
**JavaScript** – CoffeeScript

## Install

    npm install terraform

## API


Step 1) require the library

```javascript
var terraform = require('terraform')
```

Step 2) set the root

- publicPath (String): path to public directory
- globals (Object): global variables to be available to every template

```javascript
var planet = terraform.root("path/to/public/dir", { "title": "Bitchin" })
```

Step 3) render a file

```javascript
planet.render('index.jade', { "title": "Override the global title" }, function(error, body){
  console.log(body)
})
```

## Tests

Please run the tests

```
npm install
npm test
```
