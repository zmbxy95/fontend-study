const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {

    constructor(executor) {
        // 执行器函数会立即执行
        try {
            executor(this.resolve, this.reject)
        } catch (e) {
            this.reject(e)
        }
    }

    // Promise状态：pending、fulfilled、rejected
    state = PENDING;

    // 成功的值
    value = undefined;

    // 失败/拒绝的原因
    reason = undefined;

    // 成功回调
    successCallback = [];

    // 失败回调
    failedCallback = [];

    // resolve函数是用来修改Promise状态的
    // resolve函数可以将Prmose从pending状态变成fulfilled
    resolve = (value) => {
        if (this.state === PENDING) {
            // 修改状态 -> fulfilled
            this.state = FULFILLED;
            // 保存成功的值
            this.value = value;

            let successCallback;
            while ((successCallback = this.successCallback.shift())) {
                successCallback();
            }
        }
    }

    // reject函数是用来修改Promise状态的
    // reject函数可以将Prmose从pending状态变成rejected
    reject = (reason) => {
        if (this.state === PENDING) {
            // 修改状态 -> rejected
            this.state = REJECTED;
            // 保存成功的值
            this.reason = reason;

            let failedCallback;
            while ((failedCallback = this.failedCallback.shift())) {
                failedCallback();
            }
        }
    }

    // 注册在这个Promise状态确定后的回调
    // 接收两个函数作为参数，一个是处理成功的回调，一个是处理失败的回调
    // 只要Promise状态发生改变，就会调用then
    // then方法可以多次调用
    // then方法返回一个新的promise对象
    // 对于异步的then方法，需要等待Promise完成
    then = (successCallback, failedCallback) => {

        let self = this;

        successCallback = successCallback ? successCallback : function (v) {
            return v;
        }
        failedCallback = failedCallback ? failedCallback : function (r) {
            return r
        }

        let promise = new MyPromise((resolve, reject) => {
            // 成功
            if (self.state === FULFILLED) {
                setTimeout(() => {
                    try {
                        let value = successCallback(self.value);
                        resolvePromise(promise, value, resolve, reject);
                    } catch (e) {
                        reject(reason.message);
                    }

                }, 0)
            } else if (self.state === REJECTED) {
                setTimeout(() => {
                    try {
                        let reason = failedCallback(self.reason);
                        reject(reason);
                    } catch (e) {
                        reject(reason.message);
                    }
                }, 0)
            } else {
                // 等待,先将回调函数保存，待状态明后后再调用
                // self.successCallback.push(successCallback);
                // self.failedCallback.push(failedCallback);
                this.successCallback.push(function () {
                    setTimeout(() => {
                        try {
                            let value = successCallback(self.value);
                            resolvePromise(promise, value, resolve, reject);
                        } catch (e) {
                            reject(e.message);
                        }
                    }, 0)
                })
                this.failedCallback.push(function () {
                    setTimeout(() => {
                        try {
                            let reason = failedCallback(self.reason);
                            reject(reason);
                        } catch (e) {
                            reject(e.message);
                        }
                    }, 0)
                })
            }
        })

        return promise;
    }

    catch = (failedCallback) => {
        return this.then(undefined, failedCallback);
    }

    finally = (callback) => {
        return this.then(
            function(value) {
                return MyPromise.resolve(callback()).then(() => {return value});
            }, 
            function(reason) {
                return MyPromise.resolve(callback()).then(() => {throw reason});
            }
        )
    }

    static all (array) {
        let result = [];
        let index = 0;

        return new MyPromise(function(resolve, reject) {
            
            function addData(key, value) {
                result[key] = value;
                if (++index === array.length) {
                    resolve(result);
                }
            }
            
            for (let idx = 0; idx < array.length; idx++) {
                const current = array[idx];
                if (current instanceof MyPromise) {
                    current.then(
                        function(v) {
                            addData(idx, v)
                        },
                        function(r) {
                            reject(r);
                        }
                    )
                } else {
                    addData(idx, array[idx]);
                }
            }
        })
    }

    static resolve(value) {
        if (value instanceof MyPromise) {
            return value;
        }
        return new MyPromise(function(resolve) {
            resolve(value);
        })
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    // 第一步：防止循环引用
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise!'));
    }
    if (x instanceof MyPromise) {
        x.then(resolve, reject)
    } else {
        resolve(x);
    }
}

module.exports = MyPromise;
