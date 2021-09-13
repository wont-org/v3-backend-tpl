import {
    defineComponent, ref, reactive 
} from 'vue'
import {
    message, Modal 
} from 'ant-design-vue'
import { WidgetForm } from '@wont/vue3-el'
import { DataSourceItem } from '@wont/vue3-el/es/WidgetForm'

export interface ModalFormStateRef {
    showModal: boolean
    title?: string
    apiName: string
    rowData: Record<string, unknown>
    dataSource: DataSourceItem[]
    onRefresh?: () => Promise<any>
}

export const modalFormStateRef: ModalFormStateRef = reactive({
    showModal: false,
    rowData: {},
    dataSource: [],
    apiName: '',
})

export default defineComponent({
    name: 'ModalForm',
    setup() {
        const searchRef = ref()

        const clearModalFormStateRef = () => {
            searchRef.value.initModelRef()
            modalFormStateRef.title = ''
            modalFormStateRef.rowData = {}
            modalFormStateRef.dataSource = []
        }

        const onCancel = () => {
            modalFormStateRef.showModal = false
            setTimeout(() => {
                clearModalFormStateRef()
            }, 200)
        }
        const onConfirm = (data: Record<string, unknown> = {}) => {
            console.log('data :>> ', data, modalFormStateRef.rowData)
            searchRef.value.validate().then(async () => {
                // TODO 目前只传apiName，后面看是否需要整个提出
                // const params = {
                //     ...modalFormStateRef.rowData,
                //     ...data,
                // }
                if (modalFormStateRef.apiName) {
                    // api
                    message.success('操作成功')
                }
                // todo end
                onCancel()
                if (typeof modalFormStateRef.onRefresh === 'function') {
                    await modalFormStateRef.onRefresh()
                }
            })
        }
        return () => (
            <Modal
                title={modalFormStateRef.title}
                visible={modalFormStateRef.showModal}
                footer={null}
                onCancel={onCancel}
                closable={false}
            >
                <WidgetForm
                    config={{
                        layout: 'horizontal',
                        labelCol: { span: 8 },
                        wrapperCol: { span: 16 },
                        labelAlign: 'right',
                    }}
                    watchInitModel={{
                        updateState: true,
                    }}
                    ref={searchRef}
                    dataSource={modalFormStateRef.dataSource}
                    onConfirm={onConfirm}
                    onClose={onCancel}
                />
            </Modal>
        )
    },
})
