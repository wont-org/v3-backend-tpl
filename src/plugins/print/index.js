import axios from 'axios'
import { createVNode } from 'vue'
import {
    Modal, message 
} from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import {
    pLodopBase64,
    pLodopHtmlWithUrl,
    pLodopCodeString,
    pLodopA4,
} from './LodopFuncs'
import { isMac } from './config'

export async function printReceivingNote({
    api = '/wms/deliverAbnormal/getOrCreatePrintExpressInfo',
    ...rest
}) {
    console.log('api, rest :>> ', api, rest)
    let base64
    let body
    try {
        // 打印1 补打2
        // TODO self api
        const res = {}
        if (res.tempUrl && res.tempType === 'imageBase64') {
            const temres = await axios.get(res.tempUrl)
            base64 = temres.data
            body = {
                ...res,
                base64,
            }
            if (base64) {
                await pLodopBase64(body)
            } else {
                message.error('打印面单失败')
            }
        }
        if (res.tempUrl && res.tempType === 'htmlFile') {
            body = {
                url: res.tempUrl,
                ...res,
            }
            await pLodopHtmlWithUrl(body)
        }
        if (res.tempType === 'lodopFile') {
            body = { ...res, codeString: res.lodopTemp }
            await pLodopCodeString(body)
        }
        return res
    } catch (err) {
        message.error(err.message || '打印面单失败')
        console.log(err)
        return false
    }
}
export function isSupport() {
    if (isMac) {
        Modal.confirm({
            title: '温馨提示',
            content: '暂不支持Mac电脑打印, 请使用windows电脑',
            icon: createVNode(ExclamationCircleOutlined),
            okText: '确定',
            cancelText: '取消',
        })
        return false
    }
    return true
}
// 打印面单通用方法
export async function beforePrintSheet(params = {}) {
    // 检察环境
    // if (!isSupport()) {
    //     return false
    // }
    try {
        const res = await printReceivingNote(params)
        if (res) {
            return await Promise.resolve(res)
        }
        return await Promise.reject()
    } catch (error) {
        return Promise.reject(error)
    }
}
// 打印A4纸通用方法
export async function printA4(params = {}) {
    // 检察环境
    if (!isSupport()) {
        return false
    }
    try {
        const res = await pLodopA4(params)
        if (res) {
            return await Promise.resolve(res)
        }
        return await Promise.reject()
    } catch (error) {
        return Promise.reject(error)
    }
}
