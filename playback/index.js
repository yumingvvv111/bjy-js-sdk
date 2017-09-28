var userVideos;
var video = videojs('bjy-player-teacher');
var video2 = videojs('bjy-player-user');

function layout () {
    var all = $(window).height();

    if (all < 646) {
        all = 646;
    }

    var height = all - 46 - 40;
    $('#list-box').css('height', height);
    $('#user-list').css('height', height);
    $('#message-list').css('height', height);

    $('#flash-player').css('height', (all - 40) / 2);
    video.height((all - 40) / 2);

    $('#flash-player-user').css('height', (all - 40) / 2);
    video2.height((all - 40) / 2);

    $('.picture').css('margin-top', ((all - 40) / 2 - 100) / 2 );

    $('.left').css('height', all - 40);
    var width = $(document).width();
    $('.left').css('width', width - 700);


    $('#whiteboard').css('width', width - 700 -40);
    $('#whiteboard').css('height', all -40 - 120);
    $('#barrage').css('width', width - 700 -40);

    var boardHeight = parseInt($('.bjy-container canvas').css('height'));
    $('#barrage').css('height', boardHeight);
    $('#barrage').css('top', 60 + (all - 40 - 120 - boardHeight) / 2);

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

    var loading = BJY.Loading.create({
        // 父容器
        element: $('#loading .placeholder'),
        // logo URL 可自定义自己的加载 logo
        logoUrl: 'https://imgs.genshuixue.com/37797098_qsl3oz5g.jpg'
    });


    var onPlaying = function () {
        BJY.playback.play();
    };
    var onPause = function () {
        console.log('onpause');
        BJY.playback.pause();
    };
    var onSeeked = function () {
        console.log('onseeked');
        BJY.playback.seek(video.currentTime());
        BJY.playback.play();
        console.log(video.currentTime());
    };

    eventEmitter
        .on(
            // Window resize 事件
            eventEmitter.WINDOW_RESIZE,
            function () {
                layout();
            }
        )
        .on(
            eventEmitter.WHITEBOARD_LAYOUT_CHANGE,
            function () {
                // 重新设置白板的高度并让其居中
                layout();
            }
        )
        .on(
            eventEmitter.DOC_IMAGE_LOAD_START,
            function () {
                console.log('翻页开始');
            }
        )
        .on(
            eventEmitter.DOC_IMAGE_LOAD_END,
            function () {
                console.log('翻页结束');
            }
        )
        .on(
            eventEmitter.PLAYBACK_SEEK_START,
            function () {
                 barrage.close();;
            }
        )
        .on(
            eventEmitter.PLAYBACK_SEEK_END,
            function () {
                 barrage.open();;
            }
        )
        .on(
            eventEmitter.MEDIA_PUBLISH,
            function (event, data) {
                // 主讲不做处理
                // if (data.user.type == BJY.config.ROLE_TYPE_ASSISTANT) {
                //     if (data.audioOn || data.videoOn) {
                //         console.log('播放助教的视频>:' + data.offsetTimestamp)
                //     }
                // }
                // if (data.user.type == BJY.config.ROLE_TYPE_GUEST) {
                //     if (data.audioOn || data.videoOn) {
                //         console.log('播放游客的视频>:' + data.offsetTimestamp)
                //     }
                // }
                // if (data.user.type == BJY.config.ROLE_TYPE_PUBLIC) {
                //     if (data.audioOn || data.videoOn) {
                //         console.log('播放百家云公用帐号的视频>:' + data.offsetTimestamp)
                //     }
                // }
                if (data.user.type == BJY.config.ROLE_TYPE_STUDENT) {
                    video2.src(userVideos[166973].low[0].url);
                    video2.ready(function () {
                        video2.play();
                        if (data.audioOn || data.videoOn) {
                            console.log('播放学生' + data.user.id + '的视频>:' + data.offsetTimestamp)
                            console.log('播放学生' + (video.currentTime - data.offsetTimestamp))
                        }
                        else {
                            console.log('关闭学生' + data.user.id + '的视频>:' + data.offsetTimestamp)
                        }
                    });

                }
            }
        );

    store.watch('teacher.videoOn', function (videoOn) {
        console.log('老师摄像头是否开启', videoOn);
    });
    store.watch('teacher.audioOn', function (audioOn) {
        console.log('老师麦克风是否开启', audioOn);
    });

    var statusElement = $('.status');


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
    BJY.playback.init({
        env: 'production',
        token: 'h7SYwi1gs7xNV8ralNcYMmtbTxbxG8pCsJTdjls6NhL92yXkv67pBg',
        class: {
            id: '17091893802171'
        },
        user: {
            number: '13147056',
            avatar: 'http://static.sunlands.com/newUserImagePath/13147056/40_40/13147056.jpg',
            name: 'xxx',
            type: 0
        }
    })
    .then(function (data) {
        console.log('11111');
        console.log(data);

        $('#loading').remove();
        $('#main').css('opacity', 1);

        // 加载回放需要的各种组件，包括播放器，白板，用户列表等等
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

        // 文档白板
        BJY.whiteboard.init({
            element: $('#whiteboard .placeholder'),
            fit: 1 // 1 自适应  2 撑满容器
        });

        layout();


        BJY.playback.start();

        if (data.videos) {
            video.src(data.videos.low[0].url);
            video.ready(function() {
                $('#player-screen').hide();
                video.play();

                video.on('play', function () {
                    onPlaying();
                });
                video.on('pause', function () {
                    onPause();
                });
                video.on('seeked', function () {
                    onSeeked();
                })
            });

        }

        if (data.userVideos) {
            userVideos = data.userVideos;
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
    btnOpen.on('click', function () {
        openBarrage();
    });
    btnClose.on('click', function () {
        closeBarrage();
    })
})
