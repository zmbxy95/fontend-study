// Promsie 三种状态: pendding(等待)、 fulfilled(完成)、 rejected(拒绝)
// 状态切换只能由 pending -> fulfilled 或者 pending -> rejected
// Promise状态一经改变就不可更改
// Promise构造函数需要一个执行器函数，并且该执行器函数会立即执行
// 同时会给执行器函数传递两个参数：resolve 和 reject 函数，用于修改Promise的状态
// resolve函数需要一个value，reject需要一个reason
// let promise = new Promise(function (resolve, reject) {
//     setTimeout(function () {
//         let num = Math.floor(Math.random() * 10);
//         if (num % 2 === 0) {
//             resolve(num);
//         } else {
//             reject('num % 2 !== 0');
//         }
//     }, 3000);
// })

// then方法是用来添加Promise状态明确后的回调函数
// then方法需要两个函数：onFulfilled 和 onRejected函数，onRejected可以省略
// then方法内部会返回一个Promise对象
// promise.then(
//     function onFulfilled(value) {
//         console.log('---------- Promise success ----------')
//         console.log(value);
//     },
//     function onRejected(reason) {
//         console.log('---------- Promise failed ----------')
//         console.log(reason);
//     }
// )


// then 方法可以调用多次
// promise.then(
//     function onFulfilled(value) {
//         console.log('---------- Promise success 1 ----------')
//         console.log(value);
//     },
//     function onRejected(reason) {
//         console.log('---------- Promise failed 1 ----------')
//         console.log(reason);
//     }
// )

// promise.then(
//     function onFulfilled(value) {
//         console.log('---------- Promise success 2 ----------')
//         console.log(value);
//     },
//     function onRejected(reason) {
//         console.log('---------- Promise failed 2 ----------')
//         console.log(reason);
//     }
// )

// then方法的链式调用
// 原因就是then方法可以返回一个Promise对象
// promise.then(function (value) {
//     console.log('---------- Promise chain callback success 1 ----------')
//     console.log(value);
//     return Promise.resolve('HELLO ~')
// }).then(function (value) {
//     console.log('---------- Promise chain callback success 2 ----------')
//     console.log(value);
//     return 100
// }).catch(function (reason) {
//     console.log('---------- Promise chain callback failed 1 ----------')
//     console.log(reason);
// }).catch(function (reason) {
//     console.log('---------- Promise chain callback failed 2 ----------')
//     console.log(reason);
// })

const MyPromise = require('./MyPromise');

let myPromise = new MyPromise(function (resolve, reject) {
    // resolve(123);
    // reject(456);
    setTimeout(function () {
        let num = Math.floor(Math.random() * 10);
        resolve(num);
        // if (num % 2 === 0) {
        //     resolve(num);
        // } else {
        //     reject('num % 2 !== 0');
        // }
    }, 3000);
});

// myPromise.then(
//     function onFulfilled(value) {
//         console.log('---------- MyPromise success ----------')
//         console.log(value);
//     },
//     function onRejected(reason) {
//         console.log('---------- MyPromise failed ----------')
//         console.log(reason);
//     }
// )

// myPromise.then(
//     function onFulfilled(value) {
//         console.log('---------- MyPromise success 1 ----------')
//         console.log(value);
//     },
//     function onRejected(reason) {
//         console.log('---------- MyPromise failed 1 ----------')
//         console.log(reason);
//     }
// )

// myPromise.then(
//     function onFulfilled(value) {
//         console.log('---------- MyPromise success 2 ----------')
//         console.log(value);
//     },
//     function onRejected(reason) {
//         console.log('---------- MyPromise failed 2 ----------')
//         console.log(reason);
//     }
// )

// then方法的链式调用
// 原因就是then方法可以返回一个Promise对象
myPromise.then(function (value) {
    console.log('---------- MyPromise chain callback success 1 ----------')
    console.log(value);
    return new MyPromise(function(resolve, reject) {
        resolve('HELLO ~')
    })
}).then(function (value) {
    console.log('---------- MyPromise chain callback success 2 ----------')
    console.log(value);
    return 100
}).then(function(value) {
    console.log('---------- MyPromise chain callback success 2 ----------')
    console.log(value);
})