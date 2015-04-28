'use strict';

var expect = require('chai').expect,
    Protologic = require('../index');

describe('Protologic :: Init', function() {

    var test = new Protologic();

    it('"Test" should be an instance of Protologic.', function() {
        expect(test).to.be.an.instanceOf(Protologic);
    });

    it('Should be given a default name equal to "Default".', function() {
        expect(test).to.have.property('name').to.equal('Default');
    });

    it('Should have a "drop" object.', function() {
        expect(test).to.have.property('levels').to.be.an.object;
    });

});

describe('Protologic :: Getters', function() {

    it('Should return name equal to "Default".', function() {

        var test = new Protologic();

        expect(test.getName()).to.equal('Default');

    });

});

describe('Protologic :: Setters', function() {

    var test = new Protologic();

    it('Should be given a name equal to "Default".', function() {
        expect(test).to.have.property('name').to.equal('Default');
    });

    it('Should throw Error on blank name while setting logic name.', function() {

        expect(function(){ test.setName(); }).to.throw('Name cannot be blank.');
    });

    it('Should change name to "Shaft".', function() {

        test.setName('Shaft');

        expect(test).to.have.property('name').to.equal('Shaft');
    });

});

describe('Protologic :: Bins', function() {

    var test = new Protologic();

    it('Should have a "bins" object containing a "bin" array.', function() {
        expect(test.bins).to.have.property('bin');
    });

    it('Should have a "bins" object containing an empty "bin" array.', function() {
        expect(test.bins).to.have.property('bin').with.lengthOf(0);
    });

    it('Should throw Error on blank name while setting Bin name.', function() {

        expect(function(){ test.addBin(); }).to.throw('Bin name must be a string.');
    });

    it('Should allow for Bin to be added.', function() {

        test.addBin('userCredentials');

        expect(test.bins).to.have.deep.property('bin[0].name', 'userCredentials');
    });

    it('Should contain a Bin named, "userCredentials".', function() {

        var bin = test.getBin('userCredentials');

        expect(bin).to.have.deep.property('name', 'userCredentials');
    });

    it('Should throw Error on blank name while getting Bin name.', function() {

        expect(function(){ test.getBin(); }).to.throw('Bin name must be a string.');
    });

    it('Should throw Error on blank parameters while setting Bin data.', function() {

        expect(function(){ test.setBinData(); }).to.throw('Bin Data is invalid.');
    });

    it('Should be able to set Data property of Bin named, "userCredentials".', function() {

        var data = { username: "Joe", password: "3498ufkjdnfjhscnd34rf" };
        test.setBinData('userCredentials', data);

        var bin = test.getBin('userCredentials');

        expect(bin).to.have.deep.property('data.username', 'Joe');

        //var str = JSON.stringify(test, null, 2); // spacing level = 2
        //console.log(str);
    });

    it('Should throw Error on non-numeric index when removing Bin.', function() {

        expect(function(){ test.removeBin('a'); }).to.throw('Bin Index must be a number.');
    });

    it('Should allow for Bin to be removed.', function() {

        test.removeBin(0);

        expect(test.bins).to.have.property('bin').with.lengthOf(0);
    });


});

describe('Protologic :: Levels', function() {

    var test = new Protologic();

    it('Should have a "levels" object containing a "level" array.', function() {
        expect(test.levels).to.have.property('level');
    });

    it('Should have a "levels" object containing an empty "level" array.', function() {
        expect(test.levels).to.have.property('level').with.lengthOf(0);
    });

    it('Should allow for Level to be added.', function() {

        test.addLevel();

        expect(test.levels).to.have.property('level').with.lengthOf(1);
    });

    it('Should allow for Level to be removed.', function() {

        test.removeLevel();

        expect(test.levels).to.have.property('level').with.lengthOf(0);
    });


});

