# 目录结构说明

```bash
├── .husky husky钩子，忽略，但不能删
├── dist 打包生成
├── index.html
├── package.json
├── public
│   └── favicon.ico
├── src
│   ├── assets # 静态资源文件，例如img，font，可自行删除或新建
│   ├── api # 公共接口写此文件即可，可按业务分文件，其他直接await klRequest.post
│   ├── common # 公用数据，常量、枚举、静态数据
│   ├── components # 公用业务组件
│   ├── directives # 指令v-customXxx
│   ├── hooks
│   ├── mock # 根据项目需要可删掉
│   ├── pages # 页面级
│   ├── plugins
│   ├── router
│   ├── store # vuex
│   └── styles # 公用样式文件
│   └── utils # 公用方法
│   ├── App.tsx
│   ├── main.tsx
│   ├── typing.d.ts # 全局类型声明
├── tsconfig.json # 一般无需改动
└── vite.config.ts # vite工程配置文件
```

# 开发

## script

> 部署请按照下面 script 按环境配置，模板接入女娲后可自行生成

1. .env.\* 可配置环境

-   默认走线上环境，请复制`.env.dev`（或任意 env）并命名为 .env.local，并写入你调试环境
-   不要提交`.env.local`文件，仅作为个人开发调试使用

2. `npm run dev` 本地开发环境
3. `npm run build` 打包-线上环境
4. `npm run build:prod` 打包-线上环境
5. `npm run build:pre` 打包-预发环境
6. `npm run build:dev` 打包-测试环境
7. `npm run serve` 本地服务查看打包代码

## 问题

