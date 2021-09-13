import {
    watch, defineComponent, reactive 
} from 'vue'
import {
    Tabs, Dropdown 
} from 'ant-design-vue'
import { DownOutlined } from '@ant-design/icons-vue'
import {
    useRouter, useRoute 
} from 'vue-router'
import { useStore } from 'vuex'

import type { TabItem } from '@/store/modules/tabs'

import { CloseMenu } from './CloseMenu'

export default defineComponent({
    name: 'MultiTabs',
    setup() {
        const router = useRouter()
        const route = useRoute()
        const store = useStore()

        const state = reactive({
            loading: false,
            activeKey: route.fullPath,
        })

        const tabList: TabItem[] = store.getters['tabs/tabList']

        const onTabChange = (fullPath: string) => {
            router.push(fullPath)
        }
        const onEdit = (
            targetKey: string | MouseEvent,
            action: 'add' | 'remove'
        ) => {
            if (action === 'remove') {
                const curTabIdx = tabList.findIndex(
                    (item) => item.fullPath === targetKey
                )
                store.commit('tabs/closeCurTab', curTabIdx)
                if (targetKey === state.activeKey) {
                    const nextTab = curTabIdx === 0 ? 0 : curTabIdx - 1
                    router.push({
                        path: tabList[nextTab].fullPath,
                    })
                }
            }
        }

        watch(
            () => route.fullPath,
            () => {
                state.activeKey = route.fullPath
            }
        )

        return () => {
            return (
                <Tabs
                    class="us-n"
                    type="editable-card"
                    size="small"
                    v-show={tabList.length > 0}
                    // animated={false}
                    hideAdd
                    tabBarGutter={4}
                    onChange={onTabChange}
                    onEdit={onEdit}
                    v-model={[state.activeKey, 'activeKey']}
                    v-slots={{
                        tabBarExtraContent: () => (
                            <Dropdown
                                overlay={CloseMenu}
                                trigger="click"
                                class="ml100"
                            >
                                <div class="red">
                                    <span>关闭标签页选项</span>
                                    <DownOutlined
                                        style={{
                                            margin: '0 4px',
                                        }}
                                    />
                                </div>
                            </Dropdown>
                        ),
                    }}
                >
                    {tabList.map((tab) => {
                        return (
                            <Tabs.TabPane
                                key={tab.fullPath}
                                tab={tab.title}
                                closable={tabList.length !== 1}
                            />
                        )
                    })}
                </Tabs>
            )
        }
    },
})
