function isIOS () {
    var u = navigator.userAgent;
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
}
function layout () {
    var width = $(window).width();

    $('.video').css('height', width * 0.75);

    $('#play').css('left', width / 2 - 40);

    $('.list-section').css('top', width * 0.75);
}
var query = BJY.query;

// 给自己的用户类型设置中英文术语
var userRoleMap = { };
var config = BJY.config;
var mediaData = BJY.data.media;

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
    var  html = Player.html;
    html.showControls = true;
    html.init();
    var teacherH5Player;
    var playButton = $('#play');

    layout();

    var loading = BJY.Loading.create({
        // 父容器
        element: $('#loading .placeholder'),
        // logo URL 可自定义自己的加载 logo
        logoUrl: 'https://imgs.genshuixue.com/37797098_qsl3oz5g.jpg'
    });

    eventEmitter
        .on(
            eventEmitter.CLASSROOM_CONNECT_FAIL,
            function () {
                alert('网络已断开，请检查网络连接或者刷新页面重新进入房间');
            }
        )
        .on(
            eventEmitter.LOGIN_CONFLICT,
            function () {
                alert('你已被踢，请确认用户 number 是否唯一或者刷新页面重新进入房间');
            }
        )
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
                // 加载直播需要的各种组件，包括播放器，白板，用户列表等等
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
                    placeholder: '请输入...',
                    emotionList: {
                        emotionPerRow: 6,
                        rowPerPage: 4,
                    }
                });

                mediaData.setSpeakerVolume(100);

                $('.bjy-message-sender textarea').focus(function () {
                    $('.list-section').css('top', 0);
                    $('.video').css('display', 'none');
                });
                $('.bjy-message-sender textarea').blur(function () {
                    var width = $(window).width();
                    $('.list-section').css('top', width * 0.75);
                    $('.video').css('display', 'block');
                });

                // if (isIOS) {
                //     playButton.removeClass('hidden');
                //     playButton.on('click', function () {
                //         // 如果当前播放器正在播放，先关掉播放器
                //         if (teacherH5Player.videoOn || teacherH5Player.audioOn) {
                //             teacherH5Player.playAVClose();
                //         }
                //         // 播放视频
                //         teacherH5Player.playAV(
                //             store.get('teacher.videoOn')
                //         );
                //     });
                // }
            }
        )
        .on(
            eventEmitter.TEACHER_MEDIA_ON,
            function () {
                if (!teacherH5Player) {
                    teacherH5Player = new Player({
                        element: $('#h5-player'),
                        user: store.get('teacher'),
                        extension: html
                    });
                    $('#player-screen').hide();
                }
            }
        )
        .on(
            eventEmitter.TEACHER_REMOVE,
            function () {
                if (teacherH5Player) {
                    teacherH5Player.dispose();
                    teacherH5Player = null;
                    $('#player-screen').show();
                }
            }
        )
        .on(
            // 正在加载视频事件
            eventEmitter.HTML_VIDEO_LOAD_START,
            function () {
                console.log('正在加载视频');
            }
        )
        .on(
            // 视频开始播放事件
            eventEmitter.HTML_VIDEO_PLAY,
            function () {
                console.log('视频开始播放');
                playButton.addClass('hidden');
            }
        )
        .on(
            // 视频暂停事件
            eventEmitter.HTML_VIDEO_PAUSE,
            function () {
                console.log('视频暂停');
                playButton.removeClass('hidden');
            }
        )
        .on(
            // 视频加载超时事件
            eventEmitter.HTML_VIDEO_LOAD_TIMEOUT,
            function () {
                console.log('视频加载超时');
                playButton.removeClass('hidden');
            }
        )
        .on(
            // 视频加载失败事件
            eventEmitter.HTML_VIDEO_LOAD_FAIL,
            function () {
                console.log('视频加载失败');
                playButton.removeClass('hidden');
            }
        )
        .on(
            // 正在加载音频事件
            eventEmitter.HTML_AUDIO_LOAD_START,
            function () {
                console.log('正在加载音频');
            }
        )
        .on(
            // 音频开始播放事件
            eventEmitter.HTML_AUDIO_PLAY,
            function () {
                console.log('音频开始播放');
                playButton.addClass('hidden');
            }
        )
        .on(
            // 音频暂停事件
            eventEmitter.HTML_AUDIO_PAUSE,
            function () {
                console.log('音频暂停');
                playButton.removeClass('hidden');
            }
        )
        .on(
            // 音频加载超时事件
            eventEmitter.HTML_AUDIO_LOAD_TIMEOUT,
            function () {
                console.log('音频加载超时');
                playButton.removeClass('hidden');
            }
        )
        .on(
            // 音频加载失败事件
            eventEmitter.HTML_AUDIO_LOAD_FAIL,
            function () {
                console.log('音频加载失败');
                playButton.removeClass('hidden');
            }
        );

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
            number: query.user_number || '0',
            avatar: query.user_avatar || 'http://img.gsxservice.com/30517_djgkb6i6.jpeg',
            name: query.user_name || '太阳',
            type: '0'
        }
    });

    // tab切换按钮事件
    $('#btn-user-list').on('click',function () {
        $('.tab-content').css('margin-left', -1 * $(window).width());
        $('#btn-user-list').addClass('tab-select');
        $('#btn-message-list').removeClass('tab-select');

    })
    $('#btn-message-list').on('click',function () {
        $('.tab-content').css('margin-left', '0');
        $('#btn-user-list').removeClass('tab-select');
        $('#btn-message-list').addClass('tab-select');
    })
})

