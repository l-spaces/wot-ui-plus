/**
 * @file 事件常量定义文件
 * @description Wot Design UI 组件库事件系统核心配置文件，统一管理所有组件间通信的事件名称常量
 *
 * 项目架构定位：
 * - 组件库事件系统的标准化中心，确保事件命名的一致性和可维护性
 * - Vue 3 组件通信的事件名称规范定义中心
 * - 支持 uniapp 多端开发框架的事件兼容层
 *
 * 核心功能实现逻辑：
 * - 定义标准的事件名称常量，消除硬编码，提高代码可读性和维护性
 * - 支持 Vue 3 的 v-model 双向绑定机制，实现组件值的同步更新
 * - 覆盖完整的用户交互生命周期事件（打开、关闭、确认、取消等）
 * - 提供表单组件专用的值变更和输入事件支持
 * - 实现组件状态管理的标准化事件接口
 *
 * 主要使用场景：
 * - 表单组件（Input、Select、Radio、Checkbox 等）的双向数据绑定
 * - 模态框、弹窗、下拉菜单等交互组件的状态管理
 * - 按钮、图标、列表项等交互元素的点击事件处理
 * - 父子组件间的事件通信和数据传递
 * - 组件生命周期的事件监听和响应
 *
 * 技术特色与优势：
 * - 严格遵循 Vue 3 事件命名规范和最佳实践
 * - 完整的 TypeScript 类型支持，提供类型安全的开发体验
 * - 与 uniapp 多端开发框架深度兼容，支持 App、H5、小程序
 * - 事件分类清晰，覆盖组件开发的完整交互场景
 * - 提供丰富的使用示例和最佳实践指导
 *
 * 设计思路：
 * - 采用常量定义模式，避免字符串硬编码带来的维护问题
 * - 事件命名遵循语义化原则，直观反映事件功能
 * - 支持事件参数的标准化，便于类型推导和代码提示
 * - 保持与 Vue 3 生态系统的无缝集成
 *
 * 使用注意事项：
 * - 所有事件常量均为字符串类型，可直接用于 emit 和 on 方法
 * - 事件参数应遵循约定的数据类型，确保类型安全
 * - 在组件中使用时建议通过解构导入所需的事件常量
 * - 新增事件时应遵循现有命名规范，保持一致性
 *
 * @example
 * ```typescript
 * // 在 Vue 组件中导入和使用事件常量
 * import { UPDATE_MODEL_EVENT, CLICK_EVENT, CHANGE_EVENT } from './event'
 *
 * // 触发模型更新事件（支持 v-model）
 * const emit = defineEmits<{
 *   (e: typeof UPDATE_MODEL_EVENT, value: string): void
 *   (e: typeof CLICK_EVENT, event: MouseEvent): void
 * }>()
 *
 * // 触发事件
 * emit(UPDATE_MODEL_EVENT, newValue)
 * emit(CLICK_EVENT, mouseEvent)
 *
 * // 在模板中监听事件
 * <my-component
 *   v-model="value"
 *   @click="handleClick"
 *   @change="handleChange"
 * />
 * ```
 *
 * @example
 * ```typescript
 * // 在组合式函数中使用事件常量
 * import { OPEN_EVENT, CLOSE_EVENT } from './event'
 *
 * export function useModal() {
 *   const isOpen = ref(false)
 *
 *   const open = () => {
 *     isOpen.value = true
 *     // 触发打开事件
 *     emit(OPEN_EVENT)
 *   }
 *
 *   const close = (reason?: string) => {
 *     isOpen.value = false
 *     // 触发关闭事件
 *     emit(CLOSE_EVENT, reason)
 *   }
 *
 *   return { isOpen, open, close }
 * }
 * ```
 *
 * @see {@link https://v3.vuejs.org/guide/component-custom-events.html Vue 3 自定义事件文档}
 * @see {@link https://uniapp.dcloud.net.cn/component/ Vue 组件开发文档}
 * @see {@link https://vuejs.org/guide/components/events.html Vue 官方事件指南}
 *
 */

