/**
 * @file ConfigProvider 类型定义文件
 * @description 此文件定义了 wot-ui-plus 组件库中 ConfigProvider 组件的所有类型定义，是整个主题系统的核心基础
 *
 * 核心功能与定位：
 * 1. 定义组件库的主题模式（浅色/深色）类型
 * 2. 提供组件属性定义和类型提取
 * 3. 构建完整的主题变量系统，包括基础变量和各组件专用变量
 * 4. 实现组件库主题定制的类型支持
 *
 * 设计思路：
 * - 采用 TypeScript 交叉类型（&）组合多个主题变量类型，实现灵活的主题定制
 * - 所有主题变量均为可选属性（?），允许用户按需覆盖默认主题
 * - 分离基础主题变量和组件专用变量，便于维护和扩展
 *
 * 主要对外暴露接口：
 * - ConfigProviderTheme: 主题模式类型
 * - configProviderProps: 组件属性配置对象
 * - ConfigProviderProps: 组件属性类型
 * - ConfigProviderThemeVars: 完整主题变量类型
 * - 各组件的 themeVars 类型（如 baseThemeVars, buttonThemeVars 等）
 *
 * 使用注意事项：
 * - 自定义主题变量时，建议只覆盖需要修改的部分，其余使用默认值
 * - 深色模式下，组件会自动应用 darkBackground 和 darkColor 系列变量
 * - 主题变量支持 CSS 变量格式，如 '#1989fa' 或 'rgba(25, 137, 250, 0.8)'
 *
 * @author wot-ui-plus 团队
 * @since 1.0.0
 * @see ConfigProvider 组件文档
 */

import type { ExtractPropTypes, PropType } from 'vue'
import { makeStringProp, baseProps } from '../common/props'

/**
 * @type ConfigProviderTheme
 * @description 主题模式类型定义
 * 支持 'light'（浅色模式）和 'dark'（深色模式）两种主题模式
 * 组件库根据此类型自动切换对应主题的样式变量
 *
 * 设计意图：
 * 提供类型安全的主题模式切换，通过类型约束确保主题值的有效性
 * 为组件库的明暗主题切换提供基础类型支持
 *
 * 使用场景：
 * - 应用全局主题模式设置
 * - 组件内部根据主题模式应用不同样式
 * - 深色模式与浅色模式间的切换逻辑
 */
export type ConfigProviderTheme = 'light' | 'dark'

/**
 * @constant configProviderProps
 * @description ConfigProvider 组件的属性定义对象
 * 用于配置组件库的全局主题和样式变量
 *
 * 设计意图：
 * - 提供统一的主题配置入口
 * - 支持全局样式变量的注入与覆盖
 * - 实现主题模式的统一管理
 *
 * 核心功能：
 * - theme: 控制组件库的明暗主题模式
 * - themeVars: 提供完整的主题变量定制能力
 *
 * 使用说明：
 * 此对象使用 Vue 的 props 定义方式，包含属性类型、默认值和详细注释
 * 通过解构 baseProps 继承通用属性，保证组件 API 的一致性
 */
export const configProviderProps = {
  ...baseProps,
  /**
   * 主题风格，设置为 dark 来开启深色模式，全局生效
   */
  theme: makeStringProp<ConfigProviderTheme>('light'),
  /**
   * 自定义主题变量
   * @description 通过传入 themeVars 对象可以覆盖默认的主题变量，实现自定义主题
   * @type {ConfigProviderThemeVars}
   * @default {}
   */
  themeVars: {
    type: Object as PropType<ConfigProviderThemeVars>,
    default: () => ({})
  }
}

/**
 * @type ConfigProviderProps
 * @description ConfigProvider 组件的属性类型
 * 使用 TypeScript 的 ExtractPropTypes 工具从 props 定义中提取
 * 提供完整的类型支持和代码提示
 *
 * 设计优势：
 * - 类型自动推导，减少手动维护类型的工作量
 * - 运行时验证与 TypeScript 类型系统的完美结合
 * - 确保使用组件时的类型安全
 */
export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>

/**
 * @type baseThemeVars
 * @description 基础主题变量接口，定义组件库的全局基础样式变量
 *
 * 核心地位：
 * - 作为整个主题系统的基础，所有组件主题变量都基于此扩展
 * - 提供统一的设计语言和样式体系
 * - 支持浅色/深色两套主题变量
 *
 * 变量分类：
 * 1. 颜色系统（color*, font*）：包含主题色、状态色、文字色、边框色、背景色等
 * 2. 字号系统（fs*）：定义不同级别的字体大小
 * 3. 字重系统（fw*）：定义不同级别的字重
 * 4. 深色模式变量（dark*）：深色模式下的对应颜色和背景变量
 * 5. 尺寸系统（size*）：定义通用尺寸和间距
 * 6. 图标颜色系统（colorIcon*）：定义图标的各种状态颜色
 *
 * 使用说明：
 * - 这些变量会被注入到全局样式中，可在所有组件中使用
 * - 自定义主题时，修改这些变量可以统一调整整个组件库的视觉风格
 * - 浅色/深色模式通过 theme 属性切换，自动应用对应前缀的变量
 *
 * 设计思路：
 * - 采用语义化命名，便于理解和使用
 * - 提供从浅到深的梯度变量（如 colorGray1 到 colorGray8）
 * - 所有颜色都有浅色模式和深色模式两套定义
 */
