# Vue3 与 Uniapp 组合式 API 全景对比手册

## 说明



* ✅ 共同支持：双方均提供且用法一致的 API
* 🟢 Vue3 独有：仅 Vue3 支持，Uniapp 无对应实现
* 🔵 Uniapp 独有：仅 Uniapp 支持，Vue3 无对应实现
* 🔄 功能重叠：功能相似但 API 形态不同



***

## 一、应用初始化



| 功能描述   | Vue3 原生组合式 API                                | Uniapp 专属组合式 API    | 差异说明                                                         |
| ------ | --------------------------------------------- | ------------------- | ------------------------------------------------------------ |
| 创建应用实例 | `createApp(App).use(router).mount('#app')` 🟢 | 自动初始化（无需手动调用） 🔵    | Vue3 需显式创建实例，Uniapp 基于`main.js`自动初始化，适配跨端容器（如小程序沙箱、APP 原生容器） |
| 入口逻辑处理 | `setup()`（组件入口）✅                              | `setup()`（兼容 Vue3）✅ | 用法一致，但 Uniapp 中`setup`内无法直接操作小程序原生 API（需等待`onReady`确保节点就绪）   |



***

## 二、响应式数据处理



| 功能描述      | Vue3 原生组合式 API                              | Uniapp 专属组合式 API        | 差异说明                                                           |
| --------- | ------------------------------------------- | ----------------------- | -------------------------------------------------------------- |
| 基础响应式变量   | `ref(initialValue)` ✅                       | 同 Vue3（直接使用`ref`）✅      | 完全一致，Uniapp 额外优化跨端响应式同步（如小程序端避免重复代理导致的性能问题）                    |
| 响应式对象     | `reactive(obj)` ✅                           | 同 Vue3（直接使用`reactive`）✅ | 一致，均不支持解构赋值（需配合`toRefs`保留响应式）                                  |
| 计算属性      | `computed(() => { ... })` ✅                 | 同 Vue3（直接使用`computed`）✅ | 一致，支持只读（默认）和可写模式（需传`{ get, set }`）                             |
| 响应式解构     | `toRefs(reactiveObj)` ✅                     | 同 Vue3（直接使用`toRefs`）✅   | 一致，用于将响应式对象转为 “ref 属性集合”，方便组件内解构使用                             |
| 浅层响应式（对象） | `shallowReactive(obj)` 🟢                   | -                       | Vue3 独有，仅顶层属性响应式；Uniapp 无对应 API，需通过`watch`手动监听顶层属性             |
| 浅层响应式（值）  | `shallowRef(initialValue)` 🟢               | -                       | Vue3 独有，仅`.value`变更触发更新；Uniapp 需用`ref`+`triggerRef`模拟（需手动调用更新） |
| 手动触发更新    | `triggerRef(refObj)` 🟢                     | -                       | Vue3 独有，强制更新`shallowRef`关联的视图；Uniapp 无此 API                    |
| 自定义响应式逻辑  | `customRef((track, trigger) => ({...}))` 🟢 | -                       | Vue3 独有，可实现防抖（如输入框延迟响应）、节流等自定义逻辑；Uniapp 需通过工具函数封装              |
| 禁止响应式转换   | `markRaw(obj)` 🟢                           | -                       | Vue3 独有，标记对象不转为 Proxy（如第三方库实例）；Uniapp 需通过`toRaw`获取原始对象避免响应式干扰  |
| 只读响应式（深层） | `readonly(obj)` ✅                           | 同 Vue3（直接使用`readonly`）✅ | 一致，深层属性均不可修改，修改会触发警告（开发环境）                                     |
| 只读响应式（浅层） | `shallowReadonly(obj)` 🟢                   | -                       | Vue3 独有，仅顶层属性只读；Uniapp 无对应 API，需手动限制顶层属性修改                     |
| 获取原始对象    | `toRaw(reactiveObj)` ✅                      | 同 Vue3（直接使用`toRaw`）✅    | 一致，用于跳过响应式代理操作原始数据（如批量修改不触发视图更新）                               |
| 响应式判断     | `isRef/isReactive/isProxy/isReadonly()` ✅   | 同 Vue3（直接使用对应 API）✅     | 一致，用于类型校验（如判断变量是否为响应式，避免非响应式变量调用`.value`）                      |



