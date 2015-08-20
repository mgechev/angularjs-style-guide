# 简介

本风格指南的目的是展示AngularJS应用的最佳实践和风格指南。
这些最佳实践来自于：

0. AngularJS项目源码
0. 本人阅读过的源码和文章
0. 本人的实践经历

**说明1**: 这只是风格指南的草案，主要目的是通过交流以消除分歧，进而被社区广泛采纳。  
**说明2**: 本版本是翻译自英文原版，在遵循下面的指南之前请确认你看到的是比较新的版本。

在本指南中不会包含基本的JavaScript开发指南。这些基本的指南可以在下面的列表中找到：

0. [Google's JavaScript style guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
0. [Mozilla's JavaScript style guide](https://developer.mozilla.org/en-US/docs/Developer_Guide/Coding_Style)
0. [GitHub's JavaScript style guide](https://github.com/styleguide/javascript)
0. [Douglas Crockford's JavaScript style guide](http://javascript.crockford.com/code.html)
0. [Airbnb JavaScript style guide](https://github.com/airbnb/javascript)

对于AngularJS开发，推荐 [Google's JavaScript style guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml).

在AngularJS的Github wiki中有一个相似的章节 [ProLoser](https://github.com/ProLoser), you can check it [here](https://github.com/angular/angular.js/wiki).

# 其它翻译版本

- [英语](https://github.com/mgechev/angularjs-style-guide/blob/master/README.md)
- [德语](https://github.com/mgechev/angularjs-style-guide/blob/master/README-de-de.md)
- [西班牙语](https://github.com/mgechev/angularjs-style-guide/blob/master/README-es-es.md)
- [法语](https://github.com/mgechev/angularjs-style-guide/blob/master/README-fr-fr.md)
- [印度尼西亚语](https://github.com/mgechev/angularjs-style-guide/blob/master/README-id-id.md)
- [意大利语](https://github.com/mgechev/angularjs-style-guide/blob/master/README-it-it.md)
- [日语](https://github.com/mgechev/angularjs-style-guide/blob/master/README-ja-jp.md)
- [韩语](https://github.com/mgechev/angularjs-style-guide/blob/master/README-ko-kr.md)
- [波兰语](https://github.com/mgechev/angularjs-style-guide/blob/master/README-pl-pl.md)
- [葡萄牙语](https://github.com/mgechev/angularjs-style-guide/blob/master/README-pt-br.md)
- [俄语](https://github.com/mgechev/angularjs-style-guide/blob/master/README-ru-ru.md)
- [塞尔维亚语](https://github.com/mgechev/angularjs-style-guide/blob/master/README-sr.md)
- [塞尔维亚拉丁语](https://github.com/mgechev/angularjs-style-guide/blob/master/README-sr-lat.md)
- [土耳其语](https://github.com/mgechev/angularjs-style-guide/blob/master/README-tr-tr.md)

# 内容目录
* [概览](#概览)
    * [目录结构](#目录结构)
    * [标记](#标记)
    * [其他](#其他)
* [模块](#模块)
* [控制器](#控制器)
* [指令](#指令)
* [过滤器](#过滤器)
* [服务](#服务)
* [模板](#模板)
* [路由](#路由)
* [国际化](#国际化)
* [性能](#性能)
* [加入我们](#加入我们)
* [贡献者](#贡献者)

# 概览

## 目录结构

由于一个大型的AngularJS应用有较多组成部分，所以最好通过分层的目录结构来组织。
有两个主流的组织方式：

* 按照类型优先，业务功能其次的组织方式

这种方式的目录结构看起来如下：

```
.
├── app
│   ├── app.js
│   ├── controllers
│   │   ├── home
│   │   │   ├── FirstCtrl.js
│   │   │   └── SecondCtrl.js
│   │   └── about
│   │       └── ThirdCtrl.js
│   ├── directives
│   │   ├── home
│   │   │   └── directive1.js
│   │   └── about
│   │       ├── directive2.js
│   │       └── directive3.js
│   ├── filters
│   │   ├── home
│   │   └── about
│   └── services
│       ├── CommonService.js
│       ├── cache
│       │   ├── Cache1.js
│       │   └── Cache2.js
│       └── models
│           ├── Model1.js
│           └── Model2.js
├── partials
├── lib
└── test
```

* 按照业务功能优先，类型其次的组织方式

如下：

```
.
├── app
│   ├── app.js
│   ├── common
│   │   ├── controllers
│   │   ├── directives
│   │   ├── filters
│   │   └── services
│   ├── home
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
│   └── about
│       ├── controllers
│       │   └── ThirdCtrl.js
│       ├── directives
│       │   ├── directive2.js
│       │   └── directive3.js
│       ├── filters
│       │   └── filter3.js
│       └── services
│           └── service3.js
├── partials
├── lib
└── test
```

* 当目录里有多个单词时, 使用 lisp-case 语法:

```
app
 ├── app.js
 └── my-complex-module
     ├── controllers
     ├── directives
     ├── filters
     └── services
```

* 在创建指令时，合适的做法是将相关的文件放到同一目录下 (如：模板文件, CSS/SASS 文件, JavaScript文件)。如果你在整个项目周期都选择这种组织方式，

```
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
```

那么，上述的两种目录结构均能适用。
* 组件的单元测试应与组件放置在同一目录下下。在这种方式下，当改变组件时，更加容易找到对应的测试。同时，单元测试也充当了文档和示例。

```
services
├── cache
│   ├── cache1.js
│   └── cache1.spec.js
└── models
    ├── model1.js
    └── model1.spec.js
```

* `app.js`文件包含路由定义、配置和启动说明(如果需要的话)。
* 每一个 JavaScript 文件应该仅包含 **一个组件** 。文件名应该以组件名命名。
* 使用 Angular 项目模板，如 [Yeoman](http://yeoman.io), [ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home).

组件命名的约定可以在每个组件中看到。

## 标记

[太长慎读](http://developer.yahoo.com/blogs/ydn/high-performance-sites-rule-6-move-scripts-bottom-7200.html) 把script标签放在文档底部。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>MyApp</title>
</head>
<body>
  <div ng-app="myApp">
    <div ng-view></div>
  </div>
  <script src="angular.js"></script>
  <script src="app.js"></script>
</body>
</html>
```

保持标签的简洁并把AngularJS的标签放在后面。这样有利于提高代码可读性，方便找出框架增强的HTML片段（提高可维护性）。

```html
<form class="frm" ng-submit="login.authenticate()">
  <div>
    <input class="ipt" type="text" placeholder="name" require ng-model="user.name">
  </div>
</form>
```

其它的HTML标签应该遵循下面的指南的 [建议](http://mdo.github.io/code-guide/#html-attribute-order)

## 其他

* 使用：
    * `$timeout`  替代 `setTimeout`
    * `$interval` instead of `setInterval`
    * `$window`   替代 `window`
    * `$document` 替代 `document`
    * `$http`     替代 `$.ajax`

这将使你更易于在测试时处理代码异常 (例如：你在 `setTimeout` 中忘记 `$scope.$apply`)

使用如下工具自动化你的工作流
    * [Yeoman](http://yeoman.io)
    * [Gulp](http://gulpjs.com)
    * [Grunt](http://gruntjs.com)
    * [Bower](http://bower.io)

* 使用 promise (`$q`) 而非回调。这将使你的代码更加优雅、直观，并且免于回调地狱。
* 尽可能使用 `$resource` 而非 `$http`。更高的抽象可以避免冗余。
* 使用AngularJS的预压缩版 (像 [ngmin](https://github.com/btford/ngmin) 或 [ng-annotate](https://github.com/olov/ng-annotate)) 避免在压缩之后出现问题。
* 不要使用全局变量或函数。通过依赖注入解决所有依赖，这可以减少 bug ，规避很多测试时的麻烦。
* 为避免使用全局变量或函数，可以借助 Grunt 或 Gulp 把你的代码放到一个立即执行的函数表达式（IIFE）中。可用的插件有 [grunt-wrap](https://www.npmjs.com/package/grunt-wrap) 或 [gulp-wrap](https://www.npmjs.com/package/gulp-wrap/)。下面是 Gulp 的示例：

```Javascript
gulp.src("./src/*.js")
    .pipe(wrap('(function(){\n"use strict";\n<%= contents %>\n})();'))
    .pipe(gulp.dest("./dist"));
```

* 不要污染 `$scope`。仅添加与视图相关的函数和变量。
* [使用 controllers 而非 `ngInit`](https://github.com/angular/angular.js/pull/4366/files)。`ngInit` 只有在一种情况下的使用是合适的：用来给 `ngRepeat`的特殊属性赋予一个别名。除此之外, 你应该使用 controllers 而不是 `ngInit` 来初始化scope变量。`ngInit` 中的表达式会传递给 Angular 的 `$parse` 服务，通过词法分析，语法分析，求值等过程。这会导致:
    - 对性能的巨大影响，因为解释器由 Javascript 写成
    - 多数情况下，`$parse` 服务中对表达式的缓存基本不起作用，因为 `ngInit` 表达式经常只有一次求值
    - 很容易出错，因为是模板中写字符串，没有针对表达式的语法高亮和进一步的编辑器支持
    - 不会抛出运行时错误
* 不要使用 `$` 前缀来命名变量, 属性和方法. 这种前缀是预留给 AngularJS 来使用的.
* 当使用 DI 机制来解决依赖关系, 要根据他们的类型进行排序 -  AngularJS 内建的依赖要优先, 之后才是你自定义的：

```javascript
module.factory('Service', function ($rootScope, $timeout, MyCustomDependency1, MyCustomDependency2) {
  return {
    //Something
  };
});
```

# 模块

* 模块应该用驼峰式命名。为表明模块 `b` 是模块 `a` 的子模块, 可以用点号连接: `a.b` 。

	有两种常见的组织模块的方式：

	0. 按照功能组织
	0. 按照组件类型组织

	当前并无太大差别，但前者更加清晰。同时，如果 lazy-loading modules 被实现的话 (当前并未列入 AngularJS 的路线图)，这种方式将改善应用的性能。

# 控制器

* 不要在控制器里操作 DOM，这会让你的控制器难以测试，而且违背了[关注点分离原则](https://en.wikipedia.org/wiki/Separation_of_concerns)。应该通过指令操作 DOM。
* 通过控制器完成的功能命名控制器 (如：购物卡，主页，控制板)，并以字符串`Ctrl`结尾。
* 控制器是纯 Javascript [构造函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)，所以应该用首字母大写的驼峰命名法（`HomePageCtrl`, `ShoppingCartCtrl`, `AdminPanelCtrl`, 等等）。
* 控制器不应该在全局中定义 (尽管 AngularJS 允许，但污染全局命名空间是个糟糕的实践)。
* 使用以下语法定义控制器：

  ```JavaScript
  function MyCtrl(dependency1, dependency2, ..., dependencyn) {
    // ...
  }
  module.controller('MyCtrl', MyCtrl);
  ```

   为了避免在压缩代码时产生问题，你可以使用工具自动生成标准的数组定义式语法，如：[ng-annotate](https://github.com/olov/ng-annotate) （还有 grunt 任务 [grunt-ng-annotate](https://github.com/mzgol/grunt-ng-annotate)）

* 使用 `controller as` 语法:

  ```
  <div ng-controller="MainCtrl as main">
     {{ main.title }}
  </div>
  ```

  ```JavaScript
  app.controller('MainCtrl', MainCtrl);

  function MainCtrl () {
    this.title = 'Some title';
  }
  ```

   使用 `controller as` 主要的优点是:
   * 创建了一个“独立”的组件——绑定的属性不属于 `$scope` 原型链。这是一个很好的实践，因为 `$scope` 原型继承有一些重要的缺点（这可能是为什么它在 Angular 2 中被移除了）：
      * Scope值的改变会在你不注意的地方有影响。
      * 难以重构。
      * [dot rule](http://jimhoskins.com/2012/12/14/nested-scopes-in-angularjs.html)'.
   * 当你不需要做必须由 `$scope` 完成的操作（比如`$scope.$broadcast`）时，移除掉了 `$scope`，就是为 Angular2 做好准备。
   * 语法上更接近于普通的 JavaScript 构造函数。

   想深入了解 `controller as` ，请看: [digging-into-angulars-controller-as-syntax](http://toddmotto.com/digging-into-angulars-controller-as-syntax/)
* 如果使用数组定义语法声明控制器，使用控制器依赖的原名。这将提高代码的可读性：

  ```JavaScript
  function MyCtrl(s) {
    // ...
  }

  module.controller('MyCtrl', ['$scope', MyCtrl]);
  ```

   下面的代码更易理解

  ```JavaScript
  function MyCtrl($scope) {
    // ...
  }
  module.controller('MyCtrl', ['$scope', MyCtrl]);
  ```

   对于包含大量代码的需要上下滚动的文件尤其适用。这可能使你忘记某一变量是对应哪一个依赖。

* 尽可能的精简控制器。将通用函数抽象为独立的服务。
* 不要再控制器中写业务逻辑。把业务逻辑交给模型层的服务。
  举个例子:

  ```Javascript
  // 这是把业务逻辑放在控制器的常见做法
  angular.module('Store', [])
  .controller('OrderCtrl', function ($scope) {

    $scope.items = [];

    $scope.addToOrder = function (item) {
      $scope.items.push(item);//-->控制器中的业务逻辑
    };

    $scope.removeFromOrder = function (item) {
      $scope.items.splice($scope.items.indexOf(item), 1);//-->控制器中的业务逻辑
    };

    $scope.totalPrice = function () {
      return $scope.items.reduce(function (memo, item) {
        return memo + (item.qty * item.price);//-->控制器中的业务逻辑
      }, 0);
    };
  });
  ```

  当你把业务逻辑交给模型层的服务，控制器看起来就会想这样：（关于 service-model 的实现，参看 'use services as your Model'）:

  ```Javascript
  // Order 在此作为一个 'model'
  angular.module('Store', [])
  .controller('OrderCtrl', function (Order) {

    $scope.items = Order.items;

    $scope.addToOrder = function (item) {
      Order.addToOrder(item);
    };

    $scope.removeFromOrder = function (item) {
      Order.removeFromOrder(item);
    };

    $scope.totalPrice = function () {
      return Order.total();
    };
  });
  ```

  为什么控制器不应该包含业务逻辑和应用状态？
  * 控制器会在每个视图中被实例化，在视图被销毁时也要同时销毁
  * 控制器是不可重用的——它与视图有耦合
  * Controllers are not meant to be injected


* 需要进行跨控制器通讯时，通过方法引用(通常是子控制器到父控制器的通讯)或者 `$emit`, `$broadcast` 及 `$on` 方法。发送或广播的消息应该限定在最小的作用域。
* 制定一个通过 `$emit`, `$broadcast` 发送的消息列表并且仔细的管理以防命名冲突和bug。

   Example:

   ```JavaScript
   // app.js
   /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
   Custom events:
     - 'authorization-message' - description of the message
       - { user, role, action } - data format
         - user - a string, which contains the username
         - role - an ID of the role the user has
         - action - specific ation the user tries to perform
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
   ```

* 在需要格式化数据时将格式化逻辑封装成 [过滤器](#过滤器) 并将其声明为依赖：

   ```JavaScript
   function myFormat() {
     return function () {
       // ...
     };
   }
   module.filter('myFormat', myFormat);

   function MyCtrl($scope, myFormatFilter) {
     // ...
   }

   module.controller('MyCtrl', MyCtrl);
   ```
* 有内嵌的控制器时使用 "内嵌作用域" ( `controllerAs` 语法)：

   **app.js**
   ```javascript
   module.config(function ($routeProvider) {
     $routeProvider
       .when('/route', {
         templateUrl: 'partials/template.html',
         controller: 'HomeCtrl',
         controllerAs: 'home'
       });
   });
   ```
   **HomeCtrl**
   ```javascript
   function HomeCtrl() {
     this.bindingValue = 42;
   }
   ```
   **template.html**
   ```
   <div ng-bind="home.bindingValue"></div>
   ```

# 指令

* 使用小写字母开头的驼峰法命名指令。
* 在 link function 中使用 `scope` 而非 `$scope`。在 compile 中, 你已经定义参数的 post/pre link functions 将在函数被执行时传递, 你无法通过依赖注入改变他们。这种方式同样应用在 AngularJS 项目中。
* 为你的指令添加自定义前缀以免与第三方指令冲突。
* 不要使用 `ng` 或 `ui` 前缀，因为这些备用于 AngularJS 和 AngularJS UI。
* DOM 操作只通过指令完成。
* 为你开发的可复用组件创建独立作用域。
* 将指令当属性和元素而不是评论和类来使用。这会使你的代码可读性更高.
* 使用 `scope.$on('$destroy', fn)` 来清除. 这点在使用第三方指令的时候特别有用.
* 不要忘记使用 `$sce` 当你处理不可信的资料时.


# 过滤器

* 使用小写字母开头的驼峰法命名过滤器
* 尽可能使过滤器精简。过滤器在 `$digest` loop 中被频繁调用，过于复杂的运算将使得整个应用缓慢。
* 在过滤器中只做一件事. 更加复杂的操作可以用pipe来实现.


# 服务

* 用驼峰法命名服务(大写或小写开头)。
* 将业务逻辑封装为服务。
* 将业务逻辑封装成 `service` 而非 `factory`
* 可以使用 `$cacheFactory` 进行会话级别的缓存。这应该用于缓存请求或复杂运算的结果。

# 模板

* 使用 `ng-bind` 或者 `ng-cloak` 而非简单的 `{{ }}` 以防止页面渲染时的闪烁。
* 避免在模板中使用复杂的代码。
* 当需要动态设置 <img> 的 `src` 时使用 `ng-src` 而非 `src` 中嵌套 `{{}}` 的模板。
* 当需要动态设置<a>的 `href` 时使用 `ng-href` 而非 `href` 中嵌套 `{{ }}` 的模板。
* 通过对象参数和 scope 变量作为值来使用 `ng-style` 指令，而非将 scope 变量作为字符串通过 `{{ }}` 用于 `style` 属性。

```HTML
<script>
...
$scope.divStyle = {
  width: 200,
  position: 'relative'
};
...
</script>

<div ng-style="divStyle">my beautifully styled div which will work in IE</div>;
```
# 路由

* 在视图展示之前通过 `resolve` 解决依赖。
* 不要在 `resolve` 回调函数中直接使用RESTful调用. 将所有请求放在合适的服务中. 这样你就可以使用缓存和遵循SCP.

# 国际化

# 性能

* 优化 digest cycle

	* 只监听必要的变量。仅在必要时显式调用 `$digest` 循环(例如：在进行实时通讯时，不要在每次接收到消息时触发 `$digest` 循环)。
	* 对于那些只初始化一次并不再改变的内容, 使用一次性 watcher [`bindonce`](https://github.com/Pasvaz/bindonce) （对于早期的 AngularJS）。如果是 AngularJS >=1.3.0 的版本，应使用Angular内置的一次性数据绑定(One-time bindings).
	* 尽可能使 `$watch` 中的运算简单。在单个 `$watch` 中进行繁杂的运算将使得整个应用变慢(由于JavaScript的单线程特性，`$digest` loop 只能在单一线程进行)
	* 当监听集合时, 如果不是必要的话不要深度监听. 最好使用 `$watchCollection`, 对监听的表达式和之前表达式的值进行浅层的检测.
	* 当没有变量被  `$timeout` 回调函数所影响时，在 `$timeout` 设置第三个参数为 false 来跳过 `$digest` 循环.
	* 当面对超大不太改变的集合, [使用 immutable data structures](http://blog.mgechev.com/2015/03/02/immutability-in-angularjs-immutablejs/).


* 用打包、缓存html模板文件到你的主js文件中，减少网络请求, 可以用 [grunt-html2js](https://github.com/karlgoldstein/grunt-html2js) / [gulp-html2js](https://github.com/fraserxu/gulp-html2js). 详见 [这里](http://ng-learn.org/2014/08/Populating_template_cache_with_html2js/) 和 [这里](http://slides.com/yanivefraim-1/real-world-angularjs#/34) 。 在项目有很多小html模板并可以放进主js文件中时（通过minify和gzip压缩），这个办法是很有用的。
