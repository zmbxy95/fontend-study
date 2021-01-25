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

  - 它必须在peomise拒绝后执行，拒绝的`reason`作为它的第一个参数。
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
  - 如果`onFulfilled`或者`onRejected`抛出了一个异常`e`，`promise2`必须`rejected`，并且将异常`e`作为其`reason`。
  - 如果`onFulfilled`不是一个函数并且`promise1`已经完成，`promise2`必须也是完成，并且具有与`promise1`相同的值。
  - 如果`onRejected`不是一个函数并且`promise1`状态为`rejected`，`promise2`状态也必须是`rejected`，并且具有与`promise1`相同的`reason`。

## `Promise`解决过程
`Promise`的解析过程是一个抽象操作，输入一个承诺和一个值，我们将其表示为`[[Resolve]](promise, x)`。如果`x`是一个`thenable`对象，在假定x的行为至少有点像一个`promise`的情况下，它会尝试让`promise`转换到`x`的状态。否则，他会用`x`的值完成`promise`的状态。

这种`thenable`对象的方式允许`promise`实现交互，只要他们暴露一个符合`Promise/A+`规范的`then`函数。它还允许`Promise/A+`的实现支持一个有合适的`then`方法的不兼容的实现。

执行`[[Resolve]](promise, x)`解析过程时, 按照如下步骤执行:

- 如果`promise`和`x`指向同一个对象，`promise`状态切换为`rejected`,并`TypeError`作为其`reason`。
- 如果`x`是一个`promise`，判断它的状态：
  - 如果`x`的状态为`pending`, `promise`必须保留`pending`状态，直到`X`的状态变成`fulfilled`或者`rejected`为止。
  - 如果/当`x`的状态为`fulfilled`状态, 则使用相同的`value`将整个`promise`完成。
  - 如果/当`x`的状态为`rejected`状态，则使用相同的`reason`将整个`promise`拒绝。
- 如果`x`是一个函数或者一个对象
  - 让`then`变成`x.then`
  - 如果在检测`x.then`的结果时抛出一个异常`e`, 则拒绝`promise`, 并将`e`作为其据因。
  - 如果`then`是一个函数，用`x`作为`this`来调用它，并将`resolvePromise`作为第一个参数, `rejectPromise`作为第二个参数。
    - 如果/当使用一个`y`作为`value`调用`resolvePromise`时，执行`[[Resolve]](promise, y)`解析过程。
    - 如果/当使用一个`r`作为`reason`调用`rejectPromise`时，拒绝整个`promise`，并将`r`作为其据因。
    - 如果`resolvePromise`和`rejectPromise`同时被调用，或者多次调用同一个实参，则第一个调用生效，之后的所有调用都将被忽略。
    - 如果调用`then`方法时抛出了一个异常`e`,
      - 如果`resolvePromise`或者`rejectPromise`已经被调用过，则忽略它。
      - 其他情况下，拒绝整个`promise`并将`e`作为其据因。
  - 如果`then`不是一个函数，完成`promise`，并将`x`作为其`value`。
- 如果`x`不是一个对象或者函数，完成整个`promise`, 并将`x`作为其`value`。

如果用一个参与循环可执行链的可执行性来解析promise，例如`[[Resolve]](promise, thenable)`的递归性质最终导致`[[Resolve]](promise, thenable)`再次被调用，遵循上述算法将导致无限递归。我们鼓励实现(但不是必需的)检测这种递归，并以提供信息的`TypeError`作为理由拒绝`promise`。