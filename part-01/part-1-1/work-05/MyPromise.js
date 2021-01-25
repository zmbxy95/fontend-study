const STATE = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
}

class MyPromise {

    // 构造函数需要一个执行器函数，用于修改Promise的状态
    constructor(executor) {
        // 执行器函数会立即执行
        executor(this.resolve, this.reject)
    }

    // Promise状态：pending、fulfilled、rejected
    _state = STATE.PENDING;

    // 成功的值
    _value = undefined;

    // 失败/拒绝的原因
    _reason = undefined;

    // 成功回调
    _successCallback = [];

    // 失败回调
    _failedCallback = [];

    // resolve 函数需要一个value
    resolve = (value) => {
        if (this._state !== STATE.PENDING) {
            return;
        }

        this._state = STATE.FULFILLED;
        this._value = value;

        // this.successCallback && this.successCallback(value);
        let successCallback;
        while ((successCallback = this._successCallback.shift())) {
            let v = successCallback(value);
        }
    }

    // reject 函数需要一个reason
    reject = (reason) => {
        if (this._state !== STATE.PENDING) {
            return;
        }
        this._state = STATE.FULFILLED;
        this._reason = reason;

        // this.failedCallback && this.failedCallback(reason);
        let failedCallback;
        while ((failedCallback = this._failedCallback.shift())) {
            failedCallback(reason);
        }
    }

    // 注册在这个Promise状态确定后的回调
    // then方法返回一个新的promise对象
    // 对于异步的then方法，需要等待Promise完成
    then = (successCallback, failedCallback) => {

        let promise = new MyPromise((resolve, reject) => {
            try {
                // 成功
                if (this._state === STATE.FULFILLED) {
                    setTimeout(() => {
                        let value = successCallback(this._value);
                        resolvePromise(value, resolve, reject);
                    }, 0)
                    return;
                }
                // 失败
                if (this._state === STATE.REJECTED) {
                    setTimeout(() => {
                        let reason = failedCallback(this._reason);
                        reject(reason);
                    }, 0)
                    return;
                }
                // 等待 -> 待状态变成fullfiled或者rejected时调用
                this._successCallback.push(successCallback);
                this._failedCallback.push(failedCallback);
            } catch (e) {
                reject(e)
            }
        })

        return promise;
    }
}

function resolvePromise(x, resolve, reject) {
    if (x instanceof MyPromise) {
        x.then(resolve, reject)
    } else {
        resolve(x);
    }
}

module.exports = MyPromise;
