#Introduction

The goal of this style guide is to present a set of best practices and style guidelines for one AngularJS application.
These best practices are collected from:

0. AngularJS source code
0. Source code or articles I've read
0. My own experience

**Note**: this is still a draft of the style guide, its main goal is to be community-driven so filling the gaps will be greatly appreciated by the whole community.

In this style guide you won't find common guidelines for JavaScript development. Such can be found at:

0. [Google's JavaScript style guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
0. [Mozilla's JavaScript style guide](https://developer.mozilla.org/en-US/docs/Developer_Guide/Coding_Style)
0. [GitHub's JavaScript style guide](https://github.com/styleguide/javascript)
0. [Douglas Crockford's JavaScript style guide](http://javascript.crockford.com/code.html)
0. [Airbnb JavaScript style guide](https://github.com/airbnb/javascript)

For AngularJS development recommended is the [Google's JavaScript style guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml).

In AngularJS's GitHub wiki there is a similar section by [ProLoser](https://github.com/ProLoser), you can check it [here](https://github.com/angular/angular.js/wiki).

#Table of content
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

#General

## Directory structure

Since a large AngularJS application has many components it's best to structure them in a directory hierarchy.
There are two main approaches:

* Creating high-level divisions by component types and lower-level divisions by functionality.

In this way the directory structure will look like:

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

The HTML markup is important too and should be written by the team as if it were the same person.

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
* Use an AngularJS pre-minifier (like [ngmin](https://github.com/btford/ngmin) or [ng-annotate](https://github.com/olov/ng-annotate)) for preventing problems after minification.
* Don't use globals. Resolve all dependencies using Dependency Injection.
* Do not pollute your `$scope`. Only add functions and variables that are being used in the templates.
* Prefer the usage of [controllers instead of `ngInit`](https://github.com/angular/angular.js/pull/4366/files). The only appropriate use of `ngInit` is for aliasing special properties of `ngRepeat`. Besides this case, you should use controllers rather than `ngInit` to initialize values on a scope.
* Do not use `$` prefix for the names of variables, properties and methods. This prefix is reserved for AngularJS usage.

#Modules

* Modules should be named with lowerCamelCase. For indicating that module `b` is submodule of module `a` you can nest them by using namespacing like: `a.b`.

There are two common ways for structuring the modules:

0. By functionality
0. By component type

Currently there's not a big difference, but the first way looks cleaner. Also, if lazy-loading modules is implemented (currently not in the AngularJS roadmap), it will improve the app's performance.

#Controllers

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

#Directives

* Name your directives with lowerCamelCase.
* Use `scope` instead of `$scope` in your link function. In the compile, post/pre link functions you have already defined arguments which will be passed when the function is invoked, you won't be able to change them using DI. This style is also used in AngularJS's source code.
* Use custom prefixes for your directives to prevent name collisions with third-party libraries.
* Do not use `ng` or `ui` prefixes since they are reserved for AngularJS and AngularJS UI usage.
* DOM manipulations must be done only through directives.
* Create an isolated scope when you develop reusable components.
* Use directives as attributes or elements instead of comments or classes, this will make your code more readable.
* Use `$scope.$on('$destroy', fn)` for cleaning up. This is especially useful when you're wrapping third-party plugins as directives.
* Do not forget to use `$sce` when you should deal with untrusted content.

#Filters

* Name your filters with lowerCamelCase.
* Make your filters as light as possible. They are called often during the `$digest` loop so creating a slow filter will slow down your app.
* Do a single thing in your filters, keep them coherent. More complex manipulations can be achieved by piping existing filters.

#Services

* Use camelCase to name your services.
  * UpperCamelCase (PascalCase) for naming your services, used as constructor functions.
  * lowerCamelCase for all other services.
* Encapsulate business logic in services.
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

#Templates

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

#Routing

* Use `resolve` to resolve dependencies before the view is shown.

#Testing

TBD

Until this section is completed you can use [this one](https://github.com/daniellmb/angular-test-patterns).

#Contribution

Since the goal of this style guide is to be community-driven, contributions are greatly appriciated.
For example, you can contribute by extending the Testing section or by translating the style guide to your language.

#Contributors

[![mgechev](http://www.gravatar.com/avatar/82bafb0432ce4ccc9dcc26f94d5fe5bc?s=117)](https://github.com/mgechev) |[![pascalockert](http://www.gravatar.com/avatar/cf3cf69f535e77166c17bc5f586514f5?s=117)](https://github.com/pascalockert) |[![mainyaa](http://www.gravatar.com/avatar/c274adeb5303a1aae51f1e34bd7a3bc3?s=117)](https://github.com/mainyaa) |[![rubystream](http://www.gravatar.com/avatar/04952a6ee948f345e9c3727850d09a1b?s=117)](https://github.com/rubystream) |[![lukaszklis](http://www.gravatar.com/avatar/7a30aca2cf9658558247348b3be8c35e?s=117)](https://github.com/lukaszklis) |
:---: |:---: |:---: |:---: |:---: |
[mgechev](https://github.com/mgechev) |[pascalockert](https://github.com/pascalockert) |[mainyaa](https://github.com/mainyaa) |[rubystream](https://github.com/rubystream) |[lukaszklis](https://github.com/lukaszklis) |

[![cironunes](http://www.gravatar.com/avatar/ac4189b770a4dbc0078935a68fff6f5c?s=117)](https://github.com/cironunes) |[![cavarzan](http://www.gravatar.com/avatar/929196ae336bbd9c18ad01f934b66e7a?s=117)](https://github.com/cavarzan) |[![tornad](http://www.gravatar.com/avatar/3e7f3900bc0c63b6bb6b27226decd16c?s=117)](https://github.com/tornad) |[![bargaorobalo](http://www.gravatar.com/avatar/b7192b6465bbe490cd52ba35284875dd?s=117)](https://github.com/bargaorobalo) |[![astalker](http://www.gravatar.com/avatar/5a3df42b090e503da2a645fd8ee9e1ae?s=117)](https://github.com/astalker) |
:---: |:---: |:---: |:---: |:---: |
[cironunes](https://github.com/cironunes) |[cavarzan](https://github.com/cavarzan) |[tornad](https://github.com/tornad) |[bargaorobalo](https://github.com/bargaorobalo) |[astalker](https://github.com/astalker) |

[![valgreens](http://www.gravatar.com/avatar/051395c4c052ac12282b5cf305441986?s=117)](https://github.com/valgreens) |[![bitdeli-chef](http://www.gravatar.com/avatar/b42c651650ec8d3d95829c75e318af2d?s=117)](https://github.com/bitdeli-chef) |[![dchest](http://www.gravatar.com/avatar/641aceb7e3d2eebea49f397c38048d0b?s=117)](https://github.com/dchest) |[![gsamokovarov](http://www.gravatar.com/avatar/1ac5a00efa41cd58c421d3cd98dda7b9?s=117)](https://github.com/gsamokovarov) |[![ntaoo](http://www.gravatar.com/avatar/791510818e4126572f81b2fbdd94bcc8?s=117)](https://github.com/ntaoo) |
:---: |:---: |:---: |:---: |:---: |
[valgreens](https://github.com/valgreens) |[bitdeli-chef](https://github.com/bitdeli-chef) |[dchest](https://github.com/dchest) |[gsamokovarov](https://github.com/gsamokovarov) |[ntaoo](https://github.com/ntaoo) |

[![hermankan](http://www.gravatar.com/avatar/539a534a67ad8008f06b0bddead73aee?s=117)](https://github.com/hermankan) |[![jesselpalmer](http://www.gravatar.com/avatar/4c73b0fa2b13cc8452ea06931ca0ce30?s=117)](https://github.com/jesselpalmer) |[![capaj](http://www.gravatar.com/avatar/44c1dafa5cda3cb13c3852cfa0af14b3?s=117)](https://github.com/capaj) |[![jordanyee](http://www.gravatar.com/avatar/7ed91b95665d2ca887be784eb0472cf5?s=117)](https://github.com/jordanyee) |[![nacyot](http://www.gravatar.com/avatar/afeb8054efb8e03aab4ed7d90a52f11c?s=117)](https://github.com/nacyot) |
:---: |:---: |:---: |:---: |:---: |
[hermankan](https://github.com/hermankan) |[jesselpalmer](https://github.com/jesselpalmer) |[capaj](https://github.com/capaj) |[jordanyee](https://github.com/jordanyee) |[nacyot](https://github.com/nacyot) |

[![kirstein](http://www.gravatar.com/avatar/d2987eb9402e60062ff45dd8a6b48d05?s=117)](https://github.com/kirstein) |[![mo-gr](http://www.gravatar.com/avatar/83c8d93df0ad3f1b0807b4c5bd3c47ad?s=117)](https://github.com/mo-gr) |[![cryptojuice](http://www.gravatar.com/avatar/bcdf80e3b1bef49806a3e9031877d11c?s=117)](https://github.com/cryptojuice) |[![olov](http://www.gravatar.com/avatar/a847d749f65088c41658483df5c550d9?s=117)](https://github.com/olov) |[![vorktanamobay](http://www.gravatar.com/avatar/5934bc3e68aeb155750c316c2c096bec?s=117)](https://github.com/vorktanamobay) |
:---: |:---: |:---: |:---: |:---: |
[kirstein](https://github.com/kirstein) |[mo-gr](https://github.com/mo-gr) |[cryptojuice](https://github.com/cryptojuice) |[olov](https://github.com/olov) |[vorktanamobay](https://github.com/vorktanamobay) |

[![thomastuts](http://www.gravatar.com/avatar/57721e925989ec9c470d9d4a350bb211?s=117)](https://github.com/thomastuts) |[![grapswiz](http://www.gravatar.com/avatar/bcc635978c6284f4e3f7654260b05d7b?s=117)](https://github.com/grapswiz) |[![coderhaoxin](http://www.gravatar.com/avatar/c20564c7ed8da352b5cc359f41e1c1c4?s=117)](https://github.com/coderhaoxin) |[![dreame4](http://www.gravatar.com/avatar/c56cbc55d2a54b1165478acfb5a61fb4?s=117)](https://github.com/dreame4) |
:---: |:---: |:---: |:---: |
[thomastuts](https://github.com/thomastuts) |[grapswiz](https://github.com/grapswiz) |[coderhaoxin](https://github.com/coderhaoxin) |[dreame4](https://github.com/dreame4) |


