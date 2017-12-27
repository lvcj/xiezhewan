<script>
/**
 * 底层拖拽类
 * @author yelingfeng
 */
import Component from 'vue-class-component'
import { config } from './prop'
import { mapGetters } from 'vuex'
import { toInt } from 'utils/assist'
// import { EDIT_MODEL } from 'constant'
@Component({
    name: 'df-drag-class',
    props: config,
    computed: {
        ...mapGetters({
            scrollerConfig: 'screens/getScrollerConfig'
        })
    },
    watch: {
        active(val) {
            this.enabled = val
        },
        z(val) {
            if (val >= 0 || val === 'auto') {
                this.zIndex = val
            }
        },
        // 当编辑区拖动时，需要改变比例尺位置
        scrollerConfig: {
            deep: true,
            handler() {
                this.commondPosLine('screenMove')
            }
        }
    }
})
export default class Drag {
    data() {
        return {
            top: 0,
            left: 0,
            width: 0,
            height: 0,
            resizing: false,
            dragging: false,
            enabled: this.active,
            handle: null,
            zIndex: '',
            speed: 10
        }
    }
    created() {
        this.parentX = 0
        this.parentW = 9999
        this.parentY = 0
        this.parentH = 9999

        this.mouseX = 0
        this.mouseY = 0

        this.lastMouseX = 0
        this.lastMouseY = 0

        this.mouseOffX = 0
        this.mouseOffY = 0

        this.elmX = 0
        this.elmY = 0
        this.elmW = 0
        this.elmH = 0

        this.x = 0
        this.y = 0
        this.w = 200
        this.h = 200
        // const model = DF.Application.getViewModel()
        // this.isEditModel = model === EDIT_MODEL
        this.isEditModel = true

        this.zIndex = DF.Screen.$zIndex.getZIndexById(this.options.zid)

        this.top = toInt(this.options.coordinate.y);
        this.left = toInt(this.options.coordinate.x);
        this.width = toInt(this.options.coordinate.width);
        this.height = toInt(this.options.coordinate.height);
    }
    mounted() {
        document.documentElement.addEventListener('mousemove', this.handleMove, true)
        document.documentElement.addEventListener('mousedown', this.deselect, true)
        document.documentElement.addEventListener('mouseup', this.handleUp, true)

        this.elmX = toInt(this.$el.style.left)
        this.elmY = toInt(this.$el.style.top)
        this.elmW = this.$el.offsetWidth || this.$el.clientWidth
        this.elmH = this.$el.offsetHeight || this.$el.clientHeight
        this.reviewDimensions()
    }

    beforeDestroy() {
        document.documentElement.removeEventListener('mousemove', this.handleMove, true)
        document.documentElement.removeEventListener('mousedown', this.deselect, true)
        document.documentElement.removeEventListener('mouseup', this.handleUp, true)
    }

    setInit(id) {
        this.$el.setAttribute('id', id)
        this.zid = id;
    }

    // methods
    reviewDimensions() {
        if (this.minw > this.w) this.width = this.minw
        if (this.minh > this.h) this.height = this.minh
        if (this.parent) {
            const parentW = toInt(this.$el.parentNode.clientWidth)
            const parentH = toInt(this.$el.parentNode.clientHeight)
            this.parentW = parentW
            this.parentH = parentH
            if (this.w > this.parentW) this.width = parentW
            if (this.h > this.parentH) this.height = parentH
            if ((this.x + this.w) > this.parentW) this.width = parentW - this.x
            if ((this.y + this.h) > this.parentH) this.height = parentH - this.y
            this.elmW = this.width
            this.elmH = this.height
        }
        this.$emit('resizing', this.left, this.top, this.width, this.height)
    }

    setSize(coordinate) {
        this.top = toInt(coordinate.y);
        this.left = toInt(coordinate.x);
        this.width = toInt(coordinate.width);
        this.height = toInt(coordinate.height);
    }

    getElmSize() {
        return {
            left: this.left,
            top: this.top,
            width: this.width,
            height: this.height
        }
    }

    getElmPoslineSize() {
        return {
            obj: this.getElmSize(),
            scrollerConfig: this.scrollerConfig,
            id: this.$el.id
        }
    }

    // 执行posline
    commondPosLine(type) {
        let obj = this.getElmPoslineSize();
        obj.type = type
        DF.Screen.handlePosline(obj)
    }

