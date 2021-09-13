import { DataSourceItem } from '@wont/vue3-el/es/WidgetForm'

export interface RowData {
    // id-提交
    id: number
    // 出库单号-展示
    outboundOrderNo: string
    // 发货物流商-展示
    expressSendCompany: string
    // 发货物流单号-展示
    expressSendNo: string
}

export interface ModalFormListProps {
    eggOpt: any[]
}

export const modalFormListDataSource = (
    props: ModalFormListProps
): DataSourceItem[] => [
    {
        formItemLabel: '新发货物流商',
        type: 'select',
        value: null,
        name: 'expressCompany',
        compProps: {
            placeholder: '请选择新发货物流商',
        },
        selfProps: {
            options: props.eggOpt,
        },
        rules: {
            message: '请选择新发货物流商',
            type: 'string',
            required: true,
            trigger: 'change',
        },
    },
    {
        formItemLabel: ' ',
        type: 'btnGroup',
        formItemProps: {
            labelCol: { span: 1 },
            colon: false,
        },
        selfProps: {
            options: [
                {
                    label: '确认',
                    eventName: 'confirm',
                    // antd 组件属性
                    compProps: {
                        type: 'primary',
                    },
                },
                {
                    label: '取消',
                    eventName: 'close',
                    // antd 组件属性
                    compProps: {
                        type: 'default',
                    },
                },
            ],
        },
    },
]
