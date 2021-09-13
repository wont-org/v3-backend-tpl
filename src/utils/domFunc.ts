import { get } from 'lodash'
import { Ref } from 'vue'

export const onFocus = (elRef: Ref<any>, select?: boolean) => {
    const focus = get(elRef, 'value.focus')
    const selectFunc = get(elRef, 'value.select')
    if (typeof focus === 'function') {
        elRef.value.focus()
    }
    if (select && typeof selectFunc === 'function') {
        elRef.value.select()
    }
}
