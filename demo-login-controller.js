'use strict';


var getLoginFormCredentials = function(data, callback) {

    var loginData = {
        username: data.login.username !== "" ? data.login.username : null,
        password: data.login.password !== "" ? data.login.password : null
    };

    if(loginData.username && loginData.password) {
        callback({ success: true, results: loginData });
    }
    else {
        callback({ success: false, message: "Login Credentials are invalid." });
    }

};

module.exports = {
    getLoginFormCredentials: getLoginFormCredentials
};