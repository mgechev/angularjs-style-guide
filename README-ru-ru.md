# Введение

Цель данного руководства — предоставить набор лучших практик и рекомендаций по стилю для AngularJS приложений.

В работе были использованы следующие источники:

0. Исходный код AngularJS.
0. Мной прочитанные статьи.
0. Мой собственный опыт.

**Замечание 1**: это все еще черновик, главная цель которого — это-то, чтобы его развивало сообщество и поэтому восполнение любых пробелов будет принято с благодарностью.

**Замечание 2**: перед использование рекомендаций, описанных в данном переводе, убедитесь, что они соответствуют текущей версии оригинала.

В этом руководстве вы не найдете общих требований к стилю для разработки на JavaScript. Они есть тут:

0. [Google's JavaScript style guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
0. [Mozilla's JavaScript style guide](https://developer.mozilla.org/en-US/docs/Developer_Guide/Coding_Style)
0. [GitHub's JavaScript style guide](https://github.com/styleguide/javascript)
0. [Douglas Crockford's JavaScript style guide](http://javascript.crockford.com/code.html)
0. [Airbnb JavaScript style guide](https://github.com/airbnb/javascript)

При разработке приложений на AngularJS рекомендуется использовать [Google's JavaScript style guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml).

На wiki странице GitHub репозитория AngularJS есть похожая секция, созданная [ProLoser](https://github.com/ProLoser), которая находится [здесь](https://github.com/angular/angular.js/wiki).

# Содержание
* [Общие](#general)
    * [Файловая структура](#directory-structure)
    * [Разметка](#markup)
    * [Оптимизация цикла обработки](#optimize-the-digest-cycle)
    * [Другое](#others)
* [Модули](#modules)
* [Контроллеры](#controllers)
* [Директивы](#directives)
* [Фильтры](#filters)
* [Сервисы](#services)
* [Шаблоны](#templates)
* [Маршрутизация](#routing)
* [Тестирование](#testing)
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

* Существует еще один способ, который немного отличается от описанных выше подходов. Он используется, к примеру, в [ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home). Его особенность в том, что unit тесты для проверки компонентов находятся в том же каталоге, что и сам компонент. В этом случае при изменении компонента вам не придётся долго искать его тесты. Также, при таком подходе, тесты играют роль документации и показывают примеры использования.

```
services
├── cache
│   ├── cache1.js
│   └── cache1.spec.js
└── models
    ├── model1.js
    └── model1.spec.js
```

* Файл `app.js` содержит определения маршрутов, конфигурацию и/или начальную инициализацию (если требуется).
* Каждый JavaScript файл должен содержать только один компонент. Имя файла должно соответствовать названию компонента.
* Используйте шаблоны для структуры AngularJS проектов, такие как [Yeoman](http://yeoman.io), [ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home).

Я предпочитаю первую структуру каталогов, в ней гораздо легче найти стандартные компоненты.

Соглашения об именовании компонентов будут описаны в соответствующих секциях.

## <a name="markup"></a>Разметка

[TLDR;](http://developer.yahoo.com/blogs/ydn/high-performance-sites-rule-6-move-scripts-bottom-7200.html) Загружайте скрипты как можно позже. Расположите их в самом конце страницы.

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

Указывайте директивы после стандартных атрибутов. Так будет проще отделить элементы фреймворка от HTML-разметки (что, в свою очередь, сильно облегчит поддержку).

```
<form class="frm" ng-submit="login.authenticate()">
  <div>
    <input class="ipt" type="text" placeholder="name" require ng-model="user.name">
  </div>
</form>
```

Последовательность стандартных HTML атрибутов должна соответствовать следующим [рекомендациям](http://mdo.github.io/code-guide/#html-attribute-order).

## <a name="optimize-the-digest-cycle"></a>Оптимизация цикла обработки

* Следите (watch) только за теми переменными, где это действительно необходимо (для примера: при использовании real-time коммуникации не вызывайте цикл `$digest` для каждого полученного сообщения).
* Для контента, который меняется только раз, используйте одноразовые watch, например, [`bindonce`](https://github.com/Pasvaz/bindonce).
* Сделайте вычисления в `$watch` максимально простыми. Любые сложные вычисления в `$watch` замедляют выполнение всего приложения (цикл `$digest` работает в одном потоке, потому что JavaScript однопоточный).
* При вызове функции `$timeout` устанавливайте третий параметр в false, если функция обратного вызова не изменяет отслеживаемые переменные. В этом случае `$digest` не будет вызван после выполнения функции. 

## <a name="others"></a>Другое

* Используйте:
    * `$timeout` вместо `setTimeout`
    * `$window` вместо `window`
    * `$document` вместо `document`
    * `$http` вместо `$.ajax`

Это сделает ваше тестирование гораздо проще и в некоторых случае убережет от неожиданного поведения (например, если вы забудете `$scope.$apply` в `setTimeout`).

* Автоматизируйте ваши процессы с помощью следующих инструментов:
    * [Yeoman](http://yeoman.io)
    * [Grunt](http://gruntjs.com)
    * [Bower](http://bower.io)

* Используйте промисы (`$q`) взамен callback'ов. Это сделает ваш код более элегантным и чистым, а также спасет от "callback hell".
* Используйте `$resource` вместо `$http` где это возможно. Более высокий уровень абстракций убережет вас от избыточного кода.
* Используйте AngularJS pre-minifier (такой, как [ngmin](https://github.com/btford/ngmin) или [ng-annotate](https://github.com/olov/ng-annotate)) для избежания проблем после сжатия скриптов.
* Не используйте глобальное пространство имен. Разрешайте все зависимости с помощью Dependency Injection.
* Не захламляйте ваш `$scope`. Добавляйте только те переменные и функции, который будут использованы в шаблонах.
* Используйте [контроллеры вместо `ngInit`](https://github.com/angular/angular.js/pull/4366/files). Использовать `ngInit` рекомендуется только совместно с директивой `ngRepeat` и только для работы с её служебными свойствами. Во всех остальных случаях `$scope`-переменные должны инициализироваться в контроллерах.
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

Существует два общих способа для структурирования модулей:

0. По функциональности.
0. По типу компонента.

На самом деле они не очень то и отличаются, но первый путь выглядит чище. Также если ленивая загрузка модулей будет когда-нибудь реализована (в настоящее время нет в планах AngularJS) — это бы улучшило производительность приложения.

# <a name="controllers"></a>Контроллеры
* Не работайте с DOM из контроллеров, это усложнит их тестирование, а также нарушит [Принцип разделения ответственности](https://en.wikipedia.org/wiki/Separation_of_concerns). Используйте для этого директивы.
* Именовать контроллеры правильно так, чтобы его имя остояло из части описывающей то чем он занимается (для примера: корзина, домашняя страница, админ панель) и постфикса `Ctrl`. Имена контроллеров записываются в UpperCamelCase (`HomePageCtrl`, `ShoppingCartCtrl`, `AdminPanelCtrl`, и т.д.).
* Контроллеры не должны быть объявлены в глобальном пространстве (хотя AngularJS и позволяет использовать этот подход, он засоряет глобальное пространство имём, а потому считается нежелательным).
* Используйте синтаксис массивов для объявления контроллеров:

```JavaScript
module.controller('MyCtrl', ['dependency1', 'dependency2', ..., 'dependencyn', function (dependency1, dependency2, ..., dependencyn) {
  //...body
}]);
```

Этот подход избавляет от проблем с минификацией файлов. Вы можете автоматически сгенерировать определение с синтаксисом массива используя инструмент такой, как [ng-annotate](https://github.com/olov/ng-annotate) (и задачи для grunt [grunt-ng-annotate](https://github.com/mzgol/grunt-ng-annotate)).

* Используйте оригинальные имена для зависимостей контроллера. Код будет более читабельным:

```JavaScript
module.controller('MyCtrl', ['$scope', function (s) {
  //...body
}]);
```

Читается гораздо хуже, чем:

```JavaScript
module.controller('MyCtrl', ['$scope', function ($scope) {
  //...body
}]);
```

Особенно это актуально для больших файлов со множеством строк кода, который придется проскролить весь, чтобы понять, что есть что. В итоге можно легко забыть, какой зависимости отвечает та или иная переменная.

* Держите контроллеры настолько маленькими на сколько это возможно. Вынесите общие функции в сервисы.
* Организовывайте коммуникацию между контроллерами используя вызовы методов (например когда дети хотят связаться с родителями) или методы `$emit`, `$broadcast` и `$on`. Количество `$emit`, `$broadcast` сообщений должно быть сведено к минимуму.
* Создайте и поддерживайте список со всеми сообщениями пересылаемыми с помощью `$emit`, `$broadcast`, чтобы избежать коллизий имен и прочих возможных ошибок.
* Если вам нужно отформатировать данные, перенесите логику форматирования в [фильтр](#filters) и укажите его как зависимость:

```JavaScript
module.filter('myFormat', function () {
  return function () {
    //body...
  };
});

module.controller('MyCtrl', ['$scope', 'myFormatFilter', function ($scope, myFormatFilter) {
  //body...
}]);
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
* Используйте кастомные префиксы для ваших директив во избежании коллизий со сторонними библиотеками.
* Не используйте префиксы `ng` или `ui`, так как они зарезервированы для использования в AngularJS и AngularJS UI.
* Манипуляции с DOM должны производиться только с помощью директив.
* Создавайте изолированный scope когда вы разрабатываете переиспользуемые компоненты.
* Определяйте директивы через атрибуты или элементы, не используйте для этого классы или комментарии. Код будет куда более читабельным.
* Делайте `$scope.$on('$destroy', fn)` для очистки. Особенно актуально при оборачивании сторонних плагинов в директивы.
* Не забывайте про `$sce`, когда работаете с непроверенным контентом.

# <a name="filters"></a>Фильтры

* Называйте ваши фильтры используя lowerCamelCase.
* Сохраняйте ваши фильтры настолько простыми насколько это возможно. Они часто вызываются  во время `$digest` цикла, так что медленный фильтр тормозит все приложение.
* Один фильтр - одно простое действие. Несколько действий - несколько фильтров через `|`.

# <a name="services"></a>Сервисы

В этой секции описывается информация о сервисах в AngularJS вне зависимости от способа определения (например, `.factory`, `.service`), если не сказано обратное.

* Используйте camelCase при определении имён сервисов.
  * UpperCamelCase (PascalCase) должен использоваться для сервисов, используемых в качестве конструкторов:

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

  * lowerCamelCase для всех остальных сервисов.

* Вся бизнес-логика должна определяеться в сервисах.
* При описании "классов" используйте `service` или `factory`. Единого мнения пока нет, обсуждение идёт [здесь](mgechev/angularjs-style-guide#63)
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
* Когда вам нужно динамически установить аттрибут `src` у картинки, используйте `ng-src` вместо `src` с `{{ }}` внутри.
* Когда вам нужно динамически установить аттрибут `href` в теге ссылки, используйте `ng-href` вместо `href` с `{{ }}` внутри.
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

# <a name="testing"></a>Тестирование

TBD

Пока эта секция не готова, можно использовать [эти рекомендации](https://github.com/daniellmb/angular-test-patterns).

# <a name="contribution"></a>Вклад

Поскольку это руководство должно писаться сообществом, любой вклад в его развитие крайне приветствуется.
К примеру, вы можете заняться секцией "Тестирование" или переводом всего документа на ваш язык.
