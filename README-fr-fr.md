#Introduction

Ce guide est la traduction francaise de [AngularJS style guide](https://github.com/mgechev/angularjs-style-guide).

Le but de ce guide de style est d'exposer un ensemble de meilleures pratiques et directives de style pour une application AngularJS.
Elles proviennent&#8239;:

0. du code source d'AngularJS
0. du code source ou des articles que j'ai lus
0. de ma propre expérience.

**Note 1**&#8239;: ce guide est encore à l'état d'ébauche. Son principal objectif est d'être développé par la communauté, donc combler les lacunes sera grandement apprécié par l'ensemble de la communauté.

**Note 2**&#8239;: avant de suivre certaines directives des traductions du document original en anglais, assurez-vous qu'elles sont à jour avec la [dernière version](https://github.com/mgechev/angularjs-style-guide/blob/master/README.md).

Dans ce document, vous ne trouverez pas de directives générales concernant le développement en JavaScript. Vous pouvez les trouver dans les documents suivants&#8239;:

0. [Google's JavaScript style guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
0. [Mozilla's JavaScript style guide](https://developer.mozilla.org/en-US/docs/Developer_Guide/Coding_Style)
0. [GitHub's JavaScript style guide](https://github.com/styleguide/javascript)
0. [Douglas Crockford's JavaScript style guide](http://javascript.crockford.com/code.html)

Pour le développement d'AngularJS, le guide recommandé est [Google's JavaScript style guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml).

Dans le wiki Github d'AngularJS, il y a une section similaire de [ProLoser](https://github.com/ProLoser), vous pouvez la consulter [ici](https://github.com/angular/angular.js/wiki).

#Table des matières

* [Général](#général)
    * [Arborescence](#arborescence)
    * [Balisage](#balisage)
    * [Optimiser le cycle de traitement](#optimiser-le-cycle-de-traitement)
    * [Autres](#autres)
* [Modules](#modules)
* [Contrôleurs](#contrôleurs)
* [Directives](#directives)
* [Filtres](#filtres)
* [Services](#services)
* [Gabarits](#gabarits)
* [Routage](#routage)
* [Tests](#tests)
* [Contribution](#contribution)

#Général

## Arborescence

Étant donné qu'une grosse application AngularJS a beaucoup de composants, il est préférable de la structurer en une hiérarchie de répertoires.
Il existe deux approches principales&#8239;:

* Créer une division de haut niveau par types de composants et une division inférieure par fonctionnalité. De cette façon, la structure de répertoires ressemblera à

```
.
├── app
│   ├── app.js
│   ├── controllers
│   │   ├── home
│   │   │   ├── FirstCtrl.js
│   │   │   └── SecondCtrl.js
│   │   └── about
│   │       └── ThirdCtrl.js
│   ├── directives
│   │   ├── home
│   │   │   └── directive1.js
│   │   └── about
│   │       ├── directive2.js
│   │       └── directive3.js
│   ├── filters
│   │   ├── home
│   │   └── about
│   └── services
│       ├── CommonService.js
│       ├── cache
│       │   ├── Cache1.js
│       │   └── Cache2.js
│       └── models
│           ├── Model1.js
│           └── Model2.js
├── partials
├── lib
└── test
```

* Créer une division de haut niveau par fonctionnalité et de niveau inférieur par type de composants. Voici son schéma&#8239;:

```
.
├── app
│   ├── app.js
│   ├── common
│   │   ├── controllers
│   │   ├── directives
│   │   ├── filters
│   │   └── services
│   ├── home
│   │   ├── controllers
│   │   │   ├── FirstCtrl.js
│   │   │   └── SecondCtrl.js
│   │   ├── directives
│   │   │   └── directive1.js
│   │   ├── filters
│   │   │   ├── filter1.js
│   │   │   └── filter2.js
│   │   └── services
│   │       ├── service1.js
│   │       └── service2.js
│   └── about
│       ├── controllers
│       │   └── ThirdCtrl.js
│       ├── directives
│       │   ├── directive2.js
│       │   └── directive3.js
│       ├── filters
│       │   └── filter3.js
│       └── services
│           └── service3.js
├── partials
├── lib
└── test
```

* Lors de la création des directives, il peut être pratique de mettre tous les fichiers associés à une directive (gabarits, CSS / fichiers SASS, JavaScript) dans un seul dossier. Si vous choisissez d'utiliser ce style d'arborescence, soyez cohérent et utilisez-le partout dans votre projet.

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

* Une dernière petite variation des deux structures de répertoires est celle utilisée dans [ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home). Dans celle-ci, les tests unitaires pour un composant donné sont dans le même dossier que le composant. De cette façon, quand vous modifiez un composant donné, il est facile de trouver ses tests. Les tests tiennent aussi lieu de documentation et montrent des cas d'usage.

```
services
├── cache
│   ├── cache1.js
│   └── cache1.spec.js
└── models
    ├── model1.js
    └── model1.spec.js
```

* Le fichier `app.js` contient la définition des routes, la configuration et/ou l'amorçage manuel (si nécessaire).
* Chaque fichier JavaScript ne devrait contenir qu'un seul composant. Le fichier doit être nommé avec le nom du composant.
* Utilisez un modèle de structure de projet pour Angular comme [Yeoman](http://yeoman.io) ou [ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home).

Je préfère la première structure, car il rend les composants communs plus faciles à trouver.

Les conventions sur le nommage des composants peuvent être trouvées dans la section de chaque composant.

## Balisage

[TLDR;](http://developer.yahoo.com/blogs/ydn/high-performance-sites-rule-6-move-scripts-bottom-7200.html) Placer les scripts tout en bas.

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

Garder les choses simples et mettre les directives spécifiques d'AngularJS en dernier. De cette façon, il est facile de vérifier le code et trouver les améliorations dans le HTML apportées par le framework (ce qui profite à la maintenabilité).

```
<form class="frm" ng-submit="login.authenticate()">
  <div>
    <input class="ipt" type="text" placeholder="name" require ng-model="user.name">
  </div>
</form>
```

Les autres attributs HTML devraient suivre les recommandations du [Code Guide](http://mdo.github.io/code-guide/#html-attribute-order) de Mark Otto.

## Optimiser le cycle de traitement

* Surveiller seulement les variables les plus importantes (par exemple, lors de l'utilisation de communication en temps réel, ne pas provoquer une boucle `$digest` dans chaque message reçu).
* Pour un contenu initialisé une seule fois et qui ensuite ne change pas, utiliser des observateurs à évaluation unique comme [bindonce](https://github.com/Pasvaz/bindonce).
* Faire les calculs dans `$watch` aussi simples que possible. Faire des calculs lourds et lents dans un unique `$watch` va ralentir l'ensemble de l'application (la boucle `$digest` s'exécute dans un seul thread en raison de la nature mono-thread de JavaScript).
* Mettre le troisième paramètre de la fonction `$timeout` à false pour éviter la boucle `$digest` lorsqu'aucune des variables observées n'est impactée par la fonction de rappel `$timeout`.

## Autres

* Utilisation:
    * `$timeout` au lieu de `setTimeout`
    * `$window` au lieu de `window`
    * `$document` au lieu de `document`
    * `$http` au lieu de `$.ajax`

Cela rendra vos tests plus facile et, dans certains cas, évitera les comportements inattendus (par exemple, si vous avez oublié `$scope.$apply` dans `setTimeout`).

* Automatisez votre flux de travail en utilisant des outils comme:
     * [Yeoman](http://yeoman.io)
     * [Grunt](http://gruntjs.com)
     * [Bower](http://bower.io)
	 * [Component](http://component.io)

* Utilisez des promises (`$q`) au lieu de rappels (callback). Il rendra votre code plus élégant, propre et simple à regarder, et vous sauvera de l'enfer des callbacks.
* Utilisez `$resource` au lieu de `$http` quand cela est possible. Un niveau d'abstraction plus élevé vous permet d'économiser de la redondance.
* Utilisez un pré-minifier AngularJS (comme [ngmin](https://github.com/btford/ngmin) ou [ng_annote](https://github.com/olov/ng-annotate)) pour la prévention des problèmes après minification.
* Ne pas utiliser de globales. Résoudre toutes les dépendances en utilisant l'injection de dépendances.
* Ne pas polluer votre portée `$scope`. Ajouter uniquement des fonctions et des variables qui sont utilisés dans les gabarits.
* Préférer l'utilisation de contrôleurs au lieu de [`ngInit`](https://github.com/angular/angular.js/pull/4366/files). La seule utilisation appropriée de `ngInit` est pour initialiser des propriétés particulières de `ngRepeat`. Outre ce cas, vous devez utiliser les contrôleurs plutôt que `ngInit` pour initialiser les valeurs sur une portée.
* Ne pas utiliser le prefixe `$` pour les noms de variables, les propriétés et les méthodes. Ce préfixe est réservé pour un usage de AngularJS.
* Lors de la résolution des dépendances par le système DI d'AngularJS, trier les dépendances par leur type &mdash; les dépendances intégrées à AngularJS en premier, suivies des vôtres :

```javascript
module.factory('Service', function ($rootScope, $timeout, MyCustomDependency1, MyCustomDependency2) {
  return {
    //Something
  };
});
```

#Modules

* Les modules devraient être nommés en lowerCamelCase. Pour indiquer que le module `b` est un sous-module du module `a`, vous pouvez les imbriquer en utlisant un espace de noms tel que `a.b`.

Les deux façons habituelles de structurer les modules sont&#8239;:

0. par fonctionnalité&nbsp;
0. par type de composant.

Actuellement, il n'y a pas une grande différence entre les deux mais la première semble plus propre. En outre, si le chargement paresseux des modules est implémenté (actuellement il ne figure pas sur la feuille de route d'AngularJS), il permettra d'améliorer les performances de l'application.

#Contrôleurs

* Ne manipulez pas le DOM dans vos contrôleurs. Cela rendrait vos contrôleurs plus difficiles à tester et violerait le [principe de séparation des préoccupations] (https://en.wikipedia.org/wiki/Separation_of_concerns). Utilisez plutôt les directives.
* Le nom d'un contrôleur s'obtient à partir de sa fonction (par exemple panier, page d'accueil, panneau d'administration) suffixée par `Ctrl`. Les contrôleurs sont nommés en UpperCamelCase (`HomePageCtrl`, `ShoppingCartCtrl`, `AdminPanelCtrl`, etc.)
* Les contrôleurs ne devraient pas être définis dans le contexte global (bien qu'AngularJS le permette, c'est une mauvaise pratique de polluer l'espace de noms global).
* Définissez les contrôleurs à l'aide de tableaux&#8239;:

```JavaScript
module.controller('MyCtrl', ['dependency1', 'dependency2', ..., 'dependencyn', function (dependency1, dependency2, ..., dependencyn) {
  //...body
}]);
```

Une telle définition évite les problèmes avec la minification. Vous pouvez générer automatiquement la définition du tableau à l'aide d'outils comme [ng-annotate](https://github.com/olov/ng-annotate) (et la tâche grunt [grunt-ng-annotate](https://github.com/mzgol/grunt-ng-annotate)).
* Utilisez les noms d'origine des dépendances du contrôleur. Cela vous aidera à produire un code plus lisible&#8239;:

```JavaScript
module.controller('MyCtrl', ['$scope', function (s) {
  //...body
}]);
```

est moins lisible que

```JavaScript
module.controller('MyCtrl', ['$scope', function ($scope) {
  //...body
}]);
```

Cela s'applique particulièrement à un fichier qui a tellement de lignes de code que vous devrez les faire défiler. Cela pourrait vous faire oublier quelle variable est liée à quelle dépendance.

* Faites les contrôleurs aussi simples que possible. Extrayez les fonctions couramment utilisées dans un service.
* Communiquez entre les différents contrôleurs en utilisant l'appel de méthode (possible lorsqu'un enfant veut communiquer avec son parent) ou `$emit`, `$broadcast` et `$on`. Les messages émis et diffusés doivent être réduits au minimum.
* Faites une liste de tous les messages qui sont passés en utilisant `$emit` et `$broadcast`, et gérez-la avec précaution à cause des conflits de nom et bugs éventuels.
* Si vous devez formater les données alors encapsulez la logique de mise en forme dans un [filtre](#filtres) et déclarez-le comme dépendance&#8239;:

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

* Dans le cas de contrôleurs imbriqués utilisez les portées emboitées (avec `controllerAs`)&#8239;:

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

#Directives

* Nommez vos directives en lowerCamelCase
* Utilisez `scope` au lieu de `$scope` dans votre fonction de lien. Dans la compilation, les fonctions de liaison pré/post compilation, vous avez déjà les arguments qui sont passés lorsque la fonction est appelée, vous ne serez pas en mesure de les modifier à l'aide de DI. Ce style est également utilisé dans le code source d'AngularJS.
* Utilisez les préfixes personnalisés pour vos directives pour éviter les collisions de noms de bibliothèques tierces.
* Ne pas utiliser `ng​​` ou `ui` comme préfixe car ils sont réservés pour AngularJS et l'utilisation d'AngularJS UI.
* Les manipulations du DOM doivent être effectués uniquement avec des directives.
* Créer un scope isolé lorsque vous développez des composants réutilisables.
* Utilisez des directives comme des attributs ou des éléments au lieu de commentaires ou de classes, cela va rendre le code plus lisible.
* Utilisez `$scope.$on('$destroy, fn)` pour le nettoyage de vos objects/variables. Ceci est particulièrement utile lorsque vous utilisez des plugins tiers comme directives.
* Ne pas oublier d'utiliser `$sce` lorsque vous devez faire face à un contenu non approuvé.

#Filtres

* Nommez vos filtres en lowerCamelCase.
* Faites vos filtres aussi légers que possible. Ils sont souvent appelés lors de la boucle `$digest`, donc créer un filtre lent ralentira votre application.
* Limitez vos filtres à une seule chose et gardez-les cohérents. Des manipulations plus complexes peuvent être obtenues en enchaînant des filtres existants.

#Services

La présente section contient des informations au sujet des composants service dans AngularJS. Sauf mention contraire, elles ne dépendent pas de la méthode utilisée pour définir les services (c.-à-d. `provider`, `factory`, `service`).

* Nommez vos services en camelCase&#8239;:
  * UpperCamelCase (PascalCase) pour vos services utilisés comme constructeurs, c.-à.-d.&#8239;:

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

  * lowerCamel pour tous les autres services.

* Encapsulez la logique métier dans des services.
* La méthode `service` est préférable à la méthode `factory`. De cette façon, nous pouvons profiter de l'héritage classique plus facilement&#8239;:

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

* Pour un cache de session, vous pouvez utiliser `$cacheFactory`. Il devrait être utilisé pour mettre en cache les résultats des requêtes ou des calculs lourds.
* Si un service donné nécessite une configuration, définissez le service comme un provider et configurez-le ainsi dans la fonction de rappel `config`&#8239;:

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

#Gabarits

* Utilisez `ng-bind` ou `ng-cloak` au lieu de simples `{{ }}` pour prévenir les collisions de contenus
* Eviter d'écrire du code complexe dans les gabarits
* Quand vous avez besoin de définir le `src` d'une image dynamiquement, utilisez `ng-src` au lieu de  `src` avec `{{}}` dans le gabarit. Ceci pour permettre un refresh dynamique ? (NLDT)
* Au lieu d'utiliser la variable $scope en tant que chaîne et de l'utiliser avec l'atribut  `style` et `{{}}`, utilisez la directive `ng-style` avec les paramètres de l'objet comme et les variables de scope comme valeurs:

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

#Routage

* Utilisez `resolve` pour résoudre les dépendances avant que la vue ne soit affichée.

#Tests

TBD

#Contribution

Puisque ce guide de style a pour but d'être un projet communautaire, les contributions sont très appréciées. Par exemple, vous pouvez contribuer en développant la section [Tests](#tests) ou en traduisant le guide dans votre langue.