export type baseThemeVars = {
  /** 主题色，组件库的主要品牌颜色 */
  colorTheme?: string
  /** 用于mix的白色 */
  colorWhite?: string
  /** 用于mix的黑色 */
  colorBlack?: string
  /** 成功状态的颜色 */
  colorSuccess?: string
  /** 警告状态的颜色 */
  colorWarning?: string
  /** 危险/错误状态的颜色 */
  colorDanger?: string
  /** 紫色，用于特殊场景 */
  colorPurple?: string
  /** 黄色，用于特殊场景 */
  colorYellow?: string
  /** 蓝色，用于信息提示等场景 */
  colorBlue?: string
  /** 信息状态的颜色 */
  colorInfo?: string
  /** 灰色系列1 - 最浅灰色 */
  colorGray1?: string
  /** 灰色系列2 */
  colorGray2?: string
  /** 灰色系列3 */
  colorGray3?: string
  /** 灰色系列4 */
  colorGray4?: string
  /** 灰色系列5 */
  colorGray5?: string
  /** 灰色系列6 */
  colorGray6?: string
  /** 灰色系列7 */
  colorGray7?: string
  /** 灰色系列8 - 最深灰色 */
  colorGray8?: string
  /** 字体灰色系列1 - 最深 */
  fontGray1?: string
  /** 字体灰色系列2 */
  fontGray2?: string
  /** 字体灰色系列3 */
  fontGray3?: string
  /** 字体灰色系列4 - 最浅 */
  fontGray4?: string
  /** 深色模式下字体白色系列1 - 最亮 */
  fontWhite1?: string
  /** 深色模式下字体白色系列2 */
  fontWhite2?: string
  /** 深色模式下字体白色系列3 */
  fontWhite3?: string
  /** 深色模式下字体白色系列4 - 最暗 */
  fontWhite4?: string
  /** 模块标题/重要正文颜色 */
  colorTitle?: string
  /** 普通正文颜色 */
  colorContent?: string
  /** 次要信息，注释/补充/正文颜色 */
  colorSecondary?: string
  /** 辅助文字字号，弱化信息，引导性/不可点文字颜色 */
  colorAid?: string
  /** 失效、默认提示文字颜色 */
  colorTip?: string
  /** 控件边框线颜色 */
  colorBorder?: string
  /** 分割线颜色 */
  colorBorderLight?: string
  /** 背景色、禁用填充色 */
  colorBg?: string
  /** 深色背景1 - 用于主背景 */
  darkBackground?: string
  /** 深色背景2 */
  darkBackground2?: string
  /** 深色背景3 */
  darkBackground3?: string
  /** 深色背景4 */
  darkBackground4?: string
  /** 深色背景5 */
  darkBackground5?: string
  /** 深色背景6 */
  darkBackground6?: string
  /** 深色背景7 */
  darkBackground7?: string
  /** 深色模式下字体1 - 最亮 */
  darkColor?: string
  /** 深色模式下字体2 */
  darkColor2?: string
  /** 深色模式下字体3 */
  darkColor3?: string
  /** 深色模式下灰色字体 */
  darkColorGray?: string
  /** 深色模式下边框颜色 */
  darkBorderColor?: string
  /** 默认图标颜色 */
  colorIcon?: string
  /** 图标hover/激活状态颜色 */
  colorIconActive?: string
  /** 图标禁用状态颜色 */
  colorIconDisabled?: string
  /** 大型标题字号 */
  fsBig?: string
  /** 重要数据字号 */
  fsImportant?: string
  /** 标题字号/重要正文字号 */
  fsTitle?: string
  /** 普通正文字号 */
  fsContent?: string
  /** 次要信息字号 */
  fsSecondary?: string
  /** 辅助文字字号 */
  fsAid?: string
  /** 字重500 */
  fwMedium?: string
  /** 字重600 */
  fwSemibold?: string
  /** 屏幕两边留白padding */
  sizeSidePadding?: string
}

/**
 * @type actionSheetThemeVars
 * @description ActionSheet 组件的主题变量类型
 * 定义了 ActionSheet 组件的样式变量，如字体大小、颜色、间距等
 */
export type actionSheetThemeVars = {
  actionSheetWeight?: string
  actionSheetRadius?: string
  actionSheetLoadingSize?: string
  actionSheetActionHeight?: string
  actionSheetColor?: string
  actionSheetFs?: string
  actionSheetActiveColor?: string
  actionSheetSubnameFs?: string
  actionSheetSubnameColor?: string
  actionSheetDisabledColor?: string
  actionSheetBg?: string
  actionSheetTitleHeight?: string
  actionSheetTitleFs?: string
  actionSheetCloseFs?: string
  actionSheetCloseColor?: string
  actionSheetCloseTop?: string
  actionSheetCloseRight?: string
  actionSheetCancelColor?: string
  actionSheetCancelHeight?: string
  actionSheetCancelBg?: string
  actionSheetCancelRadius?: string
  actionSheetPanelPadding?: string
  actionSheetPanelImgFs?: string
  actionSheetPanelImgRadius?: string
}

/**
 * @type badgeThemeVars
 * @description Badge 组件的主题变量类型
 * 定义了 Badge 组件的样式变量，如背景色、文字颜色、大小等
 */
export type badgeThemeVars = {
  badgeBg?: string
  badgeColor?: string
  badgeFs?: string
  badgePadding?: string
  badgeHeight?: string
  badgePrimary?: string
  badgeSuccess?: string
  badgeWarning?: string
  badgeDanger?: string
  badgeInfo?: string
  badgeDotSize?: string
  badgeBorder?: string
}

