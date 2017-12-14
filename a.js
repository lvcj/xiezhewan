// const arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
// console.log(getRandomInt(0, 100))
// 生成随机数组
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