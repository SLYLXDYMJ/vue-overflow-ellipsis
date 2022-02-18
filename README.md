# vue-overlow-ellipsis
> 原作者：https://github.com/wintc23/vue-overflow-ellipsis
> 将折叠逻辑整合到了组件内部。

## 在Vue项目中使用本组件

### 1. 安装
```bash
npm install vue-overflow-ellipsis-q
```

### 2. 在项目中引入组件以及依赖

```html
<link rel="stylesheet" href="./dist/vueOverflowEllipsis.css">
<script src="./dist/vue-overflow-ellipsis.js"></script>
```

or

```js
import ellipsis from "vue-overflow-ellipsis"
import "vue-overflow-ellipsis/dist/index.css"
```

### 3. 使用组件
```html
<template>
  <!-- ... -->
    <vue-overflow-ellipsis :content="content"></vue-overflow-ellipsis>
  <!-- ... -->
</template>

<script>
import vueOverflowEllipsis from 'vue-overflow-ellipsis'
import "vue-overflow-ellipsis/dist/index.css"

Vue.use(vueOverflowEllipsis)
</script>
```

### 4. API
说明：组件动态计算指定行数的容器能容纳的字符数量，动态截取字符串进行显示。组件内部使用ResizeObserver观察元素的size的变动并调用了refresh方法。但是IE不支持ResizeObserver，所以如果需要兼容IE动态

- props
  - ellipsis 是否折叠，可以通过 .sync 双向绑定
  - content 文本字符串
  - rows 文本最大行数，默认是3
  - ellipsisText 省略号字符，默认是"..."
  - showMoreText 展开按钮的文字，默认是“展开”
  - hideMoreText 折叠按钮的文字，默认是“折叠”
  - btnShow 是否总是显示按钮，即便未超过最大行数，默认false

- events
  - show-more 展开按钮点击事件
  - show-more 折叠按钮点击事件

---

## 源码运行
可以通过git将本项目clone到本地运行。

### 安装依赖
```
yarn install
```

### 启动开发服务
```
yarn serve
```

