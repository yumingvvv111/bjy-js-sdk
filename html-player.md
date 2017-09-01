### 概述

限于音视频的格式，PC 请用 safari 浏览器观看，手机最好使用微信观看。
播放器内部实现了响应对方的各种音视频切换，
外部唯一需要做的只有两件事：
- 当对方打开音视频的任何一个时创建播放器
- 当对方离开房间时销毁播放器

当对方尚未打开音视频，如果你认为空白不太好看，可以自定义样式，当对方打开音视频时，把播放器填充进去即可。

**使用 H5 播放器组件需要引入以下文件：**
```html
<script src="http://live-cdn.baijiacloud.com/js-sdk/{version}/player/player.js"></script>
<script src="http://live-cdn.baijiacloud.com/js-sdk/{version}/player/core/Player.js"></script>
<script src="http://live-cdn.baijiacloud.com/js-sdk/{version}/player/extension/html.js"></script>
```

### 示例
<iframe frameborder=0 width=800 height=500 marginheight=0 marginwidth=0 scrolling=no src=./iframe/html-player.html></iframe>


!>注意：1.h5-player 加宽度和高度

```html
<div id="h5-player">
    <!-- 因为手机不支持自动播放，需在播放器位置放一个播放按钮，点击后调用 teacherH5Player.playAV(true) 触发播放 -->
    <button id="btn-play" class="btn btn-secondary hidden">
        播放
    </button>
</div>
```

```javascript
// store 存储着系统的权限信息
var store = BJY.store;
// 获取创建播放器的 Player 对象
var Player = BJY.Player;
var teacherH5Player;
var playButton = $('#btn-play');

// 给播放按钮设置点击回调（用于手机端）
playButton.on('click', function () {
    // 如果当前播放器正在播放，先关掉播放器
    if (teacherH5Player.videoOn || teacherH5Player.audioOn) {
        teacherH5Player.playAVClose();
    }
    // 播放视频
    teacherH5Player.playAV(
        store.get('teacher.videoOn')
    );
});

// 初始化 H5 播放器扩展
Player.html.init();

// 监听 H5 播放器相关事件
eventEmitter
    .on(
        // 老师打开媒体事件
        eventEmitter.TEACHER_MEDIA_ON,
        function () {
            // 判断播放器是否存在
            if (!teacherH5Player) {
                // 若不存在，创建一个 H5 播放器组件
                teacherH5Player = new Player({
                    // 组件的父容器
                    element: $('#h5-player'),
                    // 音视频发布用户（一般为老师）
                    user: store.get('teacher'),
                    // 播放器扩展（实现与底层播放相关的接口 可直接使用百家云实现 H5 扩展 Player.html。）
                    extension: Player.html
                });
                playButton.removeClass('hidden');
            }
        }
    )
    .on(
        // 老师加入房间事件
        eventEmitter.TEACHER_ADD,
        function () {
            console.log('老师进入教室');
        }
    )
    .on(
        // 老师离开房间事件
        eventEmitter.TEACHER_REMOVE,
        function () {
            console.log('老师离开教室');
            if (teacherH5Player) {
                // 销毁 H5 播放器组件
                teacherH5Player.dispose();
                // 将对 H5 组件对象置空
                teacherH5Player = null;
            }
        }
    )
    .on(
        // 正在加载视频事件
        eventEmitter.HTML_VIDEO_LOAD_START,
        function () {
            console.log('正在加载视频');
        }
    )
    .on(
        // 视频开始播放事件
        eventEmitter.HTML_VIDEO_PLAY,
        function () {
            console.log('视频开始播放');
            playButton.addClass('hidden');
        }
    )
    .on(
        // 视频暂停事件
        eventEmitter.HTML_VIDEO_PAUSE,
        function () {
            console.log('视频暂停');
            playButton.removeClass('hidden');
        }
    )
    .on(
        // 视频加载超时事件
        eventEmitter.HTML_VIDEO_LOAD_TIMEOUT,
        function () {
            console.log('视频加载超时');
            playButton.removeClass('hidden');
        }
    )
    .on(
        // 视频加载失败事件
        eventEmitter.HTML_VIDEO_LOAD_FAIL,
        function () {
            console.log('视频加载失败');
            playButton.removeClass('hidden');
        }
    )
    .on(
        // 正在加载音频事件
        eventEmitter.HTML_AUDIO_LOAD_START,
        function () {
            console.log('正在加载音频');
        }
    )
    .on(
        // 音频开始播放事件
        eventEmitter.HTML_AUDIO_PLAY,
        function () {
            console.log('音频开始播放');
            playButton.addClass('hidden');
        }
    )
    .on(
        // 音频暂停事件
        eventEmitter.HTML_AUDIO_PAUSE,
        function () {
            console.log('音频暂停');
            playButton.removeClass('hidden');
        }
    )
    .on(
        // 音频加载超时事件
        eventEmitter.HTML_AUDIO_LOAD_TIMEOUT,
        function () {
            console.log('音频加载超时');
            playButton.removeClass('hidden');
        }
    )
    .on(
        // 音频加载失败事件
        eventEmitter.HTML_AUDIO_LOAD_FAIL,
        function () {
            console.log('音频加载失败');
            playButton.removeClass('hidden');
        }
    );

```

