// This is a sample code for util.ts file

export const inBrowser = typeof window !== 'undefined'

export const isObject = (val: unknown): val is Record<any, any> => {
  return val !== null && typeof val === 'object'
}

export const isDef = <T>(val: T): val is NonNullable<T> => {
  return val !== undefined && val !== null
}

export const isFunction = (val: unknown): val is Function => {
  return typeof val === 'function'
}

export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export const isDate = (val: unknown): val is Date =>
  Object.prototype.toString.call(val) === '[object Date]' && !Number.isNaN((val as Date).getTime())

export function isMobile(value: string): boolean {
  value = value.replace(/[^-|\d]/g, '')
  return /^((\+86)|(86))?(1)\d{10}$/.test(value) || /^0[0-9-]{10,13}$/.test(value)
}

export const isIOS = (): boolean =>
  inBrowser ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : false

// 任务开始中断
export const poccessTask = (list) => {
  let flag = false
  const taskResult = []
  let i = 0
  return {
    // 任务开始
    startTask() {
      return new Promise(async (resolve) => {
        if (flag) return
        flag = true
        while (i < list.length) {
          if (!flag) return
          console.log(`startTask ${i} start`)
          const result = await list[i]()
          taskResult.push(result)
          console.log(`startTask ${i} done`)
          i++
        }
        resolve(taskResult)
        flag = false
      })
    },
    // 任务终止
    puaseTask() {
      flag = false
      console.log('stopTask')
    },
  }
}
