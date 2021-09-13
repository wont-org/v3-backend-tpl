export default {
    mounted(el: any) {
        if (el.tagName === 'INPUT') {
            el.focus()
        } else {
            const iel = el.querySelector('input')
            if (iel.tagName === 'INPUT') {
                iel.focus()
            }
        }
    },
}
