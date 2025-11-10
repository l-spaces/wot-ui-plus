# Vue3 + Uniapp 组合式 API 完整清单
适配 Uniapp + Vue3 + TS 技术栈，按功能分类整理，标注核心用途和使用场景，方便开发查阅。

## 一、Vue3 原生组合式 API（Uniapp 直接兼容）
Vue3 核心组合式 API 是基础，Uniapp 中可直接导入使用，无额外适配成本。

### 1. 生命周期钩子 API
| API                | 作用                                  | 触发时机/场景                          |
|---------------------|---------------------------------------|---------------------------------------|
| `onMounted`         | 组件挂载完成后执行                    | DOM 渲染完成，可操作 DOM/发起请求      |
| `onBeforeMount`     | 组件挂载前执行                        | 实例已创建，DOM 未生成                |
| `onUpdated`         | 组件更新后执行                        | 响应式数据变化导致 DOM 更新后          |
| `onBeforeUpdate`    | 组件更新前执行                        | 响应式数据变化，DOM 未更新前          |
| `onUnmounted`       | 组件完全销毁后执行                    | 组件实例、DOM 均已移除，清理残留资源    |
| `onBeforeUnmount`   | 组件销毁前执行                        | 组件实例仍可用，清理定时器/事件监听    |
| `onErrorCaptured`   | 捕获子组件错误                        | 子组件抛出错误时触发，返回 `false` 阻止冒泡 |
| `onRenderTracked`   | 跟踪组件渲染依赖（开发环境）          | 组件首次渲染或依赖变化时，调试用       |
| `onRenderTriggered` | 触发组件渲染的依赖变化（开发环境）    | 响应式数据变化触发渲染时，调试用       |
| `onDeactivated`     | 组件失活（路由切换/keep-alive 隐藏）  | 配合 `<keep-alive>` 使用               |
| `onActivated`       | 组件激活（路由切换/keep-alive 显示）  | 配合 `<keep-alive>` 使用               |
| `onServerPrefetch`  | 服务端渲染（SSR）数据预获取           | Uniapp 仅 H5/APP 端 SSR 场景可用       |

### 2. 响应式 API
| API                | 作用                                  | 特点/TS 用法                          |
|---------------------|---------------------------------------|---------------------------------------|
| `ref`               | 创建基础类型响应式数据（number/string/boolean） | 访问需 `.value`，TS 自动推导类型       |
| `reactive`          | 创建引用类型响应式数据（对象/数组）   | 深层响应式，无需 `.value`，TS 支持泛型 |
| `computed`          | 创建计算属性                          | 支持只读/可写，依赖变化自动更新        |
| `watch`             | 监听响应式数据变化                    | 支持多源监听、深度监听、立即执行       |
| `watchEffect`       | 自动追踪依赖的监听（副作用）          | 无需显式声明监听源，依赖变化自动触发   |
| `watchPostEffect`   | 监听回调在 DOM 更新后执行             | 等价于 `watchEffect({ flush: 'post' })` |
| `watchSyncEffect`   | 监听回调同步执行（DOM 更新前）        | 等价于 `watchEffect({ flush: 'sync' })` |
| `toRef`             | 从响应式对象中创建单个属性的引用      | 保持与原对象的响应式关联               |
| `toRefs`            | 将响应式对象转为普通对象（属性为 ref）| 解构响应式对象时不丢失响应式           |
| `unref`             | 安全获取 ref 原值（非 ref 直接返回）  | `unref(val) === isRef(val) ? val.value : val` |
| `isRef`             | 判断是否为 ref 类型                   | TS 类型守卫，缩小类型范围              |
| `isReactive`        | 判断是否为 reactive 类型               | 穿透 `readonly` 包装，仍返回 `true`    |
| `isReadonly`        | 判断是否为只读响应式数据              | `readonly`/`shallowReadonly` 包装后返回 `true` |
| `isProxy`           | 判断是否为 Vue 代理对象（ref/reactive/readonly） | 通用代理类型判断                      |
| `readonly`          | 创建只读响应式数据（深层）            | 修改会报错，TS 提示只读               |
| `shallowReactive`   | 创建浅层响应式对象（仅顶层响应式）    | 性能优化，深层属性变化不触发更新       |
| `shallowReadonly`   | 创建浅层只读响应式对象（仅顶层只读）  | 深层属性可修改，顶层修改报错           |
| `shallowRef`        | 创建浅层 ref（仅 `.value` 响应式）    | 适合大对象/数组，避免深层代理开销      |
| `triggerRef`        | 手动触发 shallowRef 的更新            | 修改 `shallowRef.value` 深层属性后触发 |
| `customRef`         | 自定义 ref 逻辑（如防抖/节流）        | 需实现 `track`（追踪依赖）和 `trigger`（触发更新） |
| `toRaw`             | 获取响应式对象的原始对象（非代理）    | 临时修改原始对象，不触发响应式更新     |
| `markRaw`           | 标记对象，禁止被转为响应式            | 用于不可变对象（如第三方库实例）       |
| `effectScope`       | 创建副作用作用域（管理 watch/computed）| 批量停止副作用，避免内存泄漏           |
| `getCurrentScope`   | 获取当前副作用作用域                  | 配合 `effectScope` 使用                |
| `onScopeDispose`    | 副作用作用域销毁时执行清理            | 替代组件生命周期，用于复用逻辑函数     |

