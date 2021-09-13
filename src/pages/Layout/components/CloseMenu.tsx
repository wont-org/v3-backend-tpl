import { Menu } from 'ant-design-vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import type { OptionItem } from '@/common/commonTypes'
import type { TabItem } from '@/store/modules/tabs'

const closeTabOpt = [
    // {
    //     value: 'reload',
    //     label: '重新加载',
    // },
    // {
    //     value: 'close',
    //     label: '关闭当前标签页',
    // },
    {
        value: 'closeLeft',
        label: '关闭左侧标签页',
    },
    {
        value: 'closeRight',
        label: '关闭右侧标签页',
    },
    {
        value: 'closeOther',
        label: '关闭其它标签页',
    },
]

export const CloseMenu = () => {
    const store = useStore()
    const route = useRoute()
    const tabList: TabItem[] = store.getters['tabs/tabList']
    const curTabIdx = tabList.findIndex(
        (item) => item.fullPath === route.fullPath
    )
    const onClick = (closeItem: OptionItem) => {
        switch (closeItem.value) {
        case 'closeLeft':
            store.commit('tabs/closeLeftTab', curTabIdx)
            break
        case 'closeRight':
            store.commit('tabs/closeRightTab', curTabIdx)
            break
        case 'closeOther':
            store.commit('tabs/closeOtherTab', curTabIdx)
            break
        default:
            break
        }
    }

    return (
        <Menu>
            {closeTabOpt.map((item) => {
                return (
                    <Menu.Item
                        key={item.value}
                        onClick={() => {
                            onClick(item)
                        }}
                    >
                        {item.label}
                    </Menu.Item>
                )
            })}
        </Menu>
    )
}
