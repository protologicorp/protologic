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