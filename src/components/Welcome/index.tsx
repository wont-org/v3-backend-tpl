import { defineComponent } from 'vue'
import { IMG } from '@/common/constant'
import style from './index.module.less'

export default defineComponent({
    name: 'Welcome',
    setup() {
        return () => {
            return (
                <section class={style.welContainer}>
                    <img class={style.logo} src={IMG.logo} alt="" />
                    <h3 class={style.text}>欢迎来到wont！这里是vue3后台模板</h3>
                </section>
            )
        }
    },
})
