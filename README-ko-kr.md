[![https://gitter.im/mgechev/angularjs-style-guide 에서 채팅에 참여하세요.](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/mgechev/angularjs-style-guide?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# 소개

이 문서의 목표는 AngularJS 애플리케이션을 제작할 때 참고할 수 있는 모범 사례(best practice)와 가이드라인을 제시하는 것입니다.
이 모범 사례들은 아래에서 참고했습니다.

0. AngularJS 소스 코드
0. 본인이 읽어본 소스 코드와 문서들
0. 본인의 경험

**주의 1**: 이 스타일 가이드는 아직 작성 중입니다. 이 문서는 community-driven으로 유지하는 게 목표이며, 여기에 기여를 해주신다면 커뮤니티 전체가 크게 감사할 것입니다.

**주의 2**: 이 한국어 번역본을 따르기 이전에, 최신판이 맞는지 확인하십시오. AngularJS 스타일 가이드의 최신 버전은 [영문 문서](https://github.com/mgechev/angularjs-style-guide/blob/master/README.md)입니다.

이 스타일 가이드에서는 자바스크립트 개발 가이드라인을 제공하진 않습니다. 여기에 관련해서는 아래를 참고하세요.

0. [Google 자바스크립트 스타일 가이드](https://google.github.io/styleguide/javascriptguide.xml)
0. [Mozilla 자바스크립트 스타일 가이드](https://developer.mozilla.org/en-US/docs/Developer_Guide/Coding_Style)
0. [GitHub's 자바스크립트 스타일 가이드](https://github.com/styleguide/javascript)
0. [Douglas Crockford's 자바스크립트 스타일 가이드](http://javascript.crockford.com/code.html)
0. [Airbnb 자바스크립트 스타일 가이드](https://github.com/airbnb/javascript)
0. [Idiomatic 자바스크립트 스타일 가이드](https://github.com/rwaldron/idiomatic.js/)

AngularJS 개발에 대해서는 [Google 자바스크립트 스타일 가이드](https://google.github.io/styleguide/javascriptguide.xml)를 추천합니다.

AngularJS GitHub 위키에 [ProLoser](https://github.com/ProLoser)가 작성한 비슷한 항목이 있습니다. [여기](https://github.com/angular/angular.js/wiki)에서 확인할 수 있습니다.

# 번역본

- [영어(원문)](https://github.com/mgechev/angularjs-style-guide/blob/master/README.md)
- [독일어](https://github.com/mgechev/angularjs-style-guide/blob/master/README-de-de.md)
- [스페인어](https://github.com/mgechev/angularjs-style-guide/blob/master/README-es-es.md)
- [프랑스어](https://github.com/mgechev/angularjs-style-guide/blob/master/README-fr-fr.md)
- [인도네시아어](https://github.com/mgechev/angularjs-style-guide/blob/master/README-id-id.md)
- [이탈리아어](https://github.com/mgechev/angularjs-style-guide/blob/master/README-it-it.md)
- [일본어](https://github.com/mgechev/angularjs-style-guide/blob/master/README-ja-jp.md)
- [폴란드어](https://github.com/mgechev/angularjs-style-guide/blob/master/README-pl-pl.md)
- [포르투갈어](https://github.com/mgechev/angularjs-style-guide/blob/master/README-pt-br.md)
- [러시아어](https://github.com/mgechev/angularjs-style-guide/blob/master/README-ru-ru.md)
- [세르비아어](https://github.com/mgechev/angularjs-style-guide/blob/master/README-sr.md)
- [세르비아어(라틴 문자)](https://github.com/mgechev/angularjs-style-guide/blob/master/README-sr-lat.md)
- [중국어](https://github.com/mgechev/angularjs-style-guide/blob/master/README-zh-cn.md)
- [터키어](https://github.com/mgechev/angularjs-style-guide/blob/master/README-tr-tr.md)

# 목차
* [일반](#일반)
    * [디렉토리 구조](#디렉토리-구조)
    * [마크업](#마크업)
    * [명명 규칙](#명명-규칙)
    * [기타](#기타)
* [모듈](#모듈)
* [컨트롤러](#컨트롤러)
* [디렉티브](#디렉티브)
* [필터](#필터)
* [서비스](#서비스)
* [템플릿](#템플릿)
* [라우팅](#라우팅)
* [국제화](#국제화)
* [성능](#성능)
* [기여](#기여)
* [기여자 명단](#기여자-명단)

# 일반

## 디렉토리 구조

규모가 큰 AngularJS 애플리케이션에는 많은 컴포넌트가 있기 때문에 계층적으로 디렉토리 구조를 잡는 것이 좋습니다.
주로 두 가지 접근법이 사용됩니다.

* 컴포넌트 타입 별로 상위 디렉토리를 만들고, 기능별로 하위 디렉토리를 구성.

이러한 접근법을 따르는 디렉토리 구조는 다음과 같습니다.

```
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
├── partials
├── lib
└── test
```

* 기능 별로 상위 디렉토리를 나누고, 컴포넌트 타입 별로 하위 디렉토리를 구성.

다음과 같은 디렉토리 구조가 됩니다.

```
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
├── partials
├── lib
└── test
```

* 디렉토리 이름이 여러 단어로 이루어져 있으면, lisp-case를 사용합니다.

```
app
 ├── app.js
 └── my-complex-module
     ├── controllers
     ├── directives
     ├── filters
     └── services
```

* 디렉티브에 관련된 모든 파일(템플릿, CSS/SASS 파일, 자바스크립트)을 한 폴더에 모아두세요. 이런 스타일로 하기를 마음먹었다면, 프로젝트 모든 곳에서 이 구조를 일관적으로 유지하시기 바랍니다.

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

이 방식은 위에 제시한 두 가지 디렉토리 구성법 모두에서 사용할 수 있습니다.
* 유닛 테스트 파일은 컴포넌트와 같은 디렉토리에 있어야 합니다. 이렇게 하면 컴포넌트를 수정했을 때 테스트 파일을 찾기 쉽게 됩니다. 또한, 테스트 파일은 그 자체로 컴포넌트의 참고 문서나 사용법을 보여주는 역할도 합니다.

```
services
├── cache
│   ├── cache1.js
│   └── cache1.spec.js
└── models
    ├── model1.js
    └── model1.spec.js
```

* `app.js` 파일에는 라우트 정의와 설정이 포함되어야 하며, 필요한 경우 초기화 작업도 포함합니다.
* 하나의 자바스크립트 파일은 **단 하나의 컴포넌트**만을 포함해야 합니다. 파일 이름은 컴포넌트의 이름과 같은 식으로 지어야 합니다.
* [Yeoman](http://yeoman.io)이나 [ng-boilerplate](http://ngbp.github.io/ngbp/#/home)와 같은 Angular 프로젝트 구조 템플릿을 사용합니다.

컴포넌트의 명명 규칙은 각 컴포넌트 절에서 설명합니다.

## 마크업

[TLDR;](http://developer.yahoo.com/blogs/ydn/high-performance-sites-rule-6-move-scripts-bottom-7200.html) 스크립트 파일은 html 문서 하단에 넣으세요.

```html
<!DOCTYPE html>
<html lang="ko">
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

AngularJS 디렉티브는 간결하게 만들고, 표준 속성(attribute)보다 뒤에 위치시킵니다. 이렇게 하면 코드를 읽기기 쉽고 유지 보수도 쉬워집니다. 왜냐하면 추가적인 속성들이 일관된 위치(즉, 가장 마지막)에 모여있기 때문입니다.

```html
<form class="frm" ng-submit="login.authenticate()">
  <div>
    <input class="ipt" type="text" placeholder="name" require ng-model="user.name">
  </div>
</form>
```

다른 HTML 속성들은 이 코드 가이드의 [추천 방법](http://mdo.github.io/code-guide/#html-attribute-order)을 따릅니다.

## 명명 규칙
모든 요소에 대한 명명 규칙이 아래 표에 나와있습니다.

요소 | 명명 스타일 | 예시 | 용법
----|------|----|--------
모듈 | lowerCamelCase  | angularApp |
컨트롤러 | Functionality + 'Ctrl'  | AdminCtrl |
디렉티브 | lowerCamelCase  | userInfo |
필터 | lowerCamelCase | userFilter |
서비스 | UpperCamelCase | User | 생성자
팩토리 | lowerCamelCase | dataFactory | 기타

## 기타

* 다음을 권장합니다.
    * `setTimeout` 대신 `$timeout`
    * `setInterval` 대신 `$interval`
    * `window` 대신 `$window`
    * `document` 대신 `$document`
    * `$.ajax` 대신 `$http`
    * `window.location`나 `$window.location` 대신 `$location`
    * `document.cookie` 대신 `$cookies`

이렇게 하면 테스트가 쉬워지고, 예상치 못한 동작도 방지할 수 있습니다 (예를 들면 `setTimeout`에서 `$scope.$apply`를 잊는 다든가).

* 아래의 툴을 사용해 작업 흐름을 자동화하세요.
    * [NPM](https://www.npmjs.com/)
    * [Grunt](http://gruntjs.com)
    * [Gulp](http://gulpjs.com)
    * [Yeoman](http://yeoman.io)
    * [Bower](http://bower.io)


* 콜백 대신에 promises (`$q`)를 사용하세요. $q를 사용하면 코드가 우아하고 깔끔해지고, 여러분을 콜백 지옥에서 구원해줄 것입니다.
* 가능한 `$http` 보다는 `$resource`를 사용하세요. 높은 수준의 추상화는 자질구레한 작업으로부터 해방시켜줍니다.
* AngularJS pre-minifier ([ng-annotate](https://github.com/olov/ng-annotate))를 사용해 minification 시의 문제를 미리 방지합니다.
* 전역 변수를 사용하지 마세요. 모든 의존성은 의존성 주입으로 해결하시기 바랍니다. 이렇게 하면 테스트에서 발생하는 버그와 monkey patching을 방지할 수 있습니다.
* Grunt나 Gulp로 당신의 코드를 즉시실행함수(IIFE)로 감싸 전역 변수를 없애주세요. 이 목적으로 사용할 수 있는 플러그인은 [grunt-wrap](https://www.npmjs.com/package/grunt-wrap)나 [gulp-wrap](https://www.npmjs.com/package/gulp-wrap/)가 있습니다. 다음은 Gulp를 사용한 예시입니다.

    ```Javascript
    gulp.src("./src/*.js")
    .pipe(wrap('(function(){\n"use strict";\n<%= contents %>\n})();'))
    .pipe(gulp.dest("./dist"));
    ```
* `$scope`를 오염시키지 마세요. 오직 템플릿에서 사용하는 함수와 변수들만 추가하세요.
* [`nginit`대신 컨트롤러](https://github.com/angular/angular.js/commit/010d9b6853a9d2718b095e4c017c9bd5f135e0b0)를 사용하세요. `ngInit`를 사용할 수 있는 상황은 아주 특수한 경우 뿐입니다. 즉, `ngRepeat`의 특별한 프로퍼티의 별칭을 만들 때나, 혹은 서버 사이드 스크립트에서 데이터를 넣는 경우를 말합니다. 이 두가지가 아닌 다른 모든 상황에는, `ngInit` 대신 컨트롤러를 사용해야 합니다. The expression passed to `ngInit` should go through lexing, parsing and evaluation by the Angular interpreter implemented inside the `$parse` service. This leads to:
    - Performance impact, because the interpreter is implemented in JavaScript
    - The caching of the parsed expressions inside the `$parse` service doesn't make a lot of sense in most cases, since `ngInit` expressions are often evaluated only once
    - Is error-prone, since you're writing strings inside your templates, there's no syntax highlighting and further support by your editor
    - No run-time errors are thrown
* 변수, 프로퍼티, 메소드 이름에 `$` 접두어를 사용하지 않습니다. `$`로 시작하는 명명법은 AngularJS 자체에서만 사용하도록 제한되어 있습니다.
* 애플리케이션 내에서 `JQUERY`를 사용하지 마세요. 꼭 필요하다면 `angular.element` 함수로 `JQLite`를 사용하시기 바랍니다.
* Angular JS의 의존성주입(DI) 메커니즘으로 의존성을 처리할 때에는, 의존성들을 종류별로 정렬하세요. AngularJS 내장 의존성을 가장 먼저, 그 뒤에 커스텀 의존성을 나열합니다.

```javascript
module.factory('Service', function ($rootScope, $timeout, MyCustomDependency1, MyCustomDependency2) {
  return {
    //Something
  };
});
```

# 모듈

* 모듈의 이름은 lowerCamelCase로 명명되어야 합니다. 모듈 `a`의 하위 모듈 `b`를 가리키려면 `a.b`와 같이 네임스페이스를 중첩시킬 수 있습니다.

	일반적으로 두 가지 방법으로 모듈을 구조화할 수 있습니다.

	0. 기능적으로
	0. 컴포넌트 타입별로

	두 방법에는 큰 차이가 없지만, 첫 번째가 좀 더 명확합니다. 또한, 모듈의 지연 로딩(lazy-loading)이 지원된다면 (아직 AngularJS 로드맵에 없습니다), 애플리케이션 성능을 향상시킬 수 있습니다.

# 컨트롤러

* 컨트롤러에서 DOM을 조작하지 마세요. 만약 그렇게 해버리면 컨트롤러를 테스트하기 어려워지고, [관심사의 분리](https://en.wikipedia.org/wiki/Separation_of_concerns) 원칙도 위반하게 됩니다. 컨트롤러 대신 디렉티브를 사용하시기 바랍니다.
* 컨트롤러 이름은 컨트롤러의 기능 (예를 들어 shopping cart, homepage, admin panel)에 따라 명명해야 하며, 이름의 끝에는 `Ctrl`을 접미사로 붙여줍니다.
* 컨트롤러는 자바스크립트의 [생성자](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)이며, 따라서 UpperCamelCase (`HomePageCtrl`, `ShoppingCartCtrl`, `AdminPanelCtrl` 등)로 명명되어야 합니다.
* 컨트롤러를 전역 변수로 정의하지 마세요 (비록 AngularJS가 지원하긴 하지만, 전역 네임스페이스를 오염시키는 나쁜 방식입니다).
* 컨트롤러를 정의할 때에는 아래 문법을 사용하세요.

  ```JavaScript
  function MyCtrl(dependency1, dependency2, ..., dependencyn) {
    // ...
  }
  module.controller('MyCtrl', MyCtrl);
  ```

  minification에서 발생하는 문제를 피하려면, [ng-annotate](https://github.com/olov/ng-annotate) (Grunt에서는 [grunt-ng-annotate](https://github.com/mzgol/grunt-ng-annotate)) 같은 도구를 사용해 자동으로 배열식 명명 문법을 생성시킬 수 있습니다.

  또는, 이렇게 `$inject`를 사용하는 방법도 있습니다.

   ```JavaScript
  angular
    .module("app")
    .controller("Homepage", Homepage);

  Homepage.$inject = ["$scope", "ngRoute"];

  function Homepage($scope, ngRoute) {
    // ...
  }
  ```


* `controller as` 문법을 사용하세요.

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

  또 다른 좋은 예제입니다.

  ```JavaScript
  app.controller('MainCtrl', MainCtrl);

  function MainCtrl () {
    var main = this;
    //뷰에서 어떻게 정의되는지 더 명시적으로 알 수 있음
    main.title = 'Some title';
    main.description = 'Some description';
  }
  ```

   이 문법을 사용해서 생기는 이점은 다음과 같습니다.
   * '독립된' 컴포넌트를 만듭니다. 즉, 프로퍼티들이 `$scope` prototype chain의 일부가 아닙니다. 이것은 좋은 방식인데, 왜냐 하면 `$scope` prototype 상속에는 주요한 결함이 있기 때문입니다 (아마 Angular 2에서 스코프 개념이 제거된 이유이기도 할 것입니다).
      * 데이터가 어디서부터 오는 건지 추적하기가 어렵습니다.
      * 스코프의 값을 바꾸는 것이 의도치 않는 곳에도 영향을 미칠 수 있습니다.
      * 리팩토링이 더 어렵습니다.
      * '[dot rule](http://jimhoskins.com/2012/12/14/nested-scopes-in-angularjs.html)'.
   * (`$scope.$broadcast` 같은) 특별한 경우가 아니라면 `$scope`를 사용하는 것을 자제하세요. AngularJS 2를 대비하는 데에도 도움이 됩니다.
   * 문법이 자바스크립트 생성자의 본질('vanilla')에 충실해집니다.

   `controller as`에 대해 더 알아보기: [digging-into-angulars-controller-as-syntax](http://toddmotto.com/digging-into-angulars-controller-as-syntax/)
* 만약 배열식 명명 문법을 사용한다면, 의존성의 원래 이름을 사용하세요. 이렇게 하면 코드가 읽기 쉬워집니다.

  ```JavaScript
  function MyCtrl(s) {
    // ...
  }

  module.controller('MyCtrl', ['$scope', MyCtrl]);
  ```

   which is less readable than:

  ```JavaScript
  function MyCtrl($scope) {
    // ...
  }
  module.controller('MyCtrl', ['$scope', MyCtrl]);
  ```

  이 방법은 스크롤이 필요할 정도로 코드가 길어졌을 때 특히 유용합니다. 만약 원래의 이름을 사용하지 않는다면 그 변수가 어떤 의존성이었는지 까먹게 될 것입니다.

* 컨트롤러는 가능한 가벼워야 합니다. 공통적으로 사용되는 함수은 서비스로 추상화하세요.
* 컨트롤러 내에서 비즈니스 로직(business logic)을 작성하지 마세요. 대신 서비스로 만든 `model`에서 비즈니스 로직을 처리하세요.
  예시:

  ```Javascript
  //비즈니스 로직을 컨트롤러 안에서 사용하는, 흔히 하는 실수입니다.
  angular.module('Store', [])
  .controller('OrderCtrl', function ($scope) {

    $scope.items = [];

    $scope.addToOrder = function (item) {
      $scope.items.push(item);//--> 컨트롤러 내의 비즈니스 로직
    };

    $scope.removeFromOrder = function (item) {
      $scope.items.splice($scope.items.indexOf(item), 1); //-->컨트롤러 내의 비즈니스 로직
    };

    $scope.totalPrice = function () {
      return $scope.items.reduce(function (memo, item) {
        return memo + (item.qty * item.price); //-->컨트롤러 내의 비즈니스 로직
      }, 0);
    };
  });
  ```

  만약 비즈니스 로직을 '모델' 서비스에 위임한다면, 컨트롤러는 이렇게 바뀌게 됩니다 (서비스-모델의 구현 내용은 '서비스로 모델 구현하기'를 보세요).

  ```Javascript
  //Order는 '모델'로 사용되었음
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

  Why business logic / app state inside controllers is bad?
  * Controllers instantiated for each view and dies when the view unloads
  * Controllers are not reusable - they are coupled with the view
  * Controllers are not meant to be injected


* 다른 컨트롤러와 통신이 필요한 경우에는 method invocation (자식 컨트롤러는 부모와 통신이 가능)이나 `$emit`, `$broadcast`, `$on` 메소드를 사용하세요. emit이나 broadcast된 메세지는 최소한의 내용만 담고 있어야 합니다.
* `$emit`나 `$broadcast`를 통해서 넘겨지는 모든 메시지는 이름 충돌이나 버그를 유발할 수 있기 때문에, 목록을 따로 작성해서 관리하세요.

   예시:

   ```JavaScript
   // app.js
   /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
   Custom events:
     - 'authorization-message' - description of the message
       - { user, role, action } - data format
         - user - a string, which contains the username
         - role - an ID of the role the user has
         - action - specific action the user tries to perform
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
   ```

* 데이터 형태를 바꿀(format) 때에는 formatting logic을 [필터](#필터)로 캡슐화하고 이를 의존성으로 선언하세요.

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
* In case of nested controllers use "nested scoping" (the `controllerAs` syntax):

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

# 디렉티브

* 디렉티브의 이름은 lowerCamelCase를 사용하세요.
* link 함수에서 `$scope` 가 아닌 `scope`를 사용하세요. complie 시 post/pre link 함수들을 호출할 때 인수(argument)들이 이미 정의된 상태로 넘어오기 때문에 DI를 사용해 이것들을 변경할 수 없습니다. 또한 $ 접두어로 시작하는 변수명은 AngularJS 자체 코드에서만 사용하는 스타일입니다.
* 여러분만의 유일한 접두어를 붙여서 사용하세요. 이는 다른 라이브러리와 이름이 충돌하는 것을 방지해줍니다.
* 접두어로 `ng`와 `ui`를 사용하지 마세요. 이 접두어는 AngularJS와 AngularJS UI에서만 사용하는 접두어입니다.
* DOM 조작은 오직 디렉티브를 통해서만 해주세요.
* 재사용 가능한 컴포넌트를 만들려면 독립된 스코프를 만들어주세요.
* 디렉티브는 주석이나 클래스보다는 요소(element)나 속성(attribute) 방식으로 사용하세요. 이렇게 하면 코드의 가독성이 향상됩니다.
* `$scope.$on('$destroy', fn)`를 사용하여 뒷정리를 해주세요. 이 방식은 third-party 플러그인을 디렉티브로 감싸서 사용할 때 특히 유용합니다.
* 신뢰할 수 없는 컨텐츠(untrusted content)를 다룰 때는 `$sce`를 사용하는 것을 잊지 마세요.

# 필터

* 필터 이름은 lowerCamelCase를 사용하세요.
* 필터는 가능한 한 가볍게 만들어주세요. 필터는 `$digest` 루프 에서 종종 호출되기 때문에 느린 필터 하나가 애플리케이션 전체를 느리게 만들 수 있습니다.
* 필터는 한 가지 작업만 하게 만드세요. 더 복잡한 조작은 기존 필터들을 연결시켜서(piping) 해결할 수 있습니다.

# 서비스

여기서는 AngularJS의 서비스 컴포넌트에 대해 기술하고 있습니다. 명시적으로 언급된 경우를 제외하면, 정의 방법 (provider, `.factory`, `.service`)과는 무관합니다.

* 서비스명은 camelCase나 CamelCase로 작성합니다.
	* 생성자 함수인 서비스의 이름은 다음과 같이 UpperCamelCase (PascalCase)를 사용합니다.
    
    ```JavaScript
    function MainCtrl($scope, User) {
      $scope.user = new User('foo', 42);
    }

    module.controller('MainCtrl', MainCtrl);

    function User(name, age) {
      this.name = name;
      this.age = age;
    }

    module.factory('User', function () {
      return User;
    });
    ```

  * 그 외의 서비스들은 모두 lowerCamelCase를 사용합니다.

* 모든 비즈니스 로직을 서비스로 캡슐화합니다. 그리고 이 서비스를 `model`로 사용하요. 예시:
  ```Javascript
  //Order는 '모델'임
  angular.module('Store')
  .factory('Order', function () {
      var add = function (item) {
        this.items.push (item);
      };

      var remove = function (item) {
        if (this.items.indexOf(item) > -1) {
          this.items.splice(this.items.indexOf(item), 1);
        }
      };

      var total = function () {
        return this.items.reduce(function (memo, item) {
          return memo + (item.qty * item.price);
        }, 0);
      };

      return {
        items: [],
        addToOrder: add,
        removeFromOrder: remove,
        totalPrice: total
      };
  });
  ```

  이 서비스를 사용하는 컨트롤러의 예시는 '컨트롤러 내에서 비즈니스 로직(business logic)을 작성하지 마세요'를 보세요.
* Services representing the domain preferably a `service` instead of a `factory`. In this way we can take advantage of the "klassical" inheritance easier:

  ```JavaScript
  function Human() {
    //body
  }
  Human.prototype.talk = function () {
    return "I'm talking";
  };

  function Developer() {
    //body
  }
  Developer.prototype = Object.create(Human.prototype);
  Developer.prototype.code = function () {
    return "I'm coding";
  };

  myModule.service('human', Human);
  myModule.service('developer', Developer);

  ```

* 세션 레벨의 캐시는 `$cacheFactory`를 사용하세요. 이는 요청(request) 결과나 무거운 연산결과를 캐시할 때 사용합니다.
* 설정(configuration)이 필요한 서비스라면, 서비스를 provider로 정의하고 `config` 콜백에서 설정을 합니다. 예시:

  ```JavaScript
  angular.module('demo', [])
  .config(function ($provide) {
    $provide.provider('sample', function () {
      var foo = 42;
      return {
        setFoo: function (f) {
          foo = f;
        },
        $get: function () {
          return {
            foo: foo
          };
        }
      };
    });
  });

  var demo = angular.module('demo');

  demo.config(function (sampleProvider) {
    sampleProvider.setFoo(41);
  });
  ```

# 템플릿

* 문서가 깜빡이는 현상을 방지하기 위해서 `{{ }}` 보다는 `ng-bind`나 `ng-cloak`을 사용하세요.
* 템플릿에서 복잡한 표현식을 피하세요.
* 이미지의 `src` 속성을 동적으로 설정해야 한다면 `src` 속성에 `{{ }}` 템플릿을 사용하지 말고, 그 대신 `ng-src` 디렉티브를 사용하세요.
* 앵커 태그(a)의 `href`를 동적으로 설정할 때에도 `href`에 `{{ }}` 템플릿을 사용하는 대신에 `ng-href` 디렉티브를 사용하세요.
* 스코프 변수를 문자열로 만들고 `style`에  `{{ }}`로 설정하는 것 보다는, 스코프 변수를 오브젝트로 만들고 'ng-style` 디렉티브에서 사용하는 게 낫습니다.

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

# 라우팅

* 뷰가 나타나기 전에 의존관계를 해결해야 한다면 `resolve`를 사용하세요.
* RESTful 요청을 `resolve` 콜백 내에서 직접 사용하지 말고, 서비스로 분리하세요. 이렇게 하면 캐싱이 가능해지고, 또한 관심사의 분리 원칙을 따르게 됩니다.

# 국제화

* 프레임워크 최신 버전 (>=1.4.0)에서는 내장된 국제화(i18n) 툴을 사용하세요. 구버전 (<1.4.0)에서는 [`angular-translate`](https://github.com/angular-translate/angular-translate)를 사용하세요.

# 성능

* Digest cycle 최적화

	* Watch only the most vital variables. `$digest` 루프를 명시적으로 실행할 필요가 있다면 (매우 예외적인 경우임), 꼭 필요한 경우에만 하세요 (예시: 실시간 통신을 하는 경우, 수신된 각각의 메세지가 `$digest` 루프를 유발해서는 안됩니다).
	* 초기 설정된 이후 다시는 변하지 않는 내용일 경우, one-time binding을 사용하세요 (AngularJS >= 1.3.0). AngularJS 구버전에서는 [`bindonce`](https://github.com/Pasvaz/bindonce) 같은 single-time watcher를 사용하세요.
	* `$watch`내의 연산은 가능한 간단하게 작성합니다. 하나의 `$watch` 안에서 무겁고 느린 연산을 하는 것은 애플리케이션 전체를 느리게 만들 것입니다 (자바스크립트는 싱글 스레드로 작동하므로 `$digest` 루프 역시 싱글 스레드로 작동합니다).
	* Collection을 watch할 때에는, 꼭 필요한 경우를 제외하면 deep watch를 하지 마세요.그 대신, 얕은 검사(shallow check)를 수행하는 `$watchCollection`을 사용하세요. (When watching collections, do not watch them deeply when not strongly required. Better use `$watchCollection`, which performs a shallow check for equality of the result of the watched expression and the previous value of the expression's evaluation.)
	* (`$timeout` 사용 시) 만약 콜백 함수에 영향을 받는 변수가 하나도 없는 경우에는, `$timeout` 함수의 세 번째 파라메터를 false로 설정해 `$digest` 루프를 건너뛰게 합니다.
	* 거의 바뀌지 않는 거대한 collection을 다룰 때에는, [불변 자료구조를 사용하세요](http://blog.mgechev.com/2015/03/02/immutability-in-angularjs-immutablejs).


* 네트워크 요청을 줄이기 위해서, 여러 html 템플릿 파일들을 하나로 묶고 메인 자바스크립트 파일에 캐싱하세요. [grunt-html2js](https://github.com/karlgoldstein/grunt-html2js)나 [gulp-html2js](https://github.com/fraserxu/gulp-html2js)를 사용하면 됩니다. 자세한 내용은 [여기](http://ng-learn.org/2014/08/Populating_template_cache_with_html2js/)와 [여기](http://slides.com/yanivefraim-1/real-world-angularjs#/34) 를 참고하세요. 이는 html 템플릿 조각이 아주 많은 프로젝트에서 유용합니다. 압축된(minified and gzipped) 메인 자바스크립트 파일 하나로 해결할 수 있기 때문입니다.

# 기여

이 문서는 communty-driven을 지향하며, 문서에 대한 기여는 언제든 대환영입니다.
부족한 부분을 보충해주시거나 여러분이 사용하는 모국어로 문서를 번역해주셔도 좋습니다.

# 기여자 명단

[<img alt="mgechev" src="https://avatars.githubusercontent.com/u/455023?v=3&s=117" width="117">](https://github.com/mgechev) |[<img alt="morizotter" src="https://avatars.githubusercontent.com/u/536954?v=3&s=117" width="117">](https://github.com/morizotter) |[<img alt="pascalockert" src="https://avatars.githubusercontent.com/u/4253438?v=3&s=117" width="117">](https://github.com/pascalockert) |[<img alt="chatii2412" src="https://avatars.githubusercontent.com/u/3435149?v=3&s=117" width="117">](https://github.com/chatii2412) |[<img alt="yanivefraim" src="https://avatars.githubusercontent.com/u/1336186?v=3&s=117" width="117">](https://github.com/yanivefraim) |[<img alt="ericguirbal" src="https://avatars.githubusercontent.com/u/322135?v=3&s=117" width="117">](https://github.com/ericguirbal) |
:---: |:---: |:---: |:---: |:---: |:---: |
[mgechev](https://github.com/mgechev) |[morizotter](https://github.com/morizotter) |[pascalockert](https://github.com/pascalockert) |[chatii2412](https://github.com/chatii2412) |[yanivefraim](https://github.com/yanivefraim) |[ericguirbal](https://github.com/ericguirbal) |

[<img alt="agnislav" src="https://avatars.githubusercontent.com/u/364255?v=3&s=117" width="117">](https://github.com/agnislav) |[<img alt="mainyaa" src="https://avatars.githubusercontent.com/u/800781?v=3&s=117" width="117">](https://github.com/mainyaa) |[<img alt="ray7551" src="https://avatars.githubusercontent.com/u/1812388?v=3&s=117" width="117">](https://github.com/ray7551) |[<img alt="LeonardCModoran" src="https://avatars.githubusercontent.com/u/8460505?v=3&s=117" width="117">](https://github.com/LeonardCModoran) |[<img alt="elfinxx" src="https://avatars.githubusercontent.com/u/4384908?v=3&s=117" width="117">](https://github.com/elfinxx) |[<img alt="Xuefeng-Zhu" src="https://avatars.githubusercontent.com/u/5875315?v=3&s=117" width="117">](https://github.com/Xuefeng-Zhu) |
:---: |:---: |:---: |:---: |:---: |:---: |
[agnislav](https://github.com/agnislav) |[mainyaa](https://github.com/mainyaa) |[ray7551](https://github.com/ray7551) |[LeonardCModoran](https://github.com/LeonardCModoran) |[elfinxx](https://github.com/elfinxx) |[Xuefeng-Zhu](https://github.com/Xuefeng-Zhu) |

[<img alt="SullyP" src="https://avatars.githubusercontent.com/u/12484363?v=3&s=117" width="117">](https://github.com/SullyP) |[<img alt="lukaszklis" src="https://avatars.githubusercontent.com/u/11782?v=3&s=117" width="117">](https://github.com/lukaszklis) |[<img alt="giacomocusinato" src="https://avatars.githubusercontent.com/u/7659518?v=3&s=117" width="117">](https://github.com/giacomocusinato) |[<img alt="susieyy" src="https://avatars.githubusercontent.com/u/62295?v=3&s=117" width="117">](https://github.com/susieyy) |[<img alt="rubystream" src="https://avatars.githubusercontent.com/u/3200?v=3&s=117" width="117">](https://github.com/rubystream) |[<img alt="jmblog" src="https://avatars.githubusercontent.com/u/86085?v=3&s=117" width="117">](https://github.com/jmblog) |
:---: |:---: |:---: |:---: |:---: |:---: |
[SullyP](https://github.com/SullyP) |[lukaszklis](https://github.com/lukaszklis) |[giacomocusinato](https://github.com/giacomocusinato) |[susieyy](https://github.com/susieyy) |[rubystream](https://github.com/rubystream) |[jmblog](https://github.com/jmblog) |

[<img alt="cironunes" src="https://avatars.githubusercontent.com/u/469908?v=3&s=117" width="117">](https://github.com/cironunes) |[<img alt="guiltry" src="https://avatars.githubusercontent.com/u/1484308?v=3&s=117" width="117">](https://github.com/guiltry) |[<img alt="MertSKaan" src="https://avatars.githubusercontent.com/u/5517637?v=3&s=117" width="117">](https://github.com/MertSKaan) |[<img alt="mingchen" src="https://avatars.githubusercontent.com/u/1002838?v=3&s=117" width="117">](https://github.com/mingchen) |[<img alt="tornad" src="https://avatars.githubusercontent.com/u/2128499?v=3&s=117" width="117">](https://github.com/tornad) |[<img alt="cavarzan" src="https://avatars.githubusercontent.com/u/3915288?v=3&s=117" width="117">](https://github.com/cavarzan) |
:---: |:---: |:---: |:---: |:---: |:---: |
[cironunes](https://github.com/cironunes) |[guiltry](https://github.com/guiltry) |[MertSKaan](https://github.com/MertSKaan) |[mingchen](https://github.com/mingchen) |[tornad](https://github.com/tornad) |[cavarzan](https://github.com/cavarzan) |

[<img alt="kuzzmi" src="https://avatars.githubusercontent.com/u/1727140?v=3&s=117" width="117">](https://github.com/kuzzmi) |[<img alt="cryptojuice" src="https://avatars.githubusercontent.com/u/458883?v=3&s=117" width="117">](https://github.com/cryptojuice) |[<img alt="astalker" src="https://avatars.githubusercontent.com/u/1486567?v=3&s=117" width="117">](https://github.com/astalker) |[<img alt="clbn" src="https://avatars.githubusercontent.com/u/1071933?v=3&s=117" width="117">](https://github.com/clbn) |[<img alt="atodorov" src="https://avatars.githubusercontent.com/u/1002300?v=3&s=117" width="117">](https://github.com/atodorov) |[<img alt="apetro" src="https://avatars.githubusercontent.com/u/952283?v=3&s=117" width="117">](https://github.com/apetro) |
:---: |:---: |:---: |:---: |:---: |:---: |
[kuzzmi](https://github.com/kuzzmi) |[cryptojuice](https://github.com/cryptojuice) |[astalker](https://github.com/astalker) |[clbn](https://github.com/clbn) |[atodorov](https://github.com/atodorov) |[apetro](https://github.com/apetro) |

[<img alt="whoan" src="https://avatars.githubusercontent.com/u/7103003?v=3&s=117" width="117">](https://github.com/whoan) |[<img alt="valgreens" src="https://avatars.githubusercontent.com/u/903263?v=3&s=117" width="117">](https://github.com/valgreens) |[<img alt="meetbryce" src="https://avatars.githubusercontent.com/u/1845143?v=3&s=117" width="117">](https://github.com/meetbryce) |[<img alt="dwmkerr" src="https://avatars.githubusercontent.com/u/1926984?v=3&s=117" width="117">](https://github.com/dwmkerr) |[<img alt="dchest" src="https://avatars.githubusercontent.com/u/52677?v=3&s=117" width="117">](https://github.com/dchest) |[<img alt="gsamokovarov" src="https://avatars.githubusercontent.com/u/604618?v=3&s=117" width="117">](https://github.com/gsamokovarov) |
:---: |:---: |:---: |:---: |:---: |:---: |
[whoan](https://github.com/whoan) |[valgreens](https://github.com/valgreens) |[meetbryce](https://github.com/meetbryce) |[dwmkerr](https://github.com/dwmkerr) |[dchest](https://github.com/dchest) |[gsamokovarov](https://github.com/gsamokovarov) |

[<img alt="grvcoelho" src="https://avatars.githubusercontent.com/u/7416751?v=3&s=117" width="117">](https://github.com/grvcoelho) |[<img alt="yassirh" src="https://avatars.githubusercontent.com/u/4649139?v=3&s=117" width="117">](https://github.com/yassirh) |[<img alt="bargaorobalo" src="https://avatars.githubusercontent.com/u/993001?v=3&s=117" width="117">](https://github.com/bargaorobalo) |[<img alt="hermankan" src="https://avatars.githubusercontent.com/u/2899106?v=3&s=117" width="117">](https://github.com/hermankan) |[<img alt="jabhishek" src="https://avatars.githubusercontent.com/u/1830537?v=3&s=117" width="117">](https://github.com/jabhishek) |[<img alt="jesselpalmer" src="https://avatars.githubusercontent.com/u/682097?v=3&s=117" width="117">](https://github.com/jesselpalmer) |
:---: |:---: |:---: |:---: |:---: |:---: |
[grvcoelho](https://github.com/grvcoelho) |[yassirh](https://github.com/yassirh) |[bargaorobalo](https://github.com/bargaorobalo) |[hermankan](https://github.com/hermankan) |[jabhishek](https://github.com/jabhishek) |[jesselpalmer](https://github.com/jesselpalmer) |

[<img alt="capaj" src="https://avatars.githubusercontent.com/u/1305378?v=3&s=117" width="117">](https://github.com/capaj) |[<img alt="johnnyghost" src="https://avatars.githubusercontent.com/u/1117330?v=3&s=117" width="117">](https://github.com/johnnyghost) |[<img alt="jordanyee" src="https://avatars.githubusercontent.com/u/3303098?v=3&s=117" width="117">](https://github.com/jordanyee) |[<img alt="nacyot" src="https://avatars.githubusercontent.com/u/148919?v=3&s=117" width="117">](https://github.com/nacyot) |[<img alt="mariolamacchia" src="https://avatars.githubusercontent.com/u/6282722?v=3&s=117" width="117">](https://github.com/mariolamacchia) |[<img alt="mischkl" src="https://avatars.githubusercontent.com/u/8177979?v=3&s=117" width="117">](https://github.com/mischkl) |
:---: |:---: |:---: |:---: |:---: |:---: |
[capaj](https://github.com/capaj) |[johnnyghost](https://github.com/johnnyghost) |[jordanyee](https://github.com/jordanyee) |[nacyot](https://github.com/nacyot) |[mariolamacchia](https://github.com/mariolamacchia) |[mischkl](https://github.com/mischkl) |

[<img alt="kirstein" src="https://avatars.githubusercontent.com/u/426442?v=3&s=117" width="117">](https://github.com/kirstein) |[<img alt="mo-gr" src="https://avatars.githubusercontent.com/u/95577?v=3&s=117" width="117">](https://github.com/mo-gr) |[<img alt="mortonfox" src="https://avatars.githubusercontent.com/u/495892?v=3&s=117" width="117">](https://github.com/mortonfox) |[<img alt="dreame4" src="https://avatars.githubusercontent.com/u/277870?v=3&s=117" width="117">](https://github.com/dreame4) |[<img alt="nikshulipa" src="https://avatars.githubusercontent.com/u/1872256?v=3&s=117" width="117">](https://github.com/nikshulipa) |[<img alt="olov" src="https://avatars.githubusercontent.com/u/19247?v=3&s=117" width="117">](https://github.com/olov) |
:---: |:---: |:---: |:---: |:---: |:---: |
[kirstein](https://github.com/kirstein) |[mo-gr](https://github.com/mo-gr) |[mortonfox](https://github.com/mortonfox) |[dreame4](https://github.com/dreame4) |[nikshulipa](https://github.com/nikshulipa) |[olov](https://github.com/olov) |

[<img alt="vorktanamobay" src="https://avatars.githubusercontent.com/u/2623355?v=3&s=117" width="117">](https://github.com/vorktanamobay) |[<img alt="sahat" src="https://avatars.githubusercontent.com/u/544954?v=3&s=117" width="117">](https://github.com/sahat) |[<img alt="ganchiku" src="https://avatars.githubusercontent.com/u/149973?v=3&s=117" width="117">](https://github.com/ganchiku) |[<img alt="kaneshin" src="https://avatars.githubusercontent.com/u/936972?v=3&s=117" width="117">](https://github.com/kaneshin) |[<img alt="imaimiami" src="https://avatars.githubusercontent.com/u/2256037?v=3&s=117" width="117">](https://github.com/imaimiami) |[<img alt="andela-abankole" src="https://avatars.githubusercontent.com/u/11836769?v=3&s=117" width="117">](https://github.com/andela-abankole) |
:---: |:---: |:---: |:---: |:---: |:---: |
[vorktanamobay](https://github.com/vorktanamobay) |[sahat](https://github.com/sahat) |[ganchiku](https://github.com/ganchiku) |[kaneshin](https://github.com/kaneshin) |[imaimiami](https://github.com/imaimiami) |[andela-abankole](https://github.com/andela-abankole) |

[<img alt="thomastuts" src="https://avatars.githubusercontent.com/u/1914255?v=3&s=117" width="117">](https://github.com/thomastuts) |[<img alt="UrielMiranda" src="https://avatars.githubusercontent.com/u/12901838?v=3&s=117" width="117">](https://github.com/UrielMiranda) |[<img alt="VladimirKazan" src="https://avatars.githubusercontent.com/u/3514422?v=3&s=117" width="117">](https://github.com/VladimirKazan) |[<img alt="dooart" src="https://avatars.githubusercontent.com/u/371426?v=3&s=117" width="117">](https://github.com/dooart) |[<img alt="grapswiz" src="https://avatars.githubusercontent.com/u/309459?v=3&s=117" width="117">](https://github.com/grapswiz) |[<img alt="coderhaoxin" src="https://avatars.githubusercontent.com/u/2569835?v=3&s=117" width="117">](https://github.com/coderhaoxin) |
:---: |:---: |:---: |:---: |:---: |:---: |
[thomastuts](https://github.com/thomastuts) |[UrielMiranda](https://github.com/UrielMiranda) |[VladimirKazan](https://github.com/VladimirKazan) |[dooart](https://github.com/dooart) |[grapswiz](https://github.com/grapswiz) |[coderhaoxin](https://github.com/coderhaoxin) |

[<img alt="giantray" src="https://avatars.githubusercontent.com/u/5054377?v=3&s=117" width="117">](https://github.com/giantray) |[<img alt="ntaoo" src="https://avatars.githubusercontent.com/u/511213?v=3&s=117" width="117">](https://github.com/ntaoo) |[<img alt="kuzmeig1" src="https://avatars.githubusercontent.com/u/8707951?v=3&s=117" width="117">](https://github.com/kuzmeig1) |
:---: |:---: |:---: |
[giantray](https://github.com/giantray) |[ntaoo](https://github.com/ntaoo) |[kuzmeig1](https://github.com/kuzmeig1) |

