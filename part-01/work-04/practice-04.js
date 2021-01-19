const fp = require('lodash/fp');
const { Maybe, Container } = require('./work-04');

// 使用Maybe重写ex4，不要有if语句
let ex4 = function(n) {
    return Maybe.of(n).map(x => parseInt(x));
}

console.log(ex4(null));

console.log(ex4('2'))