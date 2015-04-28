# protologic
Synchronous business logic meets asynchronicity in the cloud.

[![npm package](https://nodei.co/npm/protologic.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/protologic/)

[![Build status](https://img.shields.io/travis/protologicorp/protologic.svg?style=flat-square)](https://travis-ci.org/protologicorp/protologic)
[![Coverage Status](https://coveralls.io/repos/protologicorp/protologic/badge.svg?branch=master)](https://coveralls.io/r/protologicorp/protologic?branch=master)

## Installation

    npm install protologic --save

## Usage

    var protologic = require('protologic');

    var login = new protologic({
        name: 'Login'
    });

## Tests

    npm test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.0.2 Exception Handling Tests Passing
* 0.0.1 Initial Commit