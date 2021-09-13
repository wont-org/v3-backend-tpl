/**
 * 常量命名规范
 * 变量外层统一大写, egg IMG_XXX
 * 内层小写
 */
export const IMG = {
    // 图片兜底图
    default:
        'https://cdn.wanwudezhi.com/static/web-static/image/ce92ce805877c85b39f826adb7f37738_194x195.png',
    logo: '/favicon.ico',
}

export const AUDIO = {
    error: 'https://cdn.wanwudezhi.com/static/web-static/audio/3e9297630ff8e56641158c571172c215.mp3',
}

// 正则集合
export const REG_EXP = {
    site: /^[A-Z](-\d{2}){4}$/,
}

export const KEYS = {
    // 业务标识，比如 github_token
    tokenkey: '__your_service_id_token__',
    userInfoKey: '__your_service_id_userInfo__',
    // sso登录最小请求间隔时间(防止无限重定向)
    ssoLoginSignKey: '__your_service_id_sso_login_timestamp__',
    tabKey: 'cloud_wms_tab',
}
