'use strict';

const spawn = require('spawndamnit');

module.exports = function jestGlobalSetup() {
    // eslint-disable-next-line no-console
    console.log('Building package to use in integration tests');

    return spawn('yarn', ['build'], { stdio: 'inherit' });
};
