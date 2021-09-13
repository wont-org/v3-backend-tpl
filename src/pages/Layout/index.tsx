import {
    defineComponent,
    reactive,
    KeepAlive,
    watch,
    DefineComponent,
    Transition,
} from 'vue'
import {
    Layout, Menu, Breadcrumb, Dropdown, Avatar 
} from 'ant-design-vue'
import {
    RouterView, useRouter, useRoute, RouterLink 
} from 'vue-router'
import {
    UserOutlined, LogoutOutlined 
} from '@ant-design/icons-vue'
import { useStore } from 'vuex'
import {
    get, compact 
} from 'lodash'
import SubSiderMenu from '@/pages/Layout/components/SubSiderMenu'
import { IMG } from '@/common/constant'
import ModalForm from '@/components/ModalForm'
// routes文件引用放入下层，避免 hmr 依赖报错
import { menuRoutes } from '@/router/routes'
import SwitchEnv from './components/SwitchEnv'
import MultiTabs from './components/MultiTabs'

import style from './index.module.less'

interface StateRef {
    collapsed: boolean
    selectedKeys: string[]
    openKeys: string[]
}

export default defineComponent({
    name: 'Layout',
    setup() {
        const router = useRouter()
        const route = useRoute()
        const store = useStore()
        const userInfo = get(store, 'getters.user/getUserInfo', {})
        const { avatar, unick } = userInfo
        // console.log('userInfo :>> ', userInfo)
        // console.log('warehouseOpt :>> ', warehouseOpt)

        const getMenuProps = () => {
            const showSubRouterView = get(
                route,
                'meta.showSubRouterView',
                false
            )
            const firstMatchLen =
                route.matched.length - (showSubRouterView ? 2 : 1)
            const openKey: string = get(route, `matched[${0}].path`, '')
            const selectedPath: string = get(
                route,
                `matched[${firstMatchLen}].path`,
                ''
            )
            const selectPathArr = compact(selectedPath.split('/'))
            // console.log('selectPathArr :>> ', selectPathArr)
            return {
                openKey,
                selectedKeys: get(selectPathArr, '[1]', ''),
                showSubRouterView,
            }
        }

        const stateRef: StateRef = reactive({
            collapsed: false,
            selectedKeys: [],
            openKeys: [],
        })
        // a详情跳b详情，菜单对应展开
        watch(
            () => route.fullPath,
            (preFullPath, curFullPath) => {
                // console.log('preRoute, curRoute :>> ', preFullPath, curFullPath)
                if (preFullPath !== curFullPath) {
                    const { openKey, selectedKeys } = getMenuProps()
                    // console.log('openKey, selectedKeys :>> ', openKey, selectedKeys, route)

                    store.commit('tabs/addTab', {
                        fullPath: route.fullPath,
                        title: route.meta.title,
                        hideTab: route?.meta?.hideTab,
                        isFirstMounted: !curFullPath,
                    })

                    stateRef.selectedKeys = [selectedKeys]
                    stateRef.openKeys = [openKey]
                }
            },
            {
                immediate: true,
            }
        )

        const handleRoute = ({ keyPath }: { keyPath: string[] }) => {
            const curPath = keyPath.join('/')
            // console.log('curPath :>> ', curPath, keyPath)
            router.push(curPath)
        }

        const UserMenu = (
            <Menu>
                <Menu.Item>
                    <>
                        <LogoutOutlined />
                        <span
                            onClick={() => {
                                store.commit('user/logout')
                            }}
                        >
                            退出登录
                        </span>
                    </>
                </Menu.Item>
            </Menu>
        )

        return () => {
            const keepAlive = get(route, 'meta.keepAlive', false)
            const menu = getMenuProps()
            const { showSubRouterView } = menu
            // console.log('menu :>> ', menu)
            // console.log('keepAlive :>> ', keepAlive)

            return (
                <Layout class={style.layoutContainer}>
                    <Layout.Sider
                        class={style.sider}
                        collapsible
                        v-model={[stateRef.collapsed, 'collapsed']}
                    >
                        <div class={style.logo}>
                            <img
                                class="contain"
                                src={IMG.logo}
                                alt="wwdz logo"
                            />
                            {!stateRef.collapsed && <span>vue3后台模板</span>}
                        </div>
                        <Menu
                            theme="dark"
                            mode="inline"
                            onClick={handleRoute}
                            v-models={[
                                [stateRef.selectedKeys, 'selectedKeys'],
                                [stateRef.openKeys, 'openKeys'],
                            ]}
                        >
                            {menuRoutes.map((routeRaw) => {
                                return (
                                    <SubSiderMenu
                                        routeRaw={routeRaw}
                                        key={routeRaw.path}
                                        path={routeRaw.path}
                                        collapsed={stateRef.collapsed}
                                    />
                                )
                            })}
                        </Menu>
                    </Layout.Sider>

                    <Layout class={style.main}>
                        <Layout.Header class={style.headerReset}>
                            <Breadcrumb class={style.breadcrumbReset}>
                                {route.matched.map((r) => {
                                    const { path, meta } = r
                                    const { title, Icon } = meta
                                    return (
                                        <Breadcrumb.Item href={path} key={path}>
                                            <RouterLink to={path}>
                                                {typeof Icon === 'function' && (
                                                    <Icon class="mr4" />
                                                )}
                                                <span>{title}</span>
                                            </RouterLink>
                                        </Breadcrumb.Item>
                                    )
                                })}
                            </Breadcrumb>

                            <div class="flex-center">
                                <SwitchEnv />
                                <Dropdown overlay={UserMenu}>
                                    <div class="flex-center">
                                        <Avatar
                                            shape="circle"
                                            size="default"
                                            icon={
                                                avatar ? (
                                                    <img src={avatar} />
                                                ) : (
                                                    <UserOutlined />
                                                )
                                            }
                                        />
                                        <div class={style.userName}>
                                            {unick}
                                        </div>
                                    </div>
                                </Dropdown>
                            </div>
                        </Layout.Header>

                        <Layout.Content class="p20">
                            <MultiTabs />
                            {/* 公共带编辑弹窗 */}
                            <ModalForm />
                            <RouterView
                                v-slots={{
                                    default: ({
                                        Component,
                                    }: {
                                        Component: DefineComponent
                                    }) => {
                                        return (
                                            <section>
                                                <RouterView
                                                    v-slots={{
                                                        default: ({
                                                            Component:
                                                                SubComponent,
                                                        }: {
                                                            Component: DefineComponent
                                                        }) => (
                                                            <Transition name="fade-slide">
                                                                {showSubRouterView && (
                                                                    <SubComponent
                                                                        key={
                                                                            route.fullPath
                                                                        }
                                                                    />
                                                                )}
                                                            </Transition>
                                                        ),
                                                    }}
                                                />
                                                <Transition name="fade-slide">
                                                    <KeepAlive>
                                                        {!showSubRouterView &&
                                                            keepAlive && (
                                                            <Component
                                                                key={
                                                                    route.fullPath
                                                                }
                                                            />
                                                        )}
                                                    </KeepAlive>
                                                </Transition>

                                                <Transition name="fade-slide">
                                                    {!showSubRouterView &&
                                                        !keepAlive && (
                                                        <Component
                                                            key={
                                                                route.fullPath
                                                            }
                                                        />
                                                    )}
                                                </Transition>
                                            </section>
                                        )
                                    },
                                }}
                            />
                        </Layout.Content>
                    </Layout>
                </Layout>
            )
        }
    },
})
