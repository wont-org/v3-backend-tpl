import { KEYS } from '@/common/constant'
import { createStorage } from '@/utils/cache'

export interface TabItem {
    fullPath: string
    title: string
    hideTab: boolean | undefined
    isFirstMounted: boolean
}

interface State {
    tabList: TabItem[]
}

const ss = createStorage('sessionStorage')

const mutations = {
    addTab(state: State, tabItem: TabItem) {
        const { isFirstMounted, hideTab, fullPath } = tabItem
        const tabList = ss.get(KEYS.tabKey)
        if (isFirstMounted && Array.isArray(tabList)) {
            state.tabList = tabList
            return
        }
        const hasRoute = state.tabList.find(
            (item) => item.fullPath === fullPath
        )
        if (!hideTab && !hasRoute) {
            state.tabList.push(tabItem)
            !isFirstMounted && ss.set(KEYS.tabKey, state.tabList)
        }
    },
    closeCurTab(state: State, curIdx: number) {
        state.tabList.splice(curIdx, 1)
        ss.set(KEYS.tabKey, state.tabList)
    },
    closeLeftTab(state: State, curIdx: number) {
        const len = state.tabList.length
        if (len === 1 || curIdx === 0) {
            return
        }
        state.tabList.splice(0, curIdx)
        ss.set(KEYS.tabKey, state.tabList)
    },
    closeRightTab(state: State, curIdx: number) {
        const len = state.tabList.length
        if (len === 1 || curIdx === len - 1) {
            return
        }
        state.tabList.splice(curIdx + 1, len - curIdx - 1)
        ss.set(KEYS.tabKey, state.tabList)
    },
    closeOtherTab(state: State, curIdx: number) {
        mutations.closeRightTab(state, curIdx)
        mutations.closeLeftTab(state, curIdx)
    },
}

export default {
    namespaced: true,
    state: <State>{
        tabList: [],
    },
    mutations,
    actions: {},
    getters: {
        tabList: (state: State) => {
            return state.tabList
        },
    },
}
