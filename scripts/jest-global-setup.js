// @flow

const spawn = require('spawndamnit');

module.exports = async function jestGlobalSetup() {
    // eslint-disable-next-line no-console
    console.log('Building package to use in integration tests');

    await spawn('yarn', ['build'], { stdio: 'inherit' });
};
