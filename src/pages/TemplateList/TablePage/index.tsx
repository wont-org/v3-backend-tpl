import {
    defineComponent, reactive, ref, onActivated, onBeforeMount 
} from 'vue'
import {
    WidgetForm, CommonTable 
} from '@wont/vue3-el'
import { useRouter } from 'vue-router'
import {
    Pager, QueryTableTypes, PageParams 
} from '@/common/commonTypes'
// import { get } from 'lodash'
// import { dropBoxMapping } from '@/api'
import { OptParamEnum } from '@/common/enum'
import { tableData } from '@/mock/tableTpl'
import { options } from '@/mock/options'
import { modalFormStateRef } from '@/components/ModalForm'
import {
    searchList, SearchListProps, tableHeader 
} from './model/queryTable'
import { modalFormListDataSource } from './model/operaDelivery'

interface Params extends PageParams {
    createTimeRange: Record<string, unknown>
}

interface StateRef extends SearchListProps {
    params: Params
    tableData: QueryTableTypes
}

export default defineComponent({
    name: 'TablePage',
    setup() {
        const searchRef = ref()
        const router = useRouter()
        const stateRef: StateRef = reactive({
            params: {
                page: 1,
                size: 10,
                createTimeRange: {},
            },
            tableData: {
                total: 0,
                dataList: [],
            },
            eggOpt: [],
        })

        const setParams = (data: Record<string, unknown> = {}) => {
            stateRef.params = {
                ...stateRef.params,
                ...data,
            }
        }

        const queryTable = async (data: Record<string, unknown> = {}) => {
            setParams(data)
            // TODO 替换你的接口，并打开注释
            // const {
            //     createTimeRange = {},
            //     ...otherParams
            // } = stateRef.params
            // const [startTime, endTime] = get(
            //     createTimeRange,
            //     'msec',
            //     []
            // ) as number[]
            // const params = {
            //     ...otherParams,
            //     startTime,
            //     endTime,
            // }
            // console.log('params :>> ', params)
            // const res = ((await klRequest.post(
            //     '/wms/handover/queryHandoverList',
            //     params
            // )) || {}) as QueryTableTypes
            const res = tableData.data as QueryTableTypes
            const { total, dataList = [] } = res
            // console.log('data :>> ', data)
            stateRef.tableData = {
                total,
                dataList,
            }
        }

        const onReset = async (data: Record<string, unknown> = {}) => {
            searchRef.value.initModelRef()
            // console.log('onReset data :>> ', data)
            await queryTable({
                ...data,
                page: 1,
                size: 10,
            })
        }

        const onQuery = async (data: Record<string, unknown> = {}) => {
            // console.log('onReset data :>> ', data)
            await queryTable({
                ...data,
                page: 1,
                size: 10,
            })
        }

        const onTableChange = async (page: Pager) => {
            setParams({
                page: page.current,
                size: page.pageSize,
            })
            await queryTable()
        }

        onBeforeMount(async () => {
            const data = options.data.resultMap as Record<string, unknown[]>
            const eggOpt = data[OptParamEnum.STORE_TYPE] || []
            stateRef.eggOpt = eggOpt
        })

        const onAdd = () => {
            modalFormStateRef.title = '新增交接单'
            modalFormStateRef.apiName = '/wms/handover/addHandover'
            modalFormStateRef.dataSource = modalFormListDataSource({
                eggOpt: stateRef.eggOpt,
            })
            modalFormStateRef.onRefresh = queryTable
            modalFormStateRef.showModal = true
        }

        onActivated(async () => {
            await queryTable()
        })

        return () => (
            <section class="">
                <WidgetForm
                    class="item-card pt20"
                    ref={searchRef}
                    dataSource={searchList({
                        eggOpt: stateRef.eggOpt,
                    })}
                    onQuery={onQuery}
                    onReset={onReset}
                    onAdd={onAdd}
                />
                <CommonTable
                    columns={tableHeader({
                        router,
                        queryTable,
                    })}
                    dataSource={stateRef.tableData.dataList}
                    rowSelection={null}
                    scroll={{ x: '110%' }}
                    pagination={{
                        total: stateRef.tableData.total,
                        current: stateRef.params.page,
                        pageSize: stateRef.params.size,
                    }}
                    additionProps={{
                        rowKey: 'id',
                        onChange: onTableChange,
                    }}
                />
            </section>
        )
    },
})
