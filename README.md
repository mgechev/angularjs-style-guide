#Introduction

The goal of this style guide is to present a set of best practises and style guidlines for one AngularJS application.
These best practices are collected from:

0. AngularJS's source code
0. Articles I've read
0. My own experience

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
    * [Source Code Layout](#source-code-layout)
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


* The `app.js` file contains routes definition and configuration and/or manual bootstrap (if required).
* In each JavaScript file should be located a single component. The file should be named with the component's name.

I prefer the first structure because it makes the common components easier to find.

Conventions about the components naming can be found in each component section.

## Optimize the digest cycle

* Watch only the most vital variables (for example when using real time communication don't cause digest loop in each received message).
* Make as simplest computations in `$watch` as possible. Making heavy and slow computations in a single `$watch` will slow down the whole application (the $digest loop is done in a single thread because of the single-threaded nature of JavaScript).

## Source Code Layout

* You should keep the components from many dependencies but if there are keep the lines declaring the dependencies no longer than 80 characters.

## Others

* Use:
    * `$timeout`, instead of `setTimeout`
    * `$window`, instead of `window`
    * `$document`, instead of `document`
    * `$http`, instead of `$.ajax`

It will make your testing easier and in some cases prevent you from unexpected behaviour (for example if you missed `$scope.$apply` in `setTimeout`).

* Automate your workflow using tools like:
    * Yeoman
    * Grunt
    * Bower

* Use promises (`$q`) instead of callbacks. It will make your code look more elegant, clean and save you from the callback hell.

* Use `$resource` instead of `$http` when possible. Highther level of abstraction saves you from redundency.

#Modules

There are two commonly used ways for structuring the modules:

0. By functionality
0. By component type

Currently there is not a big difference but the first way looks cleaner. Also if lazy-loading of the modules is being implemented (currently there are no such plans in the roadmap) it will make the application's performance better.

#Controllers

* Do not make any DOM manipulations in your controllers. If you make such, probably you need a directive.
* The naming of the controller is done using the controller's functionality (for example shopping card, home page, admin panel) and the substring `Ctrl` in the end. The controllers are named UpperCamelCase (`HomePageCtrl`, `ShippingCardCtrl`, `AdminPanelCtrl`, etc.).
* The controllers should not be defined as globals (no matter AngularJS allows this it is a bad practice to pollute the global namespace).
* Use array for the controllers' definition:



        module.controller('MyCtrl', ['dependency1', 'dependency2', ..., 'dependencyn', function (dependency1, dependency2, ..., dependency2) {
          //...body
        }]);


Using this type of definition you wont have problems after minification.

* Use the original names of the controller's dependencies. This will help you produce more readable code:



        module.controller('MyCtrl', ['$scope', function (s) {
          //...body
        }]);


is less readable than:


        module.controller('MyCtrl', ['$scope', function ($scope) {
          //...body
        }]);


especially after the controller's body became large enough to make you scroll when you forget which was the right dependency.
* Make the controllers as skinny as possible
* Communicate within different controllers using method invocation (possible when children wants to communicate with parent) or `$emit`, `$broadcast` and `$on` methods. The `$emit`-ed and `$broadcast`-ed messages must be reduced as much as possible.
* Make a list of all messages which are passed using `$emit`, `$broadcast` and manage it carefully because of name collisions and possible bugs.

#Directives

* Name the directives with lowerCamelCase
* Use `scope` instead of `$scope` in your link function. In the compile, post/pre link functions you have defined parameters, you won't be able to change them using DI.
* Use custom prefixes for your directives to prevent name collisions with third-party libraries.
* Do not use `ng` prefix, nor `ui` prefix they are reserved for AngularJS and AngularJS UI usage.
* The DOM manipulations must be made only thrugh directives.

#Filters

* Name the filters with lowerCamelCase
* Make the filters as light as possible. They are called often during the `$digest` loop so creating slow filter will slow down your app.

#Services

* Encapsulate the business logic in models created using services.
* For creating models it is preferred to use `service` instead of `factory`.

#Templates

* Use `ng-bind` or `ng-cloak` instead of simple `{{}}` to prevent flashing content.

#Routing

* Use `resolve` to resolve dependencies before the view is shown.