### API

#### events
<div id="h5-player-api-events"></div>

#### methods
<div id="h5-player-api-methods"></div>

<script>

new Vue({
    el: '#h5-player-api-events',
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
                    name:'eventEmitter.TEACHER_ADD',
                    explain: '老师加入房间事件',
                    data: '无'
                },
                {

                    name:'eventEmitter.TEACHER_REMOVE',
                    explain: '老师离开房间事件',
                    data: '无'
                },
                {
                    name:'eventEmitter.HTML_VIDEO_LOAD_START',
                    explain: '正在加载视频事件',
                    data: '无'
                },
                {
                    name:'eventEmitter.HTML_VIDEO_PLAY',
                    explain: '视频开始播放事件',
                    data: '无'
                },
                {
                    name:'eventEmitter.HTML_VIDEO_PAUSE',
                    explain: '视频暂停事件',
                    data: '无'
                },
                {
                    name:'eventEmitter.HTML_VIDEO_LOAD_TIMEOUT',
                    explain: '视频加载超时事件',
                    data: '无'
                },
                {
                    name:'eventEmitter.HTML_VIDEO_LOAD_FAIL',
                    explain: '视频加载失败事件',
                    data: '无'
                },
                {
                    name:'eventEmitter.HTML_AUDIO_LOAD_START',
                    explain: '正在加载音频事件',
                    data: '无'
                },
                {
                    name:'eventEmitter.HTML_AUDIO_PLAY',
                    explain: '音频开始播放事件',
                    data: '无'
                },
                {
                    name:'eventEmitter.HTML_AUDIO_PAUSE',
                    explain: '音频暂停事件',
                    data: '无'
                },
                {
                    name:'eventEmitter.HTML_AUDIO_LOAD_TIMEOUT',
                    explain: '音频加载超时事件',
                    data: '无'
                },
                {
                    name:'eventEmitter.HTML_AUDIO_LOAD_FAIL',
                    explain: '音频加载失败事件',
                    data: '无'
                }
            ]
        }
    }
});
new Vue({
    el: '#h5-player-api-methods',
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
                    param: '出始化参数:'
                    +      '<ul  style="margin-left:50px;">'
                    +            '<li>element: JQuery 对象 播放器容器 必须</li>'
                    +            '<li>user: string 音视频发布用户 必须</li>'
                    +            '<li>extension: Object 播放器扩展 必须</li>'
                    +      '</ul>'
                },
                {
                    name: 'html.init',
                    explain: '初始化 H5 播放器扩展，在创建播放器实例之前调用',
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












