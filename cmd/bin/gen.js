
const {initCodeMap} = require('../index');
const path = require('path');

initCodeMap({
    input: path.resolve(process.cwd(), process.argv[2]),
    format: process.argv[3] === 'true',
});

console.log('Generate Finish.');