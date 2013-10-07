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

For AngularJS development recommended is the [Google's JavaScript style guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml).

#Table of content
* [General](#general)
    * [Directory structure](#directory-structure)
    * [Optimize the digest cycle](#optimize-the-digest-cycle)
    * [Others](#others)
* [Modules](#modules)
* [Controllers](#controllers)
* [Directives](#directives)
* [Filters](#filters)
* [Services](#services)
* [Templates](#templates)
* [Routing](#routing)

#General

## Directory structure

Since a large AngularJS application has many components it's best to structure them in a directory hierarchy.
There are two main approaches:

* Creating high level division by component types and lower level division by functionality.

In this way the directory structure will look like:

    * app
        * controllers
            * page1
                * FirstCtrl.js
                * SecondCtrl.js
            * page2
                * ThirdCtrl.js
            * //...
        * directives
            * page1
                * directive1.js
            * page2
                * directive2.js
                * directive3.js
            * commonDirective.js
        * filters
            * page1
                * filter1.js
            commonFilter1.js
            commonFilter2.js
        * services
            * cache
                * Cache1.js
                * Cache2.js
            * models
                * Model1.js
                * Model2.js
            CommonService.js
        app.js
    * test
    * lib

* Creating high level division by functionality and lower level division by component types.

Here is its layout:

    * app
        * page1
            * controllers
                * FirstCtrl.js
                * SecondCtrl.js
            * directives
                * directive1.js
                * directive2.js
            * filters
                * filter1.js
                * filter2.js
            * services
                * service1.js
                * service2.js
            * //...
        * page2
            * controllers
                * ThirdCtrl.js
            * directives
                * directive3.js
                * directive4.js
            * filters
                * filter3.js
            * services
                * service3.js
            //...
        * common
            * controllers
            * directives
            * filters
            * services
        app.js
    * test
    * lib


* The `app.js` file contains routes definition, configuration and/or manual bootstrap (if required).
* Each JavaScript file should only hold a single component. The file should be named with the component's name.
* Use Angular project structure template like [Yeoman](http://yeoman.io), [ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home).

I prefer the first structure because it makes the common components easier to find.

Conventions about components naming can be found in each component section.

## Optimize the digest cycle

* Watch only the most vital variables (for example: when using real-time communication, don't cause a digest loop in each received message).
* Make computations in `$watch`  as simple as possible. Making heavy and slow computations in a single `$watch` will slow down the whole application (the $digest loop is done in a single thread because of the single-threaded nature of JavaScript).

## Others

* Use:
    * `$timeout` instead of `setTimeout`
    * `$window` instead of `window`
    * `$document` instead of `document`
    * `$http` instead of `$.ajax`

This will make your testing easier and in some cases prevent unexpected behaviour (for example, if you missed `$scope.$apply` in `setTimeout`).

* Automate your workflow using tools like:
    * [Yeoman](http://yeoman.io)
    * [Grunt](http://gruntjs.com)
    * [Bower](http://bower.io)

* Use promises (`$q`) instead of callbacks. It will make your code look more elegant and clean, and save you from callback hell.
* Use `$resource` instead of `$http` when possible. Higher level of abstraction saves you from redundancy.
* Use AngularJS pre-minifier (like [ngmin](https://github.com/btford/ngmin)) for preventing problems after minification.
* Don't use globals. Resolve all dependencies using Dependency Injection.
* Do not pollute your `$scope`. Only add functions and variables that are being used in the templates.

#Modules

There are two common ways for structuring the modules:

0. By functionality
0. By component type

Currently there's not a big difference, but the first way looks cleaner. Also, if lazy-loading modules is implemented (currently not in the AngularJS roadmap), it will improve the app's performance.

#Controllers

* Do not manipulate DOM in your controllers. Use directives instead.
* The naming of the controller is done using the controller's functionality (for example shopping cart, homepage, admin panel) and the substring `Ctrl` in the end. The controllers are named UpperCamelCase (`HomePageCtrl`, `ShoppingCartCtrl`, `AdminPanelCtrl`, etc.).
* The controllers should not be defined as globals (no matter AngularJS allows this, it is a bad practice to pollute the global namespace).
* Use array syntax for controller definitions:



        module.controller('MyCtrl', ['dependency1', 'dependency2', ..., 'dependencyn', function (dependency1, dependency2, ..., dependencyn) {
          //...body
        }]);


Using this type of definition avoids problems with minification. You can automatically generate the array definition from standard one using tools like [ng-annotate](https://github.com/olov/ng-annotate) (and grunt task [grunt-ng-annotate](https://github.com/mzgol/grunt-ng-annotate)).

* Use the original names of the controller's dependencies. This will help you produce more readable code:



        module.controller('MyCtrl', ['$scope', function (s) {
          //...body
        }]);


is less readable than:


        module.controller('MyCtrl', ['$scope', function ($scope) {
          //...body
        }]);


This especially applies to a file that has so much code that you'd need to scroll through. This would possibly cause you to forget which variable is tied to which dependency.

* Make the controllers as lean as possible. Abstract commonly used functions into a service.
* Communicate within different controllers using method invocation (possible when children wants to communicate with parent) or `$emit`, `$broadcast` and `$on` methods. The emitted and broadcasted messages should be kept to a minimum.
* Make a list of all messages which are passed using `$emit`, `$broadcast` and manage it carefully because of name collisions and possible bugs.
* When you need to format data encapsulate the formatting logic into a [filter](#filters) and declare it as dependency:


        module.controller('myFormat', function () {
          return function () {
            //body...
          };
        });

        module.controller('MyCtrl', ['$scope', 'myFormatFilter', function ($scope, myFormatFilter) {
          //body...
        }]);

#Directives

* Name your directives with lowerCamelCase
* Use `scope` instead of `$scope` in your link function. In the compile, post/pre link functions you have already defined arguments which will be passed when the function is invoked, you won't be able to change them using DI. This style is also used in AngularJS's source code.
* Use custom prefixes for your directives to prevent name collisions with third-party libraries.
* Do not use `ng` or `ui` prefixes since they are reserved for AngularJS and AngularJS UI usage.
* DOM manipulations must be done only through directives.
* Create an isolated scope when you develop reusable components.

#Filters

* Name your filters with lowerCamelCase
* Make your filters as light as possible. They are called often during the `$digest` loop so creating a slow filter will slow down your app.

#Services

* Use camelCase (lower or upper) to name your services.
* Encapsulate business logic in services.
* Services encapsulating business logic are preferably a `service` instead of a `factory`
* For session-level cache you can use `$cacheFactory`. This should be used to cache results from requests or heavy computations.

#Templates

* Use `ng-bind` or `ng-cloak` instead of simple `{{ }}` to prevent flashing content.
* Avoid writing complex code in the template.

#Routing

* Use `resolve` to resolve dependencies before the view is shown.
