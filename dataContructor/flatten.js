function fl(arr) {
    let _arr = []
    arr.forEach(item => {
        if (Array.isArray(item)) {
            _arr = _arr.concat(fl(item))
        } else {
            _arr.push(item)
        }
    })
    return _arr
}