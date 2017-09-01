### 概述

文档白板主要是为教学场景设计的。可以展示老师上课所需的课件。

**使用文档白板组件需要引入以下文件：**
```html
<link rel="stylesheet" href="http://live-cdn.baijiacloud.com/js-sdk/{version}/whiteboard/whiteboard.css">
<script src="http://live-cdn.baijiacloud.com/js-sdk/{version}/whiteboard/whiteboard.js"></script>
```

### 示例

<iframe frameborder=0 width=800 height=500 marginheight=0 marginwidth=0 scrolling=no src=./iframe/whiteboard.html></iframe>

!>注意：1.whiteboard 加宽度和高度 2.whiteboard position 属性不能为 static

```html
<!-- 白板父容器的宽度和高度变化时，白板会自适应变化。 -->
<!-- 当更改父容器的高宽时需要触发 eventEmitter.WINDOW_RESIZE 事件通知白板更新 -->
<!-- eventEmitter.WINDOW_RESIZE 是 SDK 中封装的 resize 事件，与游览器的 resize 事件等价 -->
<div id="whiteboard">
    <div class="placeholder"></div>
</div>
```

```javascript
// 调用 whiteboard

var whiteBoard = BJY.whiteboard.init({
    element: $('#whiteboard .placeholder'),
    // 填充模式： 1 自适应  2 撑满容器
    fit: 1
});
```

### API

#### events
<div id="whiteboard-api-events"></div>

!>注意翻页具有权限操作，学生最多只能翻到老师的当前页，老师没有展示的页码学生不能翻页

#### methods
<div id="whiteboard-api-methods"></div>

