// Promsie 三种状态: pendding(等待)、 fulfilled(完成)、 rejected(拒绝)
// 状态切换只能由 pending -> fulfilled 或者 pending -> rejected
// 状态一经变更到fulfilled或者rejected，就无法改变。
// Promise 接收两个参数： (onFulfilled, onRejected) => { ... }
// Promise 存储一个value和一个reason

new Promise(
    function onFulfilled() {

    },
    function onRejected() {

    }
)