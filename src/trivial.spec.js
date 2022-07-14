import {describe, expect, it} from '@jest/globals';
import ma from './index.js';


const sortedKeys = (

    $ => $
        ? Object.keys($).sort()
        : []

);


// noinspection SpellCheckingInspection
describe('mockaround', () => {

    it(
        'is a function',
        () => void expect(ma).toBeFun(),
    );

    it(
        'has the correct keys',
        () => void expect(
            sortedKeys(ma),
        ).toEqual(
            ['ENV', 'MAP', 'WID'].sort(),
        ),
    );

    it(
        'has WeakMap as MAP',
        () => void expect(ma.MAP).toBeInstanceOf(WeakMap),
    );

    it(
        'has string as WID',
        () => void expect(typeof ma.WID).toBe('string'),
    );


});
