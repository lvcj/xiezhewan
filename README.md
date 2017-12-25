# 写着玩，练练算法，恶心的题什么的
>
>let's start!
>

##### es6数组解构有点问题
```
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
        posy = Math.floor(Math.random() * n)
        let temp = arr[posy]
        arr[posx] = arr[posy]
        arr[posy] = temp
        // console.log(posx, posy)
        // debugger
        // [arr[posx], arr[posy]] = [arr[posy], arr[posx]]
        // ES6这么解构交换暂时又问题不知道为啥?
    }
    return arr
}

console.log(generateArr(10, 2))
```
> 知道了问题了，万恶的js
> 解构不成功是因为 posy = Math.floor(Math.random() * n) 没加分号

##### 手工datepicker
* [预览](https://zouhangwithsweet.github.io/xiezhewan/)
* 日期对象
> 当月第一天 new Date(year, month - 1, 1)
> 当月最后一天 new Date(year, month, 0)
> 星期1到日 [1, 2, 3, 4, 5, 6, 0]
##### 函数节流(throttle)和函数防抖(debounce)

###### 函数节流就是预定一个函数只有在大于等于执行周期时才执行，周期内调用不执行。好像水滴攒到一定重量才会落下一样。
场景：
> * 窗口调整（resize）
> * 页面滚动（scroll）
> * 抢购疯狂点击（mousedown）

###### 函数防抖就是在函数需要频繁触发情况时，只有足够空闲的时间，才执行一次。好像公交司机会等人都上车后才出站一样。
场景：
> * 实时搜索（keyup）
> * 拖拽（mousemove）

###### 拾人牙慧，研究下vue双向绑定
> 极简实现input双向绑定，也是v-model的底层原理通过监听，input事件和Object.defineProperty实现
```
// html结构
<div>
    <input type="text" value="" id="input">
    <p>你好，<span id="nickName"></span></p>
    <div id="introduce"></div>
</div>
// script
var userInfo = {};
    var val = document.getElementById('input')
    val.addEventListener('input',() => {
        userInfo.nickName = val.value
    })
    Object.defineProperty(userInfo, "nickName", {
        get: function(){
            return document.getElementById('nickName').innerHTML;
        },
        set: function(nick){
            document.getElementById('nickName').innerHTML = nick;
        }
    });
    Object.defineProperty(userInfo, "introduce", {
        get: function(){
            return document.getElementById('introduce').innerHTML;
        },
        set: function(introduce){
            document.getElementById('introduce').innerHTML = introduce;
        }
    })
```
>
>