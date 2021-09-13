export function emitEmpty(
    obj: Record<string, unknown>
): Record<string, unknown> {
    const newObj: Record<string, unknown> = {}
    Object.keys(obj).forEach((k) => {
        if (obj[k] !== '' && obj[k] !== null && obj[k] !== undefined) {
            newObj[k] = obj[k]
        }
    })
    return newObj
}
