/*eslint-disable*/
import { Modal } from 'ant-design-vue'
import { isMac } from './config'
// ====页面动态加载C-Lodop云打印必须的文件CLodopfuncs.js====
;(function () {
    if (isMac) return
    var head =
        document.head ||
        document.getElementsByTagName('head')[0] ||
        document.documentElement
    var oscript = document.createElement('script')
    // 让本机的浏览器打印(更优先一点)：
    oscript = document.createElement('script')
    oscript.src = 'http://localhost:8000/CLodopfuncs.js?priority=2'
    head.insertBefore(oscript, head.firstChild)
    // 加载双端口(8000和18000）避免其中某个端口被占用：
    oscript = document.createElement('script')
    oscript.src = 'http://localhost:18000/CLodopfuncs.js?priority=1'
    head.insertBefore(oscript, head.firstChild)
})()

// 下载loadLodop
function loadLodop() {
    window.open(
        'https://cdn.wanwudezhi.com/static/web-static/application/4d6bb9e58b352636d57b0645053e5946.exe'
    )
}

// ====获取LODOP对象的主过程：====
function getLodop() {
    var LODOP
    try {
        LODOP = getCLodop()
        if (!LODOP && document.readyState !== 'complete') {
            Modal.warning({
                title: '提示',
                content: 'C-Lodop打印控件还没准备好，请稍后再试！',
            })
            return
        }
        LODOP.SET_LICENSES(
            '',
            'BD16A51623A4C5A41B4125FBD0E3223C536',
            '23580B189D96F33252722697A57AC00506B',
            ''
        )
        return LODOP
    } catch (err) {
        Modal.confirm({
            title: '温馨提示',
            type: 'warning',
            content:
                '您还未安装打印控件，点击确定下载打印控件，安装成功后刷新页面即可进行打印',
            onOk() {
                loadLodop()
            },
        })
    }
}

export default getLodop
