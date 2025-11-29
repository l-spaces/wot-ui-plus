# wd-upload 上传组件

## 组件概述

wd-upload 是一个基于 UniApp + Vue 3 + TypeScript 开发的跨平台文件上传组件，支持图片、视频和文件的上传功能。该组件提供了丰富的配置选项，包括上传地址、请求头、文件类型限制、大小限制、上传进度显示、预览功能等，适用于各种需要文件上传的场景，如表单提交、头像上传、图片分享等。

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| fileList | array | [] | 否 | 上传的文件列表,例如:[{name:'food.jpg',url:'https://xxx.cdn.com/xxx.jpg'}] |
| action | string | '' | 是 | 必选参数，上传的地址 |
| header | object | {} | 否 | 设置上传的请求头部 |
| multiple | boolean | false | 否 | 是否支持多选文件 |
| disabled | boolean | false | 否 | 是否禁用 |
| limit | number | - | 否 | 最大允许上传个数 |
| showLimitNum | boolean | true | 否 | 限制上传个数的情况下，是否展示当前上传的个数 |
| maxSize | number | Number.MAX_VALUE | 否 | 文件大小限制，单位为byte |
| sourceType | array | ['album','camera'] | 否 | 选择图片的来源，chooseImage接口详细参数，查看官方手册 |
| sizeType | array | ['original','compressed'] | 否 | 所选的图片的尺寸，chooseImage接口详细参数，查看官方手册 |
| name | string | 'file' | 否 | 文件对应的key，开发者在服务端可以通过这个key获取文件的二进制内容，uploadFile接口详细参数，查看官方手册 |
| formData | object | {} | 否 | HTTP请求中其他额外的formdata，uploadFile接口详细参数，查看官方手册 |
| onPreviewFail | function({index,imgList}) | - | 否 | 预览失败执行操作 |
| beforeUpload | function({files,fileList,resolve}) | - | 否 | 上传文件之前的钩子，参数为上传的文件和文件列表，若返回false或者返回Promise且被reject，则停止上传。 |
| beforeChoose | function({fileList,resolve}) | - | 否 | 选择图片之前的钩子，参数为文件列表，若返回false或者返回Promise且被reject，则停止上传。 |
| beforeRemove | function({file,fileList,resolve}) | - | 否 | 删除文件之前的钩子，参数为要删除的文件和文件列表，若返回false或者返回Promise且被reject，则停止上传。 |
| beforePreview | function({index,imgList,resolve}) | - | 否 | 图片预览前的钩子，参数为预览的图片下标和图片列表，若返回false或者返回Promise且被reject，则停止上传。 |
| buildFormData | function({file,formData,resolve}) | - | 否 | 构建上传formData的钩子，参数为上传的文件、待处理的formData，返回值为处理后的formData，若返回false或者返回Promise且被reject，则停止上传。 |
| loadingType | string | 'ring' | 否 | 加载中图标类型 |
| loadingColor | string | '#ffffff' | 否 | 加载中图标颜色 |
| accept | string | 'image' | 否 | 文件类型，可选值：'image' | 'video' | 'media' | 'all' | 'file' |
| statusKey | string | 'status' | 否 | file 数据结构中，status 对应的 key |
| loadingSize | string | '24px' | 否 | 加载中图标尺寸 |
| compressed | boolean | true | 否 | 是否压缩视频，当 accept 为 video 时生效。 |
| maxDuration | number | 60 | 否 | 拍摄视频最长拍摄时间，当 accept 为 video | media 时生效，单位秒。 |
| camera | string | 'back' | 否 | 使用前置或者后置相机，当 accept 为 video | media 时生效，可选值为：back｜front。 |
| imageMode | string | 'aspectFit' | 否 | 预览图片的mode属性 |
| successStatus | number | 200 | 否 | 接口响应的成功状态（statusCode）值 |
| customEvokeClass | string | '' | 否 | 自定义上传按钮样式 |
| customPreviewClass | string | '' | 否 | 自定义预览图片列表样式 |
| autoUpload | boolean | true | 否 | 是否选择文件后自动上传 |
| reupload | boolean | false | 否 | 点击已上传时是否可以重新上传 |
| uploadMethod | function | - | 否 | 自定义上传文件的请求方法 |
| extension | array | - | 否 | 根据文件拓展名过滤,每一项都不能是空字符串。默认不过滤。 |
| customStyle | string | '' | 否 | 自定义样式 |
| customClass | string | '' | 否 | 自定义类名 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| change | 文件列表变化时触发 | fileList: 当前文件列表 |
| success | 上传成功时触发 | file: 当前上传的文件<br>fileList: 当前文件列表<br>formData: 表单数据 |
| fail | 上传失败时触发 | error: 错误信息<br>file: 当前上传的文件<br>formData: 表单数据 |
| progress | 上传进度变化时触发 | response: 进度信息<br>file: 当前上传的文件 |
| oversize | 文件大小超过限制时触发 | file: 超过大小限制的文件 |
| chooseerror | 选择文件失败时触发 | error: 错误信息 |
| remove | 删除文件时触发 | file: 被删除的文件 |
| update:fileList | 文件列表变化时触发 | fileList: 当前文件列表 |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| submit | - | - | 手动触发上传 |
| abort | task?: UniApp.UploadTask | - | 取消上传 |

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 自定义上传按钮内容 |
| preview-cover | file: 当前文件<br>index: 文件索引 | 自定义预览图片覆盖层内容 |

