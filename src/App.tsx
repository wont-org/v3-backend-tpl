import { defineComponent } from 'vue'
import zh_CN from 'ant-design-vue/es/locale/zh_CN'
import {
    ConfigProvider, Spin, notification 
} from 'ant-design-vue'
import { RouterView } from 'vue-router'
import { createClasses } from 'vue3-emotion'
import globalLoading from '@/hooks/globalLoading'

const ConFirm = () => (
    <section>
        <p>1. 确认阅读README.md，几乎所有疑问都可在此查阅</p>
        <p>2. const、enum规范是个比较好的建议</p>
        <p>3. eslint和commitlint如有不适，及时对焦，也可自行更改，共同完善</p>
        <p>4. 项目中有大量TODO，请全局搜索，处理后删除这些TODO</p>
        <p>
            5. 重要！！！
            <p>
                pages/TemplateList是一个常用后台页，仅需更改接口，字段便可完成页面，可复制粘贴重复使用。
            </p>
        </p>
        <p>
            6. 重要！！！
            <p>
                components/ModalForm组件可以关注一下，能提升效率！但是全局响应式数据不要随便使用，写在组件内部！否则会出现全局污染。此组件关闭时已清除数据
            </p>
        </p>
        <p>最后： 祝你开发愉快，早早下班，升职加薪</p>
    </section>
)
export default defineComponent({
    name: 'App',
    setup() {
        const classRef = createClasses(() => ({
            spinReset: {
                height: '100%',
                '.ant-spin-container': {
                    height: '100%',
                },
                '.ant-spin-spinning': {
                    zIndex: 999999,
                },
                '.ant-spin-blur': {
                    zIndex: 999999,
                },
            },
        }))
        notification.destroy()
        notification.info({
            message: <b>本后台模板你需要确认</b>,
            description: <ConFirm />,
        })

        return () => {
            return (
                <Spin
                    delay={300}
                    spinning={globalLoading.value}
                    wrapperClassName={classRef.value.spinReset}
                >
                    <ConfigProvider locale={zh_CN}>
                        <RouterView />
                    </ConfigProvider>
                </Spin>
            )
        }
    },
})
