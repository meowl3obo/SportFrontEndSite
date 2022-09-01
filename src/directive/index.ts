import { App } from "vue"
import { CollapseDirective } from './directive/collapse'

function Directive(vue: App): void {
    CollapseDirective(vue)
}

export default Directive