#Einleitung

Das Ziel dieses Style Guides ist, eine Sammlung von Best Practices und Gestaltungsrichtlinien für AngularJS-Anwendungen aufzuzeigen.
Sie wurden aus den folgenden Quellen zusammengestellt:

0. AngularJS-Quelltext
0. Quelltexte oder Artikel, die ich gelesen habe
0. Meine eigene Erfahrung

**Hinweis**: Hierbei handelt es sich noch um einen Entwurf des Style Guides, dessen vorrangiges Ziel es ist, gemeinschaftlich von der Community entwickelt zu werden. Die gesamte Community wird es daher begrüßen, wenn Lücken gefüllt werden.

Du wirst in diesem Style Guide keine allgemeinen Richtlinien für die JavaScript-Entwicklung finden. Solche finden sich unter:

0. [Googles JavaScript-Style-Guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
0. [Mozillas JavaScript-Style-Guide](https://developer.mozilla.org/en-US/docs/Developer_Guide/Coding_Style)
0. [GitHubs JavaScript-Style-Guide](https://github.com/styleguide/javascript)
0. [Douglas Crockfords JavaScript-Style-Guide](http://javascript.crockford.com/code.html)
0. [Airbnb JavaScript style guide](https://github.com/airbnb/javascript)

Für die AngularJS-Entwicklung ist [Googles JavaScript-Style-Guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml) empfehlenswert.

Im GitHub-Wiki von AngularJS gibt es einen ähnlichen Abschnitt von [ProLoser](https://github.com/ProLoser), den du dir [hier](https://github.com/angular/angular.js/wiki) ansehen kannst.

#Inhaltsverzeichnis
* [Allgemein](#allgemein)
    * [Verzeichnisstruktur](#verzeichnisstruktur)
    * [Optimieren des Digest-Zyklus](#optimieren-des-digest-zyklus)
    * [Sonstiges](#sonstiges)
* [Module](#module)
* [Controller](#controller)
* [Direktiven](#direktiven)
* [Filter](#filter)
* [Services](#services)
* [Templates](#templates)
* [Routing](#routing)
* [Testen](#testen)
* [Mitmachen](#mitmachen)

#Allgemein

## Verzeichnisstruktur

Da eine große AngularJS-Anwendung viele Komponenten hat, sollten diese mit Hilfe einer Verzeichnishierarchie strukturiert werden.
Es gibt zwei Haupt-Herangehensweisen:

* Auf einer oberen Ebene eine Aufteilung nach Art der Komponenten und auf einer tieferen Ebene eine Aufteilung nach Funktionalität.

Die Verzeichnisstruktur wird in diesem Fall folgendermaßen aussehen:

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
├── lib
└── test
```

* Auf einer oberen Ebene eine Aufteilung nach Funktionalität und auf einer tieferen Ebene eine Aufteilung nach Art der Komponenten.

Hier ist das entsprechende Layout:

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
├── lib
└── test
```

* Wenn eine Direktive erstellt wird, kann es sinnvoll sein, alle der Direktive zugehörigen Dateien (d. h. Templates, CSS/SASS-Dateien, JavaScript) in das selbe Verzeichnis zu legen. Wenn du dich für diesen Stil entscheidest, sei konsistent und verwende ihn überall in deinem Projekt.

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

Dieser Ansatz kann mit beiden der oben genannten Verzeichnisstrukturen kombiniert werden.
* Eine weitere kleine Variation der beiden Verzeichnisstrukturen ist die, die in [ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home) eingesetzt wird. In dieser werden die Unit Tests zu einer Komponente im Verzeichnis der Komponente vorgehalten. Wenn Änderungen an einer Komponente vorgenommen werden, ist es auf diese Weise einfacher, ihre Tests zu finden; außerdem dienen die Tests als Dokumentation und zeigen Use Cases auf.

```
services
├── cache
│   ├── cache1.js
│   └── cache1.spec.js
└── models
    ├── model1.js
    └── model1.spec.js
```

* Die `app.js`-Datei enthält die Routendefinitionen, die Konfiguration und/oder das manuelle Bootstrapping (falls benötigt).
* Jede JavaScript-Datei sollte nur eine einzige Komponente enthalten. Die Datei sollte nach dem Namen der Komponente benannt sein.
* Verwende Angular-Projektstrukturvorlagen wie [Yeoman](http://yeoman.io) oder [ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home).

Ich bevorzuge die erste Struktur, weil bei ihr die üblichen Komponenten einfacher gefunden werden können.

Konventionen über die Benennung der Komponenten können in jedem Abschnitt über die jeweilige Komponente gefunden werden.

## Optimieren des Digest-Zyklus

* Watche nur auf die vitalsten Variablen (zum Beispiel: Beim Verwenden von Echtzeitkommunikation sollte nicht bei jeder eingehenden Nachricht ein Digest-Loop ausgelöst werden).
* Vereinfache Berechnungen in `$watch` so weit wie möglich. Komplexe und langsame Berechnungen in einem einzigen `$watch` verlangsamen die gesamte Applikation (der $digest-Loop wird in einem einzelnen Thread ausgeführt, weil JavaScript single-threaded ist).
* Set third parameter in `$timeout` function to false to skip digest loop when no watched variables are impacted by the invocation of the `$timeout` callback function.

## Sonstiges

* Verwende:
    * `$timeout` statt `setTimeout`
    * `$interval` instead of `setInterval`
    * `$window` statt `window`
    * `$document` statt `document`
    * `$http` statt `$.ajax`

Dadurch werden deine Tests einfacher und in manchen Fällen wird einem unerwarteten Verhalten vorgebeugt (zum Beispiel wenn du ein `$scope.$apply` in `setTimeout` vergessen hast).

* Automatisiere deinen Workflow mit Tools wie:
    * [Yeoman](http://yeoman.io)
    * [Grunt](http://gruntjs.com)
    * [Bower](http://bower.io)

* Verwende Promises (`$q`) statt Callbacks. Dadurch sieht dein Code eleganter und sauberer aus, außerdem wirst du nicht in der Callback-Hölle landen.
* Verwende, wenn möglich, `$resource` statt `$http`. Das höhere Abstraktionslevel schützt dich vor Redundanz.
* Verwende einen Angular Pre-Minifier (wie [ngmin](https://github.com/btford/ngmin) oder [ng-annotate](https://github.com/olov/ng-annotate)), um Probleme nach einer Minification zu vermeiden.
* Verwende keine Globalen. Löse alle Abhängigkeiten durch Dependency Injection auf.
* Mülle deinen `$scope` nicht zu. Füge ihm nur Funktionen und Variablen hinzu, die in den Templates verwendet werden.
* Bevorzuge [Controller statt `ngInit`](https://github.com/angular/angular.js/pull/4366/files). `ngInit` ist nur geeignet, um Aliase für spezielle Eigenschaften von `ngRepeat` zu erstellen. Abgesehen davon solltest du immer Controller statt `ngInit` verwenden um Werte in einem Scope zu initialisieren.
* Verwende kein `$` als Präfix für die Namen von Variablen, Eigenschaften oder Methoden. Dieser Präfix ist für AngularJS reserviert.

#Module

Es gibt zwei verbreitete Wege, nach denen Module strukturiert werden können:

0. Nach Funktionalität
0. Nach Typ der Komponente

Derzeit gibt es keinen großen Unterschied, aber die erste Variante sieht sauberer aus. Außerdem wird - wenn lazy-loading für die Module implementiert ist (momentan nicht auf der AngularJS-Roadmap) - die Performance der App verbessert.

#Controller

* Do not manipulate DOM in your controllers, this will make your controllers harder for testing and will violate the [Separation of Concerns principle](https://en.wikipedia.org/wiki/Separation_of_concerns). Use directives instead.
* The naming of the controller is done using the controller's functionality (for example shopping cart, homepage, admin panel) and the substring `Ctrl` in the end. The controllers are named UpperCamelCase (`HomePageCtrl`, `ShoppingCartCtrl`, `AdminPanelCtrl`, etc.).
* The controllers should not be defined as globals (no matter AngularJS allows this, it is a bad practice to pollute the global namespace).
* Use array syntax for controller definitions:

```Javascript
module.controller('MyCtrl', ['dependency1', 'dependency2', ..., 'dependencyn', function (dependency1, dependency2, ..., dependencyn) {
  //...body
}]);
```

Using this type of definition avoids problems with minification. You can automatically generate the array definition from standard one using tools like [ng-annotate](https://github.com/olov/ng-annotate) (and grunt task [grunt-ng-annotate](https://github.com/mzgol/grunt-ng-annotate)).
* Use the original names of the controller's dependencies. This will help you produce more readable code:

```Javascript
module.controller('MyCtrl', ['$scope', function (s) {
  //...body
}]);
```

is less readable than:

```Javascript
module.controller('MyCtrl', ['$scope', function ($scope) {
  //...body
}]);
```

This especially applies to a file that has so much code that you'd need to scroll through. This would possibly cause you to forget which variable is tied to which dependency.

* Make the controllers as lean as possible. Abstract commonly used functions into a service.
* Communicate within different controllers using method invocation (possible when children wants to communicate with parent) or `$emit`, `$broadcast` and `$on` methods. The emitted and broadcasted messages should be kept to a minimum.
* Make a list of all messages which are passed using `$emit`, `$broadcast` and manage it carefully because of name collisions and possible bugs.
* When you need to format data encapsulate the formatting logic into a [filter](#filters) and declare it as dependency:

```Javascript
module.filter('myFormat', function () {
  return function () {
    //body...
  };
});

module.controller('MyCtrl', ['$scope', 'myFormatFilter', function ($scope, myFormatFilter) {
  //body...
}]);
```

#Direktiven

* Name your directives with lowerCamelCase
* Use `scope` instead of `$scope` in your link function. In the compile, post/pre link functions you have already defined arguments which will be passed when the function is invoked, you won't be able to change them using DI. This style is also used in AngularJS's source code.
* Use custom prefixes for your directives to prevent name collisions with third-party libraries.
* Do not use `ng` or `ui` prefixes since they are reserved for AngularJS and AngularJS UI usage.
* DOM manipulations must be done only through directives.
* Create an isolated scope when you develop reusable components.
* Use directives as attributes or elements instead of comments or classes, this will make your code more readable.
* Use `$scope.$on('$destroy', fn)` for cleaning up. This is especially useful when you're wrapping third-party plugins as directives.
* Do not forget to use `$sce` when you should deal with untrusted content.

#Filter

* Name your filters with lowerCamelCase
* Make your filters as light as possible. They are called often during the `$digest` loop so creating a slow filter will slow down your app.

#Services

* Use camelCase (lower or upper) to name your services.
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
* Avoid writing complex code in the template.
* When you need to set the `src` of an image dynamically use `ng-src` instead of `src` with `{{}}` template.
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

#Testen

TBD

#Mitmachen

Since the goal of this style guide is to be community-driven, contributions are greatly appriciated.
For example, you can contribute by extending the Testing section or by translating the style guide to your language.
