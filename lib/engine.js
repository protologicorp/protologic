'use strict';

var _ = require('underscore');

var Engine = function(logic) {
    var self = this;

    self.logic = logic; // Hold the process Logic
    self.state = 0;
};

Engine.prototype.run = function(name) {
    var self = this;

    self.state = 1; // Running

    var index = _.indexOf(_.pluck(self.logic.levels.level, 'name'), name);

    self.start(self.logic.levels.level[index]);
};

Engine.prototype.start = function(level) {
    var self = this;

    console.log("starting level:", level);
};

module.exports = Engine;