### 3. 组件通信/定义 API
| API                | 作用                                  | 适用场景/TS 用法                      |
|---------------------|---------------------------------------|---------------------------------------|
| `defineProps`       | 声明组件接收的 props                  | `<script setup>` 中直接使用，支持泛型定义类型 |
| `defineEmits`       | 声明组件触发的事件                    | 支持类型校验，TS 可定义事件参数类型    |
| `defineExpose`      | 暴露组件内部属性/方法（供父组件调用） | `<script setup>` 中组件默认封闭，需显式暴露 |
| `defineOptions`     | 定义组件选项（name、inheritAttrs 等） | Vue3.3+ 支持，Uniapp 3.2.0+ 兼容       |
| `useAttrs`          | 获取组件非 props Attributes（如 class/style） | 响应式对象，支持动态更新              |
| `useSlots`          | 获取组件插槽内容                      | 响应式对象，可访问具名插槽/作用域插槽  |
| `provide`           | 提供依赖（跨层级组件通信）            | 配合 `inject` 使用，支持响应式数据      |
| `inject`            | 注入依赖（跨层级组件通信）            | 可设置默认值，支持类型推导            |

### 4. 工具/辅助 API
| API                | 作用                                  | 用法示例                              |
|---------------------|---------------------------------------|---------------------------------------|
| `nextTick`          | 等待下一次 DOM 更新完成后执行回调      | `nextTick(() => { /* 操作 DOM */ })`   |
| `useCssModule`      | 访问组件作用域 CSS 模块                | 配合 `<style module>` 使用，获取 CSS 类名 |
| `resolveComponent`  | 动态解析组件（如异步组件）            | 避免组件未注册报错，Uniapp 多端兼容    |
| `resolveDirective`  | 动态解析指令                          | 自定义指令动态使用场景                |
| `withDirectives`    | 为 VNode 绑定自定义指令                | 渲染函数/JSX 中使用                    |
| `createVNode`       | 创建虚拟 DOM 节点（VNode）            | 渲染函数/JSX 底层 API，Uniapp 少用     |

## 二、Uniapp 专属组合式 API（Vue3 适配版）
Uniapp 在 Vue3 中提供了「组合式 API 版本」的专属功能，替代传统的 `Page({ onLoad() {} })` 语法，更贴合 Vue3 开发习惯，且支持 TS 类型提示。

### 1. 页面生命周期组合式 API
替代 Uniapp 传统页面生命周期（如 `onLoad`/`onShow`），需在页面组件（`pages/xxx.vue`）中使用：
| API                  | 作用                                  | 触发时机                              |
|-----------------------|---------------------------------------|---------------------------------------|
| `onLoad`              | 页面加载完成                          | 页面首次渲染，可接收路由参数          |
| `onShow`              | 页面显示（切入前台）                  | 路由切换、APP 从后台切前台时触发      |
| `onReady`             | 页面初次渲染完成                      | 类似 Vue 的 `onMounted`，Uniapp 推荐用这个操作 DOM |
| `onHide`              | 页面隐藏（切入后台）                  | 路由切换、APP 切后台时触发            |
| `onUnload`            | 页面卸载                              | 关闭页面（如 `uni.navigateBack`）时触发 |
| `onPullDownRefresh`   | 下拉刷新触发                          | 需在 `pages.json` 中配置 `enablePullDownRefresh: true` |
| `onReachBottom`       | 上拉触底触发                          | 需在 `pages.json` 中配置 `onReachBottomDistance` |
| `onPageScroll`        | 页面滚动时触发                        | 监听页面滚动距离（scrollTop/scrollLeft） |
| `onShareAppMessage`   | 小程序右上角分享触发                  | 配置分享标题、图片、路径              |
| `onShareTimeline`     | 微信小程序分享到朋友圈触发            | 微信专属，需配置分享参数              |
| `onAddToFavorites`    | 微信小程序收藏触发                    | 微信专属，配置收藏标题、图片、路径    |
| `onTabItemTap`        | 底部 Tab 切换触发                     | 点击 `pages.json` 中配置的 Tab 项时    |
| `onResize`            | 页面尺寸变化触发                      | 屏幕旋转、窗口缩放（H5/APP 端）        |
| `onKeyboardHeightChange` | 软键盘高度变化触发                  | 输入框聚焦/失焦时（移动端）            |
| `onBackPress`         | 页面返回事件触发                      | 安卓返回键、小程序左上角返回按钮       |

### 2. 路由相关组合式 API
Uniapp 3.2.0+ 提供，替代 `uni.navigateTo` 等回调式 API，支持 Promise 链式调用和 TS 类型：
| API                  | 作用                                  | 用法示例                              |
|-----------------------|---------------------------------------|---------------------------------------|
| `useRouter`           | 获取路由实例                          | `const router = useRouter()`，调用 `router.push` 等 |
| `useRoute`            | 获取当前路由信息                      | `const route = useRoute()`，访问 `route.query`/`route.params` |
| `usePage`             | 获取当前页面实例                      | `const page = usePage()`，访问页面生命周期/方法 |

