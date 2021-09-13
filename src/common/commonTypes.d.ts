export interface Pager {
    total: number
    current: number
    pageSize: number
    showSizeChanger: boolean
    // showTotal: boolean;
}

export interface QueryTableTypes {
    total: number
    dataList: unknown[]
}

export interface PageParams {
    page: number
    size: number
}

export interface OptionItem {
    label: string
    value: string
}