/**
 * Vue 3 v-model 双向绑定更新事件
 * @description 核心双向数据绑定事件，用于实现 Vue 3 的 v-model 语法糖，当组件内部值发生变化时自动触发
 *
 * 技术实现原理：
 * - Vue 3 的 v-model 本质上是 `:modelValue` 和 `@update:modelValue` 的语法糖
 * - 该事件名称遵循 Vue 3 的事件命名规范 `update:xxx`
 * - 当组件内部值变化时，通过 emit 触发此事件，父组件的 v-model 绑定值会自动更新
 *
 * 核心功能特性：
 * - 支持 Vue 3 标准的双向数据绑定机制
 * - 与 Vue DevTools 深度集成，便于调试和状态追踪
 * - 支持 TypeScript 类型推导，提供完整的类型安全
 * - 兼容 uniapp 多端开发框架的 v-model 实现
 *
 * 使用场景：
 * - 表单输入组件（Input、Textarea、Select 等）的值同步
 * - 自定义组件的 v-model 双向绑定支持
 * - 状态管理组件的实时值更新和同步
 * - 复杂组件的多层级数据传递
 *
 * 事件参数：
 * - `newValue`: 新的模型值，类型与组件的 modelValue 类型一致
 * - 参数类型应与组件期望的数据类型保持一致
 *
 * 最佳实践：
 * - 在组件内部使用 watch 监听 modelValue 变化，确保数据同步
 * - 在适当的时机（如用户输入、选择变更）触发更新事件
 * - 对于复杂数据类型，确保传递的是响应式数据的副本
 * - 结合 TypeScript 泛型提供精确的类型提示
 *
 * @example
 * ```typescript
 * // 在 Vue 组件中的完整实现示例
 * import { defineComponent, ref, watch } from 'vue'
 * import { UPDATE_MODEL_EVENT } from './event'
 *
 * export default defineComponent({
 *   name: 'CustomInput',
 *   props: {
 *     modelValue: {
 *       type: String,
 *       default: ''
 *     }
 *   },
 *   emits: [UPDATE_MODEL_EVENT],
 *   setup(props, { emit }) {
 *     const internalValue = ref(props.modelValue)
 *
 *     // 监听内部值变化，触发更新事件
 *     watch(internalValue, (newValue) => {
 *       emit(UPDATE_MODEL_EVENT, newValue)
 *     })
 *
 *     // 监听外部 modelValue 变化，同步内部值
 *     watch(() => props.modelValue, (newValue) => {
 *       internalValue.value = newValue
 *     })
 *
 *     return { internalValue }
 *   }
 * })
 * ```
 *
 * @example
 * ```vue
 * <!-- 在父组件中使用 v-model -->
 * <template>
 *   <custom-input v-model="username" />
 *   <!-- 等价于 -->
 *   <custom-input
 *     :model-value="username"
 *     @update:model-value="username = $event"
 *   />
 * </template>
 *
 * <script setup>
 * import { ref } from 'vue'
 *
 * const username = ref('')
 * </script>
 * ```
 *
 * @see {@link https://v3.vuejs.org/guide/component-custom-events.html#v-model-arguments Vue 3 v-model 文档}
 * @see {@link https://vuejs.org/guide/components/v-model.html Vue 官方 v-model 指南}
 * @see {@link https://uniapp.dcloud.net.cn/tutorial/vue3-composition-api.html uniapp 组合式 API}
 *
 * @type {string}
 * @default 'update:modelValue'
 */
export const UPDATE_MODEL_EVENT = 'update:modelValue'

/**
 * 值变更事件
 * @description 通用值变更监听事件，当组件值发生用户交互驱动的变更时触发，适用于表单验证和状态监听
 *
 * 技术实现原理：
 * - 该事件在用户完成交互操作后触发，与 `input` 事件的实时触发形成互补
 * - 通常用于需要验证或提交的场景，避免频繁的事件触发
 * - 支持异步操作和防抖处理，提高性能表现
 *
 * 核心功能特性：
 * - 提供稳定的值变更监听机制，避免实时输入带来的性能问题
 * - 支持表单验证的触发时机控制
 * - 与 Vue 表单验证库（如 VeeValidate）深度集成
 * - 兼容 uniapp 表单组件的原生 change 事件
 *
 * 使用场景：
 * - 表单字段的最终值变更监听（如选择完成、输入完成）
 * - 下拉选择器、单选框、复选框的选项变更确认
 * - 开关组件、滑块组件的状态变更确认
 * - 文件上传组件的文件选择完成事件
 * - 日期时间选择器的选择完成事件
 *
 * 事件参数：
 * - `changedValue`: 变更后的最终值，类型根据具体组件而定
 * - 对于表单组件，通常传递当前选中的值
 * - 对于复杂组件，可能传递包含详细信息的对象
 *
 * 与 `input` 事件的区别：
 * - `change` 事件在值变更完成时触发（如失去焦点、选择确认）
 * - `input` 事件在值变更过程中实时触发（如键盘输入）
 * - 根据业务需求选择合适的监听事件
 *
 * 最佳实践：
 * - 对于需要实时响应的场景使用 `input` 事件
 * - 对于需要验证或提交的场景使用 `change` 事件
 * - 结合防抖技术优化频繁变更的性能表现
 * - 在表单验证中使用 `change` 事件避免过度验证
 *
 * @example
 * ```typescript
 * // 在表单组件中的使用示例
 * import { defineComponent, ref } from 'vue'
 * import { CHANGE_EVENT } from './event'
 *
 * export default defineComponent({
 *   name: 'CustomSelect',
 *   props: {
 *     value: {
 *       type: [String, Number, Array],
 *       default: ''
 *     }
 *   },
 *   emits: [CHANGE_EVENT],
 *   setup(props, { emit }) {
 *     const selectedValue = ref(props.value)
 *
 *     const handleSelectionChange = (newValue: any) => {
 *       selectedValue.value = newValue
 *       // 触发变更事件，通常用于表单验证
 *       emit(CHANGE_EVENT, newValue)
 *     }
 *
 *     return { selectedValue, handleSelectionChange }
 *   }
 * })
 * ```
 *
 * @example
 * ```vue
 * <!-- 在父组件中监听变更事件 -->
 * <template>
 *   <custom-select
 *     :value="selectedOption"
 *     @change="handleOptionChange"
 *   />
 * </template>
 *
 * <script setup>
 * import { ref } from 'vue'
 *
 * const selectedOption = ref('')
 *
 * const handleOptionChange = (newValue) => {
 *   selectedOption.value = newValue
 *   // 在这里进行表单验证或其他业务逻辑
 *   console.log('选项已变更:', newValue)
 * }
 * </script>
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event MDN change 事件文档}
 * @see {@link https://v3.vuejs.org/guide/forms.html Vue 3 表单处理指南}
 * @see {@link https://uniapp.dcloud.net.cn/component/input.html uniapp 输入组件文档}
 *
 * @type {string}
 * @default 'change'
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
