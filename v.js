// 订阅器
class Dep {
    constructor() {
        this.subs = []
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    notify() {
        this.subs.forEach(sub =>{
            sub.update()
        })
    }
}

// 监听器

class Watcher{
    constructor(vm, exp, cb) {
        this.cb = cb
        this.vm = vm
        this.exp = exp
        this.value = this.get()
    }
    update() {
        this.run()
    }
    run() {
        let value = this.vm.obj[this.exp]
        let oldVal = this.value
        if (value !== oldVal) {
            this.value = value
            this.cb.call(this.vm, value, oldVal)
        }
    }
    get() {
        Dep.target = this
        let value = this.vm.obj[this.exp]
        Dep.target = null
        return value
    }
}

function defineReactive(obj, key, val) {
    // 遍历所有属性
    observe(val)
    var dep = new Dep()
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            if (Dep.target) {
                dep.addSub(Dep.target)
            }
            return val
        },
        set: function(newVal) {
            val = newVal
            console.log(`${key}:${val.toString()}已监听`)
            dep.notify()
        }
    })
}
// Dep.target = null

function observe(obj) {
    if (!obj || typeof obj !== 'object') return
    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key])
    })
}

class selfVue {
    constructor(obj, el, exp) {
        this.obj = obj
        observe(obj)
        el.innerHTML = this.obj[exp]
        new Watcher(this, exp, value => el.innerHTML = value)
    }
}