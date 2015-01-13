# Introduction

The goal of this style guide is to present a set of best practices and style guidelines for one AngularJS application.
These best practices are collected from:

0. AngularJS source code
0. Source code or articles I've read
0. My own experience

**Note 1**: this is still a draft of the style guide, its main goal is to be community-driven so filling the gaps will be greatly appreciated by the whole community.

**Note 2**: before following any of the guidelines in the translations of the English document, make sure they are up-to date. The latest version of the AngularJS style guide is in the current document.

In this style guide you won't find common guidelines for JavaScript development. Such can be found at:

0. [Google's JavaScript style guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
0. [Mozilla's JavaScript style guide](https://developer.mozilla.org/en-US/docs/Developer_Guide/Coding_Style)
0. [GitHub's JavaScript style guide](https://github.com/styleguide/javascript)
0. [Douglas Crockford's JavaScript style guide](http://javascript.crockford.com/code.html)
0. [Airbnb JavaScript style guide](https://github.com/airbnb/javascript)

For AngularJS development recommended is the [Google's JavaScript style guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml).

In AngularJS's GitHub wiki there is a similar section by [ProLoser](https://github.com/ProLoser), you can check it [here](https://github.com/angular/angular.js/wiki).

# Table of content
* [General](#general)
    * [Directory structure](#directory-structure)
    * [Markup](#markup)
    * [Optimize the digest cycle](#optimize-the-digest-cycle)
    * [Others](#others)
* [Modules](#modules)
* [Controllers](#controllers)
* [Directives](#directives)
* [Filters](#filters)
* [Services](#services)
* [Templates](#templates)
* [Routing](#routing)
* [Testing](#testing)
* [Contribution](#contribution)
* [Contributors](#contributors)

# General

## Directory structure

Since a large AngularJS application has many components it's best to structure it in a directory hierarchy.
There are two main approaches:

* Creating high-level divisions by component types and lower-level divisions by functionality.

In this way the directory structure will look like:

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

* Creating high-level divisions by functionality and lower-level divisions by component types.

Here is its layout:

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

* When creating directives it may be useful to put all the files associated with the given directive files (i.e. templates, CSS/SASS files, JavaScript) in a single folder. If you choose to use this style be consistent and use it everywhere along your project.

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

This approach can be combined with both directory structures above.
* One more slight variation of both directory structures is the one used in [ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home). In it, the unit tests for a given component are put in the folder where the component is located. This way when you make changes to a given component finding its test is easy. The tests also act as documentation and show use cases.

```
services
├── cache
│   ├── cache1.js
│   └── cache1.spec.js
└── models
    ├── model1.js
    └── model1.spec.js
```

* The `app.js` file contains route definitions, configuration and/or manual bootstrap (if required).
* Each JavaScript file should only hold a single component. The file should be named with the component's name.
* Use Angular project structure template like [Yeoman](http://yeoman.io), [ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home).

I prefer the first structure because it makes common components easier to find.

Conventions about component naming can be found in each component section.

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

## Optimize the digest cycle

* Watch only the most vital variables (for example: when using real-time communication, don't cause a `$digest` loop in each received message).
* For content that is initialized only once and then never changed, use single-time watchers like [`bindonce`](https://github.com/Pasvaz/bindonce).
* Make computations in `$watch`  as simple as possible. Making heavy and slow computations in a single `$watch` will slow down the whole application (the `$digest` loop is done in a single thread because of the single-threaded nature of JavaScript).
* Set third parameter in `$timeout` function to false to skip the `$digest` loop when no watched variables are impacted by the invocation of the `$timeout` callback function.

## Others

* Use:
    * `$timeout` instead of `setTimeout`
    * `$interval` instead of `setInterval`
    * `$window` instead of `window`
    * `$document` instead of `document`
    * `$http` instead of `$.ajax`

This will make your testing easier and in some cases prevent unexpected behaviour (for example, if you missed `$scope.$apply` in `setTimeout`).

* Automate your workflow using tools like:
    * [Yeoman](http://yeoman.io)
    * [Grunt](http://gruntjs.com)
    * [Bower](http://bower.io)

* Use promises (`$q`) instead of callbacks. It will make your code look more elegant and clean, and save you from callback hell.
* Use `$resource` instead of `$http` when possible. The higher level of abstraction will save you from redundancy.
* Use an AngularJS pre-minifier ([ng-annotate](https://github.com/olov/ng-annotate)) for preventing problems after minification.
* Don't use globals. Resolve all dependencies using Dependency Injection.
* Do not pollute your `$scope`. Only add functions and variables that are being used in the templates.
* Prefer the usage of [controllers instead of `ngInit`](https://github.com/angular/angular.js/pull/4366/files). The only appropriate use of `ngInit` is for aliasing special properties of `ngRepeat`. Besides this case, you should use controllers rather than `ngInit` to initialize values on a scope.
* Do not use `$` prefix for the names of variables, properties and methods. This prefix is reserved for AngularJS usage.
* When resolving dependencies through the DI mechanism of AngularJS, sort the dependencies by their type - the built-in AngularJS dependencies should be first, followed by your custom ones:

```javascript
module.factory('Service', function ($rootScope, $timeout, MyCustomDependency1, MyCustomDependency2) {
  return {
    //Something
  };
});
```

# Modules

* Modules should be named with lowerCamelCase. For indicating that module `b` is submodule of module `a` you can nest them by using namespacing like: `a.b`.

There are two common ways for structuring the modules:

0. By functionality
0. By component type

Currently there's not a big difference, but the first way looks cleaner. Also, if lazy-loading modules is implemented (currently not in the AngularJS roadmap), it will improve the app's performance.

# Controllers

* Do not manipulate DOM in your controllers, this will make your controllers harder for testing and will violate the [Separation of Concerns principle](https://en.wikipedia.org/wiki/Separation_of_concerns). Use directives instead.
* The naming of the controller is done using the controller's functionality (for example shopping cart, homepage, admin panel) and the substring `Ctrl` in the end. The controllers are named UpperCamelCase (`HomePageCtrl`, `ShoppingCartCtrl`, `AdminPanelCtrl`, etc.).
* The controllers should not be defined as globals (even though AngularJS allows this, it is a bad practice to pollute the global namespace).
* Use array syntax for controller definitions:


```JavaScript
module.controller('MyCtrl', ['dependency1', 'dependency2', ..., 'dependencyn', function (dependency1, dependency2, ..., dependencyn) {
  //...body
}]);
```


Using this type of definition avoids problems with minification. You can automatically generate the array definition from the standard one using tools like [ng-annotate](https://github.com/olov/ng-annotate) (and grunt task [grunt-ng-annotate](https://github.com/mzgol/grunt-ng-annotate)).
* Use the original names of the controller's dependencies. This will help you produce more readable code:

```JavaScript
module.controller('MyCtrl', ['$scope', function (s) {
  //...body
}]);
```

which is less readable than:

```JavaScript
module.controller('MyCtrl', ['$scope', function ($scope) {
  //...body
}]);
```

This especially applies to a file that has so much code that you'd need to scroll through. This would possibly cause you to forget which variable is tied to which dependency.

* Make the controllers as lean as possible. Abstract commonly used functions into a service.
* Communicate within different controllers using method invocation (possible when a child wants to communicate with its parent) or `$emit`, `$broadcast` and `$on` methods. The emitted and broadcasted messages should be kept to a minimum.
* Make a list of all messages which are passed using `$emit`, `$broadcast` and manage it carefully because of name collisions and possible bugs.
* When you need to format data encapsulate the formatting logic into a [filter](#filters) and declare it as dependency:

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

* Name your directives with lowerCamelCase.
* Use `scope` instead of `$scope` in your link function. In the compile, post/pre link functions you have already defined arguments which will be passed when the function is invoked, you won't be able to change them using DI. This style is also used in AngularJS's source code.
* Use custom prefixes for your directives to prevent name collisions with third-party libraries.
* Do not use `ng` or `ui` prefixes since they are reserved for AngularJS and AngularJS UI usage.
* DOM manipulations must be done only through directives.
* Create an isolated scope when you develop reusable components.
* Use directives as attributes or elements instead of comments or classes, this will make your code more readable.
* Use `$scope.$on('$destroy', fn)` for cleaning up. This is especially useful when you're wrapping third-party plugins as directives.
* Do not forget to use `$sce` when you should deal with untrusted content.

# Filters

* Name your filters with lowerCamelCase.
* Make your filters as light as possible. They are called often during the `$digest` loop so creating a slow filter will slow down your app.
* Do a single thing in your filters, keep them coherent. More complex manipulations can be achieved by piping existing filters.

# Services

This section includes information about the service component in AngularJS. It is not dependent of the way of definition (i.e. as provider, `.factory`, `.service`), except if explicitly mentioned.

* Use camelCase to name your services.
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

* Encapsulate all the business logic in services.
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

* For session-level cache you can use `$cacheFactory`. This should be used to cache results from requests or heavy computations.
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

# Templates

* Use `ng-bind` or `ng-cloak` instead of simple `{{ }}` to prevent flashing content.
* Avoid writing complex expressions in the templates.
* When you need to set the `src` of an image dynamically use `ng-src` instead of `src` with `{{ }}` template.
* When you need to set the `href` of an anchor tag dynamically use `ng-href` instead of `href` with `{{ }}` template.
* Instead of using scope variable as string and using it with `style` attribute with `{{ }}`, use the directive `ng-style` with object-like parameters and scope variables as values:

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

# Routing

* Use `resolve` to resolve dependencies before the view is shown.

# Contribution

Since the goal of this style guide is to be community-driven, contributions are greatly appreciated.
For example, you can contribute by extending the Testing section or by translating the style guide to your language.

# Contributors

[<img alt="mgechev" src="https://avatars.githubusercontent.com/u/455023?v=3&s=117" width="117">](https://github.com/mgechev)[<img alt="pascalockert" src="https://avatars.githubusercontent.com/u/4253438?v=3&s=117" width="117">](https://github.com/pascalockert)[<img alt="mainyaa" src="https://avatars.githubusercontent.com/u/800781?v=3&s=117" width="117">](https://github.com/mainyaa)[<img alt="ericguirbal" src="https://avatars.githubusercontent.com/u/322135?v=3&s=117" width="117">](https://github.com/ericguirbal)[<img alt="rubystream" src="https://avatars.githubusercontent.com/u/3200?v=3&s=117" width="117">](https://github.com/rubystream)[<img alt="lukaszklis" src="https://avatars.githubusercontent.com/u/11782?v=3&s=117" width="117">](https://github.com/lukaszklis)

[<img alt="agnislav" src="https://avatars.githubusercontent.com/u/364255?v=3&s=117" width="117">](https://github.com/agnislav)[<img alt="cironunes" src="https://avatars.githubusercontent.com/u/469908?v=3&s=117" width="117">](https://github.com/cironunes)[<img alt="guiltry" src="https://avatars.githubusercontent.com/u/1484308?v=3&s=117" width="117">](https://github.com/guiltry)[<img alt="tornad" src="https://avatars.githubusercontent.com/u/2128499?v=3&s=117" width="117">](https://github.com/tornad)[<img alt="jmblog" src="https://avatars.githubusercontent.com/u/86085?v=3&s=117" width="117">](https://github.com/jmblog)[<img alt="kuzzmi" src="https://avatars.githubusercontent.com/u/1727140?v=3&s=117" width="117">](https://github.com/kuzzmi)

[<img alt="cavarzan" src="https://avatars.githubusercontent.com/u/3915288?v=3&s=117" width="117">](https://github.com/cavarzan)[<img alt="gsamokovarov" src="https://avatars.githubusercontent.com/u/604618?v=3&s=117" width="117">](https://github.com/gsamokovarov)[<img alt="astalker" src="https://avatars.githubusercontent.com/u/1486567?v=3&s=117" width="117">](https://github.com/astalker)[<img alt="mariolamacchia" src="https://avatars.githubusercontent.com/u/6282722?v=3&s=117" width="117">](https://github.com/mariolamacchia)[<img alt="valgreens" src="https://avatars.githubusercontent.com/u/903263?v=3&s=117" width="117">](https://github.com/valgreens)[<img alt="bitdeli-chef" src="https://avatars.githubusercontent.com/u/3092978?v=3&s=117" width="117">](https://github.com/bitdeli-chef)

[<img alt="bradgearon" src="https://avatars.githubusercontent.com/u/1731943?v=3&s=117" width="117">](https://github.com/bradgearon)[<img alt="dchest" src="https://avatars.githubusercontent.com/u/52677?v=3&s=117" width="117">](https://github.com/dchest)[<img alt="dreame4" src="https://avatars.githubusercontent.com/u/277870?v=3&s=117" width="117">](https://github.com/dreame4)[<img alt="bargaorobalo" src="https://avatars.githubusercontent.com/u/993001?v=3&s=117" width="117">](https://github.com/bargaorobalo)[<img alt="hermankan" src="https://avatars.githubusercontent.com/u/2899106?v=3&s=117" width="117">](https://github.com/hermankan)[<img alt="jain208" src="https://avatars.githubusercontent.com/u/1830537?v=3&s=117" width="117">](https://github.com/jain208)

[<img alt="jesselpalmer" src="https://avatars.githubusercontent.com/u/682097?v=3&s=117" width="117">](https://github.com/jesselpalmer)[<img alt="capaj" src="https://avatars.githubusercontent.com/u/1305378?v=3&s=117" width="117">](https://github.com/capaj)[<img alt="johnnyghost" src="https://avatars.githubusercontent.com/u/1117330?v=3&s=117" width="117">](https://github.com/johnnyghost)[<img alt="jordanyee" src="https://avatars.githubusercontent.com/u/3303098?v=3&s=117" width="117">](https://github.com/jordanyee)[<img alt="nacyot" src="https://avatars.githubusercontent.com/u/148919?v=3&s=117" width="117">](https://github.com/nacyot)[<img alt="apetro" src="https://avatars.githubusercontent.com/u/952283?v=3&s=117" width="117">](https://github.com/apetro)

[<img alt="sahat" src="https://avatars.githubusercontent.com/u/544954?v=3&s=117" width="117">](https://github.com/sahat)[<img alt="kirstein" src="https://avatars.githubusercontent.com/u/426442?v=3&s=117" width="117">](https://github.com/kirstein)[<img alt="cryptojuice" src="https://avatars.githubusercontent.com/u/458883?v=3&s=117" width="117">](https://github.com/cryptojuice)[<img alt="olov" src="https://avatars.githubusercontent.com/u/19247?v=3&s=117" width="117">](https://github.com/olov)[<img alt="vorktanamobay" src="https://avatars.githubusercontent.com/u/2623355?v=3&s=117" width="117">](https://github.com/vorktanamobay)[<img alt="mo-gr" src="https://avatars.githubusercontent.com/u/95577?v=3&s=117" width="117">](https://github.com/mo-gr)

[<img alt="thomastuts" src="https://avatars.githubusercontent.com/u/1914255?v=3&s=117" width="117">](https://github.com/thomastuts)[<img alt="grapswiz" src="https://avatars.githubusercontent.com/u/309459?v=3&s=117" width="117">](https://github.com/grapswiz)[<img alt="coderhaoxin" src="https://avatars.githubusercontent.com/u/2569835?v=3&s=117" width="117">](https://github.com/coderhaoxin)[<img alt="ntaoo" src="https://avatars.githubusercontent.com/u/511213?v=3&s=117" width="117">](https://github.com/ntaoo)[<img alt="kuzmeig1" src="https://avatars.githubusercontent.com/u/8707951?v=3&s=117" width="117">](https://github.com/kuzmeig1)

