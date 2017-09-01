### 概述

SDK 为开发者提供一套设置按钮的默认实现，这也是百家云直播内置的组件。



**使用设置按钮组件需要引入以下文件：**
```html
<link rel="stylesheet" href="http://live-cdn.baijiacloud.com/js-sdk/{version}/setting/menu/menu.css">
<script src="http://live-cdn.baijiacloud.com/js-sdk/{version}/setting/menu/menu.js"></script>
<script src="http://live-cdn.baijiacloud.com/js-sdk/{version}/user/userSpeak.js"></script>
```

### 示例
!>注意：也许你看到的例子会有一些不正常，原因是这里用到了百家云的图标，你可以选择自行实现这些图标，或者用图片实现，我们就不提供图标了。
<iframe frameborder=0 width=200 height=60 marginheight=0 marginwidth=0 scrolling=no src=./iframe/setting-buttons.html></iframe>

```html
<div id="setting">
    <div id="menu-speaker"></div>
    <div id="menu-mic"></div>
    <div id="menu-camera"></div>
    <div id="menu-speak-apply"></div>
</div>
```

```javascript
// 创建扬声器设置按钮
var speakerMenu = BJY.SpeakerMenu.create({
    // 父容器
    element: $('#menu-speaker'),
    // 是否可以选择设备
    canSelectDevice: true,
    // 是否可以调节音量
    canAdjustVolume: true,
    // 最大音量
    maxVolume: 100
});
// 创建麦克风设置按钮
var micMenu = BJY.MicMenu.create({
    // 父容器
    element: $('#menu-mic'),
    // 是否可以选择设备
    canSelectDevice: true,
    // 是否可以调节音量
    canAdjustVolume: true,
    // 最大音量
    maxVolume: 100
});
// 创建摄像头设置按钮
var cameraMenu = BJY.CameraMenu.create({
    // 父容器
    element: $('#menu-camera'),
    // 是否可以选择设备
    canSelectDevice: true
});

// 初始化发言功能
BJY.userSpeak.init();
// 创建举手按钮（用于学生举手）
if (!store.get('class.isFree')) { // 判断房间是否可以自由发言，可自由发言的房间无需举手
    var speakApplyMenu = BJY.SpeakApplyMenu.create({
        element: $('#menu-speak-apply')
    });
}

eventEmitter
    .on(
        // 摄像头按钮被点击
        eventEmitter.CAMERA_MENU_CLICK,
        function () {
        // 可以弹出自定义的摄像头设置框
        }
    )
    .on(
        // 麦克风按钮被点击
        eventEmitter.MIC_MENU_CLICK,
        function () {

        }
    )
    .on(
        eventEmitter.DETECT_TOOL_SHOW_TRIGGER,
        function () {

        }
    )
    .on(
        // 举手按钮被点击
        eventEmitter.SPEAK_APPLY_CLICK,
        function () {
            // 向系统提交申请
            BJY.userSpeak.startApply(10 * 1000);
        }
    )
    .on(
        // 取消举手
        eventEmitter.SPEAK_APPLY_CANCEL_CLICK,
        function () {
            // 取消举手
            BJY.userSpeak.cancelApply();
        }
    )
    .on(
        // 举手发言结束
        eventEmitter.SPEAK_END_CLICK,
        function () {
            // 停止发言
            BJY.userSpeak.stopSpeak(BJY.store.get('user.id'));
        }
    );
```

### API

#### 摄像头菜单按钮

##### props
<div id="camera-setting-api-props"></div>

##### events
<div id="camera-setting-api-events"></div>

##### methods
<div id="camera-setting-api-methods"></div>

#### 扬声器菜单按钮

##### props
<div id="speaker-setting-api-props"></div>

##### events
<div id="speaker-setting-api-events"></div>

##### methods
<div id="speaker-setting-api-methods"></div>

#### 麦克风菜单按钮

##### props
<div id="mic-setting-api-props"></div>

##### events
<div id="mic-setting-api-events"></div>

##### methods
<div id="mic-setting-api-methods"></div>

#### 举手按钮

##### events
<div id="apply-setting-api-events"></div>

