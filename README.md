# protologic
Synchronous business logic meets asynchronicity in the cloud.

[![npm package](https://nodei.co/npm/protologic.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/protologic/)

[![Build status](https://img.shields.io/travis/protologicorp/protologic.svg?style=flat-square)](https://travis-ci.org/protologicorp/protologic)
[![Coverage Status](https://coveralls.io/repos/protologicorp/protologic/badge.svg?branch=master)](https://coveralls.io/r/protologicorp/protologic?branch=master)

## Installation

    npm install protologic --save

## Usage

First we'll load the modules we need.

* The Protologic Module.
* A Login Controller (containing some functions we wish to call).


    'use strict';

    var logic = require('protologic'),
        loginCtrl = require('./demo-login-controller');


Next, we'll create a new logic process, or S.O.P. process that we'll
assign a name, 'Login'.


    // Login Process
    var login = new logic();

    // Name the Process
    login.setName('Login');


### Bins

We create Bins to store data throughout the logical process.

We'll define below the 'userCredentials' Bin for storing the initial form data, and also
a Bin called, 'userCredentialsValid' for running a method that can confirm values are set, by
default this Bin can accept a default 'false' value.

Where we don't define a default value, the value is set to null.


    // Set up some Bins for storing Data

    login.addBin('formData', { login: { username: 'Steve', password: 'Zissou' } } );
    login.addBin('userCredentials');
    login.addBin('userCredentialsValid', false);



### Levels

Next, we'll set up a Levels to handle the various steps our logic will take.


    login.addLevel('Authenticate');


### Steps

Next, we'll set up some levels to handle the various process and outcome paths the logic can take.

We've created our first Level to handle login called 'Authenticate', now we'll pass it a Step using
'addStep', we're telling the Level 'Authenticate' to hold the first in a series of Steps, which are
named for convenience that include a function to run and a Bin to store the results.

    // Add Steps to the Authenticate Level

    login.addStep(
        'Authenticate',                                     // Name of Level
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
                data: 'userCredentials',                    // Data to use in Function
                bin: 'userCredentialsValid'                 // Bin to store results
            }
        ]
    );


### Run

Now it's time to run the logic process.


    login.run('Authenticate');


### Object Structure

Although you don't get to see the underlying structure, we can tell a lot about the process by
reviewing the contents of each Bin after execution.

You can see our 'userCredentials' were stored, and our validation function returned a successful message.

    {
      "name": "Login",
      "bins": {
        "bin": [
          {
            "name": "formData",
            "data": {
              "login": {
                "username": "Steve",
                "password": "Zissou"
              }
            }
          },
          {
            "name": "userCredentials",
            "data": {
              "username": "Steve",
              "password": "Zissou"
            }
          },
          {
            "name": "userCredentialsValid",
            "data": "User Credentials are valid."
          }
        ]
      },
      "levels": {
        "level": [
          {
            "name": "Authenticate",
            "steps": [
              {
                "name": "Get Credentials",
                "logic": [Function],
                "data": "formData",
                "bin": "userCredentials"
              },
              {
                "name": "Validate Credentials",
                "data": "userCredentials",
                "logic": [Function],
                "bin": "userCredentialsValid"
              }
            ]
          }
        ]
      }
    }



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