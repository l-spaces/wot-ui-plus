/**
 * @fileoverview ESLint 代码质量检查配置文件
 * @description
 * 本文件定义了 wot-ui-plus 项目的 ESLint 配置规则，用于保障代码质量、统一编码风格。
 * 支持的技术栈：Vue 3 + TypeScript + Prettier + uni-app
 *
 * 主要功能：
 * 1. 定义 JavaScript/TypeScript 代码规范
 * 2. 集成 Vue 3 和 TypeScript 特定规则
 * 3. 配合 Prettier 实现代码格式化
 * 4. 支持 uni-app 跨平台开发的特殊需求
 *
 * 使用方式：
 * - 开发时通过 IDE 插件实时检查
 * - 提交代码时通过 Git hooks 自动检查
 * - 构建时作为代码质量门禁
 *
 * @author weisheng
 * @since 2023-03-14
 * @lastModified 2025-05-06
 */

/**
 * ESLint 配置对象
 * @type {import('eslint').Linter.Config}
 * @description 导出 ESLint 配置，包含环境、解析器、插件和规则等完整配置
 */
module.exports = {
  /**
   * 环境配置
   * @description 定义代码运行环境，启用对应环境的全局变量和预定义变量
   */
  env: {
    /**
     * 浏览器环境
     * @description 启用浏览器全局变量（如 window、document 等）
     * @type {boolean}
     */
    browser: true,

    /**
     * ES2021 环境
     * @description 启用 ES2021 语法的全局变量和内置对象
     * @type {boolean}
     */
    es2021: true
  },

  /**
   * 继承配置
   * @description 继承多个预设配置，按数组顺序应用规则
   */
  extends: [
    /**
     * ESLint 推荐规则
     * @description 继承 ESLint 官方推荐的规则集，包含基础语法检查
     */
    'eslint:recommended',

    /**
     * Vue 3 核心规则
     * @description 继承 Vue 3 插件的核心规则，支持 Vue 3 语法特性
     */
    'plugin:vue/vue3-essential',

    /**
     * TypeScript 推荐规则
     * @description 继承 TypeScript 插件的推荐规则，提供类型检查
     */
    'plugin:@typescript-eslint/recommended',

    /**
     * Prettier 格式化规则
     * @description 继承 Prettier 插件规则，确保 ESLint 与 Prettier 兼容
     */
    'plugin:prettier/recommended'
  ],

  /**
   * 覆盖配置
   * @description 用于特定文件或目录的规则覆盖，当前为空数组
   * @type {Array}
   */
  overrides: [],

  /**
   * 解析器配置
   * @description 指定 ESLint 使用的解析器，用于解析不同类型的代码
   */
  parser: 'vue-eslint-parser',

  /**
   * 解析器选项
   * @description 配置解析器的详细选项，支持 Vue 单文件组件和 TypeScript
   */
  parserOptions: {
    /**
     * TypeScript 解析器
     * @description 指定用于解析 TypeScript 代码的解析器
     * @type {string}
     */
    parser: '@typescript-eslint/parser',

    /**
     * ECMAScript 版本
     * @description 指定支持的 ECMAScript 语法版本
     * @type {number}
     */
    ecmaVersion: 2020
  },

  /**
   * 插件配置
   * @description 启用的 ESLint 插件列表，提供额外的规则和功能
   */
  plugins: [
    /**
     * Vue 插件
     * @description 提供 Vue 特定的 ESLint 规则
     */
    'vue',

    /**
     * TypeScript 插件
     * @description 提供 TypeScript 特定的 ESLint 规则
     */
    '@typescript-eslint'
  ],

  /**
   * 自定义规则配置
   * @description 定义项目特定的 ESLint 规则，覆盖继承配置中的默认规则
   */
  rules: {
    /**
     * 换行符风格
     * @description 强制使用 Unix 换行符（\n），确保跨平台一致性
     * @rule 'linebreak-style'
     * @type {Array<string>}
     * @default ['error', 'unix']
     */
    'linebreak-style': ['error', 'unix'],

    /**
     * 引号风格
     * @description 强制使用单引号，提升代码可读性
     * @rule quotes
     * @type {Array<string>}
     * @default ['error', 'single']
     */
    quotes: ['error', 'single'],

    /**
     * 分号使用
     * @description 禁止使用分号，采用 JavaScript ASI 机制
     * @rule semi
     * @type {Array<string>}
     * @default ['error', 'never']
     */
    semi: ['error', 'never'],

    /**
     * 控制台语句
     * @description 允许使用 console 语句，方便调试和日志输出
     * @rule no-console
     * @type {string}
     * @default 'off'
     */
    'no-console': 'off',

    /**
     * 调试器语句
     * @description 允许使用 debugger 语句，方便开发调试
     * @rule no-debugger
     * @type {string}
     * @default 'off'
     */
    'no-debugger': 'off',

    /**
     * 未定义变量
     * @description 关闭未定义变量检查，由 TypeScript 类型系统处理
     * @rule no-undef
     * @type {string}
     * @default 'off'
     */
    'no-undef': 'off',

    /**
     * TypeScript any 类型
     * @description 允许使用 any 类型，提升开发灵活性
     * @rule @typescript-eslint/no-explicit-any
     * @type {string}
     * @default 'off'
     */
    '@typescript-eslint/no-explicit-any': 'off',

    /**
     * 使用前定义
     * @description 关闭变量使用前必须定义的检查，支持函数提升
     * @rule @typescript-eslint/no-use-before-define
     * @type {string}
     * @default 'off'
     */
    '@typescript-eslint/no-use-before-define': 'off',

    /**
     * 可推断类型
     * @description 关闭可推断类型的检查，允许显式类型声明
     * @rule @typescript-eslint/no-inferrable-types
     * @type {string}
     * @default 'off'
     */
    '@typescript-eslint/no-inferrable-types': 'off',

    /**
     * 未使用变量
     * @description 关闭未使用变量检查，由 TypeScript 编译器处理
     * @rule @typescript-eslint/no-unused-vars
     * @type {string}
     * @default 'off'
     */
    '@typescript-eslint/no-unused-vars': 'off',

    /**
     * 非空断言
     * @description 允许使用非空断言操作符（!），提升开发效率
     * @rule @typescript-eslint/no-non-null-assertion
     * @type {string}
     * @default 'off'
     */
    '@typescript-eslint/no-non-null-assertion': 'off',

    /**
     * require 语句
     * @description 允许使用 require 语句，支持 CommonJS 模块
     * @rule @typescript-eslint/no-var-requires
     * @type {string}
     * @default 'off'
     */
    '@typescript-eslint/no-var-requires': 'off',

    /**
     * 命名空间
     * @description 允许使用 TypeScript 命名空间
     * @rule @typescript-eslint/no-namespace
     * @type {string}
     * @default 'off'
     */
    '@typescript-eslint/no-namespace': 'off',

    /**
     * 内部声明
     * @description 允许在块级作用域内声明函数，支持函数提升
     * @rule no-inner-declarations
     * @type {string}
     * @default 'off'
     */
    'no-inner-declarations': 'off',

    /**
     * this 别名
     * @description 允许使用 this 别名，支持常见模式如 const self = this
     * @rule @typescript-eslint/no-this-alias
     * @type {string}
     * @default 'off'
     */
    '@typescript-eslint/no-this-alias': 'off',

    /**
     * 空函数
     * @description 允许使用空函数，支持接口实现和占位符函数
     * @rule @typescript-eslint/no-empty-function
     * @type {string}
     * @default 'off'
     */
    '@typescript-eslint/no-empty-function': 'off',

    /**
     * Vue 多词组件名
     * @description 关闭 Vue 组件必须使用多词命名的检查，允许单组件名
     * @rule vue/multi-word-component-names
     * @type {string}
     * @default 'off'
     */
    'vue/multi-word-component-names': 'off',

    /**
     * 一致的类型导入
     * @description 强制使用内联类型导入语法，提升代码可读性和性能
     * @rule @typescript-eslint/consistent-type-imports
     * @type {Array}
     * @default ['error', {...}]
     */
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        /**
         * 偏好类型导入
         * @description 优先使用 type-only 导入语法
         * @type {string}
         */
        prefer: 'type-imports',

        /**
         * 禁止类型注解
         * @description 允许在类型注解中使用导入
         * @type {boolean}
         */
        disallowTypeAnnotations: false,

        /**
         * 修复样式
         * @description 使用内联类型导入语法（import type）
         * @type {string}
         */
        fixStyle: 'inline-type-imports'
      }
    ]
  }
}
