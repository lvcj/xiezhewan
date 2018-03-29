class Dep {
    constructor() {
        this.deps = []
    }

    depend() {
        if (Dep.target && !this.deps.includes(Dep)) {
            this.deps.push(Dep.target)
        }
    }

    notify() {
        this.deps.forEach(dep => {
            dep()
        })
    }
}

Dep.target = null

class Observable {
    constructor(obj) {
        return this.walk(obj)
    }

    walk(obj) {
        const keys = Object.keys(obj)
        keys.forEach((key) => {
            this.defineReactive(obj, key, obj[key])
        })
        // 把包装好的对象返回出去
        return obj
    }

    defineReactive(obj, key, val) {
        const dep = new Dep()
        Object.defineProperty(obj, key, {
            get() {
                dep.depend()
                return val
            },
            set(newVal) {
                val = newVal
                dep.notify()
            }
        })
    }
}

class Watcher {
    constructor(obj, key, cb, onComputedUpdate) {
        this.obj = obj
        this.key = key
        this.cb = cb
        this.onComputedUpdate = onComputedUpdate
        return this.defineComputed()
    }

    defineComputed () {
        const self = this
        const onDepUpdated = () => {
            const val = self.cb()
            this.onComputedUpdate(val)
        }
    
        Object.defineProperty(self.obj, self.key, {
            get () {
                Dep.target = onDepUpdated
                const val = self.cb()
                Dep.target = null
                return val
            },
            set () {
                console.error('计算属性无法被赋值！')
            }
        })
    }
}

const hero = new Observable({
    health: 3000,
    IQ: 150
})
  
new Watcher(hero, 'type', () => {
    return hero.health > 4000 ? '坦克' : '脆皮'
}, (val) => {
    console.log(`我的类型是：${val}`)
})

console.log(`英雄初始类型：${hero.type}`)

hero.health = 5000
