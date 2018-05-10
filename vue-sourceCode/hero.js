/**
 * 关于依赖收集，希望一个属性变化时候，主动发起通知，不管是通知render函数还是通知计算属性
 * 依赖收集的target 就是存储，监听器里边的回调函数 onComputedUpdate(), 主要处理特点是，
 * 什么时候存放，依赖收集的，收集的就是回调函数吗？
 * 
 * 在监听器里定义一个 onDepUpdated() 方法，就是把回调函数的值和 onComputedUpdate()，打包到一块，
 * 赋值给收集器。作为全局变量，Dep.target理所当然的能够被可观测对象的getter/setter所使用。
 * 
 * 计算属性的回调函数中，
 * （） => hero.health > 4000 ? '坦克' : '脆皮'
 * 这里边有一个容易忽视的地方，就是 这里 访问了 health的 getter 方法，他执行了！！！！
 * 
 * 在定义可观测的对象方法里，先定义一个回调函数队列 deps = []，他负责存储所有的回调值和方法
 *  const deps = []
    Object.defineProperty(obj, key, {
        get () {
        if (Dep.target && deps.indexOf(Dep.target) === -1) {
            deps.push(Dep.target)
        }
        return val
        },
        set (newVal) {
        val = newVal
        deps.forEach((dep) => {
            dep()
        })
        }
    })
 * 当 getter 被触发时，就会往deps加一个回调方法， Dep.target等于监听器的onComputedUpdate()方法，
 * （这个过程在，watch的时候已经执行了）
 * 这个时候可观测对象已经和监听器捆绑到一块。任何时候当可观测对象的setter被触发时，
 * 就会调用数组中所保存的Dep.target方法，
 * 也就是自动触发监听器内部的onComputedUpdate()方法。
 * 
 * watch里边，执行cb()，就会访问 health ->此时health getter执行 -> 这个时候是有Dep.target的，
 * 把这个存在 deps 里边，这里是因为闭包的原因导致deps一直在吗 -> 这个回调已经被存起来的，就把
 * Dep.target 置为空 null
 * Object.defineProperty(obj, key, {
    get () {
      Dep.target = onDepUpdated
      // 执行cb()的过程中会用到Dep.target，
      // 当cb()执行完了就重置Dep.target为null
      const val = cb()
      Dep.target = null
      return val
    },
    set () {
      console.error('计算属性无法被赋值！')
    }
  })
 */

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
        configurable: true,
        enumerable: true,
        get () {
            // 触发getter
            if (Dep.target && deps.indexOf(Dep.target) === -1) {
                deps.push(Dep.target)
            }
            console.log(`我的${key}属性被读取了！`)
            return val
        },
        set (newVal) {
            if (newVal === val) return
            // 触发setter
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

/**
 * 观察也是一种object.defineProperty ，只是计算属性的回调是自己给定的
 */

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
