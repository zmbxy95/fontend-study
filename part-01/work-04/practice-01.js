// 使用fp.add(x,y) 和 fp.map(f,x)创建一个能让functor里的值增加的函数ex1

const fp = require('lodash/fp');

const { Maybe, Container } = require('./work-04');

let maybe = Maybe.of([5, 6, 1]);

let ex1 = () => {
    // 需要实现的函数
    let add = fp.map(fp.add(1));

    return maybe.map(add);
}

console.log(ex1());