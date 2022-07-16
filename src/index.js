const ENV = Symbol('ENV');
const OG = Symbol('OG');
const MAP = new WeakMap();


// noinspection SpellCheckingInspection
const mockaround = (

    // eslint-disable-next-line max-lines-per-function
    (mock, fn) => {

        const env = (mock?.[ENV] ?? process?.env ?? {});
        const wid = env.JEST_WORKER_ID;

        if ('test' !== env.NODE_ENV && !wid) {
            return fn;
        }

        while ('function' === typeof fn?.[OG]) {
            fn = fn?.[OG];
        }

        if ('function' !== typeof fn) {
            return fn;
        }

        const mocks = MAP.get(fn) ?? new Map();
        MAP.set(fn, mocks);
        mocks.delete(wid);
        mocks.set(wid, mock);

        const wrapper = (...$$) => fn(...$$, mocks.get(wid) ?? void (1));
        wrapper[OG] = fn;

        const unmock = () => {
            mocks?.delete?.(wid);
            return fn;
        };

        return Object.defineProperties(
            wrapper,
            {
                name:     {value: fn.name},
                length:   {value: fn.length},
                original: {value: wrapper[OG]},
                unmock:   {value: unmock},
                wid:      {value: wid},
            },
        );

    }

);


export default Object.defineProperties(
    mockaround,
    {
        ENV: {enumerable: true, get: () => ENV},
        MAP: {enumerable: true, get: () => MAP},
        WID: {enumerable: true, get: () => process?.env?.JEST_WORKER_ID},
    },
);