/**
 * @type buttonThemeVars
 * @description Button 组件的主题变量类型
 * 定义了 Button 组件的样式变量，包括不同尺寸、类型按钮的样式
 *
 * 组件主题变量说明：
 * - 组件主题变量是对基础主题变量的补充和扩展
 * - 每种组件都有自己专用的主题变量，用于控制该组件特有的样式
 * - 变量命名遵循 componentTypeProperty 格式，如 buttonPrimaryBgColor
 *
 * Button 组件变量分类：
 * 1. 尺寸变量：不同尺寸按钮的高度、内边距、字体大小等
 * 2. 状态变量：正常、禁用状态的样式
 * 3. 类型变量：不同类型按钮(主按钮、成功按钮、信息按钮等)的样式
 * 4. 图标变量：按钮中图标的样式
 * 5. 效果变量：悬停、阴影等效果样式
 *
 * 使用示例：
 * ```typescript
 * // 自定义按钮主题变量
 * const customThemeVars: ConfigProviderThemeVars = {
 *   // 修改主按钮颜色
 *   buttonPrimaryBgColor: '#07c160',
 *   buttonPrimaryColor: '#ffffff',
 *   // 修改按钮尺寸
 *   buttonLargeHeight: '44px',
 *   buttonLargeFs: '16px'
 * }
 * ```
 *
 * 设计思路：
 * - 提供细粒度的样式控制能力，允许用户精确调整组件外观
 * - 遵循一致的命名规范，便于记忆和使用
 * - 支持不同尺寸和类型的灵活配置
 * - 保持与基础主题变量的风格一致性
 */
export type buttonThemeVars = {
  // 禁用状态透明度
  buttonDisabledOpacity?: string

  // 小型按钮
  buttonSmallHeight?: string
  buttonSmallPadding?: string
  buttonSmallFs?: string
  buttonSmallRadius?: string
  buttonSmallLoading?: string

  // 中型按钮
  buttonMediumHeight?: string
  buttonMediumPadding?: string
  buttonMediumFs?: string
  buttonMediumRadius?: string
  buttonMediumLoading?: string
  buttonMediumBoxShadowSize?: string

  // 大型按钮
  buttonLargeHeight?: string
  buttonLargePadding?: string
  buttonLargeFs?: string
  buttonLargeRadius?: string
  buttonLargeLoading?: string
  buttonLargeBoxShadowSize?: string

  // 按钮图标
  buttonIconFs?: string
  buttonIconSize?: string
  buttonIconColor?: string
  buttonIconDisabledColor?: string

  // 基础状态
  buttonNormalColor?: string
  buttonNormalDisabledColor?: string
  buttonPlainBgColor?: string

  // 不同类型按钮
  buttonPrimaryColor?: string
  buttonPrimaryBgColor?: string
  buttonSuccessColor?: string
  buttonSuccessBgColor?: string
  buttonInfoColor?: string
  buttonInfoBgColor?: string
  buttonInfoPlainBorderColor?: string
  buttonInfoPlainNormalColor?: string
  buttonWarningColor?: string
  buttonWarningBgColor?: string
  buttonErrorColor?: string
  buttonErrorBgColor?: string

  // 交互效果
  buttonTextHoverOpacity?: string
}

/**
 * @type cellThemeVars
 * @description Cell 组件的主题变量类型
 * 定义了 Cell 组件的样式变量，包括单元格的内边距、字体大小、颜色等
 */
export type cellThemeVars = {
  cellPadding?: string
  cellLineHeight?: string
  cellGroupTitleFs?: string
  cellGroupPadding?: string
  cellGroupTitleColor?: string
  cellGroupValueFs?: string
  cellGroupValueColor?: string
  cellWrapperPadding?: string
  cellWrapperPaddingLarge?: string
  cellWrapperPaddingWithLabel?: string
  cellIconRight?: string
  cellIconSize?: string
  cellTitleFs?: string
  cellTitleColor?: string
  cellLabelFs?: string
  cellLabelColor?: string
  cellValueFs?: string
  cellValueFsLarge?: string
  cellValueColor?: string
  cellArrowSize?: string
  cellArrowColor?: string
  cellClearColor?: string
  cellTapBg?: string
  cellTitleFsLarge?: string
  cellLabelFsLarge?: string
  cellIconSizeLarge?: string
  cellRequiredColor?: string
  cellRequiredSize?: string
  cellRequiredMargin?: string
  cellVerticalTop?: string
}

/**
 * @type calendarThemeVars
 * @description Calendar 组件的主题变量类型
 * 定义了 Calendar 组件的样式变量，包括日历面板、日期、星期等样式
 */
export type calendarThemeVars = {
  calendarFs?: string
  calendarPanelPadding?: string
  calendarPanelTitleFs?: string
  calendarPanelTitleColor?: string
  calendarWeekColor?: string
  calendarWeekHeight?: string
  calendarWeekFs?: string
  calendarDayFs?: string
  calendarDayColor?: string
  calendarDayFw?: string
  calendarDayHeight?: string
  calendarMonthWidth?: string
  calendarActiveColor?: string
  calendarSelectedColor?: string
  calendarDisabledColor?: string
  calendarRangeColor?: string
  calendarActiveBorder?: string
  calendarInfoFs?: string
  calendarItemMarginBottom?: string
}

/**
 * @type checkboxThemeVars
 * @description Checkbox 组件的主题变量类型
 * 定义了 Checkbox 组件的样式变量，包括复选框的大小、颜色、边框等
 */
