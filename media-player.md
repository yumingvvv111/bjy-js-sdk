### 概述

本地媒体播放器组件用于播放本地音视频文件，组件状态控制采用事件处理机制。当播放器状态改变时会触发相应事件，详情请参考 API 的事件列表；播放器的运行依赖本 SDK 的 cef 组件。并且本组件只能运行在百家云客户端上。

**使用本地媒体播放器组件需要引入以下文件：**
```html
<link rel="stylesheet" href="http://live-cdn.baijiacloud.com/js-sdk/{version}/mediaPlayer/MediaPlayer.css">
<script src="http://live-cdn.baijiacloud.com/js-sdk/{version}/cef/cef.js"></script>
<script src="http://live-cdn.baijiacloud.com/js-sdk/{version}/mediaPlayer/MediaPlayer.js"></script>
```

### 示例

<iframe frameborder=0 width=560 height=130 marginheight=0 marginwidth=0 scrolling=no src=./iframe/media-player.html></iframe>

```html
<div id="media-player" ></div>
```

```javascript
// 通过调用 MediaPlayer 组件的 create 方法创建一个媒体播放器实例
// element 为包裹组件实例的父节点
var element = $('#media-player');
var mediaPlayer = BJY.MediaPlayer.create({
    element: element,
    volume： 100,
    onCloseButtonClick: function () {
        // 使用结束后销毁对象
        mediaPlayer.destroy();
        // 移除父节点容器
        element.remove();
        mediaPlayer = null;
    },
    onMinimizeButtonClick: function () {
        // 隐藏父节点
        element.css('opacity', 0);
    }
});
...
```

### API

#### props
<div id="media-player-api-props"></div>

#### events
<div id="media-player-api-events"></div>

#### methods
<div id="media-player-api-methods"></div>

