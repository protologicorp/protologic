'use strict';

module.exports = {
    pretty: function(data) {
        return JSON.stringify(data, null, '\t');
    }
};