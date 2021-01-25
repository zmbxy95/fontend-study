const fp = require('lodash/fp');
const cars = require('./work-03');

// 使用帮助函数_average重构averageDollarValue, 使用函数组合的方式实现。

let _average = function(xs) {
    return fp.reduce(fp.add, 0, xs) / xs.length;
} // --> 无需改动

let averageDollarValue = function(cars) {
    let dollar_values = fp.map(function(car) {
        return car.dollar_value;
    }, cars);

    return _average(dollar_values);
}

console.log(averageDollarValue(cars))

let _averageDollarValue = fp.flowRight( _average, fp.map('dollar_value'));

console.log(_averageDollarValue(cars));