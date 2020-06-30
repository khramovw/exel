import {$} from '@core/Dom';

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector) // Получаю селектор при инициализации new Excel
        this.components = options.components || [] // Масив компонентов
    }

    getRoot() {
        // Создаю обвертку .excel
        const $root = $.crete('div', 'excel')

        // Перебераю передаваемые компоненты при создании new Excel
        this.components = this.components.map(Component => {
            // Создаю div обветку для каждого компонента .className
            const $el = $.crete('div', Component.className)

            // Передаю в каждый класс компонента обвертку
            const component = new Component($el)

            // Внутрь обвертки вкладываю Html полученый из компонента
            $el.html(component.toHtml())

            // Складываю в обвертку .excel
            $root.append($el)

            return component
        })
        return $root
    }

    render() {
        this.$el.append(this.getRoot()) // Складываю в обвертку приложения
        console.log(this.components)
        this.components.forEach(component => component.init())
    }
}
