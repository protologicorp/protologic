# protologic
Synchronous business logic meets asynchronicity in the cloud.

[![npm package](https://nodei.co/npm/protologic.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/protologic/)

[![Build status](https://img.shields.io/travis/protologicorp/protologic.svg?style=flat-square)](https://travis-ci.org/protologicorp/protologic)
[![Coverage Status](https://coveralls.io/repos/protologicorp/protologic/badge.svg?branch=master)](https://coveralls.io/r/protologicorp/protologic?branch=master)

## Installation

    npm install protologic --save

## Usage

First we'll load the modules we need... The library itself, and a Login Controller containing
some functions we'll use in our upcoming example.


    'use strict';

    var logic = require('protologic'),
        loginCtrl = require('./demo-login-controller');


Next, we'll create a new logic process (or S.O.P. process) that we'll assign a name, 'Login'.


    // Login Process
    var login = new logic();

    // Name the Process
    login.setName('Login');


### Bins

We create Bins to store data throughout the logical process.

We'll mock a login form request body by creating a 'formData' Bin, then we'll define a 'userCredentials' Bin
for storing the initial form data, and finally, a 'userCredentialsValid' Bin for running a method that will
confirm our expected values were set. By default, all Bins recieve a null data value. Passing an object, boolean
or string value along with the 'addBin' method will set the default value as desired.

    login.addBin('formData', { login: { username: 'Steve', password: 'Zissou' } } );
    login.addBin('userCredentials');
    login.addBin('userCredentialsValid', false);


### Levels

Now, we'll set up a Level to handle the various steps our logic will require.


    login.addLevel('Authenticate');


### Steps

Since we've created our first Level to handle login called 'Authenticate', let's pass it a couple of
Steps to be called in order using 'addStep'.  Here, we're telling the Level 'Authenticate' to hold a series of
Steps (which are named for convenience) that include a function to run, a source of data, and a previously
declared Bin to store the results.

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

Now it's time to run the logic process.  The 'run' method will execute our 'Authenticate' Level, beginning with the
first Step in the chain and storing its results in the specified Bin.


    login.run('Authenticate');

Upon completion, if we examine the underlying Object Bins, we'll see the process used our 'formData' to set data in
the 'userCredentials' Bin, then ran the validation method to place the resulting message in the 'userCredentialsValid'
Bin.

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
      ...


# Controller Framework

### Demo Login Controller

In order to work with Protologic, the controller stucture requires that each logical function
take a data parameter (incoming data) and return a callback (outgoing results).

Below we can see the two functions used in the above example, and their use of this requirement.

    'use strict';


    var getLoginFormCredentials = function(data, callback) {

        var loginData = {
            username: data.login.username !== "" ? data.login.username : null,
            password: data.login.password !== "" ? data.login.password : null
        };

        callback({ success: true, results: loginData });

    };

    var validateUserCredentials = function (data, callback) {

        // Success
        if(data.username !== "" && data.password !== "") {
            callback({ success: true, message: "User Credentials are valid." });
        }
        // Failure
        else {
            callback({ success: false, message: "User Credentials are invalid." });
        }

    };

    module.exports = {
        getLoginFormCredentials: getLoginFormCredentials,
        validateUserCredentials: validateUserCredentials
    };




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