-   使用`import()`按需加载时，开启了`keepalive`，本地热更新时会报一个错`TypeError: parentComponent.ctx.deactivate is not a function`，请忽略此问题，手动刷新即可。如有解决办法请联系半糖
-   [vue 注意点与优化](https://www.yuque.com/docs/share/916b5205-9a04-4170-9141-1886f06c23eb?)
-   [vue3 处理错误/警告](https://www.yuque.com/docs/share/ac85d9d9-abc0-4d5c-a4d4-45a8a3936037?)
-   [vue3+tsx 简单用法](https://www.yuque.com/docs/share/eb489c9f-0414-4826-9977-0bfbdae8ff24?)

## 地址

<!-- TODO 将你的项目地址放到此处  -->

-   测试：
-   预发：
-   线上：

## style 选择

1. vite 集成了[CSS Modules](https://cn.vitejs.dev/guide/features.html#css-modules)。拓展了 less，禁止增加其他预处理器。此外，除全局样式外，请使用 css module。已配置 css 名转驼峰。egg

```less
.css-module-demo-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
```

```tsx
import style from './index.module.less'

export default (): VNode => {
    return (
        <section class={style.cssModuleDemoWrap}>
            <h3>这是一个 vite2+vue3+tsx 的模板项目</h3>
        </section>
    )
}
```

2. css in js
    > 项目已集成 css in js，npm 地址文档 install 有误，如新项目安装，请使用 `npm i vue3-emotion -D`
    - [vue3-emotion github 地址](https://github.com/BestVue3/vue3-emotion)
    - [vue3-emotion npm 地址](https://www.npmjs.com/package/vue3-emotion)

# 开发方式

仅支持 TSX，不会集成 SFC ，如果你还不了解，请查阅：

> 这里去掉了 `@vue/compiler-sfc` save-dev 依赖

-   [TypeScript](http://typescriptlang.org/)
-   [Vue3 JSX](https://github.com/vuejs/jsx-next)

# 规范与建议

## 命名

-   文件名，组件名强制大驼峰，例如 HelloWorld
-   文件夹名小驼峰，例如 helloWorld
-   入口文件 index.tsx main.tsx 不可首字母大写大写。热更新失效，多数是文件大小写 ❎ 导致
-   命名尽量语义化，随时准备有道。语义化且简略时，可以不写或少写注释
-   常量命名 common/constant
-   枚举 common/enum

```js
/**
 * @example common/constant
 * 常量命名规范
 * 变量外层统一大写, egg IMG_XXX
 * 内层小写
 */
export const IMG = {
    // 图片兜底图
    default:
        'https://cdn.wanwudezhi.com/static/web-static/image/ce92ce805877c85b39f826adb7f37738_194x195.png',
    logo: 'https://cdn.wanwudezhi.com/seller-admin/image/MTU1NTU3NzM1NTkyNTI0NDQzOQ==.png',
}
/**
 * @example common/enum
 * 枚举大驼峰命名
 * 内层常量式命名
 */
export const enum HandoverEnum {
    // 新建
    NEW = 1,
    // 交接中
    DELIVERING = 2,
    // 关闭
    CLOSE = 3,
}
```

## 响应式数据

> 为了方便统一管理数据，建议使用 reactive，并将数据命名为 stateRef，组件内尽量不要使用连续多个 ref 管理数据，ref 建议仅使用 dom

## 首次调用接口建议统一放到 onBeforeMount

## 建议箭头函数

箭头函数没有原型，没有指向，效果更佳…

```tsx
import { defineComponent, reactive, onBeforeMount } from 'vue'

export default defineComponent({
    name: 'About',
    setup() {
        const stateRef = reactive({
            msg: 'this is about page!',
        })

        onBeforeMount(async () => {
            await ajax.get('url')
        })

        return () => (
            <section>
                <p>{stateRef.msg}</p>
            </section>
        )
    },
})
```

## 模板页面

> pages/TemplateList/TablePage

此模板中写了大量 todo，只需要替换接口及对应字段即可完成开发，后续新页面可直接拷贝修改即可

# 优化改进

## lint

### eslint

预设以下，也关闭了一些，如有建议 👏🏻 pr

> 以下预设已被合并到 [eslint-config-vue3-jsx](https://www.npmjs.com/package/eslint-config-vue3-jsx)

-   plugin:@typescript-eslint/recommended
-   airbnb-typescript
-   plugin:vue/vue3-recommended
-   plugin:vue3-jsx/recommended

### commitlint

这里集成了[@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional)规范，如有疑问自行查阅文档

> commit 格式如下(第一行必填, 其他行选填), 其中 type 代表的是修改内容的类型(必须使用指定的值)、scope 代表影响范围(根据项目自定义)

```
type(scope): 简单描述

- 详细描述一
- 详情描述二

BREAKING CHANGE: 类似 angular-v2 的断层式升级 #1 (只有 type=feat、fix 时才包含)

fix #1, fix #2
```

#### type 取值列表

> 分支策略完全相同

-   feat: 新功能, 新函数
-   fix: 修复函数的 bug （src/\*）
-   docs: 仅修改文档相关（docs/\*）
-   style: 代码风格层面改动, eg: 空格、分号、空行、引号……
-   refactor: 函数重构，既不是 bug 也不是 feature （src/\*）
-   perf: 优化性能（src/\*, build/\*）
-   test: 测试用例的添加、修改、删除（src/\_\*.test.ts）
-   build: 构建层面修改。 egg：build/\*, rollup, gulp……
-   ci: 自动化脚本相关。 eg: Travis, jenkins, gitlab.ci
-   chore: 其他的修改，不包含 src, test
-   revert: 回滚之前的 commit

#### scope 建议

-   修改的页面、组件、功能、模块、函数名称
-   待补充

#### 文档参考

-   http://utils.wont-org.cn/common/guide.html#%E6%8F%90%E4%BA%A4%E4%BB%A3%E7%A0%81
-   https://github.com/conventional-changelog/commitlint
-   https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional

# packages

### eslint-plugin-vue3-jsx

> 文档齐全

-   地址：https://www.npmjs.com/package/eslint-plugin-vue3-jsx
-   维护人员：半糖

### eslint-config-vue3-jsx

> 文档齐全

-   地址：https://www.npmjs.com/package/eslint-config-vue3-jsx
-   维护人员：半糖
