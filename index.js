'use strict';

var Bin     = require('./lib/bin'),
    Level   = require('./lib/level'),
    Step    = require('./lib/step'),
    Engine  = require('./lib/engine');

function Protologic (options) {

    var self = this;

    options = self.init(options);

    self.name   = options.name;     // Logic name.

    self.bins   = new Bin();        // Will collect return results of Level Steps.
    self.levels = new Level();      // Will contain Process Steps.
    self.engine = new Engine();

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

Protologic.prototype.removeLevel = function(index) {
    var self = this;
    this.levels.remove(index);
};

Protologic.prototype.runLevel = function(index) {



};


// STEPS

Protologic.prototype.addStep = function(name, step) {
    var self = this;
    this.levels.addStep(name, step);
};

Protologic.prototype.runStep = function(data) {
    var self = this;

    if(data) {

        var step = new Step(data),
            bin = new Bin();

        bin.getData(step.data, self.bins, function(data) {

            step.logic(data, function (response) {

                // Success
                if (response.success) {
                    console.log("Step succeeded:", step.name);
                    self.bins.setData(step.bin, response.results || response.message);
                    self.rev(self.engine.name);
                }
                // Failure
                else {
                    console.log("Step failed:", step.name);
                }
            });
        });


    } else {
        console.log("No more steps in this level.");
    }

};


// ENGINE

Protologic.prototype.run = function(name) {
    var self = this;

    // Success
    if(typeof name === 'string') {
        self.engine.run(self, name, function(response) {

            if(response.success) {

                var level = response.results.level,
                    state = response.results.state;

                // Persist Engine State
                if(state !== level.steps.length) {

                    self.engine.state = state;
                    self.runStep(level.steps[response.results.state]);

                } else {



                }


            } else {
                console.log("Level failed to run.");
            }


        });
    }
    // Failure
    else {
        throw new ReferenceError ("Name must be a string.");
    }

};

Protologic.prototype.rev = function(name) {
    var self = this;

    // Success
    if(typeof name === 'string') {
        self.run(name);
    }
    // Failure
    else {
        throw new ReferenceError ("Name must be a string.");
    }
};


module.exports = Protologic;