##### methods
<div id="apply-setting-api-methods"></div>
<script>
new Vue({
    el: '#camera-setting-api-props',
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
                    name: 'list',
                    explain: '摄像头设备列表',
                    type: 'Array',
                    value: '其 item 数据格式如下：'
                    +        '<ul style="margin-left: 50px">'
                    +            '<li>name: 设备名字</li>'
                    +            '<li>guid：设备id（唯一标识设备）</li>'
                    +            '<li>index：设备的索引</li>'
                    +      '</ul>'
                }
            ]
        }
    }
});
new Vue({
    el: '#camera-setting-api-events',
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
                // {
                //     name:'eventEmitter.CAMERA_INDEX_CHANGE_TRIGGER',
                //     explain: '切换摄像头时触发，可用于通知底层切换摄像头设备',
                //     data: 'cameraIndex：number 被选中的设备索引'
                // },
                {
                    name:'eventEmitter.CAMERA_MENU_CLICK',
                    explain: '摄像头按钮被点击时触发',
                    data: '无'
                },
                {

                    name:'eventEmitter.VIDEO_DEVICE_DETECT',
                    explain: '摄像头设备列表更改时触发',
                    data: '无'
                },
                // {
                //     name:'eventEmitter.CAMERA_INDEX_CHANGE',
                //     explain: '当其他模块更改摄像头时需要发送此事件通知菜单更新数据',
                //     data: '无'
                // }
            ]
        }
    }
});
new Vue({
    el: '#camera-setting-api-methods',
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
                    explain: '创建摄像头设置按钮',
                    param: '始化参数:'
                    +      '<ul  style="margin-left:50px;">'
                    +            '<li>element: JQuery 对象 按钮容器 必须</li>'
                    +      '</ul>'
                },
                {
                    name: 'openDeviceList',
                    explain: '打开摄像头设备列表',
                    param: '无'
                },
                {
                    name: 'closeDeviceList',
                    explain: '关闭摄像头设备列表',
                    param: '无'
                },
                // {
                //     name: 'openCamera',
                //     explain: '打开摄像头，发送 eventEmitter.CAMERA_MENU_CLICK 事件',
                //     param: '无'
                // },
                // {
                //     name: 'closeCamera',
                //     explain: '关闭摄像头，发送 eventEmitter.CAMERA_MENU_CLICK 事件',
                //     param: '无'
                // },
                {
                    name: 'destroy',
                    explain: '销毁菜单按钮对象',
                    param: '无'
                }
            ]
        }
    }
});

new Vue({
    el: '#speaker-setting-api-props',
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
                    name: 'list',
                    explain: '扬声器设备列表',
                    type: 'Array',
                    value: '其 item 数据格式如下：'
                    +        '<ul style="margin-left: 50px">'
                    +            '<li>name: 设备名字</li>'
                    +            '<li>guid：设备id（唯一标识设备）</li>'
                    +            '<li>index：设备的索引</li>'
                    +      '</ul>'
                }
            ]
        }
    }
});
new Vue({
    el: '#speaker-setting-api-events',
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
                // {
                //     name:'eventEmitter.SPEAKER_INDEX_CHANGE_TRIGGER',
                //     explain: '切换扬声器时触发，可用于通知底层切换扬声器设备',
                //     data: 'speakerIndex: number 被选中的设备索引'
                // },
                {
                    name:'eventEmitter.SPEAKER_VOLUME_CHANGE_TRIGGER',
                    explain: '改变音量时触发，通知底层设置音量',
                    data: 'volume: number 改变后的音量值'
                },
                {
                    name:'eventEmitter.SPEAKER_VOLUME_CHANGE',
                    explain: '其他模块改变音量时触发，通知菜单更新音量',
                    data: 'volume: number 改变后的音量值'
                },
                {

                    name:'eventEmitter.AUDIO_DEVICE_DETECT',
                    explain: '扬声器设备列表更改时触发',
                    data: '无'
                },
                // {
                //     name:'eventEmitter.SPEAKER_INDEX_CHANGE',
                //     explain: '当其他模块更改扬声器时需要发送此事件通知菜单更新数据',
                //     data: '无'
                // }
            ]
        }
    }
});
new Vue({
    el: '#speaker-setting-api-methods',
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
                    explain: '创建扬声器设置按钮',
                    param: '始化参数:'
                    +      '<ul  style="margin-left:50px;">'
                    +            '<li>element: JQuery 对象 按钮容器 必须</li>'
                    +            '<li>maxVolume: bollean 最大音量 必须</li>'
                    +      '</ul>'
                },
                {
                    name: 'openDeviceList',
                    explain: '打开扬声器设备列表',
                    param: '无'
                },
                {
                    name: 'closeDeviceList',
                    explain: '关闭扬声器设备列表',
                    param: '无'
                },
                {
                    name: 'mute',
                    explain: '禁音',
                    param: '无'
                },
                {
                    name: 'unmute',
                    explain: '取消禁音',
                    param: '无'
                },
                {
                    name: 'destroy',
                    explain: '销毁菜单按钮对象',
                    param: '无'
                }
            ]
        }
    }
});

