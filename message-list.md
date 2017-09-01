### 概述

组件支持图片、表情、文本消息。仅支持拉取最近 10 条消息。

**使用聊天列表组件需要引入以下文件：**
```html
<link rel="stylesheet" href="http://live-cdn.baijiacloud.com/js-sdk/{version}/message/messageList/MessageList.css">
<script src="http://live-cdn.baijiacloud.com/js-sdk/{version}/message/messageList/MessageList.js"></script>
```

### 示例
<iframe frameborder=0 width=400 height=700 marginheight=0 marginwidth=0 scrolling=no src=./iframe/message-list.html></iframe>

!>注意：1.message-list 加宽度和高度 2.message-list position 属性不能为 static

```html
<div id="message-list" >
    <div class="placeholder"></div>
</div>
```

```javascript
// 监听 eventEmitter.VIEW_RENDER_TRIGGER 事件，加载之后初始化组件
eventEmitter
    .one(
        eventEmitter.VIEW_RENDER_TRIGGER,
        function (event, data) {
            // 给自己的用户类型设置中英文术语
            var config = BJY.config;
            var userRoleMap = { };
            userRoleMap[ config.ROLE_TYPE_TEACHER ] = {
                en: 'teacher',
                cn: '老师'
            };
            userRoleMap[ config.ROLE_TYPE_ASSISTANT ] = {
                en: 'assistant',
                cn: '助教'
            };
            userRoleMap[ config.ROLE_TYPE_STUDENT ] = {
                en: 'student',
                cn: '学生'
            };
            userRoleMap[ config.ROLE_TYPE_GUEST ] = {
                en: 'guest',
                cn: '游客'
            };
            // 调用 create 方法创建消息列表组件
            BJY.MessageList.create({
                // 组件占位元素
                element: $('#message-list .placeholder'),
                // 加载表情 返回一个<img>标签
                renderEmoji: function (name, url) {
                    if (BJY.isAlicloudImage(url)) {
                        return '<img ondragstart="return false" src="'
                            + (url + '@100w_1e_1l.png')
                            + '" srcset="'
                            + (url + '@200w_1e_1l.png')
                            + ' 2x">';
                    }
                    return '<img ondragstart="return false" src="' + url + '">';
                },
                // 加载图片，返回一个<img>标签
                renderImage: function (url) {
                    if (BJY.isAlicloudImage(url)) {
                        return '<img ondragstart="return false" src="'
                            + (url + '@100w_1e_1l.png')
                            + '" srcset="'
                            + (url + '@200w_1e_1l.png')
                            + ' 2x">';
                    }
                    return '<img ondragstart="return false" src="' + url + '">';
                },
                // 配置用户渲染属性 必须
                renderUser: function (user, width, height) {
                    return {
                        id: user.id,
                        name: user.name,
                        number: user.number,
                        // 低密度屏幕压缩，详情查看基础第二条
                        avatar: BJY.compressImage({
                            url: user.avatar,
                            // 对于低密度屏幕将图片压缩到头像的大小
                            width: width,
                            height: height
                        }),
                        // 高密度屏幕压缩，详情查看基础第二条
                        avatar2x: BJY.compressImage({
                            url: user.avatar,
                            // 对于高密度屏幕（如 MAC）将图片压缩到头像的2倍大小
                            width: width * 2,
                            height: height * 2
                        }),
                        // 根据用户类型，配置角色的英文语言
                        role: userRoleMap[user.type].en,
                        // 根据用户类型，配置角色的本地语言
                        localRole: userRoleMap[user.type].cn,
                    }
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
                    name:'eventEmitter.MESSAGE_PULL_REQ',
                    explain: '拉取历史消息时触发，用于客户端向服务器请求拉取历史消息',
                    data: '<ul class="table-ul">'
                    +        '<li>count: number  要拉取的历史消息条数</li>'
                    +        '<li>next: number 消息 ID，表示拉取哪一条消息之前的消息，一般为当前消息列表的第一条消息</li>'
                    +      '</u>'
                },
                {

                    name:'eventEmitter.MESSAGE_PULL_RES',
                    explain: '拉取历史消息成功时触发',
                    data: 'messageList: Array 返回的消息列表'
                },
                {
                    name:'eventEmitter.CHAT_SERVER_LOGIN_SUCCESS',
                    explain: '聊天服务器加载成功时触发',
                    data: '无'
                },
                {
                    name:'eventEmitter.MESSAGE_RECEIVE',
                    explain: '新消息事件，有新消息时触发',
                    data: 'message: Object 返回的新消息对象'
                },
                // {
                //     name:'eventEmitter.MESSAGE_LIST_CLEAR',
                //     explain: '清空消息列表事件，可用于向组件发出清空消息的命令',
                //     data: '无'
                // }
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
                    name:'create (静态方法)',
                    explain: '创建消息列表实例',
                    param: '消息列表初始化参数:'
                    +      '<ul  style="margin-left:50px;">'
                    +            '<li>element: JQuery 对象 消息列表占位元素 必须</li>'
                    +            '<li>renderLink: function 自定义链接渲染处理 可选</li>'
                    +            '<li>renderEmoji: function 自定义表情渲染处理 可选</li>'
                    +            '<li>renderImage: function 自定义图片渲染处理 可选</li>'
                    +            '<li>renderUser: function 自定义用户信息渲染处理 必须</li>'
                    +            '<li>renderContent: function 自定义消息渲染处理，可用于自定义消息气泡 可选</li>'
                    +            '<li>avatarSize: number 用户头像大小 可选（默认40像素）</li>'
                    +            '<li>dividerInterval: number 消息时间提示间隔 可选 </li>'
                    +            '<li>loadDistance: number 定义列表滑块离顶部多少像素时拉取历史消息 可选 （默认为50）</li>'
                    +            '<li>reviewDistance: number 定义列表滑块离底部多少像素时表示用户正在查看历史消息 可选（默认为50）</li>'
                    +            '<li>morePageSize: number 定义每次拉取历史消息的消息数量（默认为10）</li>'
                    +      '</ul>'
                },
                {
                    name: 'destroy',
                    explain: '销毁 MessageList 对象，用于对象使用结束后调用',
                    param: '无'
                }
            ]
        }
    }
});
</script>












