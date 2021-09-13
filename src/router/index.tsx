import {
    createRouter, createWebHistory, LocationQuery 
} from 'vue-router'
import store from '@/store'
import { backendConfig } from '@/config'
import { routes } from './routes'

const {
    // MODE = '',
    VITE_APP_ENV: env,
    BASE_URL = backendConfig.base,
} = import.meta.env
const router = createRouter({
    history: createWebHistory(BASE_URL),
    routes,
})

console.log('router env :>> ', import.meta.env)

router.beforeEach((to, from, next) => {
    let query: LocationQuery | null = null
    if (env !== 'prod' && !to.query.__env) {
        query = {
            ...to.query,
            __env: from.query.__env || env,
        }
    }
    const { token } = to.query
    if (backendConfig.loginType === 'sso' && token) {
        store.commit('user/setToken', token)
        query = query || to.query
        delete query.token
    }
    if (query) {
        next({
            path: to.path,
            query,
        })
    } else {
        next()
    }
})

export default router
