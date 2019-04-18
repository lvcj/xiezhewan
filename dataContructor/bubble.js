function bubbleSort(arr) {
  if (!(arr instanceof Array)) throw new Error('AGRUMENT IS NOT ARRAY')
  if (arr.length === 0) return []
  if (arr.length === 1) return arr
  const start = arr[0]
  const next = arr[1]
  const last = arr.slice(2)
  if (start > next) {
    return [start, ...bubbleSort([next, ...last])]
  } else {
    return [next, ...bubbleSort([start, ...last])]
  }
}

const testArr = [85, 24, 63, 45, 17, 31, 96, 50]

console.log(bubbleSort(testArr))
// 事实证明这是个错误的排序
