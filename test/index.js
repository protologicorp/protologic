'use strict';

var expect = require('chai').expect,
    Protologic = require('../index'),
    loginCtrl = require('../demo-login-controller');

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

    it('Should allow for Bin to be added named, "userCredentials".', function() {

        test.addBin('userCredentials');

        expect(test.bins).to.have.deep.property('bin[0].name', 'userCredentials');
    });

    it('Should allow for Bin to be added named, "userCredentialsValid" with default value, "false".', function() {

        test.addBin('userCredentialsValid', false);

        expect(test.bins).to.have.deep.property('bin[1].data', false);
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
    });

    it('Should throw Error on non-numeric index when removing Bin.', function() {

        expect(function(){ test.removeBin('a'); }).to.throw('Bin Index must be a number.');
    });

    it('Should allow for Bin to be removed.', function() {

        test.removeBin(0);

        expect(test.bins).to.have.property('bin').with.lengthOf(1);
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

        test.addLevel('Authenticate');

        expect(test.levels).to.have.property('level').with.lengthOf(1);
    });

    it('Should allow Level Step to be added.', function() {

        test.addLevelStep('Authenticate',
            {
                name: 'Get Credentials',
                logic: loginCtrl.getLoginFormCredentials,
                bin: 'userCredentials'
            }
        );

        expect(test.levels).to.have.deep.property('level[0].steps').with.lengthOf(1);

    });

    it('Should allow for Level to be removed.', function() {

        test.removeLevel();

        expect(test.levels).to.have.property('level').with.lengthOf(0);
    });


});

describe('Protologic :: Steps', function() {

    var test = new Protologic();
    // Set up some Bins for storing Data
    test.addBin('userCredentials');
    test.addBin('userCredentialsValid', false);

// Set Bin Data with Login Credentials
    test.setBinData( 'userCredentials', // Name of Bin
        {   username: 'Steve',           // Data object
            password: 'Zissou'
        }
    );
    test.addLevel('Authenticate');
    test.addLevelStep('Authenticate',
        {
            name: 'Get Credentials',
            logic: loginCtrl.getLoginFormCredentials,
            bin: 'userCredentials'
        }
    );

    it('Should contain a name.', function() {

        test.addLevelStep('Authenticate',
            {
                name: 'Get Credentials',
                logic: loginCtrl.getLoginFormCredentials,
                bin: 'userCredentials'
            }
        );

        expect(test.levels).to.have.deep.property('level[0].steps[0].name', 'Get Credentials');

    });

    it('Should contain a function.', function() {

        expect(test.levels).to.have.deep.property('level[0].steps[0].logic').that.is.a('function');

    });

    it('Should contain a bin string.', function() {

        expect(test.levels).to.have.deep.property('level[0].steps[0].bin').that.is.a('string');

    });


});

