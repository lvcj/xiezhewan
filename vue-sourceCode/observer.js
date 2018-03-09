/**
 * 注：本学习笔记全部用ES6语法书写
 * 
 * =====vue相关=====
 * 在使用defineProperty方法定义新属性时（非修改旧属性），
 * 如果不指定，configurable, enumerable和writable特性的默认值都是false。
 * 
 * 数据属性
 *  [[Configurable]]: 表示能否通过delete删除属性，能否修改属性的特性，能否把属性改为访问器属性。默认值: true
 *  [[Enumerable]]: 表示能否通过for-in,Object.keys()迭代。默认值：true
 *  [[Writable]]: 表示能否修改属性的值。默认值: true
 *  [[Value]]: 表示属性的数据值。默认值: undefined
 * 
 * 访问器属性
 * [[Get]]: 在读取属性时调用的函数。默认值: undefined
 * [[Set]]: 在写入属性时调用的函数。默认值: undefined 
 * 
 * 
 * 参考链接：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
 */



class Observer {
    constructor(data) {
        this.data = data
        this.walk(data)
    }

    walk(obj) {
        let val
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                val = obj[key]
                if (typeof val === 'object') {
                    new Observer(val)
                }
                
                this.convert(key ,val)
            }
        }
    }

    convert(key, val) {
        Object.defineProperty(this.data, key, {
            enumerable: true,
            configurable: true,
            // writable: true,
            get() {
                console.log(`你访问了${key}`)
                return val
            },
            set(newVal) {
                console.log(`你设置了${key}`)
                console.log(`新的${key}的值=${newVal}`)
                if (newVal === val) return
                val = newVal
            }
        })
    }
}

let data = {
    user: {
        name: 'zz',
        age: '25'
    },
    address: {
        city: 'beijing'
    }
}

let app = new Observer(data)
