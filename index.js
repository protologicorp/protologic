'use strict';

var Level   = require('./lib/level'),
    Bin     = require('./lib/bin'),
    Engine  = require('./lib/engine');

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

Protologic.prototype.getName = function() {
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


// BINS

Protologic.prototype.addBin = function(binName, defaultValue) {
    if(typeof binName === 'string') {
        this.bins.add(binName, defaultValue);
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

// LEVELS


Protologic.prototype.addLevel = function(name) {
    var self = this;

    if(typeof name === 'string') {
        this.levels.add(name);
    }
    else {
        throw new ReferenceError ("Level name must be a string.");
    }
};

Protologic.prototype.addLevelStep = function(name, step) {
    var self = this;
    this.levels.addStep(name, step);
};

Protologic.prototype.removeLevel = function(index) {
    var self = this;
    this.levels.remove(index);
};

Protologic.prototype.run = function() {

    var self = this,
        engine = new Engine(self);

    engine.run('Authenticate');

};

module.exports = Protologic;