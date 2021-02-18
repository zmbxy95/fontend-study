## let 和 const
### let声明
了解let声明的作用，我们直接与var关键字进行对比即可。
- let声明的范围是块级作用域，var声明的是函数作用域。
```javascript
if (true) {
    var name = 'AAA';
    console.log(name); // AAA
}
console.log(name); // AAA

if (true) {
    let age = 26;
    console.log(age); // 26
}
console.log(age); // ReferenceError: age 没有定义
```
- let不允许同一块作用域中出现冗余声明，而var可以。
```javascript
var name;
var name;

let age;
let age; // SyntaxError；标识符 age 已经声明过了
```
当然在这里，需要注意的是，JavaScript引擎会记录用于变量声明的标识符以及所在的块作用域，因此嵌套使用相同的标识符不会报错。
```javascript
var name = 'Nicholas';
console.log(name); // 'Nicholas'
if (true) {
    var name = 'Matt';
    console.log(name); // 'Matt'
}

let age = 30;
console.log(age); // 30
if (true) {
    let age = 26;
    console.log(age); // 26
}
```
另外，对声明冗余报错不会因为昏庸let和var而受影响。这两个关键字声明的并不是不同类型的变量，它们只是指出变量在相关作用域如何存在。
```javascript
var name;
let name; // SyntaxError

let age;
var age; // SyntaxError
```
- let声明的变量不会再作用域中被提升。
```javascript
// name 会被提升
console.log(name); // undefined
var name = 'Matt';

// age 不会被提升
console.log(age); // ReferenceError：age 没有定义
let age = 26;
```
- let在全局作用域中声明的变量不会称为window对象的属性，而var声明的变量则会。
```javascript
var name = 'Matt';
console.log(window.name); // 'Matt'

let age = 26;
console.log(window.age); // undefined
```
了解了let与var的区别后，来看一个let关键字的经典应用，for循环：
```javascript
// 使用var
for (var i = 0; i < 5; ++i) {
    // 循环逻辑
}
console.log(i); // 5

// 使用let
for (let i = 0; i < 5; ++i) {
    // 循环逻辑
}
console.log(i); // ReferenceError: i 没有定义
```
这个例子，相对好理解，无非就是var声明函数级作用域，并且会提升，导致迭代变量渗透到循环体外部，而let是块级作用域，不会提升。
容易出问题的是对迭代变量的声明和修改：
```javascript
for (var i = 0; i < 5; ++i) {
    setTimeout(() => console.log(i), 0)
}
// 输出 5、5、5、5、5

for (let i = 0; i < 5; ++i) {
    setTimeout(() => console.log(i), 0)
}
// 输出 0、1、2、3、4
```
### const 声明
- const声明的变量，不想允许修改
const的行为与let基本相同，区别在于const声明变量时，必须同时初始化变量，并且当尝试修改const声明的变量会导致运行时错误。
```javascript
const age = 26;
age = 36; // TypeError: 给常量赋值
```
但是需要注意的是，const变量限制的只是它指向的变量的引用。如const声明一个对象，然后修改对象中的属性，不违反const的限制。
```javascript
const person = {};
person.name = 'zmbxy'; // ok √
```
类似的，const变量不能用来声明迭代变量，原因很简单，迭代变量是会被改变的，当然，如果声明一个不会被修改的迭代变量，也是OK的（如在for...in，for...of中声明循环变量）。
- 与let一样，const不允许重复声明
- 与let相同，const声明的作用域是块
### 总结
ECMAScript2015中新增加的let和const变量，从某种程度上来说，解决了var声明造成的各种怪异的行为而导致的问题。
在实际使用中，应当遵循如下规则较好：
- 不适用var
- const优先，let次之