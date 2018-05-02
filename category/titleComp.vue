<script>
import Component from 'vue-class-component'
import { PROP_TITLE_ALIGN } from 'constant'
@Component({
    name: 'df-title',
    props: {
        options: Object
    },
    watch: {
        'options.titleName': {
            deep: true,
            handler(newVal) {
                this.title = newVal;
            }
        }
    }
})
export default class TitleComp {
    data() {
        return {
            title: ''
        }
    }
    render() {
        return (
             <div class={this.eheaderClass} style={this.headerStyle} domProps-innerHTML={this.title}></div>
        )
    }
    // 是否显示黄色小方块
    get eheaderClass() {
        let { isShowBlockCls } = this.options.props.titleProp;
        if (isShowBlockCls === '1' || isShowBlockCls === '') {
            return 'df-compTitle df-compBlocksTitle'
        }
        return 'df-compTitle';
    }
    get headerStyle() {
        let titleProp = this.options.props.titleProp;
        let hs = _.pick(titleProp, ['fontFamily', 'fontStyle', 'fontWeight', 'textDecoration']);
        hs.color = titleProp.fontColor;
        hs.fontSize = titleProp.fontSize + 'px'
        let align = titleProp.textAlign;
        if (PROP_TITLE_ALIGN.TOPCENTER === align) {
            hs.textAlign = 'center'
        } else if (PROP_TITLE_ALIGN.TOPLEFT === align) {
            hs.textAlign = 'left'
        } else if (PROP_TITLE_ALIGN.TOPRIGHT === align) {
            hs.textAlign = 'right'
        }
        return hs
    }
}
</script>
<style>
    @component-namespace df {
        @b compTitle {
            position: relative;
            color: #fff;
            /*text-shadow: 0 0 6px #00deff;*/
            font-weight: 500;
            font-size: 12px;
            line-height: 30px;
            font-family: Microsoft YaHei;
            text-decoration: none;
            cursor: default;
        }
        @b compBlocksTitle {
            text-indent: 20px;
            &:before {
                display: block;
                top: 7px;
                left: 0;
                position: absolute;
                width: 8px;
                height: 15px;
                background-color: #2498b9;
                content: '';
                margin-left: 5px;
            }
        }
    }
</style>
