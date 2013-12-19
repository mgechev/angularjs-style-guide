#Uvod

Cilj ovog "style guide" vodiča je da predstavi set najboljih praksi i smernica za jednu AngularJS aplikaciju.
Ove najbolje prakse su prikupljene od:

0. AngularJS izvornog koda
0. Izvornog koda ili članaka koje sam pročitao 
0. Ličnog iskustva

**Nota**: ovo je još uvek radna verzija, njen glavni cilj je da bude "community-driven" zato ispunjavanje praznina će biti veoma cenjeno od strane cele zajednice.

U ovom vodiču nećete naći uobičajene preporuke za JavaScript programiranje. Takve se mogu naći na:

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

Ovde je njen raspored:

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

* Posmatraj samo najznačajnije promenjive (na primer: kada se koristi "real-time" komunikacija, ne pozivaj petlju obrade u svakoj primljenoj poruci).
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

* Koristite "promises" (`$q`) umesto "callbacks". Ovo će učiniti da vaš kod izgleda elegantnije, i sačuvaće vas od "callback" pakla.
* Koristite `$resource` umesto `$http` kad god je to moguće. Viši nivo abstrakcije spašava vas od nepotrebnog viška.
* Koristite AngularJS "pre-minifier" (like [ngmin](https://github.com/btford/ngmin) ili [ng-annotate](https://github.com/olov/ng-annotate)) kao prevenciju problema posle "minification".
* Ne koristite globalne promenjive. Razrešite sve zavisnosti koristeći "Dependency Injection".
* Ne zagađujte vaš `$scope`. Dodajte samo one funkcije ili promenjive koje se koriste unutar datog šablona.
* Koristite kontrolere umesto `ngInit`.

#Moduli

Postoje dva uobičajena načina da se struktuiraju moduli:

0. Prema funkcionalnosti
0. Prema tipu komponente

Trenutno nema veće razlike, ali prvi način izgleda urednije. Takođe, ako "lazy-loading" moduli su implementirani (trenutno nisu u AngularJS planu razvoja), to će poboljšati performanse applikacije.

#Kontroleri

* Ne menjajte DOM u vašim kontrolerima. Umesto toga koristite direktive.
* Imenovanje kontrolera se vrši prema njegovoj funkcionalnosti (na primer: shopping cart, homepage, admin panel) i dodatka `Ctrl` na kraju imena. Imena kontrolera su zapiasna u "UpperCamelCase" formatu (`HomePageCtrl`, `ShoppingCartCtrl`, `AdminPanelCtrl`, itd.).
* Kontroleri ne bi trebalo da budu definisani kao globalni (bez obzira što AngularJS to dozvoljava, loša je praksa da se zagadi global "namespace").
* Koristi syntaksu niza u definiciji kontrolera:



        module.controller('MyCtrl', ['dependency1', 'dependency2', ..., 'dependencyn', function (dependency1, dependency2, ..., dependencyn) {
          //...body
        }]);


Korišćenje ovog tipa definicija izbegava probleme sa "minification". Možete automatski generisati niz definicija od jedne standardne koristeći alate kao što su [ng-annotate](https://github.com/olov/ng-annotate) (i grunt zadatak [grunt-ng-annotate](https://github.com/mzgol/grunt-ng-annotate)).
* Koristite originalne nazive zavisnosti kontrolera. Ovo će vam pomoći da proizvedete čitljiviji kod:



        module.controller('MyCtrl', ['$scope', function (s) {
          //...body
        }]);


je manje čitljivo od:


        module.controller('MyCtrl', ['$scope', function ($scope) {
          //...body
        }]);


Ovo je posebno primenjivo na datoteku koja ima toliko koda da ćete morati da se vertikalno krećete kroz isti. Ovo će najverovatnije dovesti do toga da zaboravite koja je promenjiva vezana za koju zavisnost.

* Kreirajte što je moguće "tanje" kontrolere. Abstraktujte često korišćene funkcije u servis.
* Komunicirajte unutar različitih kontorlera korišćenjem pozivanjem metoda (moguće kada deca žele da komuniciraju sa roditeljima) ili `$emit`, `$broadcast` i `$on` metode. "Emitted" i "broadcasted" poruke treba držati na minimumu.
* Napravite listu svih poruka koje se prenose korišćenjem `$emit`, `$broadcast` i pažljivo ih održavajte iz razloga kolizije naziva i mogućih grešaka.
* Kada je potrebno da formatirate podatke enkapsulirajte logiku formatiranja unutar [filtera](#filteri) i deklarišite ih kao zavisnost:


        module.filter('myFormat', function () {
          return function () {
            //body...
          };
        });

        module.controller('MyCtrl', ['$scope', 'myFormatFilter', function ($scope, myFormatFilter) {
          //body...
        }]);

#Direktive

* Imenujte svoje direktive koristeći "lowerCamelCase"
* Koristite `scope` umesto `$scope` u vašoj "link" funkciji. U "compile", post/pre "link" funkcijama već ste definisali argumente koji će biti prosleđeni prilikom poziva funkcije, nećete moći da ih promenite koristeći DI (Dependency Injection). Ovaj stil je takođe korišćen unutar AngularJS izvornog koda.
* Koristite "custom" prefikse za vaše direktive da bi sprečili koliziju imena sa tuđim bibljotekama.
* Nemojte koristiti `ng` ili `ui` prefikse jer su ovi rezervisani za AngularJS i AngularJS UI upotrebu.
* DOM manipulacije moraju biti izvršene samo kroz direktive.
* Kreirajte izlovoano područje kada razvijate komponente za višestruku upotrebu.

#Filteri

* Imenujte vaše filtere koristeći "lowerCamelCase"
* Kreirajte vaše filtere što je moguće "lakšim". Oni se zovu često tokom `$digest` petlje pa kreiranje sporih filtera će usporiti vašu aplikaciju.

#Servisi

* Koristite "camelCase (lower or upper)" za nazive vaših servisa.
* Enkapsulirajte biznis logiku unutar servisa.
* Servisi koji uokviruju biznis logiku su poželjno `service` umesto `factory`
* Za "session-level" keš možete koristiti `$cacheFactory`. Ovo bi trebalo koristiti za keširanje rezultata zahteva ili kompleksnih proračuna.

#Šabloni

* Koristite `ng-bind` ili `ng-cloak` umesto prostog `{{ }}` da bi sprečili treptanje sadržaja.
* Izbegavajte pisanje kompleksnog koda unutar šablona.
* Kada je potrebno da dinamički postavitre `src` slike koristite `ng-src` umesto `src` sa `{{}}` šablonom.
* Umesto korišćenja "scope" promenjive kao tekst i koristiti ga sa `style` atributom sa `{{ }}`, koristite direktivu `ng-style` sa "object-like" parametrima i "scope" promenjive kao vrednosti:

        ...
        $scope.divStyle = {
          width: 200,
          position: 'relative'
        };
        ...

        <div ng-style="divStyle">my beautifully styled div which will work in IE</div>;

#Rutiranje

* Koristite `resolve` da razložite zavisnosti pre nego se prikaže "view".
