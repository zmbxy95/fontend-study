## Promise states

一个Promise一定处于以下三种状态之一：`pending`、`fulfilled`或者`rejected`。

- `pending`
  - 初始状态，可以过渡到`fulfilled`或者`rejected`状态
- `fulfilled`
  - 该状态下，状态永远不会再改变，也不会被允许再次修改。
  - 必须有一个值，并且是不允许再次被改变的。
- `rejected`
  - 该状态下，状态永远不会再改变，也不会被允许再次修改。
  - 必须有个失败/拒绝的理由，并且不允许再次被修改。

在此，“绝不能改变”是指不变的身份（即===），但并不意味着深度不变。

## `then`方法

一个Promise必须提供一个`then`方法来访问它的当前或者实际的`value`或者`reason`

一个Promise的`then`方法接受两个参数：

```javascript
promise.then(onFulfilled, onRejected)
```

- `onFulfilled`和`onRejected`都是可选参数

  - 如果`onFulfilled`不是一个函数，它将会被忽略。
  - 如果`onRejected`不是一个函数，它将会被忽略。

- 如果`onFulfilled`是一个函数：

  - 它必须在promise完成之后调用，promise的值作为它的第一个参数。
  - 在promise未完成之前，不允许调用它。
  - 在一个promise中，它最多只能被调用一次。

- 如果`onRejected`是一个函数：

  - 它必须在peomise拒绝后执行，拒绝的原因作为它的第一个参数。
  - 在peomise未完成之前，不允许调用它。
  - 在同一个peomise中，它最多只能被调用一次。

- `onFulfilled` or `onRejected` must not be called until the [execution context](https://es5.github.io/#x10.3) stack contains only platform code. [[3.1](https://promisesaplus.com/#notes)].

- `onFulfilled` and `onRejected` must be called as functions (i.e. with no `this` value). [[3.2](https://promisesaplus.com/#notes)]。

- `then`方法在同一个promise中允许被调用多次。

  - 如果promise状态未`fulfilled`，所有相关的`onFulfilled`，必须按照它们发起`then`的顺序依次调用
  - 如果Promise状态未`rejected`，所有相关的`onRejected`，必须按照它们发起`then`的顺序依次调用

- `then`方法必须返回一个Promise。

  ```javascript
  let promise2 = promise1.then(onFulfilled, onRejected);
  ```

  - 如果`onFulfilled`或者`onRejected`返回了一个值`x`，执行Promise解析过程`[[Resolve]](promise2, x)`
  - 如果`onFulfilled`或者`onRejected`抛出了一个异常`e`，`promise2`必须`rejected`，并且将异常`e`作为原因。
  - 如果`onFulfilled`不是一个函数并且`promise1`已经完成，`promise2`必须也是完成，并且具有与`promise1`相同的值。
  - 如果`onRejected`不是一个函数并且`promise1`状态为`rejected`，`promise2`状态也必须是`rejected`，并且具有与`promise1`相同的原因。

## `Promise`解决过程

