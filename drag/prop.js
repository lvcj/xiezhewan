/**
 * [config 属性默认配置 ]
 * @type {Object}
 */
export const config = {
    options: {
        type: Object,
        default() {
            return {}
        }
    },
    active: {
        type: Boolean,
        default: false
    },
    draggable: {
        type: Boolean,
        default: true
    },
    resizable: {
        type: Boolean,
        default: true
    },
    // w: {
    //     type: Number,
    //     default: 200,
    //     validator(val) {
    //         return val > 0
    //     }
    // },
    // h: {
    //     type: Number,
    //     default: 200,
    //     validator(val) {
    //         return val > 0
    //     }
    // },
    // x: {
    //     type: Number,
    //     default: 0,
    //     validator(val) {
    //         return typeof val === 'number'
    //     }
    // },
    // y: {
    //     type: Number,
    //     default: 0,
    //     validator(val) {
    //         return typeof val === 'number'
    //     }
    // },
    // z: {
    //     type: [String, Number],
    //     default: 'auto',
    //     validator(val) {
    //         let valid = (typeof val === 'string') ? val === 'auto' : val >= 0
    //         return valid
    //     }
    // },
    minw: {
        type: Number,
        default: 50,
        validator(val) {
            return val > 0
        }
    },
    minh: {
        type: Number,
        default: 50,
        validator(val) {
            return val > 0
        }
    },
    handles: {
        type: Array,
        default() {
            return ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml']
        }
    },
    axis: {
        type: String,
        default: 'both',
        validator(val) {
            return ['x', 'y', 'both'].indexOf(val) !== -1
        }
    },
    grid: {
        type: Array,
        default() {
            return [1, 1]
        }
    },
    parent: {
        type: Boolean,
        default: true
    }
}
