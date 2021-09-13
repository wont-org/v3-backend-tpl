/*eslint-disable*/
import getLodop from './Lodop'
import { message } from 'ant-design-vue'

const FIVE_INCH = 5
const FIVE_INCH_GUOSHOU = 'GUOSHOU'
// 维护不同尺寸证书参数
// 我们这边打印机 爱普森 的和仓库不一样，调的尺寸会有问题
const lodopCertificateImageMap = {
    [FIVE_INCH]: {
        SET_PRINT_PAGESIZE: {
            pageWidth: '127mm',
            pageHeight: '93mm',
        },
        ADD_PRINT_IMAGE: {
            top: '-1.5mm',
            left: '-2.5mm',
            width: '126mm',
            height: '93mm',
        },
    },
    [FIVE_INCH_GUOSHOU]: {
        SET_PRINT_PAGESIZE: {
            pageWidth: '130mm',
            pageHeight: '91mm',
        },
        ADD_PRINT_IMAGE: {
            top: '-1mm',
            left: '-1.59mm',
            width: '126mm',
            height: '91mm',
        },
    },
}

export const needShowInstallButtons = {
    a: {
        href: 'https://cdn.wanwudezhi.com/static/web-static/application/4d6bb9e58b352636d57b0645053e5946.exe',
        label: '下载打印控件',
    },
}

export const needTips = {
    1: '注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它',
    2: '如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装',
    3: '安装好驱动后请刷新页面后在打印',
    4: '打印溯源码之前先在样例页面先测试打印，确保无误后再去批量打印溯源码',
}

export const pLodopCodeDemo = (arr) => {
    if (!(arr instanceof Array)) return
    const LODOP = getLodop()
    if (!LODOP) return
    arr.map((i) => {
        LODOP.PRINT_INIT('溯源码打印')
        LODOP.SET_PRINT_PAGESIZE(1, 400, 300, '溯源码')
        LODOP.SET_PRINT_STYLE('FontSize', 9)
        LODOP.ADD_PRINT_BARCODE(21, 15, 117, 62, '128Auto', i)
        LODOP.PREVIEW()
    })
}

export const pLodopCode = (arr) => {
    if (!(arr instanceof Array)) return
    const LODOP = getLodop()
    if (!LODOP) return
    arr.map((i) => {
        LODOP.PRINT_INIT('溯源码打印')
        LODOP.SET_PRINT_PAGESIZE(1, 400, 300, '溯源码')
        LODOP.SET_PRINT_STYLE('FontSize', 9)
        LODOP.ADD_PRINT_BARCODE(21, 15, 117, 62, '128Auto', i)
        LODOP.PRINT()
    })
}

export const pLodopImage = ({ url, printWidth, printHeight }) => {
    if (!url || !printWidth || !printHeight) return
    const LODOP = getLodop()
    if (!LODOP) return
    LODOP.SET_PRINT_PAGESIZE(1, printWidth, printHeight, '面单纸')
    LODOP.PRINT_INIT('打印面单')
    LODOP.ADD_PRINT_IMAGE(
        50,
        60,
        '100%',
        '100%',
        `<img border='0' src='${url}' />`
    )
    LODOP.SET_PRINT_STYLEA(0, 'Stretch', 2)
    LODOP.PREVIEW()
}
// 证书图片打印 6寸
export const pLoadopCertificateImage = (url, count = 1) => {
    if (!url) return
    const LODOP = getLodop()
    if (!LODOP) return
    LODOP.SET_PRINT_PAGESIZE(1, '152mm', '102mm', '证书')
    LODOP.PRINT_INIT('打印证书')
    //(right,up)
    LODOP.ADD_PRINT_IMAGE('-1mm', '-1mm', '149mm', '100mm', url)
    LODOP.SET_PRINT_STYLEA(0, 'Stretch', 2)
    // LODOP.SET_PRINT_COPIES(count)
    // LODOP.PREVIEW();

    LODOP.PRINT()
}

