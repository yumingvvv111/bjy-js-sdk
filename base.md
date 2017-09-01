### 引入

**1.本 SDK 需要使用 JQuery 库，因此在使用之前首先引入 JQuery 文件。**

```html
<script src="path/jquery.js"></script>
```
**2.不管你用到这个页面里的任何组件，都需要先引入以下文件。**
```html
<link rel="stylesheet" href="http://live-cdn.baijiacloud.com/js-sdk/{version}/classroom/classroom.css">
<script src="http://live-cdn.baijiacloud.com/js-sdk/{version}/classroom/classroom.js"></script>
```
### 初始化

**引入之后调用 `BJY.init()` 函数初始化直播服务。**
```javascript
BJY.init({
    env: '环境，可选值 test/beta/production，对于客户来说，统一传 production',
    sign: '签名', // 签名算法请参考 http://dev.baijiayun.com/default/wiki/detail/11 中的签名规则选项
    class: {
        id: '教室 id，需要在百家云后台开课，开完课后，把课程 id 传入',
        // 如果需要在后续用到教室相关的信息，可像这样写在下面
        // 如果不用，可省略
        name: '课程名称',
        startTime: '开始时间，精确到毫秒的时间戳',
        endTime: '结束时间，精确到毫秒的时间戳'
    },
    // 当前进入教室的用户的信息
    // 如果是老师进教室，传老师的信息
    // 如果是学生进教室，传学生的信息
    // number 必须确保是唯一的，如果不唯一，后进的用户会踢掉先进的用户
    user: {
        number: '用户 number',
        avatar: '头像地址',
        name: '用户昵称',
        type: '用户类型 0-学生 1-老师 2-助教'
    },
    // 如果知道当前教室的老师信息，可传入，否则可省略
    teacher: {
        number: '老师 number',
        avatar: '头像地址',
        name: '老师昵称',
        type: 1
    }
});
```
SDK 提供了一个工具方法用于解析 url 参数，使用方法如下：
```javascript
// 获取解析后的参数对象
var query = BJY.query;
// 通过访问对象属性获取参数值
var sign = query.sign;
...
```

### 图片相关

**直播平台中往往需要显示用户头像，比如在用户列表或者消息列表中。由于用户上传的头像图片可能比较大，因此需要使用到压缩功能，若图片 url 在 gsxservice.com 或 genshuixue.com 两个域名上，则用户可不用重写压缩函数，否则必须重写压缩函数。SDK 中集成了压缩工具，其使用方式如下：**

```javascript
/*
 * @param {string} url 原始图片 url
 * @param {number} width 压缩后的图片宽度
 * @param {number} height 压缩后的图片高度
 * @return {string} 压缩后的图片 url
 */
BJY.compressImage({
    url: url,
    width: width,
    height: height
});

例如图片的 url 为 http://www.domain.com/image1.jpg，
其宽度为1000像素，高度为1000像素；根据需要，头像的宽度和高度需要压缩到40像素。
则压缩后的 url 为：
url = BJY.compressImage({
        url: 'http://www.domain.com/image1.jpg',
        width: 40,
        height: 40
    });
```

### 事件

前面说过本 SDK 采用事件进行驱动，事件是各组件之间或组件内部进行数据交换的主要途径，因此接下来将介绍 SDK 中是如何进行事件的发射和接收。

!>所有事件传递的数据全部作为属性存储在一个 json 对象中

**1.事件的发射**

事件发射使用 `trigger` 方法，其使用方式如下：
`eventEmitter.trigger('事件名', '数据')`; 事件会进行全局广播，任何监听此事件的对象都会接收到事件并进行响应。
```javascript

// 获取事件处理对象
var eventEmitter = BJY.eventEmitter;

// 发射一个无数据的事件
eventEmitter.trigger(
        eventEmitter.WINDOW_RESIZE
    );

// 发射一个带数据的事件，以白板组件的事件为例：
eventEmitter.trigger(
        eventEmitter.WHITEBOARD_LAYOUT_CHANGE,
        // 注意所有的数据存储在一个对象中
        {
            scrollable: true,
            scrollableDistance: 1500,
            documentWidth: 800,
            documentHeight: 500
        }
    );
```

**2.事件的接收**

事件接收使用 `on` 方法 或 `one` 方法 ，其使用方式如下：
`eventEmitter.on('事件名', '回调处理')`
`eventEmitter.one('事件名', '回调处理')`

`on` 和 `one` 的区别在于使用 `on `方法监听事件时事件会一直监听下去，直到事件被解绑；而 `one `方法监听事件时只会监听一次；

```javascript

// 获取事件处理对象
var eventEmitter = BJY.eventEmitter;

// 监听一个无数据的事件
eventEmitter.on(
        eventEmitter.WINDOW_RESIZE,
        function () {
            // 要做的事
        }
    );

// 监听一个带数据的事件，以白板组件的事件为例：
eventEmitter.on(
        eventEmitter.WHITEBOARD_LAYOUT_CHANGE,
        function (e, data) {// 注意数据在第二个参数中，
            // 要做的事
            console.log(data.scrollableDistance);
        }
    );
```
**3.事件的解绑**

事件的解绑使用 `off` 方法，其使用方式为：`eventEmitter.off('事件名') `
```javascript

// 获取事件处理对象
var eventEmitter = BJY.eventEmitter;

// 解绑事件
eventEmitter.off(
        eventEmitter.WINDOW_RESIZE,
       );

// 有时候往往我们需要解绑许多事件，为了方便，可以对事件添加一个命名空间，这样解绑时只需要传入命名空间就可以同时解绑多个事件。

var namespace = '.my_namespace'; // 注意命名空间需要有一个点，名字可随意，但要唯一。
eventEmitter.on(
        eventEmitter.WHITEBOARD_LAYOUT_CHANGE + namespace, // 绑定事件时加上命名空间
        function (e, data) {// 注意数据在第二个参数中，
            // 要做的事
            console.log(data.scrollableDistance);
        }
    )
    ...
    .on(
        eventEmitter.WINDOW_RESIZE + namespace, // 绑定事件时加上命名空间
        function () {

        }
    );
// 全部解绑
eventEmitter.off(namespace);
```

**4.自定义事件**

SDK 的 eventEmitter 对象支持自定义事件扩展，只需要将自定义的事件名加入到 eventEmitter 对象中即可。

**注意事件名必须唯一，建议加上特定的前缀**

```javascript
var myEvent = {
    MY_EVENT_1: 'my_event_1',
    MY_EVENT_2: 'my_event_2',
    ...
    MY_EVENT_n: 'my_event_n',
}
// 调用 JQuery 的 extend() 方法进行扩展
$.extend(eventEmitter, myEvent);

// 之后就可对自定义事件进行发射和接收了
```

<!-- ### 关于图标

本 SDK 中组件使用的图标是百家云定制的默认图标，未引入图标会导致图标显示不正常，因此你需要导入自己定制的图标或者使用百家云的图标配置文件。

[百家云图标配置](./download/bjy-icomoon.zip)

下载上面的文件引入工程项目中并引入 `style.css` 文件。如果需要定制图标则更改相应类名下的 `content` 属性。你可以通过打开 `demo.html` 进行查看。 -->