[![https://gitter.im/mgechev/angularjs-style-guide 에서 채팅에 참여하세요.](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/mgechev/angularjs-style-guide?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# 소개

이 스타일 가이드의 목표는 AngularJS 애플리케이션을 제작하는 데 있어서 모범 사례(best practice)와 스타일 가이드라인을 제시하는 것입니다.
이 모범 사례들은 아래에서 참고했습니다.

0. AngularJS 소스 코드
0. 제가 읽은 소스 코드와 문서들
0. 제 경험

**주의 1**: 이 스타일 가이드는 아직 작성 중입니다. 이 문서를 커뮤니티가 주도하도록 만드는 게 주요 목표이며, 이를 위해 기여를 해주신다면 커뮤니티 전체가 크게 감사할 것입니다.

**주의 2**: 이 번역본을 따르기 이전에, 최신판인지 확인하십시오. AngularJS 스타일 가이드의 최신 버전은 [영문 문서](https://github.com/mgechev/angularjs-style-guide)입니다.

이 스타일 가이드에서는 자바스크립트 개발 가이드라인을 제공하진 않습니다. 이와 관련된 문서는 아래에서 찾을 수 있습니다.

0. [Google 자바스크립트 스타일 가이드](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
0. [Mozilla 자바스크립트 스타일 가이드](https://developer.mozilla.org/en-US/docs/Developer_Guide/Coding_Style)
0. [GitHub's 자바스크립트 스타일 가이드](https://github.com/styleguide/javascript)
0. [Douglas Crockford's 자바스크립트 스타일 가이드](http://javascript.crockford.com/code.html)
0. [Airbnb 자바스크립트 스타일 가이드](https://github.com/airbnb/javascript)
0. [Idiomatic 자바스크립트 스타일 가이드](https://github.com/rwaldron/idiomatic.js/)

AngularJS 개발에 대해서는 [Google 자바스크립트 스타일 가이드](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)를 추천합니다.

AngularJS GitHub 위키에 [ProLoser](https://github.com/ProLoser)가 작성한 비슷한 항목이 있습니다. [여기](https://github.com/angular/angular.js/wiki)에서 확인할 수 있습니다.

# 번역

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
* [기여자](#기여자)

# 일반

## 디렉토리 구조

규모가 큰 AngularJS 애플리케이션에는 많은 컴포넌트가 있기 때문에 계층적(hierarchy)으로 디렉토리 구조를 잡는 것이 좋습니다.
주로 두 가지 접근법이 사용됩니다.

* 컴포넌트 타입 별로 상위 디렉토리를 만들고, 기능별로 하위 디렉토리를 구성.

이러한 접근법을 사용한 디렉토리 구조는 다음과 같습니다.

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

* 디렉토리 이름이 여러 단어로 되어 있으면, lisp-case 문법을 사용합니다.

```
app
 ├── app.js
 └── my-complex-module
     ├── controllers
     ├── directives
     ├── filters
     └── services
```

* 디렉티브 디렉토리를 만들 땐 디렉티브에 관련된 파일들(템플릿, CSS/SASS 파일, 자바스크립트)을 한 폴더에 모읍니다. 이런 방식으로 디렉토리를 구성한다면 프로젝트 어디서나 이 구조를 일관적으로 사용할 수 있습니다.

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

이러한 접근법은 위에 제시한 두 가지 디렉토리 구성법 모두에서 사용할 수 있습니다.
* 유닛 테스트는 컴포넌트와 같은 디렉토리에 있어야 합니다. 이 방식은 컴포넌트를 수정했을 때 테스트 파일을 찾기 쉽게 해줍니다. 또한, 테스트 파일은 참고 문서가 되거나 컴포넌트 사용법을 보여주는 역할도 합니다.

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

각 컴포넌트의 명명 규칙은 각 컴포넌트 절에서 설명합니다.

## 마크업

[TLDR;](http://developer.yahoo.com/blogs/ydn/high-performance-sites-rule-6-move-scripts-bottom-7200.html) 스크립트들은 하단에 넣으세요.

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

AngularJS 디렉티브는 간결하게 만들고, 표준 속성 다음에 위치시킵니다. 이렇게 하면 코드를 읽기가 쉬워집니다. 또한, 추가적인 속성들이 일관된 위치에 모여있기 때문에(즉, 가장 마지막) 유지 보수가 쉬워집니다.

```html
<form class="frm" ng-submit="login.authenticate()">
  <div>
    <input class="ipt" type="text" placeholder="name" require ng-model="user.name">
  </div>
</form>
```

다른 HTML atribute들은 이 코드 가이드의 [추천](http://mdo.github.io/code-guide/#html-attribute-order)을 따릅니다.

## 명명 규칙
모든 요소에 대한 명명 규칙이 아래 표에 나와있습니다.

요소 | 명명 스타일 | 예시 | 용법
----|------|----|--------
모듈 | lowerCamelCase  | angularApp |
컨트롤러 | Functionality + 'Ctrl'  | AdminCtrl |
디렉티브 | lowerCamelCase  | userInfo |
필터 | lowerCamelCase | userFilter |
서비스 | UpperCamelCase | User | 생성자
서비스 | lowerCamelCase | dataFactory | 기타

## 기타

* 다음과 같은 사용을 권장합니다.
    * `setTimeout` 대신 `$timeout`
    * `setInterval` 대신 `$interval`
    * `window` 대신 `$window`
    * `document` 대신 `$document`
    * `$.ajax` 대신 `$http`
    * `window.location`나 `$window.location` 대신 `$location`

이를 통해 테스트를 쉽게 만들고 예상치 못한 작동을 방지할 수 있습니다 (예를 들어, `setTimeout`에서 `$scope.$apply`를 잊는 경우).

* 아래의 툴을 사용해 작업 흐름을 자동화하세요.
    * [NPM](https://www.npmjs.com/)
    * [Grunt](http://gruntjs.com)
    * [Gulp](http://gulpjs.com)
    * [Yeoman](http://yeoman.io)
    * [Bower](http://bower.io)


* 콜백 대신에 promises(`$q`)를 사용하세요. $q를 사용하면 우아하고 깔끔한 코드가 되며, 여러분을 콜백 지옥에서 구원해줄 것입니다.
* 가능한 `$http` 보다는 `$resource`를 사용하세요. 높은 수준의 추상화는 자질구레한 작업으로부터 해방시켜줍니다.
* AngularJS pre-minifier ([ng-annotate](https://github.com/olov/ng-annotate))를 사용해 minification 시의 문제를 미리 방지합니다.
* 전역 변수를 사용하지 마세요. 모든 의존성은 의존성 주입으로 해결하시기 바랍니다. 이는 테스트 시 발생하는 버그와 monkey patching을 방지해줄 것입니다.
* Grunt나 Gulp를 사용해 당신의 코드를 즉시실행함수(IIFE)로 감싸 전역 변수를 없애주세요. 이러한 목적으로 [grunt-wrap](https://www.npmjs.com/package/grunt-wrap)나 [gulp-wrap](https://www.npmjs.com/package/gulp-wrap/) 같은 플러그인를 사용할 수 있습니다. 다음은 Gulp를 사용한 예시입니다.

    ```Javascript
    gulp.src("./src/*.js")
    .pipe(wrap('(function(){\n"use strict";\n<%= contents %>\n})();'))
    .pipe(gulp.dest("./dist"));
    ```
* `$scope`를 오염시키지 마세요. 오직 템플릿에서 사용하는 함수와 변수들만 추가하세요.
* [`nginit`대신 컨트롤러](https://github.com/angular/angular.js/pull/4366/files)를 사용하도록 하세요. `ngInit`를 적절하게 사용하는 유일한 상황은 `ngRepeat` 프로퍼티의 별칭을 만드는 일입니다. 이 외의 모든 경우에는, 스코프 내의 값을 초기화하는 데에 `ngInit` 대신 컨트롤러를 사용해야 합니다. The expression passed to `ngInit` should go through lexing, parsing and evaluation by the Angular interpreter implemented inside the `$parse` service. This leads to:
    - Performance impact, because the interpreter is implemented in JavaScript
    - The caching of the parsed expressions inside the `$parse` service doesn't make a lot of sense in most cases, since `ngInit` expressions are often evaluated only once
    - Is error-prone, since you're writing strings inside your templates, there's no syntax highlighting and further support by your editor
    - No run-time errors are thrown
* 변수, 프로퍼티, 메소드 이름에 `$` 접두어를 사용하지 않습니다. `$`로 시작하는 명명법은 AngularJS 자체에서만 사용하도록 제한되어 있습니다.
* 앱 내에서 `JQUERY`를 사용하지 마세요. 꼭 필요하다면, `angular.element` 함수로 `JQLite`를 사용하시기 바랍니다.
* Angular JS의 의존성주입(DI) 메커니즘으로 의존성을 처리할 때에는, 유형별로 의존성들을 정렬하세요. AngularJS 내장 의존성을 가장 먼저, 그 다음 커스텀 의존성을 나열합니다.

```javascript
module.factory('Service', function ($rootScope, $timeout, MyCustomDependency1, MyCustomDependency2) {
  return {
    //Something
  };
});
```

# 모듈

* 모듈의 이름은 lowerCamelCase로 명명되어야 합니다. 모듈 `a`의 하위 모듈 `b`를 가리키려면 `a.b`와 같이 네임스페이스를 중첩시킬 수 있습니다.

	일반적으로 두 가지 방법으로 모듈의 구조화합니다.

	0. 기능적으로
	0. 컴포넌트 타입별로

	두 접근법에는 큰 차이가 없지만, 첫 번째 방법이 좀 더 명확합니다. 또한, 모듈의 지연 로딩(lazy-loading)이 지원된다면 (아직 AngularJS 로드맵에 없습니다), 애플리케이션의 성능을 향상시킬 수 있습니다.

# 컨트롤러

* 컨트롤러에서 DOM을 조작하지 마세요. 만약 그렇게 한다면, 컨트롤러를 테스트하기 어려워지고, [관심사의 분리](https://en.wikipedia.org/wiki/Separation_of_concerns) 원칙을 위반하게 됩니다. 컨트롤러 대신 디렉티브를 사용하시기 바랍니다.
* 컨트롤러 이름은 컨트롤러의 기능 (예를 들어 shopping cart, homepage, admin panel)에 따라 명명해야 하며, 이름의 끝에는 `Ctrl`을 붙여줍니다.
* 컨트롤러는 자바스크립트의 [생성자](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)이며, 따라서 UpperCamelCase (`HomePageCtrl`, `ShoppingCartCtrl`, `AdminPanelCtrl` 등)로 명명되어야 합니다.
* 컨트롤러를 전역 변수로 정의하지 마세요 (비록 AngularJS가 지원하긴 하지만, 전역 네임스페이스를 오염시키는 않좋은 방식입니다).
* 컨트롤러를 정의할 때에는 아래 문법을 사용하세요.

  ```JavaScript
  function MyCtrl(dependency1, dependency2, ..., dependencyn) {
    // ...
  }
  module.controller('MyCtrl', MyCtrl);
  ```

  minification에서 발생하는 문제를 피하려면, [ng-annotate](https://github.com/olov/ng-annotate) (Grunt에서는 [grunt-ng-annotate](https://github.com/mzgol/grunt-ng-annotate)) 같은 도구를 사용해 자동으로 배열식 명명 문법을 생성할 수 있습니다.
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
    //뷰에서 어떻게 정의되는지 더 확실하게 시각적으로 알려줌
    main.title = 'Some title';
    main.description = 'Some description';
  }
  ```

   이 문법을 사용하면 생기는 이점은 다음과 같습니다.
   * '독립된' 컴포넌트를 만듭니다. 즉, 속성들이 `$scope` prototype chain의 일부가 아닙니다. 이것은 좋은 사용법인데, 왜냐 하면 `$scope` prototype 상속에는 주요한 결함이 있기 때문입니다 (아마 Angular 2에서 스코프 개념이 제거된 이유이기도 할 것입니다).
      * 데이터가 어디서부터 오는 건지 추적하기가 어렵습니다.
      * 스코프의 값을 바꾸는 것이 의도하지 않는 곳에 영향을 미칠 수 있습니다.
      * 리팩토링이 더 어렵습니다.
      * '[점 규칙(dot rule)](http://jimhoskins.com/2012/12/14/nested-scopes-in-angularjs.html)'.
   * Removes the use of `$scope` when no need for special operations (like `$scope.$broadcast`). This is a good preparation for AngularJS V2.
   * 문법이 자바스크립트 생성자의 기본('vanilla')에 충실해집니다.

   `controller as`에 대해 더 알아보기: [digging-into-angulars-controller-as-syntax](http://toddmotto.com/digging-into-angulars-controller-as-syntax/)
* 만약 배열식 명명 문법을 사용한다면, 컨트롤러의 의존성의 원래 이름을 사용하세요. 이를 통해 읽기 쉬운 코드를 만들 수 있습니다.

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

  이 방법은 스크롤이 필요할 정도로 코드가 길어졌을 때 특히 유용합니다. 원래의 이름을 사용하지 않으면 그 변수가 어떤 의존성이었는지 까먹게 될 것입니다.

* 컨트롤러는 가능한 가벼워야(lean) 합니다. 공통적으로 사용되는 함수은 서비스로 추상화하세요.
* 컨트롤러 내에서 비즈니스 로직(business logic)을 작성하지 마세요. 대신 서비스로 만든 `model`에서 비즈니스 로직을 처리하세요.
  For example:

  ```Javascript
  //비즈니스 로직을 컨트롤러 안에서 사용하는 흔한 방식(즉, 나쁜 예)입니다.
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

  만약 비즈니스 로직을 '모델' 서비스에 위임한다면, 컨트롤러는 이렇게 바뀌게 됩니다 (서비스-모델의 구현 내용은 '서비스로 모델 구현하기'를 보세요):

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


* 다른 컨트롤러와 통신이 필요한 경우에는 메소드 호출 (자식 컨트롤러가 부모와 통신하고 싶을때 가능함)이나 `$emit`, `$broadcast`, `$on` 메소드를 사용하세요. emit이나 broadcast된 메세지는 최소한의 내용만 담고 있어야 합니다.
* `$emit`나 `$broadcast`를 통해서 넘겨지는 모든 메시지는 이름 충돌이나 버그를 유발할 수 있기 때문에, 목록을 작성해서 관리하세요.

   Example:

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

* 데이터 형태를 바꿀(format) 때에는 형식화 로직(formatting logic)을 [필터](#필터)로 만들고 이를 의존성으로 선언하세요.

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
* link 함수에서 `$scope` 대신 `scope`를 사용하세요. complie 시 post/pre link 함수들을 호출할 때 인수(argument)들이 이미 정의되어 넘어오기 때문에 DI를 사용해 이것들을 변경할 수 없습니다. 이 스타일은 AngularJS 소스코드에서 사용하는 스타일입니다.
* 여러분만의 유일한 접두어를 붙여서 사용하세요. 이는 third-party 라이브러리와의 이름 충돌을 방지해줍니다.
* `ng`와 `ui`를 접두어로 사용하지 마세요. 이 접두어는 AngularJS와 AngularJS UI에서만 사용되는 접두어입니다.
* DOM 조작은 오직 디렉티브를 통해서만 해주세요.
* 재사용 가능한 컴포넌트를 만들려면 독립된 스코프를를 만들어주세요.
* 디렉티브는 주석이나 클래스보단 요소(element)나 속성(attribute)으로 사용하세요. 이는 코드의 가독성을 향상시켜줍니다.
* `$scope.$on('$destroy', fn)`를 사용하여 뒷정리를 해주세요. 이 방식은 third-party 플러그인을 디렉티브로 감싸서 사용할 때 특히 유용합니다.
* 신뢰할 수 없는 컨텐츠(untrusted content)를 다룰 때는 `$sce`를 사용하는 것을 잊지 마세요.

# 필터

* 이름은 lowerCamelCase를 사용하세요
* 필터는 가능한 한 가볍게 만들어주세요. 필터는 간혹 `$digest` 루프 내에서 호출될 수 있기 때문에 느린 필터는 애플리케이션 전체를 느리게 만들 수 있습니다.
* 필터는 한 가지 일만 하게 하세요. 좀 더 복잡한 조작은 존재하는 필터들을 묶어서(piping) 해결할 수 있습니다.


# 서비스

* 서비스명은 camelCase나 CamelCase로 작성.
	* 생성자(constructor) 함수와 같은 서비스의 이름은 UpperCamelCase (PascalCase)를 사용합니다. 사용 예:
    
    ```JavaScript
    module.controller('MainCtrl', function ($scope, User) {
      $scope.user = new User('foo', 42);
    });

    module.factory('User', function () {
      return function User(name, age) {
        this.name = name;
        this.age = age;
      };
	});
    ```

  * 그 외의 서비스들은 lowerCamelCase를 사용합니다.
  
* 서비스엔 비지니스 로직을 캡슐화합니다.
* 도메인 나타내는 서비스들은 `factory` 대신에 `service`를 선호합니다. 이 방법으로 "예전의"("klassical") 상속의 장점을 누릴 수 있습니다.

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

    myModule.service('Human', Human);
    myModule.service('Developer', Developer);
	```

* 세션 수준의 캐시는 `$cacheFactory`를 사용하세요. 이는 요청(request)나 무거운 처리를 캐시하고 싶을 때 사용합니다.
* 설정 정의가 필요 한 서비스라면 provider나 다음과 같은 `config` 콜백을 이용해 설정할 수 있습니다.

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

* 문서가 반짝이는 현상을 방지하기 위해서 `{{}}` 대신에 `ng-bind`나 `ng-cloak`를 사용하세요.
* 템플릿에서는 복잡한 표현(expression) 작성을 가능한 자제합니다.
* 동적으로 src 속성을 사용해야 한다면 `src`를 `{{}}`와 같이 사용하는 대신에 `ng-src`를 사용하세요.
* 앵커(anchor)태그의 `href`를 동적으로 설정할 때 `href`안에 `{{ }}`템플릿보다는 `ng-href`를 사용하세요.

* `style`속성을 $scope에 정의된 문자열로 사용하고 싶을 때 `{{}}`를 사용하는 대신에 `ng-style`를 사용하면 $scope에 객체를 선언해 여러 가지 속성을 한꺼번에 지정할 수 있습니다.
```HTML
...
$scope.divStyle = {
  width: 200,
  position: 'relative'
};
...
<div ng-style="divStyle">IE에서도 작동하는 아름다운 스타일을 가진 div</div>;
```

# 라우팅

* view가 보여지기 전에 `resolve`를 사용해 의존관계를 해결해주세요.

# 국제화

# 성능

* Digest cycle 최적화

	* 가장 중요한 변수만 감시합니다. When required to invoke the `$digest` loop explicitly (it should happen only in exceptional cases), invoke it only when required (예를 들어 실시간 통신이 필요한 경우 각각의 메시지를 받을 때 `$digest` loop를 일으키지 않아야 합니다).
	* 초기 설정된 이후 다시는 변하지 않는 내용일 경우, AngularJS 구버전에서는 [`bindonce`](https://github.com/Pasvaz/bindonce) 같은 single-time watcher를, Angular 1.3.0 이상에서는 one-time binding을 사용합니다.
	* `$watch`내의 연산은 가능한 간단하게 작성합니다. 하나의 `$watch` 안에서 무겁고 느린 연산 작업을 하는 것은 애플리케이션 전체를 느리게 만들 것입니다 (자바스크립트는 싱글 스레드로 작동하므로 `$digest` 루프 역시 싱글 스레드로 작동합니다).
	* When watching collections, do not watch them deeply when not strongly required. Better use `$watchCollection`, which performs a shallow check for equality of the result of the watched expression and the previous value of the expression's evaluation.
	* (`$timeout` 사용 시) 콜백 함수의 호출 시 영향을 받는 변수(watched variables)가 없다면, `$timeout` 함수의 세 번째 파라메터를 false로 설정해 `$digest` 루프를 건너뛰게 합니다.
	* When dealing with big collections, which change rarely, [use immutable data structures](http://blog.mgechev.com/2015/03/02/immutability-in-angularjs-immutablejs/).

* Consider decreasing number of network requests by bundling/caching html template files into your main javascript file, using [grunt-html2js](https://github.com/karlgoldstein/grunt-html2js) / [gulp-html2js](https://github.com/fraserxu/gulp-html2js). See [here](http://ng-learn.org/2014/08/Populating_template_cache_with_html2js/) and [here](http://slides.com/yanivefraim-1/real-world-angularjs#/34) for details. This is particularly useful when the project has a lot of small html templates that can be a part of the main (minified and gzipped) javascript file.


# 기여

이 문서는 communty-driven을 지향하며, 문서에 대한 기여는 언제든 대환영입니다.
부족한 부분을 보충해주시거나 여러분이 사용하는 모국어로 문서를 번역해주셔도 좋습니다.

# 기여자