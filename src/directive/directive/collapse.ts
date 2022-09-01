import { App, DirectiveBinding } from "vue"

export function CollapseDirective(vue: App): void {
    vue.directive('collapse', {
        mounted(el: HTMLElement, binding: DirectiveBinding) {
            const colContent = document.getElementById(`col_${binding.value}`)
            const colIcon = document.getElementById(`icon_${binding.value}`)

            if (binding.arg == "check" && colContent != null) {
                if (binding.value.includes('_0')) {
                    setTimeout(() => {
                        colContent.style.height = `${colContent.scrollHeight+6}px`
                    }, 100)
                } else {
                    colContent.style.height = '0px'
                }
            }
            el.addEventListener('click', () => {
                if (colContent != undefined) {
                    if (colContent.style.height == '0px' || colContent.style.height == '') {
                        colContent.style.height = `${colContent.scrollHeight+6}px`
                        if (colIcon != undefined) {
                            colIcon.setAttribute('active', "true")
                        }
                    } else {
                        colContent.style.height = '0px'
                        if (colIcon != undefined) {
                            colIcon.setAttribute('active', "false")
                        }
                    }
                }
            })
        }
    })
}