***

## 三、生命周期钩子（重点补充修正）



| 功能描述          | Vue3 原生组合式 API                                   | Uniapp 专属组合式 API                                | 差异说明                                                                                                                                                                                                   |
| ------------- | ------------------------------------------------ | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 组件挂载前         | `onBeforeMount(() => { ... })` ✅                 | 同 Vue3（直接使用`onBeforeMount`）✅                    | 一致，组件实例创建后、DOM 挂载前执行，可初始化非 DOM 相关数据                                                                                                                                                                    |
| 组件挂载完成        | `onMounted(() => { ... })` ✅                     | `onReady(() => { ... })` 🔄                     | `onMounted`在 Uniapp 中可用，但`onReady`更贴合小程序 DOM 就绪时机（如获取节点信息建议用`onReady`）                                                                                                                                 |
| 组件更新前         | `onBeforeUpdate(() => { ... })` ✅                | 同 Vue3（直接使用`onBeforeUpdate`）✅                   | 一致，响应式数据变化后、DOM 更新前执行，可获取更新前的 DOM 状态                                                                                                                                                                   |
| 组件更新完成        | `onUpdated(() => { ... })` ✅                     | 同 Vue3（直接使用`onUpdated`）✅                        | 一致，DOM 更新后执行，避免在该钩子中修改响应式数据（可能触发无限更新）                                                                                                                                                                  |
| 组件销毁前         | `onBeforeUnmount(() => { ... })` ✅               | 同 Vue3（直接使用`onBeforeUnmount`）✅                  | 1. 双方用法完全一致，组件实例销毁前执行，此时 DOM 仍存在、响应式数据可访问；2. Uniapp 执行顺序：`onBeforeUnmount` → 组件 DOM 卸载 → `onUnmounted` → `onUnload`（页面级卸载）；3. 核心用途：清理定时器、解绑全局事件（如`window.addEventListener`/`uni.$on`）、取消未完成网络请求，避免内存泄漏 |
| 组件完全销毁        | `onUnmounted(() => { ... })` ✅                   | `onUnload(() => { ... })` 🔄                    | `onUnmounted`用于组件销毁（如组件从 DOM 移除），`onUnload`为 Uniapp 页面级卸载（如关闭页面），页面开发中优先用`onUnload`做最终清理                                                                                                               |
| 错误捕获          | `onErrorCaptured((err, instance) => { ... })` 🟢 | -                                               | Vue3 独有，捕获子组件抛出的错误（如异步请求失败），返回`false`可阻止错误冒泡；Uniapp 需通过`uni.onError`全局监听错误                                                                                                                             |
| keep-alive 激活 | `onActivated(() => { ... })` ✅                   | 同 Vue3（直接使用`onActivated`）✅                      | 一致，配合`<keep-alive>`使用，组件从缓存中激活时执行（如页面切回时刷新数据）                                                                                                                                                          |
| keep-alive 失活 | `onDeactivated(() => { ... })` ✅                 | 同 Vue3（直接使用`onDeactivated`）✅                    | 一致，配合`<keep-alive>`使用，组件进入缓存时执行（如清理临时数据）                                                                                                                                                               |
| 页面初始加载        | -                                                | `onLoad((options) => { ... })` 🔵               | Uniapp 独有，页面首次加载时触发，可获取路由参数`options`（如`options.id`），仅执行一次                                                                                                                                              |
| 页面显示（切入前台）    | -                                                | `onShow(() => { ... })` 🔵                      | Uniapp 独有，页面切入前台时触发（如小程序从后台切回、Tab 切换到当前页），可执行多次                                                                                                                                                        |
| 页面隐藏（切入后台）    | -                                                | `onHide(() => { ... })` 🔵                      | Uniapp 独有，页面切入后台时触发（如小程序切后台、切换到其他 Tab），可用于保存页面临时状态                                                                                                                                                     |
| 下拉刷新触发        | -                                                | `onPullDownRefresh(() => { ... })` 🔵           | Uniapp 独有，需在`pages.json`中配置`"enablePullDownRefresh": true`，刷新完成后需调用`uni.stopPullDownRefresh()`停止刷新动画                                                                                                   |
| 上拉触底触发        | -                                                | `onReachBottom(() => { ... })` 🔵               | Uniapp 独有，可在`pages.json`中配置`"onReachBottomDistance": 50`（默认 50px），用于列表加载更多                                                                                                                             |
| 页面滚动监听        | -                                                | `onPageScroll((e) => { ... })` 🔵               | Uniapp 独有，`e`包含`scrollTop`（纵向滚动距离）、`scrollLeft`（横向滚动距离），需避免在该钩子中执行复杂逻辑（影响性能）                                                                                                                           |
| 导航栏按钮点击       | -                                                | `onNavigationBarButtonTap((e) => { ... })` 🔵   | Uniapp 独有，需在`pages.json`中配置导航栏自定义按钮（如`"rightText": "编辑"`），`e`返回按钮标识                                                                                                                                    |
| 页面尺寸变化        | -                                                | `onResize((e) => { ... })` 🔵                   | Uniapp 独有，监听窗口尺寸变化（如平板横屏 / 竖屏切换、H5 窗口缩放），`e`包含新尺寸信息                                                                                                                                                    |
| 页面返回拦截        | -                                                | `onBackPress((options) => { ... })` 🔵          | Uniapp 独有，拦截页面返回事件（如安卓物理返回键、小程序左上角返回按钮），返回`true`可阻止默认返回行为                                                                                                                                              |
| 微信分享（好友）      | -                                                | `onShareAppMessage(() => ({ title, path }))` 🔵 | Uniapp 独有，微信小程序专属，配置好友分享参数（标题、路径、图片）                                                                                                                                                                   |
| 微信分享（朋友圈）     | -                                                | `onShareTimeline(() => ({ title, path }))` 🔵   | Uniapp 独有，微信小程序专属，配置朋友圈分享参数                                                                                                                                                                            |
| 微信收藏触发        | -                                                | `onAddToFavorites(() => ({ title, path }))` 🔵  | Uniapp 独有，微信小程序专属，配置页面收藏参数                                                                                                                                                                             |



