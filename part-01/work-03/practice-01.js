const fp = require('lodash/fp');
const cars = require('./work-03');

// 使用函数组合fp.flowRight() 重新实现如下函数：
let isLastInStock = function (cars) {
    // 获取最后一条数据
    let last_car = fp.last(cars);
    // 获取最后一条数据的in_stock属性
    return fp.prop('in_stock', last_car);
}

// flowRight 调用函数的顺序是从右往左的
const _isLastInStock = fp.flowRight(fp.prop('in_stock'), fp.last)

console.log(_isLastInStock(cars))