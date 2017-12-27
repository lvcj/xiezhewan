import Component from 'vue-class-component'
import Vue from 'vue'
import DragComp from './drag'
import TitleComp from './titleComp'
import * as AppComponents from 'apps'
import { toInt, deepCopy } from 'utils/assist'
import { COMP_TYPE, ElEMENT_HEADER_HEIGHT } from 'constant'

/**
 * 元素盒子基类
 * @author renxiaofan
 */
@Component({
    props: {
        options: { type: Object, default: {} }
    },
    watch: {
        'options.coordinate': {
            deep: true,
            handler(newVal) {
                if (newVal) {
                    // 设置拖拽盒子大小
                    this.$refs.drag.setSize(newVal)
                    this.resizeComponent(newVal)
                }
            }
        },
        'options.renderData': {
            deep: true,
            handler(newVal) {
                if (newVal) {
                    this.loadCompResource(newVal)
                }
            }
        },
        'options.props': {
            deep: true,
            handler(newVal) {
                if (newVal) {
                    this.syncProps(newVal)
                }
            }
        }
    }
})
export default class Widget extends Vue {

    created() {
        this.$compClass = DF.Screen.getScreen().currentScene.getWidget(this.options.zid)
        // 内部组件映射名称
        this.$compName = this.$compClass.getVueName()
        // 内部组件实例
        this.$component = AppComponents[this.$compName]
        // 图表组件动态名称
        this.$compStatusName = this.$compClass.getStatusName()
        // 添加vm
        this.$compClass.setVm(this)
        // 通知加载完成
        this.$store.dispatch('global/syncLoadedComp', { zid: this.$compClass.zid })
    }

    mounted() {
        this.$refs.drag.setInit(this.$compClass.zid)
        // 初始化z轴
        DF.Screen.$zIndex.put($(`#${this.$compClass.zid}`), toInt(this.options.levelIndex))

        this.$store.dispatch('screens/saveCompStatusName', this.$compStatusName)
    }

    /**
     * 内部组件click回调触发
     *  {
     *      type : COMP_TYPE,    // 一级类型
     *      sourceData:{ }       // 源数据 映射SQL 数据
     *      data : {             // 数据
     *          //...
     *      }
     *  }
     *
     * @param  {[type]} param [description]
     * @return {[type]}       [description]
     */
    compClickHandler(param) {
        let renderDataItem = this.$compClass.getRenderDataItem()
        let cascadeType = this.$compClass.getCascadeType()
        let zid = this.$compClass.zid
        // 触发执行级联
        DF.Screen.executeCascade({
            data: param.data,
            cascadeType,
            renderDataItem,
            zid
        });
    }

    deleteWidget() {
        this.$store.dispatch('global/removeComponent', this.$compClass.zid);
    }

    // 选中操作
    selectedAction() {
        // 切换当前 currentZid
        this.$store.dispatch('global/saveCurrentZid', {
            zid: this.$compClass.zid
        }).then(() => {
            this.afterSelectedEvent()
        })
    }

    // 选中之后处理
    afterSelectedEvent() {
        // 触发属性状态改变
        this.$store.dispatch('screens/togglePropStatus', true)
        // 触发组件信息名称显示
        this.$store.dispatch('screens/saveCompStatusName', this.$compStatusName)
        // 监测级联状态  headerBar 按钮联动
        this.$store.dispatch('screens/updateScreenVisibleStatus')
    }

    // 右键绑定
    contextMenu(e) {
        this.selectedAction()
        this.$emit('compContextMenu', e)
    }

    resizeComponent(op) {
        let titleName = this.options.titleName
        let ops = deepCopy(op)
        if (titleName && titleName !== '') {
            ops.height -= ElEMENT_HEADER_HEIGHT;
        } else {
            ops.height = ops.height;
        }
        this.$refs.comp.resizeComp(ops);
    }

    // 选中事件
    activatedWidget(e) {
        this.selectedAction(e)
        e.stopPropagation();
    }

    // 容器大小变化
    resizeWidget(left, top, width, height) {
        this.$store.dispatch('global/syncWidgetSize', {
            zid: this.$compClass.zid,
            left,
            top,
            width,
            height
        })
    }

    // 监听拖动结束事件
    dragStop(left, right, width, height) {
        this.resizeWidget(left, right, width, height)
    }

    // 同步属性
    syncProps(newProps) {
        this.$compClass.props = newProps
        if (this.$refs.comp && $.isFunction(this.$refs.comp.syncProps)) {
            this.$refs.comp.syncProps(newProps)
        }
    }

    // 加载资源返回的数据
    loadCompResource(resp = []) {
        this.$compClass.dataDemandHandler(deepCopy(resp))
    }

    /**
     * [ajaxAfterHandler 数据加载后处理]
     * @return {[type]} [description]
     */
    ajaxAfterHandler() {
        //  渲染容器内组件initLast 主要给查询类组件
        this.initLastData()
        // 通知容器内组件数据渲染
        this.loadCompData()
        // 通知数据渲染完成
        this.$store.dispatch('global/saveDataRendered', this.$compClass.zid)
    }

    // 加载容器内组件
    loadCompData() {
        if (this.$refs.comp && $.isFunction(this.$refs.comp.loadData)) {
            this.$refs.comp.loadData(this.$compClass.renderData)
        }
    }

    // 加载动态标题
    loadCompTitleName(title) {
        if (this.$refs.drag) this.$refs.drag.setTitleName(title);
    }

    /**
      * initLastData - 初始化查询条件级联参数
      */
    initLastData() {
        if (this.compType === COMP_TYPE.SEARCH && this.$refs.comp && $.isFunction(this.$refs.comp.initLastData)) {
            return this.$refs.comp.initLastData(this.$compClass.lastData);
        }
    }

    /**
     * [getCompValue 获取查询类组件 getValue值 ]
     * @return {[type]} [description]
     */
    getCompValue() {
        if (this.$refs.comp && $.isFunction(this.$refs.comp.getValue)) {
            return this.$refs.comp.getValue();
        }
    }

    render(h) {
        const Component = this.$component
        return (
            <DragComp
                ref='drag'
                options={this.options}
                onResizing= {this.resizeWidget}
                onDragstop= {this.dragStop}
                onDelete={this.deleteWidget}
                onActivated = {this.activatedWidget}
                onCompContextMenu ={this.contextMenu}>
                <TitleComp ref='title' options={this.options}></TitleComp>
                <Component ref='comp' options={this.options} onClickHandler={this.compClickHandler}></Component>
            </DragComp>
        )
    }
}
