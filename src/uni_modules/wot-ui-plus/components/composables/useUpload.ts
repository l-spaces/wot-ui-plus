/**
 * 文件上传管理组合式函数
 *
 * 本文件是 wot-ui-plus 组件库的核心组合式函数，提供跨平台文件上传和选择功能。
 * 支持 uni-app 多端环境（H5、小程序、App等），实现统一的上传接口和文件处理逻辑。
 *
 * 核心功能：
 * - 统一文件上传接口，支持自定义上传方法
 * - 多平台文件选择适配（图片、视频、媒体、文件等）
 * - 上传状态管理和进度跟踪
 * - 上传任务中断和错误处理
 * - 跨平台文件信息格式化
 *
 * 设计思路：
 * - 采用组合式 API 设计，便于在多个组件中复用
 * - 通过条件编译处理不同平台的 API 差异
 * - 提供默认上传实现，同时支持自定义上传方法
 * - 统一的状态管理机制，确保上传过程可控
 *
 * 主要对外接口：
 * - startUpload: 开始上传文件
 * - abort: 中断上传任务
 * - chooseFile: 选择文件
 * - UPLOAD_STATUS: 上传状态常量
 *
 * 使用注意事项：
 * - 需要在支持 uni-app 的环境中使用
 * - 不同平台的文件选择能力存在差异
 * - 上传任务需要手动管理中断
 * - 文件类型和扩展名过滤受平台限制
 */

import { isArray, isDef, isFunction } from '../common/util'
import type { ChooseFile, ChooseFileOption, UploadFileItem, UploadMethod, UploadStatusType } from '../wd-upload/types'

/**
 * 上传状态常量定义
 *
 * 定义文件上传过程中的四种状态：
 * - PENDING: 等待上传
 * - LOADING: 上传中
 * - SUCCESS: 上传成功
 * - FAIL: 上传失败
 */
export const UPLOAD_STATUS: Record<string, UploadStatusType> = {
  PENDING: 'pending', // 等待上传状态
  LOADING: 'loading', // 上传中状态
  SUCCESS: 'success', // 上传成功状态
  FAIL: 'fail' // 上传失败状态
}

/**
 * useUpload 组合式函数返回值接口
 *
 * 定义 useUpload 函数返回的对象结构，包含文件上传和选择的核心功能方法。
 */
export interface UseUploadReturn {
  /**
   * 开始上传文件
   *
   * @param file - 要上传的文件对象
   * @param options - 上传配置选项
   * @returns 返回上传任务实例，可用于控制上传过程
   */
  startUpload: (file: UploadFileItem, options: UseUploadOptions) => UniApp.UploadTask | void | Promise<void>

  /**
   * 中断上传任务
   *
   * @param task - 可选的上传任务实例，如不提供则中断当前任务
   */
  abort: (task?: UniApp.UploadTask) => void

  /**
   * 上传状态常量
   *
   * 包含文件上传的四种状态常量：PENDING、LOADING、SUCCESS、FAIL
   */
  UPLOAD_STATUS: Record<string, UploadStatusType>

  /**
   * 选择文件
   *
   * @param options - 文件选择配置选项
   * @returns 返回选择的文件列表 Promise
   */
  chooseFile: (options: ChooseFileOption) => Promise<ChooseFile[]>
}

/**
 * useUpload 函数配置选项接口
 *
 * 定义文件上传过程中的各种配置参数和回调函数。
 */
export interface UseUploadOptions {
  /**
   * 上传服务器地址
   */
  action: string
  /**
   * 请求头
   */
  header?: Record<string, any>
  /**
   * 文件对应的 key
   */
  name?: string
  /**
   * 其它表单数据
   */
  formData?: Record<string, any>
  /**
   * 文件类型 仅支付宝支持且在支付宝平台必填
   */
  fileType?: 'image' | 'video' | 'audio'
  /**
   * 成功状态码
   */
  statusCode?: number
  /**
   * 文件状态的key
   */
  statusKey?: string
  /**
   * 自定义上传方法
   */
  uploadMethod?: UploadMethod
  /**
   * 上传成功回调
   */
  onSuccess?: (res: UniApp.UploadFileSuccessCallbackResult, file: UploadFileItem, formData: Record<string, any>) => void
  /**
   * 上传失败回调
   */
  onError?: (res: UniApp.GeneralCallbackResult, file: UploadFileItem, formData: Record<string, any>) => void
  /**
   * 上传进度回调
   */
  onProgress?: (res: UniApp.OnProgressUpdateResult, file: UploadFileItem) => void
  /**
   * 是否自动中断之前的上传任务
   */
  abortPrevious?: boolean
  /**
   * 根据文件拓展名过滤(H5支持全部类型过滤,微信小程序支持all和file时过滤,其余平台不支持)
   */
  extension?: string[]
}