***

## 四、路由操作



| 功能描述       | Vue3 原生组合式 API                      | Uniapp 专属组合式 API                       | 差异说明                                                                                            |
| ---------- | ----------------------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------- |
| 获取路由实例     | `useRouter()` ✅                     | `useRouter()`（Uniapp 封装）✅              | Vue3 返回 Vue Router 实例（支持`push`/`replace`等），Uniapp 返回跨端路由实例（支持`navigateTo`/`redirectTo`等）        |
| 获取当前路由信息   | `useRoute()` ✅                      | `useRoute()`（Uniapp 封装）✅               | Vue3 支持`route.params`（动态路由参数）和`route.query`（查询参数），Uniapp 仅支持`route.query`（无动态路由参数，需通过`query`传递） |
| 路由跳转（保留历史） | `router.push('/path')` ✅            | `router.navigateTo('/path')` 🔄        | Uniapp 中`navigateTo`有页面栈限制（最多 10 层），超过需用`redirectTo`                                            |
| 路由跳转（替换历史） | `router.replace('/path')` ✅         | `router.redirectTo('/path')` 🔄        | 一致，替换当前页面路由，不保留历史记录（返回时跳过当前页）                                                                   |
| 路由返回       | `router.back()` / `router.go(-1)` ✅ | `router.navigateBack({ delta: 1 })` 🔄 | Uniapp 可通过`delta`指定返回层级（如`delta:2`返回上两级页面），Vue3 需用`go(-2)`实现                                    |
| Tab 页跳转    | -                                   | `router.switchTab('/tab-path')` 🔵     | Uniapp 独有，用于切换底部 Tab 页面（仅能跳转 Tab 配置页），会关闭其他非 Tab 页面                                             |
| 关闭所有页面跳转   | -                                   | `router.reLaunch('/path')` 🔵          | Uniapp 独有，关闭所有页面并跳转到目标页（适合登录后重定向）                                                               |
| 动态路由匹配     | `useRoute().params` 🟢              | -                                      | Vue3 支持动态路由（如`/user/:id`），Uniapp 需通过`query`传递动态参数（如`/user?id=123`）                              |



***

## 五、数据存储



