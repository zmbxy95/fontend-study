## MyPromise 实现

### 1. 首先第一步是完成Promise核心功能

```javascript
let promise = new Promise(function(resolve, reject) {
    // TODO ...
})

promise.then(
    function success(data) {
        // TODO ...
    },
    function failed(data) {
        // TODO ...
    },
)
```

通过这段代码以及相关的Promise，我们分析：
- 1. `Promise`是一个对象，构造函数需要传递一个函数，我们称之为执行器函数。该执行器函数会被立即执行
- 2. 执行器函数有两个参数，分别是`resolve`和`reject`,这两个函数的作用就是更改Promise状态的。
- 3. `resolve`函数需要一个`value`，`reject`函数需要一个`reason`参数
- 3. `Promise`的有三个状态：`pending`(等待)、`fulfilled`(完成/成功)、`rejected`(拒绝/失败)
- 4. `Promise`状态只能由`pending` -> `fulfilled`或者`pending` -> `rejected`。
- 5. `Promise`状态一经确立，就不可以再更改。
- 6. `then`方法的成功回调与失败回调中会个有一个值，分别为成功的`value`与失败的`reason`。

根据上述分析，定义Promise对象如下：
```javascript
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class Promise {

    constructor(executor) {
        executor(this.resolve, this.reject)
    }

    // 默认状态为pending
    state = PENDING;

    value = undefind;

    reason = undefind;

    resolve = (value) => {
       // 如果状态已经改变，忽略
       if (this.state !== PENDING) {
           return;
       }
       this.state = FULFILLED;
       this.value = value;
    }

    reject = (reason) => {
       // 如果状态已经改变，忽略
       if (this.state !== PENDING) {
           return;
       }
       this.state = REJECTED;
       this.reason = reason;
    }

    then = (success, failed) => {
        if (this.state = FULFILLED) {
            success(this.value);
            return;
        }
        if (this.state = REJECTED) {
            failed(this.reason);
            return;
        }
    }
}
```

### 2. 添加Promise异步支持
上述的实现，仅仅实现了最简单的同步处理, 也就是Promise状态是`fulfilled`和`rejected`时的处理。而未处理异步情况下，Promise状态是`pending`的处理。
解决方案就是对于`pending`状态下的Promise，先将then方法中成功和失败的回调函数存储起来，等待Promise状态确立后再调用。修改如下：
```javascript
class Promise {
    +++ successCalback = undefind; // 成功的回调
    +++ failedCalback = undefind; // 失败的回调

    resolve = (value) => {
        // 如果状态已经改变，忽略
        if (this.state !== PENDING) {
            return;
        }
        this.state = FULFILLED;
        this.value = value;

        // 状态确立后调用成功回调
        +++ this.successCalback && this.successCalback(value)
    }

    reject = (reason) => {
        // 如果状态已经改变，忽略
        if (this.state !== PENDING) {
            return;
        }
        this.state = REJECTED;
        this.reason = reason;

        // 状态确立后调用成功回调
        +++ this.failedCalback && this.failedCalback(reason)
    }

    then = (success, failed) => {
        if (this.state = FULFILLED) {
            success(this.value);
            return;
        }
        if (this.state = REJECTED) {
            failed(this.reason);
            return;
        }

        +++ this.successCalback = success;
        +++ this.failedCalback = failed;
    }
}
```
这样我们就可以处理`Promise`状态为`pending`的情况了。但是我们注意到，Javascript的`Promise`对象中的then方法可以调用多次，如下形式：
```javascript
let p = new Promise(function(resolve, reject) {
    // TODO ...
})

P.then(
    () => {
        //TODO ...
    }, 
    () => {
        //TODO ...
    }
)

P.then(
    () => {
        //TODO ...
    }, 
    () => {
        //TODO ...
    }
)

P.then(
    () => {
        //TODO ...
    }, 
    () => {
        //TODO ...
    }
)
```
继续修改我们的Promise，来完善它。修改如下：
```javascript

```