    elmDown(e) {
        this.commondPosLine('down')
        const target = e.target || e.srcElement
        if (this.$el.contains(target)) {
            this.reviewDimensions()
            if (!this.enabled) {
                this.enabled = true
                this.$emit('activated', e)
                this.$emit('update:active', true)
            }
            if (this.draggable) {
                this.dragging = true
            }
        }
    }

    deselect(e) {
        const target = e.target || e.srcElement
        const regex = new RegExp('handle-([trmbl]{2})', '')
        if (!this.$el.contains(target) && !regex.test(target.className)) {
            if (this.enabled) {
                this.enabled = false
                this.$emit('deactivated')
                this.$emit('update:active', false)
            }
        }
    }

    handleDown(handle, e) {
        this.handle = handle
        if (e.stopPropagation) e.stopPropagation()
        if (e.preventDefault) e.preventDefault()
        this.resizing = true
    }

    handleMove(e) {
        // if (e.stopPropagation) e.stopPropagation()
        // if (e.preventDefault) e.preventDefault()
        this.mouseX = e.pageX || e.clientX + document.documentElement.scrollLeft
        this.mouseY = e.pageY || e.clientY + document.documentElement.scrollTop
        let diffX = this.mouseX - this.lastMouseX + this.mouseOffX
        let diffY = this.mouseY - this.lastMouseY + this.mouseOffY
        this.mouseOffX = this.mouseOffY = 0
        this.lastMouseX = this.mouseX
        this.lastMouseY = this.mouseY
        let dX = diffX
        let dY = diffY
        if (this.resizing) {
            if (this.handle.indexOf('t') >= 0) {
                if (this.elmH - dY < this.minh) this.mouseOffY = (dY - (diffY = this.elmH - this.minh))
                else if (this.elmY + dY < this.parentY) this.mouseOffY = (dY - (diffY = this.parentY - this.elmY))
                this.elmY += diffY
                this.elmH -= diffY
            }
            if (this.handle.indexOf('b') >= 0) {
                if (this.elmH + dY < this.minh) this.mouseOffY = (dY - (diffY = this.minh - this.elmH))
                else if (this.elmY + this.elmH + dY > this.parentH) this.mouseOffY = (dY - (diffY = this.parentH - this.elmY - this.elmH))
                this.elmH += diffY
            }
            if (this.handle.indexOf('l') >= 0) {
                if (this.elmW - dX < this.minw) this.mouseOffX = (dX - (diffX = this.elmW - this.minw))
                else if (this.elmX + dX < this.parentX) this.mouseOffX = (dX - (diffX = this.parentX - this.elmX))
                this.elmX += diffX
                this.elmW -= diffX
            }
            if (this.handle.indexOf('r') >= 0) {
                if (this.elmW + dX < this.minw) this.mouseOffX = (dX - (diffX = this.minw - this.elmW))
                else if (this.elmX + this.elmW + dX > this.parentW) this.mouseOffX = (dX - (diffX = this.parentW - this.elmX - this.elmW))
                this.elmW += diffX
            }
            this.left = (Math.round(this.elmX / this.grid[0]) * this.grid[0])
            this.top = (Math.round(this.elmY / this.grid[1]) * this.grid[1])
            this.width = (Math.round(this.elmW / this.grid[0]) * this.grid[0])
            this.height = (Math.round(this.elmH / this.grid[1]) * this.grid[1])
            this.$emit('resizing', this.left, this.top, this.width, this.height)
        } else if (this.dragging) {
            if (this.parent) {
                if (this.elmX + dX < this.parentX) this.mouseOffX = (dX - (diffX = this.parentX - this.elmX))
                else if (this.elmX + this.elmW + dX > this.parentW) this.mouseOffX = (dX - (diffX = this.parentW - this.elmX - this.elmW))
                if (this.elmY + dY < this.parentY) this.mouseOffY = (dY - (diffY = this.parentY - this.elmY))
                else if (this.elmY + this.elmH + dY > this.parentH) this.mouseOffY = (dY - (diffY = this.parentH - this.elmY - this.elmH))
            }
            this.elmX += diffX
            this.elmY += diffY
            if (this.axis === 'x' || this.axis === 'both') {
                this.left = (Math.round(this.elmX / this.grid[0]) * this.grid[0])
            }
            if (this.axis === 'y' || this.axis === 'both') {
                this.top = (Math.round(this.elmY / this.grid[1]) * this.grid[1])
            }
            this.$emit('dragging', this.left, this.top)
        }
        if (this.resizing || this.dragging) {
            this.commondPosLine('move')
        }
    }
    handleUp() {
        this.handle = null
        if (this.resizing || this.dragging) {
            this.adjustSpeed()
            this.commondPosLine('up')
        }
        if (this.resizing) {
            this.resizing = false
            this.$emit('resizestop', this.left, this.top, this.width, this.height)
        }
        if (this.dragging) {
            this.dragging = false
            this.$emit('dragstop', this.left, this.top, this.width, this.height)
        }
        this.elmX = this.left
        this.elmY = this.top
    }
    destroy() {
        this.$emit('delete')
    }
    contextMenu(e) {
        this.$emit('compContextMenu', e)
    }
    adjustSpeed() {
        // 根据speed做吸附效果
        this.left = this.byRound(this.left)
        this.top = this.byRound(this.top)
        this.width = this.byRound(this.width)
        this.height = this.byRound(this.height)
    }
    byRound(num) {
        return Math.round(num / this.speed) * this.speed
    }
    render(h) {
        let handles
        if (this.resizable && this.isEditModel) {
            handles = this.handles.map(handler => {
                return <div class={'df-element__handle handle-' + handler} style={{ display: this.enabled ? 'block' : 'none' }}
                        onMousedown={this.handleDown.bind(this, handler)}>
                    </div>
            })
        }
        let tools
        if (this.isEditModel) {
            tools = <div class='df-element__delete' style={{ display: this.enabled ? 'block' : 'none' }}
                onClick={this.destroy.bind(this)}>
                <i class='icon-trash-can'></i>
            </div>
//            fade = <div class='df-element__fade' v-show={this.isEditModel}></div>
        }
        return (
            <div class={this.classes}
                onMousedown={this.elmDown}
                onContextmenu={this.contextMenu}
                style={this.style} >
                {tools}
                {handles}
                {this.$slots.default}
            </div>
        )
    }

