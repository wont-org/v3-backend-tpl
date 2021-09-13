import { DataSourceItem } from '@wont/vue3-el/es/WidgetForm'
import { TableHeader } from '@wont/vue3-el/es/CommonTable'
import { Router } from 'vue-router'
import {
    Modal, message 
} from 'ant-design-vue'

export interface SearchListProps {
    eggOpt: unknown[]
}
export const searchList = (props: SearchListProps): DataSourceItem[] => [
    {
        formItemLabel: '交接单号',
        type: 'input',
        value: null,
        name: 'handoverNumber',
        compProps: {
            placeholder: '请输入交接单号',
            type: 'text',
        },
        selfProps: {
            type: 'number',
        },
    },
    {
        formItemLabel: '下拉选择',
        type: 'select',
        value: null,
        name: 'expressCompany',
        compProps: {
            placeholder: '请选择',
        },
        selfProps: {
            options: props.eggOpt,
        },
    },
    {
        formItemLabel: '创建时间',
        type: 'rangePicker',
        value: [],
        name: 'createTimeRange',
        // 组件属性
        compProps: {
            placeholder: ['开始时间', '结束时间'],
        },
    },
    {
        formItemLabel: '',
        type: 'btnGroup',
        selfProps: {
            options: [
                {
                    label: '查询',
                    eventName: 'query',
                    compProps: {
                        type: 'primary',
                    },
                },
                {
                    label: '重置',
                    eventName: 'reset',
                    compProps: {
                        type: 'default',
                    },
                },
                {
                    label: '新增',
                    eventName: 'add',
                    compProps: {
                        ghost: true,
                        type: 'primary',
                    },
                },
            ],
        },
    },
]

interface TableHeaderProps {
    router: Router
    queryTable: () => Promise<void>
}
export const tableHeader = ({
    router,
    queryTable,
}: TableHeaderProps): TableHeader[] => [
    {
        title: '交接单号',
        dataIndex: 'handoverNumber',
        // width: 180,
    },
    {
        title: '发货物流商',
        dataIndex: 'expressCompanyTypeDesc',
        // width: 120,
    },
    {
        title: '交接状态',
        dataIndex: 'handoverTypeDesc',
        // width: 120,
    },
    {
        title: '创建人',
        dataIndex: 'createUserName',
        // width: 100,
    },
    {
        title: '创建时间',
        dataIndex: 'created',
        // width: 200,
    },
    {
        title: '发货人',
        dataIndex: 'deliverUserName',
        // width: 100,
    },
    {
        title: '发货时间',
        dataIndex: 'deliverTime',
        // width: 200,
    },
    {
        title: '总包裹数',
        dataIndex: 'expressCount',
        // width: 100,
    },
    {
        title: '总件数',
        dataIndex: 'totalCount',
        // width: 100,
    },
    {
        title: '操作',
        key: 'operation',
        dataIndex: 'operation',
        dataType: 'operation',
        width: 200,
        fixed: 'right',
        operates: [
            {
                text: '查看',
                compProps: {
                    type: 'link',
                },
                // show: (rowData: Record<string, any> = {}) => {
                //     console.log('show rowData :>> ', rowData)
                //     return true
                // },
                onClick(rowData: Record<string, any>) {
                    // console.log('rowData :>> ', rowData)
                    router.push({
                        path: '/TemplateList/TablePage/Detail',
                        query: {
                            handoverId: rowData.id,
                        },
                    })
                },
            },
            {
                text: '交接',
                compProps: {
                    type: 'primary',
                },
                onClick(rowData: Record<string, any>) {
                    // console.log('props :>> ', props)
                    // console.log('rowData :>> ', rowData)
                    router.push({
                        path: '/TemplateList/TablePage/Deliver',
                        query: {
                            handoverId: rowData.id,
                        },
                    })
                },
            },
            {
                text: '删除',
                compProps: {
                    danger: true,
                },
                onClick(rowData: Record<string, any>) {
                    // console.log('rowData 回滚:>> ', rowData)
                    Modal.confirm({
                        content: `确认将交接单 ${rowData.handoverNumber} 删除吗?`,
                        onOk: async () => {
                            message.success('删除成功')
                            await queryTable()
                        },
                    })
                },
            },
        ],
    },
]