## 多场景使用示例

### 基础用法

```vue
<template>
  <view class="demo-upload">
    <wd-upload
      action="https://www.example.com/upload"
      :fileList="fileList"
      @success="onSuccess"
      @fail="onFail"
      @change="onChange"
    ></wd-upload>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { UploadFileItem } from '@/uni_modules/wot-ui-plus/components/wd-upload/types'

const fileList = ref<UploadFileItem[]>([])

// 上传成功回调
function onSuccess(res: any) {
  console.log('上传成功', res)
}

// 上传失败回调
function onFail(err: any) {
  console.log('上传失败', err)
}

// 文件列表变化回调
function onChange({ fileList }: { fileList: UploadFileItem[] }) {
  console.log('文件列表变化', fileList)
}
</script>

<style scoped>
.demo-upload {
  padding: 20px;
}
</style>
```

### 多文件上传

```vue
<template>
  <view class="demo-upload">
    <wd-upload
      action="https://www.example.com/upload"
      :fileList="fileList"
      :multiple="true"
      :limit="5"
      @success="onSuccess"
      @fail="onFail"
      @change="onChange"
    ></wd-upload>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { UploadFileItem } from '@/uni_modules/wot-ui-plus/components/wd-upload/types'

const fileList = ref<UploadFileItem[]>([])

// 上传成功回调
function onSuccess(res: any) {
  console.log('上传成功', res)
}

// 上传失败回调
function onFail(err: any) {
  console.log('上传失败', err)
}

// 文件列表变化回调
function onChange({ fileList }: { fileList: UploadFileItem[] }) {
  console.log('文件列表变化', fileList)
}
</script>

<style scoped>
.demo-upload {
  padding: 20px;
}
</style>
```

### 手动上传

```vue
<template>
  <view class="demo-upload">
    <wd-upload
      ref="uploadRef"
      action="https://www.example.com/upload"
      :fileList="fileList"
      :autoUpload="false"
      @success="onSuccess"
      @fail="onFail"
      @change="onChange"
    ></wd-upload>
    <wd-button type="primary" @click="handleSubmit" style="margin-top: 20px;">手动上传</wd-button>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { UploadFileItem, UploadInstance } from '@/uni_modules/wot-ui-plus/components/wd-upload/types'

const fileList = ref<UploadFileItem[]>([])
const uploadRef = ref<UploadInstance>()

// 上传成功回调
function onSuccess(res: any) {
  console.log('上传成功', res)
}

// 上传失败回调
function onFail(err: any) {
  console.log('上传失败', err)
}

// 文件列表变化回调
function onChange({ fileList }: { fileList: UploadFileItem[] }) {
  console.log('文件列表变化', fileList)
}

// 手动触发上传
function handleSubmit() {
  uploadRef.value?.submit()
}
</script>

<style scoped>
.demo-upload {
  padding: 20px;
}
</style>
```

### 自定义上传按钮

```vue
<template>
  <view class="demo-upload">
    <wd-upload
      action="https://www.example.com/upload"
      :fileList="fileList"
      @success="onSuccess"
      @fail="onFail"
      @change="onChange"
    >
      <view class="custom-upload-btn">
        <wd-icon name="plus" size="32px" color="#999"></wd-icon>
        <text class="custom-upload-text">点击上传</text>
      </view>
    </wd-upload>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { UploadFileItem } from '@/uni_modules/wot-ui-plus/components/wd-upload/types'

const fileList = ref<UploadFileItem[]>([])

// 上传成功回调
function onSuccess(res: any) {
  console.log('上传成功', res)
}

// 上传失败回调
function onFail(err: any) {
  console.log('上传失败', err)
}

// 文件列表变化回调
function onChange({ fileList }: { fileList: UploadFileItem[] }) {
  console.log('文件列表变化', fileList)
}
</script>

<style scoped>
.demo-upload {
  padding: 20px;
}

.custom-upload-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border: 1px dashed #dcdfe6;
  border-radius: 8px;
  background-color: #f5f7fa;
}

.custom-upload-text {
  margin-top: 8px;
  font-size: 12px;
  color: #909399;
}
</style>
```

### 视频上传

