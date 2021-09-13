export interface BackendConfig {
    loginType: 'sso' | 'phone'
    /**
     * @desc 部署资源定位。
     * 如果你的域名是 github.com，base是 '/'
     * 如果你的域名是 github.com/repo/，base是 '/repo/'
     */
    base: string
}