export type checkboxThemeVars = {
  checkboxMargin?: string
  checkboxBg?: string
  checkboxLabelMargin?: string
  checkboxSize?: string
  checkboxIconSize?: string
  checkboxBorderColor?: string
  checkboxCheckColor?: string
  checkboxLabelFs?: string
  checkboxLabelColor?: string
  checkboxCheckedColor?: string
  checkboxDisabledColor?: string
  checkboxDisabledLabelColor?: string
  checkboxDisabledCheckColor?: string
  checkboxDisabledCheckBg?: string
  checkboxSquareRadius?: string
  checkboxLargeSize?: string
  checkboxLargeLabelFs?: string
  checkboxButtonHeight?: string
  checkboxButtonMinWidth?: string
  checkboxButtonRadius?: string
  checkboxButtonBg?: string
  checkboxButtonFontSize?: string
  checkboxButtonBorder?: string
  checkboxButtonDisabledBorder?: string
}

/**
 * @type collapseThemeVars
 * @description Collapse 组件的主题变量类型
 * 定义了 Collapse 组件的样式变量，包括折叠面板的内边距、标题样式等
 */
export type collapseThemeVars = {
  collapseSidePadding?: string
  collapseBodyPadding?: string
  collapseHeaderPadding?: string
  collapseTitleColor?: string
  collapseTitleFs?: string
  collapseArrowSize?: string
  collapseArrowColor?: string
  collapseBodyFs?: string
  collapseBodyColor?: string
  collapseDisabledColor?: string
  collapseRetractFs?: string
  collapseMoreColor?: string
}

/**
 * @type dividerThemeVars
 * @description Divider 组件的主题变量类型
 * 定义了 Divider 组件的样式变量，包括分割线的颜色、间距等
 */
export type dividerThemeVars = {
  dividerPadding?: string
  dividerMargin?: string
  dividerColor?: string
  dividerLineColor?: string
  dividerLineHeight?: string
  dividerFs?: string
  dividerContentLeftWidth?: string
  dividerContentLeftMargin?: string
  dividerContentRightMargin?: string
  dividerContentRightWidth?: string
  dividerVerticalHeight?: string
  dividerVerticalContentMargin?: string
  dividerVerticalLineWidth?: string
}

/**
 * @type dropMenuThemeVars
 * @description DropMenu 组件的主题变量类型
 * 定义了 DropMenu 组件的样式变量，包括下拉菜单的高度、颜色等
 */
export type dropMenuThemeVars = {
  dropMenuHeight?: string
  dropMenuColor?: string
  dropMenuFs?: string
  dropMenuArrowFs?: string
  dropMenuSidePadding?: string
  dropMenuDisabledColor?: string
  dropMenuItemHeight?: string
  dropMenuItemColor?: string
  dropMenuItemFs?: string
  dropMenuItemColorActive?: string
  dropMenuItemColorTip?: string
  dropMenuItemFsTip?: string
  dropMenuOptionCheckSize?: string
  dropMenuLineColor?: string
  dropMenuLineHeight?: string
}

/**
 * @type inputNumberThemeVars
 * @description InputNumber 组件的主题变量类型
 * 定义了 InputNumber 组件的样式变量，包括数字输入框的高度、边框等
 */
export type inputNumberThemeVars = {
  inputNumberColor?: string
  inputNumberBorderColor?: string
  inputNumberDisabledColor?: string
  inputNumberHeight?: string
  inputNumberBtnWidth?: string
  inputNumberInputWidth?: string
  inputNumberRadius?: string
  inputNumberFs?: string
  inputNumberIconSize?: string
  inputNumberIconColor?: string
}

/**
 * @type inputThemeVars
 * @description Input 组件的主题变量类型
 * 定义了 Input 组件的样式变量，包括输入框的内边距、边框、字体等
 */
export type inputThemeVars = {
  inputPadding?: string
  inputBorderColor?: string
  inputNotEmptyBorderColor?: string
  inputFs?: string
  inputFsLarge?: string
  inputIconMargin?: string
  inputColor?: string
  inputPlaceholderColor?: string
  inputDisabledColor?: string
  inputErrorColor?: string
  inputIconColor?: string
  inputClearColor?: string
  inputCountColor?: string
  inputCountCurrentColor?: string
  inputBg?: string
  inputCellBg?: string
  inputCellBorderColor?: string
  inputCellPadding?: string
  inputCellPaddingLarge?: string
  inputCellHeight?: string
  inputCellLabelWidth?: string
  inputInnerHeight?: string
  inputInnerHeightNoBorder?: string
  inputCountFs?: string
  inputCountFsLarge?: string
  inputIconSize?: string
  inputIconSizeLarge?: string
}

/**
 * @type textareaThemeVars
 * @description Textarea 组件的主题变量类型
 * 定义了 Textarea 组件的样式变量，包括文本域的内边距、边框等
 */
export type textareaThemeVars = {
  textareaPadding?: string
  textareaBorderColor?: string
  textareaNotEmptyBorderColor?: string
  textareaFs?: string
  textareaFsLarge?: string
  textareaIconMargin?: string
  textareaColor?: string
  textareaIconColor?: string
  textareaClearColor?: string
  textareaCountColor?: string
  textareaCountCurrentColor?: string
  textareaBg?: string
  textareaCellBorderColor?: string
  textareaCellPadding?: string
  textareaCellPaddingLarge?: string
  textareaCellHeight?: string
  textareaCountFs?: string
  textareaCountFsLarge?: string
  textareaIconSize?: string
  textareaIconSizeLarge?: string
}

/**
 * @type loadmoreThemeVars
 * @description LoadMore 组件的主题变量类型
 * 定义了 LoadMore 组件的样式变量，包括加载提示的颜色、字体等
 */
export type loadmoreThemeVars = {
  loadmoreHeight?: string
  loadmoreColor?: string
  loadmoreFs?: string
  loadmoreErrorColor?: string
  loadmoreRefreshFs?: string
  loadmoreLoadingSize?: string
}

