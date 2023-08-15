#ES6
ECMAScript6.0是 JS 语言的下一代标准，使得 JS 语言可以用来编写复杂的大型应用程序，成为开发级语言
ES 6 阮一峰教程： http://es6.ruanyifeng.com
MDN 教程： https://developer.mozilla.org/zh-CN/docs/Web/JavaScript
# 1. let 和 const 命令
Let
1. let 声明变量，没有变量提升
2. 是一个块作用域
3. 不能重复声明
Const
1. 没有变量提升
2. 是一个块作用域
3. 不能重复声明
4. 一旦被声明，无法修改
**在默认情况下用 const，只有在知道变量值需要被修改的情况下用 let**

# 2. se 6 的模板字符串
```JavaScript
<div class="box">

</div>

<script>
	const oBox = document.querySelector('.box');
	let id = 1,
	name = 'hello world';
	let htmlStr = `<ul>
			<li>
				<p id=${id}>${name}</p>
			</li>
		</ul>`;
	oBox.innerHTML = htmlStr;
</script>
```

# 3. 增强的函数
```JavaScript
//1. 带参数默认值的函数
//当没给ab赋值时，a为10，b为20

function add(a = 10, b = 20) {
	return a + b;
}

//2. 默认的表达式也可以是一个函数
function add(a, b = getVal(5)) {
	return a + b;
}

function getVal(val) {
	return val + 5;
}
console.log(add(5));

//3. 剩余参数
function pick(obj, ...keys) {
	let result = Object.create(null);
	for(let i = 0; i < keys.length; i++) {
		result[keys[i]] = obj[keys[i]];
	}
	return result;
}
let book = {
	title:'ES6',
	author:'Hello world',
	year:2023
}
let bookData = pick(book, 'title', 'author', 'year');
console.log(bookData);

//4.扩展运算符
//处理数组中的最大值
const arr = [10, 20, 50, 30, 90, 100, 40];
console.log(Math.max(...arr));

//5. es6的箭头函数 =>
//function(){}等价于 ()=>{}
//两个值
let add1 = (a, b)=>{
	return a + b;
}
//一个值
let add2 = c=>(c + 5)
//this指向：取决于调用该函数的上下文对象
let PageHandle = {
	id: 123,
	init: function() {
		//箭头函数没有this指向，箭头函数内部this值只能通过查找作用域链来确定
		document.addEventListener('click', (event)=>{
			console.log(this);
			this.doSomeThings(event.type);
		}, false)
	},
	doSomeThings: function(type){
		console.log(`事件类型:${type},当前id:${this.id}`);
	}
}
PageHandle.init();
//使用箭头函数，内部没有arguments
//箭头函数不能用new关键字来实例化对象
```

# 4. 解构赋值
对赋值运算符的一种拓展
针对数组和对象
```JavaScript
//对对象的解构
let node = {
	type: 'iden',
	name: 'foo',
	c: []
}
let {...res} = node;
console.log(res);

//对数组的解构
let arr = [1, 2, 3];
let [a, b, c] = arr;
console.log(a, b, c);
```

# 5. 扩展对象功能
## 5.1 对象
```JavaScript
//直接写入变量和函数，作为对象的属性和方法，只有属性名一样的时候才行
const name = '林克',
		 age = 10;
const person = {
	name,
	age,
	sayName(){
		console.log(this.name);
	}
}
person.sayName();
```
## 5.2 数组
```JavaScript
//from()讲伪数组转换成真正的数组
function add() {
	let arr = Array.from(arguments);
	console.log(arr);
}
add(1, 2, 3);

//of()将一组的值，转换成数组
Array.of(1, 2, [1, 2, 3], {id:'1'});

//copywithin()
//把3号位开始的数值，替换0号位开始的数值
[1, 2, 3, 8, 9, 10].copyWithin(0, 3);

//find() findIndex()
let num = [1, -2, 3, 8, 9, 10].find(n => n < 0)
console.log(num);
```

# 6. Symbol
原始数据类型，表示独一无二的值
```JavaScript
//这两个变量独一无二，存储在不同的位置
//最大用途：用来定义对象的私有变量
const name = Symbol('name');
const name2 = Symbol('name');
```

# 7.  Set和 Map
set
```JavaScript
//集合：表示无重复值的有序列表
let set = new Set();
set.add(2);
set.add('2');
set.add(2);
console.log(set);
//在set中对象是无法被释放的,可以用WeakSet解决（一部分）
```

# 8. 迭代器和生成器
```JavaScript
//迭代器一种新的遍历机制
//1. 是一个能快捷访问数据的接口
//通过Symbol.iterator来创建迭代器
//通过next()方法获取迭代之后的结果
//2.迭代器是用于遍历数据结构的指针
const items = ['one', 'two', 'three'];
const its = items[Symbol.iterator]();
console.log(ite.next());//one
console.log(ite.next());//two
console.log(ite.next());//three
console.log(ite.next());

//生成器
//1. function后面函数名之前有个*
//2. 只能在函数内部使用yield表达式，让函数挂起
function* func() {
	yield 2;
}
func();
```

# 9. Promise 对象
```JavaScript
//相当于容器，保存着未来才会结束的事件（异步操作）的一个结果
//各种异步操作都可以用同样的方法进行处理
//特点：
//1. 对象的状态不受外界影响
//2. 一旦改变状态，就不会再变
const p = new Promise(function(resolve, reject){
	setTimeout(function(){
		//1.调用resolve
		// let data = '数据库中的用户数据';
		// resolve(data);
		//2.调用reject
		let err = '数据读取失败';
		reject(err);
	}, 1000);
});

p.then(function(value){
	console.log(value);
}, function(reason){
	console.error(reason);
})
```

# 10. async 的用法
```JavaScript
//使得异步操作更加方便
//基本操作 async会返回一个Promise对象
async function f(){
	//如果有多个await，那么then函数会等待所有的await指令运行完成才执行
	let s = await 'hello';
	let data = await s.split('');
	return data;
}
f().then(v=>{console.log(v)}).catch(e=>console.log(e));

async function f2() {
	throw new Error('出错了');
}
f2().then(v=>{console.log(v)}).catch(e=>console.log(e));
```
# 11. 类 class
```JavaScript
class Person{
	//实例化的时候会立即被调用
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}
	sayName(){	
		return this.name
	}
	sayAge(){
		return this.age
	}
}
let p1 = new Person('林克', 100);
console.log(p1);

//类的继承
class Animal{
	constructor(name, age){
		this.name = name;
		this.age = age;
	}
	sayName(){
		return this.name
	}
	sayAge(){
		return this.age
	}
}
class Dog extends Animal{
	constructor(name, age, color){
		super(name, age);
		this.color = color;
	}
	sayColor(){
		return `${this.name}是${this.age}岁了，它的颜色是${this.color}`;
	}
}
let d = new Dog('小黄', 5, '红色');
console.log(d.sayColor());
```

# 12. 模块化实现
```JavaScript
//es6模块功能主要有两个命令构成：export和import
//export用于规定模块的对外接口
//import用于输入其他模块提供的功能
export const name = '林克';
export function sayName(){
	return `我的名字是${name}`;
}

class Person{
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}
	sayName(){
		return this.name
	}
	sayAge(){
		return this.age
	}
}
export default Person
```
```JavaScript
//moudle
import Person, {name, sayName} from './moudles/index.js'
console.log(name);
console.log(sayName());
const p = new Person('张三', 20);
console.log(p.sayAge());
```