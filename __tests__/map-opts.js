// @flow

import mapOpts from '../src/map-opts';

describe('mapOpts()', () => {
    describe('called with object with string as value', () => {
        it('should return correct string with quotes', () => {
            expect(mapOpts({ someParam: 'some value' })).toEqual("--some-param='some value'");
        });
    });

    describe('caller with object with number as a value', () => {
        it('should return correct string without quotes', () => {
            expect(mapOpts({ maxCount: 100 })).toEqual('--max-count=100');
        });
    });

    describe('called with object with `true` as value', () => {
        it('should return correct string', () => {
            expect(mapOpts({ someFlag: true })).toEqual('--some-flag');
        });
    });
});
