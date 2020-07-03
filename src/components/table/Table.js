import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {$} from '@core/Dom';

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            listeners: ['mousedown']
        })
    }

    toHtml() {
        return createTable(24)
    }

    onMousedown(event) {
        if (event.target.dataset.resize) {
            const $resizer = $(event.target)
            const $parent = $resizer.closest('[data-type="resizable"]')
            const coords = $parent.getCoords()
            const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`)

            document.onmousemove = e => {
                const delta = e.pageX - coords.right
                const value = coords.width + delta

                $parent.$el.style.width = value + 'px'
                cells.forEach(el => el.style.width = value + 'px')
            }

            document.onmouseup = () => document.onmousemove = null
        }
    }
}


// 302 msScripting
// 2935 msRendering
// 546 msPainting
// 434 msSystem
// 4190 msIdle
// 8406 msTotal
