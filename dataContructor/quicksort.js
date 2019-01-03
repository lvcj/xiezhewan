function quickSort(arr) {
  if (!(arr instanceof Array)) {
    throw new Error('argument must a array')
  }
  if (arr.length === 0) return []
  let anchor = arr[0]
  let biggerArr = quickSort(arr.slice(1).filter(item => item > anchor))
  let smallerArr = quickSort(arr.slice(1).filter(item => item <= anchor))
  return [...smallerArr, anchor, ...biggerArr]
}

let testArr = [85, 24, 63, 45, 17, 31, 96, 50]

console.log(quickSort(testArr))