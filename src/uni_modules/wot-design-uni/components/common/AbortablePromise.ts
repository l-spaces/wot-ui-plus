/**
 * 可中止的Promise类
 *
 * AbortablePromise 是对原生 Promise 的扩展，提供了手动中止异步操作的能力。
 * 在需要取消异步操作（如网络请求、文件上传/下载、定时器等）的场景中非常有用。
 * 它通过保存 Promise 的 reject 方法引用来实现中止功能，在调用 abort 方法时触发 reject。
 *
 * 主要应用场景：
 * - 文件上传/下载的取消操作
 * - 网络请求的取消
 * - 用户交互导致的异步流程中断
 * - 超时处理
 * - 组件卸载时清理未完成的异步操作
 *
 * @typeParam T 泛型参数，表示 Promise 解析后的值类型
 */
export class AbortablePromise<T> {
  /**
   * 内部封装的原生 Promise 实例
   * 用于存储和管理异步操作
   */
  promise: Promise<T>

  /**
   * Promise 的 reject 方法引用
   * 私有属性，用于在调用 abort 方法时拒绝 Promise
   */
  private _reject: ((res?: any) => void) | null = null

  /**
   * 构造函数
   *
   * @param executor 与原生 Promise 相同的执行器函数
   * @example
   * // 创建一个可中止的Promise
   * const abortablePromise = new AbortablePromise<string>((resolve, reject) => {
   *   const timer = setTimeout(() => resolve('操作完成'), 3000)
   *   // 可以在适当时机调用 resolve 或 reject
   * })
   */
  constructor(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void) {
    // 创建原生 Promise 并保存 reject 方法引用
    this.promise = new Promise<T>((resolve, reject) => {
      // 执行传入的执行器函数，提供 resolve 和 reject 方法
      executor(resolve, reject)
      // 保存 reject 方法的引用，以便在调用 abort 方法时能够中止 Promise
      this._reject = reject
    })
  }

  /**
   * 中止 Promise
   *
   * 通过调用保存的 reject 方法来中止 Promise，使其进入拒绝状态
   *
   * @param error 可选，中止时传递的错误信息
   * @example
   * // 中止 Promise 执行
   * abortablePromise.abort(new Error('操作被用户取消'))
   */
  abort(error?: any) {
    // 检查是否存在 _reject 方法引用
    if (this._reject) {
      // 调用 _reject 方法并传入可选的错误信息
      this._reject(error)
      // 执行后将 _reject 设置为 null，防止重复调用
      this._reject = null
    }
  }

  /**
   * 注册 Promise 成功和失败的回调函数
   *
   * 与原生 Promise 的 then 方法兼容，返回一个新的 Promise
   *
   * @param onfulfilled Promise 成功时的回调函数
   * @param onrejected Promise 失败时的回调函数
   * @returns 返回一个新的 Promise
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
  ): Promise<TResult1 | TResult2> {
    // 直接调用内部 promise 的 then 方法
    return this.promise.then(onfulfilled, onrejected)
  }

  /**
   * 注册 Promise 失败的回调函数
   *
   * 与原生 Promise 的 catch 方法兼容，返回一个新的 Promise
   *
   * @param onrejected Promise 失败时的回调函数
   * @returns 返回一个新的 Promise
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult> {
    // 直接调用内部 promise 的 catch 方法
    return this.promise.catch(onrejected)
  }
}
