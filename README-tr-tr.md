[![Join the chat at https://gitter.im/mgechev/angularjs-style-guide](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/mgechev/angularjs-style-guide?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# Başlangıç

Bu dökümanın amacı angular ile geliştirilen ve geçerli olan iyi tasarım ve stillerdir.
En iyi kullanışlar:

0. AngularJS kaynak kodu
0. Kaynak kodları ve okuduğum makaleler
0. Kendi deneyimlerim

**Not 1**: Bu stil rehberi hala bir taslak aşamasındadır.Ana amacı tüm kesimlerce kabul edilmesidir.

**Not 2**: Herhangi bir döküman takip etmeden önce, dökümanın güncel olduğuna dikkat ediniz. Bu döküman en son versiyonu için geçerlidir.

Bu dökümanda genel Javascript geliştirmelerinin ortak kullanımını göremeyeceksiniz. Genel olarak kullanımlar aşağıdadır:

0. [Google's JavaScript dökümanı](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
0. [Mozilla's JavaScript dökümanı](https://developer.mozilla.org/en-US/docs/Developer_Guide/Coding_Style)
0. [GitHub's JavaScript dökümanı](https://github.com/styleguide/javascript)
0. [Douglas Crockford's JavaScript dökümanı](http://javascript.crockford.com/code.html)
0. [Airbnb JavaScript dökümanı](https://github.com/airbnb/javascript)

AngularJs geliştirmeleri için [Google's JavaScript dökümanı](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml).

 AngularJS Github dökümanı için [ProLoser](https://github.com/ProLoser), buradan kontrol edebilirsin [here](https://github.com/angular/angular.js/wiki).


# Tablo içeriği
* [Genel](#genel)
    * [Dizin yapısı](#dizin-yapısı)
    * [Biçimlendirme](#biçimlendirme)
    * [Optimize the digest cycle](#optimize-the-digest-cycle)
    * [Diğerleri](#diğerleri)
* [Modüller](#modüller)
* [Kontrolörler](#kontrolörler)
* [Direktifler](#direktifler)
* [Filtreler](#filtreler)
* [Services](#services)
* [Şablonlar](#şablonlar)
* [Yönlendirme](#yönlendirme)
* [i18n](#i18n)
* [Katkı](#katkı)
* [Katkı Sağlayanlar](#katkı-sağlayanlar)

# Genel

## Dizin yapısı

Büyük AngularJs uygulamaları bir çok bileşenden oluşur. En iyi dizin yapısı dosyalama hiyerarşidir.
2 tane ana yaklaşım:

* Bileşen türü daha öncelikli olacak şekilde  bölünmeler ve işlevselliği daha az kullanıma  göre yapılandırma.

Dizin yapısı aşağıdaki şekilde görünecektir:

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

* İşlevselliğin ön planda olduğu ve bileşen yapısının daha az yapıda kullanıldığı yapı aşağıdaki gibidir.

Düzen yapısı:

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

* Dizin yapısı birden çok kelimeden oluşabilir(örn;my-complex-module ),lisp-case sözdizimi kullanın !:

```
app
 ├── app.js
 └── my-complex-module
     ├── controllers
     ├── directives
     ├── filters
     └── services
```

* Tüm dosyalarınızı verilen yönergelere koyun.(i.e. şablonlar, CSS/SASS dosyaları, JavaScript) tek dosya içerisinde. Eğer böyle bir yaklaşım seçerseniz,proje yaşamı boyunca heryerde bu yaklaşımı kullanabilirsiniz.

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

Bu yaklaşım yukarıdaki iki dizin yapısı ile birleştirilmiştir.
* Unit testlerimiz bulunduğu bileşen ile birlikte olmalıdır. Bu yol ile yaptığımız testleri daha kolay buluruz ve yönetimimiz daha kolay olur.Ayrıca testlerimiz dökümantasyon ve kullanıcı senaryolarını da içermelidir.

```
services
├── cache
│   ├── cache1.js
│   └── cache1.spec.js
└── models
    ├── model1.js
    └── model1.spec.js
```

* `app.js` dosyasında yönlendirme bulunmalıdır.
* Her bir JavaScript dosyası sadece  **tek bir bileşen** bulundurmalıdır. Dosya bileşenin adı ile adlandırılmış olmalıdır.
* AngularJs proje yapısı şablonu örn olarak kullanabilirsiniz; [Yeoman](http://yeoman.io), [ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home).

Conventions about component naming can be found in each component section.

## Biçimlendirme

[TLDR;](http://developer.yahoo.com/blogs/ydn/high-performance-sites-rule-6-move-scripts-bottom-7200.html) Alltaki komutları koyun.

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

Basit yapıda tutun ve özelleşmiş direktifleri sonra koyun.Bu yöntem ile kodu geliştirmede ve bakımını daha koaly hale getirir.Ayrıca Html tarafından daha kolay bulunmasını sağlar getirir.

```
<form class="frm" ng-submit="login.authenticate()">
  <div>
    <input class="ipt" type="text" placeholder="name" require ng-model="user.name">
  </div>
</form>
```

Diğer HTML niteliklerini bu dökümanda bulabilirsiniz. [recommendation](http://mdo.github.io/code-guide/#html-attribute-order)

## Optimize the digest cycle

* Watch only the most vital variables. When required to invoke the `$digest` loop explicitly (it should happen only in exceptional cases), invoke it only when required (for example: when using real-time communication, don't cause a `$digest` loop in each received message).
* For content that is initialized only once and then never changed, use single-time watchers like [`bindonce`](https://github.com/Pasvaz/bindonce) for older versions of AngularJS or one-time bindings in AngularJS >=1.3.0.
* Make the computations in `$watch` as simple as possible. Making heavy and slow computations in a single `$watch` will slow down the whole application (the `$digest` loop is done in a single thread because of the single-threaded nature of JavaScript).
* When watching collections, do not watch them deeply when not strongly required. Better use `$watchCollection`, which performs a shallow check for equility of the result of the watched expression and the previous value of the expression's evaluation.
* Set third parameter in `$timeout` function to false to skip the `$digest` loop when no watched variables are impacted by the invocation of the `$timeout` callback function.
* When dealing with big collections, which change rarely, [use immutable data structures](http://blog.mgechev.com/2015/03/02/immutability-in-angularjs-immutablejs/).

## Diğerleri

* Kullan:
    * `$timeout` yerine `setTimeout`
    * `$interval` yerine `setInterval`
    * `$window` yerine `window`
    * `$document` yerine `document`
    * `$http` yerine `$.ajax`

Böylece kodu daha test edilebilir hale getirir ve beklenmeyen hataların önüne geçilir. (Örneğin; unutursan `$scope.$apply` in `setTimeout`).

* İş akışını bu araçlar ile otomatik hale getirin:
    * [Yeoman](http://yeoman.io)
    * [Gulp](http://gulpjs.com)
    * [Grunt](http://gruntjs.com)
    * [Bower](http://bower.io)

* Promise yapısını kullan (`$q`) callbacks kullanma.Kodun daha güzel,temiz ve test edilebilir hale getirir. Ve bizi callback yapısından kurtarır.
* Mümkün olduğunca `$resource` kullanının, `$http` yerine.Soyutlama düzeyinde fazlalılıktan size kurtaracaktır.
* AngularJS pre-minifier kullan  ([ng-annotate](https://github.com/olov/ng-annotate)) olası hataları önlemek için.
* Globals kullanma.Tüm bağımlılıkları Dependency Injection ile çözümle,bu olası bugları ve test ederken kolaylık sağlayacaktır.
* Kodunuzu `$scope` ile kirletmeyin. Sadece fonksiyon ve değişkenlerde kullanın. Bu kullanılan değişken ve fonksiyonların şablonlarda kullanıldığına dikkat edin.
* Prefer the usage of [controllers instead of `ngInit`](https://github.com/angular/angular.js/pull/4366/files). The only appropriate use of `ngInit` is for aliasing special properties of `ngRepeat`. Besides this case, you should use controllers rather than `ngInit` to initialize values on a scope.
* Değişkenlerde,methodlarda ve özelliklerde `$` ön ekini kullanmayın.Çünkü bu ön ek AngularJs tarafından ayrılmıştır.
* AngularJs DI yapısıyla bağımlılıkları çözerken,bağımlılıkları türlerine göre sıralayınız.AngularJs tarafından ayağa kaldırılan bağımlılıklar ilk sırada olmalı daha sonra sizin yaptığınız bağımlılıklar gelmelidir. Aşağıda bir örnek görebilirsiniz:

```javascript
module.factory('Service', function ($rootScope, $timeout, MyCustomDependency1, MyCustomDependency2) {
  return {
    //Something
  };
});
```

# Modüller

* Modül isimleri lowerCamelCase yapısına uygun olmalıdır.Küçük harf ile başlamalıdır.`b` modülü `a` nın bir alt modülü ise, isimlendirme `a.b` şekilde olmalıdır.

Modülleri yapısına göre 2 şekilde sıralayabiliriz:

0. işlevselliğine göre,
0. bileşen türüne göre.

Aslında büyük bir fark yok aralarında, ama ilk yöntem daha temiz bir yapıdır. Bunun yanında, eğer lazy-loading modülü gelirse  (şuanda AngularJs yol haritasında yok), uygulama performansını artıracaktır.

# Kontrolörler

* Kontroller tarafında DOM müdahale etmeyin,bu sizin kontroller tarafındanki test etmenizi zor hale getirecektir ve bazı prensibleri ihlal ediceksiniz [Separation of Concerns principle](https://en.wikipedia.org/wiki/Separation_of_concerns).Bunun yerine direktiveleri kullanın.
* Kontrolörler ismi yaptığı iş ile aynı isimde olmalıdır. (örneğin; shopping cart, homepage, admin panel) ve sonu `Ctrl` bitmelidir.Kontrolörler ismi UpperCamelCase (`HomePageCtrl`, `ShoppingCartCtrl`, `AdminPanelCtrl`, etc.) yapısında olmalıdır.
* Kontrolörler global olarak tanımlanmamalıdır. (AngularJs buna izin verse bile,bu kötü bir yaklaşımdır ve global isim alanını kirletir. Kullanmayın!).
* Aşağıda tanımlanan örnek yapısında kullanın:

```JavaScript
function MyCtrl(dependency1, dependency2, ..., dependencyn) {
  // ...
}
module.controller('MyCtrl', MyCtrl);
```

In order to prevent problems with minification, you can automatically generate the array definition syntax from the standard one using tools like [ng-annotate](https://github.com/olov/ng-annotate) (and grunt task [grunt-ng-annotate](https://github.com/mzgol/grunt-ng-annotate)).
* If using array definition syntax, use the original names of the controller's dependencies. This will help you produce more readable code:

```JavaScript
function MyCtrl(s) {
  // ...
}

module.controller('MyCtrl', ['$scope', MyCtrl]);
```

okunabilirliği daha az:

```JavaScript
function MyCtrl($scope) {
  // ...
}
module.controller('MyCtrl', ['$scope', MyCtrl]);
```

This especially applies to a file that has so much code that you'd need to scroll through. This would possibly cause you to forget which variable is tied to which dependency.

* Make the controllers as lean as possible. Abstract commonly used functions into a service.
* Communicate within different controllers using method invocation (possible when a child wants to communicate with its parent) or `$emit`, `$broadcast` and `$on` methods. The emitted and broadcasted messages should be kept to a minimum.
* Make a list of all messages which are passed using `$emit`, `$broadcast` and manage it carefully because of name collisions and possible bugs.

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

* When you need to format data encapsulate the formatting logic into a [filter](#filters) and declare it as dependency:

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

# Directives

* Direktif isimleri lowerCamelCase yapısına uygun olmalıdır.
* Link fonksiyonunda `$scope` yerine `scope` kullanın.In the compile, post/pre link functions you have already defined arguments which will be passed when the function is invoked, you won't be able to change them using DI. This style is also used in AngularJS's source code.
* Direktiflerde özel ön ekler kullanın bunun amacı kullandığınız diğer kütüphanelerde isim karışıklığını engeller.Use custom prefixes for your directives to prevent name collisions with third-party libraries.
* Do not use `ng` or `ui` prefixes since they are reserved for AngularJS and AngularJS UI usage.
* DOM manipulations must be done only through directives.
* Create an isolated scope when you develop reusable components.
* Use directives as attributes or elements instead of comments or classes, this will make your code more readable.
* Use `scope.$on('$destroy', fn)` for cleaning up. This is especially useful when you're wrapping third-party plugins as directives.
* Do not forget to use `$sce` when you should deal with untrusted content.

# Filtreler

* Filtre isimleri lowerCamelCase yapısına uygun olmalıdır.
* Tüm filtrelerin bağımsız olduğuna emin olun. They are called often during the `$digest` loop so creating a slow filter will slow down your app.
* Filtreleme işlemlerinde sadece bir iş yapın,ve işler tutarlı olsun. More complex manipulations can be achieved by piping existing filters.

# Services

Bu bölümde AngularJs Service yapısınına bakıyoruz.Hangisine bağlı olarak geliştirdiğinin önemi yoktur. (i.e. örnek; provider, `.factory`, `.service`).

* Servis isimleri camelCase yapısına uygun olmalıdır.
  * UpperCamelCase (PascalCase) yapısında isimlendirilmelidir, yapıcı fonksiyon örneği kullanılmıştır i.e.:

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

  * Diğer tüm servisler için lowerCamelCase kullanın.

* Servis katmanınında tüm işlemleri saklayın.
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

myModule.service('Human', Human);
myModule.service('Developer', Developer);

```

* Session-level önbellekleme yapmak için `$cacheFactory` kullanın.
* Eğer kullandığınız servis yapılandırma gerekiyorsa, servis sağlayıcı kullanın ve bunu `config` callback yapılandırın. Aşağıda bir örnek tanımlanmıştır

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

# Şablonlar

* `ng-bind` veya `ng-cloak` kullanın.Instead of simple `{{ }}` to prevent flashing content. //
* Html Şablonları içinde karışık ifadeler yazmaktan kaçının.
* Html Şablonların içinde `src` etiketi yerine AngularJs bize sunmuş olduğu `ng-src` etiketini kullanın.
* Html Şablonların içinde `href` etiketi yerine AngularJs bize sunmuş olduğu `ng-href` etiketini kullanın.
* Scope değişkenlerini string kullanmak yerine `style` özelliği birlikte `{{ }}` kullanın ve direktif olarak `ng-style` kullanın.

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

# Yönlendirme

* View gözükmeden önce bağımlılıklarınızı çözmek için `resolve` kullanın.
* `resolve` callback içerisine açık olarak RESTful koymayın.Uygun servislerin içersine birbirden bağımsız olacak şekilde yerleştirin.Böylece önbelleğe izin verme ve separation of concerns principle sağlamış oluruz.

# i18n

* Angular yeni versiyonu için (>=1.4.0) i18n araçını kullanın, eğer eski versiyonu kullanıyorsanız (<1.4.0) kullanın [`angular-translate`](https://github.com/angular-translate/angular-translate).


# Katkı Sağlayanlar

[<img alt="mgechev" src="https://avatars.githubusercontent.com/u/455023?v=3&s=117" width="117">](https://github.com/mgechev) |[<img alt="pascalockert" src="https://avatars.githubusercontent.com/u/4253438?v=3&s=117" width="117">](https://github.com/pascalockert) |[<img alt="morizotter" src="https://avatars.githubusercontent.com/u/536954?v=3&s=117" width="117">](https://github.com/morizotter) |[<img alt="ericguirbal" src="https://avatars.githubusercontent.com/u/322135?v=3&s=117" width="117">](https://github.com/ericguirbal) |[<img alt="mainyaa" src="https://avatars.githubusercontent.com/u/800781?v=3&s=117" width="117">](https://github.com/mainyaa) |[<img alt="elfinxx" src="https://avatars.githubusercontent.com/u/4384908?v=3&s=117" width="117">](https://github.com/elfinxx) |
:---: |:---: |:---: |:---: |:---: |:---: |
[mgechev](https://github.com/mgechev) |[pascalockert](https://github.com/pascalockert) |[morizotter](https://github.com/morizotter) |[ericguirbal](https://github.com/ericguirbal) |[mainyaa](https://github.com/mainyaa) |[elfinxx](https://github.com/elfinxx) |

[<img alt="agnislav" src="https://avatars.githubusercontent.com/u/364255?v=3&s=117" width="117">](https://github.com/agnislav) |[<img alt="rubystream" src="https://avatars.githubusercontent.com/u/3200?v=3&s=117" width="117">](https://github.com/rubystream) |[<img alt="lukaszklis" src="https://avatars.githubusercontent.com/u/11782?v=3&s=117" width="117">](https://github.com/lukaszklis) |[<img alt="susieyy" src="https://avatars.githubusercontent.com/u/62295?v=3&s=117" width="117">](https://github.com/susieyy) |[<img alt="cironunes" src="https://avatars.githubusercontent.com/u/469908?v=3&s=117" width="117">](https://github.com/cironunes) |[<img alt="cavarzan" src="https://avatars.githubusercontent.com/u/3915288?v=3&s=117" width="117">](https://github.com/cavarzan) |
:---: |:---: |:---: |:---: |:---: |:---: |
[agnislav](https://github.com/agnislav) |[rubystream](https://github.com/rubystream) |[lukaszklis](https://github.com/lukaszklis) |[susieyy](https://github.com/susieyy) |[cironunes](https://github.com/cironunes) |[cavarzan](https://github.com/cavarzan) |

[<img alt="guiltry" src="https://avatars.githubusercontent.com/u/1484308?v=3&s=117" width="117">](https://github.com/guiltry) |[<img alt="tornad" src="https://avatars.githubusercontent.com/u/2128499?v=3&s=117" width="117">](https://github.com/tornad) |[<img alt="jmblog" src="https://avatars.githubusercontent.com/u/86085?v=3&s=117" width="117">](https://github.com/jmblog) |[<img alt="kuzzmi" src="https://avatars.githubusercontent.com/u/1727140?v=3&s=117" width="117">](https://github.com/kuzzmi) |[<img alt="dchest" src="https://avatars.githubusercontent.com/u/52677?v=3&s=117" width="117">](https://github.com/dchest) |[<img alt="gsamokovarov" src="https://avatars.githubusercontent.com/u/604618?v=3&s=117" width="117">](https://github.com/gsamokovarov) |
:---: |:---: |:---: |:---: |:---: |:---: |
[guiltry](https://github.com/guiltry) |[tornad](https://github.com/tornad) |[jmblog](https://github.com/jmblog) |[kuzzmi](https://github.com/kuzzmi) |[dchest](https://github.com/dchest) |[gsamokovarov](https://github.com/gsamokovarov) |

[<img alt="clbn" src="https://avatars.githubusercontent.com/u/1071933?v=3&s=117" width="117">](https://github.com/clbn) |[<img alt="apetro" src="https://avatars.githubusercontent.com/u/952283?v=3&s=117" width="117">](https://github.com/apetro) |[<img alt="valgreens" src="https://avatars.githubusercontent.com/u/903263?v=3&s=117" width="117">](https://github.com/valgreens) |[<img alt="bitdeli-chef" src="https://avatars.githubusercontent.com/u/3092978?v=3&s=117" width="117">](https://github.com/bitdeli-chef) |[<img alt="bradgearon" src="https://avatars.githubusercontent.com/u/1731943?v=3&s=117" width="117">](https://github.com/bradgearon) |[<img alt="astalker" src="https://avatars.githubusercontent.com/u/1486567?v=3&s=117" width="117">](https://github.com/astalker) |
:---: |:---: |:---: |:---: |:---: |:---: |
[clbn](https://github.com/clbn) |[apetro](https://github.com/apetro) |[valgreens](https://github.com/valgreens) |[bitdeli-chef](https://github.com/bitdeli-chef) |[bradgearon](https://github.com/bradgearon) |[astalker](https://github.com/astalker) |

[<img alt="dreame4" src="https://avatars.githubusercontent.com/u/277870?v=3&s=117" width="117">](https://github.com/dreame4) |[<img alt="grvcoelho" src="https://avatars.githubusercontent.com/u/7416751?v=3&s=117" width="117">](https://github.com/grvcoelho) |[<img alt="bargaorobalo" src="https://avatars.githubusercontent.com/u/993001?v=3&s=117" width="117">](https://github.com/bargaorobalo) |[<img alt="hermankan" src="https://avatars.githubusercontent.com/u/2899106?v=3&s=117" width="117">](https://github.com/hermankan) |[<img alt="jabhishek" src="https://avatars.githubusercontent.com/u/1830537?v=3&s=117" width="117">](https://github.com/jabhishek) |[<img alt="jesselpalmer" src="https://avatars.githubusercontent.com/u/682097?v=3&s=117" width="117">](https://github.com/jesselpalmer) |
:---: |:---: |:---: |:---: |:---: |:---: |
[dreame4](https://github.com/dreame4) |[grvcoelho](https://github.com/grvcoelho) |[bargaorobalo](https://github.com/bargaorobalo) |[hermankan](https://github.com/hermankan) |[jabhishek](https://github.com/jabhishek) |[jesselpalmer](https://github.com/jesselpalmer) |

[<img alt="vorktanamobay" src="https://avatars.githubusercontent.com/u/2623355?v=3&s=117" width="117">](https://github.com/vorktanamobay) |[<img alt="capaj" src="https://avatars.githubusercontent.com/u/1305378?v=3&s=117" width="117">](https://github.com/capaj) |[<img alt="jordanyee" src="https://avatars.githubusercontent.com/u/3303098?v=3&s=117" width="117">](https://github.com/jordanyee) |[<img alt="nacyot" src="https://avatars.githubusercontent.com/u/148919?v=3&s=117" width="117">](https://github.com/nacyot) |[<img alt="mariolamacchia" src="https://avatars.githubusercontent.com/u/6282722?v=3&s=117" width="117">](https://github.com/mariolamacchia) |[<img alt="kirstein" src="https://avatars.githubusercontent.com/u/426442?v=3&s=117" width="117">](https://github.com/kirstein) |
:---: |:---: |:---: |:---: |:---: |:---: |
[vorktanamobay](https://github.com/vorktanamobay) |[capaj](https://github.com/capaj) |[jordanyee](https://github.com/jordanyee) |[nacyot](https://github.com/nacyot) |[mariolamacchia](https://github.com/mariolamacchia) |[kirstein](https://github.com/kirstein) |

[<img alt="mo-gr" src="https://avatars.githubusercontent.com/u/95577?v=3&s=117" width="117">](https://github.com/mo-gr) |[<img alt="cryptojuice" src="https://avatars.githubusercontent.com/u/458883?v=3&s=117" width="117">](https://github.com/cryptojuice) |[<img alt="olov" src="https://avatars.githubusercontent.com/u/19247?v=3&s=117" width="117">](https://github.com/olov) |[<img alt="johnnyghost" src="https://avatars.githubusercontent.com/u/1117330?v=3&s=117" width="117">](https://github.com/johnnyghost) |[<img alt="sahat" src="https://avatars.githubusercontent.com/u/544954?v=3&s=117" width="117">](https://github.com/sahat) |[<img alt="kaneshin" src="https://avatars.githubusercontent.com/u/936972?v=3&s=117" width="117">](https://github.com/kaneshin) |
:---: |:---: |:---: |:---: |:---: |:---: |
[mo-gr](https://github.com/mo-gr) |[cryptojuice](https://github.com/cryptojuice) |[olov](https://github.com/olov) |[johnnyghost](https://github.com/johnnyghost) |[sahat](https://github.com/sahat) |[kaneshin](https://github.com/kaneshin) |

[<img alt="imaimiami" src="https://avatars.githubusercontent.com/u/2256037?v=3&s=117" width="117">](https://github.com/imaimiami) |[<img alt="gitter-badger" src="https://avatars.githubusercontent.com/u/8518239?v=3&s=117" width="117">](https://github.com/gitter-badger) |[<img alt="thomastuts" src="https://avatars.githubusercontent.com/u/1914255?v=3&s=117" width="117">](https://github.com/thomastuts) |[<img alt="grapswiz" src="https://avatars.githubusercontent.com/u/309459?v=3&s=117" width="117">](https://github.com/grapswiz) |[<img alt="coderhaoxin" src="https://avatars.githubusercontent.com/u/2569835?v=3&s=117" width="117">](https://github.com/coderhaoxin) |[<img alt="ntaoo" src="https://avatars.githubusercontent.com/u/511213?v=3&s=117" width="117">](https://github.com/ntaoo) |
:---: |:---: |:---: |:---: |:---: |:---: |
[imaimiami](https://github.com/imaimiami) |[gitter-badger](https://github.com/gitter-badger) |[thomastuts](https://github.com/thomastuts) |[grapswiz](https://github.com/grapswiz) |[coderhaoxin](https://github.com/coderhaoxin) |[ntaoo](https://github.com/ntaoo) |

[<img alt="kuzmeig1" src="https://avatars.githubusercontent.com/u/8707951?v=3&s=117" width="117">](https://github.com/kuzmeig1) |
:---: |
[kuzmeig1](https://github.com/kuzmeig1) |

[<img alt="gokhan" src="https://avatars0.githubusercontent.com/u/6371971?v=3&s=460" width="117">](https://github.com/previousdeveloper) |
:---: |
[gokhan](https://github.com/previousdeveloper) |

