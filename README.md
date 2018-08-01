# canvas-bubble-game

## 介绍
+ 基于canvas的弹弹球小游戏
+ 可简单定制样式

### 引入
```
<script src="./bubble.js"></script>
```

### 使用
```
<canvas id="cvs"></canvas>

直接 Bubble({ id: 'cvs' }) 即可使用
```

### 配置
```
Bubble({
  id: String              (画布),
  width?: Number          (展示的区域宽)
  height?: Number         (展示的区域高)
  color?: Array<String>   (气泡颜色)
  bgcolor?: String        (展示区域背景色)
})
```

### Enjoy