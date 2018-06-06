String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, '')
}

// 类型判断

/**
 * instanceof 
 * constructor
 * Object.freeze()
 */