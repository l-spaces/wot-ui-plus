/**
 * Canvas上下文适配器工具模块
 *
 * 该模块实现了适配器模式，用于将Web标准的CanvasRenderingContext2D接口适配为uni-app平台的CanvasContext接口。
 * 在uni-app多端开发环境中，不同平台的Canvas API存在差异，此适配器解决了API不一致的问题，
 * 使得在H5、小程序和App等多端环境下能够统一使用Canvas绘图功能。
 *
 * 主要应用场景：
 * - 图表组件开发（如折线图、柱状图、饼图等）
 * - 签名画板功能实现
 * - 动态图形渲染
 * - 图像处理与滤镜效果
 * - 自定义绘图组件
 */

/**
 * Canvas 2D上下文适配器函数
 *
 * 将Web标准的CanvasRenderingContext2D接口适配为uni-app的CanvasContext接口。
 * 通过添加setter方法并保留原有属性访问方式，实现API的桥接转换。
 *
 * @param ctx Web标准的CanvasRenderingContext2D上下文对象
 * @returns 适配后的UniApp.CanvasContext对象，可在uni-app各平台使用
 *
 * @example
 * // 在Web环境获取canvas上下文并适配
 * const canvas = document.createElement('canvas');
 * const ctx = canvas.getContext('2d');
 * const uniCtx = canvas2dAdapter(ctx);
 *
 * // 适配后可使用uni-app风格的API
 * uniCtx.setFillStyle('#ff0000');
 * uniCtx.fillRect(0, 0, 100, 100);
 */
export function canvas2dAdapter(ctx: CanvasRenderingContext2D): UniApp.CanvasContext {
  // 使用Object.assign将uni-app风格的方法混入到原始ctx对象中
  // 保留原有属性访问方式的同时，添加方法形式的API
  return Object.assign(ctx, {
    /**
     * 设置填充颜色
     * 对应Web Canvas的ctx.fillStyle属性
     * @param color 颜色值或渐变对象
     */
    setFillStyle(color: string | CanvasGradient) {
      ctx.fillStyle = color
    },

    /**
     * 设置描边颜色
     * 对应Web Canvas的ctx.strokeStyle属性
     * @param color 颜色值、渐变对象或图案对象
     */
    setStrokeStyle(color: string | CanvasGradient | CanvasPattern) {
      ctx.strokeStyle = color
    },

    /**
     * 设置线条宽度
     * 对应Web Canvas的ctx.lineWidth属性
     * @param lineWidth 线条宽度
     */
    setLineWidth(lineWidth: number) {
      ctx.lineWidth = lineWidth
    },

    /**
     * 设置线条端点样式
     * 对应Web Canvas的ctx.lineCap属性
     * @param lineCap 线条端点样式：butt(平头)、round(圆头)、square(方头)
     */
    setLineCap(lineCap: 'butt' | 'round' | 'square') {
      ctx.lineCap = lineCap
    },

    /**
     * 设置字体样式
     * 对应Web Canvas的ctx.font属性
     * @param font 字体样式字符串
     */
    setFontSize(font: string) {
      ctx.font = font
    },

    /**
     * 设置全局透明度
     * 对应Web Canvas的ctx.globalAlpha属性
     * @param alpha 透明度值，0-1之间
     */
    setGlobalAlpha(alpha: number) {
      ctx.globalAlpha = alpha
    },

    /**
     * 设置线条交点样式
     * 对应Web Canvas的ctx.lineJoin属性
     * @param lineJoin 线条交点样式：bevel(斜角)、round(圆角)、miter(尖角)
     */
    setLineJoin(lineJoin: 'bevel' | 'round' | 'miter') {
      ctx.lineJoin = lineJoin
    },

    /**
     * 设置文本对齐方式
     * 对应Web Canvas的ctx.textAlign属性
     * @param align 文本对齐方式：left(左对齐)、center(居中)、right(右对齐)
     */
    setTextAlign(align: 'left' | 'center' | 'right') {
      ctx.textAlign = align
    },

    /**
     * 设置斜接长度限制
     * 对应Web Canvas的ctx.miterLimit属性
     * @param miterLimit 斜接长度限制值
     */
    setMiterLimit(miterLimit: number) {
      ctx.miterLimit = miterLimit
    },

    /**
     * 设置阴影效果
     * 对应Web Canvas的多个shadow相关属性
     * @param offsetX 水平阴影偏移
     * @param offsetY 垂直阴影偏移
     * @param blur 阴影模糊程度
     * @param color 阴影颜色
     */
    setShadow(offsetX: number, offsetY: number, blur: number, color: string) {
      ctx.shadowOffsetX = offsetX
      ctx.shadowOffsetY = offsetY
      ctx.shadowBlur = blur
      ctx.shadowColor = color
    },

    /**
     * 设置文本基线
     * 对应Web Canvas的ctx.textBaseline属性
     * @param textBaseline 文本基线位置：top(顶部)、bottom(底部)、middle(中间)
     */
    setTextBaseline(textBaseline: 'top' | 'bottom' | 'middle') {
      ctx.textBaseline = textBaseline
    },

    /**
     * 创建环形渐变
     * uni-app特有的方法，在此处提供空实现以保证接口一致性
     * 在实际使用时可能需要根据平台进行具体实现
     */
    createCircularGradient() {},

    /**
     * 绘制到画布
     * uni-app特有的方法，Web Canvas中不需要此步骤
     * 提供空实现以保证接口一致性
     */
    draw() {},

    /**
     * 添加颜色停止点
     * 配合渐变使用的方法，提供空实现以保证接口一致性
     * 在实际使用时可能需要根据平台进行具体实现
     */
    addColorStop() {}
  }) as unknown as UniApp.CanvasContext
}
