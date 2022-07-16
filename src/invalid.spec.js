import {describe, expect, it} from '@jest/globals';
import ma from './index.js';


const noop = () => void (1);

// noinspection SpellCheckingInspection
describe('mockaround', () => {


    it.each([
        // result, mock, fn
        [null, null, null],
        [1, null, 1],
        ['not a function', null, 'not a function'],
    ])(
        'returns %p for mock %p and function %p',
        expect(ma).toMapExact,
    );


    it(
        'returns wrapper all the same if disabled through environment',
        () => {
            global.process.env.JEST_WORKER_ID = '';
            global.process.env.NODE_ENV = 'not test';

            const actual = ma({}, noop);

            expect(actual?.original).toBe(noop);
        },
    );


});
