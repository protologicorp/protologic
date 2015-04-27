'use strict';

var Level = function() {
    var self = this;

    self.level = [];
};

Level.prototype.add = function(levelData) {
    var self = this;
    self.level.push(levelData);
};

Level.prototype.remove = function(index) {
    var self = this;
    self.level.splice(index, 1);
};

module.exports = Level;