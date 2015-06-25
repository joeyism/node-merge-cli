'use strict';

var git = require('./lib/git');
var prompt = require('./lib/prompt');
require('colors');

var sourceBranch, destBranch;

git.getCurrentBranch().then(function(currentBranch){

    console.log('You are currently in branch '+currentBranch.bold());
    destBranch = currentBranch;
    return git.getBranches[location](); 

}).then(function(branches){

    return prompt.branches(branches);

}).then(function(branch){

    sourceBranch = branch;
    return git.merge(branch);

}).then(function(){

    console.log('Successfully merging from ' + sourceBranch.bold + ' to ' + destBranch.bold);

}).catch(function(error){

    console.log(error.red);

});
