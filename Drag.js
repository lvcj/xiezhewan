class Drag {
    constructor(el) {
        this.el = el
        // 拖拽信息
        this.mouse = {}
        this.mouse.init = false
        this.init()
        this.initDrag()
    }

    //绝对定位初始化
    init() {
        this.el.style.position = 'absolute'
        this.el.style.top = `${this.el.offsetTop}px`
        this.el.style.left = `${this.el.offsetLeft}px`
    }

    // 拖动初始化
    initDrag() {
        this.el.addEventListener('mousedown', e => {
            if (/input|textarea/.test(e.target.tagName.toLowerCase())) return
            this.mouse.init = true
            this.mouse.offsetX = e.pageX - this.el.offsetLeft
            this.mouse.offsetY = e.pageY - this.el.offsetTop
            // 建立一个函数引用，进行销毁
            this.moveHandler = this.move.bind(this)
            this.upHanler = this.up.bind(this)
            window.addEventListener('mousemove', this.moveHandler)
            window.addEventListener('mouseup', this.upHanler)
        })
    }
    // 拖动
    move(e) {
        if (!this.mouse.init) {
            return
        }
        this.el.style.left = e.pageX - this.mouse.offsetX  + 'px'
        this.el.style.top = e.pageY - this.mouse.offsetY + 'px'
    }
    // 松开
    up() {
        this.mouse.init = false
        console.log('ok')
        window.removeEventListener('mousemove', this.moveHandler)
        window.removeEventListener('mouseup', this.upHanler)
    }
}
