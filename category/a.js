// 生成几乎有序的数组
function seqArr(n) {
    let _arr = []
    for (let i = 0; i < n; i++) {
        _arr.push(i * 2)
    }
    return _arr
}

function generateArr(n, swapTimes) {
    let arr = seqArr(n)
    let posx = 0 , posy = 0
    for (let i = 0; i < swapTimes; i++) {
        posx = Math.floor(Math.random() * n)
        posy = Math.floor(Math.random() * n) // 这个分号是必须的
        // let temp = arr[posy]
        // arr[posx] = arr[posy]
        // arr[posy] = temp
        // console.log(posx, posy)
        // debugger
        ;[arr[posx], arr[posy]] = [arr[posy], arr[posx]]
        // ES6这么结构交换暂时又问题不知道为啥
    }
    return arr
}
// console.log(getRandomInt(0, 100))
// 生成随机数组
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getRandomArr(min, max, n) {
    let arr = []
    for (let i = 0; i < n; i++) {
        arr.push(Math.floor(Math.random() * (max -min + 1) + min))
    }
    return arr
}
arr = getRandomArr(0, 100000, 100000)

// 选择排序
const selectionSort = (arr, n) => {
    for (let i = 0; i < n ; i++) {
        let minIndex = i
        for (let j = i + 1 ; j < n ; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j
                let temp = arr[i]
                arr[i] = arr[minIndex]
                arr[minIndex] = temp
                // es6
                // [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
            }
        }
    }
}

function arrSort() {
    selectionSort(arr, arr.length)
    console.log(arr)
}
// arrSort()

// 插入排序

const insertionSort = (arr, n) => {
    for (let i = 1; i < n; i++) {
        let key = arr[i]
        let j
        for(j = i; j > 0 && arr[j-1] > key; j--) {
            // let temp = arr[j]
            arr[j] = arr[j-1]
            // arr[j-1] = temp
        }
        arr[j] = key
    }
}

function insert() {
    let s = new Date()
    insertionSort(arr, arr.length)
    let e = new Date()
    console.log(arr, `${(e - s) / 1000}s`)
}

insert()

// 冒泡排序
const sort = (arr, n) => {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // let temp = arr[j]
                // arr[j] = arr[j + 1]
                // arr[j + 1] = temp
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }
    return arr
}

let arr1 = [3,1,5,7,2,4,9,6,10,8]
console.log(sort(arr1, arr1.length))

// 快排排序

const mergeSort = (arr) => {
    if (arr.length <= 1) return arr
    let index = Math.floor(arr.length/2)
    // 要切割数组
    let v = arr.splice(index, 1)[0];
    let left = [];
    let right = [];
    for(let i = 0; i < arr.length; i++) {
        if (arr[i] < v) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return mergeSort(left).concat(v, mergeSort(right))
}
