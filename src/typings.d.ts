import 'vue-router'
import { VNode } from 'vue'

declare module 'vue-router' {
    export interface RouteMeta {
        title: string
        icon?: VNode
        keepAlive?: boolean
        isHidden?: boolean
        hideSubRoute?: boolean
        showSubRouterView?: boolean
        hideTab?: boolean
        // role?: string[]
    }
}
