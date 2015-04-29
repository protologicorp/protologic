'use strict';

var _ = require('underscore'),
    Bin = require('./bin');

var Engine = function() {
    var self = this;

    self.state = -1; // Idle state
    self.name = null;
};

Engine.prototype.run = function(logic, levelName, callback) {
    var self = this;
    self.state++;
    self.name = levelName;

    var index = _.indexOf(_.pluck(logic.levels.level, 'name'), levelName);

    var levelData = {
        level: logic.levels.level[index],
        state: self.state
    };

    callback({ success: true, results: levelData });
};
//
//Engine.prototype.start = function(level) {
//    var self = this;
//
//    if(level.steps.length) {
//        self.rev(level.steps.shift());
//    }
//
//};
//
//Engine.prototype.rev = function(step) {
//    var self = this;
//
//    if(step) {
//
//        var bin = new Bin();
//
//        bin.getData(step.data, self.bins, function(data) {
//            step.logic(data, function (response) {
//
//                // Success
//                if (response.success) {
//                    console.log("Step succeeded:", step.name);
//                    // eventEmitter.emit('setData', { name: step.bin, data: response.results });
//                }
//                // Failure
//                else {
//                    console.log("Step failed:", step.name);
//                }
//            });
//        });
//
//
//    }
//};

module.exports = Engine;