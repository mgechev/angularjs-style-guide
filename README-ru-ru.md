[![Присоединяйтесь к общению на https://gitter.im/mgechev/angularjs-style-guide](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/mgechev/angularjs-style-guide?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# Введение

Цель данного руководства — предоставить набор лучших практик и рекомендаций по стилю для AngularJS приложений.

В работе были использованы следующие источники:

0. Исходный код AngularJS.
0. Мной прочитанные статьи.
0. Мой собственный опыт.

**Замечание 1**: это все еще черновик, главная цель которого — это-то, чтобы его развивало сообщество и поэтому восполнение любых пробелов будет принято с благодарностью.

**Замечание 2**: перед использованием рекомендаций, описанных в данном переводе, убедитесь, что они соответствуют текущей версии оригинала.

В данном руководстве вы не найдете общих требований к стилю для разработки на JavaScript. Они есть тут:

0. [Google's JavaScript style guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
0. [Mozilla's JavaScript style guide](https://developer.mozilla.org/en-US/docs/Developer_Guide/Coding_Style)
0. [GitHub's JavaScript style guide](https://github.com/styleguide/javascript)
0. [Douglas Crockford's JavaScript style guide](http://javascript.crockford.com/code.html)
0. [Airbnb JavaScript style guide](https://github.com/airbnb/javascript)

При разработке приложений на AngularJS рекомендуется использовать [Google's JavaScript style guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml).

На wiki странице GitHub репозитория AngularJS есть похожая секция, созданная [ProLoser](https://github.com/ProLoser), которая находится [здесь](https://github.com/angular/angular.js/wiki).

# Переводы

Данный документ является русским переводом рекомендаций. Оригинальный текст на английском языке находится [здесь](https://github.com/mgechev/angularjs-style-guide/blob/master/README.md)

Также доступны переводы на нижеперечисленных языках:

- [Немецкий](https://github.com/mgechev/angularjs-style-guide/blob/master/README-de-de.md)
- [Испанский](https://github.com/mgechev/angularjs-style-guide/blob/master/README-es-es.md)
- [Французский](https://github.com/mgechev/angularjs-style-guide/blob/master/README-fr-fr.md)
- [Индонезийский](https://github.com/mgechev/angularjs-style-guide/blob/master/README-id-id.md)
- [Итальянский](https://github.com/mgechev/angularjs-style-guide/blob/master/README-it-it.md)
- [Японский](https://github.com/mgechev/angularjs-style-guide/blob/master/README-ja-jp.md)
- [Корейский](https://github.com/mgechev/angularjs-style-guide/blob/master/README-ko-kr.md)
- [Польский](https://github.com/mgechev/angularjs-style-guide/blob/master/README-pl-pl.md)
- [Португальский](https://github.com/mgechev/angularjs-style-guide/blob/master/README-pt-br.md)
- [Сербский](https://github.com/mgechev/angularjs-style-guide/blob/master/README-sr.md)
- [Сербский латиница](https://github.com/mgechev/angularjs-style-guide/blob/master/README-sr-lat.md)
- [Китайский](https://github.com/mgechev/angularjs-style-guide/blob/master/README-zh-cn.md)
- [Турецкий](https://github.com/mgechev/angularjs-style-guide/blob/master/README-tr-tr.md)

# Содержание
* [Общие](#general)
    * [Файловая структура](#directory-structure)
    * [Разметка](#markup)
    * [Другое](#others)
* [Модули](#modules)
* [Контроллеры](#controllers)
* [Директивы](#directives)
* [Фильтры](#filters)
* [Сервисы](#services)
* [Шаблоны](#templates)
* [Маршрутизация](#routing)
* [i18n](#i18n)
* [Производительность](#performance)
* [Вклад](#contribution)

# <a name="general"></a>Общие

## <a name="directory-structure"></a>Файловая структура

Так как большое AngularJS приложение состоит из большого количества компонентов, оптимальный способ их структурирования — иерархия каталогов.

Существует два основных подхода:

* Сперва разделить по типам компонентов, затем по функциональности.

В этом случае структура каталогов будет выглядеть примерно так:

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

* Сперва разделить по функциональности, затем по типам компонентов.

Вот как это выглядит:

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

* Если имя каталога состоит из нескольких слов, используйте разделение в стиле lisp:

```
app
 ├── app.js
 └── my-complex-module
     ├── controllers
     ├── directives
     ├── filters
     └── services
```

* При создании директив достаточно удобно будет сложить все связанные с ней файлы (к примеру, шаблоны, CSS/SASS, JavaScript) в один каталог. Если вы решите использовать этот подход, старайтесь придерживаться его во всём проекте.

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

Этот подход может сочетаться с любой из описанных выше структур каталогов.

* Unit тесты для проверки компонентов должны находиться в том же каталоге, что и сам компонент. В этом случае при изменении компонента вам не придётся долго искать его тесты. Также, при таком подходе, тесты играют роль документации и показывают примеры использования.

```
services
├── cache
│   ├── cache1.js
│   └── cache1.spec.js
└── models
    ├── model1.js
    └── model1.spec.js
```

* Файл `app.js` должен содержать определения маршрутов, конфигурацию и/или начальную инициализацию (если требуется).
* Каждый JavaScript файл должен содержать только один компонент. Имя файла должно соответствовать названию компонента.
* Используйте шаблоны для структуры AngularJS проектов, такие как [Yeoman](http://yeoman.io), [ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home).

Соглашения об именовании компонентов будут описаны в соответствующих секциях.

## <a name="markup"></a>Разметка

[TLDR;](http://developer.yahoo.com/blogs/ydn/high-performance-sites-rule-6-move-scripts-bottom-7200.html) Расположите скрипты в самом конце файла.

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

Указывайте атрибуты AngularJS (директивы) после стандартных. Так будет проще отделить элементы фреймворка от HTML-разметки (что, в свою очередь, сильно облегчит поддержку).

```
<form class="frm" ng-submit="login.authenticate()">
  <div>
    <input class="ipt" type="text" placeholder="name" require ng-model="user.name">
  </div>
</form>
```

Последовательность стандартных HTML атрибутов должна соответствовать следующим [рекомендациям](http://mdo.github.io/code-guide/#html-attribute-order).

## <a name="others"></a>Другое

* Используйте:
    * `$timeout` вместо `setTimeout`
    * `$interval` вместо `setInterval`
    * `$window` вместо `window`
    * `$document` вместо `document`
    * `$http` вместо `$.ajax`

Это сделает ваше тестирование гораздо проще и в некоторых случае убережет от неожиданного поведения (например, если вы забудете `$scope.$apply` в `setTimeout`).

* Автоматизируйте ваши процессы с помощью следующих инструментов:
    * [Yeoman](http://yeoman.io)
    * [Gulp](http://gulpjs.com)
    * [Grunt](http://gruntjs.com)
    * [Bower](http://bower.io)

* Используйте промисы (`$q`) взамен callback'ов. Это сделает ваш код более элегантным и чистым, а также спасет от "callback hell".
* Используйте `$resource` вместо `$http` где это возможно. Более высокий уровень абстракций убережет вас от избыточного кода.
* Используйте AngularJS pre-minifier (такой, как [ngmin](https://github.com/btford/ngmin) или [ng-annotate](https://github.com/olov/ng-annotate)) для избежания проблем после сжатия скриптов.
* Не используйте глобальное пространство имён. Разрешайте все зависимости с помощью Dependency Injection. Это уменьшит количество ошибок и убережёт от обезьяньей работы при тестировании.
* Не используйте глобальное пространство имён. Автоматизаторы Grunt/Gulp могут оборачивать ваш код в самовызывающиеся функции. У обоих есть готовые пакеты [grunt-wrap](https://www.npmjs.com/package/grunt-wrap) и [gulp-wrap](https://www.npmjs.com/package/gulp-wrap/). Как это выглядит (используя Gulp)

	```Javascript
	gulp.src("./src/*.js")
    .pipe(wrap('(function(){\n"use strict";\n<%= contents %>\n})();'))
    .pipe(gulp.dest("./dist"));
    ```
* Не захламляйте ваш `$scope`. Добавляйте только те переменные и функции, который будут использованы в шаблонах.
* Используйте [контроллеры вместо `ngInit`](https://github.com/angular/angular.js/pull/4366/files). Использовать `ngInit` рекомендуется только совместно с директивой `ngRepeat` и только для работы с её служебными свойствами. Во всех остальных случаях `$scope`-переменные должны инициализироваться в контроллерах. Переданные в `ngInit` выражения проходят лексический анализ, парсинг и выполнение интерпретатором сервиса `$parse`. Это может привести к:
    - Потере производительности, потому что интерпретатор написан на JavaScript
    - Ненужному кешированию обработанных выражений внутри сервиса `$parse`, потому что в подавляющем большинстве случаев выражения, прописанные в `ngInit`, используются только один раз
    - Большему риску появления ошибок - вы пишете код, как текстовую строку шаблона, соответственно нет подсветки синтаксиса и других плюшек вашего любимого редактора/IDE
    - Невозможности перехватывать run-time ошибки - они просто не будут брошены. 
* Не используйте префикс `$` при определении переменных, свойств и методов. Этот префикс зарезервирован для AngularJS.
* При перечислении зависимостей сперва указывайте встроенные, потом дополнительные:

```javascript
module.factory('Service', function ($rootScope, $timeout, MyCustomDependency1, MyCustomDependency2) {
  return {
    //Something
  };
});
```

# <a name="modules"></a>Модули

* Названия модулей должны соответстовать подходу lowerCamelCase. Для определения иерархии, например, что модуль `b` является подмодулем `a`, используйте пространства имён: `a.b`. 

Существует два основных способа структурирования модулей:

0. По функциональности.
0. По типу компонента.

На самом деле они не очень то и отличаются, но первый путь выглядит чище. Также, если ленивая загрузка модулей будет когда-нибудь реализована (в настоящее время нет в планах AngularJS) — это улучшит производительность приложения.

# <a name="controllers"></a>Контроллеры
* Не изменяйте DOM из контроллеров, это усложнит их тестирование, а также нарушит [Принцип разделения ответственности](https://en.wikipedia.org/wiki/Separation_of_concerns). Используйте для этого директивы.
* Именовать контроллер следует так, чтобы его имя состояло из части, описывающей то, чем он занимается (для примера: корзина, домашняя страница, админ-панель) и постфикса `Ctrl`. 
* Контроллеры - это стандартные [конструкторы](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor), соответвенно их имена записываются в UpperCamelCase (`HomePageCtrl`, `ShoppingCartCtrl`, `AdminPanelCtrl`, и т.д.).
* Контроллеры не должны быть объявлены в глобальном пространстве (хотя AngularJS и позволяет использовать этот подход, он засоряет глобальное пространство имён, а потому считается нежелательным).
* Используйте следующий синтаксис для объявления контроллеров:

   ```JavaScript
   function MyCtrl(dependency1, dependency2, ..., dependencyn) {
     // ...
   }
   module.controller('MyCtrl', MyCtrl);
   ```
   

Чтобы избежать проблем с минификацией файлов, вы можете автоматически генерировать определение с синтаксисом массива, используя инструменты типа [ng-annotate](https://github.com/olov/ng-annotate) (и задачи для grunt [grunt-ng-annotate](https://github.com/mzgol/grunt-ng-annotate)).

* Настоятельно рекомендуется использовать синтаксис `controller as`:

  ```
  <div ng-controller="MainCtrl as main">
    {{ main.title }}
  </div>
  ```
  
  ```JavaScript
  app.controller('MainCtrl', MainCtrl);
  
  function MainCtrl () {
    this.title = 'Some title';
  };
  ```
   
   Основные плюшки:
   * Создаётся 'изолированный' компонент - привязанные свойства не являются частью цепочки прототипов `$scope`. Это хороший подход, поскольку наследование прототипов `$scope` имеет серьёзные недостатки (вероятно, именно поэтому это было выкинуто из Angular 2):
      * Тяжело отследить, откуда к нам пришли данные.
      * Изменение значений `$scope` может затронуть участки кода, которые не должны были быть затронуты.
      * Гораздо тяжелее рефакторить.
      * '[Правило точки](http://jimhoskins.com/2012/12/14/nested-scopes-in-angularjs.html)'.
   * `$scope` не используется, если нам не нужны специфичные операции (типа `$scope.$broadcast`). Это хорошая подготовка к AngularJS V2.
   * Синтаксис значительно ближе к 'ванильному' конструктору JavaScript
   
   Больше о подходе `controller as` здесь: [digging-into-angulars-controller-as-syntax](http://toddmotto.com/digging-into-angulars-controller-as-syntax/)

* При использовании синтаксиса массива используйте оригинальные имена для зависимостей контроллера. Код будет более читабельным:

  ```JavaScript
  function MyCtrl(s) {
   // ...
  }
  
  module.controller('MyCtrl', ['$scope', MyCtrl]);
  ```

   читается гораздо хуже, чем:

  ```JavaScript
  function MyCtrl($scope) {
   // ...
  }
  module.controller('MyCtrl', ['$scope', MyCtrl]);
  ```

Особенно это актуально для больших файлов со множеством строк кода, который придется проскролить весь, чтобы понять, что есть что. В итоге можно легко забыть, какой зависимости отвечает та или иная переменная.

* Держите контроллеры настолько маленькими на сколько это возможно. Вынесите общие функции в сервисы.
* Не помещайте бизнес-логику в контроллеры. Вынесите её в сервис, как `model`.
  Пример:

  ```Javascript
  //Это часто наблюдаемый подход (и хороший пример "как не надо делать") использования бизнес-логики в контроллерах.
  angular.module('Store', [])
  .controller('OrderCtrl', function ($scope) {

    $scope.items = [];

    $scope.addToOrder = function (item) {
      $scope.items.push(item);//--> Бизнес-логика внутри контроллера
    };

    $scope.removeFromOrder = function (item) {
      $scope.items.splice($scope.items.indexOf(item), 1);//--> Бизнес-логика внутри контроллера
    };

    $scope.totalPrice = function () {
      return $scope.items.reduce(function (memo, item) {
        return memo + (item.qty * item.price);//--> Бизнес-логика внутри контроллера
      }, 0);
    };
  });
  ```

  Если же мы вынесем бизнес-логику в сервис типа 'model', контроллер будет выглядеть так (для примера имплементации сервиса обратитесь к примеру 'Вся бизнес-логика должна размещаться в сервисах'):

  ```Javascript
  //сервис Order используется в качестве 'model'
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

  Использование бизнес-логики или хранение состояния приложения в контроллерах не рекомендуется по следующим причинам:
  * Контроллеры инициализируются для каждого `view` и уничтожаются с ним же
  * Контроллеры нельзя переиспользовать - они завязаны на `view`
  * Контроллеры не могут быть использованы при внедрении зависимости (dependency injection)

* Организовывайте коммуникацию между контроллерами используя вызовы методов (например когда дети хотят связаться с родителями) или методы `$emit`, `$broadcast` и `$on`. Количество `$emit` и `$broadcast` сообщений должно быть сведено к минимуму.
* Создайте и поддерживайте список со всеми сообщениями пересылаемыми с помощью `$emit`, `$broadcast`, чтобы избежать коллизий имён и прочих возможных ошибок.

  Пример:
  
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
  
  * Если вам нужно отформатировать данные, перенесите логику форматирования в [фильтр](#filters) и укажите его как зависимость:
  
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

* При использовании вложенных контроллеров не забывайте про "nested scoping" (синтаксис `controllerAs`):

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

# <a name="directives"></a>Директивы

* Называйте ваши директивы используя lowerCamelCase.
* Используйте `scope` вместо `$scope` в функции `link`. При использовании функций compile, post/pre link им будут переданы предопределённые аргументы, которые нельзя будет изменить, используя DI. Такой стиль используется и внутри самого AngularJS.
* Используйте кастомные префиксы для ваших директив во избежание коллизий со сторонними библиотеками.
* Не используйте префиксы `ng` или `ui`, так как они зарезервированы для использования в AngularJS и AngularJS UI.
* Манипуляции с DOM должны производиться только с помощью директив.
* Создавайте изолированный scope когда вы разрабатываете переиспользуемые компоненты.
* Определяйте директивы через атрибуты или элементы, не используйте для этого классы или комментарии. Код будет куда более читабельным.
* Делайте `$scope.$on('$destroy', fn)` для очистки. Особенно актуально при оборачивании сторонних плагинов в директивы.
* Не забывайте про `$sce`, когда работаете с непроверенным контентом.

# <a name="filters"></a>Фильтры

* Называйте ваши фильтры используя lowerCamelCase.
* Фильтры должны быть максимально простыми. Они часто вызываются во время цикла `$digest`, поэтому один медленный фильтр может значительно замедлить все приложение.
* Один фильтр - одно простое действие. Несколько действий - несколько фильтров через `|`.

# <a name="services"></a>Сервисы

В этой секции описывается информация о сервисах в AngularJS. Способ объявления (например, `.factory`, `.service`) не важен, если не указано отдельно.

* Используйте camelCase при определении имён сервисов.
  * UpperCamelCase (PascalCase) должен использоваться для сервисов, используемых в качестве конструкторов:

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

  * lowerCamelCase для всех остальных сервисов.

* Вся бизнес-логика должна размещаться в сервисах. Хорошим подходом является использование принципа `model`:

  ```Javascript
  //Order is the 'model'
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

  Обратитесь к примеру 'Не помещайте бизнес-логику в контроллеры', в нём даны образцы кода "как не надо делать".
* Если сервис является конструктором, используйте `service` вместо `factory`. Это позволит использовать классическое наследование через прототипы:

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
* Для кеширования на уровне сессии можно использовать `$cacheFactory`. Этот метод подходит для кеширования результатов сложных вычислений или каких-либо запросов.
* Если сервис нуждается в настройке при старте приложения, определяйте его через `provider`, а затем конфигурируйте через коллбек `config`:

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

# <a name="templates"></a>Шаблоны

* Используйте `ng-bind` или `ng-cloak` вместо простого `{{ }}`, чтоб не показывать выражения до обработки их AngularJS.
* Избегайте написания сложного кода в шаблонах.
* Когда вам нужно динамически установить атрибут `src` у картинки, используйте `ng-src` вместо `src` с `{{ }}` внутри.
* Когда вам нужно динамически установить атрибут `href` в теге ссылки, используйте `ng-href` вместо `href` с `{{ }}` внутри.
* Вместо использования строковой переменной в scope и использовании ее в атрибуте `style` через шаблон `{{ }}`, используйте директиву `ng-style` с объектом в scope переменной, как значение:

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

# <a name="routing"></a>Маршрутизация

* Используйте `resolve` для разрешения зависимостей перед тем, как представление будет показано.
* Избегайте использования REST-запросов внутри `resolve`. Запросы должны размещаться в соответствующих сервисах. Это позволит использовать кеширование, а также следовать принципу разделения ответственности (Separation of concerns).

# i18n

* Начиная с версии 1.4.0 AngularJS содержит встроенные инструменты i18n. При работе с предыдущими версиями (<1.4.0) используйте [`angular-translate`](https://github.com/angular-translate/angular-translate).

# <a name="performance"></a>Производительность

* Оптимизируйте цикл `$digest`

  * Следите (watch) только за теми переменными, где это действительно необходимо. Если требуется явно запустить цикл `$digest` (это должны быть ну очень исключительные случаи), запускайте его только в тех местах, где это действительно необходимо. К примеру, при использовании коммуникации в реальном времени обычно нет нужды запускать цикл `$digest` для каждого полученного сообщения.
  * Для контента, который меняется только раз, используйте одноразовые watch. Они есть в AngularJS >= 1.3.0. При использовании более старых версий можно использовать набор директив [`bindonce`](https://github.com/Pasvaz/bindonce).
    ```html
    <div>
      {{ ::main.things }}
    </div>
    ```
    или
    ```html
      <div ng-bind="::main.things"></div>
    ```
    После этого, для `main.things` не будет создано **ни одного** watch и любые дальнейшие изменения `main.things` не будет отражены на странице.
  * Сделайте вычисления в `$watch` максимально простыми. Любые сложные и медленные вычисления в `$watch` замедляют выполнение всего приложения (цикл `$digest` работает в одном потоке, потому что JavaScript однопоточный).
  * При отслеживании коллекций с помощью `$watch` используйте глубокое отслеживание только если это действительно необходимо. Обычно достаточно использовать `$watchCollection`, который выполняет простую проверку свойств только первого уровня наблюдаемого объекта. 
  * При вызове функции `$timeout` устанавливайте третий параметр в false, если функция обратного вызова не изменяет отслеживаемые переменные. В этом случае `$digest` не будет вызван после выполнения функции. 
  * При работе с редко изменяемыми большими коллекциями, [используйте неизменяемые структуры данных](http://blog.mgechev.com/2015/03/02/immutability-in-angularjs-immutablejs).

* Не забывайте про способы уменьшения количества запросов к серверу. Одним из них является объединение/кеширование шаблонов в один файл, к примеру используя [grunt-html2js](https://github.com/karlgoldstein/grunt-html2js) / [gulp-html2js](https://github.com/fraserxu/gulp-html2js). [Здесь](http://ng-learn.org/2014/08/Populating_template_cache_with_html2js/) и [здесь](http://slides.com/yanivefraim-1/real-world-angularjs#/34) есть подробная информация. Эффект особенно ощутим, если проект содержит много отдельных файлов шаблонов небольшого размера.

# <a name="contribution"></a>Вклад

Поскольку это руководство должно писаться сообществом, любой вклад в его развитие крайне приветствуется.
К примеру, вы можете заняться секцией "Тестирование" или переводом всего документа на ваш язык.
