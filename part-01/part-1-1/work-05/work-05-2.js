// Promise.all()方法实现
// 接收一个数组作为参数，同样的all方法返回一个对象
// Promise.all 需要等到所有的 promise 的状态都变成 fulfilled 之后才 resolve
// 但只要有一个 promise 失败即返回失败的结果。

const MyPromise = require("./MyPromise");

function fn1() {
    return new MyPromise(function (resolve, reject) {
        setTimeout(function () {
            let num = Math.floor(Math.random() * 10);
            // resolve(num);
            if (num % 2 === 0) {
                resolve(num);
            } else {
                reject('num % 2 !== 0');
            }
        }, 3000);
    })
}

function fn2() {
    return new MyPromise(function (resolve, reject) {
        resolve(3333);
    })
}

let fn3 = new MyPromise(function (resolve, reject) {
    setTimeout(function () {
        let num = Math.floor(Math.random() * 10);
        // resolve(num);
        if (num % 2 === 0) {
            resolve(num);
        } else {
            reject('num % 2 !== 0');
        }
    }, 3000);
})

let promise = MyPromise.all([fn3, 'b', fn1, 'c', fn2]);

fn1()
    // .finally(function () {
    //     console.log('finally');
    //     return fn1()
    // })
    .then(function (value) {
        console.log(value);
    })
    .catch(function(reason) {
        console.log(reason);
    })