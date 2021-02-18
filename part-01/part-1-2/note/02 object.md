## 增强的对象语法
### 属性值简写
开发过程中常遇到对象属性名与变量名相同的情况，如：
```javascript
let name = 'Jack';

let person = {
    name: name
}

console.log(person); // { name: 'Jack' }
```
为此，简写属性名语法出现了。简写属性名只要使用变量名就会自动被解释为同名的属性键。如果没有找到同名变量，则会抛出ReferenceError。简写如下：
```javascript
let name = 'Jack';

let person = {
    name
}

console.log(person); // { name: 'Jack' }
```
### 可计算属性
引入计算属性之前，如果想使用变量的值作为属性，使用的是对象索引的方式完成动态属性赋值。
```javascript
const nameKey = 'name';
const ageKey = 'age';
const jobKey = 'job';

let person = {};
person[nameKey] = 'Matt';
person[ageKey] = 27;
person[jobKey] = 'Software engineer';
console.log(person); // { name: 'Matt', age: 27, job: 'Software engineer' }
```
使用计算属性，就可以在对象字面量中完成动态属性赋值。
```javascript
const nameKey = 'name';
const ageKey = 'age';
const jobKey = 'job';
let person = {
[nameKey]: 'Matt',
[ageKey]: 27,
[jobKey]: 'Software engineer'
};
console.log(person); // { name: 'Matt', age: 27, job: 'Software engineer' }
```
需要注意的是，可计算属性表达式中抛出任何错误都会终端对象创建。
### 简写方法名
```javascript
// 常规写法
let person = {
    sayName: function(name) {
        console.log(`My name is ${name}`);
    }
};
person.sayName('Matt'); // My name is Matt

// 简写
let person = {
    sayName(name) {
        console.log(`My name is ${name}`);
    }
};
person.sayName('Matt'); // My name is Matt
```
简写方法名与可计算属性键相互兼容。
```javascript
const methodKey = 'sayName';
let person = {
    [methodKey](name) {
        console.log(`My name is ${name}`);
    }
}
person.sayName('Matt'); // My name is Matt
```
## 对象合并
- `Object.assign()`方法，接收一个目标对象和一个或多个源对象作为参数。
- 然后将每个源对象中可枚举(Object.propertyIsEnumerable()返回true)和自有(Object.hasOwnProperyu()返回true)属性赋值到目标对象。
- 以字符串和符号为关键的属性会被复制。
- 对每个符合条件的属性，使用源对象上的`[[Get]]`取得属性的值。
- 然后使用目标对象上的`[[Set]]`设置属性的值。
```javascript
let dest, src, result;
/**
* 简单复制
*/
dest = {};
src = { id: 'src' };
result = Object.assign(dest, src);
// Object.assign 修改目标对象
// 也会返回修改后的目标对象
console.log(dest === result); // true
console.log(dest !== src); // true
console.log(result); // { id: src }
console.log(dest); // { id: src }
```
- `Object.assign()`实际上对每个源对象执行的是浅复制。如果多个源对象中都有相同的属性，则使用最后一个复制的值。
- 如果赋值期间出错，则操作中止并退出，同时抛出抛出错误。
- `Object.assign()`没有“回滚”之前赋值的概念，它是一个尽力而为、可能只会完成部分赋值的方法。
```javascript
let dest, src, result;
dest = {};
src = {
  a: 'foo',
  get b() {
    // Object.assign()在调用这个获取函数时会抛出错误
    throw new Error();
  },
  c: 'bar'
};
try {
  Object.assign(dest, src);
} catch (e) { }
// Object.assign()没办法回滚已经完成的修改
// 因此在抛出错误之前，目标对象上已经完成的修改会继续存在：
console.log(dest); // { a: foo }
```
## 对象标识及相等判定
在ECMAScript2015之前，有些特殊情况即使是`===`操作符也无能为力的：
```javascript
// 这些是===符合预期的情况
console.log(true === 1); // false
console.log({} === {}); // false
console.log("2" === 2); // false
// 这些情况在不同 JavaScript 引擎中表现不同，但仍被认为相等
console.log(+0 === -0); // true
console.log(+0 === 0); // true
console.log(-0 === 0); // true
// 要确定 NaN 的相等性，必须使用极为讨厌的 isNaN()
console.log(NaN === NaN); // false
console.log(isNaN(NaN)); // true
```
ECMAScript2015为解决上述问题，新增`Object.is()`，与`===`很像，但也考虑了上述边界清醒。
```javascript
console.log(Object.is(true, 1)); // false
console.log(Object.is({}, {})); // false
console.log(Object.is("2", 2)); // false
// 正确的 0、-0、+0 相等/不等判定
console.log(Object.is(+0, -0)); // false
console.log(Object.is(+0, 0)); // true
console.log(Object.is(-0, 0)); // false
// 正确的 NaN 相等判定
console.log(Object.is(NaN, NaN)); // true
// 要检查超过两个值，递归地利用相等性传递即可：
function recursivelyCheckEqual(x, ...rest) {
    return Object.is(x, rest[0]) &&
        (rest.length < 2 || recursivelyCheckEqual(...rest));
}
```
## 对象解构
对象解构就是使用与对象匹配的结构来实现对象属性赋值。
常规不使用对象解构：
```javascript
// 不使用对象解构
let person = {
    name: 'Matt',
    age: 27
};

let personName = person.name;
let personAge = person.age;
console.log(personName); // Matt
console.log(personAge); // 27
```
使用对象解构
```javascript
// 使用对象解构
let person = {
    name: 'Matt',
    age: 27
};
let { name: personName, age: personAge } = person;
console.log(personName); // Matt
console.log(personAge); // 27
```
使用解构，可以在一个类似对象字面量的结构中，声明多个变量，同时执行多个赋值操作。如果想让变量直接使用属性的名称，那么可以使用简写语法。
```javascript
let person = {
    name: 'Matt',
    age: 27
};
let { name, age } = person;
console.log(name); // Matt
console.log(age); // 27
```
解构赋值不一定与对象的属性匹配。赋值的时候可以忽略某些属性，而如果引用的属性不存在，则该变量的值就是 undefined。
```javascript
let person = {
    name: 'Matt',
    age: 27
};
let { name, job } = person;
console.log(name); // Matt
console.log(job); // undefined
```
也可以在解构赋值的同时定义默认值，这适用于前面刚提到的引用的属性不存在于源对象中的情况
```javascript
let person = {
    name: 'Matt',
    age: 27
};
let { name, job='Software engineer' } = person;
console.log(name); // Matt
console.log(job); // Software engineer
```
在使用过程中，需要注意的是解构操作在内部使用函数`ToObject()`(不能再运行时环境中直接访问)把数据解构转换为对象。这意味着再对象解构的上下文中，原始值会被当成对象。这也意味着(根据`ToObject()`的定义)，`null`和`undefind`不能被解构，否则会抛出错误。
```javascript
let { length } = 'foobar';
console.log(length); // 6

let { constructor: c } = 4;
console.log(c === Number); // true

let { _ } = null; // TypeError
let { _ } = undefined; // TypeError
```
解构并不要求变量必须在解构表达式中声明。不过，如果是给事先声明的变量赋值，则赋值表达式
必须包含在一对括号中。
```javascript
let personName, personAge;
let person = {
    name: 'Matt',
    age: 27
};
({name: personName, age: personAge} = person);
console.log(personName, personAge); // Matt, 27
```
### 嵌套解构
```javascript
let person = {
  name: 'Join',
  age: 18,
  job: {
    title: '前端开发'
  }
}

let { job: { title } } = person; // 声明 title 变量并将 person.job.title 的值赋给它

console.log(title);
```
### 部分解构
涉及多个属性的解构赋值是一个输出无关的顺序化操作。如果一个解构表达式涉及多个赋值，开始的赋值成功而后面的赋值出错，则整个解构赋值只会完成一部分。这一点与`Object.assign()`有点类似。
```javascript
let person = {
  name: 'Matt',
  age: 27
};
let personName, personBar, personAge;
try {
  // person.foo 是 undefined，因此会抛出错误
  ({ name: personName, foo: { bar: personBar }, age: personAge } = person);
} catch (e) { }
console.log(personName, personBar, personAge);
  // Matt, undefined, undefined
```
### 参数上下文匹配
在函数参数列表中也可以进行解构赋值。对参数的解构赋值不会影响 arguments 对象，但可以在函数签名中声明在函数体内使用局部变量。
```javascript
let person = {
  name: 'Matt',
  age: 27
};
function printPerson(foo, { name, age }, bar) {
  console.log(arguments);
  console.log(name, age);
}
function printPerson2(foo, { name: personName, age: personAge }, bar) {
  console.log(arguments);
  console.log(personName, personAge);
}
printPerson('1st', person, '2nd');
// ['1st', { name: 'Matt', age: 27 }, '2nd']
// 'Matt', 27
printPerson2('1st', person, '2nd');
// ['1st', { name: 'Matt', age: 27 }, '2nd']
// 'Matt', 27
```