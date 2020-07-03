const CODES = {
    A: 65,
    Z: 90
}

function toCell(_, colIndex) {
    return `<div class="cell" contenteditable data-col="${colIndex}">B2</div>`
}

function toColumn(col, i) {
    return `
        <div class="column" data-type="resizable" data-col="${i}">
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(content, i) {
    const resizer = i === undefined ? '' : '<div class="row-resize" data-resize="row"></div>'
    return `
        <div class="row">
            <div class="row-info">
                ${i === undefined ? '' : i + 1}
                <!--<div class="row-resize"></div>-->
                ${resizer}
            </div>
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
