// import { getUUID } from '../util'
/**
 * [全局alert组件]
 * @type {[type]}
 */
export default class Alert {
    constructor({ message = '这是一条警告信息' }) {
        this.message = message
    }
    createTmpl() {
        return `
            <div class="df-alert">
                <div class="df-alert__header">
                    <h2 class="df-alert__title">警告</h2>
                    <i class="df-alert__icon icon-times df-alert__close"></i>
                </div>
                <p class="df-alert__text">${this.message}</p>
                <div class="df-alert__footer">
                </div>
            </div>
        `
    }
    // mounted
    mount() {
        let html = this.createTmpl()
        let wrapper = document.createElement('div')
        wrapper.classList.add('df-alert__wrapper', 'df-alert__wrapperBg')
        wrapper.style['z-index'] = 200
        // wrapper.id = `alert${getUUID()}`
        wrapper.innerHTML = html
        document.body.appendChild(wrapper)
        // 绑定close事件
        let btn = document.querySelector('.df-alert__close')
        btn.addEventListener('click', this.close, false)
    }
    open(msg) {
        if (msg) this.message = msg
        this.mount()
    }
    // destory
    close() {
        if (!document.querySelector(`.df-alert__wrapper`)) return
        let nodes = document.querySelectorAll(`.df-alert__wrapper`);
        let inner = document.querySelector(`.df-alert`);
        inner.style.transition = `all .2s`
        inner.style.opacity = 0
        inner.style.transform = `translate(-50%, -60%)`
        inner.addEventListener('transitionend', function(e) {
            if (e.propertyName === 'transform') {
                nodes.forEach(n => {
                    document.body.removeChild(n)
                })
            }
        }, false)
    }
}