```vue
<template>
  <view class="demo-upload">
    <wd-upload
      action="https://www.example.com/upload"
      :fileList="fileList"
      accept="video"
      :maxDuration="30"
      @success="onSuccess"
      @fail="onFail"
      @change="onChange"
    ></wd-upload>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { UploadFileItem } from '@/uni_modules/wot-ui-plus/components/wd-upload/types'

const fileList = ref<UploadFileItem[]>([])

// 上传成功回调
function onSuccess(res: any) {
  console.log('上传成功', res)
}

// 上传失败回调
function onFail(err: any) {
  console.log('上传失败', err)
}

// 文件列表变化回调
function onChange({ fileList }: { fileList: UploadFileItem[] }) {
  console.log('文件列表变化', fileList)
}
</script>

<style scoped>
.demo-upload {
  padding: 20px;
}
</style>
```

## 样式定制指南

### 自定义上传按钮样式

通过 `customEvokeClass` 属性可以自定义上传按钮的样式：

```vue
<template>
  <wd-upload
    action="https://www.example.com/upload"
    :fileList="fileList"
    customEvokeClass="custom-upload-btn"
  ></wd-upload>
</template>

<style>
.custom-upload-btn {
  width: 120px;
  height: 120px;
  border: 2px dashed #409eff;
  border-radius: 12px;
  background-color: #ecf5ff;
}
</style>
```

### 自定义预览图片样式

通过 `customPreviewClass` 属性可以自定义预览图片列表的样式：

```vue
<template>
  <wd-upload
    action="https://www.example.com/upload"
    :fileList="fileList"
    customPreviewClass="custom-preview"
  ></wd-upload>
</template>

<style>
.custom-preview {
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  overflow: hidden;
}
</style>
```

### 自定义整体样式

通过 `customStyle` 和 `customClass` 属性可以自定义组件的整体样式：

```vue
<template>
  <wd-upload
    action="https://www.example.com/upload"
    :fileList="fileList"
    customStyle="margin: 20px;"
    customClass="custom-upload"
  ></wd-upload>
</template>

<style>
.custom-upload {
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
}
</style>
```

## 注意事项

1. **上传地址配置**：确保 `action` 属性配置正确的上传地址，否则会导致上传失败。

2. **跨域问题**：如果上传地址与当前页面地址不同域，需要确保服务端配置了正确的 CORS 头，否则会导致上传失败。

3. **文件大小限制**：通过 `maxSize` 属性可以限制上传文件的大小，超过限制的文件会触发 `oversize` 事件。

4. **文件类型限制**：通过 `accept` 属性可以限制上传文件的类型，支持 'image' | 'video' | 'media' | 'all' | 'file' 等选项。

5. **自定义上传方法**：如果需要使用自定义的上传方法，可以通过 `uploadMethod` 属性配置，该方法需要返回一个 `UniApp.UploadTask` 对象或 Promise。

6. **自动上传配置**：通过 `autoUpload` 属性可以配置是否选择文件后自动上传，默认为 `true`。如果设置为 `false`，需要手动调用 `submit` 方法触发上传。

7. **预览功能**：组件支持图片、视频和文件预览功能，其中图片预览使用 `uni.previewImage` 接口，视频预览使用 `uni.previewMedia` 接口或自定义视频预览组件，文件预览使用 `uni.openDocument` 接口。

8. **多平台适配**：组件支持多平台适配，但不同平台可能存在一些差异，如文件选择、预览等功能，需要根据实际情况进行适配。

9. **性能优化**：对于大量文件上传的场景，建议使用分页加载或懒加载等方式优化性能，避免一次性加载过多文件导致页面卡顿。

10. **错误处理**：建议在上传过程中添加适当的错误处理，如上传失败提示、网络异常处理等，提高用户体验。

## 常见问题解决方案

1. **上传失败**：检查上传地址是否正确，服务端是否配置了正确的 CORS 头，上传文件是否超过大小限制等。

2. **预览失败**：检查文件地址是否正确，文件类型是否支持预览，网络是否正常等。

3. **文件列表不更新**：检查是否正确处理了 `change` 事件，是否正确更新了 `fileList` 数据。

4. **自定义上传方法不生效**：检查自定义上传方法是否正确实现，是否返回了正确的 `UniApp.UploadTask` 对象或 Promise。

5. **多平台适配问题**：对于不同平台的差异，建议使用条件编译进行处理，如小程序和 H5 的文件选择方式不同，需要分别处理。

## 性能优化建议

1. **限制文件数量**：通过 `limit` 属性限制上传文件的数量，避免一次性上传过多文件导致性能问题。

2. **压缩文件**：对于图片和视频文件，可以通过配置 `compressed` 属性进行压缩，减少文件大小，提高上传速度。

3. **懒加载**：对于大量文件上传的场景，建议使用懒加载方式，只加载当前可见的文件，提高页面渲染性能。

4. **合理使用缓存**：对于已上传的文件，可以使用缓存机制，避免重复上传，提高用户体验。

5. **优化上传请求**：合理配置上传请求的并发数，避免同时发起过多请求导致网络拥堵。
