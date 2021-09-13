import {
    computed, defineComponent, nextTick, Ref, ref, watch 
} from 'vue'

import QRCode from 'qrcodejs2-fix'

export default defineComponent({
    name: 'QrCode',
    props: {
        link: {
            type: String,
            default: '',
        },
        show: {
            type: Boolean,
            default: false,
        },
        desc: {
            type: String,
            default: '扫一扫，关联订单',
        },
        subfix: {
            type: String,
            default: '',
        },
    },
    setup(props) {
        const qrcode: Ref = ref()
        const domId = computed(() => `qrcode_${props.subfix}`)

        const qrcodeFn = () => {
            const code = new QRCode(domId.value, {
                width: 124,
                height: 124,
                text: props.link,
            })
            qrcode.value = code
        }
        watch(
            () => props.show,
            (v) => {
                if (!v) {
                    nextTick(() => {
                        qrcode?.value?.clear?.()
                    })
                }
            }
        )
        watch(
            () => props.link,
            (v) => {
                nextTick(() => {
                    if (qrcode.value) {
                        qrcode.value.makeCode(v)
                    } else {
                        qrcodeFn()
                    }
                })
            },
            {
                immediate: true,
            }
        )
        return () => (
            <div>
                <div id={domId.value} />
                {qrcode.value && <h3>{props.desc}</h3>}
            </div>
        )
    },
})
