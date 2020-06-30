const CODES = {
    A: 65,
    Z: 90
}

function toCell() {
    return `<div class="cell" contenteditable>B2</div>`
}

function toColumn(col) {
    return `<div class="column">${col}</div>`
}

function createRow(content, i) {
    return `
        <div class="row">
            <div class="row-info">${i === undefined ? '' : i + 1}</div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function toChar(_, i) {
    return String.fromCharCode(CODES.A + i)
}

export function createTable(rowsCont = 15) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('')

    rows.push(createRow(cols))

    for (let i = 0; i < rowsCont; i++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell)
            .join('')
        rows.push(createRow(cells, i))
    }

    return rows.join('')
}
