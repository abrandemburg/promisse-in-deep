const STATE = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
}

class NPromise {
  //must have a function called executor
  constructor(executor) {
    if(typeof executor !== 'function') {
      throw new Error('Executor must be a function')
    }

    this.state = STATE.PENDING
    this.value = undefined
    this.onFulfillChain = []
    this.onRejectCallChain = []

    //executor receive 2 callbacks, resolve and reject
    executor(this.resolve.bind(this), this.reject.bind(this))
  }

  then(onFulfill) {
    return new NPromise(resolve => {
      const onFulfilled = res => {
        resolve(onFulfill(res))
      }

      if(this.state === STATE.FULFILLED) {
        onFulfilled(this.value)
      } else {
        this.onFulfillChain.push(onFulfilled)
      }
    })
  }

  catch(onReject) {
    return new NPromise((resolve, reject) => {
      const onRejected = res => {
        try{
          resolve(onReject(res))
        } catch(error) {
          reject(error)
        }
      }

      if(this.state === STATE.REJECTED) {
        onRejected(this.value)
      } else {
        this.onRejectCallChain.push(onRejected)
      }
    })
  }

  //resolve receive a value
  resolve(res) {
    //change state only one time
    if(this.state !== STATE.PENDING) {
      return
    }

    if(res != null && typeof res.then == 'function') {
      return res.then(this.resolve.bind(this))
    }

    this.state = STATE.FULFILLED
    this.value = res

    for(const onFulfilled of this.onFulfillChain) {
      onFulfilled(res)
    }

  }

  reject(error) {

    if(this.state !== STATE.PENDING) {
      return
    }

    this.state = STATE.REJECTED
    this.value = error

    for(const onRejected of this.onRejectCallChain) {
      onRejected(error)
    }
  }
}

module.exports = NPromise