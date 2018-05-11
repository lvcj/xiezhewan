// import { getUUID } from '../util'
/**
 * [loading组件]
 * @type {[type]}
 */
class Loading {
    constructor({ message = '正在加载...' }) {
        this.message = message
        this.fontSize = 16
        this.type = 1
    }
    // loading动画样式
    loadingType() {
        let tpl = ''
        switch (this.type) {
            case 1:
                tpl = `<div class="self-building-square-spinner">
                            <div class="square"></div>
                            <div class="square"></div>
                            <div class="square"></div>
                            <div class="square clear"></div>
                            <div class="square"></div>
                            <div class="square"></div>
                            <div class="square clear"></div>
                            <div class="square"></div>
                            <div class="square"></div>
                        </div>`
                break;
            case 2:
                tpl = `<div class="df-loading__spinner">
                </div>`
                break
            case 3:
                tpl = `<div class="atom-spinner">
                            <div class="spinner-inner">
                            <div class="spinner-line"></div>
                            <div class="spinner-line"></div>
                            <div class="spinner-line"></div>
                            <!--Chrome renders little circles malformed :(-->
                            <div class="spinner-circle">
                                &#9679;
                            </div>
                            </div>
                        </div>`
                break
            default:
                break;
        }
        return tpl
    }
    createTmpl() {
        let loadtpl = this.loadingType()
        return `<div class="df-loading">
                    <div class="df-loading__inner">
                        ${loadtpl}
                        <div class="df-loading__text" style="font-size: ${this.fontSize}px">${this.message}</div>
                    </div>
                </div>`
    }
    // mounted
    mount() {
        let html = this.createTmpl()
        let wrapper = document.createElement('div')
        wrapper.className = 'df-loading__wrapper'
        // wrapper.id = `loading${getUUID()}`
        wrapper.innerHTML = html
        document.body.appendChild(wrapper)
    }
    open(msg, type) {
        this.message = msg
        if (type) this.type = type
        this.mount()
    }
    // destory
    close() {
        if (!document.querySelector(`.df-loading__wrapper`)) return
        let nodes = document.querySelectorAll(`.df-loading__wrapper`);
        nodes.forEach(n => {
            document.body.removeChild(n)
        })
    }
}
