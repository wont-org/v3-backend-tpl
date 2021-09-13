import {
    RouteRecordRaw, Router 
} from 'vue-router'
import { CarryOutOutlined } from '@ant-design/icons-vue'
import { Button } from 'ant-design-vue'
import Layout from '@/pages/Layout'
import Result from '@/components/Result'
import Welcome from '@/components/Welcome'

/**
 * @desc 路由path可以重复，但是name绝对不可以重复！name命名规范 menuPath1.menuPath11
 * 一级菜单必须有Icon
 * 一级菜单必须设置redirect且指向第一个子菜单
 * >=二级菜单才可设置keepAlive
 * hideSubRoute 场景：二级菜单下的查看详情
 * showSubRouterView hideSubRoute为true时查看详情必须为true
 */
export const menuRoutes: RouteRecordRaw[] = [
    {
        path: '/TemplateList',
        name: 'TemplateList',
        component: Layout,
        meta: {
            title: '功能示范',
            Icon: CarryOutOutlined,
        },
        children: [
            {
                path: 'TablePage',
                name: 'TemplateList.TablePage',
                component: () => import('@/pages/TemplateList/TablePage'),
                meta: {
                    title: '表格页模板',
                    keepAlive: true,
                    hideSubRoute: true,
                },
                children: [
                    {
                        path: 'Detail',
                        name: 'TemplateList.TablePage.View',
                        component: () =>
                            import('@/pages/TemplateList/TablePage/Detail'),
                        meta: {
                            title: '仅查看',
                            showSubRouterView: true,
                        },
                        props: {
                            operaType: 'view',
                        },
                    },
                    {
                        path: 'Deliver',
                        name: 'TemplateList.TablePage.Deliver',
                        component: () =>
                            import('@/pages/TemplateList/TablePage/Detail'),
                        meta: {
                            title: '可操作',
                            showSubRouterView: true,
                        },
                        props: {
                            operaType: 'deliver',
                        },
                    },
                ],
            },
        ],
    },
]

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: '/',
        component: Layout,
        meta: {
            title: '首页',
        },
        redirect: '/Welcome',
        children: [
            {
                path: 'Welcome',
                name: 'Welcome',
                component: Welcome,
                meta: {
                    title: '欢迎',
                    isHidden: true,
                    hideSubRoute: true,
                },
            },
        ],
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/pages/Login'),
        meta: {
            title: '登录',
            hideTab: true,
        },
    },
    ...menuRoutes,
    {
        path: '/:pathMatch(.*)',
        name: '404',
        component: Layout,
        meta: {
            title: '页面未找到',
        },
        redirect: '/notFound/404',
        children: [
            {
                path: '404',
                name: '404/404',
                component: (
                    <Result
                        title="404"
                        subTitle="抱歉，你访问的页面不存在"
                        status="404"
                    >
                        {({ router }: { router: Router }) => (
                            <Button
                                type="primary"
                                ghost
                                onClick={() => {
                                    router.back()
                                }}
                            >
                                返回
                            </Button>
                        )}
                    </Result>
                ),
                meta: {
                    title: '404',
                    isHidden: true,
                    hideSubRoute: true,
                },
            },
        ],
    },
    {
        path: '/cargoUpload',
        name: 'CargoUpload',
        component: () => import('@/pages/CargoUpload'),
        meta: {
            title: '图片上传',
            hideTab: true,
        },
    },
]
