'use strict';

var logic = require('./index');

// Login Process
var login = new logic();

// Name the Process
login.setName('Login');

// Set up some Bins for storing Data
login.addBin('userCredentials');
login.addBin('userCredentialsValid', false);


// Output Object
var str = JSON.stringify(login, null, 2);
console.log(str);