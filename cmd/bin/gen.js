/*
 * @Author: chenzhongsheng
 * @Date: 2025-02-06 23:57:34
 * @Description: Coding something
 */

const {initCodeMap} = require('../index');
const path = require('path');
const {parseArgv} = require('@tcbox/command-parser');

const {args, options} = parseArgv();


initCodeMap({
    input: path.resolve(process.cwd(), args[1]),
    format: options.format,
    watch: options.watch,
    output: options.output,
    configFile: options.config,
});

console.log('Generate Finish.');

// dev test: node cmd/bin/gen.js public/jsbox-demo/ --watch