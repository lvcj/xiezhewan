// 十进制转二进制
function to2(num) {
    let _res = []
    let _num
    while (num > 0) {
        _num = Math.floor(num % 2)
        _res.push(_num)
        num = Math.floor(num / 2)
    }
    return _res.reverse().join('')
}
