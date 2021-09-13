import { createApp } from 'vue'
import moment from 'moment'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { ConfigProvider } from 'ant-design-vue'
import store from '@/store'
import App from '@/App'
import router from '@/router'
import 'moment/dist/locale/zh-cn'

import '@/styles/index.less'
import customFocus from '@/directives/v-customFocus'

moment.locale('zh-cn')

const app = createApp(() => (
    <ConfigProvider locale={zhCN}>
        <App />
    </ConfigProvider>
))

app.use(router).use(store).mount('#app')
app.directive('customFocus', customFocus)
app.config.errorHandler = (err, vm, info) => {
    // 处理错误
    // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
    console.log('err, vm, info :>> ', err, vm, info)
}
