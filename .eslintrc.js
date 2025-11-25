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
 */

/**
 * ESLint 配置对象
 * @type {import('eslint').Linter.Config}
 * @description 导出 ESLint 配置，包含环境、解析器、插件和规则等完整配置
 */
module.exports = {
  // 环境配置
  env: {
    // 浏览器环境
    browser: true,

    // 启用 ES2021 语法的全局变量和内置对象
    es2021: true
  },

  // 继承配置
  extends: [
    // ESLint 推荐规则  继承 ESLint 官方推荐的规则集，包含基础语法检查
    'eslint:recommended',

    // Vue 3 插件推荐规则  继承 Vue 3 插件的推荐规则，支持 Vue 3 语法特性
    'plugin:vue/recommended',

    //  TypeScript 插件推荐规则  继承 TypeScript 插件的推荐规则，提供类型检查
    'plugin:@typescript-eslint/recommended',

    // Prettier 插件规则  继承 Prettier 插件规则，确保 ESLint 与 Prettier 兼容
    'plugin:prettier/recommended'
  ],

  // 用于特定文件或目录的规则覆盖，当前为空数组
  overrides: [],

  // 指定 ESLint 使用的解析器，用于解析不同类型的代码
  parser: 'vue-eslint-parser',

  // 配置解析器的详细选项，支持 Vue 单文件组件和 TypeScript
  parserOptions: {
    // 指定用于解析 TypeScript 代码的解析器
    parser: '@typescript-eslint/parser',

    // 指定支持的 ECMAScript 语法版本
    ecmaVersion: 2020
  },

  // 启用的 ESLint 插件列表，提供额外的规则和功能
  plugins: [
    // 提供 Vue 特定的 ESLint 规则
    'vue',

    // 提供 TypeScript 特定的 ESLint 规则
    '@typescript-eslint'
  ],

  // 自定义规则配置，定义项目特定的 ESLint 规则，覆盖继承配置中的默认规则
  rules: {
    // 换行符风格
    'linebreak-style': ['error', 'unix'],

    // 引号风格 强制使用单引号，提升代码可读性
    quotes: ['error', 'single'],

    // 分号使用 禁止使用分号，采用 JavaScript ASI 机制
    semi: ['error', 'never'],

    // 控制台语句 允许使用 console 语句，方便调试和日志输出
    'no-console': 'off',

    // 调试器语句 允许使用 debugger 语句，方便开发调试
    'no-debugger': 'off',

    // 未定义变量 关闭未定义变量检查，由 TypeScript 类型系统处理
    'no-undef': 'off',

    // TypeScript any 类型 允许使用 any 类型，提升开发灵活性
    '@typescript-eslint/no-explicit-any': 'off',

    // 使用前定义 关闭变量使用前必须定义的检查，支持函数提升
    '@typescript-eslint/no-use-before-define': 'off',

    // 可推断类型 关闭可推断类型的检查，允许显式类型声明
    '@typescript-eslint/no-inferrable-types': 'off',

    // 未使用变量 关闭未使用变量检查，由 TypeScript 编译器处理
    '@typescript-eslint/no-unused-vars': 'off',

    // 非空断言 允许使用非空断言操作符（!），提升开发效率
    '@typescript-eslint/no-non-null-assertion': 'off',

    // require 语句 允许使用 require 语句，支持 CommonJS 模块
    '@typescript-eslint/no-var-requires': 'off',

    // 命名空间 允许使用 TypeScript 命名空间
    '@typescript-eslint/no-namespace': 'off',

    // 内部声明 允许在块级作用域内声明函数，支持函数提升
    'no-inner-declarations': 'off',

    // this 别名 允许使用 this 别名，支持常见模式如 const self = this
    '@typescript-eslint/no-this-alias': 'off',

    // 空函数 允许使用空函数，支持接口实现和占位符函数
    '@typescript-eslint/no-empty-function': 'off',

    // Vue 多词组件名 关闭 Vue 组件必须使用多词命名的检查，允许单组件名
    'vue/multi-word-component-names': 'off',

    // 组件定义名称大小写 关闭 Vue 组件定义名称必须使用驼峰命名的检查，允许短横线命名
    'vue/component-definition-name-casing': 'off',

    // 组件属性命名风格 关闭 Vue 组件属性命名必须使用短横线命名的检查，允许驼峰命名
    'vue/attribute-hyphenation': 'off',
    
    // 关闭属性顺序检查（允许 v-model 和 required 任意顺序）
    'vue/attributes-order': 'off',

    // 关闭组件内部结构顺序检查（包括 setup 与 template 的顺序要求）
    'vue/order-in-components': 'off',

    // 1. 关闭 ESLint 核心的变量阴影覆盖检查（JavaScript 场景）
    'no-shadow': 'off',

    // 2. 关闭 TypeScript 扩展的变量阴影覆盖检查（TypeScript 场景）
    '@typescript-eslint/no-shadow': 'off',

    // 关闭 Vue 模板变量阴影覆盖检查（允许模板变量与组件实例属性同名）
    'vue/no-template-shadow': 'off',

    // 关闭 v-on 事件名必须连字符（kebab-case）的检查
    'vue/v-on-event-hyphenation': 'off',

    // 一致的类型导入 强制使用内联类型导入语法，提升代码可读性和性能
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports', // 偏好类型导入 优先使用 type-only 导入语法

        disallowTypeAnnotations: false, // 禁止类型注解 允许在类型注解中使用导入

        fixStyle: 'inline-type-imports' // 修复样式 使用内联类型导入语法（import type）
      }
    ],

    // 空对象类型 允许使用空对象类型 {}，支持类型声明中的使用 
    '@typescript-eslint/no-empty-object-type': 'off',

    // 未使用表达式 允许使用表达式语句，支持调试和特殊场景
    '@typescript-eslint/no-unused-expressions': 'off',
    // 关闭 typeof import(...) 的括号格式检查
    '@typescript-eslint/typeof-imports': 'off',
    // 不安全的函数类型 允许使用 Function 类型，支持函数类型声明
    '@typescript-eslint/no-unsafe-function-type': 'off'

  }
}
