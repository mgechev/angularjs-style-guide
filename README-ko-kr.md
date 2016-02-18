[![https://gitter.im/mgechev/angularjs-style-guide 에서 채팅에 참여하세요.](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/mgechev/angularjs-style-guide?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# 소개

이 스타일 가이드의 목표는 AngularJS 애플리케이션을 제작하는 데 있어서 현재의 모범 사례(Best practice)를 제시하는 것입니다.
이 문서의 모범 사례는 아래 자료들로부터 수집되었습니다.

0. AngularJS 소스 코드
0. 제가 읽은 소스 코드와 문서들
0. 제 경험

**주의 1**: 이 문서는 아직 작성 중이며 이 문서의 주목표는 공동체 주도(community-driven)로 진행되어 모든 공동체가 스타일 차이를 줄여 이해하기 쉽게 하는 것입니다.

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
    * [기타](#기타)
* [모듈](#모듈)
* [컨트롤러](#컨트롤러)
* [디렉티브](#디렉티브)
* [필터](#필터)
* [서비스](#서비스)
* [템플릿](#템플릿)
* [라우팅](#라우팅)
* [성능](#성능)
* [기여](#기여)

# 일반

## 디렉토리 구조

규모가 큰 AngularJS 애플리케이션엔 다수의 컴포넌트가 있기 때문에 계층적(hierarchy)으로 디렉토리 구조를 잡는 것이 좋습니다. 주로 두 가지 접근법이 사용됩니다.

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

이러한 디렉티브 디렉토리 구성은 위에서 제시한 두 가지 디렉토리 구성법에서 모두 사용할 수 있습니다.

* 두 디렉토리 구조에서 [ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home)을 사용할 수도 있습니다. 이것을 사용하면 특정 컴포넌트와 그 컴포넌트의 유닛 테스트는 같은 폴더에 저장됩니다. 따라서 컴포넌트의 코드가 변경되었을 때 테스트 코드를 찾기 쉬우며, 테스트 자체가 문서 및 사용법(use case)이 되게 됩니다.

```
services
├── cache
│   ├── cache1.js
│   └── cache1.spec.js
└── models
    ├── model1.js
    └── model1.spec.js
```

* `app.js`파일에는 라우트 정의와 설정이 포함되어야 하며, 필요한 경우 초기화 작업을 해줍니다.
* 하나의 자바스크립트 파일은 하나의 컴포넌트만을 포함하도록 합니다. 파일 이름은 컴포넌트의 이름과 같아야 합니다.
* [Yeoman](http://yeoman.io)이나 [ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home)와 같은 Angular 프로젝트 구조 템플릿을 사용합니다.

저는 같은 종류의 컴포넌트를 찾기 쉬운 첫 번째 방법을 선호합니다.

각 컴포넌트의 명명 규칙은 각 컴포넌트 절에서 설명합니다.

## 마크업

[TLDR;](http://developer.yahoo.com/blogs/ydn/high-performance-sites-rule-6-move-scripts-bottom-7200.html) 스크립트들은 하단에 넣으세요.

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

스크립트들은 간단하게 작성하고 Angular JS의 디렉티브 다음에 위치시킵니다. 이렇게 하면 코드와 프레임워크에 의해 변경, 향상된(Enhanced) html들을 쉽게 찾을 수 있습니다. (즉, 유지보수성이 향상됩니다)


```html
<form class="frm" ng-submit="login.authenticate()">
  <div>
    <input class="ipt" type="text" placeholder="name" require ng-model="user.name">
  </div>
</form>
```

다른 HTML atribute들은 이 [코드 가이드](http://mdo.github.io/code-guide/#html-attribute-order)를 참고하여 작성합니다.


## 기타

* 다음과 같은 사용을 권장합니다:
    * `setTimeout` 대신 `$timeout`
    * `setInterval` 대신 `$interval`
    * `window` 대신 `$window`
    * `document` 대신 `$document`
    * `$.ajax` 대신 `$http`

이를 통해 테스트를 쉽게 만들고 예상치 못한 작동을 방지할 수 있습니다. (예를 들어 `setTimeout`에서 `$scope.$apply`를 잊는 경우)

* 아래의 툴을 사용해 작업을 자동화하세요.
    * [Yeoman](http://yeoman.io)
    * [Grunt](http://gruntjs.com)
    * [Bower](http://bower.io)

* 콜백 대신에 promises(`$q`)를 사용하세요. $q를 사용하면 깔끔하고 우아한 코드가 되며, 여러분을 콜백 지옥에서 구원해줄 것입니다.
* 가능한 `$http` 대신 `$resource`를 사용하세요. 높은 수준의 추상화는 자질구레한 작업으로부터 해방시켜줍니다.
* AngularJS pre-minifier([ngmin](https://github.com/btford/ngmin), [ng-annotate](https://github.com/olov/ng-annotate))를 사용해 minification 시의 문제를 미리 방지합니다.
* 전역 변수를 사용하지 마세요. 모든 의존성은 의존성 주입(DI)로 해결하시기 바랍니다.
* `$scope`를 오염시키지 마세요. 오직 템플릿에서 사용하는 변수와 함수들만 추가하세요.
* [`nginit`보다 컨트롤러를 사용하세요](https://github.com/angular/angular.js/pull/4366/files). `ngInit`의 유일한 적절한 사용법은 `ngRepeat` 프로퍼티의 별칭을 만드는 일입니다. 이 외의 모든 경우엔 변수 범위(scope)를 초기화하는데 `ngInit` 대신 컨트롤러를 사용해야 합니다.
* 변수명, 프로퍼티명, 메소드명 앞에 `$`를 사용하지 않습니다. `$`를 앞에 붙이는 명명법은 AngularJS와 관련되어 특별한 의미로 사용됩니다.
* Angular JS의 DI 매커니즘을 이용하여 의존성을 처리할 때 타입 별로 의존성들을 정렬하세요. built-in Angular JS 의존성이 먼저 나오고 그 다음 별도로 추가한 의존성들이 나열되야합니다.


# 모듈
* 모듈의 이름은 lowerCamelCase로 명명되어야 합니다. 모듈 `a`의 하위 모듈 `b`를 가리키려면 `a.b`와 같이 네임스페이스를 중첩시킬 수 있습니다.

모듈의 구성은 일반적으로 두 가지 기준이 사용됩니다.

0. 기능
0. 컴포넌트 타입

두 접근법에 큰 차이는 없지만 첫 번째 방법이 좀 더 깔끔합니다. 또한 (아직 AngularJS 로드맵에는 없습니다만) 모듈의 지연 로딩(lazy-loading)이 지원된다면 애플리케이션의 성능을 향상시킬 수 있습니다.

# 컨트롤러

* 컨트롤러에서 DOM을 조작하지 마세요. 컨트롤러 대신 디렉티브를 사용하시기 바랍니다.
* 컨터르롤러의 이름은 컨트롤러의 이름을 기준으로 지어야 하며(예를 들어 shopping cart, homepage, admin panel), 이름의 끝에는 `Ctrl`을 붙여줍니다. 컨트롤러 이름은 UpperCamelCase를 사용해 작성합니다(`HomePageCtrl`, `ShoppingCartCtrl`, `AdminPanelCtrl`, etc.).
* 컨트롤러를 전역 공간에 정의하지 마세요(이런 사용법이 AngularJS 자체에서 제약이 되어있지 않더라도, 이러한 방법은 전역 공간을 더럽히는 안 좋은 방법입니다).
* 컨트롤러를 정의할 때 배열 문법을 사용하세요.

```JavaScript
module.controller('MyCtrl', ['dependency1', 'dependency2', ..., 'dependencyn', function (dependency1, dependency2, ..., dependencyn) {
  //...body
}]);
```

이런 식으로 정의하면 minification에서 발생할 수 있는 문제를 피할 수 있습니다. [ng-annotate](https://github.com/olov/ng-annotate)나 grunt task [grunt-ng-annotate](https://github.com/mzgol/grunt-ng-annotate)와 같은 툴을 사용하면 자동적으로 배열을 사용해 컨트롤러를 정의합니다.

* 컨트롤러의 의존성은 원래 이름을 사용하세요. 이를 통해 읽기 쉬운 코드를 만들 수 있습니다.

```JavaScript
module.controller('MyCtrl', ['$scope', function (s) {
  //...body
}]);
```


위의 예제보다는 아래의 예제가 읽기 쉽습니다.

```JavaScript
module.controller('MyCtrl', ['$scope', function ($scope) {
  //...body
}]);
```

이 방법은 스크롤이 필요할 정도로 코드가 길어졌을 때 특히 유용합니다. 원래의 이름을 사용하지 않으면 코드를 작성할 때 변수가 어떤 것과 관련되었는지 까먹을 것입니다.

* 컨트롤러는 가능한 최소한의 기능만을 가져야 합니다. 추상적이고 일반적으로 쓰이는 함수들은 서비스에 정의하세요.
* 다른 컨트롤러와 소통이 필요한 경우엔 메소드 호출이나 `$emit`, `$broadcast`, `$on` 메소드를 사용하세요. `$emit`이나 `$broadcasted` 메소드는 최소한으로 유지합니다.
* `$emit`나 `$broadcast`를 통해서 넘겨지는 모든 메시지는 이름 충돌이나 버그를 유발할 수 있기 때문에 목록을 작성해서 관리하세요.
* 형식화 기능(formatting logic)이나 데이터 형식을 캡슐화시킬 때에는 [필터](#필터)를 사용하거나 같이 의존성을 선언하세요.


```JavaScript
module.filter('myFormat', function () {
  return function () {
    //body...
  };
});
```

```JavaScript
module.controller('MyCtrl', ['$scope', 'myFormatFilter', function ($scope, myFormatFilter) {
  //body...
}]);
```

* 중첩 컨트롤러의 경우 "nested scoping"을 사용하세요. (`controllerAs` syntax):

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
```html
<div ng-bind="home.bindingValue"></div>
```

# 디렉티브

* 디렉티브의 이름은 lowerCamelCase를 사용하세요.
* link 함수에서 `$scope` 대신 `scope`를 사용하세요. complie 시 post/pre link 함수들을 호출할 때 인수(argument)들이 이미 정의되어 넘어오기 때문에 DI를 사용해 이것들을 변경할 수 없습니다. 이 스타일은 AngularJS 소스코드에서 사용하는 스타일입니다.
* 여러분만의 특별한 전치사를 붙여서 사용하세요. 이는 Third-party 라이브러리와 이름 충돌을 방지해줍니다.
* `ng`와 `ui`를 전치사로 사용하지 마세요. 이 단어들은 AngularJS와 AngularJS UI에서 사용되는 전치사입니다.
* 디렉티브를 통해서만 DOM 조작을 해주세요.
* 재사용 가능한 컴포넌트를 만들려면 독립된 범위(scope)를 만들어주세요.
* 디렉티브는 주석이나 클래스보단 요소(element)나 속성(attribute)으로 사용하세요. 이는 코드의 가독성을 향상시켜줍니다.
* `$scope.$on('$destroy', fn)`를 사용하여 정리(clean-up)하세요. 이 방식은 특히 third-party 플러그인을 디렉티브로 감싸서 사용할 때 유용합니다.
* 신뢰할 수 없는 컨텐츠(untrusted content)를 다룰 때는 `$sce` 사용을 잊지 마세요.


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
