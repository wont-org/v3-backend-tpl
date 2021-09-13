// import { fn } from '@wont/base-fn'
import { Commit } from 'vuex'
import { KEYS } from '@/common/constant'
import { loginData } from '@/mock/login'

interface StateRef {
    userInfo: Record<string, unknown>
    token: null | string
}

const stateRef: StateRef = {
    userInfo: {},
    token: null,
}

const setToken = (state: StateRef, token: string) => {
    state.token = token
    // if (token) {
    //     fn.setCookie(KEYS.tokenkey, token, {
    //         path: '/',
    //     })
    // } else {
    //     fn.removeCookie(KEYS.tokenkey, {
    //         path: '*',
    //     })
    // }
}
const setUserInfo = (state: StateRef, userInfo: StateRef['userInfo']) => {
    state.userInfo = userInfo
    localStorage.setItem(KEYS.userInfoKey, JSON.stringify(userInfo))
}

const clearLoginStatus = (state: StateRef) => {
    setToken(state, '')
    setUserInfo(state, {})
    window.localStorage.removeItem(KEYS.userInfoKey)
}

const mutations = {
    clearLoginStatus,
    logout(state: StateRef) {
        clearLoginStatus(state)
    },
    setToken,
    setUserInfo,
}
const actions = {
    async login(
        {
            state,
            commit,
        }: {
            state: StateRef
            commit: Commit
        } // payload: Record<string, unknown>
    ) {
        if (state.token) {
            return Promise.resolve(state.userInfo)
        }
        // const res = (await klRequest.post('/user/login/noAcsPhoneLogin', {
        //     source: 'h5',
        //     ...payload,
        // }) || {}) as Record<string, unknown>
        const res = loginData.data as Record<string, unknown>
        const { token, userInfo } = res
        const t = `Wwdz ${token}`
        commit('setToken', t)
        commit('setUserInfo', userInfo)
        return Promise.resolve(userInfo)
    },
}
const getters = {
    getUserInfo(state: StateRef) {
        if (!state.userInfo || !state.userInfo.userId) {
            const localInfo = localStorage.getItem(KEYS.userInfoKey) || ''
            mutations.setUserInfo(state, localInfo ? JSON.parse(localInfo) : {})
        }
        return state.userInfo
    },
    getToken(state: StateRef) {
        if (!state.token) {
            const token = ''
            // fn.getCookie(KEYS.tokenkey) || fn.getQueryString('token')
            if (token) {
                mutations.setToken(state, token)
            }
        }
        return state.token
    },
}
export default {
    namespaced: true,
    state: stateRef,
    mutations,
    actions,
    getters,
}
