class MyPromise {

    // 构造函数需要一个执行器函数，用于修改Promise的状态
    constructor(executer) {
        // 执行器函数会立即执行
        executer(resolve, reject);
    }

    // resolve 函数需要一个value
    resolve(value) {

    }

    // reject 函数需要一个reason
    reject(reason) {

    }
}