/**
 * @type messageBoxThemeVars
 * @description MessageBox 组件的主题变量类型
 * 定义了 MessageBox 组件的样式变量，包括对话框的宽度、背景、边框等
 */
export type messageBoxThemeVars = {
  messageBoxWidth?: string
  messageBoxBg?: string
  messageBoxRadius?: string
  messageBoxPadding?: string
  messageBoxTitleFs?: string
  messageBoxTitleColor?: string
  messageBoxContentFs?: string
  messageBoxContentColor?: string
  messageBoxContentMaxHeight?: string
  messageBoxContentScrollbarWidth?: string
  messageBoxContentScrollbarColor?: string
  messageBoxInputErrorColor?: string
}

/**
 * @type noticeBarThemeVars
 * @description NoticeBar 组件的主题变量类型
 * 定义了 NoticeBar 组件的样式变量，包括通知栏的背景、颜色等
 */
export type noticeBarThemeVars = {
  noticeBarFs?: string
  noticeBarLineHeight?: string
  noticeBarBorderRadius?: string
  noticeBarPadding?: string
  noticeBarWarningBg?: string
  noticeBarInfoBg?: string
  noticeBarDangerBg?: string
  noticeBarWarningColor?: string
  noticeBarInfoColor?: string
  noticeBarDangerColor?: string
  noticeBarPrefixSize?: string
  noticeBarCloseBg?: string
  noticeBarCloseSize?: string
  noticeBarCloseColor?: string
  noticeBarWrapPadding?: string
}

export type paginationThemeVars = {
  paginationContentPadding?: string
  paginationMessagePadding?: string
  paginationMessageFs?: string
  paginationMessageColor?: string
  paginationNavBorder?: string
  paginationNavBorderRadius?: string
  paginationNavFs?: string
  paginationNavWidth?: string
  paginationNavColor?: string
  paginationNavContentFs?: string
  paginationNavSepatatorPadding?: string
  paginationNavCurrentColor?: string
  paginationIconSize?: string
}

export type pickerThemeVars = {
  pickerToolbarHeight?: string
  pickerActionHeight?: string
  pickerToolbarFinishColor?: string
  pickerToolbarCancelColor?: string
  pickerToolbarFs?: string
  pickerToolbarTitleColor?: string
  pickerColumnFs?: string
  pickerBg?: string
  pickerColumnActiveFs?: string
  pickerColumnColor?: string
  pickerColumnHeight?: string
  pickerColumnItemHeight?: string
  pickerColumnSelectBg?: string
  pickerLoadingButtonColor?: string
  pickerColumnPadding?: string
  pickerColumnDisabledColor?: string
  pickerMask?: string
  pickerLoadingBg?: string
  pickerRegionSeparatorColor?: string
  pickerCellArrowSizeLarge?: string
  pickerRegionColor?: string
  pickerRegionBgActiveColor?: string
  pickerRegionFs?: string
}

export type colPickerThemeVars = {
  colPickerSelectedHeight?: string
  colPickerSelectedPadding?: string
  colPickerSelectedFs?: string
  colPickerSelectedColor?: string
  colPickerSelectedFw?: string
  colPickerLineWidth?: string
  colPickerLineHeight?: string
  colPickerLineColor?: string
  colPickerLineBoxShadow?: string
  colPickerListHeight?: string
  colPickerListPaddingBottom?: string
  colPickerListColor?: string
  colPickerListColorDisabled?: string
  colPickerListColorTip?: string
  colPickerListFs?: string
  colPickerListFsTip?: string
  colPickerListItemPadding?: string
  colPickerListCheckedIconSize?: string
  colPickerListColorChecked?: string
}

export type overlayThemeVars = {
  overlayBg?: string
  overlayBgDark?: string
}

export type popupThemeVars = {
  popupCloseSize?: string
  popupCloseColor?: string
}

export type progressThemeVars = {
  progressPadding?: string
  progressBg?: string
  progressDangerColor?: string
  progressSuccessColor?: string
  progressWarningColor?: string
  progressColor?: string
  progressHeight?: string
  progressLabelColor?: string
  progressLabelFs?: string
  progressIconFs?: string
}

export type radioThemeVars = {
  radioMargin?: string
  radioLabelMargin?: string
  radioSize?: string
  radioBg?: string
  radioLabelFs?: string
  radioLabelColor?: string
  radioCheckedColor?: string
  radioDisabledColor?: string
  radioDisabledLabelColor?: string
  radioLargeSize?: string
  radioLargeLabelFs?: string
  radioButtonHeight?: string
  radioButtonMinWidth?: string
  radioButtonMaxWidth?: string
  radioButtonRadius?: string
  radioButtonBg?: string
  radioButtonFs?: string
  radioButtonBorder?: string
  radioButtonDisabledBorder?: string
  radioDotSize?: string
  radioDotLargeSize?: string
  radioDotCheckedBg?: string
  radioDotCheckedBorderColor?: string
  radioDotBorderColor?: string
  radioDotDisabledBorder?: string
  radioDotDisabledBg?: string
}

export type searchThemeVars = {
  searchSidePadding?: string
  searchPadding?: string
  searchInputRadius?: string
  searchInputBg?: string
  searchInputHeight?: string
  searchInputPadding?: string
  searchInputFs?: string
  searchInputColor?: string
  searchIconColor?: string
  searchIconSize?: string
  searchClearIconSize?: string
  searchPlaceholderColor?: string
  searchCancelPadding?: string
  searchCancelFs?: string
  searchCancelColor?: string
  searchLightBg?: string
}

