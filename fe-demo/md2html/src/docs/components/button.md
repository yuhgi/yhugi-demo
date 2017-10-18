# Button 按钮

按钮用于开始一个即时操作。

## 何时使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。
## 代码演示
#### 按钮类型 
  按钮有四种类型：主按钮、次按钮、虚线按钮、危险按钮以及四种颜色按钮。主按钮在同一个操作区域最多出现一次。

```html
<v-button type="primary">Primary</v-button>
<v-button>Default</v-button>
<v-button type="dashed">Dashed</v-button>
<v-button type="danger">Danger</v-button>
<v-button type="info">Info</v-button>
<v-button type="success">Success</v-button>
<v-button type="warning">Warning</v-button>
<v-button type="error">Error</v-button>
```

```javascript
import path from 'path'
```

## API

### Button Props
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |-------------------------------- |-------- |
| type | 设置按钮类型 | string | primary dashed info success warning danger error 或者不设| - |
| html-type | 设置 button 原生的 type 值 | string | 参考 HTML 标准（button reset submit） | button |
| icon | 设置按钮的图标类型 | string | 参考Icon组件中的type可选值| - |
| shape | 设置按钮形状 | string | circle circle-outline 或者不设 | - |
| size | 设置按钮大小 | string | small large 或者不设 | default |
| loading | 设置按钮载入状态 | boolean | true false | false |
| ghost | 幽灵属性，使按钮背景透明 | boolean | true false | false |

### Button Group Props
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |-------------------------------- |-------- |
| size | 设置按钮大小 | string | small large 或者不设 | default |


### Button Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| click | 点击按钮时触发的事件 | 事件对象 |

