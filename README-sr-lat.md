#Uvod

Cilj ovog "style guide" vodiča je da predstavi set najboljih praksi i smernica za jednu AngularJS aplikaciju.
Ove najbolje prakse su prikupljene od:

0. AngularJS izvornog koda
0. Iyvornog koda ili članaka koje sam pročitao 
0. Ličnog iskustva

**Nota**: ovo je još uvek radna verzija, njen glavni cilj je da bude "community-driven" zato ispunjavanje praznina će biti veoma cenjeno od strane cele zajednice.

U ovom vodiču nećete naće uobičajene preporuke za JavaScript programiranje. Takve se mogu naći na:

0. [Google's JavaScript style guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
0. [Mozilla's JavaScript style guide](https://developer.mozilla.org/en-US/docs/Developer_Guide/Coding_Style)
0. [GitHub's JavaScript style guide](https://github.com/styleguide/javascript)
0. [Douglas Crockford's JavaScript style guide](http://javascript.crockford.com/code.html)

Za AngularJS razvoj preporučen je [Google's JavaScript style guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml).

Na AngularJS's GitHub wiki-u postoji slična sekcija od [ProLoser](https://github.com/ProLoser), možete je naći na [here](https://github.com/angular/angular.js/wiki).

#Sadržaj
* [Uopšteno](#uopšteno)
    * [Struktura Direktorijuma](#struktura-direktorijuma)
    * [Optimizuj ciklus obrade](#optimizuj-ciklus-obrade)
    * [Ostalo](#ostalo)
* [Moduli](#moduli)
* [Kontroleri](#kontroleri)
* [Direktive](#direktive)
* [Filteri](#filteri)
* [Servisi](#servisi)
* [Šabloni](#šabloni)
* [Rutiranje](#rutiranje)

#Uopšteno

## Struktura Direktorijuma

Kako velike AngularJS aplikacije imaju mnogo komponenti najbolje je da se iste organizuju u strukturi direktorijuma.
Postoje dva pristupa:

* Kreiranje primarnog grupisanja prema tipu komponente a zatim sekundarno grupisanje prema funkcionalnosti.

U ovom slučaju struktura direktorijuma bi izgledala ovako:

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

* Kreiranje primarnog grupisanja prema funkcionalnosti a zatim sekundarno grupisanje prema tipu komponente.

Ovde je nje raspored:

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

* Kada kreirate direktivu može biti korisno da se stave sve povezane datoteke sa datom direktivom (n.p. šabloni, CSS/SASS datoteke, JavaScript) u jedan direktorijum. Ako izaberete ovaj stil budite kozistentni i koristite ga svuda u vašem projektu.

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

Ovaj pristup se moze kombinovati sa obe verzije gornje strukture direktorijuma.
* Još jedna blaga varijacija na obe strukture direktorijuma je ona korišćena u [ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home). U njoj "unit" testovi za datu komponentu se nalaze u istom direktorijumu kao i sama komponenta. Na ovaj način kada napravite neku promenu u datoj komponenti lakše je naći odgovarajuće testove, testovi takođe služe kao dokumentacija i prikazuju "uses cases".

        services
        ├── cache
        │   ├── cache1.js
        │   └── cache1.spec.js
        └── models
            ├── model1.js
            └── model1.spec.js

* Datoteka `app.js` sadrži definiciju ruta, konfiguraciju i/ili "manual bootstrap" (ukoliko je neophodan).
* Svaka JavaScript datoteka trebalo bi da sadrži samo jednu komponentu. Datoteka bi trebalo da bude imenovana prema imenu komponente.
* Koristi šablon strukture Angular projekta kao [Yeoman](http://yeoman.io), [ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home).

Ja više preferiram prvu strukturu jer omogućava lakse pronalaženje uobičajenih komponenti.

Konvencije oko imenovanje komponenti se mogu naći u svakoj sekciji koja opisuje datu komponentu.

## Optimizuj ciklus obrade

* Posmatraj samo najznačajnije promenjive (na primer: kada se koristi "real-time" komunikacije, ne pozivaj petlju obrade u svakoj primljenoj poruci).
* Pravi proračune u `$watch` što je moguće jednostavnijim. Postavljanje zahtevne i spore kalkulacije u jednom `$watch` će usporiti celokupnu aplikaciju ($digest petlja se izvršava u jednoj niti iz razloga "single-threaded" prirode JavaScript-a).

## Ostalo

* Koristi:
    * `$timeout` umesto `setTimeout`
    * `$window` umesto `window`
    * `$document` umesto `document`
    * `$http` umesto `$.ajax`

Ovo će učiniti testiranje mnogo lakšim a u nekim slučajevima i preduprediti neočekivano ponašanje (na primer, ako ste propustili `$scope.$apply` u `setTimeout`).

* Automatizujte vaš proces rada koristeći alate kao što su:
    * [Yeoman](http://yeoman.io)
    * [Grunt](http://gruntjs.com)
    * [Bower](http://bower.io)

* Koristite "promises" (`$q`) umesto "callbacks". Ovo će učiniti da vaš kod izgleda elegantnije, i sačuvaće vas on "callback" pakla.
* Koristite `$resource` umesto `$http` kad god je to moguće. Viši nivo abstrakcije spašava vas od nepotrebnog viška.
* Koristite AngularJS pre-minifier (like [ngmin](https://github.com/btford/ngmin) ili [ng-annotate](https://github.com/olov/ng-annotate)) kao prevenciju problema posle "minification".
* Ne koristite globalne promenjive. Razrešite sve zavisnosti koristeći "Dependency Injection".
* Ne zagađujte vas `$scope`. Dodajte samo one funkcije ili promenjive koje se koriste unutar datog šablona.
* Koristite kontrolere umesto `ngInit`.

#Moduli

Postoje dva uobičajena načina da se struktuiraju moduli:

0. Prema funkcionalnosti
0. Prema tipu komponente

Trenutno nema veće razlike, ali prvi način izgleda urednije. Takođe, ako "lazy-loading" moduli su implementirani (trenutno nisu u AngularJS planu razvoja), to će poboljšati performance applikacije.

#Kontroleri

* Ne menjajte DOM u vašim kontrolerima. Umesto toga koristite direktive.
* Imenovanje kontrolera se vrši prema njegovoj funkcionalnosti (na primer: shopping cart, homepage, admin panel) i dodatka `Ctrl` na kraju imena. Imena kontrolera su zapiasna u "UpperCamelCase" formatu (`HomePageCtrl`, `ShoppingCartCtrl`, `AdminPanelCtrl`, itd.).
* Kontroleri ne bi trebalo da budu definisani kao globalni (be obzira što AngularJS to dozvoljava, loša je praksa da se zagadi global "namespace").
* Koristi syntaksu niza u definiciji kontrolera:



        module.controller('MyCtrl', ['dependency1', 'dependency2', ..., 'dependencyn', function (dependency1, dependency2, ..., dependencyn) {
          //...body
        }]);


Korišćenje ovog tipa definicija izbegava probleme sa "minification". Možete automatski generisati niz definicija od jedne standardne koristeći alate kao što su [ng-annotate](https://github.com/olov/ng-annotate) (i grunt task  [grunt-ng-annotate](https://github.com/mzgol/grunt-ng-annotate)).
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
* When you need to set the `src` of an image dynamically use `ng-src` instead of `src` with `{{}}` template.
* Instead of using scope variable as string and using it with `style` attribute with `{{ }}`, use the directive `ng-style` with object-like parameters and scope variables as values:

        ...
        $scope.divStyle = {
          width: 200,
          position: relative
        };
        ...

        <div ng-style="divStyle">my beautifully styled div which will work in IE</div>;

#Routing

* Use `resolve` to resolve dependencies before the view is shown.
