/* eslint-disable no-magic-numbers */


import {describe, expect, it, jest} from '@jest/globals';
import ma from './index.js';


const ident = $ => $;


// noinspection SpellCheckingInspection
// eslint-disable-next-line max-lines-per-function
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


    it(
        're-mocks function through the wrapper',
        () => {

            const fn = (arg, mock = null) => (mock?.rp ?? ident)?.(arg);

            const mock1 = {rp: jest.fn(() => 1)};
            const wrapper1 = ma(mock1, fn);

            expect(ma.MAP.get(fn).get(wrapper1.wid)).toBe(mock1);
            expect(wrapper1('x')).toBe(1);
            expect(wrapper1.original).toBe(fn);

            const mock2 = {rp: jest.fn(() => 2)};
            const wrapper2 = ma(mock2, wrapper1);

            expect(wrapper2).not.toBe(wrapper1);

            expect(ma.MAP.get(fn).get(wrapper1.wid)).toBe(mock2);
            expect(ma.MAP.get(fn).get(wrapper2.wid)).toBe(mock2);

            expect(wrapper2('y')).toBe(2);
            expect(wrapper2.original).toBe(fn);

        },
    );

    it(
        'injects fn properly when no tests are running',
        () => {

            const mockOutsideTest = {[ma.ENV]: {}, rp: $ => $};

            const embeddedFn = (arg, mock = null) => (mock?.rp)?.(arg) ?? 'not injected';
            const exportedFn = ma(mockOutsideTest, embeddedFn);

            expect(embeddedFn('whatever')).toBe('not injected');
            expect(exportedFn('injected')).toBe('injected');

        },
    );


});
