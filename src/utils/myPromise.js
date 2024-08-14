// 定义一个Promise对象
class MyPormise {
  constructor(executor) {
    this.status = 'pending'
    this.value = undefined
    // 保存成功和失败的回调函数
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []
    // 成功的回调函数
    const resolve = (value) => {
      this.status = 'fulfilled'
      this.value = value
      this.onFulfilledCallbacks.forEach((cb) => cb(value))
    }
    // 失败的回调函数
    const reject = (reason) => {
      this.status = 'rejected'
      this.value = reason
      this.onRejectedCallbacks.forEach((cb) => cb(reason))
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  then(onFulfilled, onRejected) {
    // 判断是否为函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (onFulfilled) => onFulfilled
    onRejected = typeof onRejected === 'function' ? onRejected : (onRejected) => onRejected
    return new MyPormise((resolve, reject) => {
      const fulfilledCallback = () => {
        try {
          const result = onFulfilled(this.value)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      }
      const rejectedCallback = () => {
        try {
          const result = onRejected(this.value)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      }
      if (this.status === 'fulfilled') {
        setTimeout(fulfilledCallback, 0)
      } else if (this.status === 'rejected') {
        setTimeout(rejectedCallback, 0)
      } else {
        // 等待状态改变后执行回调函数
        this.onFulfilledCallbacks.push(fulfilledCallback)
        this.onRejectedCallbacks.push(rejectedCallback)
      }
    })
  }
}
