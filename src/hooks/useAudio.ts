import { AUDIO } from '@/common/constant'

const useAudio = () => {
    const audio = new Audio()
    audio.loop = false
    return {
        error: () => {
            audio.src = AUDIO.error
            audio.play()
        },
    }
}

export default useAudio
