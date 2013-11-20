# Wprowadzenie

Celem tego style guide'a jest przedstawienie zbioru najlepszych praktyk i wytycznych dla aplikacji napisanych w AngularJS. Opisywane praktyki to zbiór:

0. Kodu źródłowego AngularJS
0. Kodu źródłowego lub artykułów, które przeczytałem
0. Własnego doświadczenia

**Uwaga**: to wciąż szkic style guide'a, jego przeznaczeniem jest to, aby był tworzony przez społeczność, tak więc uzupełnianie go, będzie docenione przez całą społeczność.

W tym style guidzie nie znajdziesz wytycznych do programowania w JavaScriptcie. Takowe znajdziesz tu:

0. [Style guide'y JavaScriptu od Google'a](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
0. [Style guide'y JavaScriptu od Mozilli](https://developer.mozilla.org/en-US/docs/Developer_Guide/Coding_Style)
0. [Style guide'y JavaScriptu od GitHuba](https://github.com/styleguide/javascript)
0. [Style guide'y JavaScriptu Douglasa Crockforda](http://javascript.crockford.com/code.html)

Do pisania kodu w AngularJS, zaleca się stosować do wytycznych przygotowanych przez [Google'a](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml).

Na stronach wiki projektu AngularJS na Githubie, istnieje podobna sekcja przygotowana przez [ProLoser](https://github.com/ProLoser), możesz się z nią zapoznać [tu](https://github.com/angular/angular.js/wiki).

# Spis treści
* [Ogólne](#ogólne)
  * [Struktura katalogów](#struktura-katalogów)
  * [Optymalizuj cykl `$digest`](#optymalizuj-cykl-digest)
  * [Inne](#inne)
* [Moduły](#moduły)
* [Kontrolery](#kontrolery)
* [Dyrektywy](#dyrektywy)
* [Filtry](#filtry)
* [Usługi](#usługi)
* [Szablony](#szablony)
* [Routing](#routing)
* [Testy](#testy)
* [Wsparcie](#wsparcie)

# Ogólne

## Struktura katalogów

Duże aplikacje napisane w AngularJS posiadają wiele komponentów, dlatego też najlepiej grupować je w katalogi. Istnieją dwa podejścia:

* Tworzenie katalogów wysokiego poziomu, w oparciu o podział na typy komponentów oraz niższego poziomu, w oparciu o podział na funkcjonalność.

W przypadku tego typu podziału, struktura naszego projektu będzie się kształtować następująco:

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

* Tworzenie katalogów wysokiego poziomu, w oparciu o podział na funkcjonalność oraz niższego poziomu, w oparciu o podział na typy komponentów.

Przykład struktury:

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

* W przypadku tworzenie dyrektywy, przydatnym jest umieszczenie wszystkich plików powiązanych z tworzoną dyrektywą (np. szablony, pliki CSS/SASS, pliki JS) w jednym folderze. Jeżeli wybierzesz ten styl struktury, bądź konsekwentny w całym projekcie.

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

Wyżej przedstawione podejście, może być wykorzystywane niezależnie od wybranej struktury projektu (jednej z powyższych).

* Istnieje niewielka różnica pomiędzy [ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home), a strukturami opisywanymi powyżej. W przypadku ng-boilerplate, wszystkie pliki związane z testami jednostkowymi trzymane są w tym samym katalogu, w którym znajduje się dany komponent. Dzięki temu, w przypadku konieczności dokonania zmian, łatwiej znaleźć testy powiązane z komponentem, testy również spełniają rolę dokumentacji oraz pokazują przykłady użycia danego komponentu.

        services
        ├── cache
        │   ├── cache1.js
        │   └── cache1.spec.js
        └── models
            ├── model1.js
            └── model1.spec.js

* Plik `app.js` zawiera ustawienia dotyczące routingu oraz konfigurację projektu.
* Każdy plik JS powinien zawierać tylko jeden komponent. Plik powinien być nazwany zgodnie z nazwą komponentu.
* Używaj Angularowej struktury szablonów takich, jak [Yeoman](http://yeoman.io), [ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home).

Preferuję pierwszą opisywaną przeze mnie strukturę, ponieważ dzięki niej, znalezienie komponentów jest prostsze.

Konwencje nazewnicze komponentów można znaleźć w każdej sekcji dot. komponentów.

## Optymalizuj cykl `$digest`

* Obserwuj jedynie najistotniejsze zmienne (np. gdy używasz komunikacji w czasie rzeczywistym, nie rób pętli `$digest` przy każdej odebranej wiadomości).
* Staraj się, aby wszelkie wykorzystania `$watch` były najprostsze, jak to tylko możliwe. Skomplikowane i wolne operacje wykonywane wewnątrz jednego `$watch` spowodują spowolnienie całej aplikacji (pętla `$digest` jest wykonywana w jednym wątku, ponieważ JavaScript jest jednowątkowy).

## Inne

* Używaj:
  * `$timeout` zamiast `setTimeout`,
  * `$window` zamiast `window`,
  * `$document` zamiast `document`,
  * `$http` zamiast `$.ajax`

Dzięki temu, testowanie kodu będzie prostsze i w niektórych przypadkach, uchroni przed nieprzewidzianymi zachowaniami (przykład: gdy zapomniałeś/aś o `$scope.$apply` w `setTimeout`).

* Zautomatyzuj swój cykl pracy używając narzędzi typu:
  * [Yeoman](http://yeoman.io)
  * [Grunt](http://gruntjs.com)
  * [Bower](http://bower.io)

* Używaj promises (`$q`) zamiast callbacków. Dzięki temu twój kod będzie bardziej czytelny i czystszy, oraz uchroni cię przed piekłem callbacków.
* Używaj `$resource` zamiast `$http` kiedy to tylko możliwe. Wyższy poziom abstrakcji uchroni cię przed nadmiarem kodu.
* Nie zaśmiecaj `$scope`. Dodawaj tylko te funkcje i zmienne, których używasz w szablonach.
* Preferuj używanie [kontrolerów zamiast `ngInit`](https://github.com/angular/angular.js/pull/4366/files). Jedyne prawidłowe użycie `ngInit` jest wtedy, gdy chcesz nadać alias specjalnym właściwościom `ngRepeat`. Poza tym, powinieneś/powinnaś używać kontrolerów, a nie `ngInit`, aby zainicjować wartości scope'a.
* Nie używaj przedrostka `$` dla nazw zmiennych, właściwości oraz metod. Ten przedrostek jest zarezerwowany jedynie do użytku przez AngularJS.

# Moduły

Istnieją dwa najpopularniejsze sposoby na strukturyzowanie modułów:

0. Ze względu na funkcjonalność
0. Ze względu na typ komponentu

Obecnie nie ma dużej różnicy, jednak pierwsze rozwiązanie jest czystsze. Dodatkowo, jeżeli opóźnione ładowanie modułów jest zaimplementowane (obecnie nie jest w planach AngularJS), poprawi to wydajność aplikacji.

# Kontrolery

* Nie manipuluj DOMem wewnątrz kontrolerów, spowoduje to, że kontrolery będą trudniejsze w testowaniu oraz złamie [zasadę SoC](https://en.wikipedia.org/wiki/Separation_of_concerns). Używaj do tego celu dyrektyw.
* Nazewnictwo kontrolerów bazuje na funkcjonalności kontrolera (np. koszyk, strona główna, panel administracyjny) oraz przyrostka `Ctrl`. Kontrolery powinny być nazywane UpperCamelCasem (`HomePageCtrl`, `ShoppingCartCtrl`, `AdminPanelCtrl`, itd.).
* Kontrolery nie powinny być definiowane globalnie (mimo, że AngularJS na to pozwala, zanieczyszczanie globalnej przestrzeni nazw jest złą praktyką).
* Używaj tablicy, aby zdefiniować kontrolery:

````javascript
module.controller('MyCtrl', ['dependency1', 'dependency2', ..., 'dependencyn', function (dependency1, dependency2, ..., dependencyn) {
  //...body
}]);
````

Używanie tego typu deklarowania kontrolerów rozwiązuje problemy z minifikowaniem kodu. Możesz dynamicznie tworzyć tablice zależności, używając do tego narzędziu typu [ng-annotate](https://github.com/olov/ng-annotate) lub zadania grunta [grunt-ng-annotate](https://github.com/mzgol/grunt-ng-annotate).
* Używaj oryginalnych nazw w zależnościach kontrolera. Dzięki temu, kod będzie bardziej czytelny.

````javascript
module.controller('MyCtrl', ['$scope', function (s) {
  //...body
}]);
````

jest mniej czytelne niż:

````javascript
module.controller('MyCtrl', ['$scope', function ($scope) {
  //...body
}]);
````

Powyższa zasada pomaga przede wszystkim w plikach, które są dłuższe i żeby zobaczyć listę zależności, musisz przewijać ekran do góry. Przy okazji, stosowanie pełnych nazw zależności, uchroni przed zapomnieniem, czym jest dana zmienna.

* Twórz kontrolery tak małe, jak to tylko możliwe. Przenieś wiele razy używane funkcje do usług.
* Komunikuj się pomiędzy różnymi kontrolerami stosując metodę inwokacji (przykładowo, gdy dzieci chcą się skomunikować z rodzicem) lub metodami takimi, jak: `$emit`, $broadcast` oraz `$on`. Emitowane oraz nadwane wiadomości powinne być ograniczone do minimum.
* Stwórz spis wszystkich wiadomości emitowanych (`$emit`) lub nadawanych (`$broadcast`) w aplikacji, aby uniknąć zduplikowanych nazw i możliwych błędów.
* Jeżeli musisz formatować dane w jakikolwiek sposób, przenieś logikę do [filtra](#filtry) i zadeklaruj go, jako zależność dla danego kontrolera:

````javascript
module.filter('myFormat', function () {
  return function () {
    //...body
  };
});

module.controller('MyCtrl', ['$scope', 'myFormatFilter', function ($scope, myFormatFilter) {
  //...body
}]);
````

# Dyrektywy

* Nazywaj dyrektywy stosujać lowerCamelCase'a.
* Używaj `scope` zamiast `$scope` wewnątrz funkcji `link`. Podczas kompilacji, `post`/`pre` łączy funkcje, które dotychczas zdefiniowałeś i argumenty zostaną przekazane, kiedy funkcja jest wywoływana. Argumenty te, nie mogą zostać zmienione używając Dependency Injection. Ta technika wykorzystywana jest również w kodzie źródłowym AngularJS.
* Używaj własnych przedrostków dla swoich dyrektyw, aby uniknąć konfliktów z zewnętrznymi bibliotekami.
* Nie używaj przedrostków `ng` oraz `ui`, ponieważ są one zarezerwowane jedynie dla AngularJS oraz AngularJS UI.
* Manipulacja DOMem dozwolona jest jedynie poprzez dyrektywy.
* Twórz odizolowany zakres, gdy tworzysz komponenty wielokrotnego użytku.
* Używaj dyrektyw jako atrybuty lub elementy zamiast komentarzy i klas. Sprawi to, że kod będzie bardziej czytelny.
* Używaj `$scope.$on('$destroy', fn)` do "sprzątania". Przydaje się to w szczególności, gdy opakowujesz zewnętrzną bibliotekę w dyrektywę.
* Nie zapomnij użyć `$sce` w przypadku, gdy masz do czynienia z niezaufanymi treściami.

# Filtry

* Używaj lowerCamelCase'a do nazywania swoich filtrów.
* Filtry powinny być tak proste, jak to tylko możliwe. Często są one wywoływane podczas pętli `$digest`, tak więc tworzenie filtrów, które działają wolno, spowolni działanie całej aplikacji.

# Usługi

* Używaj camelCase'a (lower lub Upper) do nazywania swoich usług.
* Hermetyzuj logikę biznesową w usługach.
* Usługi hermetyzujące logikę biznesową są komponentem typu `service`, a nie `factory`.
* Do cache'owania na poziomie sesji używaj `$cacheFactory`. Powinno się tego używać do cache'owania wyników zapytań oraz dużych obliczeń.

# Szablony

* Używaj atrybutów `ng-bind` oraz `ng-cloak` zamiast zwykłego `{{ }}`, aby uniknąć migającej strony podczas ładowania.
* Unikaj pisania skomplikowanego kodu wewnątrz szablonów.
* Jeżeli musisz ładować obrazek dynamicznie, używaj atrybutu `ng-src` zamiast `src` z wartością `{{ }}`.
* Zamiast używania zmiennej w zakresie jako tekst i używania jej jako wartości atrybutu `style` w szablonie z `{{ }}`, używaj dyrektywy `ng-style`, która przyjmuje parametry w postaci obiektu z zakresu z wartościami, przykład:

````javascript
$scope.divStyle = {
  width: 200;
  position: relative;
}
````
````html
<div ng-style="divStyle">mój pięknie ostylowany div, który będzie działać w IE</div>
````

# Routing

* Używaj `resolve`, aby rozwiązać problemy z zależnościami zanim widok jest wyświetlony.

# Testy

Wkrótce...

# Wsparcie

Celem tego style guide'a jest to, aby był rozwijany przez społeczność, w związku z tym, wszelkie próby udzielenia się są wskazane.

Przykładowo, możesz pomóc opisując sekcję dotyczącą testów oraz tłumacząc ten style guide na swój język.
