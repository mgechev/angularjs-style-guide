#Introduction

Le but de ce style guide est de présenter un ensemble de meilleures pratiques et lignes directrices de style pour une application AngularJS.
Ces pratiques sont collectées à partir de:

0. AngularJS code source
0. Le code source ou des articles que j'ai lu
0. Ma propre expérience

** Note **: c'est encore un projet de guide de style, son principal objectif est d'être piloter par la collectivité, donc combler les lacunes sera grandement appréciée par l'ensemble de la communauté.

Dans ce guide de style que vous ne trouverez pas de lignes directrices communes pour le développement JavaScript. Tel que vous pouvez les trouver ici :

0. [Google's JavaScript style guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
0. [Mozilla's JavaScript style guide](https://developer.mozilla.org/en-US/docs/Developer_Guide/Coding_Style)
0. [GitHub's JavaScript style guide](https://github.com/styleguide/javascript)
0. [Douglas Crockford's JavaScript style guide](http://javascript.crockford.com/code.html)

Pour le développement de AngularJS, le guide recommandé est le [Google's JavaScript style guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml).

Dans le wiki Github d'AngularJS, il y a une section similaire de [ProLoser](https://github.com/ProLoser), vous pouvez la consulter ici [here](https://github.com/angular/angular.js/wiki).

#Table des matières
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
* [Testing](#testing)
* [Contribution](#contribution)

#General

## Directory structure

Etant donné qu'une grande application AngularJS a beaucoup de composants, il est préférable de les structurer dans une hiérarchie de répertoires.
Il existe deux approches principales:

* Créer une division de haut niveau par types de composants et une division inférieure par fonctionnalité.

De cette façon, la structure de répertoire va ressembler à :

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

* Créer une division de haut niveau par fonctionnalité et de niveau inférieur par type de composants.

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
├── lib
└── test
```

* Lors de la création d'une directive, il pourrait être utile de mettre tous les fichiers associés (c.-à-modèles, CSS / fichiers SASS, JavaScript) dans un seul dossier. Si vous choisissez d'utiliser ce style d'arborescence, soyez cohérent et utilisez le partout dans votre projet.

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

Cette approche peut être combinée avec les deux structures de répertoires ci-dessus.
* Une plus légère variation de deux structures de répertoires est celui utilisé dans [ng-boilerplate] (http://joshdmiller.github.io/ng-boilerplate/ # / home). Dans ce mode, les tests unitaires pour un composant donné sont en attente dans le dossier du composant. De cette façon, lorsque vous effectuez des modifications dans les composants, il est plus facile de trouver leurs tests. Les tests servent également de documentation et cas d'exemple.

```
services
├── cache
│   ├── cache1.js
│   └── cache1.spec.js
└── models
    ├── model1.js
    └── model1.spec.js
```

* Le fichier `app.js` contient les définitions de route, la configuration et / ou l'amorçage manuel (si nécessaire).
* Chaque fichier JavaScript doit contenir un seul composant. Le fichier doit être nommé avec le nom du composant.
* Utilisez un modèle de structure de projet Angular comme [Yeoman] (http://yeoman.io), [ng-boilerplate] (http://joshdmiller.github.io/ng-boilerplate/ # / home).

Je préfère la première structure, car il rend les composants communs faciles à trouver.

les conventions sur le nommage des composants peuvent être trouvés dans chaque section des composants.

## Optimize the digest cycle

* Surveiller (watch) seulement les variables les plus importantes (par exemple: lors de l'utilisation de communication en temps réel, ne pas provoquer une boucle dans chaque message reçu).
* Faire des calculs dans `$watch` aussi simple que possible. Faire des calculs lourds et lents dans un seul `$watch` va ralentir l'ensemble de l'application (le $digest loop se fait dans un seul thread en raison de la nature mono-thread de JavaScript).

# # Autres

* Utilisation:
    * `$timeout` au lieu de `setTimeout`
    * `$window` au lieu de `window`
    * `$document` au lieu de `document`
    * `$http` au lieu de `$.ajax`

Cela rendra vos tests plus facile et, dans certains cas, évitera les comportements inattendus (par exemple, si vous avez manqué `$scope.$apply` dans `setTimeout`).

* Automatisez votre flux de travail en utilisant des outils comme:
     * [Yeoman] (http://yeoman.io)
     * [Grunt] (http://gruntjs.com)
     * [Bower] (http://bower.io)
	 * [Component] (http://component.io)

* Utilisez des promises ( `$q` ) au lieu de rappels(callback). Il rendra votre code plus élégant, propre et simple à regarder, et vous sauvera de l'enfer des callbacks.
* Utilisez `$resource` au lieu de `$http` si possible. Un niveau d'abstraction plus élevé vous permet d'économiser de la redondance.
* Utilisez un pré- minifier AngularJS ( comme [ngmin] (https://github.com/btford/ngmin) ou [ng_annote] (https://github.com/olov/ng-annotate) ) pour la prévention des problèmes après minification .
* Ne pas utiliser de globales. Résoudre toutes les dépendances en utilisant l'injection de dépendances.
* Ne pas polluer votre portée `$scope`. Ajouter uniquement des fonctions et des variables qui sont utilisés dans les modèles.
* Préférer l'utilisation de [ contrôleurs au lieu de `ngInit`] (https://github.com/angular/angular.js/pull/4366/files). La seule utilisation appropriée de `ngInit` est pour initialiser des propriétés particulières de `ngRepeat`. Outre ce cas, vous devez utiliser les contrôleurs plutôt que `ngInit` pour initialiser les valeurs sur une portée.
* Ne pas utiliser le prefixe `$` pour les noms de variables, les propriétés et les méthodes. Ce préfixe est réservé pour un usage de AngularJS.

#Modules

There are two common ways for structuring the modules:

0. By functionality
0. By component type

Currently there's not a big difference, but the first way looks cleaner. Also, if lazy-loading modules is implemented (currently not in the AngularJS roadmap), it will improve the app's performance.

#Controllers

* Do not manipulate DOM in your controllers, this will make your controllers harder for testing and will violate the [Separation of Concerns principle](https://en.wikipedia.org/wiki/Separation_of_concerns). Use directives instead.
* The naming of the controller is done using the controller's functionality (for example shopping cart, homepage, admin panel) and the substring `Ctrl` in the end. The controllers are named UpperCamelCase (`HomePageCtrl`, `ShoppingCartCtrl`, `AdminPanelCtrl`, etc.).
* The controllers should not be defined as globals (no matter AngularJS allows this, it is a bad practice to pollute the global namespace).
* Use array syntax for controller definitions:


```JavaScript
module.controller('MyCtrl', ['dependency1', 'dependency2', ..., 'dependencyn', function (dependency1, dependency2, ..., dependencyn) {
  //...body
}]);
```


Using this type of definition avoids problems with minification. You can automatically generate the array definition from standard one using tools like [ng-annotate](https://github.com/olov/ng-annotate) (and grunt task [grunt-ng-annotate](https://github.com/mzgol/grunt-ng-annotate)).
* Use the original names of the controller's dependencies. This will help you produce more readable code:

```JavaScript
module.controller('MyCtrl', ['$scope', function (s) {
  //...body
}]);
```

is less readable than:

```JavaScript
module.controller('MyCtrl', ['$scope', function ($scope) {
  //...body
}]);
```

This especially applies to a file that has so much code that you'd need to scroll through. This would possibly cause you to forget which variable is tied to which dependency.

* Make the controllers as lean as possible. Abstract commonly used functions into a service.
* Communicate within different controllers using method invocation (possible when children wants to communicate with parent) or `$emit`, `$broadcast` and `$on` methods. The emitted and broadcasted messages should be kept to a minimum.
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

* Name your directives with lowerCamelCase
* Use `scope` instead of `$scope` in your link function. In the compile, post/pre link functions you have already defined arguments which will be passed when the function is invoked, you won't be able to change them using DI. This style is also used in AngularJS's source code.
* Use custom prefixes for your directives to prevent name collisions with third-party libraries.
* Do not use `ng` or `ui` prefixes since they are reserved for AngularJS and AngularJS UI usage.
* DOM manipulations must be done only through directives.
* Create an isolated scope when you develop reusable components.
* Use directives as attributes or elements instead of comments or classes, this will make your code more readable.
* Use `$scope.$on('$destroy', fn)` for cleaning up. This is especially useful when you're wrapping third-party plugins as directives.
* Do not forget to use `$sce` when you should deal with untrusted content.

#Filters

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
  return "I'm codding";
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
  position: relative
};
...
</script>

<div ng-style="divStyle">my beautifully styled div which will work in IE</div>;
```

#Routing

* Use `resolve` to resolve dependencies before the view is shown.

#Testing

TBD

#Contribution

Since the goal of this style guide is to be community-driven, contributions are greatly appriciated.
For example, you can contribute by extending the Testing section or by translating the style guide to your language.
