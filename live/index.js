function layout () {
    var all = $(window).height();

    if (all < 646) {
        all = 646;
    }

    var height = all - 46 - 44;
    $('#list-box').css('height', height);
    $('#user-list').css('height', height);
    $('#message-list').css('height', height - 100);
    $('#flash-player').css('height', (all - 46) / 2);
    $('#flash-player-user').css('height', (all - 46) / 2);
    $('object').css('height', (all - 46) / 2);

    $('.left').css('height', all - 44);
    var width = $(document).width();
    $('.left').css('width', width - 700);


    $('.left-content').css('width', width - 700 -30);
    $('#whiteboard').css('width', width - 700 -30);
    $('#barrage').css('width', width - 700 -30);


}
var query = BJY.query;

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

// 文档加载完成后
$(document).ready(function () {
    // 组件
    var barrage;
    var userList;
    var messageList;
    var messageSender;

    var eventEmitter = BJY.eventEmitter;
    var store = BJY.store;
    var Player = BJY.Player;
    var flash = Player.flash;
    flash.pluginUrl = location.protocol + '//www.baijiacloud.com/js-sdk/0.0.425/player/extension/flash.swf';
    flash.init();
    var teacherFlashPlayer;
    var userPlayer;

    var loading = BJY.Loading.create({
        // 父容器
        element: $('#loading .placeholder'),
        // logo URL 可自定义自己的加载 logo
        logoUrl: 'https://imgs.genshuixue.com/37797098_qsl3oz5g.jpg'
    });
    layout();

    eventEmitter
        // 监听 loading 开始加载事件， one() 函数表示事件只处理一次，若需要一直监听请使用 on() 函数
        .one(
            eventEmitter.LOADING_PANEL_START,
            function (event, data) {
                // loading 开始加载时要做的事情
            }
        )
        // 监听 loading 结束加载事件
        .one(
            eventEmitter.LOADING_PANEL_END,
            function (event, data) {
                // loading 结束加载时要做的事情

                // 销毁 Loading 对象，可在此销毁进度条，若此时直播尚未开始，可以先进入倒计时等待页面，直到接收到事件 eventEmitter.VIEW_RENDER_TRIGGER
                //loading.destroy();
                $('#loading').remove();
                $('#main').css('opacity', 1);
            }
        )
        // 监听初始化事件
        .one(
            eventEmitter.VIEW_RENDER_TRIGGER,
            function (event, data) {
                // 服务器已准备就绪，开始初始化业务界面，进入直播页面

                BJY.userStatus.watch(
                    BJY.store.get('user.number'),
                    '.screenStatus',
                    {
                        onMediaClosed: function () {
                            $('#player-screen-user').show();
                        }
                    }
                );

                // 加载直播需要的各种组件，包括播放器，白板，用户列表等等
                eventEmitter
                 .one(
                    eventEmitter.VIEW_RENDER_TRIGGER,
                    function (event, data) {
                        // 创建用户列表组件

                        userList = BJY.UserList.create({
                            element: $('#user-list .placeholder'),
                            renderUser: function (user, width, height) {
                                return {
                                    id: user.id,
                                    name: user.name,
                                    number: user.number,
                                    // 头像需压缩
                                    avatar: BJY.compressImage({
                                        url: user.avatar,
                                        width: width,
                                        height: height
                                    }),
                                    avatar2x: BJY.compressImage({
                                        url: user.avatar,
                                        width: width * 2,
                                        height: height * 2
                                    }),
                                    // 根据用户类型，配置角色的英文和本地语言
                                    role: userRoleMap[user.type].en,
                                    localRole: userRoleMap[user.type].cn
                                }
                            }
                        });

                        // 创建消息列表
                        messageList = BJY.MessageList.create({
                            element: $('#message-list .placeholder'),
                            renderEmoji: function (name, url) {
                                if (BJY.isAlicloudImage(url)) {
                                    return '<img ondragstart="return false" src="'
                                        + (url + '@100w_1e_1l.png')
                                        + '" srcset="'
                                        + (url + '@200w_1e_1l.png')
                                        + ' 2x">';
                                }
                                return '<img ondragstart="return false" src="' + url + '">';
                            },
                            renderImage: function (url) {
                                if (BJY.isAlicloudImage(url)) {
                                    return '<img ondragstart="return false" src="'
                                        + (url + '@100w_1e_1l.png')
                                        + '" srcset="'
                                        + (url + '@200w_1e_1l.png')
                                        + ' 2x">';
                                }
                                return '<img ondragstart="return false" src="' + url + '">';
                            },
                            renderUser: function (user, width, height) {
                                return {
                                    id: user.id,
                                    name: user.name,
                                    number: user.number,
                                    // 头像需压缩
                                    avatar: BJY.compressImage({
                                        url: user.avatar,
                                        width: width,
                                        height: height
                                    }),
                                    avatar2x: BJY.compressImage({
                                        url: user.avatar,
                                        width: width * 2,
                                        height: height * 2
                                    }),
                                    // 根据用户类型，配置角色的英文和本地语言
                                    role: userRoleMap[user.type].en,
                                    localRole: userRoleMap[user.type].cn,
                                }
                            },
                            loadDistance: 0
                        });

                        // 创建消息发送组件
                        messageSender = BJY.MessageSender.create({
                            element: $('#message-sender .placeholder'),
                            canSendEmoji: true,
                            multiline: true,
                            messageMaxLength: 140,
                            placeholder: '请输入...'
                        });

                        barrage = new BJY.Barrage({
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
                                return data.content;
                            }
                        });
                        openBarrage();

                        // 创建设置按钮
                        var speakerMenu = BJY.SpeakerMenu.create({
                            element: $('#menu-speaker'),
                            canAdjustVolume: true,
                            maxVolume: 100
                        });

                        var micMenu = BJY.MicMenu.create({
                            element: $('#menu-mic'),
                            maxVolume: 100
                        });

                        var cameraMenu = BJY.CameraMenu.create({
                            element: $('#menu-camera'),
                        });

                        BJY.userSpeak.init();

                        if (!store.get('class.isFree')) {
                            var speakApplyMenu = BJY.SpeakApplyMenu.create({
                            element: $('#menu-speak-apply')
                        });
                        }
                        // 文档白板
                        BJY.whiteboard.init({
                            element: $('#whiteboard .placeholder'),
                            fit: 1 // 1 自适应  2 撑满容器
                        });

                        userPlayer = new BJY.Player({
                            element: $('#flash-player-user'),
                            user: BJY.store.get('user'),
                            extension: flash
                        });
                    }
                );
            }
        )
        .on(
            eventEmitter.TEACHER_MEDIA_ON,
            function () {
                if (!teacherFlashPlayer) {
                    teacherFlashPlayer = new Player({
                        element: $('#flash-player'),
                        user: store.get('teacher'),
                        extension: flash
                    });
                    $('#player-screen').hide();
                }
            }
        )
        .on(
            eventEmitter.TEACHER_REMOVE,
            function () {
                if (teacherFlashPlayer) {
                    teacherFlashPlayer.dispose();
                    teacherFlashPlayer = null;
                    $('#player-screen').show();
                }
            }
        )
        .on(
            eventEmitter.CAMERA_MENU_CLICK,
            function () {
                var videoOn = BJY.store.get('user.videoOn');
                if (BJY.userPublish.setDevice(userPlayer, !videoOn) === true) {
                    $('#player-screen-user').hide();
                }
            }
        )
        .on(
            eventEmitter.MIC_MENU_CLICK,
            function () {
                var audioOn = BJY.store.get('user.audioOn');
                if (BJY.userPublish.setDevice(userPlayer, null, !audioOn) === true) {
                    $('#player-screen-user').hide();
                }
            }
        )
        .on(
            eventEmitter.DETECT_TOOL_SHOW_TRIGGER,
            function () {

            }
        )
        .on(
            eventEmitter.SPEAK_APPLY_CLICK,
            function () {
                BJY.userSpeak.startApply(10 * 1000);
            }
        )
        .on(
            eventEmitter.SPEAK_APPLY_CANCEL_CLICK,
            function () {
                BJY.userSpeak.cancelApply();
            }
        )
        .on(
            eventEmitter.SPEAK_END_CLICK,
            function () {
                BJY.userSpeak.stopSpeak(BJY.store.get('user.id'));
            }
        )
        .on(
            eventEmitter.MEDIA_SWITCH_TRIGGER,
            function (e, data) {
                if (BJY.userPublish.setDevice(userPlayer, data.videoOn, data.audioOn)) {
                    $('#player-screen-user').hide();
                }
            }
        )
        .on(
            // Window resize 事件
            eventEmitter.WINDOW_RESIZE,
            function () {
                layout();
                var height = $('.bjy-container canvas').css('height');
                $('#whiteboard').css('height', height);
                $('#barrage').css('height', height);

                var all = $(document).height();

                var top = all - parseInt(height) -44;
                $('.left-content').css('margin-top', top / 2);
            }
        )
        .on(
            eventEmitter.WHITEBOARD_LAYOUT_CHANGE,
            function () {
                // 重新设置白板的高度并让其居中
                var height = $('.bjy-container canvas').css('height');
                $('#whiteboard').css('height', height);
                $('#barrage').css('height', height);

                var all = $(window).height();
                var top = all - parseInt(height) -44;
                $('.left-content').css('margin-top', top / 2);
            }
        );

    var statusElement = $('.status');

    function sendMessage() {
        barrage.send(
            $('#barrage-input').val()
        );
    }

    var btnOpen = $('#btn-open');
    var btnClose = $('#btn-close');
    var btnSend = $('#btn-send');

    function openBarrage() {
        barrage.open();
        statusElement.html('开').addClass('badge-success');
        btnOpen.attr('disabled', 'true');
        btnClose.removeAttr('disabled');
        btnSend.removeAttr('disabled');
    }

    function closeBarrage() {
        barrage.close();
        statusElement.html('关').removeClass('badge-success');
        btnClose.attr('disabled','true');
        btnSend.attr('disabled','true');
        btnOpen.removeAttr('disabled');
    }

    // 初始化房间
    BJY.init({
        env: 'production',
        sign: query.sign,
        class: {
            id: query.room_id || '17062983320563',
        },
        // 当前进入教室的用户的信息
        // 如果是老师进教室，传老师的信息
        // 如果是学生进教室，传学生的信息
        // number 必须确保是唯一的，如果不唯一，后进的用户会踢掉先进的用户
        user: {
            number: query.user_number || '40721586',
            avatar: query.user_avatar || 'http://img.gsxservice.com/30517_djgkb6i6.jpeg',
            name: query.user_name || '太阳',
            type: '0'
        }
    });

    // tab切换按钮事件
    $('#btn-user-list').on('click',function () {
        $('.tab-content').css('margin-left', '-300px');
        $('#btn-user-list').addClass('tab-select');
        $('#btn-message-list').removeClass('tab-select');

    })
    $('#btn-message-list').on('click',function () {
        $('.tab-content').css('margin-left', '0');
        $('#btn-user-list').removeClass('tab-select');
        $('#btn-message-list').addClass('tab-select');
    })

    // 弹幕按钮事件
    btnSend.on('click', function () {
        sendMessage();
    });
    btnOpen.on('click', function () {
        openBarrage();
    });
    btnClose.on('click', function () {
        closeBarrage();
    })
})
