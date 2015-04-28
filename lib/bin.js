'use strict';

var _ = require('underscore');

var Bin = function() {

    var self = this;

    self.bin = [];

};

Bin.prototype.get = function(binName) {
    var self = this;

    return _.find(this.bin, function(d) {
        return d.name === binName;
    });

};

Bin.prototype.setData = function(binName, data) {
    var self = this;

    var index = _.indexOf(_.pluck(this.bin, 'name'), binName);

    self.bin[index].data = data;

};

Bin.prototype.add = function(binName, defaultValue) {
    var self = this;
    self.bin.push({
        name: binName,
        data: defaultValue !== undefined ? defaultValue : null
    });
};

Bin.prototype.remove = function(index) {
    var self = this;
    self.bin.splice(index, 1);
};

module.exports = Bin;