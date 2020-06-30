import {capitalize} from '@core/utils';

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            console.log('!$root', $root)
            throw new Error('No $root provided for DomListener')
        }
        this.$root = $root
        this.listeners = listeners
    }

    initDomListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            const name = `${this.name} Component` || 'Component'
            if (!this[method]) {
                throw new Error(`Method ${method} isn't implimented in ${name}`)
            }
            this[method] = this[method].bind(this)
            this.$root.on(listener, this[method])
        })
    }

    removeDomListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            this.$root.off(listener, this[method])
        })
    }
}

function getMethodName(eventName) {
    return `on${capitalize(eventName)}`
}
