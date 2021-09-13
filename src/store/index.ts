import { createStore } from 'vuex'
import user from './modules/user'
import tabs from './modules/tabs'

export default createStore({
    modules: {
        user,
        tabs,
    },
})
