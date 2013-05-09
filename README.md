srchtwttr
====

## Introduction

srchtwttr is a library that helps you search on twitter.

## Features

* `AMD` compatible

## Installation

* Clone the repo
* Install bower (`npm install bower -g`)
* Install uglify-js (`npm install uglify-js -g`)
* Install deps with (`bower install`) and (`npm install`)

## Dependencies

* jQuery

## Usage

```js

var srchtwttr = new Srchtwttr('twitter', function (err, results) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(results);
}, {
    refreshInterval: 5000
});

setTimeout(function () {
    srchtwttr.destroy();
}, 1000);

```
## Build ##
```js
uglifyjs lib/srchtwttr.js -o lib/srchtwttr.min.js
```
## Tests

`$ npm test`

## Works on ##

* IE (6+)
* Chrome (4+)
* Safari (3+)
* Firefox (3.6+)
* Opera (9+)

## License ##

Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