### 3. 存储相关组合式 API
简化 `uni.setStorage`/`uni.getStorage`，支持响应式和自动类型推导：
| API                  | 作用                                  | 特点                                  |
|-----------------------|---------------------------------------|---------------------------------------|
| `useStorage`          | 响应式操作本地存储                    | 支持 `localStorage`/`sessionStorage`，数据变化自动同步 |
| `useStorageSync`      | 同步操作本地存储（无回调）            | 阻塞式，适合少量数据，TS 类型安全      |
| `useStorageAsync`     | 异步操作本地存储（Promise 版）        | 非阻塞，适合大量数据，支持错误捕获    |

### 4. 设备/系统相关组合式 API
| API                  | 作用                                  | 适用端                                |
|-----------------------|---------------------------------------|---------------------------------------|
| `useDeviceInfo`       | 获取设备信息（型号、系统、像素比等）  | 全端支持                              |
| `useSystemInfo`       | 获取系统信息（操作系统、微信版本等）  | 全端支持，小程序端信息更详细          |
| `useNetworkType`      | 获取网络类型（wifi/4g/5g/无网络）     | 响应式，网络变化自动更新              |
| `useBatteryInfo`      | 获取电池信息（电量、是否充电）        | 移动端（APP/小程序）支持              |
| `useClipboardData`    | 操作剪贴板（读取/写入）               | 响应式，支持文本/图片（部分端）        |

### 5. 网络请求组合式 API
替代 `uni.request`，支持拦截器、响应式状态、错误处理：
| API                  | 作用                                  | 特点                                  |
|-----------------------|---------------------------------------|---------------------------------------|
| `useRequest`          | 发起网络请求（Uniapp 内置封装）       | 支持 loading 状态、请求取消、重试、缓存 |
| `useRequestInterceptor` | 配置请求拦截器                      | 统一添加请求头、参数序列化            |
| `useResponseInterceptor` | 配置响应拦截器                      | 统一处理响应数据、错误捕获            |

### 6. 事件总线组合式 API
替代 `uni.$on`/`uni.$emit`，支持自动解绑，避免内存泄漏：
| API                  | 作用                                  | 用法示例                              |
|-----------------------|---------------------------------------|---------------------------------------|
| `useEventBus`         | 创建/获取事件总线实例                  | `const bus = useEventBus('bus-name')`  |
| `onEvent`             | 监听事件                              | `onEvent(bus, 'event-name', (data) => {})` |
| `emitEvent`           | 触发事件                              | `emitEvent(bus, 'event-name', data)`  |
| `offEvent`            | 解绑事件                              | `offEvent(bus, 'event-name', callback)` |

### 7. 其他 Uniapp 专属组合式 API
| API                  | 作用                                  | 适用场景                              |
|-----------------------|---------------------------------------|---------------------------------------|
| `usePullDownRefresh`  | 控制下拉刷新（开始/停止）             | `const { start, stop } = usePullDownRefresh()` |
| `useNavigationBar`    | 控制导航栏（标题、样式、显示/隐藏）   | 响应式修改导航栏属性                  |
| `useTabBar`           | 控制底部 TabBar（显示/隐藏、徽章）    | 动态修改 TabBar 状态                  |
| `useToast`            | 显示提示框（替代 `uni.showToast`）    | 支持自动关闭、类型配置（success/error） |
| `useModal`            | 显示模态框（替代 `uni.showModal`）    | Promise 版，支持确认/取消回调          |
| `useLoading`          | 显示加载框（替代 `uni.showLoading`）  | 自动关闭，避免忘记 `hideLoading`       |
| `useShare`            | 统一配置分享参数（替代 `onShareAppMessage`） | 简化分享逻辑，支持动态修改参数        |

## 三、关键使用注意事项
1. **使用范围**：
   - Vue3 原生 API：组件、页面均可使用；
   - Uniapp 页面生命周期 API（如 `onLoad`/`onShow`）：仅页面组件（`pages/xxx.vue`）可用，普通组件使用无效；
   - Uniapp 工具类 API（如 `useStorage`/`useRequest`）：组件、页面均可使用。

2. **TS 支持**：
   - 所有 API 均支持 TypeScript 类型推导，无需额外声明（如 `defineProps<{ id: number }>`）；
   - Uniapp 组合式 API 需确保 Uniapp 版本 ≥ 3.2.0（低版本需升级 `@dcloudio/uni-app`）。

3. **与传统 API 区别**：
   - Uniapp 组合式 API 是「Vue3 风格替代方案」，功能与传统 API 一致（如 `useRouter` ≈ `uni.navigateTo`）；
   - 组合式 API 更适合在 `<script setup lang="ts">` 中使用，代码更简洁，支持逻辑复用。

4. **优先级建议**：
   - 优先使用 Vue3 原生 API 处理响应式、生命周期；
   - 处理 Uniapp 多端特性（如路由、存储、设备）时，优先使用 Uniapp 专属组合式 API（类型更匹配，多端适配更好）。
