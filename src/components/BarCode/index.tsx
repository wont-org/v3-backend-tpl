// 此处是jsbarcode 文档 https://github.com/lindell/JsBarcode#readme
import {
    defineComponent, onMounted, PropType, watch 
} from 'vue'
import JsBarcode from 'jsbarcode'

export default defineComponent({
    name: 'BarCode',
    props: {
        code: {
            type: [String, Number] as PropType<string | number>,
            default: 'Test',
        },
        format: {
            type: String as PropType<string>,
            default: 'CODE128',
        },
        lineColor: {
            type: String as PropType<string>,
            default: '#000',
        },
        background: {
            type: String as PropType<string>,
            default: '',
        },
        width: {
            type: Number as PropType<number>,
            default: 2,
        },
        height: {
            type: Number as PropType<number>,
            default: 40,
        },
        displayValue: {
            type: Boolean as PropType<boolean>,
            default: true,
        },
        ext: {
            type: Object as PropType<any>,
            default: () => {
                return {}
            },
        },
    },
    setup(props) {
        const generateBarCode = () => {
            JsBarcode('#barcode', props.code, {
                format: props.format,
                lineColor: props.lineColor,
                background: props.background,
                width: props.width,
                height: props.height,
                displayValue: props.displayValue,
                ...props.ext,
            })
        }
        watch(
            () => props.code,
            (v) => {
                if (v) {
                    generateBarCode()
                }
            }
        )
        onMounted(() => {
            generateBarCode()
        })
        return () => <svg id="barcode" />
    },
})