export type sliderThemeVars = {
  sliderFs?: string
  sliderHandleRadius?: string
  sliderHandleBg?: string
  sliderAxieHeight?: string
  sliderColor?: string
  sliderAxieBg?: string
  sliderLineColor?: string
  sliderDisabledColor?: string
}

export type sortButtonThemeVars = {
  sortButtonFs?: string
  sortButtonColor?: string
  sortButtonHeight?: string
  sortButtonLineHeight?: string
  sortButtonLineColor?: string
}

export type stepsThemeVars = {
  stepsIconSize?: string
  stepsInactiveColor?: string
  stepsFinishedColor?: string
  stepsIconTextFs?: string
  stepsErrorColor?: string
  stepsTitleFs?: string
  stepsTitleFw?: string
  stepsLabelFs?: string
  stepsDescriptionColor?: string
  stepsIsIconWidth?: string
  stepsLineColor?: string
  stepsDotSize?: string
  stepsDotActiveSize?: string
}

export type switchThemeVars = {
  switchSize?: string
  switchWidth?: string
  switchHeight?: string
  switchCircleSize?: string
  switchBorderColor?: string
  switchActiveColor?: string
  switchActiveShadowColor?: string
  switchInactiveColor?: string
  switchInactiveShadowColor?: string
}

export type tabsThemeVars = {
  tabsNavArrowFs?: string
  tabsNavArrowOpenFs?: string
  tabsNavWidth?: string
  tabsNavHeight?: string
  tabsNavFs?: string
  tabsNavColor?: string
  tabsNavBg?: string
  tabsNavActiveColor?: string
  tabsNavDisabledColor?: string
  tabsNavLineHeight?: string
  tabsNavLineWidth?: string
  tabsNavLineBgColor?: string
  tabsNavMapFs?: string
  tabsNavMapColor?: string
  tabsNavMapArrowColor?: string
  tabsNavMapBtnBeforeBg?: string
  tabsNavMapButtonBackColor?: string
  tabsNavMapButtonRadius?: string
  tabsNavMapModalBg?: string
}

export type tagThemeVars = {
  tagFs?: string
  tagColor?: string
  tagSmallFs?: string
  tagInfoColor?: string
  tagPrimaryColor?: string
  tagDangerColor?: string
  tagWarningColor?: string
  tagSuccessColor?: string
  tagInfoBg?: string
  tagPrimaryBg?: string
  tagDangerBg?: string
  tagWarningBg?: string
  tagSuccessBg?: string
  tagRoundColor?: string
  tagRoundBorderColor?: string
  tagRoundRadius?: string
  tagMarkRadius?: string
  tagCloseSize?: string
  tagCloseColor?: string
  tagCloseActiveColor?: string
}

export type toastThemeVars = {
  toastColor?: string
  toastPadding?: string
  toastMaxWidth?: string
  toastRadius?: string
  toastBg?: string
  toastFs?: string
  toastLineHeight?: string
  toastWithIconMinWidth?: string
  toastIconSize?: string
  toastIconMarginRight?: string
  toastIconMarginBottom?: string
  toastLoadingPadding?: string
  toastLoadingMarginBottom?: string
  toastBoxShadow?: string
}

export type loadingThemeVars = {
  loadingSize?: string
}

export type tooltipThemeVars = {
  tooltipBg?: string
  tooltipColor?: string
  tooltipRadius?: string
  tooltipArrowSize?: string
  tooltipFs?: string
  tooltipBlur?: string
  tooltipPadding?: string
  tooltipCloseSize?: string
  tooltipZIndex?: string
  tooltipLineHeight?: string
}

export type popoverThemeVars = {
  popoverBg?: string
  popoverColor?: string
  popoverBoxShadow?: string
  popoverArrowBoxShadow?: string
  popoverBorderColor?: string
  popoverRadius?: string
  popoverArrowSize?: string
  popoverFs?: string
  popoverPadding?: string
  popoverLineHeight?: string
  popoverZIndex?: string
}

export type gridItemThemeVars = {
  gridItemFs?: string
  gridItemBg?: string
  gridItemPadding?: string
  gridItemBorderColor?: string
  gridItemHoverBg?: string
  gridItemHoverBgDark?: string
}

export type statustipThemeVars = {
  statustipFs?: string
  statustipColor?: string
  statustipLineHeight?: string
  statustipPadding?: string
}

export type cardThemeVars = {
  cardBg?: string
  cardFs?: string
  cardPadding?: string
  cardFooterPadding?: string
  cardShadowColor?: string
  cardRadius?: string
  cardLineHeight?: string
  cardMargin?: string
  cardTitleColor?: string
  cardTitleFs?: string
  cardContentBorderColor?: string
  cardRectangleTitlePadding?: string
  cardRectangleContentPadding?: string
  cardRectangleFooterPadding?: string
  cardContentColor?: string
  cardContentLineHeight?: string
  cardContentMargin?: string
  cardContentRectangleMargin?: string
}

export type uploadThemeVars = {
  uploadSize?: string
  uploadEvokeIconSize?: string
  uploadEvokeBg?: string
  uploadEvokeColor?: string
  uploadEvokeDisabledColor?: string
  uploadCloseIconSize?: string
  uploadCloseIconColor?: string
  uploadProgressFs?: string
  uploadFileFs?: string
  uploadFileColor?: string
  uploadPreviewNameFs?: string
  uploadPreviewIconSize?: string
  uploadPreviewNameBg?: string
  uploadPreviewNameHeight?: string
  uploadCoverIconSize?: string
}

