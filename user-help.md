### 概述

用户帮助组件用于定制用户帮助模块，模块内容采用http链接调用，通过点击链接跳转到网页中查看帮助。

**使用用户帮助组件需要引入以下文件：**
```html
<link rel="stylesheet" href="http://live-cdn.baijiacloud.com/js-sdk/{version}/help/Help.css">
<script src="http://live-cdn.baijiacloud.com/js-sdk/{version}/help/Help.js"></script>
```

### 示例

<div id="help" ></div>

```javascript
// 通过调用 Helper 组件的 create 方法创建一个 Helper 实例
// element为包裹组件实例的父节点
var helper = BJY.Helper.create({
    element: $('#helper'),
    // 点击QQ帮助按钮的回调函数
    onQQClick: function(){
        // 处理QQ帮助
    },
    // 点击电话帮助按钮的回调函数
    onTelClick: function(){
        // 处理电话帮助
    },
});
...
// 使用结束后销毁对象
helper.destroy();
```

### API

#### methods
<div id="user-help-api-methods"></div>

<script>

new Vue({
    el: '#user-help-api-methods',
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
                    explain: '创建 Helper 模块实例',
                    param: 'Helper 初始化参数:'
                    +      '<ul style="margin-left:50px;">'
                    +            '<li>element: JQuery对象 父节点容器 必须</li>'
                    +            '<li>list: Array 需要显示的帮助问题选项，其 item 值是一个对象，拥有 url 和 text 两个属性 可选</li>'
                    +            '<li>moreLink: string 更多链接按钮的 url 可选</li>'

                    +            '<li>onQQClick: function 点击 QQ 帮助按钮的回调函数 可选</li>'
                    +            '<li>onTelClick: function 点击电话帮助按钮的回调函数 可选</li>'

                    +      '</ul>'
                },
                {
                    name: 'destroy',
                    explain: '销毁 Helper 对象，用于对象使用结束后调用',
                    param: '无'
                }
            ]
        }
    }
});
var help = BJY.Helper.create({
    element: $('#help'),
    onQQClick: function(){alert('QQHelper')},
    onTelClick: function(){alert('telHelper')},
});
</script>











