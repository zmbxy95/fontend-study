## 基本类型
### 布尔值
```typescript
let isDone: boolean = false;
```
### 数字
```typescript
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;
```
### 字符串
```typescript
// 可以用单引号或双引号表示字符串
let name: string = "bob";
name = "smith";
name = 'hahaha'

// 使用模板字符串
let name: string = `Gene`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ name }.`
```
### 数组
```typescript
// 可以在元素类型后面接上[]，表示由此类型元素组成的一个数组
let list: number[] = [1, 2, 3];

// 第二种方式是使用数组泛型，Array<元素类型>
let list: Array<number> = [1, 2, 3];
```
### 元组Tuple
元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。比如，你可以定义一对值分别为 string和number类型的元组
```typescript
// 声明元组
let x: [string, number];

// 初始化
x = ['hello', 10]; // OK
x = [10, 'hello']; // Error
```
### 枚举
enum类型是对JavaScript标准数据类型的一个补充。像C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。
```typescript
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

let colorName: string = Color[2]; // Blue
```
默认情况下，从0开始为元素编号。你也可以手动的指定成员的数值。例如，我们将上面的例子改成从 1开始编号：
```typescript
enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green;

let colorName: string = Color[2]; // Green
```
或者，全部都采用手动赋值：
```typescript
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;

let colorName: string = Color[4]; // Blue
```
### Any
Any我们可以理解为任意类型，对于TypeScript而言，标记为Any类型，意味着被标记为Any的变量，不会在编译阶段进行检查，而是直接通过。
```typescript
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

let list: any[] = [1, true, "free"];
list[1] = 100;
```
### Void
从某种程度上来讲，Void类型像是与Any类型相反，它表示没有任何类型。当以一个函数没有返回值时，你通常会见到返回值类型是void。
```typescript
function warnUser(): void {
    console.log("This is my warning message");
}
```
由于void类型只能赋予undefind和null，所以声明void类型变量没有什么大用。
### null和undefind
TypeScript里，undefined和null两者各自有自己的类型分别叫做undefined和null。和void相似，它们的本身的类型用处不是很大：
```typescript
let u: undefined = undefined;
let n: null = null;
```
默认情况下null和undefined是所有类型的子类型。就是说你可以把null和undefined赋值给number类型的变量。
然而，当你指定了`--strictNullChecks`标记，null和undefined只能赋值给void和它们各自。 这能避免 很多常见的问题。也许在某处你想传入一个string或null或undefined，你可以使用联合类型`string | null | undefined`。 再次说明，稍后我们会介绍联合类型。
### Object
object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。
```typescript
// object 类型是指除了原始类型以外的其它类型
const foo: object = function () {} // [] // {}

// 如果需要明确限制对象类型，则应该使用这种类型对象字面量的语法，或者是「接口」
const obj: { foo: number, bar: string } = { foo: 123, bar: 'string' }
```
### Never
never类型表示永远不存在的值的类型。例如，never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型；变量也可能是never类型，当它们被永不为真的类型保护所约束时。
never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。
```typescript
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}
```
## 更多，基本介绍，见Typescript文档