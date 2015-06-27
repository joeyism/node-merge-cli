# merge-CLI

[![Build Status](https://travis-ci.org/joeyism/node-merge-cli.svg)](https://travis-ci.org/joeyism/node-merge-cli)

A simple tool to visualize merging of your local branch to another branch.

### Installation

    > npm install -g merge-cli

### To Run

##### Local

To merge with a local branch, run

    > merge

or

    > merge local


##### Global

To merge with a global branch, run

    > merge all

##### Specific Branch

To merge with the specific branch *[branch]*, run

    > merge [branch]

### Versions
**1.0.2**
* Fixed bug where stdout and stderr were reversed

**1.0.1**
* Fixed bug so it actually merges

**1.0.0**
* first publish
