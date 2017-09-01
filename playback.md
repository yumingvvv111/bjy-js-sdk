### 概述

回放是录制好的直播，因此上面的组件，如白板、聊天列表，是可以共用的。
SDK 不提供回放的视频播放器，只提供了不同分辨率的视频 URL，你可以根据需要选择<a href="https://github.com/videojs/video.js" target="_blank"> videojs</a>来播放。
需要注意的是，回放 SDK 需要和视频状态保持同步。当视频开始播放时，调用 `BJY.playback.play()`，当视频暂停时，调用 `BJY.playback.pause()`，当视频播放进度变化时，调用 `BJY.playback.seek(seconds)`

**使用回放组件需要引入以下文件：**

```html
<script src="http://live-cdn.baijiacloud.com/js-sdk/{version}/playback/playback.js"></script>
```

### 示例

```javascript
// 初始化回放
BJY.playback.init({
    env: 'production',
    token: 'test12345678',
    class: {
        id: '17071145500056'
    }
})
.then(function (response) {
    // 创建组件，如白板，用户列表，聊天列表，弹幕。
    // 多种分辨率的视频地址
    // response.videos
    // 根据 url 创建视频播放器
    // 启动回放
    BJY.playback.start();
});
// BJY.playback.seek(seconds) 拖动进度条
// BJY.playback.play() 播放
// BJY.playback.pause() 暂停
```

### API

#### methods
<div id="playback-api-methods"></div>

<script>
new Vue({
    el: '#playback-api-methods',
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
                    name:'init',
                    explain: '初始化回放',
                    param: '回放初始化参数:'
                    +      '<ul  style="margin-left:50px;">'
                    +            '<li>env: string 环境，可选值 test/beta/production，对于客户来说，统一传 production 必须</li>'
                    +            '<li>token: string 口令 必须</li>'
                    +            '<li>class: Object 房间对象 必须</li>'
                    +      '</ul>'
                },
                {
                    name: 'start',
                    explain: '开始回放',
                    param: '无'
                },
                {
                    name: 'pause',
                    explain: '暂停回放',
                    param: '无'
                },
                {
                    name: 'play',
                    explain: '继续回放',
                    param: '无'
                },
                {
                    name: 'seek',
                    explain: '更新回放时间条',
                    param: 'seconds: number 播放头（单位秒）'
                }
            ]
        }
    }
});
</script>












