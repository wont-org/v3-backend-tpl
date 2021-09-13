import {
    defineComponent, reactive, ref 
} from 'vue'
import {
    Button, Form, Input, message 
} from 'ant-design-vue'
import {
    MobileOutlined, MailOutlined 
} from '@ant-design/icons-vue'
import {
    useRoute, useRouter 
} from 'vue-router'
import { useStore } from 'vuex'
// import router from '@/router'
import './index.less'

const FormItem = Form.Item
export default defineComponent({
    name: 'Login',
    setup() {
        const store = useStore()
        const route = useRoute()
        const router = useRouter()
        const rules = {
            phone: [
                {
                    required: true,
                    pattern: /^1[3|4|5|6|7|8|9][0-9]{9}$/,
                    message: '请正确填写手机号',
                    trigger: 'blur',
                },
            ],
            code: [
                {
                    required: true,
                    pattern: /^[0-9]{6}$/,
                    message: '请正确填写验证码',
                    max: 6,
                    trigger: 'blur',
                },
            ],
        }
        const { __env: env } = route.query
        const state = reactive<any>({
            form: {
                phone: env === 'dev' ? '18268125970' : '',
                code: env === 'dev' ? '656565' : '',
            },
            timer: null,
            counting: null,
        })
        const formRef = ref()
        const getValid = async () => {
            message.success('验证码发送成功！')
            state.counting = 60
            state.timer = setInterval(() => {
                state.counting -= 1
                if (state.counting === 0) {
                    clearInterval(state.timer)
                    state.timer = null
                }
            }, 1000)
        }
        const login = async () => {
            formRef.value
                .validate()
                .then(async () => {
                    const userInfo = await store.dispatch(
                        'user/login',
                        state.form
                    )
                    if (userInfo) {
                        const redirectUrl =
                            // TODO
                            // fn.getQueryString('redirectUrl') ||
                            '/Welcome'
                        const { BASE_URL } = import.meta.env
                        router.replace({
                            path: redirectUrl.replace(BASE_URL, '/'),
                        })
                    }
                })
                .catch((error: any) => {
                    console.log(error)
                })
        }
        return () => (
            <div class="login flex f-fd-c f-ai-c f-jc-c">
                <div class="login_content flex  f-ai-c  f-fd-c">
                    <div class="login_content_top flex f-ai-c">
                        <img
                            src="https://cdn.wanwudezhi.com/seller-admin/image/MTU1NTU3NzM1NTkyNTI0NDQzOQ==.png"
                            alt="玩物得志"
                        />
                        <div class="login_title">玩物得志</div>
                    </div>
                    <p class="title_next">玩物得志云仓系统</p>
                    <div class="login_content_form">
                        <Form ref={formRef} model={state.form} rules={rules}>
                            <FormItem name="phone">
                                <Input
                                    class="form_input"
                                    value={state.form.phone}
                                    size="large"
                                    placeholder="请输入手机号"
                                    maxlength={11}
                                    onInput={(e) => {
                                        state.form.phone =
                                            e.target.value.replace(/[^\d]/g, '')
                                    }}
                                    v-slots={{
                                        prefix: () => (
                                            <MobileOutlined
                                                style={{
                                                    color: 'rgba(159, 159, 159, 0.85)',
                                                }}
                                            />
                                        ),
                                    }}
                                    style={{
                                        width: '400px',
                                    }}
                                />
                            </FormItem>
                            <FormItem name="code">
                                <div class="flex f-jc-sb">
                                    <Input
                                        class="form_input_valid"
                                        value={state.form.code}
                                        size="large"
                                        placeholder="请输入验证码"
                                        maxlength={6}
                                        onInput={(e) => {
                                            state.form.code =
                                                e.target.value.replace(
                                                    /[^\d]/g,
                                                    ''
                                                )
                                        }}
                                        v-slots={{
                                            prefix: () => (
                                                <MailOutlined
                                                    style={{
                                                        color: 'rgba(159, 159, 159, 0.85)',
                                                    }}
                                                />
                                            ),
                                        }}
                                    />
                                    <Button
                                        size="large"
                                        onClick={getValid}
                                        disabled={
                                            state.counting > 0 ||
                                            !state.form.phone
                                        }
                                    >
                                        {state.counting > 0 ? (
                                            <span>
                                                {state.counting}秒后重试
                                            </span>
                                        ) : (
                                            <span>获取验证码</span>
                                        )}
                                    </Button>
                                </div>
                            </FormItem>
                            <FormItem>
                                <div class="flex" style={{ marginTop: '20px' }}>
                                    <Button
                                        size="large"
                                        class="action_btn"
                                        onClick={login}
                                    >
                                        登录
                                    </Button>
                                </div>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </div>
        )
    },
})
