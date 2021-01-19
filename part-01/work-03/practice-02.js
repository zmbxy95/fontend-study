const fp = require('lodash/fp');
const cars = require('./work-03');

// 使用fp.flowRight()、fp.prop()、fp.first()获取第一个car的name

const getFirstCarName = fp.flowRight(fp.prop('name') , fp.first);

console.log(getFirstCarName(cars));