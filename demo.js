'use strict';

var logic = require('./index'),
    loginCtrl = require('./demo-login-controller');

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
login.addBin('userCredentials');
login.addBin('userCredentialsValid', false);

// Set Bin Data with Login Credentials
login.setBinData( 'userCredentials', // Name of Bin
    {   username: 'Steve',           // Data object
        password: 'Zissou'
    }
);

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
login.addLevelStep(
    'Authenticate',                                 // Name of Level
    {
        name: 'Get Credentials',                    // Name of Step
        logic: loginCtrl.getLoginFormCredentials,   // Function
        bin: 'userCredentials'                      // Bin to store results
    }
);

/* RUN **********************************************
 *
 *  Now it's time to run the logic process...
 *
 *
 *
 */

login.run();

// Output Object
var str = JSON.stringify(login, null, 2);
console.log(str);