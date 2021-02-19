## 类定义
与函数类型相似，定义类同样有两种方式：类声明和类表达式。
```javascript
// 类声明
class Person {}
// 类表达式
const Animal = class {};
```
与函数表达式的区别：
- 与函数表达式类似，类表达式在它们被求值前也不能引用。
- 与函数定义不同的是，函数声明可以提升，但类定义不能。
- 函数受函数作用域限制，类受块作用域限制。
类的构成通常由以下几部分组成（非必须）：
- 构造函数方法
- 属性成员、实例方法
- 获取、设置函数
- 静态类方法
## 类构造函数
类构造函数本质上任然是一个函数，与构造函数的区别是：调用类构造函数必须使用new操作符。而调用普通构造函数不使用new调用，那么就会以全局的this(通常是window)作为内部对象。
```javascript
function Person() {}
class Animal {}
// 把 window 作为 this 来构建实例
let p = Person();
let a = Animal();
// TypeError: class constructor Animal cannot be invoked without 'new'
```
## 实例、原型和类成员
ECMAScript 2015中并没有类这一类型，通过typeof操作符检测类标识符，表明它是一个函数。
### 实例成员

### 原型

### 类成员

## 继承