| 功能描述    | Vue3 原生组合式 API                        | Uniapp 专属组合式 API                                       | 差异说明                                                                                       |
| ------- | ------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| 响应式本地存储 | -                                     | `const [value, setValue] = useStorage('key', init)` 🔵 | Uniapp 独有，自动同步本地存储与响应式数据（修改`value`自动更新存储，存储变化自动更新`value`），支持`localStorage`/ 小程序存储 / APP 存储 |
| 同步本地存储  | -                                     | `useStorageSync('key', init)` 🔵                       | Uniapp 独有，同步版存储 API（阻塞执行），适合少量数据（如用户 ID），返回存储值                                             |
| 异步本地存储  | -                                     | `useStorageAsync('key', init)` 🔵                      | Uniapp 独有，Promise 版存储 API（非阻塞），适合大量数据（如缓存列表），支持`await`调用                                   |
| 临时状态共享  | 需手动封装（如 EventBus）🟢                   | `const bus = useEventBus('key')` 🔵                    | Uniapp 独有，基于事件总线的临时状态共享（替代 Vuex/Pinia 轻量场景），配合`onEvent`/`emitEvent`使用                      |
| 清除本地存储  | 需用`localStorage.removeItem('key')` 🟢 | `uni.removeStorage({ key: 'key' })` 🔵                 | Uniapp 提供跨端清除存储 API（同步版`uni.removeStorageSync`），Vue3 需手动适配不同端存储 API                        |



***

## 六、事件与副作用



| 功能描述    | Vue3 原生组合式 API                                 | Uniapp 专属组合式 API                                  | 差异说明                                                                    |
| ------- | ---------------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------- |
| 显式数据监听  | `watch(source, (newVal, oldVal) => { ... })` ✅ | 同 Vue3（直接使用`watch`）✅                              | 一致，支持监听单个值（ref）、多个值（数组）、对象深层属性（`{ deep: true }`）                        |
| 自动副作用监听 | `watchEffect(() => { ... })` ✅                 | 同 Vue3（直接使用`watchEffect`）✅                        | 一致，自动追踪依赖（无需指定监听源），组件卸载时自动停止监听                                          |
| 副作用延迟执行 | `watchPostEffect(() => { ... })` 🟢            | -                                                 | Vue3 独有，等价于`watchEffect({ flush: 'post' })`，在 DOM 更新后执行副作用（如获取更新后的节点尺寸） |
| 副作用同步执行 | `watchSyncEffect(() => { ... })` 🟢            | -                                                 | Vue3 独有，等价于`watchEffect({ flush: 'sync' })`，响应式数据变化后立即执行副作用（不等待 DOM 更新） |
| 副作用作用域  | `const scope = effectScope()` 🟢               | -                                                 | Vue3 独有，创建独立副作用作用域（管理`watch`/`computed`），调用`scope.stop()`可批量停止所有副作用     |
| 作用域清理回调 | `onScopeDispose(() => { ... })` 🟢             | -                                                 | Vue3 独有，副作用作用域销毁时执行清理（如清除定时器），适合封装可复用逻辑（如自定义 Hook）                      |
| 事件总线监听  | 需手动封装（如`new EventBus()`）🟢                     | `onEvent(bus, 'event-key', (data) => { ... })` 🔵 | Uniapp 独有，配合`useEventBus`使用，组件卸载时自动解绑（避免内存泄漏）                           |
| 事件总线触发  | 需手动封装 🟢                                       | `emitEvent(bus, 'event-key', data)` 🔵            | Uniapp 独有，触发指定事件总线的事件，支持传递任意数据                                          |
| 事件总线解绑  | 需手动封装 🟢                                       | `offEvent(bus, 'event-key', callback)` 🔵         | Uniapp 独有，解绑指定事件总线的监听函数（不传`callback`解绑所有该事件监听）                          |



***

## 七、设备与系统



