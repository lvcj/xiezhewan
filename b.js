var foo = 1
function bar() {
    foo = 10
    return;
    function foo() {
    }
}
bar()
alert(foo)
// 生成随机索引
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
// 混乱数组
export function shuffle(arr) {
    let _arr = arr.slice()
    for (let i = 0; i < _arr.length; i++) {
        let j = getRandomInt(0, i)
        let t = _arr[i]
        _arr[i] = _arr[j]
        _arr[j] = t
    }
    return _arr
}
//防抖
export function debounce(func, delay) {
    let timer
    return function (...args) {
        if (timer) {
        clearTimeout(timer)
    }
    timer = setTimeout(() => {
        func.apply(this, args)
        }, delay)
    }
}
//

let pubsub = {}

function Observer(q) {
    let topics = {}
    let subUid = -1

    // 发布方法
    q.publish = function (topic, args) {
        if (!topics[topic]) return false

        setTimeout(() => {
            let subscribers = topics[topic]
            let len = subscribers? subscribers.length : 0
            while (len--) {
                subscribers[len].fn(topic, args)
            }
        }, 0);
    }

    // 订阅方法
    q.subscribe = function (topic, fn) {
        if (!topics[topic]) topics[topic] = []

        let token = (++subUid).toString()

        topics[topic].push({
            token,
            fn
        })
        return token
    }

    q.unsubscribe = function (token) {
        for(let m in topics) {
            if (topics[m]) {
                for (let i = 0; i < topics[m].length; i++) {
                    if (topics[m][i].token === token) {
                        topics[m].splice(i, 1)
                        return token
                    }
                }
            }
        }
        return false
    }
}

// 原型观察模式
function ObserverProto () {
    this.fns = []
}

let _pro = {
    subscribe(fn) {
        this.fns.push(fn)
    },
    unsubscribe(fn) {
        this.fns = this.fns.filter(el => {
            if (el !== fn) {
                return el
            }
        })
    },
    update(o, thisObj) {
        let scope = thisObj || window
        this.fns.forEach(el => {
            el.call(scope, o)
        })
    }
}

Object.assign(ObserverProto.prototype, _pro)

// Class

class ObserverCls {
    constructor() {
        this.fns = []
    }

    subscribe(fn) {
        this.fns.push(fn)
    }

    unsubscribe(fn) {
        this.fns = this.fns.filter(el => {
            if (el !== fn) {
                return el
            }
        })
    }

    update(o) {
        this.fns.forEach(el => {
            el(o)
        })
    }
}