const merge = require('lodash/merge');
const mongodb_preset =require('@shelf/jest-mongodb/jest-preset');
const ts_preset =require('ts-jest/jest-preset');

const jestCustomConf = { testEnvironment: 'node' };

module.exports = merge(mongodb_preset, ts_preset, jestCustomConf);;
