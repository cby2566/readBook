/**
 * @description: 自定义promise
 * @param {fucntion} executor 执行器函数(同步执行)
 * @Date: 2022-01-03 03:02:58
 * @Author: mulingyuer
 */
 class MyPromise {
    status = "";  //状态
    value = null; //值
    callbacks = [];  //存储回调，结构：{onResolved,onRejected}
    //状态
    static PEDDING = "pedding";
    static FULFILLED = "fulfilled";
    static REJECTED = "rejected";
  
  
    constructor(executor) {
      this.status = MyPromise.PEDDING;
  
      //运行执行器并捕获错误
      try {
        executor(this.resolve.bind(this), this.reject.bind(this));
      } catch (error) {
        this.reject(error);
      }
    }
  
    /**
     * @description: resolve
     * @param {*} value
     * @Date: 2022-01-03 03:16:33
     * @Author: mulingyuer
     */
    resolve(value) {
      if (this.status !== MyPromise.PEDDING) return;
      //改变状态
      this.status = MyPromise.FULFILLED;
      //保存数据
      this.value = value;
      //运行回调，使用宏队列模拟微队列
      if (this.callbacks.length > 0) {
        setTimeout(() => {
          this.callbacks.forEach(item => {
            item.onResolved(this.value);
          })
        })
      }
    }
  
    /**
     * @description: reject
     * @param {*} reason
     * @Date: 2022-01-03 03:16:55
     * @Author: mulingyuer
     */
    reject(reason) {
      if (this.status !== MyPromise.PEDDING) return;
      //改变状态
      this.status = MyPromise.REJECTED;
      //保存数据
      this.value = reason;
      //运行回调，使用宏队列模拟微队列
      if (this.callbacks.length > 0) {
        setTimeout(() => {
          this.callbacks.forEach(item => {
            item.onRejected(this.value);
          })
        })
      }
    }
  
    /**
     * @description: then方法，并返回一个新的promise对象
     * @param {function} onResolved 成功的回调
     * @param {function} onRejected 失败的回调 
     * @Date: 2022-01-03 03:04:00
     * @Author: mulingyuer
     */
    then(onResolved, onRejected) {
      //默认处理，参数必须是函数
      onResolved = typeof onResolved === "function" ? onResolved : value => value; //默认值进行传递
      onRejected = typeof onRejected === "function" ? onRejected : reason => { throw reason }; //默认值进行传递
  
  
  
      return new MyPromise((resolve, reject) => {
        //通用处理状态的方法：如果返回的值是promise，则根据promise的结果改变状态，否则默认resolve
        function handle(callback) {
          try {
            const result = callback(this.value);
            //如果返回的值是promise，则根据promise的结果改变状态，否则默认resolve
            if (result instanceof MyPromise) {
              return result.then(resolve, reject);
            } else {
              return resolve(result);
            }
          } catch (error) {
            return reject(error);
          }
        }
  
  
        //pedding状态保存回调
        if (this.status === MyPromise.PEDDING) {
          this.callbacks.push({
            onResolved: () => {
              handle.call(this, onResolved);
            },
            onRejected: () => {
              handle.call(this, onRejected);
            }
          });
        }
  
        //成功状态
        if (this.status === MyPromise.FULFILLED) {
          setTimeout(() => {
            handle.call(this, onResolved);
          })
        }
  
        //失败状态
        if (this.status === MyPromise.REJECTED) {
          setTimeout(() => {
            handle.call(this, onRejected);
          })
        }
      });
  
    }
  
    /**
     * @description: catch 方法
     * @param {function} onRejected 失败的回调
     * @Date: 2022-01-03 03:04:48
     * @Author: mulingyuer
     */
    catch(onRejected) {
      return this.then(null, onRejected);
    }
  
    /**
     * @description: 函数对象的resolve方法
     * @param {*} value 
     * @Date: 2022-01-03 03:05:31
     * @Author: mulingyuer
     */
    static resolve(value) {
      return new MyPromise((resolve, reject) => {
        if (value instanceof MyPromise) {
          return value.then(resolve, reject);
        } else {
          return resolve(value);
        }
      })
    }
  
    /**
     * @description: 函数对象的reject方法
     * @param {*} reason
     * @Date: 2022-01-03 03:06:42
     * @Author: mulingyuer
     */
    static reject(reason) {
      return new MyPromise((resolve, reject) => reject(reason));
    }
  
  
    /**
     * @description: 函数对象all方法
     * @param {array} promises promise数组
     * @Date: 2022-01-03 03:07:08
     * @Author: mulingyuer
     */
    static all(promises) {
      //创建一个对应数量的空数组
      const arr = new Array(promises.length);
      //计数器
      let count = 0;
      //返回一个promise
      return new MyPromise((resolve, reject) => {
        promises.forEach((item, index) => {
          MyPromise.resolve(item).then(
            res => {
              count++;
              //根据位置保存数据
              arr[index] = res;
              //判断是否完成
              if (count === promises.length) {
                return resolve(arr);
              }
            },
            err => {
              return reject(err);
            }
          )
        });
      });
    }
  
  
    /**
     * @description: 函数对象race方法
     * @param {array} promises promise数组
     * @Date: 2022-01-03 03:07:47
     * @Author: mulingyuer
     */
    static race(promises) {
      return new MyPromise((resolve, reject) => {
        promises.forEach(item => {
          MyPromise.resolve(item).then(resolve, reject);
        })
      })
    }
  
  
    /**
     * @description: 延迟指定时间返回成功的promise
     * @param {*} value
     * @param {number} time 
     * @Date: 2022-01-03 05:19:36
     * @Author: mulingyuer
     */
    static resolveDelay(value, time) {
      return new MyPromise((resolve, reject) => {
        setTimeout(() => {
          if (value instanceof MyPromise) {
            return value.then(resolve, reject);
          } else {
            return resolve(value);
          }
        }, time)
      });
    }
  
    /**
     * @description: 延迟指定时间返回错误的promise
     * @param {*} reason
     * @param {number} time
     * @Date: 2022-01-03 05:21:52
     * @Author: mulingyuer
     */
    static rejectDelay(reason, time) {
      return new MyPromise((resolve, reject) => {
        setTimeout(() => {
          return reject(reason);
        }, time)
      })
    }
  
  }