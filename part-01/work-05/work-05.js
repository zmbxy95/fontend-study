// Promsie 三种状态: pendding(等待)、 fulfilled(完成)、 rejected(拒绝)
// 状态切换只能由 pending -> fulfilled 或者 pending -> rejected
// Promise构造函数需要一个执行器函数，并且该执行器函数会立即执行
// 同时会给执行器函数传递两个参数：resolve 和 reject 函数，用于修改Promise的状态
// resolve函数需要一个value，reject需要一个reason

let promise = new Promise(function (resolve, reject) {
    setTimeout(function() {
        let num = Math.floor(Math.random() * 10);
        if (num % 2 === 0) {
            resolve(num);
        } else {
            reject('num % 2 !== 0');
        }
    }, 3000);
})

// then方法是用来添加Promise状态明确后的回调函数
// then方法需要两个函数：onFulfilled 和 onRejected函数，onRejected可以省略
// then方法内部会返回一个Promise对象
promise.then(
    function onFulfilled(value) {
        console.log(value);
    },
    function onRejected(reason) {
        console.log(reason);
    }
)