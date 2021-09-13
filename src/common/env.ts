export interface SiteItem {
    path: string
    label: string
    env: 'dev' | 'pre' | 'prod'
}
// TODO 替换你项目对应的地址
export const site: SiteItem[] = [
    {
        path: '',
        label: '测试环境',
        env: 'dev',
    },
    {
        path: '',
        label: '预发环境',
        env: 'pre',
    },
    {
        path: '',
        label: '正式环境',
        env: 'prod',
    },
]
