# Introduzione

Questo documento è finalizzato al presentare una serie di buone pratiche e
linee guida per lo stile e l'applicazione di AngularJS.
Queste pratiche derivano da:

0. Codice AngularJS
0. Codice e articoli che ho letto
0. Esperienza

**Nota 1**: Questo è ancora un abbozzo della guida stilistica: il suo obiettivo
è di essere guidato dalla community, quindi eventuali migliorie sarebbero
molto apprezzate da parte di tutti.

In questa guida non si accennerà a comuni linee guida sulla programmazione
JavaScript. Queste possono essere trovate nei seguenti link:

0. [Google's JavaScript style guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
0. [Mozilla's JavaScript style guide](https://developer.mozilla.org/en-US/docs/Developer_Guide/Coding_Style)
0. [GitHub's JavaScript style guide](https://github.com/styleguide/javascript)
0. [Douglas Crockford's JavaScript style guide](http://javascript.crockford.com/code.html)
0. [Airbnb JavaScript style guide](https://github.com/airbnb/javascript)

Per la programmazione AngularJS è raccomandato: [Google's JavaScript style guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml).

Nel repository AngularJS su GitHub c'è una sezione simile curata da [ProLoser](https://github.com/ProLoser). Potete visionarla [quì](https://github.com/angular/angular.js/wiki).

# Contenuti
* [Generale](#generale)
    * [Struttura delle directory](#struttura-delle-directory)
    * [Markup](#markup)
    * [Ottimizzare il ciclo digest](#ottimizzare-il-ciclo-digest)
    * [Altro](#altro)
* [Module](#module)
* [Controller](#controller)
* [Directive](#directive)
* [Filter](#filter)
* [Service](#service)
* [Template](#template)
* [Routing](#routing)
* [Testing](#testing)
* [Collaborazioni](#collaborazioni)
* [Collaboratori](#collaboratori)

# Generale

## Struttura delle directory

Dal momento che una grande applicazione di AngularJS implica tante componenti,
sarebbe consigliabile strutturare i file e le directory in maniera gerarchica.
Ci sono due possibili approcci:

* Creare una divisione ad alto livello in base al tipo di componenti ed una a
basso livello in base alle funzionalità

In questo modo le directory avranno questa struttura:

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

* Creare una divisione ad alto livello in base alle funzionalità ed una a basso
livello in base al tipo di componenti

Questa divisione avrà invece questo tipo di struttura:

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

* Quando si creano le directive sarebbe utile mettere tutti i file associati
ad una data directive (es: template, CSS/SASS file,
JavaScript) in una singola cartella. Se scegliete di usare questo stile, siate
coerenti e usatelo in ogni occasione.

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

Questo approccio può essere combinato con entrambe le strutture di directory
trattate in precedenza
* Un'ulteriore leggera variazione di entrambe le strutture è quella usata in
[ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home). In
questa, le unit tests per un determinato componente sono poste nella stessa
cartella del componente stesso. In questo modo quando vengono fatti cambiamenti
ad un componente è più semplice trovare il relativo test. Il test, in questo
modo, fa anche da documentazione e mostra i casi d'uso.

```
services
├── cache
│   ├── cache1.js
│   └── cache1.spec.js
└── models
    ├── model1.js
    └── model1.spec.js
```

* Il file `app-js` contiene la definizione dei route, impostazioni e/o
bootstrap manuali (se richiesti).
* Ogni file JavaScript dovrebbe contenere solo un singolo componente. Il file
dovrebbe essere chiamato con il nome del componente.
* Per il progetto AngularJS, usate una struttura di template simile alla
seguente:
* The `app.js` file contains route definitions, configuration and/or manual bootstrap (if required). [ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home).

Personalmente preferisco la prima struttura perché rende più facili da trovare
i componenti più comuni.

Convenzioni su come chiamare i componenti possono essere trovate nelle sezioni
relative agli stessi.

## Markup

[TLDR;](http://developer.yahoo.com/blogs/ydn/high-performance-sites-rule-6-move-scripts-bottom-7200.html) Metti lo script in basso.

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

Mantieni il codice semplice e metti le direttive AngularJS in fondo. In questo
modo è più semplice la lettura e la mantenibilità del codice HTML.

```
<form class="frm" ng-submit="login.authenticate()">
  <div>
    <input class="ipt" type="text" placeholder="name" require ng-model="user.name">
  </div>
</form>
```

Gli altri attrubuti HTML dovrebbero seguire la seguente [guida](http://mdo.github.io/code-guide/#html-attribute-order)

## Ottimizzare il ciclo digest

* Eseguire un watch solo per le variabili più importanti (es: usando un tipo di
comunicazione real-time, non permettere un ciclo `$digest` per ogni messaggio
ricevuto).
* Per contenuti che sono inizializzati solo una volta e mai cambiati, usare un
single-time watcher come [`bindonce`](https://github.com/Pasvaz/bindonce).
* Rendere le computazioni in `$watch` il più semplici possibile. Rendendo
pesanti e lenti i calcoli in un singolo `$watch`, si abbasseranno le
prestazioni dell'intera applicazione (il ciclo `$digest` è eseguito in un
singolo thread a causa della natura single-threaded di JavaScript).
* Settare il ternzo parametro nella funzione `$timeout` a false, per evitare
un ulteriore ciclo `$digest` quando variabili non necessarie sono implicate
nella funzione callback di `$timeout`.

## Altro

* Usare:
    * `$timeout` invece di `setTimeout`
    * `$interval` invece di `setInterval`
    * `$window` invece di `window`
    * `$document` invece di `document`
    * `$http` invece di `$.ajax`

Questo renderà il testing più semplice e, in alcuni casi, impedirà
comportamenti inaspettati (come il dimenticarsi `$scope.$apply` in
`setTimeout`).

* Automatizzare il lavoro usando utility come:
    * [Yeoman](http://yeoman.io)
    * [Grunt](http://gruntjs.com)
    * [Bower](http://bower.io)

* Usare promise (`$q`) invece dei callback. Questo renderà il codice più
elegante e pulito, oltre che salvarvi dall'inferno dei callback.
* Usare `$resource` invece di `$http`. Il più alto livello d'astrazione vi
salverà dalle ridondanze.
* Usare un pre-minificatore per AngularJS (ad esempio
[ngmin](https://github.com/btford/ngmin) o
[ng-annotate](https://github.com/olov/ng-annotate)) per evitare problemi dopo
la minificazione.
* Non usare variabili globali. Risolvere tutte le dipendenze usando il
Dipendency Injection.
* Non riempire lo `$scope` se non con variabili e funzioni usate nel template.
* E' da preferire l'utilizzo di
[controller invece di `ngInit`](https://github.com/angular/angular.js/pull/4366/files).
Il solo utilizzo appropriato di `ngInit` è per rinominare particolari proprietà
di `ngRepeat`. A parte quest'ultimo caso, si dovrebbero usare controller per
inizializzare variabili nello scope.
* Non usare il prefisso `$` per i nomi di variabili, proprietà o metodi. Questo
prefisso è riservato ad AngularJS.
* Quando si risolvono dipendenze attraverso il meccanismo DI di AngularJS,
ordinare tutte le dipendenze in base al loro tipo - le dipendenze built-in di
AngularJS dovrebbero essere le prime, seguite da quelle create da voi:

```javascript
module.factory('Service', function ($rootScope, $timeout, MyCustomDependency1, MyCustomDependency2) {
  return {
    //Something
  };
});
```

# Module

* Il nome dei module dovrebbe essere assegnato secondo il lowerCamelCase. Per
indicare che un module `b` è submodule di `a` si possono concatenare usando un
namespacing come: `a.b`.

Ci sono due metodi più comuni per strutturare i modulo:

0. In base alla funzionalità
0. In base al tipo di componente

Al momento non c'è grande differenza, ma il primo metodo sembra più pulito.
Inoltre, se verrà implementato il lazy-loading modules (il che non è tra i
piani di AngularJS), le prestazioni delle app aumenteranno.

# Controller

* Non manipolare il DOM nei controller: questo renderà i controller difficili
da testare e violerà il
[principio di separazione degli interessi](https://en.wikipedia.org/wiki/Separation_of_concerns).
Usare, invece, le directive.
* Il nome dei controller è assegnato in base alla loro funzionalità (ad esempio
shopping cart, homepage, admin panel) più il suffisso 'Ctrl'. I nomi utilizzano
in questo caso l'UpperCamelCase (`HomePageCtrl`, `ShoppingCartCtrl`,
`AdminPanelCtrl`, ecc.).
* I controller non dovrebbero mai essere definiti come globali (anche se
AngularJS lo permette, inquinare il namspace globale è una brutta partica).
* Usare la sintassi ad array per la definizione dei controller:

```JavaScript
module.controller('MyCtrl', ['dependency1', 'dependency2', ..., 'dependencyn', function (dependency1, dependency2, ..., dependencyn) {
  //...body
}]);
```

Usando questo tipo di definizione si evitano problemi con la minificazione.
So possono generare definizioni ad array da quelle standard utilizzando tool
come [ng-annotate](https://github.com/olov/ng-annotate)
o le task di grunt [grunt-ng-annotate](https://github.com/mzgol/grunt-ng-annotate)
Usare il nome originale delle dipendenze dei controller. Questo vi aiuterà nel
produrre un codice più leggibile:

```JavaScript
module.controller('MyCtrl', ['$scope', function (s) {
  //...body
}]);
```

è più leggibile di:

```JavaScript
module.controller('MyCtrl', ['$scope', function ($scope) {
  //...body
}]);
```

Questo principio si applica soprattutto quando i file sono così grandi da aver
bisogno di scrollare la pagina. Questo farebbe dimenticare facilmente al
lettore quale variabile è legata a quale dipendenza.

* Rendere i controller il più leggeri possibile. Astrarre le funzioni comuni in
service.
* Comunicare all'interno dei controller invocando metodi (possibile quando un
figlio vuole comunicare con il genitore) o con i metodi `$emit`, `$broadcast`
e `$on`. I messaggi emessi e trasmessi dovrebbero ridursi al minimo.
* Creare una lista di tutti i messaggi che sono passati usando `$emit` e
`$broadcast` e manovrarli con attenzione per evitare collisioni di nomi ed bug.
* Quando si ha bisogno di formattare dati, incapsulare la logica di
formattazione in un [filter](#filters) e dichiararlo come dipendenza:

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
* In caso di controller annidati, usare "nested scoping" (la sintassi
`controllerAs`):

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

# Directive

* Assegnare i nomi alle directive seguendo il lowerCamelCase
* Usare `scope` invece di `$scope` alle funzioni link. Per le funzioni compile
e post/pre link, avrete già definito i parametri che verranno passati quando la
funzione verrà invocata e non vi sarà possibile cambiarli usando il DI. Questo
stile è utilizzato anche nel codice di AngularJS
* Usare prefissi personalizzati per le direttive per evitare collisioni con
librerie di terze parti.
* Non usare i prefissi `ng` e `ui`, poichè sono già utilizzati da AngularJS e
AngularJS UI.
* La manipolazione del DOM deve essere effettuata solo attraverso le directive.
* Creare scope isolati quando si creano directiv riusabili.
* Usare direttive come attributi o elementi invece di commenti o classi: questo
renderà il codice più leggibile.
* Usare `$scope.$on('$destroy', fn)` per pulire. Questo è molto utile
specialmente quando si fa il wrapping di plugin e directive di terze parti.
* Non dimenticare di usare `$sce` quando si ha a che fare con contenuti non
affidabili

# Filter

Questa sezione include informazioni sui componenti service di AngularJS. Questi
non dipendono dal tipo di definizione (es: come provider, `.factory`,
`.service`) a meno che questo non è esplicitamente menzionato.

* Usare camelCase per assegnare nomi ai service:
  * UpperCamelCase (PascalCase) per service usati come costruttori. Es:

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

  * lowerCamelCase per gli altri casi.

* Incapsulare tutte le logiche di business in service.
* Service che rappresentano domini dovrebbero essere definiti come `service`
piuttosto che `factory`. In questo modo ci si può avvantagiare dell'
ereditarietà "klassical" in modo più semplice:

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

* Per cache di session-level si può usare `$cacheFactory`. Questo dovrebbe
essere usato come risultato cache di richieste o pesanti calcoli.
* Se un dato service richiede una configurazione, definirlo come provider e
configurarlo nel callback di `config`:

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

# Template

* Usare `ng-bind` o `ng-cloak` invece di `{{ }}` per evitare il flashing
content.
* Evitare di scrivere espressioni complesse nei template.
* Quando si ha bisogno di settare `src` ad un'immagine in modo dimamico, usare
`ng-src` invece di `src` con `{{ }}`.
* Quando si ha bisogno di settare `href` ad un tag dimaicamente, usare
`ng-href` invece di `href` con `{{ }}`.
* Invece di usare variabili di scope come stringa e usarli nell'attributo
`style` racchiusi da `{{ }}`, utilizzare la directive `ng-style` con parametri
oggetti e variabili dello scope come valori:

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

* Usare `resolve` per risolvere le dipendenze prima di mostrare le view.

# Testing

In corso di stesura.

Finchè la sezione non è pronta, si può fare riferimento a
[questo link](https://github.com/daniellmb/angular-test-patterns).

# Collaborazioni

Dal momento che l'obiettivo di questa guida stilistica è di essere portata
avanti dalla community, eventuali collaborazioni sono grandemente apprezzate.
Ad esempio, si può contribuire estendendo la sezione di Testing o traducendo la
guida nella propria lingua

# Collaboratori

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
