#소개

이 스타일 가이드의 목표는 AngularJS 애플리케이션을 제작하는 데 있어서 현재의 모범 사례(Best practice)를 제시하는 것 입니다.
이 문서의 모범 사례는 아래 자료들로부터 수집되었습니다.

0. AngularJS 소스 코드
0. 제가 읽은 소스 코드와 문서들
0. 제 경험

**주의**: 이 문서는 아직 작성중이며 이 문서의 가장 큰 목표는 community-driven입니다. 따라서 스타일의 차이를 줄이는 일을 AngularJS 커뮤니티에 있어서 반가운 일일 것입니다. (어색함)


이 스타일 가이드에서 자바스크립트 프로그래밍의 가이드라인을 제공하진 않습니다. 자바스크립트에 관련한 문서는 아래에서 찾을 수 있습니다.

0. [구글 자바스크립트 스타일 가이드](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
0. [모질라 자바스크립트 스타일 가이](https://developer.mozilla.org/en-US/docs/Developer_Guide/Coding_Style)
0. [GitHub's 자바스크립트 스타일 가이드](https://github.com/styleguide/javascript)
0. [Douglas Crockford's 자바스크립트 스타일 가이드](http://javascript.crockford.com/code.html)
0. [Airbnb JavaScript style guide](https://github.com/airbnb/javascript)

AngularJS 애플리케이션 제작에 있어서는 [구글 자바스크립트 스타일 가이드](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)를 추천합니다.

AngularJS GitHub 위키에는 [ProLoser](https://github.com/ProLoser)가 작성한 관련된 부분이 있습니다. [여기](https://github.com/angular/angular.js/wiki)에서 확인하실 수 있습니다..

#차례
* [일반](#general)
    * [디렉터리 구조](#directory-structure)
    * [Digest cycle 최적화](#optimize-the-digest-cycle)
    * [기타](#others)
* [모듈](#modules)
* [컨트롤러](#controllers)
* [디렉티브](#directives)
* [필터](#filters)
* [서비스](#services)
* [템플릿](#templates)
* [라이팅](#routing)
* [테스트](#testing)
* [기여](#contribution)

#일반

## 디렉터리 구조

규모가 큰 AngularJS 애플리케이션엔 다수의 컴포넌트가 있기 때문에 계층적(Hierachy)으로 디렉터리 구조를 잡는 것이 좋습니다. 주로 두 가지 접근법이 사용됩니다.

* 컴포넌트 타입 별로 상위 디렉터리를 만들고, 기능별로 하위 디렉터리를 구성.

이러한 접근법을 사용한 디렉터리 구조는 다음과 같습니다.

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

* 기능 별로 상위 디렉터리를 나누고, 컴포넌트 타입 별로 하위 디렉터리를 구성.

다음과 같은 디렉터리 구조가 됩니다.

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

* 디렉티브 디렉터리를 만들 땐 디렉티브에 관련된 파일들(템플릿, CSS/SASS 파일, 자바스크립트)을 한 폴더에 모읍니다. 이런 방식으로 디렉터리를 구성한다면 프로젝트 어디서나 이 구조를 일관적으로 사용할 수 있습니다.

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

이러한 디렉티브 디렉터리 구성은 위에서 제시한 두 가지 디렉터리 구성법에서 모두 사용할 수 있습니다.
* 두 방식을 사용하는 데 있어서 또 하나 작은 선택지는 [ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home)을 사용하는 것입니다. 특정 컴포넌트의 유닛 테스트는 컴포넌트와 같은 폴더에 저장합니다. 이를 통해 컴포넌트의 코드가 변경되었을 때 테스트 코드를 찾기 쉬우며, 테스트를 컴포넌트의 사용법을 다룬 문서처럼 사용할 수 있습니다.

        services
        ├── cache
        │   ├── cache1.js
        │   └── cache1.spec.js
        └── models
            ├── model1.js
            └── model1.spec.js

* `app.js` 파일에는 라우트 정의와 설정이 포함되어야 하며, 필요한 경우 초기화 작업을 해줍니다.
* 각각의 자바스크립트 파일에는 오직 하나의 컴포넌트만을 포함하세요. 파일 이름은 컴포넌트의 이름과 같아야합니다.
* [Yeoman](http://yeoman.io)이나 [ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home)와 같은 Angular 프로젝트 구조 템플릿을 사용합니다.

저는 같은 종류의 컴포넌트를 찾기 쉬운 첫번째 방법을 선호합니다.

각 컴포넌트의 명명 규칙은 각 컴포넌트 절에서 설명합니다.

## Markup

[TLDR;](http://developer.yahoo.com/blogs/ydn/high-performance-sites-rule-6-move-scripts-bottom-7200.html) Put the scripts at the bottom.

```
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

Keep things simple and put AngularJS specific directives later. This way is easy to look to the code and find enhanced HTML by the framework (what improve the maintainibility).

```
<form class="frm" ng-submit="login.authenticate()">
  <div>
    <input class="ipt" type="text" placeholder="name" require ng-model="user.name">
  </div>
</form>
```

Other HTML atributes should follow the Code Guide's [recommendation](http://mdo.github.io/code-guide/#html-attribute-order)


## Digest cycle 최적화

* 가장 중요한 변수만 감시합니다(예를 들어 실시간 통신이 필요한 경우 각각의 메시지를 받을 때 digest loop를 일으키지 않아야합니다).
* For content that is initialized only once and then never changed, use single-time watchers like [`bindonce`](https://github.com/Pasvaz/bindonce).
* `$watch`는 가능한한 간단하게 작성합니다. 무겁과 느린 처리를 하나의 `$watch`에 집어넣으면 애플리케이션 전체를 느리게 만듭니다. (자바스크립트는 싱글 쓰레드에서 작동하므로 $digest 루프 또한 싱글 쓰레드로 작동합니다.)
* Set third parameter in `$timeout` function to false to skip the `$digest` loop when no watched variables are impacted by the invocation of the `$timeout` callback function.

## 기타

* 사용해야 함.
    * `setTimeout` 대신 `$timeout` 
    * `$interval` instead of `setInterval`
    * `window` 대신 `$window`
    * `document` 대신 `$document`
    * `$.ajax` 대신 `$http`

이를 통해 테스트를 쉽게 만들고 예상치 못한 작동을 방지 할 수 있습니다. (for example, if you missed `$scope.$apply` in `setTimeout`).

* 아래의 툴을 사용해 작업을 자동화해야합니다.
    * [Yeoman](http://yeoman.io)
    * [Grunt](http://gruntjs.com)
    * [Bower](http://bower.io)

* 콜백 대신에 promises(`$q`)를 사용하세요. $q를 사용하면 코드가 깔끔해지고, 여러분을 콜백 지옥에서 구원해줄 것입니다.
* 가능할 땐 `$http` 대신 `$resource`를 사용. 높은 수준의 추상화는 자질구레한 작업으로부터 해방시켜줍니다.
* AngularJS pre-minifier([ngmin](https://github.com/btford/ngmin), [ng-annotate](https://github.com/olov/ng-annotate))를 사용해 minification 시의 문제를 미리 방지합니다..
* 전역 변수를 사용하지 마세요. 모든 의존성은 의존성 주입(DI)로 해결하시기 바랍니다.
* `$scope`를 오염시키지 마세요. 오직 템플릿에서 사용하는 변수와 함수들만 추가하세요.
* [`nginit`보다 컨트롤러를 사용하세요](https://github.com/angular/angular.js/pull/4366/files). `ngInit`의 유일한 적절한 사용법은 `ngRepeat` 프로퍼티의 별칭을 만드는 일입니다. 이 외의 모든 경우엔 변수 범위(scope)를 초기화하는데 `ngInit` 대신 컨트롤러를 사용해야합니다.
* 변수명, 프로퍼티명, 메소드명 앞에 `$`를 사용하지 않습니다. `$`를 앞에 붙이는 명명법은 AngularJS와 관련되어 특별한 의미로 사용됩니다.
* When resolving dependencies through the DI mechanism of AngularJS, sort the dependencies by their type - the built-in AngularJS dependencies should be first, followed by your custom ones:



# 모듈
* Modules should be named with lowerCamelCase. For indicating that module `b` is submodule of module `a` you can nest them by using namespacing like: `a.b`.

모듈의 구성은 일반적으로 두 가지 기준이 사용됩니다.

0. 기능
0. 컴포넌트 타입

두 접근법에 큰 차이는 없지만 첫번째 방법이 좀 더 깔끔합니다. 또한 (아직 AngularJS 로드맵에는 없습니다만) 모듈의 지연 로딩이 지원된다면 애플리케이션의 성능도 좋아질 것입니다.

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
* 컨트롤러의 의존성은 원래 이름을 사용하세요. 이를 통해 일기 쉬운 코드를 만들 수 있습니다.


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

이렇게 스크롤이 필요할 정도로 코드가 길어졌을 때 특히 유용합니다. 원래의 이름을 사용하지 않으면 코드를 작성하는 프로그래머가 의존성의 이름을 까먹어버릴지도 모릅니다.

* 컨트롤라는 가능한 최소한의 기능만을 가져야합니다. 추상적이고 일반적으로 쓰이는 함수들은 서비스에 정의하세요.
* 다른 컨트롤러와 소통이 필요한 경우엔 메소드 호출이나 `$emit`, `$broadcast`, `$on` 메소드를 사용해주세요. `$emit`이나 `$broadcasted`되는 메소드는 최소한으로 유지합니다.
* `$emit`나 `$broadcast`를 통해서 넘겨지는 모든 메시지는 이름 충돌이나 버그를 방지하기 위해 목록을 작성해서 관리하세요.
* [filter](#filters)에 데이터 포맷 로직이나 캡슐화가 필요한 경우에는 아래와 같이 의존선을 선언하시기 바랍니다.

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

#디렉티브

* 디렉티브의 이름은 lowerCamelCase를 사용하세요.
* link 함수에서 `$scope` 대신 `scope`를 사용하세요. complie이나 post/pre link 함수들에선 이미 함수가 불려졌을 때 넘어온 인수들이 정의되어있습니다. DI를 사용해 이것들을 변경할 수 없습니다. 이 스타일은 AngularJS 소스코드에서 사용하는 스타일입니다.
* 여러분만의 특별한 전치사를 붙여서 사용하세요. 이는 Third-party 라이브러리와 이름 충돌을 방지해줍니다.
* `ng`와 `ui`를 전치사로 사용하지 마세요. 이 단어들은 AngularJS와 AngularJS UI에서 사용되는 전치사입니다.
* 디렉티브를 통해서만 DOM 조작을 해주세요.
* 재사용 가능한 컴포넌트를 만들려면 독립된 범위(scope)를 만들어주세요.
* 디렉티브는 주석(comments)이나 클래스(clases)보단 요소(elements)나 속성(attributes)으로 사용하세요. 이는 코드의 가독성을 향상시켜줍니다.
* 범위(scope)를 없앨 때는 `$scope.$on('$destroy', fn)`를 사용하세요. 이러한 접근은 특히 third-party 플러그인을 디렉티브로 감싸서 사용할 때 유용합니다.
* Do not forget to use `$sce` when you should deal with untrusted content.


#필터

* 이름은 lowerCamelCase를 사용하세요
* 필터는 가능한 한 가볍게 만들어주세요. 필터는 간혹 `$digest` 루프 내에서 호출될 수 있기 때문에 느린 필터는 애플리케이션 전체를 느리게 만들 수 있습니다.
* Do a single thing in your filters, keep them coherent. More complex manipulations can be achieved by piping existing filters.


#서비스

* 서비스명은 camelCase나 CamelCase로 작성.
  * UpperCamelCase (PascalCase) for naming your services, used as constructor functions i.e.:
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

  * lowerCamelCase for all other services.
* 서비스엔 비지니스 로직을 캡슐화.
* 비지니스 로직을 캡슐화하고 있는 서비스들은 `factory` 대신에 `service`를 선호합니다.

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
* If given service requires configuration define the service as provider and configure it in the `config` callback like:

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
* 템플릿에서는 복잡한 코드 사용을 가능한 자제.
* 동적으로 src 속성을 사용해야한다면 `src`를 `{{}}`와 같이 사용하는 대신에 `ng-src`를 사용하세요.
* When you need to set the `href` of an anchor tag dynamically use `ng-href` instead of `href` with `{{ }}` template.
* `style`속성을 $scope에 정의된 문자열로 사용하고 싶을 때 `{{}}`를 사용하는 대신에 `ng-style`를 사용하면 $scope에 객체를 선언해 여러가지 속성을 한꺼번에 지정할 수 있습니다.
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

#기여

이 문서는 communty-driven을 지향하며, 문서에 대한 기여는 언제든 대환영입니다.
부족한 부분을 보충해주시거나 여러분이 사용하는 모국어로 문서를 번역해주셔도 좋습니다.
