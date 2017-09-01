### 概述

展现当前在线的用户。用户列表默认加载前10个用户信息，用户可以下滑列表滑块加载其余的用户信息，直到全部加载完毕。

**使用用户列表组件需要引入以下文件：**

### 依赖
```html
<link rel="stylesheet" href="http://live-cdn.baijiacloud.com/js-sdk/{version}/user/userList/UserList.css">
<script src="http://live-cdn.baijiacloud.com/js-sdk/{version}/user/userList/UserList.js"></script>
```
### 示例
<iframe frameborder=0 width=400 height=400 marginheight=0 marginwidth=0 scrolling=no src=./iframe/user-list.html></iframe>


!>注意：1.user-list 加宽度和高度 2.user-list position 属性不能为 static

```html
<div id="user-list">
    <div class="placeholder"></div>
</div>
```

```javascript
// 给自己的用户类型设置中英文术语
var userRoleMap = { };
var config = BJY.config;
userRoleMap[ config.ROLE_TYPE_TEACHER ] = {
    en: 'teacher',
    cn: '老师'
};
userRoleMap[ config.ROLE_TYPE_ASSISTANT ] = {
    en: 'assistant',
    cn: '助教'
};
userRoleMap[ config.ROLE_TYPE_STUDENT ] = {
    en: 'student',
    cn: '学生'
};
userRoleMap[ config.ROLE_TYPE_GUEST ] = {
    en: 'guest',
    cn: '游客'
};
eventEmitter
     .one(
        // 在 eventEmitter.VIEW_RENDER_TRIGGER 事件下创建组件
        eventEmitter.VIEW_RENDER_TRIGGER,
        function (event, data) {
            // 创建用户列表组件
            var userList = BJY.UserList.create({
                // 组件占位元素
                element: $('#user-list .placeholder'),
                // 配置用户渲染属性 必须
                renderUser: function (user, width, height) {
                    return {
                        id: user.id,
                        name: user.name,
                        number: user.number,
                        // 低密度屏幕压缩，详情查看基础第二条
                        avatar: BJY.compressImage({
                            url: user.avatar,
                            // 对于低密度屏幕将图片压缩到头像的大小
                            width: width,
                            height: height
                        }),
                        // 高密度屏幕压缩，详情查看基础第二条
                        avatar2x: BJY.compressImage({
                            url: user.avatar,
                            // 对于高密度屏幕（如 MAC）将图片压缩到头像的2倍大小
                            width: width * 2,
                            height: height * 2
                        }),
                        // 根据用户类型，配置角色的英文术语
                        role: userRoleMap[user.type].en,
                        // 根据用户类型，配置角色的中文术语
                        localRole: userRoleMap[user.type].cn
                    }
                }
            });
        }
    );
```

### API

#### events
<div id="user-list-api-events"></div>

#### methods
<div id="user-list-api-methods"></div>
<script>

new Vue({
    el: '#user-list-api-events',
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
                //     name:'eventEmitter.USER_LIST_CLEAR',
                //     explain: '刷新用户列表时触发',
                //     data: '无'
                // },
                {

                    name:'eventEmitter.USER_MORE_RES',
                    explain: '刷新未加载用户信息时触发',
                    data: '<ul class="table-ul">'
                    +           '<li>fetching: boolean  刷新操作锁，表示是否可以进行刷新操作</li>'
                    +           '<li>hasMore: boolean 是否还有没加载的用户</li>'
                    +      '</ul>'
                },
                {
                    name:'eventEmitter.TEACHER_ADD',
                    explain: 'teacher 进入房间时触发',
                    data: 'userList: Array 当前加入房间的 teacher 信息数组'
                },
                {
                    name:'eventEmitter.ASSISTANT_ADD',
                    explain: 'assistant 进入房间时触发',
                    data: 'userList: Array 当前加入房间的 assistant 信息数组'
                },
                {
                    name:'eventEmitter.STUDENT_ADD',
                    explain: 'student 进入房间时触发',
                    data: 'userList: Array 当前加入房间的 student 信息数组'
                },
                {
                    name:'eventEmitter.GUEST_ADD',
                    explain: 'guest 进入房间时触发',
                    data: 'userList: Array 当前加入房间的 guest 信息数组'
                },
                {
                    name:'eventEmitter.TEACHER_REMOVE',
                    explain: 'teacher 离开房间时触发',
                    data: 'user: Object 离开房间的 teacher 信息对象'
                },
                {
                    name:'eventEmitter.ASSISTANT_REMOVE',
                    explain: 'assistant 离开房间时触发',
                    data: 'user: Object 离开房间的 assistant 信息对象'
                },
                {
                    name:'eventEmitter.STUDENT_REMOVE',
                    explain: 'student 离开房间时触发',
                    data: 'user: Object 离开房间的 student 信息对象'
                },
                {
                    name:'eventEmitter.GUEST_REMOVE',
                    explain: 'guest 离开房间时触发',
                    data: 'user: Object 离开房间的 guest 信息对象'
                }
            ]
        }
    }
});
new Vue({
    el: '#user-list-api-methods',
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
                    explain: '创建 UserList 模块实例',
                    param: 'UserList 初始化参数:'
                    +      '<ul style="margin-left:50px;">'
                    +            '<li>element: JQuery对象 占位容器 必须</li>'
                    +            '<li>renderUser: function 用户自定义的用户列表配置属性 必须</li>'
                    +            '<li>avatarSize: number 头像大小（像素）可选（默认为36像素）</li>'
                    +            '<li>loadDistance: number 定义列表滑块离顶部多少像素时拉取历史消息 可选（默认为50）</li>'
                    +      '</ul>'
                },
                {
                    name: 'destroy',
                    explain: '销毁 UserList 对象，用于对象使用结束后调用',
                    param: '无'
                }
            ]
        }
    }
});
</script>

