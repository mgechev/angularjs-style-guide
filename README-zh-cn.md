# 简介

本风格指南的目的是展示AngularJS应用的最佳实践和风格指南。
这些最佳实践来自于：

0. AngularJS项目源码
0. 本人阅读过的源码和文章
0. 本人的实践经历

**说明**: 这只是风格指南的草案，主要目的是通过交流以消除分歧，进而被社区广泛采纳。

在本指南中不会包含基本的JavaScript开发指南。这些基本的指南可以在下面的列表中找到：

0. [Google's JavaScript style guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
0. [Mozilla's JavaScript style guide](https://developer.mozilla.org/en-US/docs/Developer_Guide/Coding_Style)
0. [GitHub's JavaScript style guide](https://github.com/styleguide/javascript)
0. [Douglas Crockford's JavaScript style guide](http://javascript.crockford.com/code.html)

对于AngularJS开发，推荐 [Google's JavaScript style guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml).

在AngularJS的Github wiki中有一个相似的章节 [ProLoser](https://github.com/ProLoser), you can check it [here](https://github.com/angular/angular.js/wiki).

# 内容目录
* [概览](#general)
    * [目录结构](#directory-structure)
    * [优化 digest cycle](#optimize-the-digest-cycle)
    * [其他](#others)
* [模块](#modules)
* [控制器](#controllers)
* [指令](#directives)
* [过滤器](#filters)
* [服务](#services)
* [模板](#templates)
* [路由](#routing)

# 概览

## 目录结构

由于一个大型的AngularJS应用有较多组成部分，所以最好通过分层的目录结构来组织。
有两个主流的组织方式：

* 按照类型优先，业务功能其次的组织方式

这种方式的目录结构看起来如下：

    .
    ├── app
    │   ├── app.js
    │   ├── controllers
    │   │   ├── page1
    │   │   │   ├── FirstCtrl.js
    │   │   │   └── SecondCtrl.js
    │   │   └── page2
    │   │       └── ThirdCtrl.js
    │   ├── directives
    │   │   ├── page1
    │   │   │   └── directive1.js
    │   │   └── page2
    │   │       ├── directive2.js
    │   │       └── directive3.js
    │   ├── filters
    │   │   ├── page1
    │   │   └── page2
    │   └── services
    │       ├── CommonService.js
    │       ├── cache
    │       │   ├── Cache1.js
    │       │   └── Cache2.js
    │       └── models
    │           ├── Model1.js
    │           └── Model2.js
    ├── lib
    └── test

* 按照业务功能优先，类型其次的组织方式

如下：

    .
    ├── app
    │   ├── app.js
    │   ├── common
    │   │   ├── controllers
    │   │   ├── directives
    │   │   ├── filters
    │   │   └── services
    │   ├── page1
    │   │   ├── controllers
    │   │   │   ├── FirstCtrl.js
    │   │   │   └── SecondCtrl.js
    │   │   ├── directives
    │   │   │   └── directive1.js
    │   │   ├── filters
    │   │   │   ├── filter1.js
    │   │   │   └── filter2.js
    │   │   └── services
    │   │       ├── service1.js
    │   │       └── service2.js
    │   └── page2
    │       ├── controllers
    │       │   └── ThirdCtrl.js
    │       ├── directives
    │       │   ├── directive2.js
    │       │   └── directive3.js
    │       ├── filters
    │       │   └── filter3.js
    │       └── services
    │           └── service3.js
    ├── lib
    └── test

* 在创建指令时，合适的做法是将相关的文件放到同一目录下 (如：模板文件, CSS/SASS 文件, JavaScript文件)。如果你在整个项目周期都选择这种组织方式，

        app
        └── directives
            ├── directive1
            │   ├── directive1.html
            │   ├── directive1.js
            │   └── directive1.sass
            └── directive2
                ├── directive2.html
                ├── directive2.js
                └── directive2.sass

那么，上述的两种目录结构均能适用。

* [ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home) 采用了两种目录结构的一种更加轻量的方式。在这里，组件的单元测试与组件放置在同一目录下。在这种方式下，当改变组件时，更加容易找到对应的测试以及相关文档和用例。

        services
        ├── cache
        │   ├── cache1.js
        │   └── cache1.spec.js
        └── models
            ├── model1.js
            └── model1.spec.js

* `app.js`文件包含路由定义、配置和启动说明(如果需要的话)
* 每一个 JavaScript 文件应该仅包含一个组件。文件名应该以组件名命名。
* 使用 Angular 项目模板，如 [Yeoman](http://yeoman.io), [ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home).

本人更倾向于第一种组织方式，因为更易于查找组件。

## 优化 digest cycle

* 只监听必要的变量(例如：在进行实时通讯时，不要在每次接收到消息时触发 digest loop)
* 尽可能使 `$watch` 中的运算简单。在单个 `$watch` 中进行繁杂的运算将使得整个应用延缓(由于JavaScript的单线程特性，$digest loop 只能在单一线程进行)

## 其他

* 使用：
    * `$timeout`  替代 `setTimeout`
    * `$window`   替代 `window`
    * `$document` 替代 `document`
    * `$http`     替代 `$.ajax`

这将使你更易于在测试时处理代码异常 (例如：你在 `setTimeout` 中忘记 `$scope.$apply`)

使用如下工具自动化你的工作流
    * [Yeoman](http://yeoman.io)
    * [Grunt](http://gruntjs.com)
    * [Bower](http://bower.io)

* 使用 promise (`$q`) 而非回调。这将使你的代码更加优雅、直观，并且免于回调地狱。
* 尽可能使用 `$resource` 而非 `$http`。更高的抽象可以避免冗余。
* 使用AngularJS的预压缩版 (像 [ngmin](https://github.com/btford/ngmin) 或 [ng-annotate](https://github.com/olov/ng-annotate)) 避免在压缩之后出现问题。
* 不要使用全局。通过依赖注入解决所有依赖。
* 不要污染 `$scope`。仅添加与视图相关的函数和变量。
* 使用 controllers 而非 `ngInit`。

# 模块

有两种常见的组织模块的方式：

0. 按照功能
0. 按照组件类型

当前并无太大差别，但前者更加清晰。同时，如果 lazy-loading modules 被实现的话 (当前并未列入 AngularJS 的路线图)，他将改善应用的性能。

# 控制器

* 不要在控制器里操作 DOM。通过指令完成。
* 通过控制器完成的功能命名控制器 (如：购物卡，主页，控制板)，并以字符串`Ctrl`结尾。控制器采用驼峰命名法 (`HomePageCtrl`, `ShoppingCartCtrl`, `AdminPanelCtrl`, etc.).
* 控制器不应该在全局中定义 (尽管 AngularJS 允许，但污染全局空间是个糟糕的实践)。
* 使用数组语法定义控制器：

        module.controller('MyCtrl', ['dependency1', 'dependency2', ..., 'dependencyn', function (dependency1, dependency2, ..., dependencyn) {
          //...body
        }]);

使用这种定义方式可以最大的避免问题。你可以使用工具自动生成数组定义，如：[ng-annotate](https://github.com/olov/ng-annotate) (and grunt task [grunt-ng-annotate](https://github.com/mzgol/grunt-ng-annotate)).
* 使用控制器依赖的原名。这将提高代码的可读性：

        module.controller('MyCtrl', ['$scope', function (s) {
          //...body
        }]);

下面的代码更易理解

        module.controller('MyCtrl', ['$scope', function ($scope) {
          //...body
        }]);

对于包含大量代码的需要上下滚动的文件尤其适用。这可能使你忘记某一变量是对应哪一个依赖。

* 尽可能的精简控制器。将通用函数抽象为独立的服务。
* 通过方法引用进行跨控制器通讯 (通常是子控制器与父控制器通讯) 或者 `$emit`, `$broadcast` 及 `$on` 方法。发送或广播的消息应该限定在最小的作用域。
* 制定一个通过 `$emit`, `$broadcast` 发送的消息列表并且仔细的管理以防命名冲突和bug。
* 在需要格式化数据时将格式化逻辑封装成 [过滤器](#filters) 并将其声明为依赖：

        module.filter('myFormat', function () {
          return function () {
            //body...
          };
        });

        module.controller('MyCtrl', ['$scope', 'myFormatFilter', function ($scope, myFormatFilter) {
          //body...
        }]);

# 指令

* 使用小写字母开头的驼峰法命名指令。
* 在 link function 中使用 `scope` 而非 `$scope`。在 compile 中, 你已经定义参数的 post/pre link functions 将在函数被执行时传递, 你无法通过依赖注入改变他们。这种方式同样应用在 AngularJS 项目中。
* 为你的指令添加自定义前缀以免与第三方指令冲突。
* 不要使用 `ng` 或 `ui` 前缀，因为这些备用于 AngularJS 和 AngularJS UI。
* DOM 操作只通过指令完成。
* 为你开发的可复用组件创建独立作用域。

# 过滤器

* 使用小写字母开头的驼峰法命名过滤器
* 尽可能使过滤器精简。过滤器在 `$digest` loop 中被频繁调用，过于复杂的运算将使得整个应用缓慢。

# 服务

* 用驼峰法命名服务(大写或小写开头)。
* 将业务逻辑封装为服务。
* 将业务逻辑封装成 `service` 而非 `factory`
* 可以使用 `$cacheFactory` 进行会话级别的缓存。这应该用于缓存请求或复杂运算的结果。

# 模板

* 使用 `ng-bind` 或者 `ng-cloak` 而非简单的 `{{ }}` 以防止页面渲染时的闪烁。
* 避免在模板中使用复杂的代码。
* 当需要动态设置 <img> 的 `src` 时使用 `ng-src` 而非 `src` 中嵌套 `{{}}` 的模板。
* 通过对象参数和 scope 变量作为值来使用 `ng-style` 指令，而非将 scope 变量作为字符串通过 `{{ }}` 用于 `style` 属性。

        ...
        $scope.divStyle = {
          width: 200,
          position: 'relative'
        };
        ...

        <div ng-style="divStyle">my beautifully styled div which will work in IE</div>;

# 路由

* 在视图展示之前通过 `resolve` 解决依赖。
