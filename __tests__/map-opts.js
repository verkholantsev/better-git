// @flow

import mapOpts from '../src/map-opts';

describe('mapOpts()', () => {
    describe('called with object with string as value', () => {
        it('should return correct string', () => {
            expect(mapOpts({ someParam: 'some-value' })).toEqual('--some-param=some-value');
        });
    });

    describe('called with object with `true` as value', () => {
        it('should return correct string', () => {
            expect(mapOpts({ someFlag: true })).toEqual('--some-flag');
        });
    });
});
