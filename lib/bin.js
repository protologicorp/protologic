'use strict';

var _ = require('underscore');

var Bin = function() {
    var self = this;

    self.bin = [];
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

Bin.prototype.get = function(binName) {
    var self = this;

    return _.find(this.bin, function(d) {
        return d.name === binName;
    });

};

Bin.prototype.setData = function(binName, data) {
    var self = this;

    var index = _.indexOf(_.pluck(self.bin, 'name'), binName);

    // console.log("bin Name:", binName, "bin Index:", index, data);

    self.bin[index].data = data;

};

Bin.prototype.getData = function(binName, bins, callback) {
    var self = this;

    var index = _.indexOf(_.pluck(bins.bin, 'name'), binName);

    callback(bins.bin[index].data);

};


module.exports = Bin;