import {describe, expect, it, jest} from '@jest/globals';
import ma from './index.js';


const ident = $ => $;


// noinspection SpellCheckingInspection
describe('mockaround', () => {

    it.each([
        {NODE_ENV: 'test'},
        {JEST_WORKER_ID: '15'},
        {JEST_WORKER_ID: '15', NODE_ENV: 'test'},
    ])(
        'returns wrapped function on good ENV',
        env => {

            const fn = (arg, mock = null) => (mock?.rp)?.(arg);
            const obj = {};

            const mock = {[ma.ENV]: env, rp: jest.fn(ident)};
            const wrapper = ma(mock, fn);

            expect(ma.MAP.get(fn).get(wrapper.wid)).toBe(mock);
            expect(wrapper(obj)).toBe(obj);

        },
    );


    it.each([
        {NODE_ENV: 'not test'},
        {JEST_WORKER_ID: ''},
        {JEST_WORKER_ID: '', NODE_ENV: ''},
    ])(
        'returns unwrapped function on bad ENV',
        env => {

            const fn = (arg, mock = null) => (mock?.rp ?? ident)?.(arg);
            const obj = {};

            const mock = {[ma.ENV]: env, rp: jest.fn(ident)};
            const wrapper = ma(mock, fn);

            expect(ma.MAP.get(fn)).toBe(void (1));
            expect(wrapper(obj)).toBe(obj);

        },
    );


});