// 打印证书 可传入尺寸
export const pLodopCertificateImageInch = (url, inch, type) => {
    if (!url) return
    const LODOP = getLodop()
    if (!LODOP) return
    if (!inch) return
    const lodopCertificateImageSizeObj = lodopCertificateImageMap[type]
    if (!lodopCertificateImageSizeObj) return
    const { SET_PRINT_PAGESIZE, ADD_PRINT_IMAGE } = lodopCertificateImageSizeObj
    if (!SET_PRINT_PAGESIZE || !ADD_PRINT_IMAGE) return
    LODOP.PRINT_INIT(`打印${inch}寸证书`)
    LODOP.SET_PRINT_PAGESIZE(
        1,
        SET_PRINT_PAGESIZE.pageWidth,
        SET_PRINT_PAGESIZE.pageHeight,
        `${inch}寸证书`
    )
    // LODOP.PRINT_INIT("打印5寸证书");
    // top left
    LODOP.ADD_PRINT_IMAGE(
        ADD_PRINT_IMAGE.top,
        ADD_PRINT_IMAGE.left,
        ADD_PRINT_IMAGE.width,
        ADD_PRINT_IMAGE.height,
        url
    )
    LODOP.SET_PRINT_STYLEA(0, 'Stretch', 2)
    // LODOP.PREVIEW();
    // LODOP.SET_PRINT_COPIES(printNum)
    LODOP.PRINT()
}

export const pLodopHtmlWithUrl = async (body) => {
    const {
        url = null,
        expressCompany = 'kuaidiniao',
        pageWidth = 76,
        pageHeight = 130,
    } = body
    const LODOP = getLodop()
    if (!LODOP || !url) return
    try {
        const index = await findLodopIndex(expressCompany, LODOP)
        LODOP.PRINT_INIT('HTML打印')
        LODOP.SET_PRINTER_INDEX(index)
        LODOP.SET_PRINT_PAGESIZE(
            1,
            pageWidth * 10,
            pageHeight * 10,
            'kuaidiniao'
        )
        LODOP.ADD_PRINT_URL(5, 10, pageWidth * 10 - 5, pageHeight * 10 - 5, url)
        LODOP.PRINT()
    } catch (e) {
        const msg = e || '未找到对应打印机'
        message.error(msg)
    }
}

const findLodopIndex = (fname, LODOP) => {
    const promse = new Promise((resolve, reject) => {
        let index
        const count = LODOP.GET_PRINTER_COUNT()
        for (let i = 0; i <= count; i++) {
            let name = LODOP.GET_PRINTER_NAME(i)
            if (name === fname) {
                index = i
                break
            }
        }
        if (typeof index !== 'number') {
            reject('未找到对应打印机')
        } else {
            resolve(index)
        }
    })
    return promse
}

export const pLodopBase64 = async (body) => {
    const {
        intOrient = 1,
        base64 = null,
        expressCompany = 'shunfeng',
        pageWidth = 76,
        pageHeight = 130,
        strPageName = 'CreateCustomPage',
        Top = 20,
        Left = 15,
        Width = '100%',
        Height = '100%',
        strModeType = 'PRINT_PAGE_PERCENT',
        varModeValue = '42%',
    } = body
    LODOP = getLodop()
    if (!LODOP || !base64) return
    try {
        const index = await findLodopIndex(expressCompany, LODOP)
        LODOP.PRINT_INIT('打印插件功能演示_Lodop功能_BASE64编码串打印图片')
        LODOP.SET_PRINTER_INDEX(index)
        LODOP.SET_PRINT_PAGESIZE(
            intOrient,
            pageWidth * 10,
            pageHeight * 10,
            strPageName
        )
        LODOP.ADD_PRINT_IMAGE(Top, Left, Width, Height, base64)
        LODOP.SET_PREVIEW_WINDOW(1, 0, 0, 0, 0, '')
        LODOP.SET_PRINT_MODE(strModeType, varModeValue)
        // LODOP.PRINT()
        LODOP.PREVIEW()
    } catch (e) {
        const msg = e || '未找到对应打印机'
        message.error(msg)
    }
}

