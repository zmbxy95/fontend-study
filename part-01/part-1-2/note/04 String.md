## 模板字符串
### 基本使用
```javascript
// 基本使用, 使用反引号包裹内容
const str1 = `hello string`;

// 换行，换行在定义HTML模板时特别有用
const str2 = 
`hello
word`;
```
### 字符串插值
字符串插值通过在${}中使用一个JavaScript表达式实现。
```javascript
let value = 5;
let str = 'second';

// 不适用模板字符串
let str1 = value + ' --- ' + str;
// 使用模板字符串
let str2 = `${value} --- ${str}`;
```
${}中的表达式可以是任何JavaScript表达式。
### 标签函数
模板字面量也支持定义标签函数（tag function），而通过标签函数可以自定义插值行为。标签函数
会接收被插值记号分隔后的模板和对每个表达式求值的结果。
模板字符串的标签函数，本质上仍然是一个函数，使用这个标签，也就是在调用这个函数。
```javascript
const name = 'tom'
const gender = false

function myTagFunc (strings, name, gender) {
  // console.log(strings, name, gender)
  // return '123'
  const sex = gender ? 'man' : 'woman'
  return strings[0] + name + strings[1] + sex + strings[2]
}

const result = myTagFunc`hey, ${name} is a ${gender}.`

console.log(result)
```
## 扩展方法
- `startsWith`：字符串以...开头
- `endsWith`：字符串以...结尾