import {describe, expect, it, jest} from '@jest/globals';
import ma from './index.js';


const sortedOwnKeys = (

    $ => $
        ? Object.getOwnPropertyNames($).sort()
        : []

);


// noinspection SpellCheckingInspection
describe('mockaround', () => {// eslint-disable-line max-lines-per-function

    it(
        'returns wrapped function and sets the mock',
        () => {

            const mock = {};
            const fn = jest.fn(() => void (1)).mockName('some name');
            const actual = ma(mock, fn);

            expect(actual).not.toBe(fn);
            expect(actual.name).toBe(fn.name);
            expect(actual.length).toBe(fn.length);

            expect(ma.MAP).toBeInstanceOf(WeakMap);
            expect(ma.WID).toBeTruthy();
            expect(typeof ma.WID).toBe('string');

            expect(ma.MAP.get(fn).get(ma.WID)).toBe(mock);

        },
    );


    it(
        'calls the function with injected mock',
        () => {

            const fn = (arg, mock = null) => (mock?.rp)?.(arg);
            const rp = jest.fn($ => $).mockName('replacement');

            const mock = {rp};
            const obj = {};

            const wrapper = ma(mock, fn);

            expect(ma.MAP.get(fn).get(ma.WID)).toBe(mock);

            expect(wrapper(obj)).toBe(obj);

            expect(rp).toHaveBeenCalledTimes(1);
            expect(rp).toHaveBeenCalledWith(obj);

        },
    );

    it(
        'returns the wrapper with correct fields',
        () => {
            const mockedOne = $ => $;
            const wrapper = ma({}, mockedOne);
            const keys = ['name', 'length', 'original', 'unmock', 'wid'].sort();

            expect(sortedOwnKeys(wrapper)).toEqual(keys);
            expect(wrapper.name).toBe(mockedOne.name);
            expect(wrapper.length).toBe(mockedOne.length);
            expect(wrapper.original).toBe(mockedOne);
            expect(typeof wrapper.unmock).toBe('function');
            expect(wrapper.wid).toBe(process.env.JEST_WORKER_ID);
        },
    );

});
