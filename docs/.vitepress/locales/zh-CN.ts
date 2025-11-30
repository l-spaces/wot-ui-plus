import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  description: '一个参照wot-design打造的uni-app组件库',
  themeConfig: {
    lastUpdated: {
      text: '更新时间'
    },
    editLink: {
      pattern: 'https://github.com/l-spaces/wot-ui-plus',
      text: '为此页提供修改建议'
    },
    nav: [
      {
        text: '指南',
        activeMatch: '/guide/',
        items: [
          {
            text: '介绍',
            link: '/guide/introduction'
          },
          {
            text: '快速上手',
            link: '/guide/quick-use'
          },
          {
            text: '脚手架与模板',
            link: '/guide/cli-templates'
          },
          {
            text: '咨询服务',
            link: '/guide/consultation'
          },
          {
            text: '定制主题',
            link: '/guide/custom-theme'
          },
          {
            text: '常见问题',
            link: '/guide/common-problems'
          },
          {
            text: '国际化',
            link: '/guide/locale'
          },
          {
            text: '更新日志',
            link: '/guide/changelog'
          },
          {
            text: '⭐ 案例',
            link: '/guide/cases'
          },
          {
            text: '加群沟通',
            link: '/guide/join-group'
          }
        ]
      },
      {
        text: '组件',
        activeMatch: '/component/',
        items: [
          {
            text: '总览',
            link: '/component/intro'
          },
          {
            text: '基础组件',
            link: '/component/button'
          },
          {
            text: '展示组件',
            link: '/component/icon'
          },
          {
            text: '表单组件',
            link: '/component/input'
          },
          {
            text: '日期时间组件',
            link: '/component/calendar'
          },
          {
            text: '交互组件',
            link: '/component/popup'
          },
          {
            text: '输入设备组件',
            link: '/component/keyboard'
          },
          {
            text: '高级组件',
            link: '/component/transition'
          },
          {
            text: '配置组件',
            link: '/component/configProvider'
          }
        ]
      },
      { text: '捐赠', link: '/reward/reward', activeMatch: '/reward/' },
      { text: 'GitHub', link: 'https://github.com/l-spaces/wot-ui-plus' }
      // {
      //   text: '模板',
      //   items: [
      //     { text: '快速上手模板 wot-starter', link: 'https://starter.wot-ui.cn/' },
      //     { text: 'vitesse-uni-app', link: 'https://vitesse-docs.netlify.app/' },
      //     { text: 'wot-starter-retail', link: 'https://github.com/wot-ui/wot-starter-retail' },
      //     { text: 'unibest', link: 'https://unibest.tech/' }
      //   ]
      // },
      // {
      //   text: '资源',
      //   items: [
      //     { text: '快速上手模板', link: 'https://starter.wot-ui.cn/' },
      //     { text: 'VS Code 代码提示插件', link: 'https://marketplace.visualstudio.com/items?itemName=wot-ui.wot-ui-intellisense' },
      //     { text: 'Vue3 uni-app路由库', link: 'https://moonofweisheng.github.io/uni-mini-router/' },
      //     { text: '多平台小程序CI工具', link: 'https://github.com/Moonofweisheng/uni-mini-ci' },
      //     { text: 'Uni Helper', link: 'https://uni-helper.js.org/' },
      //     { text: 'uni-ku', link: 'https://github.com/uni-ku' }
      //   ]
      // }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '介绍',
          link: '/guide/introduction'
        },
        {
          text: '快速上手',
          link: '/guide/quick-use'
        },
        {
          text: '脚手架与模板',
          link: '/guide/cli-templates'
        },
        {
          text: '咨询服务',
          link: '/guide/consultation'
        },
        {
          text: '定制主题',
          link: '/guide/custom-theme'
        },
        {
          text: '国际化',
          link: '/guide/locale'
        },
        {
          text: '常见问题',
          link: '/guide/common-problems'
        },
        {
          text: '🔍 Vue3+Uniapp组合式API',
          link: '/guide/api-list'
        },
        {
          text: '📖 Vue3与Uniapp的API对比',
          link: '/guide/api-contrast'
        },
        {
          text: '更新日志',
          link: '/guide/changelog'
        },
        {
          text: '⭐ 案例',
          link: '/guide/cases'
        },
        {
          text: '加群沟通',
          link: '/guide/join-group'
        }
      ],
      '/reward/': [
        {
          text: '🥤捐赠',
          link: '/reward/reward'
        },
        {
          text: '榜上有名',
          link: '/reward/donor'
        },
        {
          text: '成为赞助者',
          link: '/reward/sponsor'
        }
      ],
      '/component/': [
        {
          text: '介绍',
          link: '/component/intro'
        },
        {
          text: '基础组件',
          collapsed: false,
          items: [
            { link: '/component/button', text: 'Button 按钮组件' },
            { link: '/component/fab', text: 'Fab 悬浮按钮' },
            { link: '/component/sortButton', text: 'SortButton 排序按钮' },
            { link: '/component/switch', text: 'Switch 开关组件' },
            { link: '/component/layout', text: 'Layout 布局组件' },
            { link: '/component/grid', text: 'Grid 网格布局' },
            { link: '/component/gap', text: 'Gap 间隔组件' },
            { link: '/component/divider', text: 'Divider 分割线' },
            { link: '/component/card', text: 'Card 卡片组件' },
            { link: '/component/cell', text: 'Cell 单元格组件' },
            { link: '/component/navbar', text: 'Navbar 导航栏' },
            { link: '/component/noticeBar', text: 'NoticeBar 通知栏' },
            { link: '/component/tabbar', text: 'Tabbar 标签栏' },
            { link: '/component/tabs', text: 'Tabs 标签页' },
            { link: '/component/sidebar', text: 'Sidebar 侧边栏' },
            { link: '/component/steps', text: 'Steps 步骤条' },
            { link: '/component/backtop', text: 'Backtop 返回顶部' },
            { link: '/component/indexBar', text: 'IndexBar 索引栏' }
          ]
        },
        {
          text: '展示组件',
          collapsed: false,
          items: [
            { link: '/component/icon', text: 'Icon 图标组件' },
            { link: '/component/img', text: 'Img 图片组件' },
            { link: '/component/imgCropper', text: 'ImgCropper 图片裁剪' },
            { link: '/component/avatar', text: 'Avatar 头像组件' },
            { link: '/component/badge', text: 'Badge 徽标组件' },
            { link: '/component/text', text: 'Text 文本组件' },
            { link: '/component/tag', text: 'Tag 标签组件' },
            { link: '/component/progress', text: 'Progress 进度条' },
            { link: '/component/circle', text: 'Circle 环形进度条' },
            { link: '/component/rate', text: 'Rate 评分组件' },
            { link: '/component/skeleton', text: 'Skeleton 骨架屏' },
            { link: '/component/watermark', text: 'Watermark 水印' },
            { link: '/component/table', text: 'Table 表格组件' },
            { link: '/component/swiper', text: 'Swiper 轮播图' },
            { link: '/component/waterfall', text: 'Waterfall 瀑布流' },
            { link: '/component/sticky', text: 'Sticky 粘性布局' }
          ]
        },
        {
          text: '表单组件',
          collapsed: false,
          items: [
            { link: '/component/input', text: 'Input 输入框' },
            { link: '/component/textarea', text: 'Textarea 文本域' },
            { link: '/component/inputNumber', text: 'InputNumber 计数器' },
            { link: '/component/passwordInput', text: 'PasswordInput 密码输入框' },
            { link: '/component/code', text: 'Code 验证码获取' },
            { link: '/component/codeInput', text: 'CodeInput 验证码输入' },
            { link: '/component/search', text: 'Search 搜索框' },
            { link: '/component/radio', text: 'Radio 单选框' },
            { link: '/component/checkbox', text: 'Checkbox 复选框' },
            { link: '/component/picker', text: 'Picker 选择器' },
            { link: '/component/pickerView', text: 'PickerView 选择器视图' },
            { link: '/component/colPicker', text: 'ColPicker 多列选择器' },
            { link: '/component/selectPicker', text: 'SelectPicker 选择选择器' },
            { link: '/component/slider', text: 'Slider 滑块' },
            { link: '/component/segmented', text: 'Segmented 分段器' },
            { link: '/component/form', text: 'Form 表单组件' }
          ]
        },
        {
          text: '日期时间组件',
          collapsed: false,
          items: [
            { link: '/component/calendar', text: 'Calendar 日历组件' },
            { link: '/component/calendarView', text: 'CalendarView 日历视图' },
            { link: '/component/datetimePicker', text: 'DatetimePicker 日期时间选择器' },
            { link: '/component/datetimePickerView', text: 'DatetimePickerView 日期时间选择器视图' },
            { link: '/component/countDown', text: 'CountDown 倒计时' },
            { link: '/component/countTo', text: 'CountTo 数字动画' },
            { link: '/component/dateStrip', text: 'DateStrip 日期横条' }
          ]
        },
        {
          text: '交互组件',
          collapsed: false,
          items: [
            { link: '/component/popup', text: 'Popup 弹出层' },
            { link: '/component/popover', text: 'Popover 气泡弹出框' },
            { link: '/component/overlay', text: 'Overlay 遮罩层' },
            { link: '/component/toast', text: 'Toast 轻提示' },
            { link: '/component/notify', text: 'Notify 通知提示' },
            { link: '/component/messageBox', text: 'MessageBox 消息框' },
            { link: '/component/tooltip', text: 'Tooltip 文字提示' },
            { link: '/component/actionSheet', text: 'ActionSheet 动作面板' },
            { link: '/component/loading', text: 'Loading 加载中' },
            { link: '/component/loadingPage', text: 'LoadingPage 加载页面' },
            { link: '/component/loadmore', text: 'Loadmore 加载更多' },
            { link: '/component/statusTip', text: 'StatusTip 状态提示' },
            { link: '/component/swipeAction', text: 'SwipeAction 滑动操作' },
            { link: '/component/collapse', text: 'Collapse 折叠面板' },
            { link: '/component/dropMenu', text: 'DropMenu 下拉菜单' },
            { link: '/component/floatingPanel', text: 'FloatingPanel 浮动面板' },
            { link: '/component/sliderButton', text: 'SliderButton 滑动按钮' }
          ]
        },
        {
          text: '输入设备组件',
          collapsed: false,
          items: [
            { link: '/component/keyboard', text: 'Keyboard 键盘组件' },
            { link: '/component/signature', text: 'Signature 签名板' }
          ]
        },
        {
          text: '高级组件',
          collapsed: false,
          items: [
            { link: '/component/transition', text: 'Transition 动画组件' },
            { link: '/component/curtain', text: 'Curtain 幕布组件' },
            { link: '/component/lazyLoad', text: 'LazyLoad 懒加载' },
            { link: '/component/resize', text: 'Resize 尺寸监听' },
            { link: '/component/rootPortal', text: 'RootPortal 根节点传送' },
            { link: '/component/pagination', text: 'Pagination 分页器' },
            { link: '/component/tree', text: 'Tree 树形控件' },
            { link: '/component/upload', text: 'Upload 上传组件' },
            { link: '/component/tour', text: 'Tour 引导组件' },
            { link: '/component/wxRewardAd', text: 'WxRewardAd 微信激励广告' }
          ]
        },
        {
          text: '配置组件',
          collapsed: false,
          items: [
            { link: '/component/configProvider', text: 'ConfigProvider 全局配置' },
            { link: '/component/color', text: 'Color 默认主题' }
          ]
        },
        {
          text: '组合式API',
          items: [
            { text: 'useUpload', link: '/component/use-upload' },
            { text: 'useCountDown', link: '/component/use-count-down' },
            { text: 'useToast', link: '/component/use-toast' },
            { text: 'useMessage', link: '/component/use-message' }
          ]
        }
      ]
    }
  }
})