<script>
new Vue({
    el: '#whiteboard-api-events',
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
                    name:'eventEmitter.WHITEBOARD_LAYOUT_CHANGE',
                    explain: '白板布局更改时触发',
                    data: '<ul class="table-ul">'
                    +           '<li>scrollable: boolean 白板是否可滚动</li>'
                    +           '<li>scrollableDistance: number 白板可滚动长度（单位 px）</li>'
                    +           '<li>documentWidth: number 白板宽度 （单位 px）</li>'
                    +           '<li>documentHeight: number 白板高度 （单位 px）</li>'
                    +     '</ul>'
                },
                {
                    name:'eventEmitter.WINDOW_RESIZE',
                    explain: '窗口 resize 时触发，用于白板大小自适应',
                    data: '无'
                },
                {
                    name:'eventEmitter.DOC_IMAGE_LOAD_START',
                    explain: '文档图片加载开始',
                    data: '无'
                },
                {
                    name:'eventEmitter.CURRENT_DOC_IMAGE_LOAD_START',
                    explain: '当前文档图片加载开始',
                    data: '无'
                },
                {
                    name:'eventEmitter.DOC_IMAGE_LOAD_END',
                    explain: '文档图片加载结束',
                    data: '无'
                },
                {
                    name:'eventEmitter.CURRENT_DOC_IMAGE_LOAD_END',
                    explain: '当前文档图片加载结束',
                    data: '无'
                },
                {
                    name:'eventEmitter.DOC_IMAGE_LOAD_SUCCESS',
                    explain: '文档图片加载成功',
                    data: '无'
                },
                {
                    name:'eventEmitter.CURRENT_DOC_IMAGE_LOAD_SUCCESS',
                    explain: '当前文档图片加载成功',
                    data: '无'
                },
                {
                    name:'eventEmitter.DOC_IMAGE_LOAD_ABORT',
                    explain: '文档图片加载中止',
                    data: '无'
                },
                {
                    name:'eventEmitter.CURRENT_DOC_IMAGE_LOAD_ABORT',
                    explain: '当前文档图片加载中止',
                    data: '无'
                },
                {
                    name:'eventEmitter.DOC_IMAGE_LOAD_FAIL',
                    explain: '文档图片加载错误',
                    data: '无'
                },
                {
                    name:'eventEmitter.CURRENT_DOC_IMAGE_LOAD_FAIL',
                    explain: '当前文档图片加载错误',
                    data: '无'
                },
                {
                    name:'eventEmitter.DOC_IMAGE_LOAD_TIMEOUT',
                    explain: '文档图片加载超时',
                    data: '无'
                },
                {
                    name:'eventEmitter.CURRENT_DOC_IMAGE_LOAD_TIMEOUT',
                    explain: '当前文档图片加载超时',
                    data: '无'
                },
                {
                    name:'eventEmitter.DOC_IMAGE_NOT_FOUND',
                    explain: '文档图片没有找到',
                    data: '无'
                },
                {
                    name:'eventEmitter.PAGE_SHAPE_LOAD_START',
                    explain: '页标注加载开始',
                    data: '无'
                },
                {
                    name:'eventEmitter.PAGE_SHAPE_LOAD_END',
                    explain: '页标注加载结束',
                    data: '无'
                },
                {
                    name:'eventEmitter.CURRENT_PAGE_SHAPE_LOAD_END',
                    explain: '当前页标注加载结束',
                    data: '无'
                },
                {
                    name:'eventEmitter.PAGE_PREV_TRIGGER',
                    explain: '白板翻前一页',
                    data: '无'
                },
                {
                    name:'eventEmitter.PAGE_NEXT_TRIGGER',
                    explain: '白板翻后一页',
                    data: '无'
                },
                {
                    name: 'eventEmitter.PAGE_CHANGE_TRIGGER',
                    explain: '白板翻到指定页码',
                    data: 'page: number 指定页码'
                },
                // {
                //     name: 'eventEmitter.DOC_FIT_CHANGE_TRIGGER',
                //     explain: '切换课件自适应方式',
                //     data: 'fit: number 自适应方式（自适应 ：1 填满容器：2）'
                // },
                // {
                //     name: 'eventEmitter.DOC_QUALITY_CHANGE_TRIGGER',
                //     explain: '切换课件质量方式',
                //     data: 'quality: number 课件质量（低：1 高：2）'
                // },
                {
                    name: 'eventEmitter.SERVER_PAGE_CHANGE',
                    explain: '老师或助教翻页，此事件所有客户端都会触发，也就是所有客户端都会进行翻页操作，包括老师、助教和所有同学',
                    data: '<ul class="table-ul">'
                    +           '<li>page: number 翻页页码</li>'
                    +           '<li>step: number 当前页的动画播放步数</li>'
                    +     '</ul>'
                },
                {
                    name: 'eventEmitter.CLIENT_PAGE_CHANGE',
                    explain: '学生翻页，只改变学生自己本地客户端的页码，注意翻页不能超过老师的当前页码',
                    data: '<ul class="table-ul">'
                    +           '<li>page: number 翻页页码</li>'
                    +           '<li>step: number 当前页的动画播放步数</li>'
                    +     '</ul>'
                },
                {
                    name: 'eventEmitter.PAGE_CHANGE_START',
                    explain: '翻页开始时触发，可用于更新白板状态',
                    data: '<ul class="table-ul">'
                    +           '<li>page: number 翻页页码</li>'
                    +           '<li>step: number 当前页的动画播放步数</li>'
                    +           '<li>hasPrevPage: boolean 是否有前一页</li>'
                    +           '<li>hasNextPage: boolean 是否有后一页</li>'
                    +     '</ul>'
                }
            ]
        }
    }
});
new Vue({
    el: '#whiteboard-api-methods',
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
                    explain: '白板初始化函数',
                    param: '出初始化参数:'
                    +      '<ul  style="margin-left:50px;">'
                    +            '<li>element: JQuery 对象 播放器容器 必须</li>'
                    +            '<li>fit: number 填充模式（自适应 ：1 填满容器：2）必须</li>'
                    +      '</ul>'
                }
            ]
        }
    }
});
</script>