    get style() {
        let zIndex = DF.Screen.$zIndex.getZIndexById(this.options.zid)
        return {
            top: this.top + 'px',
            left: this.left + 'px',
            width: this.width + 'px',
            height: this.height + 'px',
            zIndex
        }
    }
    get classes() {
        return {
            'df-element': true,
            draggable: this.draggable,
            resizable: this.resizable,
            active: this.enabled,
            dragging: this.dragging,
            resizing: this.resizing
        }
    }
    // 是否显示黄色小方块
    get eheaderClass() {
        let showBlock = this.options.props.titleProp.isShowBlockCls;
        if (showBlock === '1' || showBlock === '') {
            return 'df-element__eheaderChildTitle'
        }
        return 'df-element__eheader';
    }
}
</script>

<style>
@component-namespace df {
    @b element{
        position: absolute;
        box-sizing: border-box;
        border: 1px solid rgba(0, 0, 0, 0);
        @e handle {
            display: none;
            position: absolute;
            width: 5px;
            height: 5px;
            font-size: 1px;
            background: var(--main-color);
            -webkit-transition: all 0.1s linear;
            transition: all 0.1s linear;
            border: 1px solid rgb(255, 255, 255);
            &:hover{
                transform: scale(2);
            }
        }
        @e fade {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 999999;
            width: 100%;
            height: 100%;
            background: transparent;
        }
        @e delete {
            position: absolute;
            top: -14px;
            right: 0;
            color: var(--main-color);
            cursor: pointer;
        }
        & .handle-tl {
            top: -5px;
            left: -5px;
            cursor: nw-resize;
        }
        & .handle-tm {
            top: -5px;
            left: 50%;
            margin-left: -5px;
            cursor: n-resize;
        }
        & .handle-tr {
            top: -5px;
            right: -5px;
            cursor: ne-resize;
        }
        & .handle-ml {
            top: 50%;
            margin-top: -5px;
            left: -5px;
            cursor: w-resize;
        }
        & .handle-mr {
            top: 50%;
            margin-top: -5px;
            right: -5px;
            cursor: e-resize;
        }
        & .handle-bl {
            bottom: -5px;
            left: -5px;
            cursor: sw-resize;
        }
        & .handle-bm {
            bottom: -5px;
            left: 50%;
            margin-left: -5px;
            cursor: s-resize;
        }
        & .handle-br {
            bottom: -5px;
            right: -5px;
            cursor: se-resize;
        }
    }
}
.draggable:hover {
    cursor: move;
    border:var(--border-handle) ;
}
.active{
    border:var(--border-handle) ;
}
</style>
