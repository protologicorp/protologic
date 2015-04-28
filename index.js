'use strict';

var Level   = require('./lib/level'),
    Bin     = require('./lib/bin');

function Protologic (options) {

    var self = this;

    options = self.init(options);

    self.name   = options.name;     // Logic name.

    self.bins   = new Bin();        // Will collect return results of Level Steps.
    self.levels = new Level();      // Will contain Process Steps.



}

Protologic.prototype.init = function(options) {
    var self = this;
    if(!options) {
        options = {
            name: 'Default'
        };
    }
    return options;
};

Protologic.prototype.getName = function(name) {
    return this.name;
};

Protologic.prototype.setName = function(name) {
    if(name !== "" && name !== null && name !== undefined) {
        this.name = name;
    }
    else {
        throw new ReferenceError("Name cannot be blank.");
    }
};


Protologic.prototype.addLevel = function(levelData) {
    var self = this;
    this.levels.add(levelData);
};

Protologic.prototype.removeLevel = function(index) {
    var self = this;
    this.levels.remove(index);
};

// BINS

Protologic.prototype.addBin = function(binName) {
    if(typeof binName === 'string') {
        this.bins.add(binName);
    }
    else {
        throw new ReferenceError ("Bin name must be a string.");
    }
};

Protologic.prototype.getBin = function(binName) {
    if(typeof binName === 'string') {
        return this.bins.get(binName);
    }
    else {
        throw new ReferenceError ("Bin name must be a string.");
    }
};

Protologic.prototype.setBinData = function(binName, data) {
    if(typeof binName === 'string' && data !== null) {
        this.bins.setData(binName, data);
    }
    else {
        throw new ReferenceError ("Bin Data is invalid.");
    }
};

Protologic.prototype.removeBin = function(index) {
    if(typeof index === 'number') {
        this.bins.remove(index);
    }
    else {
        throw new ReferenceError ("Bin Index must be a number.");
    }

};

module.exports = Protologic;