const fp = require('lodash/fp');
const { Maybe, Container } = require('./work-04');

// 实现一个函数ex2，能够使用fp.first获取列表的第一个元素

let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do']);

let ex2 = () => {
    let r = xs.map(values => fp.first(values));
    return r;
}

console.log(ex2());