export type curtainThemeVars = {
  curtainContentRadius?: string
  curtainContentCloseColor?: string
  curtainContentCloseFs?: string
}

export type notifyThemeVars = {
  notifyTextColor?: string
  notifyPadding?: string
  notifyFontSize?: string
  notifyLineHeight?: string
  notifyPrimaryBackground?: string
  notifySuccessBackground?: string
  notifyDangerBackground?: string
  notifyWarningBackground?: string
}

export type skeletonThemeVars = {
  skeletonBackgroundColor?: string
  skeletonAnimationGradient?: string
  skeletonAnimationFlashed?: string
  skeletonTextHeightDefault?: string
  skeletonRectHeightDefault?: string
  skeletonCircleHeightDefault?: string
  skeletonRowMarginBottom?: string
  skeletonBorderRadiusText?: string
  skeletonBorderRadiusRect?: string
  skeletonBorderRadiusCircle?: string
}

export type circleThemeVars = {
  circleTextColor?: string
}

export type swiperThemeVars = {
  swiperRadius?: string
  swiperItemPadding?: string
  swiperItemTextColor?: string
  swiperItemTextFs?: string
}

export type swiperNavThemeVars = {
  swiperNavDotColor?: string
  swiperNavDotActiveColor?: string
  swiperNavDotSize?: string
  swiperNavDotsBarActiveWidth?: string
  swiperNavFractionColor?: string
  swiperNavFractionBgColor?: string
  swiperNavFractionHeight?: string
  swiperNavFractionFontSize?: string
  swiperNavBtnColor?: string
  swiperNavBtnBgColor?: string
  swiperNavBtnSize?: string
}

export type segmentedThemeVars = {
  segmentedPadding?: string
  segmentedItemBgColor?: string
  segmentedItemColor?: string
  segmentedItemAcitveBg?: string
  segmentedItemDisabledColor?: string
}

export type tabbarThemeVars = {
  tabbarHeight?: string
  tabbarBoxShadow?: string
}

export type tabbarItemThemeVars = {
  tabbarItemTitleFontSize?: string
  tabbarItemTitleLineHeight?: string
  tabbarInactiveColor?: string
  tabbarActiveColor?: string
  tabbarItemIconSize?: string
}

export type navbarThemeVars = {
  navbarHeight?: string
  navbarColor?: string
  navbarBackground?: string
  navbarArrowSize?: string
  navbarDescFontSize?: string
  navbarDescFontColor?: string
  navbarTitleFontSize?: string
  navbarTitleFontWeight?: string
  navbarDisabledOpacity?: string
  navbarHoverColor?: string
}

export type navbarCapsuleThemeVars = {
  navbarCapsuleBorderColor?: string
  navbarCapsuleBorderRadius?: string
  navbarCapsuleWidth?: string
  navbarCapsuleHeight?: string
  navbarCapsuleIconSize?: string
}

export type tableThemeVars = {
  tableColor?: string
  tableBg?: string
  tableStripeBg?: string
  tableBorderColor?: string
  tableFontSize?: string
}

export type sidebarThemeVars = {
  sidebarBg?: string
  sidebarWidth?: string
  sidebarHeight?: string
}

export type sidebarItemThemeVars = {
  sidebarColor?: string
  sidebarItemHeight?: string
  sidebarItemLineHeight?: string
  sidebarDisabledColor?: string
  sidebarActiveColor?: string
  sidebarActiveBg?: string
  sidebarHoverBg?: string
  sidebarBorderRadius?: string
  sidebarFontSize?: string
  sidebarIconSize?: string
  sidebarActiveBorderWidth?: string
  sidebarActiveBorderHeight?: string
}

export type fabThemeVars = {
  fabTriggerHeight?: string
  fabTriggerWidth?: string
  fabActionsPadding?: string
  fabIconFs?: string
}

export type countDownThemeVars = {
  countDownTextColor?: string
  countDownFontSize?: string
  countDownLineHeight?: string
}

export type keyboardThemeVars = {
  keyboardKeyHeight?: string
  keyboardKeyFontSize?: string
  keyboardKeyBackground?: string
  keyboardKeyBorderRadius?: string
  keyboardDeleteFontSize?: string
  keyboardKeyActiveColor?: string
  keyboardButtonTextColor?: string
  keyboardButtonBackground?: string
  keyboardButtonActiveOpacity?: string
  keyboardBackground?: string
  keyboardTitleHeight?: string
  keyboardTitleColor?: string
  keyboardTitleFontSize?: string
  keyboardClosePadding?: string
  keyboardCloseColor?: string
  keyboardCloseFontSize?: string
  keyboardIconSize?: string
}

export type numberKeyboardThemeVars = {
  numberKeyboardKeyHeight?: string
  numberKeyboardKeyFontSize?: string
  numberKeyboardKeyBackground?: string
  numberKeyboardKeyBorderRadius?: string
  numberKeyboardDeleteFontSize?: string
  numberKeyboardKeyActiveColor?: string
  numberKeyboardButtonTextColor?: string
  numberKeyboardButtonBackground?: string
  numberKeyboardButtonActiveOpacity?: string
  numberKeyboardBackground?: string
  numberKeyboardTitleHeight?: string
  numberKeyboardTitleColor?: string
  numberKeyboardTitleFontSize?: string
  numberKeyboardClosePadding?: string
  numberKeyboardCloseColor?: string
  numberKeyboardCloseFontSize?: string
  numberKeyboardIconSize?: string
}