| 功能描述   | Vue3 原生组合式 API                        | Uniapp 专属组合式 API                                  | 差异说明                                                           |
| ------ | ------------------------------------- | ------------------------------------------------- | -------------------------------------------------------------- |
| 设备基础信息 | 需通过`navigator.userAgent`手动解析 🟢       | `const device = useDeviceInfo()` 🔵               | Uniapp 独有，响应式返回设备型号、像素比、屏幕尺寸等（跨端格式统一），无需手动解析                   |
| 系统环境信息 | 需通过`navigator.platform`等手动获取 🟢       | `const system = useSystemInfo()` 🔵               | Uniapp 独有，返回操作系统（如 iOS/Android）、微信版本（小程序端）、APP 版本（APP 端）等      |
| 网络类型监听 | 需手动监听`window.ononline`/`onoffline` 🟢 | `const network = useNetworkType()` 🔵             | Uniapp 独有，响应式返回网络类型（`wifi`/`4g`/`5g`/`none`），网络变化自动更新          |
| 电池信息获取 | 需通过`navigator.getBattery()`（兼容性差）🟢   | `const battery = useBatteryInfo()` 🔵             | Uniapp 独有，返回电池电量（如`80%`）、是否充电（`isCharging`），支持移动端（APP / 小程序）   |
| 剪贴板读写  | 需通过`navigator.clipboard`（H5 端）🟢      | `const { data, setData } = useClipboardData()` 🔵 | Uniapp 独有，跨端支持剪贴板读写（小程序 / H5/APP），`setData`用于写入，`data`为读取的内容   |
| 屏幕亮度控制 | 需手动调用原生 API（兼容性差）🟢                   | `uni.setScreenBrightness({ value: 0.8 })` 🔵      | Uniapp 独有，提供跨端屏幕亮度设置 / 获取 API（`uni.getScreenBrightness`），支持移动端 |



***

## 八、界面与交互



| 功能描述         | Vue3 原生组合式 API                                      | Uniapp 专属组合式 API                                                                      | 差异说明                                                                          |
| ------------ | --------------------------------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| DOM 节点获取     | `const el = ref(null); onMounted(() => el.value)` ✅ | `uni.createSelectorQuery().in(this).select('#id').boundingClientRect()` 🔄            | Vue3 直接通过 ref 获取 DOM 元素，Uniapp 需用选择器 API（跨端兼容，避免直接 DOM 操作，小程序无完整 DOM 树）       |
| 提示框（轻提示）     | 需手动封装组件 🟢                                          | `useToast({ title: '操作成功', icon: 'success' })` 🔵                                     | Uniapp 独有，封装跨端轻提示（自动消失），支持`icon`（`success`/`loading`/`none`）、`duration`（显示时长） |
| 加载框          | 需手动封装组件 🟢                                          | `const { show, hide } = useLoading({ title: '加载中' })` 🔵                              | Uniapp 独有，显示加载框（需手动调用`hide`关闭），避免重复调用导致的遮罩层残留                                 |
| 模态框（确认 / 取消） | 需手动封装组件 🟢                                          | `const { confirm } = useModal({ title: '确认删除', content: '是否删除该数据？' })` 🔵             | Uniapp 独有，Promise 版模态框，`confirm()`返回`true`（确认）/`false`（取消）                    |
| 导航栏控制        | 需手动操作 DOM（如修改`document.title`）🟢                    | `useNavigationBar({ title: '新标题', background: '#fff' })` 🔵                           | Uniapp 独有，跨端控制导航栏标题、背景色、显示 / 隐藏（`hidden: true`），无需手动操作 DOM                    |
| TabBar 控制    | 需手动操作 DOM 🟢                                        | `useTabBar({ index: 0, badge: '3', dot: true })` 🔵                                   | Uniapp 独有，控制 TabBar 选中项（`index`）、徽章（`badge`）、红点（`dot`），支持动态修改                 |
| 分享参数配置       | 需手动封装（如 H5 端`navigator.share`）🟢                    | `useShare({ title: '分享标题', path: '/pages/index', imageUrl: '/static/share.png' })` 🔵 | Uniapp 独有，统一配置跨端分享参数（替代`onShareAppMessage`），自动适配小程序 / APP/H5 分享规则             |
| 页面滚动到指定位置    | `el.value.scrollIntoView()` 🟢                      | `uni.pageScrollTo({ scrollTop: 0, duration: 300 })` 🔵                                | Uniapp 独有，跨端页面滚动 API（支持纵向 / 横向滚动、动画时长），无需获取 DOM 节点                            |



***

## 九、网络请求



