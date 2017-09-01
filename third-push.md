### 概述

第三方推流模块用于用户使用具有推流功能的媒体设备的场景下，用户可以使用第三方设备将媒体播放到自己的播放窗口。在启动模块时系统会在本地启动一个 RTMP 推流服务，用户需要将媒体流推到此服务上才能进行流的转发推送。该模块需要依赖 cef 模块，因此只能用于百家云客户端。

**使用第三方推流组件需要引入以下文件：**
```html
<link rel="stylesheet" href="http://live-cdn.baijiacloud.com/js-sdk/{version}/thirdPush/ThirdPush.css">
<script src="http://live-cdn.baijiacloud.com/js-sdk/{version}/cef/cef.js"></script>
<script src="http://live-cdn.baijiacloud.com/js-sdk/{version}/thirdPush/ThirdPush.js"></script>
```

### 示例

<iframe class="thirdPush" frameborder=0 width=700 height=500 marginheight=0 marginwidth=0 scrolling=no src=./iframe/third-push.html></iframe>

!>注意模块使用流名字作为唯一标识流的字段，因此需保证流名字唯一
```html
<div id="third-push" ></div>
```

```javascript
// 通过调用 ThirdPush 组件的 create 方法创建一个第三方推流实例
// element 为包裹组件实例的父节点
var element = $('#third-push');
var thirdPush = BJY.ThirdPush.create({
    element: element,
    interval： 3000
});
```

### API

#### props
<div id="third-push-api-props"></div>

#### events
<div id="third-push-api-events"></div>

#### methods
<div id="third-push-api-methods"></div>

<script>
new Vue({
    el: '#third-push-api-props',
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
                    name: 'serverURI',
                    explain: '服务器推送地址',
                    type: 'string',
                    value: '空'
                },
                {
                    name: 'hasAudio',
                    explain: '是否推送音频',
                    type: 'boolean',
                    value: false
                },
                {
                    name: 'selectStreamName',
                    explain: '当前选择的流名字',
                    type: 'string',
                    value: '空'
                },
                {
                    name: 'selectIndex',
                    explain: '当前选择的流在流列表数组中的下标',
                    type: 'number',
                    value: '-1'
                },
                {
                    name: 'transpondIndex',
                    explain: '正在转发的流在流列表数组中的下标',
                    type: 'number',
                    value: '-1'
                },
                {
                    name: 'streamList',
                    explain: '所有流的信息列表',
                    type: 'Array',
                    value: '空'
                },
                {
                    name: 'canCheck',
                    explain: '转发音频选项按钮是否可选',
                    type: 'boolean',
                    value: 'true'
                }
            ]
        }
    }
});
new Vue({
    el: '#third-push-api-events',
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
                    name:'eventEmitter.RTMP_AGENT_STREAM_RESULT',
                    explain: '获取流成功返回结果是触发',
                    data: 'streams Array 返回的流信息数组'
                },
                {
                    name:'eventEmitter.RTMP_AGENT_STREAM_PLAY_RESULT',
                    explain: '转发流时转发状态改变触发',
                    data: 'code: number 状态码：正常：0，中断：1，无数据：2'
                },
                {

                    name:'eventEmitter.RTMP_AGENT_STATUS_CHANGE',
                    explain: 'RTMP 服务器状态改变时触发',
                    data: 'status:'
                    +     '<ul class="table-ul">'
                    +           '<li>0: 服务器正在准备</li>'
                    +           '<li>1: 服务器正常</li>'
                    +           '<li>2: 服务器不正常</li>'
                    +     '</ul>'
                },
                {
                    name:'eventEmitter.RTMP_AGENT_COPY_SUCCESS',
                    explain: '点击复制按钮时触发，可用于通知外部复制成功',
                    data: '无'
                },
                {
                    name:'eventEmitter.RTMP_AGENT_PUSH_STREAM_FAIL',
                    explain: '推流失败时触发',
                    data: '无'
                },
                {
                    name:'eventEmitter.RTMP_AGENT_NO_DATA_FROM_STREAM',
                    explain: '当前转发的流无数据时触发',
                    data: '无'
                },
                {
                    name:'eventEmitter.RTMP_AGENT_RESTART_SERVER_FAIL',
                    explain: '重启推流服务器失败时触发',
                    data: '无'
                }
            ]
        }
    }
});
new Vue({
    el: '#third-push-api-methods',
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
                    explain: '创建第三方推流实例',
                    param: '初始化参数:'
                    +      '<ul  style="margin-left:50px;">'
                    +            '<li>element: JQuery 对象 模块容器 必须</li>'
                    +            '<li>interval: number 列表自动刷新间隔 可选（默认 3000 单位 ms）</li>'

                    +      '</ul>'
                },
                {
                    name: 'destroy',
                    explain: '销毁第三方推流对象，用于对象使用结束后调用',
                    param: '无'
                },
                {
                    name: 'set',
                    explain: '设置对象属性值，如 thirdPush.set(\'interval\', \'3000\')',
                    param: '<ul class="table-ul">'
                    +           '<li>propsName: string  要设置的属性名</li>'
                    +           '<li>value: *  要设置的属性值</li>'

                    +      '</u>'
                },
                {
                    name: 'get',
                    explain: '获取对象属性值，如 var interval = thirdPush.get(\'interval\')',
                    param: 'propsName: 要获取值的属性名'
                },
                {
                    name: 'restartServer',
                    explain: '重启推流服务',
                    param: '无'
                },
                {
                    name: 'refreshStreamList',
                    explain: '刷新列表',
                    param: '无'
                },
                {
                    name: 'startTranspond',
                    explain: '开始推流',
                    param: '无'
                },
                {
                    name: 'stopTranspond',
                    explain: '停止推流',
                    param: '无'
                },
                {
                    name: 'stopRtmpAgentService',
                    explain: '停止推流服务器',
                    param: '无'
                },
                {
                    name: 'reset',
                    explain: '重置模块',
                    param: '无'
                }
            ]
        }
    }
});
</script>