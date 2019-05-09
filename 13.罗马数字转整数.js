/*
 * @lc app=leetcode.cn id=13 lang=javascript
 *
 * [13] 罗马数字转整数
 */
/**
 * @param {string} s
 * @return {number}
 */
const romanToInt = function(s) {
  const numMapSingle = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  }
  const numMapDoudle = {
    IV: 4,
    IX: 9,
    XL: 40,
    XC: 90,
    CD: 400,
    CM: 900,
  }
  // const strKeysSingle = Object.keys(numMapSingle)
  const strKeysDoudle = Object.keys(numMapDoudle)
  // 解析字符串
  let res = []
  strKeysDoudle.forEach(item => {
    if (s.includes(item)) {
      res.push(item)
      s = s.replace(item, '')
    }
  })
  res.push(...s)
  let sums = 0
  res.forEach(item => {
    sums += numMapDoudle[item] || numMapSingle[item]
  })
  return sums
};

