#!/usr/bin/env bash

set -ex

npm run jscs
npm test

node bower.json
node package.json
