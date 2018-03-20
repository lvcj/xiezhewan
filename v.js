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
// 解析器
class Compile {
    constructor(el, vm) {
        this.vm = vm
        this.el = document.querySelector(el)
        this.fragment = null
        this.init()
    }
    init() {
        if (this.el) {
            this.fragment = this.nodeToFragment(this.el)
            this.compileElement(this.fragment)
            this.el.appendChild(this.fragment)
        } else {
            console.log('Dom元素不存在')
        }
    }
    nodeToFragment(el) {
        let fragment = document.createDocumentFragment()
        let child = el.firstChild
        while (child) {
            fragment.appendChild(child)
            child = el.firstChild
        }
        return fragment
    }
    compileElement(el) {
        let childNodes = el.childNodes
        Array.from(childNodes).forEach(node => {
            debugger
            let reg = /\{\{(.*)\}\}/
            let text = node.textContent
            if (this.isTextNode(node) && reg.test(text)) {
                this.compileText(node, reg.exec(text)[1])
            }
        })
    }
    compileText(node, exp) {
        let initText = this.vm[exp]
        this.updateText(node, initText)
        new Watcher(this.vm, exp, value => {
            this.updateText(node, value)
        })
    }
    updateText(node, value) {
        node.textContent = typeof value === 'undefined' ? '' : value
    }
    isTextNode(node) {
        return node.nodeType === 3
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
Dep.target = null

function observe(obj) {
    if (!obj || typeof obj !== 'object') return
    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key])
    })
}

class selfVue {
    constructor(options) {
        this.obj = options.obj
        Object.keys(this.obj).forEach(key => {
            this.proxyKeys(key)
        })
        observe(this.obj)
        new Compile(options.el, this.vm)
    }
    proxyKeys(key) {
        Object.defineProperty(this, key, {
            enumerable: false,
            configurable: true,
            get() {
                return this.obj[key]
            },
            set(newVal) {
                this.obj[key] = newVal
            }
        }) 
    }
}