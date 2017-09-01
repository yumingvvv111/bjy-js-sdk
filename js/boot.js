var query = BJY.query;

BJY.init({
    env: 'production',
    sign: query.sign,
    class: {
        id: query.room_id || '17062983320563'
    },
    user: {
        number: query.user_number || '0',
        avatar: query.user_avatar || 'http://img.gsxservice.com/30517_djgkb6i6.jpeg',
        name: query.user_name || '用户昵称',
        type: 0
    }
});
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

function myBrowser(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1){
        return "Chrome";
    }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE浏览器
}
