const fp = require('lodash/fp');
const { Maybe, Container } = require('./work-04');

// 实现一个函数ex3，使用safeProp和fp.first找到user的名字的首字母

let safeProp = fp.curry(function (x, o) {
    return Maybe.of(o(x))
})

let user = {id: 2, name: 'Albert'}

let ex3 = () => {
    return safeProp(user)(fp.flowRight(fp.first, fp.toArray, fp.prop('name')))
}

console.log(ex3())