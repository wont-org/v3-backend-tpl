interface Speech {
    text: string
}
// TODO 暂时弃用 chrome 浏览器，部分电脑无效
const useSpeechSync = () => {
    const speechMsg = new SpeechSynthesisUtterance()
    const speechSynth = window.speechSynthesis
    speechMsg.lang = 'zh-CN'
    speechMsg.volume = 1

    const cancel = () => {
        speechSynth.cancel()
    }
    return {
        play: ({ text } = {} as Speech) => {
            cancel()
            speechMsg.text = text
            speechSynth.speak(speechMsg)
            // console.log('speechSynth.getVoices() :>> ', speechSynth.getVoices())
            // console.log('speechMsg, speechSynth :>> ', speechMsg, speechSynth)
        },
        cancel,
    }
}

export default useSpeechSync
