/**
 * commitlint配置文件
 *
 * @description 该配置文件用于定义项目的Git提交信息规范，通过commitlint工具进行提交信息校验，
 *              确保团队成员提交的commit message符合统一标准，便于后续版本管理、自动生成CHANGELOG等工作。
 *
 * @设计思路 采用继承模式，直接使用业界广泛认可的@commitlint/config-conventional作为基础配置，
 *          该配置基于Angular提交信息准则，包含了type、scope、subject、body、footer等结构规范。
 *
 * @主要功能
 * 1. 验证提交信息格式是否符合规范（如feat、fix、docs等类型前缀）
 * 2. 检查提交信息的长度限制
 * 3. 确保提交信息的内容质量和语义化
 *
 * @使用场景
 * 该配置与husky工具配合使用，在.git/hooks/commit-msg钩子中执行，当开发者执行git commit命令时自动触发校验。
 *
 * @使用注意事项
 * 1. 提交信息必须遵循<type>[optional scope]: <description>的格式
 * 2. type可以是feat、fix、docs、style、refactor、test、chore等
 * 3. 提交信息的subject部分应简洁明了，不超过50个字符
 * 4. body部分应对变更进行详细说明，每行不超过72个字符
 * 5. 如需跳过验证，可使用--no-verify参数（不推荐）
 */
module.exports = {
  /**
   * 扩展配置
   *
   * @property {string[]} extends - 继承的配置列表
   * @description 继承自@commitlint/config-conventional，这是一个标准化的提交信息规范配置，
   *              包含了一套完整的验证规则，符合业内最佳实践。
   */
  extends: ['@commitlint/config-conventional']
}