export const pLodopCodeString = async (body) => {
    const {
        codeString = null,
        expressCompany = 'shunfeng',
        pageWidth = 76,
        pageHeight = 130,
    } = body
    LODOP = getLodop()
    if (!LODOP || !codeString) return
    try {
        const index = await findLodopIndex(expressCompany, LODOP)
        LODOP.PRINT_INIT('打印插件功能演示_Lodop功能_BASE64编码串打印图片')
        LODOP.SET_PRINTER_INDEX(index)
        LODOP.SET_PRINT_PAGESIZE(
            1,
            pageWidth * 10,
            pageHeight * 10,
            'sourceTrace'
        )
        eval(codeString)
        LODOP.PRINT()
        // LODOP.PREVIEW();
    } catch (e) {
        const msg = e || '未找到对应打印机'
        message.error(msg)
    }
}

export const pLodopCodeDouble = async (arr) => {
    if (!(arr instanceof Array)) return
    const LODOP = getLodop()
    if (!LODOP) return
    try {
        const index = await findLodopIndex('suyuanma', LODOP)
        const dPrint = (dArr) => {
            const tem = dArr.splice(0, 2)
            LODOP.PRINT_INIT('打印插件功能演示_Lodop功能_打印条码')
            LODOP.SET_PRINT_PAGESIZE(1, 840, 320, 'sourceTrace')
            LODOP.SET_PRINTER_INDEX(index)
            LODOP.ADD_PRINT_BARCODE(25, 25, 117, 62, '128Auto', tem[0])
            if (tem[1]) {
                LODOP.ADD_PRINT_BARCODE(25, 184, 117, 62, '128Auto', tem[1])
            }
            LODOP.PRINT()
            if (dArr.length > 0) {
                dPrint(dArr)
            }
        }
        dPrint(arr)
    } catch (e) {
        const msg = e || '未找到对应打印机'
        message.error(msg)
    }
}

export const pLodopHtml = async (body) => {
    const {
        style = '',
        html = '',
        expressCompany = 'suyuanma',
        pageWidth = 100,
        pageHeight = 180,
    } = body
    LODOP = getLodop()
    if (!LODOP || !html) return
    try {
        const index = await findLodopIndex(expressCompany, LODOP)
        const strFormHtml = style + html
        LODOP.PRINT_INIT('打印控件功能演示_Lodop功能_样式风格')
        LODOP.SET_PRINTER_INDEX(index)
        LODOP.ADD_PRINT_HTM(2, 2, pageWidth * 10, pageHeight * 10, strFormHtml)
        LODOP.SET_PREVIEW_WINDOW(1, 0, 0, 0, 0, '')
        LODOP.SET_PRINT_MODE('PRINT_PAGE_PERCENT', '100%')
        LODOP.PREVIEW()
    } catch (e) {
        console.log(e)
        const msg = e || '未找到对应打印机'
        message.error(msg)
    }
}

// A4
export const pLodopA4 = async (body) => {
    const { base64 = null, expressCompany = 'shunfeng' } = body
    const LODOP = getLodop()
    if (!LODOP || !base64 || !base64.length) return
    try {
        const index = await findLodopIndex(expressCompany, LODOP)
        LODOP.PRINT_INIT('打印插件功能演示_Lodop功能_BASE64编码串打印图片')
        LODOP.SET_PRINTER_INDEX(index)
        LODOP.SET_PRINT_PAGESIZE(3, 0, 0, '')
        if (Array.isArray(base64)) {
            for (let i = 0; i < base64.length; i++) {
                LODOP.ADD_PRINT_IMAGE(20, 20, '100%', '100%', base64[i])
                LODOP.NewPage()
            }
        } else {
            LODOP.ADD_PRINT_IMAGE(20, 20, '100%', '100%', base64)
        }
        LODOP.SET_PREVIEW_WINDOW(1, 0, 0, 0, 0, '')
        LODOP.SET_PRINT_MODE('PRINT_PAGE_PERCENT', 'Full-Page')
        // LODOP.SET_PRINT_MODE('PRINT_PAGE_PERCENT', '59.4%')
        // LODOP.PREVIEW()
        LODOP.PRINT()
    } catch (e) {
        const msg = e || '未找到对应打印机'
        message.error(msg)
    }
}
