/**
 * 正则表达式是匹配模式，要么匹配字符，要么匹配位置！
 */

// 两种匹配模式： 横向模糊 纵向模糊

var reg0 = /ab{2,5}c/g
// {m,n}出现最少m 最多 n , g是修饰符表示全局匹配

var reg1 = /a[1,2,3]b/
// 可以匹配 a1b a2b a3b
/**
 *  [abc] 表示匹配一个字符串 a b c
 *  那么[123456abcdefGHIJKLM]该怎么写呢？
 * 可以使用范围表示法 [1-6a-fG-M]中间用 - 连起来 表示匹配其中的一个
 * 但是如果要 匹配 - 就要这么 [-ac] / [ac-] / [a\-c] 使用 \ 转义
 * 
 * ^ 脱字符 表示取反 [^abc] 表示除了 a b c 别的字符
 */

/**
 * 范围简写
 * \d [0-9]
 * \D [^0-9]
 * \w [0-9A-Za-z_]
 * \W [^0-9A-Za-z_]
 * \s [ \t\v\n\r\f]
 * \S [^ \t\v\n\r\f]
 * . 任意字符
 */

/**
 * 量词简写
 * {m,} 至少mci
 * {m} m次
 * ? {0, 1} 出现0 次 或者 1次
 * + {1,} 至少 1次
 * * {0,} 任意次
 */

/**
 * 贪婪匹配 /\d{2,5}/
 * 惰性匹配 /\d{2,5}?/
 * 
 * 默认贪婪  加问号 惰性
 */

/**
 *  | 管道符  多选分支 支持多种模式匹配 就近原则，惰性的
 */

// 匹配颜色
var reg2 = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g

// 匹配时间
var reg3 = /^([01][0-9]|[2][0-3]):[0-5][0-9]$/