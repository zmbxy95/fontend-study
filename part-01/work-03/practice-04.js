const fp = require('lodash/fp');
const cars = require('./work-03');
// 使用flowRight写一个snaitizeNames()函数
// 返回一个下划线连接的小写字符串
// 把数组中的name转换为如下形式：snaitizeNames(['hello word']) => ['hello_word']

let _underscore = fp.replace(/\W+/g, '_'); // --> 无需改动，在snaitizeNames中使用它

let snaitizeNames = fp.flowRight(fp.map(fp.flowRight(_underscore ,fp.toLower)) ,fp.map('name'));

console.log(snaitizeNames(cars))