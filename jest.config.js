// noinspection JSUnusedGlobalSymbols
export default ({

    passWithNoTests: true,

    testMatch: [
        '<rootDir>/(src|tst)/**/*.(spec|test).js',
    ],

    setupFilesAfterEnv: [
        '<rootDir>/jest.setup.js',
    ],

    coverageReporters: [
        'json',
        'lcov',
        'text-summary',
    ],

    collectCoverageFrom: ['src/**/*.js'],

    transform: {},

});
