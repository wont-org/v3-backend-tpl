import {
    message, Modal 
} from 'ant-design-vue'
import { LocationQueryValue } from 'vue-router'

export const baseTableHeader = [
    {
        title: '交接单号',
        dataIndex: 'handoverNumber',
        width: 200,
    },
    {
        title: '发货物流商',
        dataIndex: 'expressCompanyTypeDesc',
        width: 120,
    },
    {
        title: '交接状态',
        dataIndex: 'handoverTypeDesc',
        width: 120,
    },
    {
        title: '创建人',
        dataIndex: 'createUserName',
        width: 100,
    },
    {
        title: '创建时间',
        dataIndex: 'created',
        width: 200,
    },
    {
        title: '发货人',
        dataIndex: 'deliverUserName',
        width: 100,
    },
    {
        title: '发货时间',
        dataIndex: 'deliverTime',
        width: 200,
    },
    {
        title: '总包裹数',
        dataIndex: 'expressCount',
        width: 100,
    },
    {
        title: '总件数',
        dataIndex: 'totalCount',
        width: 100,
    },
]
export interface DetailTableHeader {
    handoverId?: LocationQueryValue | LocationQueryValue[]
    operaType: 'view' | 'deliver'
    queryTable?: () => unknown
}
export const detailTableHeader = (
    { queryTable, operaType } = {} as DetailTableHeader
) => {
    const result = [
        {
            title: '序号',
            dataIndex: 'customIdx',
            width: 100,
        },
        {
            title: '交接状态',
            dataIndex: 'handoverTypeDesc',
            width: 120,
        },
        {
            title: '交接单号',
            dataIndex: 'handoverNumber',
            width: 200,
        },
        {
            title: '创建人',
            dataIndex: 'createUserName',
            width: 100,
        },
        {
            title: '创建时间',
            dataIndex: 'created',
            width: 200,
        },
    ]
    if (operaType === 'deliver') {
        result.push({
            title: '操作',
            key: 'operation',
            dataIndex: 'operation',
            dataType: 'operation',
            width: 100,
            fixed: 'right',
            operates: [
                {
                    text: '删除',
                    compProps: {
                        ghost: true,
                        danger: true,
                    },
                    onClick: async (rowData: Record<string, any> = {}) => {
                        // console.log('rowData :>> ', rowData)
                        const { handoverNumber } = rowData
                        Modal.confirm({
                            content: `确认将${handoverNumber}删除出交接单吗`,
                            okType: 'danger',
                            onOk: async () => {
                                message.success('删除成功')
                                queryTable?.()
                            },
                        })
                    },
                },
            ],
        })
    }
    return result
}
