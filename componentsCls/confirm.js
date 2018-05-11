// import { getUUID } from '../util'
/**
 * [全局alert组件]
 * @type {[type]}
 */
export default class Confirm {
    constructor({ message = '这是一条警告信息', title = '提示' }) {
        this.message = message
        this.title = title
        this.fn = null
    }
    createTmpl() {
        return `
            <div class="df-confirm">
                <div class="df-confirm__header">
                    <h2 class="df-confirm__title">${this.title}</h2>
                    <i class="df-confirm__icon icon-times df-confirm__close"></i>
                </div>
                <div class="df-confirm__body">
                    <p class="df-confirm__text">${this.message}</p>
                </div>
                <div class="df-confirm__buttonGroup">
                    <button type="button" class="df-button df-button__primary df-confirm__submit">确定</button>
                    <button type="button" class="df-button df-confirm__close">取消</button>
                </div>
            </div>
        `
    }
    // mounted
    mount() {
        let html = this.createTmpl()
        let wrapper = document.createElement('div')
        wrapper.classList.add('df-confirm__wrapper', 'df-confirm__wrapperBg')
        wrapper.style['z-index'] = 200
        // wrapper.id = `confirm${getUUID()}`
        wrapper.innerHTML = html
        document.body.appendChild(wrapper)
        // 绑定close事件
        let btn = document.querySelectorAll('.df-confirm__close')
        btn.forEach(n => {
            n.addEventListener('click', this.close, false)
        })
        // 绑定确定事件
        let sub = document.querySelectorAll('.df-confirm__submit')
        sub.forEach(n => {
            n.addEventListener('click', () => {
                if (this.fn) this.fn()
                this.close()
            })
        })
    }
    // 可以传入确认按钮回调
    open(msg, title, fn) {
        if (msg) this.message = msg
        if (title) this.title = title
        if (fn && typeof fn === 'function') this.fn = fn
        this.mount()
    }
    // destory
    close() {
        if (!document.querySelector(`.df-confirm__wrapper`)) return
        let nodes = document.querySelectorAll(`.df-confirm__wrapper`);
        let inner = document.querySelector(`.df-confirm`);
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
