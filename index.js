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