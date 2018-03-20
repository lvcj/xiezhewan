const _url = "https://baijiahao.baidu.com/s?id=1583617694892288463&wfr=spider&for=pc&a="

function getQuery(url) {
    let queryArr = url.split('?')
    let kV = queryArr[1].split('&')
    let obj = {}
    for (let i = 0; i < kV.length; i++) {
        let k = kV[i].split('=')[0]
        let v = kV[i].split('=')[1]
        // if (v === undefined) v = ''
        obj[k] = v
    }
    console.log(obj)
    return obj
}

getQuery(_url)

// 快排
var quickSort = function(arr) {
　　if (arr.length <= 1) { return arr; }
　　var pivotIndex = Math.floor(arr.length / 2);
　　var pivot = arr.splice(pivotIndex, 1)[0];
　　var left = [];
　　var right = [];
　　for (var i = 0; i < arr.length; i++){
　　　　if (arr[i] < pivot) {
　　　　　　left.push(arr[i]);
　　　　} else {
　　　　　　right.push(arr[i]);
　　　　}
　　}
　　return quickSort(left).concat([pivot], quickSort(right));
};
