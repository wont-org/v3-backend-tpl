const storageList = ['localStorage', 'sessionStorage'] as const
type WebStorage = typeof storageList[number]

export function createStorage(webStorage: WebStorage) {
    if (!storageList.includes(webStorage)) {
        throw new Error(
            `Invalid webStorage, expect oneOf ${storageList.join(
                ','
            )}, but got ${webStorage}`
        )
    }
    const storage: Storage = window[webStorage]
    const set = (key: string, val: unknown) => {
        const strVal = JSON.stringify(val)
        storage.setItem(key, strVal)
    }
    const get = (key: string): unknown | null => {
        let val = storage.getItem(key)
        if (typeof val === 'string') {
            val = JSON.parse(val)
        }
        return val
    }
    const rm = (key: string) => {
        storage.removeItem(key)
    }
    return {
        set,
        get,
        rm,
    }
}
