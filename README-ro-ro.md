[![Join the chat at https://gitter.im/mgechev/angularjs-style-guide](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/mgechev/angularjs-style-guide?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# Introducere

Scopul acestui ghid de stil este de a prezenta un set dintre cele mai bune practici și linii de ghidaj de stil pentru o aplicația AngularJS.

Acest cele mai bune practici sunt colecționate din:

0. Codul sursă AngularJS
0. Codul sursă al articolelor pe care le-am citit
0. Propria mea experiență

**Note 1**: acest text este încă o schiță a ghidului de stil, scopul său principal este de a fi condus de către comunitate, astfel încât umplerea golurilor să fie apreciată de întreaga comunitate.

**Note 2**: înainte de a urma orice linie de ghidaj de stil din traducerile documentului din engleză, asigură-te că este adus la zi. Ultima versione a ghidului de stil pentru AngularJS este documentul în engleză.

În acest ghid de stil nu voi urma linii de ghidaj de stil comune pentru dezvoltarea în JavaScript. Acestea pot fi găsite în:

0. [Ghidul de stil pentru JavaScript folosit de Google](https://google.github.io/styleguide/javascriptguide.xml)
0. [Ghidul de stil pentru JavaScript folosit de Mozilla](https://developer.mozilla.org/en-US/docs/Developer_Guide/Coding_Style)
0. [Ghidul de stil pentru JavaScript folosit de Douglas Crockford](http://javascript.crockford.com/code.html)
0. [Ghidul de stil pentru JavaScript folosit de Airbnb](https://github.com/airbnb/javascript)
0. [Ghidul de stil pentru JavaScript folosit de Idiomatic](https://github.com/rwaldron/idiomatic.js/)

Pentru dezvoltare în AngularJS este recomandat [Ghidul de stil pentru JavaScript folosit de Google](https://google.github.io/styleguide/javascriptguide.xml).

În wiki-ul AngularJS de pe Github există o secțiune similară făcută de [ProLoser](https://github.com/ProLoser), o poți verifica [aici](https://github.com/angular/angular.js/wiki).

# Traduceri

- [German](https://github.com/mgechev/angularjs-style-guide/blob/master/README-de-de.md)
- [Spanish](https://github.com/mgechev/angularjs-style-guide/blob/master/README-es-es.md)
- [French](https://github.com/mgechev/angularjs-style-guide/blob/master/README-fr-fr.md)
- [Indonesian](https://github.com/mgechev/angularjs-style-guide/blob/master/README-id-id.md)
- [Italian](https://github.com/mgechev/angularjs-style-guide/blob/master/README-it-it.md)
- [Japanese](https://github.com/mgechev/angularjs-style-guide/blob/master/README-ja-jp.md)
- [Korean](https://github.com/mgechev/angularjs-style-guide/blob/master/README-ko-kr.md)
- [Polish](https://github.com/mgechev/angularjs-style-guide/blob/master/README-pl-pl.md)
- [Portuguese](https://github.com/mgechev/angularjs-style-guide/blob/master/README-pt-br.md)
- [Romanian](https://github.com/mgechev/angularjs-style-guide/blob/master/README-ro-ro.md)
- [Russian](https://github.com/mgechev/angularjs-style-guide/blob/master/README-ru-ru.md)
- [Serbian](https://github.com/mgechev/angularjs-style-guide/blob/master/README-sr.md)
- [Serbian lat](https://github.com/mgechev/angularjs-style-guide/blob/master/README-sr-lat.md)
- [Chinese](https://github.com/mgechev/angularjs-style-guide/blob/master/README-zh-cn.md)
- [Turkish](https://github.com/mgechev/angularjs-style-guide/blob/master/README-tr-tr.md)

# Conținut
* [General](#general)
    * [Structura directorului](#structura-directorului)
    * [Marcaj](#marcaj)
    * [Convenții de numire](#convenții-de-numire)
    * [Altele](#altele)
* [Module](#module)
* [Controlere](#controlere)
* [Directive](#directive)
* [Filtre](#filtre)
* [Servicii](#servicii)
* [Șabloane](#șabloane)
* [Rute](#rute)
* [Testare CLC](#testare-clc)
* [i18n](#i18n)
* [Performanță](#performanță)
* [Contribuție](#contribuție)
* [Contributori](#contributori)

# General

## Structura directorului

Deoarece o aplicație AngularJS are multe componente este cel mai bine să o structurezi într-o ierarhie de directoare.
Există două metode principale:

* Crearea de diviziuni de nivel înalt bazate pe tipuri de componente și divizuni de nivel jos bazate pe funcționalitate.

În acest fel, structura directorului va arăta astfel:

```
.
├── app
│   ├── app.js
│   ├── controllers
│   │   ├── home
│   │   │   ├── FirstCtrl.js
│   │   │   └── FirstCtrl.spec.js
│   │   │   └── SecondCtrl.js
│   │   │   └── SecondCtrl.spec.js
│   │   └── about
│   │       └── ThirdCtrl.js
│   │       └── ThirdCtrl.spec.js
│   ├── directives
│   │   ├── home
│   │   │   └── directive1.js
│   │   │   └── directive1.spec.js
│   │   └── about
│   │       ├── directive2.js
│   │       ├── directive2.spec.js
│   │       └── directive3.js
│   │       └── directive3.spec.js
│   ├── filters
│   │   ├── home
│   │   └── about
│   └── services
│       ├── CommonService.js
│       ├── CommonService.spec.js
│       ├── cache
│       │   ├── Cache1.js
│       │   ├── Cache1.spec.js
│       │   └── Cache2.js
│       │   └── Cache2.spec.js
│       └── models
│           ├── Model1.spec.js
│           ├── Model1.js
│           └── Model2.spec.js
│           └── Model2.js
├── partials
├── lib
└── e2e-tests
```

* Crearea de diviziuni de nivel înalt bazate pe funcționalitate și divizuni de nivel jos bazate pe tipuri de componente.

Aceasta este organizarea:

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
│   │   │   ├── FirstCtrl.spec.js
│   │   │   └── SecondCtrl.js
│   │   │   └── SecondCtrl.spec.js
│   │   ├── directives
│   │   │   └── directive1.js
│   │   │   └── directive1.spec.js
│   │   ├── filters
│   │   │   ├── filter1.js
│   │   │   ├── filter1.spec.js
│   │   │   └── filter2.js
│   │   │   └── filter2.spec.js
│   │   └── services
│   │       ├── service1.js
│   │       ├── service1.spec.js
│   │       └── service2.js
│   │       └── service2.spec.js
│   └── about
│       ├── controllers
│       │   └── ThirdCtrl.js
│       │   └── ThirdCtrl.spec.js
│       ├── directives
│       │   ├── directive2.js
│       │   ├── directive2.spec.js
│       │   └── directive3.js
│       │   └── directive3.spec.js
│       ├── filters
│       │   └── filter3.js
│       │   └── filter3.spec.js
│       └── services
│           └── service3.js
│           └── service3.spec.js
├── partials
├── lib
└── e2e-tests
```

* În cazul în care un nume de director conține mai multe cuvinte, folosește sintaxa-tip-lisp:

```
app
 ├── app.js
 └── my-complex-module
     ├── controllers
     ├── directives
     ├── filters
     └── services
```

* Pune toate fișierele asociate cu o directivă (i.e. șabloane, fișiere CSS/SASS, JavaScript) într-un singur director. Dacă alegi să folosești acest stil, fii consistent și folosește-l peste tot în proiectul tău.

```
app
└── directives
    ├── directive1
    │   ├── directive1.html
    │   ├── directive1.js
    │   ├── directive1.spec.js
    │   └── directive1.sass
    └── directive2
        ├── directive2.html
        ├── directive2.js
        ├── directive2.spec.js
        └── directive2.sass
```

Această metodă poate fi combinată cu ambele structuri de directoare de mai sus.
* Testele de unitate pentru un anumit component (`*.spec.js`) ar trebui să fie localizate în directorul în care se află componentul. În acest fel poți face schimbări la un anumit component deoarece testarea este ușoară. Testele funcționează de asemenea ca documentare și studii de caz.

```
services
├── cache
│   ├── cache1.js
│   └── cache1.spec.js
└── models
    ├── model1.js
    └── model1.spec.js
```

* Fișierul `app.js` ar trebui să conțină definiții de rute, configurație și/sau autoinițializare manuală (dacă este necesar).
* Fiecare fișier de JavaScript ar trebui să conțină **un singur component**. Fișierul ar trebui să fie numit cu numele componentului.
* Folosește șablonul structurii de proiect precum [Yeoman](http://yeoman.io), [ng-boilerplate](http://ngbp.github.io/ngbp/#/home).

Convenții despre numirea componentelor pot fi găsite în secțiunea fiecărui component.

## Marcaj

[PL;NC](http://developer.yahoo.com/blogs/ydn/high-performance-sites-rule-6-move-scripts-bottom-7200.html) Pune script-urile la final.

```html
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

Păstrează lucrurile simplu și pune directive specifice AngularJS după atributele standard. Aceasta va face parcurgerea codului mai ușoară și va fi mai ușor de menținut deoarece atributele sunt grupate și poziționate consistent.

```html
<form class="frm" ng-submit="login.authenticate()">
  <div>
    <input class="ipt" type="text" placeholder="name" require ng-model="user.name">
  </div>
</form>
```

Alte atribute HTML ar trebui să urmeze recomandarea [Code Guide](http://mdo.github.io/code-guide/#html-attribute-order)

## Convenții de numire
Următorul tabel arată convențiile de numere pentru fiecare element:

Element | Stil de numire | Exemplu | Folosire
----|------|----|--------
Module | scrieCamilăMic  | angularApp |
Controlere | Funcționalitate + 'Ctrl'  | AdminCtrl |
Directive | scrieCamilăMic  | userInfo |
Filtre | scrieCamilăMic | userFilter |
Servicii | scrieCamilăMare | User | constructor
Fabrici | scrieCamilăMic | dataFactory | others

## Altele

* Folosește:
    * `$timeout` în loc de `setTimeout`
    * `$interval` în loc de `setInterval`
    * `$window` în loc de `window`
    * `$document` în loc de `document`
    * `$http` în loc de `$.ajax`
    * `$location` în loc de `window.location` sau `$window.location`
    * `$cookies` în loc de `document.cookie`

Asta îți va face testarea mai ușoară iar în unele cazuri va preveni comportamentul neașteptat (de exemplu, dacă ai uitat `$scope.$apply` în `setTimeout`).

* Automează-ți fluxul de lucru folosind unelte ca:
    * [NPM](https://www.npmjs.com/)
    * [Grunt](http://gruntjs.com)
    * [Gulp](http://gulpjs.com)
    * [Yeoman](http://yeoman.io)
    * [Bower](http://bower.io)


* Folosește promisiuni (`$q`) în loc de reveniri. Îți va face codul să arate mai elegant și mai curat, și te va scăpa de iadul revenirilor.
* Folosește `$resource` în loc de `$http` atunci când este posibil. Nivelul mai înalt de abstracție te va scăpa de redundanță.
* Folosește un pre-minificator AngularJS ([ng-annotate](https://github.com/olov/ng-annotate)) pentru a preveni problemele de după minificare.
* Nu folosi globale. Rezolvă toate dependențele folosind Injectarea Dependențelor, aceasta va preveni bug-urile și cârpirea codului la testare.
* Evită globalele folosind Grunt/Gulp pentru a înveli codul în Expresii Funcții Invocate Imediat (EFII/IIFE). Poți folosi plugin-uri ca [grunt-wrap](https://www.npmjs.com/package/grunt-wrap) sau [gulp-wrap](https://www.npmjs.com/package/gulp-wrap/) pentru acest scop. Exemplu (folosind Gulp)

    ```Javascript
    gulp.src("./src/*.js")
    .pipe(wrap('(function(){\n"use strict";\n<%= contents %>\n})();'))
    .pipe(gulp.dest("./dist"));
    ```
* Nu-ți polua `$scope`-ul. Adaugă doar funcții și variable care sunt folosite în șabloane.
* Preferă folosirea [controlerelor în loc de `ngInit`](https://github.com/angular/angular.js/commit/010d9b6853a9d2718b095e4c017c9bd5f135e0b0). Există doar câteva folosiri adecvate pentru `ngInit`, de exemplu pentru redenumirea proprietăților speciale în `ngRepeat`, și pentru injectarea de data prin scriptare din partea server-ului. Pe lângă aceste câteva cazuri, ar trebui să folosești controlere mai degrabă decât `ngInit` pentru a inițializa valori într-un scop. Expresia predată lui`ngInit` ar trebui să treacă prin lexicalizare, parsare și evaluare de către interpretatorul Angular implementat în serviciul `$parse`. Aceasta conduce la:
    - Impact asupra performanței, deoarece interpretatorul este implementat în JavaScript;
    - Arhivarea expresiilor parsate în interiorul serviciului `$parse` nu are mult sens în cele mai multe cazuri, deoarece expresiile `ngInit` sunt evaluate doar o dată;
    - Este dispus erorii, deoarece scrii șiruri de caractere în interiorul șabloanelor nu există evidențierea sintaxei și suport adițional din partea editorului.
    - Nu sunt aruncate erori la rulare
* Nu folosi `$` ca prefix pentru numele variabilelor, proprietăților, sau metodelor. Acest prefix este rezervat pentru folosirea de către AngularJS.
* Nu folosi `JQUERY` în interiorul aplicației. Dacă trebuie, folosește în loc `JQLite` cu `angular.element`.
* Atunci când rezolvi dependențe prin mecanismul de Injectarea Dependențelor al AngularJS sortează dependențele prin tipul lor - dependențele contruite-în AngularJS ar trebui să fie primele, urmate de cele ale tale:

```javascript
module.factory('Service', function ($rootScope, $timeout, MyCustomDependency1, MyCustomDependency2) {
  return {
    //Something
  };
});
```

# Module

* Modulele ar trebui să fie numite cu scriereCămilăMic. Pentru a indica că modulul `b` este un submodul al modulului `a` le poți încorpora folosind înspațierea în nume ca: `a.b`.

    Există două feluri comune de a structura modulele:

    0. Prin funcționalitate
    0. Prin tipul componentului

    Momentan, nu este o diferență majoră, dar primul mod arată mai curat. De asemenea, dacă încărcarea-leneșă a modulelor este implementată (momentan nu este în harta de dezvoltare a AngularJS), va crește performanța aplicației.

# Controlere

* Nu manipula DOM-ul în controlere, aceasta va face controlerele mai greu de testat și va viola [Principiul de Separare a Grijilor](https://en.wikipedia.org/wiki/Separation_of_concerns). Folosește directive în schimb.
* Numirea controlerului este făcută folosind funcționalitatea controlerului (de exemplu coș de cumpărături, pagină principală, panou admin) și subșirul `Ctrl` la final.
* Controlere sunt [constructori](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor) în JavaScript simplu, astfel că vor fi numite folosind ScriereaCămilăMare (`HomePageCtrl`, `ShoppingCartCtrl`, `AdminPanelCtrl`, etc.).
* Controlerele nu ar trebui să fie definite ca globale (chiar dacă AngularJS permite asta, este o practică proastă să poluezi înspațierea de nume global).
* Folosește următoarea sintaxă pentru definirea controlerelor:

  ```JavaScript
  function MyCtrl(dependency1, dependency2, ..., dependencyN) {
    // ...
  }
  module.controller('MyCtrl', MyCtrl);
  ```

   Pentru a preveni problemele cu minificarea poți genera automat sintaxa de definire a matricii din cea standard foloding unelte ca [ng-annotate](https://github.com/olov/ng-annotate) (și grunt [grunt-ng-annotate](https://github.com/mzgol/grunt-ng-annotate)).

   O altă alternativă va fi de a folosi `$inject` ca:

  ```JavaScript
  angular
    .module('app')
    .controller('HomepageCtrl', HomepageCtrl);

  HomepageCtrl.$inject = ['$log', '$http', 'ngRoute'];

  function HomepageCtrl($log, $http, ngRoute) {
    // ...
  }
  ```

* Evită de a folosi serviciul `$scope` pentru a defini funcții și proprietăți ca părți ale controlerelor. Folosește `$scope` doar dacă este necesar:
    0. Pentru publicarea și subscrierea la evenimente: `$scope.$emit`, `$scope.$broadcast`, și `$scope.$on`.
    0. Pentru valori și colecții _watch_: `$scope.$watch`, `$scope.$watchCollection`

* Preferă folosirea sintaxei `controller as` și capturează `this` folosind o variabilă:

  ```html
  <div ng-controller="MainCtrl as main">
     {{ main.things }}
  </div>
  ```

  ```JavaScript
  app.controller('MainCtrl', MainCtrl);
  MainCtrl.$inject = ['$http'];

  function MainCtrl ($http) {
    var vm = this;
    // o conexiune vizuală mai clară despre cum este definită în vedere
    vm.title = 'Some title';
    vm.description = 'Some description';

    $http.get('/api/main/things').then(function (response) {
        vm.things = response.data.things; // Adăugarea 'things' ca proprietate a controlerului
    });
  }
  ```

   Evită folosirea cuvântului `this` în mod repetat într-un controler:

  ```JavaScript
    app.controller('MainCtrl', MainCtrl);
    MainCtrl.$inject = ['$http'];

    // evită
    function MainCtrl ($http) {
      this.title = 'Some title';
      this.description = 'Some description';

      $http.get('/api/main/things').then(function (response) {
          // Atenție! 'this' este în alt context aici
          // Proprietatea nu va fi adăugată ca parte a contextului controlerului
          this.things = response.data.things;
      });
    }
    ```

   Folosirea unui nume consistent și scurt este preferat, de exemplu `vm`.

   Beneficiile principale de a folosi această sintaxă:
   * Creează un component 'izolat' - proprietățile legate nu sunt parte a lanțului prototipal `$scope`. Aceasta este o practică deoarece ereditatea prototipală a `$scope` are câteva dezavantaje majore (acesta este probabil motivul pentru a care a fost scos din Angular 2):
      * Este greu de ținut cont de unde vine data.
      * Schimbările valorile scopului pot afecta locuri pe caren nu ai intenționat să le afectezi.
      * Mai greu de refactorizat.
      * '[regula punct](http://jimhoskins.com/2012/12/14/nested-scopes-in-angularjs.html)'.
   * Renunță la folosirea `$scope` acolo unde nu este nevoie de operații speciale (așa cum este menționat mai sus). Aceasta este o bună pregătire pentru AngularJS V2.
   * Sintaxa este mai apropiată de constructorul JavaScript 'vanilie'.

   Săpând mai adânc în `controller as`: [săpând-în-controlerele-angular-ca-sintaxă](http://toddmotto.com/digging-into-angulars-controller-as-syntax/)
* În folosirea sintaxei de definirea matricei, folosește numele originale ale dependenței controlerelor. Aceasta te va ajuta să produci un cod mai citibil:

  ```JavaScript
  function MyCtrl(l, h) {
    // ...
  }

  module.controller('MyCtrl', ['$log', '$http', MyCtrl]);
  ```

   care este mai puțin citibil decât:

  ```JavaScript
  function MyCtrl($log, $http) {
    // ...
  }

  module.controller('MyCtrl', ['$log', '$http', MyCtrl]);
  ```

   Aceasta se aplică în mod special la un fișier care are atât de mult cod încât trebuie să faci scroll prin el. Aceasta te va face poate să uiți ce variabilă este legată de care dependență.

* Fă controlerele cât mai subțiri. Abstractiează funcțiile folosite în mod comun într-un serviciu.
* Evită scrierea logicii de afacere în interiroul controlerelor. Delegă logica de afacere într-un `model`, folosind un serviciu.
  De exemplu:

  ```Javascript
  // Acesta este un comportament comun (exemplu negativ) de a folosi logica de afacere în interiorul unui controler.
  angular.module('Store', [])
  .controller('OrderCtrl', function () {
    var vm = this;

    vm.items = [];

    vm.addToOrder = function (item) {
      vm.items.push(item);//--> Logică de afacere în interiorul controlerului
    };

    vm.removeFromOrder = function (item) {
      vm.items.splice(vm.items.indexOf(item), 1);//--> Logică de afacere în interiorul controlerului
    };

    vm.totalPrice = function () {
      return vm.items.reduce(function (memo, item) {
        return memo + (item.qty * item.price);//--> Logică de afacere în interiorul controlerului
      }, 0);
    };
  });
  ```

  Atunci când delegi logica de afacere într-un serviciu de `model`, controlerul va arăta atfel (vezi 'folosește servicii ca Model' pentru implementarea serviciului-model):

  ```Javascript
  // order este folosit ca 'model'
  angular.module('Store', [])
  .controller('OrderCtrl', function (order) {
    var vm = this;

    vm.items = order.items;

    vm.addToOrder = function (item) {
      order.addToOrder(item);
    };

    vm.removeFromOrder = function (item) {
      order.removeFromOrder(item);
    };

    vm.totalPrice = function () {
      return order.total();
    };
  });
  ```

  De ce logica de afacere / starea aplicației din interiorul controlerului este rea?
  * Controlerele sunt instanțiate pentru fiecare vedere și moare atunci când vederea este descărcată.
  * Controlerele nu sunt refolosibile - ele sunt cuplat cu vederea.
  * Controlerele nu sunt menite să fie injectate.

* Comunică în cadrul diferitelor controlere folosind invocarea metodei (posibilă atunci când un copil vrea să comunice cu părintele său) sau metodele `$emit`, `$broadcast`, și `$on`. Mesajele emise sau comunicate ar trebui să fie păstrate la un minim.
* Fă o listă a tuturor mesajelor care sunt predate prin `$emit`, `$broadcast` și administreaz-o cu atenție datorită coliziunilor de nume și a posibilelor bug-uri.

   Exemple:

   ```JavaScript
   // app.js
   /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
   Evenimente specifice:
     - 'authorization-message' - descrierea mesajului
       - { user, role, action } - formatul data
         - user - un șir de caractere, care conține numele de utilizator
         - role - un ID al unui rol avut de utilizator
         - action - acțiunea specifică pe care încearcă să o facă utilizatorul
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
   ```

* Atunci când trebuie să formatezi data, encapsulează logica de formatare într-un [filtru](#filtre) și declar-o ca o dependență:

   ```JavaScript
   function myFormat() {
     return function () {
       // ...
     };
   }
   module.filter('myFormat', myFormat);

   function MyCtrl($scope, myFormatFilter) {
     // ...
   }

   module.controller('MyCtrl', MyCtrl);
   ```

* În cazul controlerelor grupate folosește „scope grupat” (sintaxa `controllerAs`):

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
     var vm = this;

     vm.bindingValue = 42;
   }
   ```
   **template.html**
   ```html
   <div ng-bind="home.bindingValue"></div>
   ```

# Directive

* Numește-ți directive cu scriereCămilăMică.
* Folosește `scope` în locul `$scope` în funcția de legare. În funcțiile de compilare, pre/post legare ai definit deja argumente care vor fi predate atunci când funcția este invocată, nu vei fi capabil să le schimbi atunci când folosești Injectarea Dependenței. Acest stil este de asemenea folosit în codul sursă AngularJS.
* Folosește prefixe specifice pentru directive pentru a preveni coliziunile cu biblioteci ale unor părți terțiare.
* Nu folosi prefixe `ng` sau `ui` deoarece sunt rezervate pentru folosirea AngularJS sau AngularJS UI.
* Manipularea DOM trebuie făcută doar prin directive.
* Creează un scop izolat atunci când dezvolți componente reutilizabile.
* Folosește directive ca atribute sau elemente în loc de comentarii sau clase, îți vor face codul mai citibil.
* Folosește `scope.$on('$destroy', fn)` pentru curățire. Aceasta este în special folosibil atunci când învelești directive sau plugin-uri din părți terțe.
* Nu uita să folosești `$sce` atunci când ar trebui să lucrezi cu conținut ce nu poate fi crezut.

# Filtre

* Numește-ți filtrele folosind scriereCămilăMic.
* Fă-ți filtrele cât mai ușoare posibil. Ele sunt chemate des în timpul ciclului `$digest` astfel încât crearea unui filtru încet îți va încetini aplicația.
* Fă un singur lucru în filtre, păstrează-le coerente. Manipulări mai complexe pot fi obținute prin înțevuirea filtrele existente.

# Servicii

Această secțiune include informație despre serviciul component în AngularJS. Nu este dependent de felul definiției (i.e. ca furnizor, `.factory`, `.service`), cu excepția dacă este menționată explicit.

* Folosirea scriereCămilăMic pentru a-ți numi serviciile.
* ScriereaCămilăMare (ScriereaPascal) pentru numirea serviciilor, folosite ca funcții constructor, i.e.:

    ```JavaScript
    function MainCtrl(User) {
        var vm = this;
        vm.user = new User('foo', 42);
    }

    module.controller('MainCtrl', MainCtrl);

    function User(name, age) {
      this.name = name;
      this.age = age;
    }

    module.factory('User', function () {
      return User;
    });
    ```

* scriereCămilăMic pentru toate celelalte servicii.

* Encapsulează-ți toată logica de afaceri în servicii. Preferă să o folosești ca `model`. De exemplu:
  ```Javascript
  // order este 'model'-ul
  angular.module('Store')
  .factory('order', function () {
      var add = function (item) {
        this.items.push (item);
      };

      var remove = function (item) {
        if (this.items.indexOf(item) > -1) {
          this.items.splice(this.items.indexOf(item), 1);
        }
      };

      var total = function () {
        return this.items.reduce(function (memo, item) {
          return memo + (item.qty * item.price);
        }, 0);
      };

      return {
        items: [],
        addToOrder: add,
        removeFromOrder: remove,
        totalPrice: total
      };
  });
  ```

* Vezi 'Evitarea scrierii logicii de afaceri în controlere' pentru un exemplu a unui controler care consumă acest serviciu.
* Serviciile reprezentând domeniul preferă un `service` în loc de un `factory`. În acest fel putem valorifica de ereditarea "klassical"ă mai ușor:

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

    myModule.service('human', Human);
    myModule.service('developer', Developer);

    ```

* Pentru arhivarea la nivel de sesiune poți folosi `$cacheFactory`. Aceasta ar trebui să fie folosită pentru a arhiva rezultate din cereri și computații grele.
* Dacă un anumit serviciu necesită configurare, definește serviciul ca furnizor și configurează-l în revenirea `config` ca:

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

# Șabloane

* Folosește `ng-bind` sau `ng-cloak` în loc de simple `{{ }}` pentru a preveni fulgerarea conținutului.
* Evită scrierea de expresii complexe în șabloane.
* Atunci când trebuie să setezi `src`-ul unei imagini dinamic folosește `ng-src` în loc de `src` cu șablon `{{ }}`.
* Atunci când trebuie să setezi `href`-ul unei etichete ancoră dinamic folosește `ng-href` în loc de `href` cu șablon `{{ }}`.
* În loc de a folosi variabile de scop ca șir de caractere și a folosi atributul `style` cu `{{ }}`, folosește directiva `ng-style` cu parametri ca-obiecte și variabile de scop ca valori:

```html
    <div ng-controller="MainCtrl as main">
        <div ng-style="main.divStyle">my beautifully styled div which will work in IE</div>;
    </div>
```

```JavaScript
  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = [];

  function MainCtrl() {
    var vm = this;
    vm.divStyle = {
        width: 200,
        position: 'relative'
    };
  }
```

# Rute

* Folosește `resolve` pentru a rezolva dependențele înainte ca vederea să fie aratată.
* Nu plasa chemări explicite REST înăutru revenirii `resolve`. Izolează toate cererile înăutru serviciilor adecvate. În acest fel poți activa arhivarea și urmări principiul separării grijei.

# Testare CLC

Testarea Capăt-La-Capăt sunt pasul următor după testele de unitate care-ți vor permite să urmărești bug-urile și erorile din sistem. Sunt foarte utile în a asigura o verificare de sanitate în cele mai comune scenarii din folosirea aplicației tale. În acest fel poți automatiza procesul și rula înainte de fiecare dată de ați instala aplicația.

Ideal, teste Capăt-La-Capăt Angular sunt scrise în Jasmine. Aceste teste sunt rulate folosind Protractor E2E care folosește evenimente native și are funcții speciale pentru aplicații Angular.

Structura fișierelor:

```
.
├── app
│   ├── app.js
│   ├── home
│   │   ├── home.html
│   │   ├── controllers
│   │   │   ├── FirstCtrl.js
│   │   │   ├── FirstCtrl.spec.js
│   │   ├── directives
│   │   │   └── directive1.js
│   │   │   └── directive1.spec.js
│   │   ├── filters
│   │   │   ├── filter1.js
│   │   │   └── filter1.spec.js
│   │   └── services
│   │       ├── service1.js
│   │       └── service1.spec.js
│   └── about
│       ├── about.html
│       ├── controllers
│       │   └── ThirdCtrl.js
│       │   └── ThirdCtrl.spec.js
│       └── directives
│           ├── directive2.js
│           └── directive2.spec.js
├── partials
├── lib
└── e2e-tests
    ├── protractor.conf.js
    └── specs
        ├── home.js
        └── about.js
```

# i18n

* Pentru versiuni mai noi ale framework-ului (>=1.4.0) folosește uneltele de i18n construite-în, atunci când folosești versiuni mai vechi (<1.4.0) folosește [`angular-translate`](https://github.com/angular-translate/angular-translate).

# Performanță

* Optimizează ciclul de digerare

    * Vezi doar cele mai vitale variabile. Atunci când trebuie să invoice ciclul `$digest` explicit (ar trebui să se întâmple doar în cazuri excepționale), invoc-o doar atunci când este necesar (de exemplu: atunci când folosești comunicare în timp real, nu cauza un ciclu `$digest` în fiecare mesaj primit).
    * Pentru conținutul care este inițializat doar o dată iar apoi niciodată schimbat, folosește veghetori o singură dată ca [`bindonce`](https://github.com/Pasvaz/bindonce) pentru versiuni mai vechi ale AngularJS sau legături o dată în AngularJS >=1.3.0.
        ```html
        <div>
          {{ ::main.things }}
        </div>
        ```
        or
        ```html
          <div ng-bind="::main.things"></div>
        ```
    După asta, **niciun** veghetor nu va fi creat pentru `main.things` și nicio schimbare a `main.things` nu va aduce la zi vederea.
    * Fă computațiile în `$watch` cât de simple posibile. A face computații greoaie și încete într-un singur `$watch` va înceta întreaga aplicației (ciclul `$digest` este făcut într-un singur fir datorită naturii de fir-singur al JavaScript).
    * Atunci când veghezi colecții, nu le veghea adânc atunci când nu este necesar. Mai bine folosești `$watchCollection` care produce o verificare superficială pentru egalitatea expresiei vegheate cu valoarea anterioară a expresiei evaluate.
    * Setează al treilea parametru în funcția `$timeout` ca fals pentru a sări peste ciclul `$digest` atunci când nicio variabilă nu e influențată de invocarea funcției de revenire `$timeout`.
    * Atunci când te ocupi de colecții mari, care se schimbă rar, [folosește structuri de data imutabile](http://blog.mgechev.com/2015/03/02/immutability-in-angularjs-immutablejs).

* Consideră descreșterea numărului de cereri de la rețea prin gruparea/arhivarea fișierelor șablon `html` în fișierul JavaScript principal, folosind [grunt-html2js](https://github.com/karlgoldstein/grunt-html2js) / [gulp-html2js](https://github.com/fraserxu/gulp-html2js). Vezi [aici](http://ng-learn.org/2014/08/Populating_template_cache_with_html2js/) și [aici](http://slides.com/yanivefraim-1/real-world-angularjs#/34) pentru detalii. Aceasta este util în mod special atunci când proiectul are un număr mare de șabloane `html` mici care pot fi parte din fișierul JavaScript principal (minificat sau gzip-at).


# Contribuție

Deoarece scopul acestui ghid de stil este de a fi condus de comunitate, contribuțiile sunt foarte apreciate.
De exemplu, poți contribui prin extinderea secțiune de Testare sau prin traducerea ghidului de stil în limba maternă.

# Contributori

[<img alt="mgechev" src="https://avatars1.githubusercontent.com/u/455023?v=4&s=117" width="117">](https://github.com/mgechev) |[<img alt="morizotter" src="https://avatars1.githubusercontent.com/u/536954?v=4&s=117" width="117">](https://github.com/morizotter) |[<img alt="chatii2412" src="https://avatars2.githubusercontent.com/u/3435149?v=4&s=117" width="117">](https://github.com/chatii2412) |[<img alt="pascalockert" src="https://avatars0.githubusercontent.com/u/4253438?v=4&s=117" width="117">](https://github.com/pascalockert) |[<img alt="yanivefraim" src="https://avatars3.githubusercontent.com/u/1336186?v=4&s=117" width="117">](https://github.com/yanivefraim) |[<img alt="ericguirbal" src="https://avatars1.githubusercontent.com/u/322135?v=4&s=117" width="117">](https://github.com/ericguirbal) |
:---: |:---: |:---: |:---: |:---: |:---: |
[mgechev](https://github.com/mgechev) |[morizotter](https://github.com/morizotter) |[chatii2412](https://github.com/chatii2412) |[pascalockert](https://github.com/pascalockert) |[yanivefraim](https://github.com/yanivefraim) |[ericguirbal](https://github.com/ericguirbal) |

[<img alt="agnislav" src="https://avatars2.githubusercontent.com/u/364255?v=4&s=117" width="117">](https://github.com/agnislav) |[<img alt="ray7551" src="https://avatars0.githubusercontent.com/u/1812388?v=4&s=117" width="117">](https://github.com/ray7551) |[<img alt="mainyaa" src="https://avatars0.githubusercontent.com/u/800781?v=4&s=117" width="117">](https://github.com/mainyaa) |[<img alt="LeonardCModoran" src="https://avatars1.githubusercontent.com/u/8460505?v=4&s=117" width="117">](https://github.com/LeonardCModoran) |[<img alt="elfinxx" src="https://avatars2.githubusercontent.com/u/4384908?v=4&s=117" width="117">](https://github.com/elfinxx) |[<img alt="tiagobarreto" src="https://avatars3.githubusercontent.com/u/45082?v=4&s=117" width="117">](https://github.com/tiagobarreto) |
:---: |:---: |:---: |:---: |:---: |:---: |
[agnislav](https://github.com/agnislav) |[ray7551](https://github.com/ray7551) |[mainyaa](https://github.com/mainyaa) |[LeonardCModoran](https://github.com/LeonardCModoran) |[elfinxx](https://github.com/elfinxx) |[tiagobarreto](https://github.com/tiagobarreto) |

[<img alt="Xuefeng-Zhu" src="https://avatars0.githubusercontent.com/u/5875315?v=4&s=117" width="117">](https://github.com/Xuefeng-Zhu) |[<img alt="SullyP" src="https://avatars2.githubusercontent.com/u/12484363?v=4&s=117" width="117">](https://github.com/SullyP) |[<img alt="giacomocusinato" src="https://avatars0.githubusercontent.com/u/7659518?v=4&s=117" width="117">](https://github.com/giacomocusinato) |[<img alt="rubystream" src="https://avatars3.githubusercontent.com/u/3200?v=4&s=117" width="117">](https://github.com/rubystream) |[<img alt="lukaszklis" src="https://avatars0.githubusercontent.com/u/11782?v=4&s=117" width="117">](https://github.com/lukaszklis) |[<img alt="Spuffynism" src="https://avatars2.githubusercontent.com/u/8978908?v=4&s=117" width="117">](https://github.com/Spuffynism) |
:---: |:---: |:---: |:---: |:---: |:---: |
[Xuefeng-Zhu](https://github.com/Xuefeng-Zhu) |[SullyP](https://github.com/SullyP) |[giacomocusinato](https://github.com/giacomocusinato) |[rubystream](https://github.com/rubystream) |[lukaszklis](https://github.com/lukaszklis) |[Spuffynism](https://github.com/Spuffynism) |

[<img alt="susieyy" src="https://avatars0.githubusercontent.com/u/62295?v=4&s=117" width="117">](https://github.com/susieyy) |[<img alt="cironunes" src="https://avatars2.githubusercontent.com/u/469908?v=4&s=117" width="117">](https://github.com/cironunes) |[<img alt="cavarzan" src="https://avatars2.githubusercontent.com/u/3915288?v=4&s=117" width="117">](https://github.com/cavarzan) |[<img alt="guiltry" src="https://avatars3.githubusercontent.com/u/1484308?v=4&s=117" width="117">](https://github.com/guiltry) |[<img alt="MSafter" src="https://avatars3.githubusercontent.com/u/5517637?v=4&s=117" width="117">](https://github.com/MSafter) |[<img alt="mingchen" src="https://avatars2.githubusercontent.com/u/1002838?v=4&s=117" width="117">](https://github.com/mingchen) |
:---: |:---: |:---: |:---: |:---: |:---: |
[susieyy](https://github.com/susieyy) |[cironunes](https://github.com/cironunes) |[cavarzan](https://github.com/cavarzan) |[guiltry](https://github.com/guiltry) |[MSafter](https://github.com/MSafter) |[mingchen](https://github.com/mingchen) |

[<img alt="jmblog" src="https://avatars0.githubusercontent.com/u/86085?v=4&s=117" width="117">](https://github.com/jmblog) |[<img alt="luixaviles" src="https://avatars0.githubusercontent.com/u/3485075?v=4&s=117" width="117">](https://github.com/luixaviles) |[<img alt="andreasonny83" src="https://avatars0.githubusercontent.com/u/8806300?v=4&s=117" width="117">](https://github.com/andreasonny83) |[<img alt="kuzzmi" src="https://avatars3.githubusercontent.com/u/1727140?v=4&s=117" width="117">](https://github.com/kuzzmi) |[<img alt="jabhishek" src="https://avatars3.githubusercontent.com/u/1830537?v=4&s=117" width="117">](https://github.com/jabhishek) |[<img alt="adambabik" src="https://avatars1.githubusercontent.com/u/277870?v=4&s=117" width="117">](https://github.com/adambabik) |
:---: |:---: |:---: |:---: |:---: |:---: |
[jmblog](https://github.com/jmblog) |[luixaviles](https://github.com/luixaviles) |[andreasonny83](https://github.com/andreasonny83) |[kuzzmi](https://github.com/kuzzmi) |[jabhishek](https://github.com/jabhishek) |[adambabik](https://github.com/adambabik) |

[<img alt="astalker" src="https://avatars0.githubusercontent.com/u/1486567?v=4&s=117" width="117">](https://github.com/astalker) |[<img alt="clbn" src="https://avatars1.githubusercontent.com/u/1071933?v=4&s=117" width="117">](https://github.com/clbn) |[<img alt="atodorov" src="https://avatars3.githubusercontent.com/u/1002300?v=4&s=117" width="117">](https://github.com/atodorov) |[<img alt="apetro" src="https://avatars3.githubusercontent.com/u/952283?v=4&s=117" width="117">](https://github.com/apetro) |[<img alt="valgreens" src="https://avatars2.githubusercontent.com/u/903263?v=4&s=117" width="117">](https://github.com/valgreens) |[<img alt="bitdeli-chef" src="https://avatars2.githubusercontent.com/u/3092978?v=4&s=117" width="117">](https://github.com/bitdeli-chef) |
:---: |:---: |:---: |:---: |:---: |:---: |
[astalker](https://github.com/astalker) |[clbn](https://github.com/clbn) |[atodorov](https://github.com/atodorov) |[apetro](https://github.com/apetro) |[valgreens](https://github.com/valgreens) |[bitdeli-chef](https://github.com/bitdeli-chef) |

[<img alt="meetbryce" src="https://avatars1.githubusercontent.com/u/1845143?v=4&s=117" width="117">](https://github.com/meetbryce) |[<img alt="unseen1980" src="https://avatars1.githubusercontent.com/u/2386570?v=4&s=117" width="117">](https://github.com/unseen1980) |[<img alt="cminhho" src="https://avatars3.githubusercontent.com/u/10251630?v=4&s=117" width="117">](https://github.com/cminhho) |[<img alt="dwmkerr" src="https://avatars2.githubusercontent.com/u/1926984?v=4&s=117" width="117">](https://github.com/dwmkerr) |[<img alt="kuzmeig1" src="https://avatars2.githubusercontent.com/u/8707951?v=4&s=117" width="117">](https://github.com/kuzmeig1) |[<img alt="dominickolbe" src="https://avatars0.githubusercontent.com/u/6094725?v=4&s=117" width="117">](https://github.com/dominickolbe) |
:---: |:---: |:---: |:---: |:---: |:---: |
[meetbryce](https://github.com/meetbryce) |[unseen1980](https://github.com/unseen1980) |[cminhho](https://github.com/cminhho) |[dwmkerr](https://github.com/dwmkerr) |[kuzmeig1](https://github.com/kuzmeig1) |[dominickolbe](https://github.com/dominickolbe) |

[<img alt="gsamokovarov" src="https://avatars0.githubusercontent.com/u/604618?v=4&s=117" width="117">](https://github.com/gsamokovarov) |[<img alt="grvcoelho" src="https://avatars3.githubusercontent.com/u/7416751?v=4&s=117" width="117">](https://github.com/grvcoelho) |[<img alt="yassirh" src="https://avatars2.githubusercontent.com/u/4649139?v=4&s=117" width="117">](https://github.com/yassirh) |[<img alt="bargaorobalo" src="https://avatars1.githubusercontent.com/u/993001?v=4&s=117" width="117">](https://github.com/bargaorobalo) |[<img alt="hermankan" src="https://avatars2.githubusercontent.com/u/2899106?v=4&s=117" width="117">](https://github.com/hermankan) |[<img alt="jesselpalmer" src="https://avatars1.githubusercontent.com/u/682097?v=4&s=117" width="117">](https://github.com/jesselpalmer) |
:---: |:---: |:---: |:---: |:---: |:---: |
[gsamokovarov](https://github.com/gsamokovarov) |[grvcoelho](https://github.com/grvcoelho) |[yassirh](https://github.com/yassirh) |[bargaorobalo](https://github.com/bargaorobalo) |[hermankan](https://github.com/hermankan) |[jesselpalmer](https://github.com/jesselpalmer) |

[<img alt="capaj" src="https://avatars0.githubusercontent.com/u/1305378?v=4&s=117" width="117">](https://github.com/capaj) |[<img alt="johnnyghost" src="https://avatars0.githubusercontent.com/u/1117330?v=4&s=117" width="117">](https://github.com/johnnyghost) |[<img alt="jordanyee" src="https://avatars3.githubusercontent.com/u/3303098?v=4&s=117" width="117">](https://github.com/jordanyee) |[<img alt="whoan" src="https://avatars1.githubusercontent.com/u/7103003?v=4&s=117" width="117">](https://github.com/whoan) |[<img alt="nacyot" src="https://avatars3.githubusercontent.com/u/148919?v=4&s=117" width="117">](https://github.com/nacyot) |[<img alt="mariolamacchia" src="https://avatars1.githubusercontent.com/u/6282722?v=4&s=117" width="117">](https://github.com/mariolamacchia) |
:---: |:---: |:---: |:---: |:---: |:---: |
[capaj](https://github.com/capaj) |[johnnyghost](https://github.com/johnnyghost) |[jordanyee](https://github.com/jordanyee) |[whoan](https://github.com/whoan) |[nacyot](https://github.com/nacyot) |[mariolamacchia](https://github.com/mariolamacchia) |

[<img alt="mischkl" src="https://avatars2.githubusercontent.com/u/8177979?v=4&s=117" width="117">](https://github.com/mischkl) |[<img alt="michaelmov" src="https://avatars1.githubusercontent.com/u/4242002?v=4&s=117" width="117">](https://github.com/michaelmov) |[<img alt="kirstein" src="https://avatars1.githubusercontent.com/u/426442?v=4&s=117" width="117">](https://github.com/kirstein) |[<img alt="mo-gr" src="https://avatars2.githubusercontent.com/u/95577?v=4&s=117" width="117">](https://github.com/mo-gr) |[<img alt="mortonfox" src="https://avatars1.githubusercontent.com/u/495892?v=4&s=117" width="117">](https://github.com/mortonfox) |[<img alt="cryptojuice" src="https://avatars1.githubusercontent.com/u/458883?v=4&s=117" width="117">](https://github.com/cryptojuice) |
:---: |:---: |:---: |:---: |:---: |:---: |
[mischkl](https://github.com/mischkl) |[michaelmov](https://github.com/michaelmov) |[kirstein](https://github.com/kirstein) |[mo-gr](https://github.com/mo-gr) |[mortonfox](https://github.com/mortonfox) |[cryptojuice](https://github.com/cryptojuice) |

[<img alt="nktssh" src="https://avatars1.githubusercontent.com/u/1872256?v=4&s=117" width="117">](https://github.com/nktssh) |[<img alt="olafahn" src="https://avatars3.githubusercontent.com/u/7765194?v=4&s=117" width="117">](https://github.com/olafahn) |[<img alt="olov" src="https://avatars1.githubusercontent.com/u/19247?v=4&s=117" width="117">](https://github.com/olov) |[<img alt="vorktanamobay" src="https://avatars2.githubusercontent.com/u/2623355?v=4&s=117" width="117">](https://github.com/vorktanamobay) |[<img alt="QuietHeartThinkingFar" src="https://avatars2.githubusercontent.com/u/13879579?v=4&s=117" width="117">](https://github.com/QuietHeartThinkingFar) |[<img alt="raphaelfruneaux" src="https://avatars3.githubusercontent.com/u/3259312?v=4&s=117" width="117">](https://github.com/raphaelfruneaux) |
:---: |:---: |:---: |:---: |:---: |:---: |
[nktssh](https://github.com/nktssh) |[olafahn](https://github.com/olafahn) |[olov](https://github.com/olov) |[vorktanamobay](https://github.com/vorktanamobay) |[QuietHeartThinkingFar](https://github.com/QuietHeartThinkingFar) |[raphaelfruneaux](https://github.com/raphaelfruneaux) |

[<img alt="sahat" src="https://avatars1.githubusercontent.com/u/544954?v=4&s=117" width="117">](https://github.com/sahat) |[<img alt="ganchiku" src="https://avatars1.githubusercontent.com/u/149973?v=4&s=117" width="117">](https://github.com/ganchiku) |[<img alt="kaneshin" src="https://avatars0.githubusercontent.com/u/936972?v=4&s=117" width="117">](https://github.com/kaneshin) |[<img alt="imaimiami" src="https://avatars1.githubusercontent.com/u/2256037?v=4&s=117" width="117">](https://github.com/imaimiami) |[<img alt="dooart" src="https://avatars3.githubusercontent.com/u/371426?v=4&s=117" width="117">](https://github.com/dooart) |[<img alt="thomastuts" src="https://avatars2.githubusercontent.com/u/1914255?v=4&s=117" width="117">](https://github.com/thomastuts) |
:---: |:---: |:---: |:---: |:---: |:---: |
[sahat](https://github.com/sahat) |[ganchiku](https://github.com/ganchiku) |[kaneshin](https://github.com/kaneshin) |[imaimiami](https://github.com/imaimiami) |[dooart](https://github.com/dooart) |[thomastuts](https://github.com/thomastuts) |

[<img alt="UrielMiranda" src="https://avatars2.githubusercontent.com/u/12901838?v=4&s=117" width="117">](https://github.com/UrielMiranda) |[<img alt="vkarampinis" src="https://avatars1.githubusercontent.com/u/330736?v=4&s=117" width="117">](https://github.com/vkarampinis) |[<img alt="grapswiz" src="https://avatars2.githubusercontent.com/u/309459?v=4&s=117" width="117">](https://github.com/grapswiz) |[<img alt="coderhaoxin" src="https://avatars2.githubusercontent.com/u/2569835?v=4&s=117" width="117">](https://github.com/coderhaoxin) |[<img alt="giantray" src="https://avatars1.githubusercontent.com/u/5054377?v=4&s=117" width="117">](https://github.com/giantray) |[<img alt="ntaoo" src="https://avatars2.githubusercontent.com/u/511213?v=4&s=117" width="117">](https://github.com/ntaoo) |
:---: |:---: |:---: |:---: |:---: |:---: |
[UrielMiranda](https://github.com/UrielMiranda) |[vkarampinis](https://github.com/vkarampinis) |[grapswiz](https://github.com/grapswiz) |[coderhaoxin](https://github.com/coderhaoxin) |[giantray](https://github.com/giantray) |[ntaoo](https://github.com/ntaoo) |

[<img alt="seyyah" src="https://avatars0.githubusercontent.com/u/263237?v=4&s=117" width="117">](https://github.com/seyyah) |[<img alt="dchest" src="https://avatars2.githubusercontent.com/u/52677?v=4&s=117" width="117">](https://github.com/dchest) |
:---: |:---: |
[seyyah](https://github.com/seyyah) |[dchest](https://github.com/dchest) |
