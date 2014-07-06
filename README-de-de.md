# Einleitung

Das Ziel dieses Style Guides ist, eine Sammlung von Best Practices und Gestaltungsrichtlinien für AngularJS-Anwendungen aufzuzeigen.
Sie wurden aus den folgenden Quellen zusammengestellt:

0. AngularJS-Quelltext
0. Quelltexte oder Artikel, die ich gelesen habe
0. Meine eigene Erfahrung

**Hinweis 1:** Hierbei handelt es sich noch um einen Entwurf des Style Guides, dessen vorrangiges Ziel es ist, gemeinschaftlich von der Community entwickelt zu werden. Die gesamte Community wird es daher begrüßen, wenn Lücken gefüllt werden.
**Hinweis 2:** Bevor du den Richtlinien in einer der Übersetzungen des englischsprachigen Dokuments folgst, vergewissere dich, dass diese aktuell sind. Die jüngste Version des AngularJS Style Guide ist im Dokument README.md.

Du wirst in diesem Style Guide keine allgemeinen Richtlinien für die JavaScript-Entwicklung finden. Solche finden sich unter:

0. [Googles JavaScript-Style-Guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
0. [Mozillas JavaScript-Style-Guide](https://developer.mozilla.org/en-US/docs/Developer_Guide/Coding_Style)
0. [GitHubs JavaScript-Style-Guide](https://github.com/styleguide/javascript)
0. [Douglas Crockfords JavaScript-Style-Guide](http://javascript.crockford.com/code.html)
0. [Airbnb JavaScript-Style-Guide](https://github.com/airbnb/javascript)

Für die AngularJS-Entwicklung ist [Googles JavaScript-Style-Guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml) empfehlenswert.

Im GitHub-Wiki von AngularJS gibt es einen ähnlichen Abschnitt von [ProLoser](https://github.com/ProLoser), den du dir [hier](https://github.com/angular/angular.js/wiki) ansehen kannst.

# Inhaltsverzeichnis
* [Allgemein](#allgemein)
    * [Verzeichnisstruktur](#verzeichnisstruktur)
    * [Markup](#markup)
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
* [Mitwirkende](#mitwirkende)

# Allgemein

## Verzeichnisstruktur

Da eine große AngularJS-Anwendung viele Komponenten hat, sollten diese mit Hilfe einer Verzeichnishierarchie strukturiert werden.
Es gibt zwei Basis-Herangehensweisen:

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
├── partials
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
├── partials
├── lib
└── test
```

* Wenn eine Direktive erstellt wird, kann es sinnvoll sein, alle der Direktive zugehörigen Dateien (d. h. Templates, CSS/SASS-Dateien, JavaScript) in das selbe Verzeichnis zu legen. Wenn du dich für diesen Stil entscheidest, setze ihn konsequent im gesamten Projekt um.

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
* Eine weitere kleine Variation der beiden Verzeichnisstrukturen wird in [ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home) eingesetzt. In dieser liegen die Unit Tests zu einer Komponente direkt im Verzeichnis der jeweiligen Komponente. Werden Änderungen an einer Komponente vorgenommen, ist es auf diese Weise einfacher, ihre Tests zu finden. Gleichzeitig dienen die Tests als Dokumentation und zeigen Anwendungsfälle auf.

```
services
├── cache
│   ├── cache1.js
│   └── cache1.spec.js
└── models
    ├── model1.js
    └── model1.spec.js
```

* Die Datei `app.js` enthält die Routendefinitionen, die Konfiguration und/oder das manuelle Bootstrapping (falls benötigt).
* Jede JavaScript-Datei sollte nur eine einzige Komponente enthalten. Die Datei sollte nach dem Namen der Komponente benannt sein.
* Verwende Angular-Projektstrukturvorlagen wie [Yeoman](http://yeoman.io) oder [ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home).

Ich bevorzuge die erste Struktur, weil bei ihr die üblichen Komponenten einfacher gefunden werden können.

Konventionen über die Benennung der Komponenten stehen in jedem Abschnitt über die jeweilige Komponente.

## Markup

Auch die HTML-Markup ist wichtig und sollte in einem Team so geschrieben werden, als sei sie von derselben Person.

[TLDR;](http://developer.yahoo.com/blogs/ydn/high-performance-sites-rule-6-move-scripts-bottom-7200.html) Scripts sollten am Ende einer Seite eingefügt werden.

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Meine App</title>
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

Um den Code nicht unnötig zu verkomplizieren, füge AngularJS-spezifische Direktiven hinter Standard-Attributen ein. Dadurch ist es einfacher, sich den Code anzusehen und durch das Framework erweitertes HTML zu erkennen (was die Wartbarkeit verbessert).

```
<form class="frm" ng-submit="login.authenticate()">
  <div>
    <input class="ipt" type="text" placeholder="name" require ng-model="user.name">
  </div>
</form>
```

Andere HTML-Attribute sollten den [Empfehlungen](http://mdo.github.io/code-guide/#html-attribute-order) des Code Guides folgen.

## Optimieren des Digest-Zyklus

* Watche nur auf die vitalsten Variablen (Beispiel: Wenn du eine Echtzeitkommunikation einsetzt, sollte nicht bei jeder eingehenden Nachricht ein `$digest`-Loop ausgelöst werden).
* Für Inhalte, die nur einmal initialisiert und anschließend nicht mehr geändert werden, sollten Einmal-Watcher wie [`bindonce`](https://github.com/Pasvaz/bindonce) verwendet werden.
* Vereinfache Berechnungen in `$watch` so weit wie möglich. Komplexe und langsame Berechnungen in einem einzigen `$watch` verlangsamen die gesamte Applikation (der `$digest`-Loop wird in einem einzelnen Thread ausgeführt, weil JavaScript single-threaded ist).
* Falls in der Callback-Funktion von `$timeout` keine gewatchten Variablen geändert werden, setze den dritten Parameter der `$timeout`-Funktion auf `false`, um nicht automatisch einen `$digest`-Zyklus durch den Aufruf des Callbacks auszulösen.

## Sonstiges

* Verwende:
    * `$timeout` statt `setTimeout`
    * `$interval` statt `setInterval`
    * `$window` statt `window`
    * `$document` statt `document`
    * `$http` statt `$.ajax`

Dadurch werden deine Tests einfacher und in manchen Fällen wird einem unerwarteten Verhalten vorgebeugt (zum Beispiel wenn du ein `$scope.$apply()` in `setTimeout` vergessen hast).

* Automatisiere deinen Workflow mit Tools wie:
    * [Yeoman](http://yeoman.io)
    * [Grunt](http://gruntjs.com)
    * [Bower](http://bower.io)

* Verwende Promises (`$q`) statt Callbacks. Dadurch sieht dein Code eleganter und sauberer aus und du wirst nicht in der Callback-Hölle landen.
* Verwende, wenn möglich, `$resource` statt `$http`. Das höhere Abstraktionslevel schützt dich vor Redundanz.
* Verwende einen Angular Pre-Minifier (wie [ngmin](https://github.com/btford/ngmin) oder [ng-annotate](https://github.com/olov/ng-annotate)), um Probleme nach einer Minification zu vermeiden.
* Verwende keine Globalen. Löse alle Abhängigkeiten durch Dependency Injection auf.
* Mülle deinen `$scope` nicht zu. Füge ihm nur Funktionen und Variablen hinzu, die in den Templates verwendet werden.
* Bevorzuge [Controller gegenüber `ngInit`](https://github.com/angular/angular.js/pull/4366/files). `ngInit` eignet sich nur, um Aliase für spezielle Eigenschaften von `ngRepeat` zu erstellen. Hiervon abgesehen solltest du immer Controller statt `ngInit` verwenden, um Werte in einem Scope zu initialisieren.
* Verwende kein `$` als Präfix für die Namen von Variablen, Eigenschaften oder Methoden. Dieser Präfix ist für AngularJS reserviert.

# Module

* Module sollten in lowerCamelCase benannt werden. Um deutlich zu machen, dass das Modul `b` ein Untermodul von `a` ist, kannst du sie durch Namespaces verschachteln, z. B.: `a.b`.

Es gibt zwei verbreitete Wege, nach denen Module strukturiert werden können:

0. Nach Funktionalität
0. Nach Typ der Komponente

Derzeit gibt es keinen großen Unterschied, aber die erste Variante sieht sauberer aus. Außerdem wird - wenn lazy-loading für die Module implementiert ist (momentan nicht auf der AngularJS-Roadmap) - die Performance der App verbessert.

# Controller

* Du solltest das DOM nicht aus deinen Controllern heraus manipulieren, dadurch wird das Testen der Controller erschwert und du verstößt gegen das [Prinzip der Separation of Concerns](https://en.wikipedia.org/wiki/Separation_of_concerns). Verwende stattdessen Direktiven.
* Controller sollen nach ihrer Funktion (zum Beispiel shopping cart, homepage, admin panel) und dem Suffix `Ctrl` benannt werden. Controller werden in UpperCamelCase benannt (`HomePageCtrl`, `ShoppingCartCtrl`, `AdminPanelCtrl` usw.).
* Controller sollten nicht als Globale definiert werden (AngularJS erlaubt das zwar, es ist jedoch schlechte Praxis den globalen Namensraum zu verschmutzen).
* Verwende für Controller-Definitionen die Array-Syntax:

```JavaScript
module.controller('MyCtrl', ['dependency1', 'dependency2', ..., 'dependencyn', function(dependency1, dependency2, ..., dependencyn) {
  // body
}]);
```

Durch die Verwendung dieses Definitionstyps werden Probleme bei der Minification vermieden. Die Array-Definition kann aus der Standardnotation automatisch generiert werden, indem Werkzeuge wie [ng-annotate](https://github.com/olov/ng-annotate) (und der Grunt-Task [grunt-ng-annotate](https://github.com/mzgol/grunt-ng-annotate)) verwendet werden.
* Verwende die Originalnamen der im Controller verwendeten Abhängigkeiten. Dies hilft dir dabei, lesbareren Code zu schreiben:

```JavaScript
module.controller('MyCtrl', ['$scope', function(s) {
  // body
}]);
```

ist schlechter lesbar als:

```JavaScript
module.controller('MyCtrl', ['$scope', function($scope) {
  // body
}]);
```

Das gilt insbesondere für Dateien, die so viel Code enthalten, dass gescrollt werden muss. Dadurch vergisst du möglicherweise, welche Variable zu welcher Abhängigkeit gehört.

* Halte Controller so schlank wie möglich und lagere mehrfach verwendete Funktionen in Services aus.
* Kommuniziere zwischen verschiedenen Controllern, indem du Method Invocation nutzt (das ist möglich, wenn ein Kindcontroller mit seinem Elterncontroller kommunizieren möchte) oder die `$emit`-, `$broadcast`- und `$on`-Methoden verwendest. Über `$emit` und `$broadcast` gesendete Nachrichten sollten auf ein Minimum reduziert werden.
* Erstelle eine Liste aller Nachrichten, die über `$emit` und `$broadcast` verschickt werden. Pflege diese Liste, um Kollisionen und Bugs zu vermeiden.
* Wenn du Daten formatieren musst, kapsle die Formatierungslogik in einem [Filter](#filter) und gebe diesen als Abhängigkeit an:

```JavaScript
module.filter('myFormat', function() {
  return function() {
    // body
  };
});

module.controller('MyCtrl', ['$scope', 'myFormatFilter', function($scope, myFormatFilter) {
  // body
}]);
```

# Direktiven

* Benenne deine Direktiven in lowerCamelCase.
* Verwende `scope` statt `$scope` in deiner Link-Funktion. In den Compile- und Post-/Pre-Link-Funktionen hast du bereits Argumente angegeben, die verwendet werden sobald die Funktion aufgerufen wird. Diese kannst du nicht über eine Dependency Injection ändern. Dieser Stil wird auch im AngularJS-Sourcecode verwendet.
* Verwende eigene Präfixe für deine Direktiven, um Namenskollisionen mit Bibliotheken von Drittanbietern zu vermeiden.
* Die Präfixe `ng` und `ui` solltest du nicht verwenden, da diese für AngularJS und AngularUI reserviert sind.
* DOM-Manipulationen dürfen ausschließlich über Direktiven vorgenommen werden.
* Verwende einen Isolated Scope, wenn du wiederverwendbare Komponenten entwickelst.
* Binde Direktiven über Attribute oder Elemente ein statt über Kommentare oder Klassen. Das macht deinen Code lesbarer.
* Verwende zum Aufräumen `$scope.$on('$destroy', fn)`. Dies ist besonders nützlich wenn du Wrapper-Direktiven für Drittanbieter-Plug-ins entwickelst.
* Vergiss nicht, `$sce` zu verwenden, wenn du mit Inhalten arbeitest, die nicht vertrauenswürdig sind.

# Filter

* Benenne deine Filter in lowerCamelCase.
* Halte deine Filter so schlank wie möglich. Durch die `$digest`-Schleife werden sie häufig aufgerufen, so dass langsame Filter die gesamte Anwendung verlangsamen.
* Mache nur eine einzige Sache in deinen Filtern, halte sie kohärent. Komplexere Manipulationen können erzielt werden, indem mehrere Filter gepiped werden.

# Services

Dieser Abschnitt enthält Informationen über AngularJS' Service-Komponente. Er bezieht sich nicht auf eine spezielle Definitionsweise (d. h. als Provider, Factory oder Service), falls nicht ausdrücklich genannt.

* Benenne deine Services in camelCase.
  * UpperCamelCase (PascalCase), um Services zu benennen, die als Konstruktoren verwendet werden, d. h.:

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

  * lowerCamelCase für alle anderen Services.
* Kapsle die gesamte Anwendungslogik in Services.
* Services, die eine bestimmte Domäne abbilden, sollten bevorzugt als `service` statt als `factory` geschrieben werden. Auf diese Weise können die Vorteile der klassischen Vererbung einfacher genutzt werden:

```JavaScript
function Human() {
  // body
}
Human.prototype.talk = function() {
  return "I'm talking";
};

function Developer() {
  // body
}
Developer.prototype = Object.create(Human.prototype);
Developer.prototype.code = function() {
  return "I'm coding";
};

myModule.service('Human', Human);
myModule.service('Developer', Developer);
```

* Für einen sitzungsbezogenen Cache kannst du `$cacheFactory` verwenden. Diesen solltest du nutzen, um die Ergebnisse von Anfragen oder aufwändigen Berechnungen zwischenzuspeichern.
* Falls ein Service konfiguriert werden muss, definiere ihn als Provider und konfiguriere ihn im `config`-Callback, wie hier:

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

* Verwende `ng-bind` oder `ng-cloak` statt einfachen `{{ }}`, um flackernde Inhalte zu vermeiden.
* Vermeide es, komplexe Ausdrücke in ein Template zu schreiben.
* Wenn das `src`-Attribut eines Bilds dynamisch gesetzt werden soll, verwende `ng-src` statt `src` mit einem `{{ }}`-Template.
* Wenn du das `href`-Attribut eines Ankers dynamisch setzen musst, verwende `ng-href` statt `href` mit einem `{{ }}`-Template.
* Statt in Scopevariablen Strings anzugeben und diese mit `{{ }}` in ein `style`-Attribut zu schreiben, benutze die `ng-style`-Direktive, der als Parameter objektartige Strings und Scopevariablen übergeben werden können:

```JavaScript
$scope.divStyle = {
  width: 200,
  position: 'relative'
};
```
```HTML
<div ng-style="divStyle">Mein wunderschön gestyltes div, das auch im IE funktioniert</div>;
```

# Routing

* Verwende `resolve`, um Abhängigkeiten aufzulösen bevor die View angezeigt wird.

#Testen

TBD

Du kannst [diese Anleitung](https://github.com/daniellmb/angular-test-patterns) verwenden, solange dieser Abschnitt noch nicht fertig ist.

# Mitmachen

Da dieser Style Guide gemeinschaftlich durch die Community erstellt werden soll, sind Beiträge willkommen.
Zum Beispiel kannst du etwas beitragen, indem du den Abschnitt über Tests erweiterst oder den Style Guide in deine Sprache übersetzt.

#Mitwirkende

[![mgechev](http://www.gravatar.com/avatar/82bafb0432ce4ccc9dcc26f94d5fe5bc?s=117)](https://github.com/mgechev) |[![pascalockert](http://www.gravatar.com/avatar/cf3cf69f535e77166c17bc5f586514f5?s=117)](https://github.com/pascalockert) |[![mainyaa](http://www.gravatar.com/avatar/c274adeb5303a1aae51f1e34bd7a3bc3?s=117)](https://github.com/mainyaa) |[![rubystream](http://www.gravatar.com/avatar/04952a6ee948f345e9c3727850d09a1b?s=117)](https://github.com/rubystream) |[![lukaszklis](http://www.gravatar.com/avatar/7a30aca2cf9658558247348b3be8c35e?s=117)](https://github.com/lukaszklis) |
:---: |:---: |:---: |:---: |:---: |
[mgechev](https://github.com/mgechev) |[pascalockert](https://github.com/pascalockert) |[mainyaa](https://github.com/mainyaa) |[rubystream](https://github.com/rubystream) |[lukaszklis](https://github.com/lukaszklis) |

[![cironunes](http://www.gravatar.com/avatar/ac4189b770a4dbc0078935a68fff6f5c?s=117)](https://github.com/cironunes) |[![cavarzan](http://www.gravatar.com/avatar/929196ae336bbd9c18ad01f934b66e7a?s=117)](https://github.com/cavarzan) |[![tornad](http://www.gravatar.com/avatar/3e7f3900bc0c63b6bb6b27226decd16c?s=117)](https://github.com/tornad) |[![jmblog](http://www.gravatar.com/avatar/790f55ccde7a62df8f25747586657090?s=117)](https://github.com/jmblog) |[![bargaorobalo](http://www.gravatar.com/avatar/b7192b6465bbe490cd52ba35284875dd?s=117)](https://github.com/bargaorobalo) |
:---: |:---: |:---: |:---: |:---: |
[cironunes](https://github.com/cironunes) |[cavarzan](https://github.com/cavarzan) |[tornad](https://github.com/tornad) |[jmblog](https://github.com/jmblog) |[bargaorobalo](https://github.com/bargaorobalo) |

[![astalker](http://www.gravatar.com/avatar/5a3df42b090e503da2a645fd8ee9e1ae?s=117)](https://github.com/astalker) |[![valgreens](http://www.gravatar.com/avatar/051395c4c052ac12282b5cf305441986?s=117)](https://github.com/valgreens) |[![bitdeli-chef](http://www.gravatar.com/avatar/b42c651650ec8d3d95829c75e318af2d?s=117)](https://github.com/bitdeli-chef) |[![dchest](http://www.gravatar.com/avatar/641aceb7e3d2eebea49f397c38048d0b?s=117)](https://github.com/dchest) |[![gsamokovarov](http://www.gravatar.com/avatar/1ac5a00efa41cd58c421d3cd98dda7b9?s=117)](https://github.com/gsamokovarov) |
:---: |:---: |:---: |:---: |:---: |
[astalker](https://github.com/astalker) |[valgreens](https://github.com/valgreens) |[bitdeli-chef](https://github.com/bitdeli-chef) |[dchest](https://github.com/dchest) |[gsamokovarov](https://github.com/gsamokovarov) |

[![ntaoo](http://www.gravatar.com/avatar/791510818e4126572f81b2fbdd94bcc8?s=117)](https://github.com/ntaoo) |[![hermankan](http://www.gravatar.com/avatar/539a534a67ad8008f06b0bddead73aee?s=117)](https://github.com/hermankan) |[![jesselpalmer](http://www.gravatar.com/avatar/4c73b0fa2b13cc8452ea06931ca0ce30?s=117)](https://github.com/jesselpalmer) |[![capaj](http://www.gravatar.com/avatar/44c1dafa5cda3cb13c3852cfa0af14b3?s=117)](https://github.com/capaj) |[![jordanyee](http://www.gravatar.com/avatar/7ed91b95665d2ca887be784eb0472cf5?s=117)](https://github.com/jordanyee) |
:---: |:---: |:---: |:---: |:---: |
[ntaoo](https://github.com/ntaoo) |[hermankan](https://github.com/hermankan) |[jesselpalmer](https://github.com/jesselpalmer) |[capaj](https://github.com/capaj) |[jordanyee](https://github.com/jordanyee) |

[![nacyot](http://www.gravatar.com/avatar/afeb8054efb8e03aab4ed7d90a52f11c?s=117)](https://github.com/nacyot) |[![kirstein](http://www.gravatar.com/avatar/d2987eb9402e60062ff45dd8a6b48d05?s=117)](https://github.com/kirstein) |[![mo-gr](http://www.gravatar.com/avatar/83c8d93df0ad3f1b0807b4c5bd3c47ad?s=117)](https://github.com/mo-gr) |[![cryptojuice](http://www.gravatar.com/avatar/bcdf80e3b1bef49806a3e9031877d11c?s=117)](https://github.com/cryptojuice) |[![olov](http://www.gravatar.com/avatar/a847d749f65088c41658483df5c550d9?s=117)](https://github.com/olov) |
:---: |:---: |:---: |:---: |:---: |
[nacyot](https://github.com/nacyot) |[kirstein](https://github.com/kirstein) |[mo-gr](https://github.com/mo-gr) |[cryptojuice](https://github.com/cryptojuice) |[olov](https://github.com/olov) |

[![vorktanamobay](http://www.gravatar.com/avatar/5934bc3e68aeb155750c316c2c096bec?s=117)](https://github.com/vorktanamobay) |[![thomastuts](http://www.gravatar.com/avatar/57721e925989ec9c470d9d4a350bb211?s=117)](https://github.com/thomastuts) |[![grapswiz](http://www.gravatar.com/avatar/bcc635978c6284f4e3f7654260b05d7b?s=117)](https://github.com/grapswiz) |[![coderhaoxin](http://www.gravatar.com/avatar/c20564c7ed8da352b5cc359f41e1c1c4?s=117)](https://github.com/coderhaoxin) |[![dreame4](http://www.gravatar.com/avatar/c56cbc55d2a54b1165478acfb5a61fb4?s=117)](https://github.com/dreame4) |
:---: |:---: |:---: |:---: |:---: |
[vorktanamobay](https://github.com/vorktanamobay) |[thomastuts](https://github.com/thomastuts) |[grapswiz](https://github.com/grapswiz) |[coderhaoxin](https://github.com/coderhaoxin) |[dreame4](https://github.com/dreame4) |
