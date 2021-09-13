import { defineComponent } from 'vue'
import { Result } from 'ant-design-vue'
import { resultProps } from 'ant-design-vue/es/result'
import { useRouter } from 'vue-router'

export default defineComponent({
    name: 'Result',
    props: resultProps,
    setup(props, { slots }) {
        const router = useRouter()

        return () => {
            return (
                <section class="antd-reset">
                    <Result {...props}>
                        <div class="ant-result-extra">
                            {typeof slots.default === 'function' &&
                                slots.default({ router })}
                        </div>
                    </Result>
                </section>
            )
        }
    },
})