new Vue({
    el: '#mic-setting-api-props',
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
                    name: 'list',
                    explain: 'MIC 设备列表',
                    type: 'Array',
                    value: '其 item 数据格式如下：'
                    +        '<ul style="margin-left: 50px">'
                    +            '<li>name: 设备名字</li>'
                    +            '<li>guid：设备id（唯一标识设备）</li>'
                    +            '<li>index：设备的索引</li>'
                    +      '</ul>'
                }
            ]
        }
    }
});
new Vue({
    el: '#mic-setting-api-events',
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
                // {
                //     name: 'eventEmitter.MIC_INDEX_CHANGE_TRIGGER',
                //     explain: '切换麦克风时触发，可用于通知底层切换麦克风设备',
                //     data: 'micIndex：number 被选中的设备索引'
                // },
                {
                    name: 'eventEmitter.MIC_VOLUME_CHANGE_TRIGGER',
                    explain: '改变麦克风音量时触发，通知底层设置音量',
                    data: 'volume: number 改变后的音量值'
                },
                {
                    name:'eventEmitter.MIC_MENU_CLICK',
                    explain: '麦克风按钮被点击时触发',
                    data: '无'
                },
                {
                    name:'eventEmitter.AUDIO_DEVICE_DETECT',
                    explain: '音频设备列表更改时触发',
                    data: '无'
                },
                // {
                //     name:'eventEmitter.MIC_VOLUME_CHANGE',
                //     explain: '当其他模块更改麦克风音量时需要发送此事件通知菜单更新数据',
                //     data: '无'
                // },
                // {
                //     name:'eventEmitter.MIC_INDEX_CHANGE',
                //     explain: '当其他模块更改麦克风设备时需要发送此事件通知菜单更新数据',
                //     data: '无'
                // }
            ]
        }
    }
});
new Vue({
    el: '#mic-setting-api-methods',
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
                    explain: '创建麦克风设置按钮',
                    param: '始化参数:'
                    +      '<ul  style="margin-left:50px;">'
                    +            '<li>element: JQuery 对象 按钮容器 必须</li>'
                    +            '<li>maxVolume: bollean 最大音量 必须</li>'
                    +      '</ul>'
                },
                {
                    name: 'openDeviceList',
                    explain: '打开麦克风设备列表',
                    param: '无'
                },
                {
                    name: 'closeDeviceList',
                    explain: '关闭麦克风设备列表',
                    param: '无'
                },
                // {
                //     name: 'openMic',
                //     explain: '打开麦克风，发送 eventEmitter.CAMERA_MENU_CLICK 事件',
                //     param: '无'
                // },
                // {
                //     name: 'closeMic',
                //     explain: '关闭麦克风，发送 eventEmitter.CAMERA_MENU_CLICK 事件',
                //     param: '无'
                // },
                {
                    name: 'destroy',
                    explain: '销毁菜单按钮对象',
                    param: '无'
                }
            ]
        }
    }
});

new Vue({
    el: '#apply-setting-api-events',
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
                    name:'eventEmitter.SPEAK_APPLY_REQ_TRIGGER',
                    explain: '用户举手事件，用户举手时触发',
                    data: '无'
                },
                {
                    name:'eventEmitter.SPEAK_APPLY_RESULT_CANCEL',
                    explain: '取消举手事件，用户取消举手时触发',
                    data: '无'
                },
                {
                    name:'eventEmitter.SPEAK_APPLY_RESULT_ACCEPT',
                    explain: '举手被接受时触发',
                    data: '无'
                },
                {
                    name:'eventEmitter.SPEAK_APPLY_RESULT_REJECT',
                    explain: '举手被拒绝时触发',
                    data: '无'
                }

            ]
        }
    }
});
new Vue({
    el: '#apply-setting-api-methods',
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
                    explain: '创建举手按钮',
                    param: '始化参数:'
                    +      '<ul  style="margin-left:50px;">'
                    +            '<li>element: JQuery 对象 按钮容器 必须</li>'
                    +      '</ul>'
                }
            ]
        }
    }
});
</script>












