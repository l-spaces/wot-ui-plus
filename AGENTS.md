# Repository Guidelines

## Project Structure & Module Organization
本仓库是基于 uni-app、Vue 3 和 TypeScript 的组件库项目。
- `src/`：应用源码与示例页面（如 `main.ts`、`App.vue`、`pages/`、`subPages/`、`static/`）。
- `src/uni_modules/wot-ui-plus/components/`：核心组件实现目录（如 `wd-button`、`wd-calendar`）。
- `tests/`：Vitest 测试集，包含 `components/`、`composables/`、`vite-plugins/` 及公共初始化文件。
- `scripts/`：构建、发布与辅助脚本（compiler、changelog、web-types、theme vars 等）。
- `doc/`：项目文档与分析说明。
- `lib/`：发布产物目录，视为构建输出。

## Build, Test, and Development Commands
统一使用 `pnpm`（`preinstall` 已限制）。
- `pnpm dev:h5`：启动 H5 本地开发。
- `pnpm dev:mp-weixin`：启动微信小程序目标环境。
- `pnpm build:h5`：构建 H5 生产包。
- `pnpm test` / `pnpm test:all`：运行默认平台或全平台 Vitest。
- `pnpm coverage`：生成测试覆盖率报告。
- `pnpm type-check`：执行 `vue-tsc --noEmit` 类型检查。
- `pnpm lint`、`pnpm format`：分别执行 ESLint 与 Prettier 修复。

## Coding Style & Naming Conventions
代码风格由 ESLint + Prettier 统一约束。
- 缩进 2 空格，单引号，不使用分号，换行符为 LF。
- 组件代码优先使用 TypeScript 与 Vue SFC。
- 组件目录与测试文件采用 kebab-case，并使用 `wd-` 前缀（例如 `wd-input-number`、`wd-input-number.test.ts`）。
- 类型导入保持显式写法（`import type ...`），满足 `@typescript-eslint/consistent-type-imports` 规则。

## Testing Guidelines
- 测试框架为 Vitest + `@vue/test-utils`，运行环境为 `jsdom`。
- 测试文件命名必须为 `*.test.ts`，并放在 `tests/**` 下。
- 平台化测试命令：`pnpm test:h5`、`pnpm test:mp-weixin`。
- 常规覆盖率阈值为 statements/branches/functions/lines 均 70%，覆盖重点目录为 `src/uni_modules/wot-ui-plus/components/**/*.{vue,ts}`。

## Commit & Pull Request Guidelines
- Commit 信息遵循 Conventional Commits，并由 Husky + commitlint（`commit-msg` 钩子）强制校验。
- 推荐格式：`type(scope): subject`，例如 `feat(button): add loading icon slot`。
- 常用类型包括：`feat`、`fix`、`docs`、`refactor`、`test`、`ci`、`chore`。
- 建议使用 `pnpm commit`（git-cz）生成规范化提交信息并控制长度。
- PR 至少包含：变更摘要、关联 Issue、测试结果（如 `pnpm test`/`pnpm lint`）以及界面改动截图。
