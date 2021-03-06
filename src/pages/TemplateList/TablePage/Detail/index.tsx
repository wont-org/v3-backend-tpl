import {
    defineComponent, reactive, onBeforeMount, PropType, ref 
} from 'vue'
import {
    CommonTable, Button 
} from '@wont/vue3-el'
import {
    message, Modal, Row, Col, Input 
} from 'ant-design-vue'
import {
    useRoute, LocationQueryValue, useRouter 
} from 'vue-router'
import {
    PageParams, Pager 
} from '@/common/commonTypes'
import { onFocus } from '@/utils/domFunc'
// import { get } from 'lodash'
import { tableData } from '@/mock/tableTpl'
import {
    baseTableHeader, detailTableHeader 
} from './data'

interface TableData {
    total?: number
    detailTotal: number
    baseTableBody?: unknown[]
    detailTableBody?: unknown[]
    dataList?: unknown[]
}
interface Params extends PageParams {
    handoverId: LocationQueryValue | LocationQueryValue[]
}
interface StateRef {
    params: Params
    tableData: TableData
    expressNumber: string
}

export default defineComponent({
    name: 'Detail',
    props: {
        operaType: {
            type: String as PropType<'view' | 'deliver'>,
            required: true,
        },
    },
    setup(props) {
        const deliverRef = ref()
        const route = useRoute()
        const router = useRouter()
        const { handoverId } = route.query
        const stateRef: StateRef = reactive({
            params: {
                handoverId,
                page: 1,
                size: 10,
            },
            expressNumber: '',
            tableData: {
                detailTotal: 0,
                baseTableBody: [],
                detailTableBody: [],
            },
        })

        const setParams = (data: Record<string, unknown> = {}) => {
            stateRef.params = {
                ...stateRef.params,
                ...data,
            }
        }
        const queryBaseTable = async (data: Record<string, unknown> = {}) => {
            setParams(data)
            const res = tableData.data
            const { dataList: baseTableBody = [] } = res
            // console.log('data :>> ', data)
            stateRef.tableData = {
                ...stateRef.tableData,
                baseTableBody,
            }
        }
        // ????????????
        const queryDetailTable = async (data: Record<string, unknown> = {}) => {
            setParams(data)
            const res = tableData.data
            const { dataList: detailTableBody = [], total = 0 } = res
            // console.log('data :>> ', data)
            stateRef.tableData = {
                ...stateRef.tableData,
                detailTotal: total,
                detailTableBody,
            }
        }
        // ???????????????????????????
        const queryTable = () => {
            queryBaseTable()
            queryDetailTable()
        }

        const onTableChange = (page: Pager) => {
            setParams({
                page: page.current,
                size: page.pageSize,
            })
            queryTable()
        }

        const handleDelivery = async () => {
            try {
                if (!stateRef.expressNumber) {
                    message.error('?????????')
                    return
                }
                message.success('????????????')
                queryTable()
            } catch (error) {
                // console.log('error :>> ', error)
                onFocus(deliverRef, true)
            }
        }

        const handleCloseDelivery = () => {
            Modal.confirm({
                content: `?????????????????? ${1111} ??????????`,
                onOk: async () => {
                    message.success('????????????')
                    queryTable()
                },
            })
        }

        onBeforeMount(() => {
            queryTable()
        })

        return () => {
            return (
                <section class="pb20">
                    <h3 class="item-card pt20">????????????</h3>
                    <CommonTable
                        columns={baseTableHeader}
                        dataSource={stateRef.tableData.baseTableBody}
                        rowSelection={null}
                        scroll={{ x: '110%' }}
                        additionProps={{
                            rowKey: 'id',
                            pagination: false,
                        }}
                    />
                    <Row
                        align="middle"
                        class="item-card pt20"
                        v-show={props.operaType === 'deliver'}
                    >
                        <Col>
                            <h2 class="mb0">???????????????</h2>
                        </Col>
                        <Col>
                            <Input
                                style={{
                                    width: '440px',
                                }}
                                ref={deliverRef}
                                autofocus
                                allowClear
                                size="large"
                                v-model={[stateRef.expressNumber, 'value']}
                                placeholder="?????????????????????"
                                onPressEnter={handleDelivery}
                            />
                            <Button
                                size="large"
                                type="primary"
                                onClick={handleDelivery}
                            >
                                ??????
                            </Button>
                        </Col>
                    </Row>
                    <h3 class="item-card pt20">????????????</h3>
                    <CommonTable
                        columns={detailTableHeader({
                            handoverId,
                            queryTable,
                            operaType: props.operaType,
                        })}
                        dataSource={stateRef.tableData.detailTableBody}
                        rowSelection={null}
                        scroll={{ x: true }}
                        pagination={{
                            total: stateRef.tableData.detailTotal,
                            current: stateRef.params.page,
                            pageSize: stateRef.params.size,
                        }}
                        additionProps={{
                            rowKey: 'id',
                            onChange: onTableChange,
                        }}
                    />
                    <Row justify="center" class="pt20">
                        <Button
                            danger
                            class="mr10"
                            v-show={props.operaType === 'deliver'}
                            onClick={handleCloseDelivery}
                        >
                            ??????
                        </Button>
                        <Button
                            onClick={() => {
                                router.back()
                            }}
                        >
                            ??????
                        </Button>
                    </Row>
                </section>
            )
        }
    },
})
