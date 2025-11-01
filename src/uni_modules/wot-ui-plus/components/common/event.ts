/**
 * @file 事件常量定义文件
 * @description 统一管理组件库中所有的事件名称常量，确保事件命名的一致性和可维护性
 *
 * 项目架构作用：
 * - 作为组件间通信的事件名称标准化中心
 * - 提供统一的 Vue 组件事件命名规范
 * - 支持双向数据绑定、用户交互、状态变更等场景
 *
 * 核心功能：
 * - 定义标准的事件名称常量，避免硬编码
 * - 支持 Vue 3 的 v-model 双向绑定机制
 * - 覆盖常见的用户交互和组件状态变更事件
 *
 * 使用场景：
 * - 组件内部的事件监听和触发
 * - 父子组件间的事件通信
 * - 表单组件的双向数据绑定
 * - 模态框、弹窗等交互组件的状态管理
 *
 * 技术特色：
 * - 遵循 Vue 3 事件命名规范
 * - 支持 TypeScript 类型检查
 * - 与 uniapp 多端开发框架兼容
 *
 * @example
 * // 在组件中使用事件常量
 * import { UPDATE_MODEL_EVENT, CLICK_EVENT } from './event'
 *
 * // 触发更新事件
 * emit(UPDATE_MODEL_EVENT, newValue)
 *
 * // 监听点击事件
 * @on(CLICK_EVENT)
 * handleClick() {
 *   // 处理点击逻辑
 * }
 *
 * @see {@link https://v3.vuejs.org/guide/component-custom-events.html Vue 3 自定义事件文档}
 * @see {@link https://uniapp.dcloud.net.cn/component/ Vue 组件开发文档}
 *
 * @author wot-ui-plus 组件库团队
 * @version 1.0.0
 * @since 2023
 */

/**
 * Vue 3 v-model 双向绑定更新事件
 * @description 用于支持 Vue 3 的 v-model 双向数据绑定机制，当组件内部值发生变化时触发
 *
 * 使用场景：
 * - 表单组件（Input、Select、Radio 等）的双向数据绑定
 * - 自定义组件的 v-model 支持
 * - 状态管理组件的值更新
 *
 * 事件参数：
 * - 新的模型值（newValue）
 *
 * @example
 * // 在组件中触发更新
 * emit(UPDATE_MODEL_EVENT, newValue)
 *
 * // 在父组件中使用 v-model
 * <my-component v-model="value" />
 *
 * @see {@link https://v3.vuejs.org/guide/component-custom-events.html#v-model-arguments Vue 3 v-model 文档}
 */
export const UPDATE_MODEL_EVENT = 'update:modelValue'

/**
 * 值变更事件
 * @description 当组件值发生变更时触发，通常用于表单验证和值监听
 *
 * 使用场景：
 * - 表单字段值变更监听
 * - 下拉选择器选项变更
 * - 开关组件状态变更
 *
 * 事件参数：
 * - 变更后的值（changedValue）
 *
 * @example
 * // 监听值变更
 * @on(CHANGE_EVENT)
 * handleChange(newValue) {
 *   console.log('值已变更:', newValue)
 * }
 */
export const CHANGE_EVENT = 'change'

/**
 * 输入事件
 * @description 用户输入时实时触发，适用于需要实时响应用户输入的场景
 *
 * 使用场景：
 * - 文本输入框的实时输入监听
 * - 搜索框的实时搜索
 * - 富文本编辑器的内容变更
 *
 * 事件参数：
 * - 当前输入值（inputValue）
 *
 * @example
 * // 监听输入事件
 * @on(INPUT_EVENT)
 * handleInput(value) {
 *   // 实时处理输入内容
 * }
 */
export const INPUT_EVENT = 'input'

/**
 * 点击事件
 * @description 用户点击组件时触发，适用于各种交互式组件
 *
 * 使用场景：
 * - 按钮点击
 * - 图标点击
 * - 列表项点击
 * - 卡片点击
 *
 * 事件参数：
 * - 事件对象（event）
 *
 * @example
 * // 监听点击事件
 * @on(CLICK_EVENT)
 * handleClick(event) {
 *   // 处理点击逻辑
 * }
 */
export const CLICK_EVENT = 'click'

/**
 * 关闭事件
 * @description 组件关闭时触发，适用于模态框、弹窗、下拉菜单等可关闭组件
 *
 * 使用场景：
 * - 模态框关闭
 * - 弹窗关闭
 * - 下拉菜单收起
 * - 侧边栏关闭
 *
 * 事件参数：
 * - 关闭原因（reason），如：'click-outside'、'esc-key'、'close-button'
 *
 * @example
 * // 监听关闭事件
 * @on(CLOSE_EVENT)
 * handleClose(reason) {
 *   console.log('组件关闭，原因:', reason)
 * }
 */
export const CLOSE_EVENT = 'close'

/**
 * 打开事件
 * @description 组件打开时触发，适用于模态框、弹窗、下拉菜单等可打开组件
 *
 * 使用场景：
 * - 模态框打开
 * - 弹窗打开
 * - 下拉菜单展开
 * - 侧边栏打开
 *
 * 事件参数：
 * - 无参数或打开配置信息
 *
 * @example
 * // 监听打开事件
 * @on(OPEN_EVENT)
 * handleOpen() {
 *   // 组件打开后的初始化逻辑
 * }
 */
export const OPEN_EVENT = 'open'

/**
 * 确认事件
 * @description 用户确认操作时触发，适用于需要用户确认的场景
 *
 * 使用场景：
 * - 对话框确认按钮点击
 * - 表单提交确认
 * - 删除操作确认
 * - 购买确认
 *
 * 事件参数：
 * - 确认数据（confirmData）
 *
 * @example
 * // 监听确认事件
 * @on(CONFIRM_EVENT)
 * handleConfirm(data) {
 *   // 处理确认逻辑
 * }
 */
export const CONFIRM_EVENT = 'confirm'

/**
 * 取消事件
 * @description 用户取消操作时触发，适用于需要用户取消的场景
 *
 * 使用场景：
 * - 对话框取消按钮点击
 * - 表单取消提交
 * - 操作取消
 *
 * 事件参数：
 * - 取消原因（reason）
 *
 * @example
 * // 监听取消事件
 * @on(CANCEL_EVENT)
 * handleCancel(reason) {
 *   console.log('操作取消，原因:', reason)
 * }
 */
export const CANCEL_EVENT = 'cancel'