| 功能描述   | Vue3 原生组合式 API                       | Uniapp 专属组合式 API                                                                                           | 差异说明                                                                                           |
| ------ | ------------------------------------ | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| 基础网络请求 | 需用`fetch`/`axios`封装（需处理跨域）🟢         | `uni.request({ url: 'https://api.com/data', method: 'GET' })` 🔵                                           | Uniapp 独有，跨端请求封装（自动适配小程序`wx.request`、APP`XMLHttpRequest`、H5`fetch`），内置跨域处理（需配置`manifest.json`） |
| 请求拦截器  | 需用`axios.interceptors.request`封装 🟢  | `useRequestInterceptor((config) => { config.header.token = 'xxx'; return config; })` 🔵                    | Uniapp 独有，全局请求拦截（统一添加 Token、修改请求参数格式），无需额外引入 axios                                             |
| 响应拦截器  | 需用`axios.interceptors.response`封装 🟢 | `useResponseInterceptor((res) => { return res.data; }, (err) => { uni.showToast({ title: '请求失败' }); })` 🔵 | Uniapp 独有，全局响应拦截（统一处理返回数据格式、错误提示），减少重复代码                                                       |
| 声明式请求  | 需用`vue-request`/`vue-query`等第三方库 🟢  | `const { data, loading, error } = useRequest({ url: 'https://api.com/data' })` 🔵                          | Uniapp 独有，声明式请求（内置 loading 状态、请求重试、缓存、取消请求），无需手动管理请求状态                                         |
| 文件上传   | 需用`axios`+`FormData`封装 🟢            | `uni.uploadFile({ url: 'https://api.com/upload', filePath: tempFilePath, name: 'file' })` 🔵               | Uniapp 独有，跨端文件上传 API（支持多文件上传、进度监听），适配小程序 / APP 文件选择逻辑                                          |
| 文件下载   | 需用`fetch`+`blob`封装 🟢                | `uni.downloadFile({ url: 'https://api.com/file.pdf', filePath: '_doc/download/file.pdf' })` 🔵             | Uniapp 独有，跨端文件下载 API（支持指定保存路径、进度监听），APP 端可直接打开下载文件                                             |



***

## 核心差异总结（修正版）

### 1. 生态定位差异



* **Vue3**：纯前端框架，提供底层响应式、组件生命周期等核心能力，需配合第三方库（Vue Router、Pinia、axios）完成完整开发，灵活度高但跨端需手动适配

* **Uniapp**：跨端解决方案，基于 Vue3 封装**90 + 专属 API**，覆盖路由、存储、设备、交互等跨端场景，开箱即用但灵活度略低（受跨端兼容性限制）

### 2. 开发范式差异



* **Vue3**：需手动封装通用能力（如请求拦截、存储管理），适合复杂定制化场景（如 PC 端管理系统）

* **Uniapp**：优先使用专属 API（如`useStorage`/`useRequest`），减少跨端适配成本，适合多端应用（小程序 / APP/H5）快速开发

### 3. 关键 API 支持差异



| 能力类别  | Vue3 优势                                  | Uniapp 优势                                      |
| ----- | ---------------------------------------- | ---------------------------------------------- |
| 响应式控制 | 支持浅层响应式、自定义响应式（`customRef`）、副作用作用域       | 简化响应式使用（无需关注底层实现），跨端同步优化                       |
| 生命周期  | 细粒度控制（`onBeforeUpdate`/`onScopeDispose`） | 扩展页面级生命周期（`onLoad`/`onShow`/`onUnload`），贴合跨端场景 |
| 跨端能力  | 需手动适配不同端 API                             | 封装跨端统一 API（路由 / 存储 / 网络 / 设备），无需关注底层差异         |

### 4. 最佳实践



* **通用逻辑**（响应式、计算属性、`watch`）：优先用**Vue3 原生 API**（兼容性最佳，无学习成本）

* **跨端场景**（路由跳转、本地存储、网络请求、设备信息）：优先用**Uniapp 专属 API**（避免重复造轮子，减少适配问题）

* **资源清理**：组件级清理用`onBeforeUnmount`（清理定时器 / 事件），页面级清理用`onUnload`（取消请求 / 保存状态），复杂副作用用`effectScope`+`onUnload`组合

* **DOM 操作**：Vue3 端用`ref`获取 DOM，Uniapp 端用`uni.createSelectorQuery`（跨端兼容），避免直接操作 DOM（小程序端不支持完整 DOM API）

> （注：文档部分内容可能由 AI 生成）