export type passwodInputThemeVars = {
  passwordInputHeight?: string
  passwordInputMargin?: string
  passwordInputFontSize?: string
  passwordInputRadius?: string
  passwordInputBackground?: string
  passwordInputInfoColor?: string
  passwordInputInfoFontSize?: string
  passwordInputBorderColor?: string
  passwordInputErrorInfoColor?: string
  passwordInputDotSize?: string
  passwordInputDotColor?: string
  passwordInputTextColor?: string
  passwordInputCursorColor?: string
  passwordInputCursorWidth?: string
  passwordInputCursorHeight?: string
  passwordInputCursorDuration?: string
}

export type formItemThemeVars = {
  formItemErrorMessageColor?: string
  formItemErrorMessageFontSize?: string
  formItemErrorMessageLineHeight?: string
}

export type backtopThemeVars = {
  backtopBg?: string
  backtopIconSize?: string
}

export type indexBarThemeVars = {
  indexBarIndexFontSize?: string
}

export type textThemeVars = {
  textInfoColor?: string
  textPrimaryColor?: string
  textErrorColor?: string
  textWarningColor?: string
  textSuccessColor?: string
}

export type videoPreviewThemeVars = {
  videoPreviewBg?: string
  videoPreviewCloseColor?: string
  videoPreviewCloseFontSize?: string
}

export type imgCropperThemeVars = {
  imgCropperIconSize?: string
  imgCropperIconColor?: string
}

export type floatingPanelThemeVars = {
  floatingPanelBg?: string
  floatingPanelRadius?: string
  floatingPanelZIndex?: string
  floatingPanelHeaderHeight?: string
  floatingPanelBarWidth?: string
  floatingPanelBarHeight?: string
  floatingPanelBarBg?: string
  floatingPanelBarRadius?: string
  floatingPanelContentBg?: string
}

export type signatureThemeVars = {
  signatureBg?: string
  signatureRadius?: string
  signatureBorder?: string
  signatureFooterMarginTop?: string
  signatureButtonMarginLeft?: string
}

/**
 * @type ConfigProviderThemeVars
 * @description ConfigProvider 组件支持的完整主题变量类型
 *
 * 技术实现说明：
 * - 通过 TypeScript 交叉类型（&）将基础主题变量和所有组件的主题变量组合成一个完整的主题系统
 * - 包含 60+ 组件的主题变量，实现全组件库的样式定制能力
 * - 采用可选属性设计，允许用户只覆盖需要修改的部分
 *
 * 核心作用：
 * - 这是 wot-ui-plus 组件库主题定制的核心类型
 * - 用户可以通过传入这个类型的对象来自定义整个组件库的样式
 * - 支持全局主题变量覆盖和特定组件主题变量覆盖
 *
 * 使用示例：
 * ```typescript
 * // 自定义主题变量示例
 * const customThemeVars: ConfigProviderThemeVars = {
 *   // 全局主题色
 *   colorTheme: '#1989fa',
 *   // 成功状态颜色
 *   colorSuccess: '#07c160',
 *   // Button 组件特定样式
 *   buttonPrimaryBgColor: '#1989fa',
 *   buttonPrimaryColor: '#ffffff',
 *   // 深色模式下的背景色
 *   darkBackground: '#1a1a1a',
 *   darkColor: '#ffffff'
 * }
 *
 * // 在 ConfigProvider 中使用
 * <wd-config-provider :theme-vars="customThemeVars">
 *   <App />
 * </wd-config-provider>
 * ```
 *
 * 设计优势：
 * 1. 类型安全：完整的 TypeScript 类型支持，提供代码提示和类型检查
 * 2. 可扩展性：新增组件只需定义相应的 themeVars 类型并添加到交叉类型中
 * 3. 模块化：基础变量和组件专用变量分离，便于维护
 * 4. 灵活性：支持全局覆盖和组件级覆盖
 */
export type ConfigProviderThemeVars = baseThemeVars &
  actionSheetThemeVars &
  badgeThemeVars &
  buttonThemeVars &
  cellThemeVars &
  calendarThemeVars &
  checkboxThemeVars &
  collapseThemeVars &
  dividerThemeVars &
  dropMenuThemeVars &
  inputNumberThemeVars &
  inputThemeVars &
  textareaThemeVars &
  loadmoreThemeVars &
  messageBoxThemeVars &
  noticeBarThemeVars &
  paginationThemeVars &
  pickerThemeVars &
  colPickerThemeVars &
  overlayThemeVars &
  popupThemeVars &
  progressThemeVars &
  radioThemeVars &
  searchThemeVars &
  sliderThemeVars &
  sortButtonThemeVars &
  stepsThemeVars &
  switchThemeVars &
  tabsThemeVars &
  tagThemeVars &
  toastThemeVars &
  loadingThemeVars &
  tooltipThemeVars &
  popoverThemeVars &
  gridItemThemeVars &
  statustipThemeVars &
  cardThemeVars &
  uploadThemeVars &
  curtainThemeVars &
  notifyThemeVars &
  skeletonThemeVars &
  circleThemeVars &
  swiperThemeVars &
  swiperNavThemeVars &
  segmentedThemeVars &
  tabbarThemeVars &
  tabbarItemThemeVars &
  navbarThemeVars &
  navbarCapsuleThemeVars &
  tableThemeVars &
  sidebarThemeVars &
  sidebarItemThemeVars &
  fabThemeVars &
  countDownThemeVars &
  keyboardThemeVars &
  numberKeyboardThemeVars &
  passwodInputThemeVars &
  formItemThemeVars &
  backtopThemeVars &
  indexBarThemeVars &
  textThemeVars &
  videoPreviewThemeVars &
  imgCropperThemeVars &
  floatingPanelThemeVars &
  signatureThemeVars