<script>
new Vue({
    el: '#media-player-api-props',
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
                    name: 'volume',
                    explain: '当前音量',
                    type: 'number',
                    value: 100
                },
                {
                    name: 'hasMic',
                    explain: '播放时是否收入麦克风声音',
                    type: 'boolean',
                    value: 'false'
                },
                {
                    name: 'isLoop',
                    explain: '是否循环播放',
                    type: 'boolean',
                    value: 'false'
                },
                {
                    name: 'audioOnly',
                    explain: '是否只播放声音',
                    type: 'boolean',
                    value: 'false'
                },
                {
                    name: 'isVedio',
                    explain: '当前文件是否是视频文件',
                    type: 'boolean',
                    value: 'false'
                },
                {
                    name: 'isAudio',
                    explain: '当前文件是否是音频文件',
                    type: 'boolean',
                    value: 'false'
                },
                {
                    name: 'fileName',
                    explain: '当前打开的文件名',
                    type: 'string',
                    value: '空'
                },
                {
                    name: 'currentTime',
                    explain: '播放器当前时间头，单位秒',
                    type: 'number',
                    value: 0
                },
                {
                    name: 'duration',
                    explain: '打开文件的播放时长，单位秒',
                    type: 'number',
                    value: 0
                }
            ]
        }
    }
});
new Vue({
    el: '#media-player-api-events',
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
                    name:'eventEmitter.MEDIA_PLAYER_OPEN_FILE',
                    explain: '点击打开文件夹按钮时触发',
                    data: '无'
                },
                {
                    name:'eventEmitter.MEDIA_PLAYER_OPEN_SUCCESS',
                    explain: '文件打开成功时触发',
                    data: 'fileName: 打开的文件名'
                },
                {

                    name:'eventEmitter.MEDIA_PLAYER_LOAD_SUCCESS',
                    explain: '文件加载成功时触发',
                    data: '<ul class="table-ul">'
                    +           '<li>duration: 打开文件的时长</li>'
                    +           '<li>isVideo: 文件是否是视频</li>'
                    +           '<li>isAudio: 文件是否是音频</li>'
                    +     '</ul>'
                },
                {
                    name:'eventEmitter.MEDIA_PLAYER_LOAD_FAIL',
                    explain: '文件打开失败时触发',
                    data: '无'
                },
                {
                    name:'eventEmitter.MEDIA_PLAYER_PAUSE',
                    explain: '暂停播放时触发',
                    data: '无'
                },
                {
                    name:'eventEmitter.MEDIA_PLAYER_PLAY',
                    explain: '开始播放时触发',
                    data: '无'
                },
                {
                    name:'eventEmitter.MEDIA_PLAYER_PLAY_PROGRESS',
                    explain: '播放头移动一秒时触发,用于更新进度条时间',
                    data: 'currentTime: 当前播放时间'
                },
                {
                    name:'eventEmitter.MEDIA_PLAYER_PLAY_END',
                    explain: '播放结束时触发',
                    data: '无'
                },
                {
                    name:'eventEmitter.MEDIA_PLAYER_REPLAY',
                    explain: '重新播放时触发',
                    data: '无'
                },
                {
                    name:'eventEmitter.MEDIA_PLAYER_VOLUME_CHANGE',
                    explain: '音量改变时触发',
                    data: 'volume: 更改后的音量值'
                },
                {
                    name:'eventEmitter.MEDIA_PLAYER_CURRENT_TIME_CHANGE',
                    explain: '通过进度条工具改变时间头时触发',
                    data: 'currentTime: 更改后的时间值'
                },
                {
                    name:'eventEmitter.MEDIA_PLAYER_MIC_CHANGE',
                    explain: '是否收入麦克风声音按钮切换时触发',
                    data: 'hasMic: 更改后的 hasMic 值'
                },
                {
                    name:'eventEmitter.MEDIA_PLAYER_AUDIO_ONLY_CHANGE',
                    explain: '是否只播放声音按钮切换时触发',
                    data: 'audioOnly: 更改后的 audioOnly 值'
                },
                {
                    name:'eventEmitter.MEDIA_PLAYER_LOOP_CHANGE',
                    explain: '是否循环播放按钮切换时触发',
                    data: 'isLoop: 更改后的 isLoop 值'
                },
                {
                    name:'eventEmitter.MEDIA_PLAYER_CLOSE',
                    explain: '点击关闭按钮时触发',
                    data: '无'
                },
                {
                    name:'eventEmitter.MEDIA_PLAYER_MINIMIZE',
                    explain: '点击最小化按钮时触发',
                    data: '无'
                }
            ]
        }
    }
});
new Vue({
    el: '#media-player-api-methods',
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
                    name:'create (静态方法)',
                    explain: '创建媒体播放器实例',
                    param: '播放器初始化参数:'
                    +      '<ul  style="margin-left:50px;">'
                    +            '<li>el: JQuery 对象 播放器容器 必须</li>'
                    +            '<li>volume: number 初始化音量值[0-100] 可选</li>'
                    +            '<li>onCloseButtonClick: function 关闭播放器时的回调 可选</li>'
                    +            '<li>onMinimizeButtonClick: function 最小化播放器时的回调 可选</li>'

                    +      '</ul>'
                },
                {
                    name: 'destroy',
                    explain: '销毁媒体播放器对象，用于对象使用结束后调用，在第二次调用 create 创建新对象时必须先销毁旧对象解除事件绑定',
                    param: '无'
                },
                {
                    name: 'set',
                    explain: '设置对象属性值，如 mediaPlayer.set(\'currentTime\', \'0\')',
                    param: '<ul class="table-ul">'
                    +           '<li>propsName: string  要设置的属性名</li>'
                    +           '<li>value: *  要设置的属性值</li>'

                    +      '</u>'
                },
                {
                    name: 'get',
                    explain: '获取对象属性值，如 var currentTime = mediaPlayer.get(\'currentTime\')',
                    param: 'propsName: 要获取值的属性名'
                },
                {
                    name: 'play',
                    explain: '控制媒体播放器播放',
                    param: '无'
                },
                {
                    name: 'pause',
                    explain: '控制媒体播放器暂停',
                    param: '无'
                },
                {
                    name: 'stop',
                    explain: '控制媒体播放器停止播放',
                    param: '无'
                }
            ]
        }
    }
});
</script>












