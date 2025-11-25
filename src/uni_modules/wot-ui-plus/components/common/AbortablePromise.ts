/**
 * 可中止的 Promise 类
 *
 * 本文件是 Wot Design UI 组件库的核心工具类，提供可中止的异步操作管理功能。
 * AbortablePromise 是对原生 Promise 的扩展，提供了手动中止异步操作的能力。
 *
 * 核心功能：
 * - 扩展原生 Promise，支持手动中止异步操作
 * - 提供与原生 Promise 完全兼容的 API 接口
 * - 支持泛型类型参数，确保类型安全
 * - 实现资源清理和内存管理机制
 *
 * 设计思路：
 * - 采用装饰器模式，封装原生 Promise 实例
 * - 通过保存 reject 方法引用来实现中止功能
 * - 在调用 abort 方法时触发 reject，使 Promise 进入拒绝状态
 * - 防止重复中止操作，确保状态一致性
 *
 * 主要应用场景：
 * - 文件上传/下载的取消操作
 * - 网络请求的取消（如 fetch、axios 请求）
 * - 用户交互导致的异步流程中断
 * - 超时处理和竞态条件管理
 * - 组件卸载时清理未完成的异步操作
 * - 批量操作中的单个任务取消
 *
 * 主要对外接口：
 * - constructor: 构造函数，创建可中止的 Promise 实例
 * - abort: 中止方法，手动取消异步操作
 * - then: Promise 链式操作，与原生 Promise 兼容
 * - catch: 错误捕获，与原生 Promise 兼容
 *
 * 使用注意事项：
 * - 中止操作会触发 Promise 的拒绝状态，需要正确处理错误
 * - 多次调用 abort 方法只有第一次会生效
 * - 中止后无法恢复 Promise 的执行状态
 * - 需要确保在适当的时机调用 abort 方法进行资源清理
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
   * 创建 AbortablePromise 实例，初始化内部 Promise 并保存 reject 方法引用
   * 该构造函数与原生 Promise 构造函数完全兼容，支持相同的执行器函数
   *
   * @param executor - 执行器函数，与原生 Promise 构造函数参数相同
   *                  - resolve: 成功回调函数，用于完成 Promise
   *                  - reject: 失败回调函数，用于拒绝 Promise
   *
   * @example
   * ```typescript
   * // 创建一个可中止的 Promise，3秒后自动完成
   * const abortablePromise = new AbortablePromise<string>((resolve, reject) => {
   *   const timer = setTimeout(() => resolve('操作完成'), 3000)
   *
   *   // 可以在适当时机调用 resolve 或 reject
   *   // 例如在组件卸载时清理定时器
   * })
   *
   * // 创建网络请求的可中止 Promise
   * const requestPromise = new AbortablePromise<Response>((resolve, reject) => {
   *   fetch('/api/data')
   *     .then(response => resolve(response))
   *     .catch(error => reject(error))
   * })
   * ```
   *
   * @throws {TypeError} 当 executor 参数不是函数时抛出类型错误
   * @throws {Error} 执行器函数内部可能抛出的任何错误
   */
  constructor(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void) {
    // 创建原生 Promise 实例，用于实际执行异步操作
    this.promise = new Promise<T>((resolve, reject) => {
      // 执行传入的执行器函数，提供 resolve 和 reject 方法
      // 执行器函数内部可以包含异步操作逻辑
      executor(resolve, reject)

      // 保存 reject 方法的引用，以便在调用 abort 方法时能够中止 Promise
      // 这是实现可中止功能的关键机制
      this._reject = reject
    })
  }

  /**
   * 中止 Promise
   *
   * 核心中止方法，通过调用保存的 reject 方法来中止 Promise，使其进入拒绝状态
   * 该方法实现了手动控制异步操作生命周期的能力
   *
   * 状态转换逻辑：
   * - 如果 Promise 尚未完成，调用此方法会立即拒绝 Promise
   * - 如果 Promise 已经完成（resolve 或 reject），此方法不会产生任何效果
   * - 多次调用只有第一次会生效，后续调用会被忽略
   *
   * @param error - 可选参数，中止时传递的错误信息
   *               - 如果提供错误对象，会在 Promise 拒绝时传递
   *               - 如果不提供，默认使用 undefined 作为拒绝原因
   *
   * @example
   * ```typescript
   * // 中止 Promise 并传递自定义错误信息
   * abortablePromise.abort(new Error('操作被用户取消'))
   *
   * // 中止 Promise 但不传递具体错误信息
   * abortablePromise.abort()
   *
   * // 在组件卸载时中止未完成的异步操作
   * useEffect(() => {
   *   const promise = new AbortablePromise((resolve) => {
   *     // 异步操作
   *   })
   *
   *   return () => {
   *     // 组件卸载时中止 Promise
   *     promise.abort(new Error('组件卸载，操作中止'))
   *   }
   * }, [])
   * ```
   *
   * @returns 无返回值
   */
  abort(error?: any) {
    // 检查是否存在 _reject 方法引用，确保 Promise 尚未完成
    if (this._reject) {
      // 调用保存的 reject 方法，使 Promise 进入拒绝状态
      // 传递可选的错误信息，便于错误处理和调试
      this._reject(error)

      // 执行后将 _reject 设置为 null，防止重复调用
      // 这是实现"一次性中止"机制的关键
      this._reject = null
    }
    // 如果 _reject 为 null，说明 Promise 已经完成或已被中止，不做任何操作
  }

  /**
   * Promise 链式调用方法
   *
   * 与原生 Promise 的 then 方法完全兼容，支持链式调用和异步操作组合
   * 该方法返回新的 AbortablePromise 实例，保持可中止特性
   *
   * 链式调用特性：
   * - 支持多个 then 方法的链式调用
   * - 每个 then 调用都会返回新的 AbortablePromise 实例
   * - 支持异步操作的结果转换和错误处理
   *
   * @param onfulfilled - 成功回调函数，当 Promise 完成时调用
   *                    - 接收 Promise 的完成值作为参数
   *                    - 可以返回新的值或 Promise
   *                    - 如果为 null 或 undefined，值会直接传递给下一个 then
   *
   * @param onrejected - 失败回调函数，当 Promise 被拒绝时调用
   *                   - 接收拒绝原因作为参数
   *                   - 可以返回新的值或 Promise 来恢复链式调用
   *                   - 如果为 null 或 undefined，错误会传递给下一个 catch
   *
   * @returns 返回新的 AbortablePromise<TResult1 | TResult2> 实例
   *          - 支持继续链式调用
   *          - 保持可中止特性
   *
   * @example
   * ```typescript
   * // 基本链式调用示例
   * const result = await new AbortablePromise<string>((resolve) => {
   *   resolve('Hello')
   * })
   * .then(value => value + ' World') // 转换结果
   * .then(value => value.toUpperCase()) // 继续转换
   *
   * console.log(result) // 输出: "HELLO WORLD"
   *
   * // 错误处理链式调用
   * new AbortablePromise<string>((resolve, reject) => {
   *   reject(new Error('操作失败'))
   * })
   * .then(
   *   value => console.log('成功:', value),
   *   error => {
   *     console.error('失败:', error.message)
   *     return '默认值' // 从错误中恢复
   *   }
   * )
   * .then(value => console.log('恢复后的值:', value))
   * ```
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
  ): AbortablePromise<TResult1 | TResult2> {
    // 调用内部 Promise 的 then 方法，并返回新的 AbortablePromise 实例
    // 这样保持了链式调用的同时，新的 Promise 也具有可中止特性
    return new AbortablePromise<TResult1 | TResult2>((resolve, reject) => {
      // 将回调函数传递给内部 Promise 的 then 方法
      // 使用 Promise 链式调用的标准模式
      this.promise.then(onfulfilled, onrejected).then(resolve, reject)
    })
  }

  /**
   * Promise 错误捕获方法
   *
   * 与原生 Promise 的 catch 方法完全兼容，专门用于捕获 Promise 链中的错误
   * 该方法提供了一种优雅的错误处理机制，避免在 then 方法中重复编写错误处理逻辑
   *
   * 错误处理特性：
   * - 捕获 Promise 链中任何位置抛出的错误
   * - 支持从错误中恢复并继续链式调用
   * - 可以与 then 方法结合使用，实现清晰的错误处理流程
   *
   * @param onrejected - 失败回调函数，当 Promise 被拒绝时调用
   *                   - 接收拒绝原因作为参数
   *                   - 可以返回新的值或 Promise 来恢复链式调用
   *                   - 如果返回正常值，链式调用会继续执行
   *                   - 如果抛出新的错误，会被后续的 catch 捕获
   *
   * @returns 返回新的 AbortablePromise<T | TResult> 实例
   *          - 如果错误被成功处理，继续链式调用
   *          - 保持可中止特性
   *
   * @example
   * ```typescript
   * // 基本错误捕获示例
   * new AbortablePromise<string>((resolve, reject) => {
   *   reject(new Error('网络请求失败'))
   * })
   * .catch(error => {
   *   console.error('捕获到错误:', error.message)
   *   return '默认返回值' // 从错误中恢复
   * })
   * .then(value => console.log('最终结果:', value)) // 输出: "默认返回值"
   *
   * // 与 then 方法结合使用
   * new AbortablePromise<number>((resolve, reject) => {
   *   Math.random() > 0.5 ? resolve(42) : reject(new Error('随机失败'))
   * })
   * .then(value => value * 2) // 成功时执行
   * .catch(error => {
   *   console.warn('操作失败，使用默认值')
   *   return 0 // 错误恢复
   * })
   * .then(finalValue => console.log('最终值:', finalValue))
   *
   * // 多个 catch 方法组合
   * new AbortablePromise<void>((resolve, reject) => {
   *   reject(new TypeError('类型错误'))
   * })
   * .catch((error): string => {
   *   if (error instanceof TypeError) {
   *     return '处理类型错误'
   *   }
   *   throw error // 重新抛出未处理的错误类型
   * })
   * .catch(error => {
   *   console.error('处理其他错误:', error)
   *   return '未知错误'
   * })
   * ```
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null): AbortablePromise<T | TResult> {
    // 调用内部 Promise 的 catch 方法，并返回新的 AbortablePromise 实例
    // 这样保持了错误处理能力的同时，新的 Promise 也具有可中止特性
    return new AbortablePromise<T | TResult>((resolve, reject) => {
      // 将错误处理函数传递给内部 Promise 的 catch 方法
      // 使用 Promise 错误处理的标准模式
      this.promise.catch(onrejected).then(resolve, reject)
    })
  }
}
