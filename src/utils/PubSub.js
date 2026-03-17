/**
 * 发布订阅模式
 */

class PubSub {
  constructor() {
    this.eventsMap = new Map()
    this.onceEventMap = new WeakMap()
  }

  on(eventName, handler) {
    const handlers = this.eventsMap.get(eventName) || []
    handlers.push(handler)
    this.eventsMap.set(eventName, handlers)
  }

  emit(eventName, ...args) {
    const handlers = this.eventsMap.get(eventName)
    if (!handlers) return

    handlers.forEach((h) => {
      h.apply(this, args)
    })
  }
  off(eventName, handler) {
    const handlers = this.eventsMap.get(eventName)
    if (!handlers) return
    const h = handlers.findIndex((h) => {
      return h === handler || h === this.onceEventMap.get(handler)
    })
    if (h > -1) {
      handlers.splice(index, -1)
      if (handlers.length === 0) {
        this.eventsMap.delete(eventName)
      }
    }
  }
  // 一次性订阅
  once(eventName, handler) {
    const onceFun = (...args) => {
      try {
        handler.apply(this, args)
      } finally {
        this.off(eventName, onceFun)
        this.onceEventMap.delete(handler)
      }
    }
    this.onceEventMap.set(handler, onceFun)
    this.eventsMap.on(eventName, handler)
  }
}
