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

##### 拾人牙慧，研究下vue双向绑定
> [极简实现input双向绑定，也是v-model的底层原理通过监听，input事件和Object.defineProperty实现](https://zouhangwithsweet.github.io/xiezhewan/easy.html)
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
##### rem移动端布局

> 直接移动端写的很多，但是都是套的模板  
> 在摘抄一下移动端的rem最简单的办法(目前都是750的页面)
```
(function (doc, win) {
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                if(clientWidth>=640){
                    docEl.style.fontSize = '100px';
                }else{
                    docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
                }
            };

        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);

链接：https://www.jianshu.com/p/b00cd3506782
```
> MongoDB start

##### ES6 学习笔记
> 主要记录下不常用的ES6语法，加深记忆

* set 和 map  
 * set
    > 不能有重复项，可以运用于数组去重； `[...new Set([])]`  
    > 可以`forEach((value, key) => console.log(value, key))` 二者一致；keys()，values()，entries()  
    > size add delete has clear
    * webset 元素必须是对象，且为弱引用；垃圾回收机制引用计数无效

##### 计算机网络
* 数百万级的互联的计算设备的集合
* 网络协议（newwork protocol）
    > 数据交换的规则、标准和约定
        > * 语法（syntax），数据的结构或格式
        > * 语义（semantic）

### 18/3/2 - 18/6/30
三个计划
* 1.阅读 《你不知道的JavaScript》
* 2.nodejs入门
* 3.vue源码学习

#### vue-cli proxytable rewrite的理解
> 用代理, 首先你得有一个标识, 告诉他你这个连接要用代理. 不然的话, 可能你的 html, css, js这些静态资源都跑去代理. 所以我们只要接口用代理, 静态文件用本地.'/iclient': {}, 就是告诉node, 我接口只要是'/iclient'开头的才用代理.所以你的接口就要这么写 /iclient/xx/xx. 最后代理的路径就是 http://xxx.xx.com/iclient/xx/xx.可是不对啊, 我正确的接口路径里面没有/iclient啊. 所以就需要 pathRewrite,用''^/iclient'':'', 把'/iclient'去掉, 这样既能有正确标识, 又能在请求接口的时候去掉iclient.

#### 滚动到可视区域


```JavaScript
// 输入框在虚拟键盘弹出时，自动滚动到可见位置
document.body.addEventListener('click', function (event) {
  var element = event.target;
  var tags = {
    'INPUT': 1,
    'TEXTAREA': 1,
  }
  if ((element.tagName in tags) ) {
    setTimeout(function(){
      element.scrollIntoViewIfNeeded();
      // console.log('scrollIntoViewIfNeeded');
    }, 400);
  }
}, false);
```

#### 基于vue/el-table的可编辑表格数据管理后台

[预览地址](https://zouhangwithsweet.github.io/xiezhewan/editTable/#/dataflow)

- 脚手架基于最新的vue-cli@3
- 适用于后台接口数据发布和调试

#### 常用原生组件，message、alert、loading、confirm

- [x] 基于ES6 class构建，支持回调函数
- [x] 监听`transitionend`监听
- [] 兼容差