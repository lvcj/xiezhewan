// import { getUUID } from '../util'
/**
 * [全局alert组件]
 * @type {[type]}
 */
export default class Alert {
    constructor({ message = '这是一条警告信息', type = 'info' }) {
        this.message = message
        this.typeIamge = require(`assets/images/${type}.svg`)
    }
    createTmpl() {
        return `
            <img src="${this.typeIamge}" class="df-message__image">
            <div class="df-message__group">
                <p>${this.message}</p>
                <a class="df-message__close">
                    <i class="df-message__close--icon fa icon-times"></i>
                </a>
            </div>
        `
    }
    // mounted
    mount() {
        let html = this.createTmpl()
        let wrapper = document.createElement('div')
        wrapper.classList.add('df-message')
        wrapper.style['z-index'] = 200
        // wrapper.id = `message${getUUID()}`
        wrapper.innerHTML = html
        document.body.appendChild(wrapper)
        wrapper.style.animation = `messageDrop  0.2s ease`
        // 绑定close事件
        let btn = document.querySelectorAll('.df-message__close')
        btn.forEach(n => {
            n.addEventListener('click', () => {
                this.close()
            }, false)
        })
    }
    open(msg, type) {
        if (msg) this.message = msg
        if (type) this.typeIamge = require(`assets/images/${type}.svg`)
        this.mount()
    }
    // destory
    close() {
        if (!document.querySelector(`.df-message`)) return
        let nodes = document.querySelectorAll(`.df-message`)
        nodes.forEach(n => {
            n.style.transition = `all .2s`
            n.style.opacity = 0
            n.style.transform = `translate(-50%, -60%)`
            n.addEventListener('transitionend', function(e) {
                if (e.propertyName === 'transform') {
                    nodes.forEach(n => {
                        document.body.removeChild(n)
                    })
                }
            }, false)
        })
    }
}