/**
 * 文件上传管理组合式函数
 *
 * 提供跨平台文件上传和选择功能的核心函数，支持 uni-app 多端环境。
 *
 * @returns 返回包含上传控制方法和状态常量的对象
 *
 * @example
 * ```typescript
 * const { startUpload, abort, chooseFile, UPLOAD_STATUS } = useUpload()
 *
 * // 选择文件
 * const files = await chooseFile({
 *   count: 5,
 *   type: 'image'
 * })
 *
 * // 开始上传
 * startUpload(file, {
 *   action: 'https://api.example.com/upload',
 *   name: 'file',
 *   onProgress: (progress, file) => {
 *     console.log(`上传进度: ${progress.progress}%`)
 *   }
 * })
 * ```
 *
 * @throws {Error} 当上传配置不完整或平台不支持时可能抛出错误
 */
export function useUpload(): UseUploadReturn {
  // 当前上传任务实例，用于控制上传过程
  let currentTask: UniApp.UploadTask | null = null

  /**
   * 中断上传任务
   *
   * 支持中断指定任务或当前正在进行的任务
   *
   * @param task - 可选的上传任务实例，如不提供则中断当前任务
   *
   * @example
   * ```typescript
   * // 中断当前任务
   * abort()
   *
   * // 中断指定任务
   * abort(specificTask)
   * ```
   */
  const abort = (task?: UniApp.UploadTask) => {
    // 如果提供了指定任务，则中断该任务
    if (task) {
      task.abort()
    } else if (currentTask) {
      // 中断当前任务并清空引用
      currentTask.abort()
      currentTask = null
    }
  }

  /**
   * 默认上传方法
   *
   * 使用 uni-app 原生 uploadFile API 实现文件上传功能
   * 支持多平台适配，包括进度跟踪和状态回调
   *
   * @param file - 要上传的文件对象
   * @param formData - 表单数据
   * @param options - 上传配置选项
   * @returns 返回上传任务实例，可用于控制上传过程
   */
  const defaultUpload: UploadMethod = (file, formData, options) => {
    // 如果配置了自动中断,则中断之前的上传任务
    if (options.abortPrevious) {
      abort()
    }

    // 调用 uni-app 原生上传 API
    const uploadTask = uni.uploadFile({
      url: options.action, // 上传服务器地址
      header: options.header, // 请求头
      name: options.name, // 文件字段名
      fileName: options.name, // 文件名
      fileType: options.fileType, // 文件类型（支付宝平台专用）
      formData, // 额外表单数据
      filePath: file.url, // 文件路径

      // 上传成功回调
      success(res) {
        if (res.statusCode === options.statusCode) {
          // 上传成功
          options.onSuccess(res, file, formData)
        } else {
          // 上传失败
          options.onError({ ...res, errMsg: res.errMsg || '' }, file, formData)
        }
      },

      // 上传失败回调
      fail(err) {
        // 上传失败
        options.onError(err, file, formData)
      }
    })

    currentTask = uploadTask

    // 监听上传进度更新
    uploadTask.onProgressUpdate((res) => {
      options.onProgress(res, file)
    })

    // 返回上传任务实例,让外部可以控制上传过程
    return uploadTask
  }

  /**
   * 开始上传文件
   *
   * 核心上传方法，支持自定义上传方法和自动中断前一个任务
   * 根据配置决定使用默认上传方法还是自定义上传方法
   *
   * @param file - 要上传的文件对象
   * @param options - 上传配置选项
   * @returns 返回上传任务实例，可用于控制上传过程
   *
   * @example
   * ```typescript
   * startUpload(file, {
   *   action: 'https://api.example.com/upload',
   *   name: 'file',
   *   abortPrevious: true, // 自动中断前一个任务
   *   uploadMethod: customUpload // 使用自定义上传方法
   * })
   * ```
   */
  const startUpload = (file: UploadFileItem, options: UseUploadOptions) => {
    const {
      uploadMethod,
      formData = {},
      action,
      name = 'file',
      header = {},
      fileType = 'image',
      statusCode = 200,
      statusKey = 'status',
      abortPrevious = false
    } = options

    // 设置上传中状态
    file[statusKey] = UPLOAD_STATUS.LOADING

    const uploadOptions = {
      action,
      header,
      name,
      fileName: name,
      fileType,
      statusCode,
      abortPrevious,
      onSuccess: (res: UniApp.UploadFileSuccessCallbackResult, file: UploadFileItem, formData: Record<string, any>) => {
        // 更新文件状态
        file[statusKey] = UPLOAD_STATUS.SUCCESS
        currentTask = null
        options.onSuccess?.(res, file, formData)
      },
      onError: (error: UniApp.GeneralCallbackResult, file: UploadFileItem, formData: Record<string, any>) => {
        // 更新文件状态和错误信息
        file[statusKey] = UPLOAD_STATUS.FAIL
        file.error = error.errMsg
        currentTask = null
        options.onError?.(error, file, formData)
      },
      onProgress: (res: UniApp.OnProgressUpdateResult, file: UploadFileItem) => {
        // 更新上传进度
        file.percent = res.progress
        options.onProgress?.(res, file)
      }
    }

    // 返回上传任务实例,支持外部获取uploadTask进行操作
    if (isFunction(uploadMethod)) {
      return uploadMethod(file, formData, uploadOptions)
    } else {
      return defaultUpload(file, formData, uploadOptions)
    }
  }

  /**
   * 格式化图片信息
   *
   * 将 uni-app 图片选择 API 返回的文件信息转换为标准格式
   * 处理不同平台的路径差异，确保文件信息一致性
   *
   * @param res - uni-app 图片选择 API 返回的结果对象
   * @returns 返回格式化后的文件信息数组
   *
   * @example
   * ```typescript
   * const formattedFiles = formatImage({
   *   tempFiles: [{ path: 'temp/image1.jpg', size: 1024, name: 'image1.jpg' }]
   * })
   * ```
   */
  function formatImage(res: UniApp.ChooseImageSuccessCallbackResult): ChooseFile[] {
    // #ifdef MP-DINGTALK
    // 钉钉文件在files中
    res.tempFiles = isDef((res as any).files) ? (res as any).files : res.tempFiles
    // #endif
    if (isArray(res.tempFiles)) {
      return res.tempFiles.map((item: any) => ({
        path: item.path || '',
        name: item.name || '',
        size: item.size,
        type: 'image',
        thumb: item.path || ''
      }))
    }
    return [
      {
        path: (res.tempFiles as any).path || '',
        name: (res.tempFiles as any).name || '',
        size: (res.tempFiles as any).size,
        type: 'image',
        thumb: (res.tempFiles as any).path || ''
      }
    ]
  }

  /**
   * 格式化视频文件信息
   *
   * 将 uni-app 视频选择 API 返回的文件信息转换为标准格式
   * 包含视频特有的属性如时长、分辨率等信息
   *
   * @param res - uni-app 视频选择 API 返回的结果对象
   * @returns 返回格式化后的文件信息数组
   *
   * @example
   * ```typescript
   * const formattedFiles = formatVideo({
   *   tempFiles: [{ tempFilePath: 'temp/video1.mp4', size: 1024000, duration: 60 }]
   * })
   * ```
   */
  function formatVideo(res: UniApp.ChooseVideoSuccess): ChooseFile[] {
    return [
      {
        path: res.tempFilePath || (res as any).filePath || '',
        name: res.name || '',
        size: res.size,
        type: 'video',
        thumb: (res as any).thumbTempFilePath || '',
        duration: res.duration
      }
    ]
  }

  /**
   * 格式化媒体文件信息
   *
   * 将 uni-app 媒体选择 API 返回的文件信息转换为标准格式
   * 支持图片和视频混合选择，统一处理文件信息
   *
   * @param res - uni-app 媒体选择 API 返回的结果对象
   * @returns 返回格式化后的文件信息数组
   *
   * @example
   * ```typescript
   * const formattedFiles = formatMedia({
   *   tempFiles: [{ tempFilePath: 'temp/media1.jpg', size: 1024, fileType: 'image' }]
   * })
   * ```
   */
  function formatMedia(res: UniApp.ChooseMediaSuccessCallbackResult): ChooseFile[] {
    return res.tempFiles.map((item) => ({
      type: item.fileType,
      path: item.tempFilePath,
      thumb: item.fileType === 'video' ? item.thumbTempFilePath : item.tempFilePath,
      size: item.size,
      duration: item.duration
    }))
  }

  /**
   * 选择文件
   *
   * 核心文件选择方法，支持多种文件类型选择：
   * - image: 图片文件选择
   * - video: 视频文件选择
   * - media: 媒体文件选择（图片和视频混合）
   * - file: 通用文件选择
   *
   * 根据不同的文件类型调用相应的 uni-app API，并统一格式化返回结果
   *
   * @param options - 文件选择配置选项
   * @returns 返回选择的文件列表 Promise
   *
   * @example
   * ```typescript
   * // 选择图片
   * const images = await chooseFile({
   *   type: 'image',
   *   count: 5,
   *   sourceType: ['album', 'camera']
   * })
   *
   * // 选择视频
   * const videos = await chooseFile({
   *   type: 'video',
   *   maxDuration: 60
   * })
   * ```
   *
   * @throws {Error} 当文件选择失败时输出错误信息
   */
  function chooseFile({
    multiple,
    sizeType,
    sourceType,
    maxCount,
    accept,
    compressed,
    maxDuration,
    camera,
    extension
  }: ChooseFileOption): Promise<ChooseFile[]> {
    return new Promise((resolve, reject) => {
      switch (accept) {
        case 'image':
          // #ifdef MP-WEIXIN
          uni.chooseMedia({
            count: multiple ? maxCount : 1,
            mediaType: ['image'],
            sourceType,
            sizeType,
            camera,
            success: (res) => resolve(formatMedia(res)),
            fail: reject
          })
          // #endif
          // #ifndef MP-WEIXIN
          uni.chooseImage({
            count: multiple ? maxCount : 1,
            sizeType,
            sourceType,
            // #ifdef H5
            extension,
            // #endif
            success: (res) => resolve(formatImage(res)),
            fail: reject
          })
          // #endif
          break
        case 'video':
          // #ifdef MP-WEIXIN
          uni.chooseMedia({
            count: multiple ? maxCount : 1,
            mediaType: ['video'],
            sourceType,
            camera,
            maxDuration,
            success: (res) => resolve(formatMedia(res)),
            fail: reject
          })
          // #endif
          // #ifndef MP-WEIXIN
          uni.chooseVideo({
            sourceType,
            compressed,
            maxDuration,
            camera,
            // #ifdef H5
            extension,
            // #endif
            success: (res) => resolve(formatVideo(res)),
            fail: reject
          })
          // #endif
          break
        // #ifdef MP-WEIXIN
        case 'media':
          uni.chooseMedia({
            count: multiple ? maxCount : 1,
            sourceType,
            sizeType,
            camera,
            maxDuration,
            success: (res) => resolve(formatMedia(res)),
            fail: reject
          })
          break
        case 'file':
          uni.chooseMessageFile({
            count: multiple ? (isDef(maxCount) ? maxCount : 100) : 1,
            type: accept,
            extension,
            success: (res) => resolve(res.tempFiles),
            fail: reject
          })
          break
        // #endif
        case 'all':
          // #ifdef H5
          uni.chooseFile({
            count: multiple ? maxCount : 1,
            type: accept,
            extension,
            success: (res) => resolve(res.tempFiles as ChooseFile[]),
            fail: reject
          })
          // #endif
          // #ifdef MP-WEIXIN
          uni.chooseMessageFile({
            count: multiple ? Number(maxCount) : 1,
            type: accept,
            extension,
            success: (res) => resolve(res.tempFiles),
            fail: reject
          })
          // #endif

          break
        default:
          // #ifdef MP-WEIXIN
          uni.chooseMedia({
            count: multiple ? maxCount : 1,
            mediaType: ['image'],
            sourceType,
            sizeType,
            camera,
            success: (res) => resolve(formatMedia(res)),
            fail: reject
          })
          // #endif
          // #ifndef MP-WEIXIN
          uni.chooseImage({
            count: multiple ? maxCount : 1,
            sizeType,
            sourceType,
            // #ifdef H5
            extension,
            // #endif
            success: (res) => resolve(formatImage(res)),
            fail: reject
          })
          // #endif
          break
      }
    })
  }

  // 返回所有上传控制方法和状态常量，供组件使用
  return {
    startUpload, // 开始上传文件的方法
    abort, // 中断上传任务的方法
    UPLOAD_STATUS, // 上传状态常量
    chooseFile // 选择文件的方法
  }
}
