### 概述

进教室需要连接多个服务器，虽然时间不长（实际上很短），为了提升用户体验和宣传自己的品牌，我们推荐使用进度条组件。

进度条组件包括品牌 Logo，连接服务器的状态信息，以及当发生错误时的错误信息。

### 依赖
**使用 Loading 组件需要引入以下文件：**
```html
<link rel="stylesheet" href="http://live-cdn.baijiacloud.com/js-sdk/{version}/loading/live/Loading.css">
<script src="http://live-cdn.baijiacloud.com/js-sdk/{version}/loading/live/Loading.js"></script>
```

### 示例
<iframe frameborder=0 width=800 height=500 marginheight=0 marginwidth=0 scrolling=no src=./iframe/loading.html></iframe>

!>注意 .placeholder 是组件的占位元素，加载组件后会被组件替换
```html
<!-- 注意应给 loading 加样式，而不是 placeholder -->
<div id="loading">
    <div class="placeholder"></div>
</div>
```
```javascript
var loading = BJY.Loading.create({
    // 占位元素
    element: $('#loading .placeholder'),
    // logo URL 可自定义自己的加载 logo
    logoUrl: 'https://imgs.genshuixue.com/37797098_qsl3oz5g.jpg'
});

// 获取事件处理对象 eventEmitter
var eventEmitter = BJY.eventEmitter;
eventEmitter
    // 监听 loading 开始加载事件， one() 函数表示事件只处理一次，若需要一直监听请使用 on() 函数
    .one(
        eventEmitter.LOADING_PANEL_START,
        function (event, data) {
            // loading 开始加载时要做的事情
        }
    )
    // 监听 loading 结束加载事件
    .one(
        eventEmitter.LOADING_PANEL_END,
        function (event, data) {
            // loading 结束加载时要做的事情

            /*
             * 销毁 Loading 对象，可在此销毁进度条，
             * 若此时直播尚未开始，可以先进入倒计时等待页面，直到接收到事件 eventEmitter.VIEW_RENDER_TRIGGER
             */
            loading.destory();
        }
    )
    // 监听初始化事件
    .one(
        eventEmitter.VIEW_RENDER_TRIGGER,
        function (event, data) {
            // 服务器已准备就绪，开始初始化业务界面，进入直播页面

            // 加载直播需要的各种组件，包括播放器，白板，用户列表等等
        }
    );
BJY.init();
```
`BJY.init()` 函数请按照[基础](base)模块中的步骤配置

### API

#### events
<div id="loading-api-events"></div>

#### methods
<div id="loading-api-methods"></div>
<script>

new Vue({
    el: '#loading-api-events',
    template: '<Table border :columns="columns" :data="data"><Table>',
    data () {
        return {
            columns: [
                {
                    title: '事件',
                    key: 'name',
                    width: 350
                },
                {
                    title: '说明',
                    key: 'explain',
                    width: 350
                },
                {
                    title: '数据',
                    key: 'data',
                    width: 270
                }
            ],
            data: [

                {
                    name:'eventEmitter.LOADING_PANEL_START',
                    explain: '进度条开始时触发',
                    data: '无'
                },
                {
                    name:'eventEmitter.LOADING_PANEL_END',
                    explain: '进度条成功时触发',
                    data: '无'
                },
                {

                    name:'eventEmitter.MASTER_SERVER_CONNECT_SUCCESS',
                    explain: '主服务器连接成功时触发',
                    data: '无'
                },
                {
                    name:'eventEmitter.ROOM_SERVER_CONNECT_SUCCESS',
                    explain: '信令服务器连接成功时触发',
                    data: '无'
                },
                {
                    name:'eventEmitter.ROOM_SERVER_LOGIN_SUCCESS',
                    explain: '信令服务器登录成功时触发，到此表示成功进入教室',
                    data: '无'
                },
                {
                    name:'eventEmitter.ROOM_SERVER_LOGIN_FAIL',
                    explain: '信令服务器登录失败时触发',
                    data: '无'
                },
                {
                    name:'eventEmitter.ROOM_SERVER_LOGIN_OVERFLOW',
                    explain: '信令服务器已满时触发，无法登录',
                    data: '无'
                },
                {
                    name:'eventEmitter.ROOM_SERVER_LOGIN_KICKED_OUT',
                    explain: '信令服务器发现当前用户已经被老师踢出时触发，阻止再次进入教室',
                    data: '无'
                },
                {
                    name:'eventEmitter.CLASSROOM_CONNECT_FAIL',
                    explain: '超时、或其他原因导致失败时触发',
                    data: '无'
                },
                {
                    name:'eventEmitter.VIEW_RENDER_TRIGGER',
                    explain: '当连接成功后，系统告知调用方可以初始化界面时触发，区别于 eventEmitter.ROOM_SERVER_LOGIN_SUCCESS 事件，前者表示系统可以开始提供服务，属于业务层；后者仅表示用户连接服务器成功，属于物理层。',
                    data: '无'
                },
                {
                    name:'eventEmitter.CLASSROOM_CONNECT_START',
                    explain: '连接教室开始时触发，可用于提示用户',
                    data: 'reconnect: boolean 是否是重连'
                },
                 {
                    name:'eventEmitter.CLASSROOM_CONNECT_END',
                    explain: '连接教室结束时触发，可用于提示用户',
                    data: 'reconnect: boolean 是否是重连'
                },
                {
                    name:'eventEmitter.CLASSROOM_CONNECT_FAIL',
                    explain: '如果尝试过多次重连依然无法登录之后，触发此事件，可用于告知用户断网',
                    data: '无'
                }
            ]
        }
    }
});
new Vue({
    el: '#loading-api-methods',
    template: '<Table border :columns="columns" :data="data"><Table>',
    data () {
        return {
            columns: [
                {
                    title: '方法名',
                    key: 'name',
                    width: 270
                },
                {
                    title: '说明',
                    key: 'explain',
                    width: 350
                },
                {
                    title: '参数',
                    key: 'param',
                    width: 350
                }
            ],
            data: [
                {
                    name:'create（静态方法）',
                    explain: '创建 Loading 模块实例',
                    param: 'Loading 初始化参数:'
                    +      '<ul style="margin-left:40px;">'
                    +            '<li>element: JQuery对象 父节点容器 必须</li>'
                    +            '<li>logoUrl: string 用户需要使用的 logo URL 地址，系统会优先使用用户上传到服务器上的 logo， 可选</li>'
                    +      '</ul>'
                },
                {
                    name: 'destroy',
                    explain: '销毁 Loading 对象，用于对象使用结束后调用',
                    param: '无'
                }
            ]
        }
    }
});
</script>
