'use strict';

var _ = require('underscore'),
    Step = require('./step');

var Level = function() {
    var self = this;

    self.level = [];
};

Level.prototype.add = function(name) {
    var self = this;
    self.level.push({
        name: name,
        steps: []
    });
};

Level.prototype.addStep = function(name, step) {
  var self = this;

  step.forEach(function(d, i) {
      // Locate Level Index by name property
      var index = _.indexOf(_.pluck(self.level, 'name'), name);


      var step = new Step(d);

      // Add Step to Level steps property by found Index
      self.level[index].steps.push(step);

  });


};

Level.prototype.remove = function(index) {
    var self = this;
    self.level.splice(index, 1);
};



module.exports = Level;