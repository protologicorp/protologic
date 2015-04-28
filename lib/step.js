'use strict';

var Step = function(step) {
    var self = this;

    self.name = step.name;
    self.logic = step.logic;
    self.bin  = step.bin;
};

module.exports = Step;