### 概述

 SDK 提供了一个默认的聊天发送组件，它为 PC 设计，也可以通过自定义样式，较好的适应手机。


**使用聊天发送组件需要引入以下文件：**

```html
<link rel="stylesheet" href="http://live-cdn.baijiacloud.com/js-sdk/{version}/message/messageSender/MessageSender.css">
<script src="http://live-cdn.baijiacloud.com/js-sdk/{version}/message/messageSender/MessageSender.js"></script>
```

### 示例

!>请根据需求选择创建合适的消息发送组件
<iframe frameborder=0 width=580 height=480 marginheight=0 marginwidth=0 scrolling=no src=./iframe/message-sender.html></iframe>


!>注意：1.message-sender 加宽度和高度 2.message-sender position 属性不能为 static

```html
<div id="message-sender">
    <div class="message-sender-title">
        表情列表读百家云后台配置（表情按钮的图标需自己实现）
    </div>
    <div class="placeholder1"></div>
    <div class="message-sender-title">
        表情列表完全自定义（表情按钮的图标需自己实现）
    </div>
    <div class="placeholder2"></div>
    <div class="message-sender-title">
        手机聊天框（表情按钮的图标需自己实现，还需要自己把垂直布局改成水平布局）
    </div>
    <div class="placeholder3"></div>
</div>
```

```javascript
// 监听 eventEmitter.VIEW_RENDER_TRIGGER 事件，加载之后初始化组件
eventEmitter
    .one(
        eventEmitter.VIEW_RENDER_TRIGGER,
        function (event, data) {
            // 创建一个使用百家云表情配置的消息发送组件
            BJY.MessageSender.create({
                // 消息发送组件的占位元素
                element: $('#message-sender .placeholder1'),
                // 能否发送表情
                canSendEmoji: true,
                // 是否多行输入
                multiline: true,
                // 提示信息
                placeholder: '请输入...',
                // 设置最大字符数
                messageMaxLength: 140
            });
            // 自定义表情数据
            var data = [];
            for (var i = 0; i < 100; i++) {
                var name = '捂脸' + i;
                if (i < 10) {
                    name = '捂脸' + '0' + i;
                }
                data.push({
                    key: 'wulian' + i,// 表情关键字
                    name: name, //表情名字
                    url: 'http://img.gsxservice.com/0baijiacloud/emotion/gsx/v1/dk.png' // 表情图片的 url 地址
                });
            }
            // 创建一个使用自定义表情配置的消息发送组件
            BJY.MessageSender.create({
                // 消息发送组件的占位元素
                element: $('#message-sender .placeholder2'),
                canSendEmoji: true,
                multiline: true,
                messageMaxLength: 140,
                placeholder: '请输入...',
                // 设置自定义的表情对象数组
                emotionList: {
                    data: data,
                    emotionPerRow: 4,
                    rowPerPage: 4,
                }
            });
            // 创建一个用于移动端的消息发送组件
            BJY.MessageSender.create({
                // 消息发送组件的占位元素
                element: $('#message-sender .placeholder3'),
                canSendEmoji: true,
                multiline: false,
                messageMaxLength: 0,
                placeholder: '请输入...',
                emotionList: {
                    data: data,
                    emotionPerRow: 4,
                    rowPerPage: 4,
                }
            });
        }
    );
```

### API

#### events
<div id="message-list-api-events"></div>

#### methods
<div id="message-list-api-methods"></div>

<script>
new Vue({
    el: '#message-list-api-props',
    template: '<Table border :columns="columns" :data="data"><Table>',
    data () {
        return {
            columns: [
                {
                    title: '属性',
                    key: 'name',
                    width: 200
                },
                {
                    title: '说明',
                    key: 'explain',
                    width: 200
                },
                {
                    title: '类型',
                    key: 'type',
                    width: 170
                },
                {
                    title: '默认值',
                    key: 'value',
                    width: 400
                }
            ],
            data: [
                {
                    name: 'content',
                    explain: '当前输入框中正在编辑的消息',
                    type: 'string',
                    value: '用户输入的文本'

                },
                {
                    name: 'forbiden',
                    explain: '是否禁言',
                    type: 'boolean',
                    value: 'false'
                },
                {
                    name: 'allForbiden',
                    explain: '是否全员禁言',
                    type: 'boolean',
                    value: 'false'
                }
            ]
        }
    }
});
new Vue({
    el: '#message-list-api-events',
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
                    name:'eventEmitter.MESSAGE_SEND',
                    explain: '发送消息事件，用户向服务器发送消息时触发',
                    data: '<ul class="table-ul">'
                    +        '<li>content: string  发送的消息字符串</li>'
                    +        '<li>data: Object 当发送的消息为图片或表情时存在，存储着图片或表情的信息。当消息为图片时具有属性：1.type："image", url: "图片 url 地址", width: "图片宽度", height: "图片高度"；当消息为表情时，具有属性：1.type:"emoji", key: "该表情的关键字", url: "表情 url 地址"</li>'
                    +      '</ul>'
                },
                {
                    name:'eventEmitter.MESSAGE_SEND_FORBID_ALL_CHANGE',
                    explain: '全员禁言事件，用于通知是否设置全员禁言',
                    data: 'forbidAll: boolean 是否全员禁言'
                },
                {

                    name:'eventEmitter.MESSAGE_SEND_FORBID',
                    explain: '用户禁言事件，用于通知是否禁言用户',
                    data: '<ul class="table-ul">'
                    +        '<li>to: Object 被禁言的用户信息对象</li>'
                    +        '<li>duration: number 被禁言的时间</li>'
                    +      '</ul>'
                }
            ]
        }
    }
});
new Vue({
    el: '#message-list-api-methods',
    template: '<Table border :columns="columns" :data="data"><Table>',
    data () {
        return {
            columns: [
                {
                    title: '方法名',
                    key: 'name',
                    width: 200
                },
                {
                    title: '说明',
                    key: 'explain',
                    width: 350
                },
                {
                    title: '参数',
                    key: 'param',
                    width: 420
                }
            ],
            data: [
                {
                    name:'create（静态方法）',
                    explain: '创建消息发送实例',
                    param: '消息发送初始化参数:'
                    +      '<ul  style="margin-left:50px;">'
                    +            '<li>element: JQuery 对象 消息发送组件占位元素 必须</li>'
                    +            '<li>canSendEmoji: boolean 是否可以发送表情 必须</li>'
                    +            '<li>canSendImage: boolean 是否可以发送图片 必须</li>'
                    +            '<li>canForbided: boolean 是否可以禁言 必须</li>'
                    +            '<li>multiline: boolean 编辑框是否多行 必须</li>'
                    +            '<li>emotionList: Object 自定义的表情列表对象，其中属性 data 存储表情数据，emotionPerRow 为每行表情个数，rowPerPage 为每页行的个数，用户可自行定义。如果不传 data 则使用百家云的表情。详情参考示例。 可选</li>'
                    +            '<li>placeholder: string 编辑框为空时的提示信息 可选（默认空）</li>'
                    +            '<li>messageMaxCount: number 用户10秒内可连续发送的消息数量 可选（默认30）</li>'
                    +            '<li>messageMaxLength: number 用户可发送的消息字符串的最大字符数 可选（默认140）</li>'
                    +            '<li>imageMaxSize: number 发送的图片大小上限（单位 MB ） 可选 （默认为5）</li>'
                    +       '</ul>'
                },
                {
                    name: 'destroy',
                    explain: '销毁 MessageSender 对象，用于对象使用结束后调用',
                    param: '无'
                }
            ]
        }
    }
});
</script>












