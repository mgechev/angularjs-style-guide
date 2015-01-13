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

Ce qui donnera alors:

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

* Lors de la création d'une directive, il pourrait être utile de mettre tous les fichiers associés (gabarits, CSS / fichiers SASS, JavaScript) dans un seul dossier. Si vous choisissez d'utiliser ce style d'arborescence, soyez cohérent et utilisez le partout dans votre projet.

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

* Une plus légère variation de structures de répertoires est celle utilisée dans [ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home). Dans ce mode, les tests unitaires pour un composant donné sont en attente dans le dossier du composant. De cette façon, lorsque vous effectuez des modifications dans les composants, il est plus facile de trouver leurs tests. Les tests servent également de documentation et de cas d'exemple.

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
* Chaque fichier JavaScript doit contenir un seul composant. Le fichier doit être nommé avec le nom du composant.
* Utilisez un modèle de structure de projet pour Angular comme [Yeoman](http://yeoman.io), [ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home).

Je préfère la première structure, car il rend les composants communs faciles à trouver.

les conventions sur le nommage des composants peuvent être trouvées dans chaque section des composants.

## Optimiser le cycle de traitement

* Surveiller ($watch) seulement les variables les plus importantes (par exemple: lors de l'utilisation de communication en temps réel, ne pas provoquer une boucle dans chaque message reçu).
* Faire les calculs dans `$watch` aussi simples que possible. Faire des calculs lourds et lents dans un seul `$watch` va ralentir l'ensemble de l'application (la boucle $digest se fait dans un seul thread en raison de la nature mono-thread de JavaScript).

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

* Les modules devraient être nommés en lowerCamelCase. Pour indiquer que le module `b` est un sous-module du module `a` vous pouvez les imbriquer en utlisant un espace de noms comme `a.b`.

Il y a deux façons communes pour structurer les modules:

0. Par fonctionnalité
0. Par type de composant

Actuellement il n'y a pas une grande différence, mais la première méthode semble plus propre. En outre, si le chargement de modules en lazy-loading est mis en œuvre (pas dans la feuille de route d'AngularJS), il permettra d'améliorer la performance de l'application.

#Contrôleurs

* Ne pas manipuler le DOM dans vos contrôleurs. Cela rendrait vos contrôleurs plus difficile pour les tests et viole le [Principe de séparation des couches] (https://en.wikipedia.org/wiki/Separation_of_concerns). Utilisez des directives à la place.
* La désignation du contrôleur se fait en utilisant la fonctionnalité du contrôleur (par exemple panier, page d'accueil, panneau d'administration) ave la chaîne `Ctrl` à la fin. Les contrôleurs sont nommés en UpperCamelCase (`HomePageCtrl`, `ShoppingCartCtrl`, `AdminPanelCtrl`, etc.)
* Les contrôleurs ne doivent pas être définis comme globals (aucune méthode AngularJS ne le permet, c'est une mauvaise pratique qui va polluer l'espace de noms global).
* Utilisez la syntaxe de tableau pour les définitions de contrôleur:

```JavaScript
module.controller('MyCtrl', ['dependency1', 'dependency2', ..., 'dependencyn', function (dependency1, dependency2, ..., dependencyn) {
  //...body
}]);
```
L'utilisation de ce type de définition évite les problèmes avec minification. Vous pouvez générer automatiquement la définition du champ à l'aide d'outils comme [ng-annotate](https://github.com/olov/ng-annotate) et tâche grunt [grunt-ng-annotate](https://github.com/mzgol/grunt-ng-annotate)).
* Utilisez les noms d'origine des dépendances du contrôleur. Cela vous aidera à produire un code plus lisible:

```JavaScript
module.controller('MyCtrl', ['$scope', function (s) {
  //...body
}]);
```

est moins lisible que : 

```JavaScript
module.controller('MyCtrl', ['$scope', function ($scope) {
  //...body
}]);
```

Cela s'applique en particulier à un fichier qui a tellement de code que vous aurez besoin de scroller pour faire défiler. Cela peut vous faire oublier la variable qui est liée à la dépendance.

* Faire les contrôleurs aussi mince que possible. Eviter les fonctions abstraites couramment utilisées dans un service.
* Communiquer entre les différents contrôleurs en utilisant la méthode invocation (possible lorsque les enfants veulent communiquer avec un parent) ou `$emit`, `$broadcast` et `$on`. Les messages émis et diffusés doivent être réduits au minimum.
* Faites une liste de tous les messages qui sont transmis en utilisant `$emit`, `$broadcast` et gérez les avec précaution car des conflits de noms sont possibles et sources d'éventuels bugs.
* Si vous devez formater les données alors encapsulez la logique de mise en forme dans un [filter](#filters) et déclarez-le comme dépendance:

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

* Nommez vos filtres en lowerCamelCase
* Faites vos filtres aussi léger que possible. Ils sont souvent appelés lors de la boucle `$digest` donc créer un filtre lent va ralentir votre application.

#Services

* Utilisez camelCase (inférieure ou supérieure) pour nommer vos services.
* Encapsuler la logique métier dans des services.
* Les services sont préférables à une `factory`. De cette façon, nous pouvons profiter de l'héritage "classice" plus facilement

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

* Pour un cache au niveau de la session, utilisez `$cacheFactory`. Cela doit être utilisé pour mettre en cache les résultats des requêtes ou des calculs lourds.

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

Puisque le but de ce guide est d'être axé sur la communauté, les contributions sont grandement appréciées.
Par exemple, vous pouvez contribuer par l'extension de la section de contrôle ou par la traduction du guide de style à votre langue.
