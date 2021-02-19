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
- 类的示例成员属于类私有属性，不会在原型上共享。
```javascript
class Person {
  constructor() {
    // 这个例子先使用对象包装类型定义一个字符串
    // 为的是在下面测试两个对象的相等性
    this.name = new String('Jack');
    this.sayName = () => console.log(this.name);
    this.nicknames = ['Jake', 'J-Dog']
  }
}

let p1 = new Person(),
  p2 = new Person();

p1.sayName(); // Jack
p2.sayName(); // Jack

console.log(p1.name === p2.name); // false
console.log(p1.sayName === p2.sayName); // false
console.log(p1.nicknames === p2.nicknames); // false

p1.name = p1.nicknames[0];
p2.name = p2.nicknames[1];
p1.sayName(); // Jake
p2.sayName(); // J-Dog
```
- 类方法为原型方法，实例间可共享。
```javascript
class Person {
    constructor() {
        // 添加到 this 的所有内容都会存在于不同的实例上
        this.locate = () => console.log('instance');
    }
    // 在类块中定义的所有内容都会定义在类的原型上
    locate() {
        console.log('prototype');
    }
}

let p = new Person();
p.locate(); // instance
Person.prototype.locate(); // prototype
```
- 类方法同样支持get和set访问器，语法行为与普通对象一致。
```javascript
class Person {
    set name(newName) {
        this.name_ = newName;
    }
    
    get name() {
        return this.name_;
    }
}

let p = new Person();
p.name = 'Jake';
console.log(p.name); // Jake
```
- 可以在类上定义静态方法。
静态方法常用于执行不特定于实例的操作，也不要求存在类的实例。
```javascript
class Person {
    constructor (name) {
        this.name = name
    }

    say () {
        console.log(`hi, my name is ${this.name}`)
    }

    static create (name) {
        return new Person(name)
    }
}

const tom = Person.create('tom')
tom.say() // hi, my name is tom
```
- 类定义语法支持在原型和类本身上定义生成器方法。
```javascript
class Person {
    // 在原型上定义生成器方法
    * createNicknameIterator() {
        yield 'Jack';
        yield 'Jake';
        yield 'J-Dog';
    }
    // 在类上定义生成器方法
    static * createJobIterator() {
        yield 'Butcher';
        yield 'Baker';
        yield 'Candlestick maker';
    }
}

let jobIter = Person.createJobIterator();
console.log(jobIter.next().value); // Butcher
console.log(jobIter.next().value); // Baker
console.log(jobIter.next().value); // Candlestick maker

let p = new Person();
let nicknameIter = p.createNicknameIterator();
console.log(nicknameIter.next().value); // Jack
console.log(nicknameIter.next().value); // Jake
console.log(nicknameIter.next().value); // J-Dog
```
- 类支持迭代器函数
```javascript
class Person {
    constructor() {
        this.nicknames = ['Jack', 'Jake', 'J-Dog'];
    }

    [Symbol.iterator]() {
        return this.nicknames.entries();
    }
}

let p = new Person();
for (let [idx, nickname] of p) {
    console.log(nickname);
}
// Jack
// Jake
// J-Dog
```
## 继承
- ES2015支持单继承。类继承通过`extends`关键字。
```javascript
class Vehicle {}
// 继承类
class Bus extends Vehicle {}

let b = new Bus();
console.log(b instanceof Bus); // true
console.log(b instanceof Vehicle); // true
```
- 派生类的方法可以通过`super`关键字引用它们的原型。
该关键字只能在派生类中使用，并且仅限于构造函数、实例方法和静态方法内部。
```javascript
class Vehicle {
    constructor() {
        this.hasEngine = true;
    }

    static identify() {
        console.log('vehicle');
    }
}

class Bus extends Vehicle {
    constructor() {
        // 不要在调用 super()之前引用 this，否则会抛出 ReferenceError
        super(); // 相当于 super.constructor()
        console.log(this instanceof Vehicle); // true
        console.log(this); // Bus { hasEngine: true }
    }

    static identify() {
        super.identify();
    }
}

let bus = new Bus();
Bus.identify(); // vehicle
```
- 通过`new.target`实现抽象基类。
`new.target`会保存`new`关键字调用的类或函数。通过在实例化时检测`new.target`是不是抽象基类，可以阻止抽象基类的实例化：
```javascript
// 抽象基类
class Vehicle {
    constructor() {
        console.log(new.target);
        if (new.target === Vehicle) {
            throw new Error('Vehicle cannot be directly instantiated');
        }
    }
}
// 派生类
class Bus extends Vehicle { }
new Bus(); // class Bus {}
new Vehicle(); // class Vehicle {}
// Error: Vehicle cannot be directly instantiated
```
也可以通过在抽象基类构造函数中进行检查，要求派生类必须定义某个方法。
```javascript
// 抽象基类
class Vehicle {
    constructor() {
        if (new.target === Vehicle) {
            throw new Error('Vehicle cannot be directly instantiated');
        }
        if (!this.foo) {
            throw new Error('Inheriting class must define foo()');
        }
        console.log('success!');
    }
}
// 派生类
class Bus extends Vehicle {
    foo() { }
}
// 派生类
class Van extends Vehicle { }
new Bus(); // success!
new Van(); // Error: Inheriting class must define foo()
```
- 类继承可以通过继承内置引用类型进行扩展。
```javascript
class SuperArray extends Array {
    shuffle() {
        // 洗牌算法
        for (let i = this.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this[i], this[j]] = [this[j], this[i]];
        }
    }
}

let a = new SuperArray(1, 2, 3, 4, 5);
console.log(a instanceof Array); // true
console.log(a instanceof SuperArray); // true
console.log(a); // [1, 2, 3, 4, 5]

a.shuffle();
console.log(a); // [3, 1, 4, 5, 2]
```
有些内置类型的方法会返回新实例。默认情况下，返回实例的类型与原始实例的类型是一致的：
```javascript
class SuperArray extends Array { }
let a1 = new SuperArray(1, 2, 3, 4, 5);
let a2 = a1.filter(x => !!(x % 2))
console.log(a1); // [1, 2, 3, 4, 5]
console.log(a2); // [1, 3, 5]
console.log(a1 instanceof SuperArray); // true
console.log(a2 instanceof SuperArray); // true
```
如果想覆盖这个默认行为，则可以覆盖 Symbol.species 访问器，这个访问器决定在创建返回的实例时使用的类：
```javascript
class SuperArray extends Array {
    static get [Symbol.species]() {
        return Array;
    }
}
let a1 = new SuperArray(1, 2, 3, 4, 5);
let a2 = a1.filter(x => !!(x % 2))
console.log(a1); // [1, 2, 3, 4, 5]
console.log(a2); // [1, 3, 5]
console.log(a1 instanceof SuperArray); // true
console.log(a2 instanceof SuperArray); // false
```