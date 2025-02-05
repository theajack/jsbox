/*
 * @Author: chenzhongsheng
 * @Date: 2025-02-05 20:43:46
 * @Description: Coding something
 */

const {generateCodeMap, initCodeMap} = require('../tool');
const path = require('path');

// generateCodeMap({}, path.resolve(__dirname, './files'));

initCodeMap({
    input: path.resolve(__dirname, './files'),
    format: true,
});