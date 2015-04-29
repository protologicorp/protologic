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

## Demo

    'use strict';

    var logic = require('./index'),
        loginCtrl = require('./demo-login-controller'),
        Output  = require('./lib/output');

    // Login Process
    var login = new logic();

    // Name the Process
    login.setName('Login');


    /* BINS ************************************************
     *
     *  We create Bins to store data throughout the
     *  logical process.
     *
     *  We'll define below the 'userCredentials' Bin
     *  for storing the initial form data, and also
     *  a Bin called, 'userCredentialsValid' for running
     *  a method that can confirm values are set, by
     *  default this Bin can accept a default 'false' value.
     *
     */

    // Set up some Bins for storing Data
    login.addBin('formData', { login: { username: 'Steve', password: 'Zissou' } } );
    login.addBin('userCredentials'); // value defaults to null
    login.addBin('userCredentialsValid', false);

    // Set Bin Data with Login Credentials

    /* LEVELS **********************************************
     *
     *  Next, we'll set up some levels to handle the various
     *  process and outcome paths the logic can take.
     *
     *  We'll create our first Level to handle out login
     *  and call it, 'Authenticate'.  Then we'll pass it
     *  a Step.
     *
     *  Using 'addLevelStep', we tell the Level 'Authenticate'
     *  to hold the first in a series of Steps, which are
     *  named for convenience that include a function to run
     *  and a Bin to store the results.
     *
     */

    login.addLevel('Authenticate');
    login.addLevel('AccessGranted');
    login.addLevel('AccessDenied');


    /* STEPS **********************************************
     *
     *  Next, we'll set up some levels to handle the various
     *  process and outcome paths the logic can take.
     *
     *  We've created our first Level to handle login called
     *  'Authenticate', now we'll pass it a Step using
     *  'addLevelStep', we're telling the Level 'Authenticate'
     *  to hold the first in a series of Steps, which are
     *  named for convenience that include a function to run
     *  and a Bin to store the results.
     *
     */


    // Add Steps to the Authenticate Level
    login.addStep(
        'Authenticate',                                 // Name of Level
        [
            {
                name: 'Get Credentials',                    // Name of Step
                logic: loginCtrl.getLoginFormCredentials,   // Function
                data: 'formData',                           // Data to use in Function
                bin: 'userCredentials'                      // Bin to store results
            },
            {
                name: 'Validate Credentials',               // Name of Step
                logic: loginCtrl.validateUserCredentials,   // Function
                data: 'userCredentials',                           // Data to use in Function
                bin: 'userCredentialsValid'                      // Bin to store results
            }
        ]
    );

    /* RUN **********************************************
     *
     *  Now it's time to run the logic process...
     *
     *
     *
     */

    login.run('Authenticate');


## Tests

    npm test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.0.4 Engine Running.
* 0.0.3 Basic plumbing for Levels and Steps.
* 0.0.2 Exception Handling Tests Passing.
* 0.0.1 Initial Commit.