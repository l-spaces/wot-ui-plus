/**
 * 拦截器处理模块
 *
 * 该模块提供了一个通用的拦截器处理机制，用于统一处理组件中的各种钩子函数。
 * 支持同步和异步拦截器，能够根据拦截器的返回值决定执行成功回调或取消回调。
 *
 * 主要应用场景：
 * - 表单验证前置钩子
 * - 组件状态变更前的确认机制
 * - 用户操作前的权限检查
 * - 需要异步确认的交互流程
 */

import { isPromise } from './util'

/**
 * 空函数，作为默认的错误处理回调
 */
function noop() {}

/**
 * 拦截器类型定义
 *
 * 拦截器函数可以接收任意参数，并支持多种返回值类型：
 * - Promise<boolean>：异步返回布尔值，true表示继续执行，false表示取消执行
 * - boolean：同步返回布尔值，true表示继续执行，false表示取消执行
 * - undefined/void：表示继续执行
 *
 * @param args 拦截器接收的参数
 * @returns 拦截器处理结果，决定后续操作是否继续执行
 */
export type Interceptor = (...args: any[]) => Promise<boolean> | boolean | undefined | void

/**
 * 调用拦截器并处理其返回结果
 *
 * 根据拦截器的返回值类型（同步或异步），决定执行done回调或canceled回调。
 * 如果拦截器返回true或Promise<true>，则执行done回调；
 * 如果拦截器返回false或Promise<false>，则执行canceled回调（如果提供）；
 * 如果拦截器未定义，则直接执行done回调。
 *
 * @param interceptor 要调用的拦截器函数，可为undefined
 * @param options 配置选项
 * @param options.args 传递给拦截器的参数数组，默认为空数组
 * @param options.done 拦截器返回true时执行的回调函数
 * @param options.canceled 拦截器返回false时执行的回调函数，可选
 * @param options.error 拦截器执行出错时的错误处理函数，可选
 *
 * @example
 * // 同步拦截器示例
 * const beforeSubmit = (formData) => {
 *   // 验证表单数据
 *   return formData.name.trim() !== ''
 * }
 *
 * callInterceptor(beforeSubmit, {
 *   args: [formData],
 *   done: () => console.log('表单验证通过，开始提交'),
 *   canceled: () => console.log('表单验证失败，取消提交')
 * })
 *
 * @example
 * // 异步拦截器示例
 * const beforeDelete = async (id) => {
 *   // 异步检查权限
 *   const hasPermission = await checkPermission(id)
 *   return hasPermission
 * }
 *
 * callInterceptor(beforeDelete, {
 *   args: [itemId],
 *   done: () => console.log('有权限，执行删除操作'),
 *   canceled: () => console.log('无权限，取消删除操作'),
 *   error: (err) => console.error('检查权限时出错', err)
 * })
 */
export function callInterceptor(
  interceptor: Interceptor | undefined,
  {
    args = [],
    done,
    canceled,
    error
  }: {
    args?: unknown[]
    done: () => void
    canceled?: () => void
    error?: () => void
  }
) {
  // 如果拦截器存在，则调用拦截器
  if (interceptor) {
    // 使用apply调用拦截器，传递args数组作为参数
    // eslint-disable-next-line prefer-spread
    const returnVal = interceptor.apply(null, args)

    // 检查拦截器返回值是否为Promise
    if (isPromise(returnVal)) {
      // 处理异步拦截器
      returnVal
        .then((value) => {
          // 如果异步返回true，则执行done回调
          if (value) {
            done()
          }
          // 如果异步返回false且提供了canceled回调，则执行canceled回调
          else if (canceled) {
            canceled()
          }
        })
        // 捕获异步过程中的错误，执行error回调或空函数
        .catch(error || noop)
    }
    // 处理同步拦截器返回true的情况
    else if (returnVal) {
      done()
    }
    // 处理同步拦截器返回false且提供了canceled回调的情况
    else if (canceled) {
      canceled()
    }
  }
  // 如果拦截器不存在，则直接执行done回调
  else {
    done()
  }
}
