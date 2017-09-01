### 概述

常见的弹幕是视频画面在下方，弹幕在上方，可以通过开关控制弹幕的显示和隐藏。

直播中会把聊天消息发送到弹幕上，你也可以用下面的按钮进行测试（弹幕样式需自定义）

**使用弹幕组件需要引入以下文件：**
```html
<script src="http://live-cdn.baijiacloud.com/js-sdk/{version}/barrage/Barrage.js"></script>
```

### 示例
<iframe frameborder=0 width=800 height=500 marginheight=0 marginwidth=0 scrolling=no src=./iframe/barrage.html></iframe>


```html
// 弹幕控制条
<div class="form-inline">
    <input type="text" id="barrage-input" class="form-control">
    <label>
        当前状态：<small class="status badge badge-pill badge-default"></small>
    </label>
    <button id="btn-send" class="btn btn-secondary btn-sm" onclick="sendMessage()">
        发送
    </button>
    <button id="btn-open" class="btn btn-secondary btn-sm" onclick="openBarrage()">
        开启弹幕
    </button>
    <button id="btn-close" class="btn btn-secondary btn-sm" onclick="closeBarrage()">
        关闭弹幕
    </button>
</div>
// 弹幕组件父容器
<div id="barrage"></div>
```

!>注意：1.给 #barrage 元素加宽度和高度 2.#barrage 的 position 属性不能为 static
```css
// 父容器样式
#barrage {
    background-color: #eee;
    height: 400px;
    position: relative;
}
// 控制条样式
.form-inline {
    padding: 10px;
}
.form-inline > label,
.form-inline > button {
    margin-left: 5px;
}
// 弹幕样式
.bjy-barrage {
    background-color: #FFF;
    color: blue;
    padding: 2px 4px;
}
```

```javascript
// 调用 create 方法创建弹幕组件
var barrage = new BJY.Barrage({
    // 组件父容器
    container: $('#barrage'),
    // 移动速度，每秒移动多少个像素
    speed: 100,
    // 最长可显示多少个字，超过这个字数的会过滤
    maxLength: 20,
    // 在 top - bottom 的区间出现弹幕
    top: 30,
    bottom: 30,
    // 轨道高度
    trackHeight: 30,
    // 是否只显示文本消息
    textOnly: false,
    // 如果需要自定义弹幕内容，可实现此方法
    renderContent: function (data) {
        return '转换后的文字';
    }
});

var statusElement = $('.status');

// 发送弹幕回调
function sendMessage() {
    barrage.send(
        $('input').val()
    );
}
// 打开弹幕回调
function openBarrage() {
    barrage.open();
    statusElement.html('开').addClass('badge-success');

    $('#btn-open').attr('disabled',"true");
    $('#btn-close').removeAttr("disabled");
    $('#btn-send').removeAttr("disabled");
}
// 关闭弹幕回调
function closeBarrage() {
    barrage.close();
    statusElement.html('关').removeClass('badge-success');

    $('#btn-close').attr('disabled',"true");
    $('#btn-send').attr('disabled',"true");
    $('#btn-open').removeAttr("disabled");
}
// 打开弹幕
openBarrage();
```

### API

#### events
<div id="barrage-api-events"></div>

#### methods
<div id="barrage-api-methods"></div>

<script>
new Vue({
    el: '#barrage-api-events',
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
                    name:'eventEmitter.MESSAGE_RECEIVE',
                    explain: '新消息事件，有新消息时触发',
                    data: 'message: Object 返回的新消息对象'
                }
            ]
        }
    }
});
new Vue({
    el: '#barrage-api-methods',
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
                    name:'Barrage',
                    explain: '弹幕构造函数',
                    param: '出始化参数:'
                    +      '<ul  style="margin-left:50px;">'
                    +            '<li>container: JQuery 对象 弹幕容器 必须</li>'
                    +            '<li>speed: number 移动速度，每秒移动多少个像素 可选（默认50）</li>'
                    +            '<li>top: number 弹幕出现上区间 可选（默认30） </li>'
                    +            '<li>bottom: number 弹幕出现下区间 可选（默认30） </li>'
                    +            '<li>trackHeight: number 弹幕轨道高度 可选（默认30） </li>'
                    +            '<li>maxLength: number 弹幕最大字符长度 可选（默认20） </li>'
                    +            '<li>textOnly: boolean 是否只显示文字 可选 （默认true）</li>'
                    +            '<li>renderContent: function 自定义弹幕样式渲染函数 可选 （默认不渲染）</li>'
                    +      '</ul>'
                },
                {
                    name: 'open',
                    explain: '开启弹幕',
                    param: '无'
                },
                {
                    name: 'close',
                    explain: '关闭弹幕',
                    param: '无'
                },
                {
                    name: 'isOpened',
                    explain: '弹幕是否开启',
                    param: '返回 true 表示弹幕已开启，false 表示弹幕未开启'
                }
            ]
        }
    }
});

</script>












