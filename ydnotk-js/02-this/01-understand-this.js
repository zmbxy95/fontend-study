// 任何足够先进的技术都和魔法无异。

// Q1：为什么要使用this?
// Q2：下面这段代码，如果不使用this, 如何实现?
// function identify() {
//     return this.name.toUpperCase();
// }

// function speak() {
//     var greeting = "Hello, I'm " + identify.call(this);
//     console.log(greeting);
// }

// var me = {
//     name: "kyle"
// };

// var you = {
//     name: "Reader"
// };

// identify.call(me);
// identify.call(you);

// speak.call(me);
// speak.call(you);

function foo(num) {
    console.log('foo: ' + num);
    this.count ++;
}

foo.count = 0;

var i;

for (i = 0; i < 10; i++) {
    if (i < 5) {
        foo(i);
    }
}

console.log(foo.count);