'use strict';

var mockery = require('mockery');
var expect = require('chai').expect;
var git;
var fakeChild = function(error, result){
    return {
        exec: function(cmd, callback){
            callback(error, result);
        }
    };
};
var createFakeChildSpawn = function(commandExpectation, paramsExpectation){
    return {
        spawn: function(command, params, options){
            expect(command).to.equal(commandExpectation);
            expect(params).to.deep.equal(paramsExpectation);
            return {
                on: function(command, callback){
                    callback();
                }
            };
        }
    };
};
describe('git', function(){

    describe('getBranches', function(){

        describe('local', function(){

            beforeEach(function(done){
                mockery.enable({
                    warnOnReplace: false,
                    warnOnUnregistered: false,
                    useCleanCache: true
                });
                done();
            });

            afterEach(function(done){
                mockery.resetCache();
                mockery.deregisterAll();
                done();
            });

            it('should successfully return local branch information', function(done){
                mockery.registerMock('child_process',fakeChild(null ,'123 refs/heads/branch1\n 123 refs/heads/feature/branch2\n'));
                git = require('../lib/git');
                git.getBranches.local().then(function(branches){
                    expect(branches).to.deep.equal(['branch1','feature/branch2']);
                    done();
                });
            });

            it('should successfully throw an error when there is no branch information', function(done){
                mockery.registerMock('child_process', fakeChild('no branches', 'doesnt mamtter'));
                git = require('../lib/git');
                git.getBranches.local().then(function(result){
                    expect(result).to.be.undefined;
                }).catch(function(error){
                    expect(error).to.equal('no branches');
                    done();
                });
            });
        });

        describe('all', function(){

            beforeEach(function(done){
                mockery.enable({
                    warnOnReplace: false,
                    warnOnUnregistered: false,
                    useCleanCache: true
                });
                done();
            });

            afterEach(function(done){
                mockery.resetCache();
                mockery.deregisterAll();
                done();
            });

            it('should successfully return all branch information', function(done){
                mockery.registerMock('child_process',fakeChild(null ,'* master\n  develop\n  remotes/origin/master\n  remotes/origin/develop\n  remotes/origin/feature/branch1\n'));
                git = require('../lib/git');
                git.getBranches.all().then(function(branches){
                    expect(branches).to.deep.equal(['master','develop','feature/branch1']);
                    done();
                });
            });

            it('should successfully throw an error when there is no branch information', function(done){
                mockery.registerMock('child_process', fakeChild('no branches', 'doesnt mamtter'));
                git = require('../lib/git');
                git.getBranches.all().then(function(result){
                    expect(result).to.be.undefined;
                }).catch(function(error){
                    expect(error).to.equal('no branches');
                    done();
                });
            });
        });

    });

    describe('getCurrentBranch', function(){

        beforeEach(function(done){
            mockery.enable({
                warnOnReplace: false,
                warnOnUnregistered: false,
                useCleanCache: true
            });
            done();
        });

        afterEach(function(done){
            mockery.resetCache();
            mockery.deregisterAll();
            done();
        });

        it('should successfully return the current branch the user is on', function(done){
            mockery.registerMock('child_process', fakeChild(null, 'develop\n'));
            git = require('../lib/git');
            git.getCurrentBranch().then(function(currentBranch){
                expect(currentBranch).to.equal('develop');
                done();
            });       
        });

        it('should throw an error when getting current branch throws an error', function(done){
            mockery.registerMock('child_process', fakeChild('error','whatever'));
            git = require('../lib/git');
            git.getCurrentBranch().catch(function(error){
                expect(error).to.equal('error');
                done();
            });       
        });
    });

    describe('merge', function(){

        beforeEach(function(done){
            mockery.enable({
                warnOnReplace: false,
                warnOnUnregistered: false,
                useCleanCache: true
            });
            done();
        });

        afterEach(function(done){
            mockery.resetCache();
            mockery.deregisterAll();
            done();
        });

        it('should successfully run merge', function(done){
            mockery.registerMock('child_process',createFakeChildSpawn('git',['merge','branch1']));
            git = require('../lib/git');
            git.merge('branch1').then(function(output){
                expect(output).to.be.undefined;
                done();
            });
        });
    });
});
