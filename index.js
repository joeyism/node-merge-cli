#!/usr/bin/env node
'use strict';

var git = require('./lib/git');
var prompt = require('./lib/prompt');
require('colors');
var sourceBranch, destBranch;
var params = process.argv;

if (params[2] === 'local' || params[2] === 'all' || params[2] === undefined){

    var type = params[2] || 'local';


    git.getCurrentBranch().then(function(currentBranch){

        console.log('You are currently in branch ' + currentBranch.bold);
        destBranch = currentBranch;
        return git.getBranches[type](); 

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

}
else {

    git.getCurrentBranch().then(function(currentBranch){

        console.log('You are currently in branch ' + currentBranch.bold);
        destBranch = currentBranch;
        return git.merge(params[2]);

    }).then(function(){

        console.log('Successfully merging from ' + sourceBranch.bold + ' to ' + destBranch.bold);

    }).catch(function(error){

        console.log(error.red);

    });


}
