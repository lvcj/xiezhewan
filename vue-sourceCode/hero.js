const Dep = {
    target: null
}

/**
 * 使一个对象转化成可观测对象
 * @param { Object } obj 对象
 * @param { String } key 对象的key
 * @param { Any } val 对象的某个key的值
 */
function defineReactive (obj, key, val) {
    const deps = []
    Object.defineProperty(obj, key, {
        get () {
            // 触发getter
            console.log(Dep.target)
            console.log(deps)
            if (Dep.target && deps.indexOf(Dep.target) === -1) {
                deps.push(Dep.target)
            }
            console.log(Dep.target)
            console.log(deps)
            console.log(`我的${key}属性被读取了！`)
            return val
        },
        set (newVal) {
            if (newVal === val) return
            // 触发setter
            console.log(`我的${key}属性被修改了！`)
            console.log(Dep.target)
            val = newVal
            deps.forEach(dep => {
                dep()
            })
        }
    })
}
  
/**
 * 把一个对象的每一项都转化成可观测对象
 * @param { Object } obj 对象
 */
function observable (obj) {
    const keys = Object.keys(obj)
    keys.forEach((key) => {
        defineReactive(obj, key, obj[key])
    })
    return obj
}

function onComputedUpdate(val) {
    console.log(`我的类型是：${val}`)
}

function watcher(obj, key, cb) {
    const onDepUpdated = () => {
        const val = cb()
        onComputedUpdate(val)
    }

    Object.defineProperty(obj, key, {
        get() {
            Dep.target = onDepUpdated
            const val = cb()
            Dep.target = null
            return val
        },
        set() {
        }
    })
}
const hero = observable({
    health: 3000,
    iq: 150
})
watcher(hero, 'type', () => {
    return hero.health > 4000 ? '坦克' : '脆皮'
})

console.log(`英雄初始类型：${hero.type}`)
console.log(Dep.target)
