var blanks = []

function getChildren(parent) {
    if (parent.childNodes.length > 0) {
        for (let i = 0, len = parent.childNodes.length; i < len; i++) {
            getChildren(parent.childNodes[i]);
        }
    }
}


function compare(a, b) {
    return a - b
}

function swap(array, a, b) {
    ;[array[a], array[b]] = [array[b], array[a]]
}

function partition(arr, start, end) {
    let pivot = arr[end]
}

// 哈希算法
const arr = [1, 4, 5, 6, 2, 4, 5, 1, 7, 8, '19', 19, '19', 18, '18'];
const obj = {};
const repeat_arr = [];
arr.forEach(v => {
    if (obj[v + typeof v]) {
        repeat_arr.push(v);
    } else {
        obj[v + typeof v] = 1;
    }
});