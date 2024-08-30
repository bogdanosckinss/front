export default class Debouncer {
    debounce(fn, timeout = 300) {
        let timer = undefined
        return (...args) => {
            timer  = this.scheduledCallback(args, timer, fn, timeout)
        }
    }

    scheduledCallback(args, timer, fn, timeout) {
        clearTimeout(timer)
        return setTimeout(()=>{
            fn.apply(this, args)
        }, timeout)
    }
}
