import {describe, expect, it, jest} from '@jest/globals';
import ma from './index.js';


const ident = $ => $;


// noinspection SpellCheckingInspection
describe('mockaround', () => {

    it.each([
        {JEST_WORKER_ID: '5', NODE_ENV: 'test'},
    ])(
        'returns wrapped function which after use it can un-mock',
        env => {

            const fn = (arg, mock = null) => (mock?.rp ?? ident)?.(arg);
            const obj = {};

            const mock = {[ma.ENV]: env, rp: jest.fn(ident)};
            const wrapper = ma(mock, fn);

            expect(ma.MAP.get(fn).get(wrapper.wid)).toBe(mock);
            expect(wrapper(obj)).toBe(obj);

            const unwrapped = wrapper.unmock();
            expect(unwrapped).toBe(fn);

            expect(ma.MAP.get(fn).get(wrapper.wid)).toBe(void (1));
            expect(unwrapped(obj)).toBe(obj);

        },
    );


});
