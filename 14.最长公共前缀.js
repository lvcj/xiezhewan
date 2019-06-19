/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 */
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if (strs.length <= 0) return ''
    let length = strs[0].length
    let res = ''
    while (length > 0) {
      let temp = strs.map(item => item.startsWith(strs[0].slice(0, length)))
      if ([...new Set(temp)].length === 1) {
        res = strs[0].slice(0, length)
        break
      }
      length--
    }
    return res
};

