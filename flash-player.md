### 概述

播放器内部实现了响应对方的各种音视频切换，
外部唯一需要做的只有两件事：
- 当对方打开音视频的任何一个时创建播放器
- 当对方离开房间时销毁播放器

当对方尚未打开音视频，如果你认为空白不太好看，可以自定义样式，当对方打开音视频时，把播放器填充进去即可。

**使用 Flash 播放器组件需要引入以下文件：**
```html
<script src="http://live-cdn.baijiacloud.com/js-sdk/{version}/player/player.js"></script>
<script src="http://live-cdn.baijiacloud.com/js-sdk/{version}/player/core/Player.js"></script>
<script src="http://live-cdn.baijiacloud.com/js-sdk/{version}/player/extension/flash.js"></script>
```

### 示例
<iframe frameborder=0 width=800 height=500 marginheight=0 marginwidth=0 scrolling=no src=./iframe/flash-player.html></iframe>

!>注意：若 flash 未播放请重新刷新（demo 运行需要重新进入房间）


```html
<div id="flash-player"></div>
```

!>注意：给 flash 的 object 元素加宽度和高度
```css
object {
    width: 590px;
    height: 430px;
}
```

```javascript
// store 存储着系统的权限信息
var store = BJY.store;
// 获取创建播放器的 Player 对象
var Player = BJY.Player;
// 获取 flash 扩展
var flash = Player.flash;
// 设置 flash swf url
flash.pluginUrl = 'http:/path/flash.swf';
// 初始化 flash 扩展
flash.init();

var teacherFlashPlayer;

var eventEmitter = BJY.eventEmitter;
eventEmitter
    .on(
        // 老师打开了媒体
        eventEmitter.TEACHER_MEDIA_ON,
        function () {
            // 判断播放器是否存在
            if (!teacherFlashPlayer) {
                // 若不存在，创建一个 flash 播放器组件
                teacherFlashPlayer = new Player({
                    // 组件的父容器
                    element: $('#flash-player'),
                    // 音视频发布用户（一般为老师）
                    user: store.get('teacher'),
                    // 播放器扩展（实现与底层播放相关的接口 可直接使用百家云实现 flash 扩展 Player.flash。）
                    extension: flash
                });
            }
        }
    )
    .on(
        eventEmitter.TEACHER_REMOVE,
        function () {
            if (teacherFlashPlayer) {
                teacherFlashPlayer.dispose();
                teacherFlashPlayer = null;
            }
        }
    );
```

### API

#### events
<div id="flash-player-api-events"></div>

#### methods
<div id="flash-player-api-methods"></div>

<script>

new Vue({
    el: '#flash-player-api-events',
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
                    name:'eventEmitter.TEACHER_MEDIA_ON',
                    explain: '老师打开媒体事件',
                    data: '无'
                },
                {

                    name:'eventEmitter.TEACHER_REMOVE',
                    explain: '老师离开房间事件',
                    data: '无'
                }
            ]
        }
    }
});
new Vue({
    el: '#flash-player-api-methods',
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
                    name:'Player',
                    explain: '播放器构造函数',
                    param: '始化参数:'
                    +      '<ul  style="margin-left:50px;">'
                    +            '<li>element: JQuery 对象 播放器容器 必须</li>'
                    +            '<li>user: string 音视频发布用户 必须</li>'
                    +            '<li>extension: Object 播放器扩展 必须</li>'
                    +      '</ul>'
                },
                {
                    name: 'flash.init',
                    explain: '初始化 flash 播放器扩展，在创建播放器实例之前调用',
                    param: '无'
                },
                {
                    name: 'dispose',
                    explain: '销毁播放器实例',
                    param: '无'
                }
            ]
        }
    }
});
</script>












