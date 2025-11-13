import { defineConfig } from 'vitepress'
import viteCompression from 'vite-plugin-compression'
import { fileURLToPath, URL } from 'node:url'
import { MarkdownTransform } from './plugins/markdown-transform'
import { VersionBadgePlugin } from './plugins/version-badge'
import llmstxt from 'vitepress-plugin-llms'
import zhCN from './locales/zh-CN'

export default defineConfig({
  vite: {
    plugins: [
      llmstxt({
        ignoreFiles: [
          'reward/*',
          'index.md',
          'README.md',
          'ads/*',
          'guide/cases.md',
          'guide/changelog.md',
          'guide/join-group.md',
          'guide/typography.md'
        ],
        domain: 'http://106.55.153.212'
      }),
      MarkdownTransform(),
      VersionBadgePlugin(),
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz'
      })
    ],
    ssr: { noExternal: ['element-plus'] },
    resolve: {
      alias: [
        {
          find: /^.*\/VPSidebar\.vue$/,
          replacement: fileURLToPath(new URL('./theme/components/VPSidebar.vue', import.meta.url))
        },
        {
          find: /^.*\/VPContent\.vue$/,
          replacement: fileURLToPath(new URL('./theme/components/VPContent.vue', import.meta.url))
        },
        {
          find: /^.*\/VPDoc\.vue$/,
          replacement: fileURLToPath(new URL('./theme/components/VPDoc.vue', import.meta.url))
        },
        {
          find: /^.*\/VPLocalNav\.vue$/,
          replacement: fileURLToPath(new URL('./theme/components/VPLocalNav.vue', import.meta.url))
        },
        {
          find: /^.*\/VPNavBar\.vue$/,
          replacement: fileURLToPath(new URL('./theme/components/VPNavBar.vue', import.meta.url))
        },
        {
          find: /^.*\/VPSidebarItem\.vue$/,
          replacement: fileURLToPath(new URL('./theme/components/VPSidebarItem.vue', import.meta.url))
        }
      ]
    }
  },
  title: `Wot UI Plus`,
  description: 'uni-app组件库',
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      ...zhCN
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/logo-mini.svg' }],
  ],
  // 导航栏 配置
  themeConfig: {
    logo: '/logo-mini.svg',
    lastUpdated: {
      text: '更新时间',

      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium',
      }
    },
    // 编辑链接 配置
    editLink: {
      pattern: 'https://gitee.com/my_spaces/:path',
      text: '为此页提供修改建议'
    },
    // 社交链接 配置
    socialLinks: [
      { icon: 'github', link: 'https://gitee.com/my_spaces/wot-ui-plus' },
      {
        icon: 'gitee',
        link: 'https://gitee.com/my_spaces/wot-ui-plus',
        ariaLabel: 'Gitee'
      }
    ],
    // 搜索框 配置
    search: {
      provider: 'local'
      // options: {
      //   appId: 'A74X2RFXSU',
      //   apiKey: '6961856d63f5181bf71cb4fa3e4398d2',
      //   indexName: 'wot-ui-plus'
      // }
    },
    // 页脚配置
    footer: {
      message: `📖  Released under the MIT License`,// 版权前显示的信息
      copyright: 'Copyright © 2025 Wot UI Plus'// 实际的版权文本
    }
  }
})
