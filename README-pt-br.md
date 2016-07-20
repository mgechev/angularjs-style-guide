[![Join the chat at https://gitter.im/mgechev/angularjs-style-guide](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/mgechev/angularjs-style-guide?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# Introdução

O objetivo deste guia é apresentar um conjunto de boas práticas e diretrizes para uma aplicação AngularJS. Essas boas práticas são baseadas em:

0. Código fonte do AngularJS
0. Códigos fonte ou artigos que li
0. Própria experiência

**Nota 1**: Este guia ainda é um rascunho, seu objetivo principal é ser construído pela comunidade, então ao contribuir você será muito apreciado por toda ela.

**Nota 2**: Antes de seguir qualquer das diretrizes nas traduções do documento original, verifique se a mesma está atualizada. 

Neste guia você **não** irá encontrar diretrizes para desenvolvimento JavaScript. O que pode ser encontrado em:

0. [Guia JavaScript - Google](https://google.github.io/styleguide/javascriptguide.xml)
0. [Guia JavaScript - Mozilla](https://developer.mozilla.org/en-US/docs/Developer_Guide/Coding_Style)
0. [Guia JavaScript - Douglas Crockford](http://javascript.crockford.com/code.html)
0. [Guia Javascript - Airbnb](https://github.com/airbnb/javascript)
0. [Guia Javascript - Idiomatic](https://github.com/rwaldron/idiomatic.js/)

Para o desenvolvimento usando o AngularJS é recomendado o [Guia JavaScript Google](https://google.github.io/styleguide/javascriptguide.xml).

Na wiki do AngularJS no Github tem uma seção similar feita pelo [ProLoser](https://github.com/ProLoser), você pode vê-la [aqui](https://github.com/angular/angular.js/wiki).

# Traduções

- [Alemão](https://github.com/mgechev/angularjs-style-guide/blob/master/README-de-de.md)
- [Espanhol](https://github.com/mgechev/angularjs-style-guide/blob/master/README-es-es.md)
- [Francês](https://github.com/mgechev/angularjs-style-guide/blob/master/README-fr-fr.md)
- [Indonésio](https://github.com/mgechev/angularjs-style-guide/blob/master/README-id-id.md)
- [Italiano](https://github.com/mgechev/angularjs-style-guide/blob/master/README-it-it.md)
- [Japonês](https://github.com/mgechev/angularjs-style-guide/blob/master/README-ja-jp.md)
- [Coreano](https://github.com/mgechev/angularjs-style-guide/blob/master/README-ko-kr.md)
- [Polonês](https://github.com/mgechev/angularjs-style-guide/blob/master/README-pl-pl.md)
- [Português](https://github.com/mgechev/angularjs-style-guide/blob/master/README-pt-br.md)
- [Russo](https://github.com/mgechev/angularjs-style-guide/blob/master/README-ru-ru.md)
- [Sérvio](https://github.com/mgechev/angularjs-style-guide/blob/master/README-sr.md)
- [Sérvio lat](https://github.com/mgechev/angularjs-style-guide/blob/master/README-sr-lat.md)
- [Chinês](https://github.com/mgechev/angularjs-style-guide/blob/master/README-zh-cn.md)
- [Turco](https://github.com/mgechev/angularjs-style-guide/blob/master/README-tr-tr.md)

# Índice
* [Geral](#geral)
    * [Estrutura de Diretório](#estrutura-de-diretorio)
    * [Markup](#markup) 
    * [Convenções de nomenclatura](#convencoes-de-nomenclatura)
    * [Outros](#outros)
* [Módulos](#modulos)
* [Controladores](#controladores)
* [Diretivas](#diretivas)
* [Filtros](#filtros)
* [Serviços](#serviços)
* [Templates](#templates)
* [Roteamento](#roteamento)
* [E2E Testing](#e2e-testing)
* [i18n](#i18n)
* [Performance](#performance)
* [Contribuições](#contribuicoes)
* [Contribuidores](#contribuidores)

# Geral

## Estrutura de Diretório

Uma vez que uma grande aplicação AngularJS tem muitos componentes, é melhor estruturá-la em uma hierarquia de diretórios. 
Há duas abordagens:

* Criando uma divisão alto nível por tipos de componentes e uma divisão baixo nível por funcionalidade.

Desta maneira a estrutura do diretório irá se parecer com:

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

* Criando uma divisão alto nível por funcionalidade e baixo nível por tipos de componentes.

Abaixo o modelo:

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

* Caso o nome do diretório tenha várias palavras, use a sintaxe lisp:

```
app
 ├── app.js
 └── my-complex-module
     ├── controllers
     ├── directives
     ├── filters
     └── services
```

* Coloque todos os arquivos associados com a diretiva (ex: templates, arquivos CSS/SASS, JavaScript) em uma única pasta. Se você optar por usar este estilo consistente, faça o mesmo uso em todos os lugares do seu projeto.

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

Esta abordagem pode ser combinada com ambas as estruturas de diretórios acima.
* Os testes unitários para um determinado componente (`*.spec.js`) deve estar localizado no diretório do componente. Dessa forma, quando você faz alterações em um determinado componente será fácil encontrar encontrando seu teste. Os testes também atuam como documentação e casos de uso.

```
services
├── cache
│   ├── cache1.js
│   └── cache1.spec.js
└── models
    ├── model1.js
    └── model1.spec.js
```

* O arquivo `app.js` contém definição de rotas, configurações e/ou inicializações manuais (se necessário).
* Cada arquivo JavaScript deve conter **apenas um componente**. O arquivo deve ser nomeado com o nome do componente.
* Use as estruturas do projeto AngularJS como [Yeoman](http://yeoman.io), [ng-boilerplate](http://ngbp.github.io/ngbp/#/home).

Convenções sobre nomenclaturas de componentes podem ser encontradas em cada seção do componente.

## Markup

[TLDR;](http://developer.yahoo.com/blogs/ydn/high-performance-sites-rule-6-move-scripts-bottom-7200.html) Coloque os scripts na parte inferior do documento.

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

Mantenha as coisas simples e coloque as diretivas específicas do AngularJS após atributos padrões. Isto tornará mais fácil avaliar seu código e irá torná-lo mais fácil de manter, porque seus atributos são consistentemente agrupados e posicionados.

```html
<form class="frm" ng-submit="login.authenticate()">
  <div>
    <input class="ipt" type="text" placeholder="name" require ng-model="user.name">
  </div>
</form>
```

Outros atributos HTML devem seguir o Code Guide's [recomendação](http://mdo.github.io/code-guide/#html-attribute-order)

## Convenções de nomenclatura
A tabela a seguir mostra as convenções de nomenclatura para cada elemento:

Elemento | Nomenclatura | Exemplo | Uso
----|------|----|--------
Modules | lowerCamelCase  | angularApp |
Controllers | Funcionalidade + 'Ctrl'  | AdminCtrl |
Directives | lowerCamelCase  | userInfo |
Filters | lowerCamelCase | userFilter |
Services | UpperCamelCase | User | constructor
Factories | lowerCamelCase | dataFactory | others

## Outros

* Use:
    * `$timeout` ao invés de `setTimeout`
    * `$interval` ao invés de `setInterval`
    * `$window` ao invés de `window`
    * `$document` ao invés de `document`
    * `$http` ao invés de `$.ajax`
    * `$location` ao invés de `window.location` ou `$window.location` 
    * `$cookies` ao invés de `document.cookie`

Seus testes serão mais fáceis e em alguns casos irá prevenir comportamentos inesperados (por exemplo, se você perder `$scope.$apply` em `setTimeout`).

* Automatize seu fluxo de trabalho utilizando ferramentas como:
    * [NPM](https://www.npmjs.com/)
    * [Grunt](http://gruntjs.com)
    * [Gulp](http://gulpjs.com)
    * [Yeoman](http://yeoman.io)
    * [Bower](http://bower.io)

* Use (`$q`) ao invés de callbacks. Isso tornará seu código mais elegante e limpo, e o salvará do inferno de callbacks.
* Use `$resource` ao invés de `$http` quando possível. Um alto nível de abstração irá lhe salvar de redundância.
* Use um pré-minificador AngularJS (como [ngmin](https://github.com/btford/ngmin) ou [ng-annotate](https://github.com/olov/ng-annotate)) para prevenir problemas depois da minificação.
* Não use globals. Resolva todas as dependências usando Injeção de Depedências, isso impedirá erros e monkey patching ao testar.
* Evite globals usando Grunt/Gulp para amarrar seu código em Immediately Invoked Function Expression (IIFE). Você pode usar plugins como [grunt-wrap](https://www.npmjs.com/package/grunt-wrap) ou [gulp-wrap]( https://www.npmjs.com/package/gulp-wrap/) para esta finalidade . Exemplo (usando Gulp):

    ```Javascript
    gulp.src("./src/*.js")
        .pipe(wrap('(function(){\n"use strict";\n<%= contents %>\n})();'))
        .pipe(gulp.dest("./dist"));
    ```
* Não polua seu `$scope`. Somente adicione funções e variáveis que irão ser usadas nos templates.
* Prefira o uso de [controllers ao invés de `ngInit`](https://github.com/angular/angular.js/commit/010d9b6853a9d2718b095e4c017c9bd5f135e0b0). Existem apenas alguns usos apropriados de ngInit, como por exemplo aliasing para propriedades especiais de ngRepeat, e para a injeção de dados através de scripts do lado do servidor. Além desses poucos casos, você deve usar os controladores em vez de ngInit para inicializar valores em um escopo. A expressão passada para `ngInit` deve ser através de lexing, análise e avaliação por parte do interpretador implementado dentro do serviço do `$parse`. Isto leva a:
    - Impacto no desempenho, porque o interpretador é implementado em JavaScript.
    - O armazenamento em cache das expressões analisadas ​​dentro do serviço do `$parse` não faz muito sentido na maioria dos casos, uma vez que as expressões `ngInit` muitas vezes são avaliados apenas uma vez.
    - É propenso a erros, uma vez que você está escrevendo strings dentro de seus templates, não há destaque de sintaxe e um maior suporte por parte do seu editor
    - Erros em tempo de execução não são gerados.
* Não use o prefixo `$` para os nomes de variáveis, propriedades e métodos. Este prefixo é reservado para uso AngularJS.
* Não use `JQUERY` dentro de sua aplicação, se for preciso, usar `JQLite` ao invés de `angular.element`.
* Quando resolver dependências através do mecanismo de DI no AngularJS, classificar as dependências de seu tipo - o built-in AngularJS dependências deve ser o primeiro, seguido por seus entes personalizados:

```javascript
module.factory('Service', function ($rootScope, $timeout, MyCustomDependency1, MyCustomDependency2) {
  return {
    //Something
  };
});
```

# Módulos

* Módulos devem ser nomeados com lowerCamelCase. Para indicar que o módulo `B` é sub-módulo de `a`, você pode aninhar-los usando namespacing como: `a.b`.

    Há duas maneiras comuns para a estruturação de módulos:

    0. Por funcionalidade
    0. Por tipo de componente

    Atualmente não há uma grande diferença, mas a primeira maneira parece ser mais clara. Além disso, se os módulos lazy-loading for implementado (atualmente não há suporte no Angular JS), ele irá melhorar o desempenho do aplicativo.

# Controladores

* Não manipule DOM em seus controllers, isso fará com que os controllers sejam mais dificeis para testar e violará a [Separação de interesses](https://en.wikipedia.org/wiki/Separation_of_concerns). Use diretivas para isso.
* A nomenclatura do controller é dada pela sua funcionalidade (por exemplo *shopping cart*, *homepage*, *admin panel*) e o adicional `Ctrl` no final. 
* Controllers são javascript puros [construtores](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor), serão nomeados através de UpperCamelCase (`HomePageCtrl`, `ShoppingCartCtrl`, `AdminPanelCtrl`, etc.).
* Os controladores não devem ser definidos como globais (embora o AngularJS permita isso, entretanto isso é uma má prática poluindo o namespace global).
* Use a sintaxe a seguir para definir controllers:

  ```JavaScript
  function MyCtrl(dependency1, dependency2, ..., dependencyn) {
    // ...
  }
  module.controller('MyCtrl', MyCtrl);
  ```

   A fim de evitar problemas com minificação, você pode gerar automaticamente a sintaxe de definição de array a partir de um padrão usando ferramentas como [ng-annotate](https://github.com/olov/ng-annotate) (e grunt task [grunt-ng-annotate](https://github.com/mzgol/grunt-ng-annotate)).

   Outra alternativa é usar o `$inject`:

   ```JavaScript
  angular
    .module('app')
    .controller('Homepage', Homepage);

  Homepage.$inject = ['$log', '$http', 'ngRoute'];

  function Homepage($log, $http, ngRoute) {
    // ...
  }
  ```

* Evite usar o serviço `$scope` para definir funções e propriedades como parte dos controllers. Use `$scope` somente se necessário:
    0. Para publicar e assinar eventos: `$scope.$emit`, `$scope.$broadcast`, e `$scope.$on`.
    0. Para valores ou coleções _watch_: `$scope.$watch`, `$scope.$watchCollection`
    
* Prefira usar a sintaxe `controller as` e capture com `this` usando a variavel:

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
    //a clearer visual connection on how is defined on the view
    vm.title = 'Some title';
    vm.description = 'Some description';

    $http.get('/api/main/things').then(function (response) {
        vm.things = response.data.things; // Adding 'things' as a property of the controller
    });
  }
  ```

   Evite usar a palavra-chave `this` repetidamente dentro do controller:

  ```JavaScript
    app.controller('MainCtrl', MainCtrl);
    MainCtrl.$inject = ['$http'];

    // Avoid
    function MainCtrl ($http) {
      this.title = 'Some title';
      this.description = 'Some description';

      $http.get('/api/main/things').then(function (response) {
          // Warning! 'this' is in a different context here.
          // The property will not be added as part of the controller context
          this.things = response.data.things;
      });
    }
    ```

   É preferivel usar o nome da variavel pequena e consistente, por exemplo `vm`.
    Os principais beneficios de usar essa sintaxe:
   * Cria um componente isolado - propriedades vinculadas não fazem parte da cadeia do `$scope`. Essa é uma boa prática apesar de alguns inconvenientes da herança do `$scope` (essa é provavelmente a razão pela qual ele foi removido no Angular 2):
      * É difícil controlar a origem dos dados.
      * Alterações de valor do escopo podem afetar a lugares que você não tinha a intenção de afetar.
      * Refatorar torna-se mais complicado.
      * A '[regra ponto](http://jimhoskins.com/2012/12/14/nested-scopes-in-angularjs.html)'.

* Se estiver usando a sintaxe de definição de array, use os nomes originais das dependências do controller. Isso irá ajudá-lo a produzir um código mais legível:

  ```JavaScript
  function MyCtrl(l, h) {
    // ...
  }

  module.controller('MyCtrl', ['$log', '$http', MyCtrl]);
  ```

   which is less readable than:

  ```JavaScript
  function MyCtrl($log, $http) {
    // ...
  }

  module.controller('MyCtrl', ['$log', '$http', MyCtrl]);
  ```

   Isso se aplica especialmente para um arquivo que tem muito código que você precisa percorrer. Isto, eventualmente, pode causar que você esqueça qual variável está ligada a qual dependência..

* Faça controllers mais simples possível. Funções abstratas comumente usadas em um serviço. 
* Evite escrever lógica de negócio dentro dos controllers. Dê essa responsabilidade para o `model`, usando um serviço.
  Por exemplo:

  ```Javascript
  //This is a common behaviour (bad example) of using business logic inside a controller.
  angular.module('Store', [])
  .controller('OrderCtrl', function () {
    var vm = this;

    vm.items = [];

    vm.addToOrder = function (item) {
      vm.items.push(item);//-->Business logic inside controller
    };

    vm.removeFromOrder = function (item) {
      vm.items.splice(vm.items.indexOf(item), 1);//-->Business logic inside controller
    };

    vm.totalPrice = function () {
      return vm.items.reduce(function (memo, item) {
        return memo + (item.qty * item.price);//-->Business logic inside controller
      }, 0);
    };
  });
  ```

  Ao delegar a lógica de negócios em um 'model', o controller será parecido como este (veja 'use serviços como um model' para a implementação service-model):

  ```Javascript
  // order is used as a 'model'
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

  Por que lógica de negócios dentro de controllers é ruim?
  * Controllers são instanciados para cada view e morre quando a view é descarregada
  * Controllers não são reusaveis
  * Controllers não são destinados a serem injetados

* Comunicar diferentes controllers usando invocação de metodo (possível que um filho queira se comunicar com o pai) ou os metódos `$emit`, `$broadcast` e `$on`. As mensagens emitidas e transmitidas devem ser mantidos a um mínimo.
* Faça uma lista de todas as mensagens que são passadas usando `$emit`, `$broadcast` e gerenciá-lo com cuidado devido a colisões de nomes e possíveis erros.

   Exemplo:

   ```JavaScript
   // app.js
   /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
   Custom events:
     - 'authorization-message' - description of the message
       - { user, role, action } - data format
         - user - a string, which contains the username
         - role - an ID of the role the user has
         - action - specific action the user tries to perform
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
   ```

* Quando você precisar formartar dados encapsulados a logica de formatação em um [filter](#filters) e declará-lo como dependência:

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
* Em caso de controllers aninhados usar o "escopo aninhado" (a sintaxe `controllerAs` ):

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


# Diretivas

* Nomeie suas diretivas no padrão lowerCamelCase
* Use `scope` ao invés de `$scope` na sua função de link. Na compilação, pós/pre funções link que você tenha, definem os argumentos que irão ser passados quando a função é invocada, você não será capaz de muda-los usando DI (injeção de dependências). Este modelo também é usado no código fonte do AngularJS.
* Use prefixos customizados para suas diretivas para previnir colisões de nomes com bibliotecas de terceiros.
* Não use `ng` ou `ui` prefixos pois eles estão reservados para o uso do AngularJS e AngularJS UI.
* Manipulações DOM devem ser feitas somente através de diretivas.
* Crie um escopo isolado/independente quando você for desenvolver componentes reutilizáveis.
* Use diretivas como atributos ou elementos ao invés de comentários ou classes, isso irá fazer seu codigo mais legivel.
* Use `scope.$on('$destroy', fn)` para limpar. Isso é especialmente útil quando você está gerenciando plugins de terceiros como diretivas.
* Não esqueça de usar `$sce` quando você deve lidar com conteúdo não confiável.

# Filtros

* Nomeie seus filtros no padrão lowerCamelCase
* Faça seus filtros o mais leve possível. Eles são chamados frequentemente durante o loop `$digest` então criando filtros lentos você irá atrasar sua aplicação.
* Faça uma única coisa em seus filtros, mantê-los coerente. Muitas manipulações complexas podem ser alcançadas através de filtros existentes.

# Serviços

Esta seção inclui informações sobre o componentes de serviços no AngularJS. Ele não é dependente do modo de definição (isto é, como provedor, `.factory`, `.service`), exceto se explicitamente mencionado.

* Use camelCase para nomear os serviços.
  * UpperCamelCase (PascalCase) para nomear seus serviços, usado como construtor das funções, ex.:

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

  * lowerCamelCase para todos os outros serviços.

* Encapsule as lógicas de negócios em serviços. Prefira usar-lo em seu  `model`. Por exemplo:
  ```Javascript
  // order is the 'model'
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
    Veja 'Evite escrever lógica de negócio dentro dos controllers' para um exemplo de um controlador consumindo o serviço.
* Serviços que representam o domínio de preferência um `service` em vez de um `factory`. Desta forma, podemos tirar proveito da herança "klassical" mais fácil:

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

* Para o cache de nível de sessão você pode usar `$cacheFactory`. Isso deve ser usado para armazenar em cache os resultados de solicitações ou cálculos pesados.
* Se determinado serviço requer configuração para definir o serviço de provedor, configure com `config` callback:

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

* Use `ng-bind` ou `ng-cloak` ao invés de simplesmente `{{ }}` para prevenir conteúdo piscando.
* Evite escrever código complexo no template.
* Quando você precisar definir o `src` de uma imagem dinamicamente use `ng-src` ao invés do template `{{}}`.
* Quando você precisar definir o `href` como tag dinamica use `ng-href` ao invés de `href` com o template `{{ }}`.
* Ao invés de usar variável de escopo como string e usá-la com o atributo `estilo {{ }}`, use a diretiva `ng-style` com parâmetros de objeto e variavéis de escopo como valores:

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

#Roteamento

* Use `resolve` para solucionar as dependências antes que o 'view' seja mostrado.
* Não coloque chamadas RESTful explícitas dentro do callback do `resolve`. Isolar todos os pedidos dentro de serviços adequados. Desta forma, você pode habilitar o cache e separar os interesses.

# E2E Testing

E2E tests são o próximo passo senso comum após os testes unitários, que lhe permitirá rastrear bugs e erros no comportamento do seu sistema. Eles são ótimos para fornecer uma verificação de bus que os cenários mais comuns de usar o aplicativo. Desta forma, você pode automatizar o processo e executá-lo antes de implantar seu aplicativo.

Idealmente , os testes com o Angular são escritos em Jasmine. Estes testes são executados usando o corredor de teste transferidor E2E que usa eventos nativos e têm características especiais para aplicações com o angular.

Estrutura de arquivos:

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

* Para novas versões do framework (>=1.4.0) use o build com ferramentas de i18n tools, se você usar versões mais antigas (<1.4.0) use [`angular-translate`](https://github.com/angular-translate/angular-translate).

# Performance

* Otimizar o ciclo de digest

 Assista apenas as variáveis ​​mais importantes . Quando necessário para invocar o `loop digest` $ explicitamente (que deve acontecer apenas em casos excepcionais ) , invocá-lo somente quando necessário (por exemplo : quando se usa comunicação em tempo real , não causam um ` $ circuito digest` em cada um recebeu mensagem).
  * Para o conteúdo que é inicializada apenas uma vez e , em seguida, nunca mudou , use os observadores de utilização única como [ ` bindonce` ] ( https://github.com/Pasvaz/bindonce ) para versões mais antigas do AngularJS ou ligações de uma só vez em AngularJS > = 1.3.0 .


  * Assista somente as variáveis mais importantes. Quando necessário invocar o `$digest` loop explicitamente (que deve acontecer apenas em casos excepcionais), invoque somente quando necessário (por exemplo: quando você usar comunicação em tempo real, não tem impacto no `$digest` a cada mensagem recebida).
  * Para o conteúdo que é inicializado apenas uma vez, e em seguida, nunca sofre alteração, use os single-time watchers como [`bindonce`](https://github.com/Pasvaz/bindonce), e, para versões mais antigas do AngularJS ou one-time binding com AngularJS >=1.3.0.
    ```html
    <div>
      {{ ::main.things }}
    </div>
    ```
    or
    ```html
      <div ng-bind="::main.things"></div>
    ```
    Depois disso, os watchers **não** serão criados pelo `main.things` e quaisquer alterações do `main.things` não irá atualizar a view.
  * Faça os cálculos em `$watch` mais simples possível. Fazendo cálculos pesados e lentos em um único `$watch` fará o aplicativo ficar lento (o loop `$digest` é feito em único segmento por causa da natureza single-threaded do Javascript).
  * Ao assistir coleções, não vê-las profundamente quando não for necessário. Melhor usar `$watchCollection`, que executa uma verificação superficial para a igualdade do resultado da expressão observada e o valor anterior da avaliação da expressão.
  * Defina o terceiro parâmetro `$timeout` na função para false ignorando o loop `$digest` quando há variáveis observadas são impactadas pela a invocação do retorno do `$timeout`.
  * Ao lidar com grandes coleções que mudam raramente, [use estruturas de dados imutáveis](http://blog.mgechev.com/2015/03/02/immutability-in-angularjs-immutablejs).


* Considere diminiuir o número de solicitações de rede através do agrupamento / arquivos de modelo de html cache em seu principal arquivo de javascript, usando o [grunt-html2js](https://github.com/karlgoldstein/grunt-html2js) / [gulp-html2js](https://github.com/fraserxu/gulp-html2js). Veja [aqui](http://ng-learn.org/2014/08/Populating_template_cache_with_html2js/) e [aqui](http://slides.com/yanivefraim-1/real-world-angularjs#/34) para maiores detalhes. Isso é particularmente útil quando o projeto tem um monte de pequenos templates HTML que podem ser uma parte do principal (minificado e compactado) do arquivo javascript.

# Contribuições

Como o objetivo deste guia é para ser conduzido pela a comunidade, as contribuições são muito bem vindas. Por exemplo, você pode contribuir através da seção de Testes ou através da tradução para o seu idioma.

# Contribuidores

[<img alt="mgechev" src="https://avatars.githubusercontent.com/u/455023?v=3&s=117" width="117">](https://github.com/mgechev) |[<img alt="morizotter" src="https://avatars.githubusercontent.com/u/536954?v=3&s=117" width="117">](https://github.com/morizotter) |[<img alt="chatii2412" src="https://avatars.githubusercontent.com/u/3435149?v=3&s=117" width="117">](https://github.com/chatii2412) |[<img alt="pascalockert" src="https://avatars.githubusercontent.com/u/4253438?v=3&s=117" width="117">](https://github.com/pascalockert) |[<img alt="yanivefraim" src="https://avatars.githubusercontent.com/u/1336186?v=3&s=117" width="117">](https://github.com/yanivefraim) |[<img alt="ericguirbal" src="https://avatars.githubusercontent.com/u/322135?v=3&s=117" width="117">](https://github.com/ericguirbal) |
:---: |:---: |:---: |:---: |:---: |:---: |
[mgechev](https://github.com/mgechev) |[morizotter](https://github.com/morizotter) |[chatii2412](https://github.com/chatii2412) |[pascalockert](https://github.com/pascalockert) |[yanivefraim](https://github.com/yanivefraim) |[ericguirbal](https://github.com/ericguirbal) |

[<img alt="agnislav" src="https://avatars.githubusercontent.com/u/364255?v=3&s=117" width="117">](https://github.com/agnislav) |[<img alt="ray7551" src="https://avatars.githubusercontent.com/u/1812388?v=3&s=117" width="117">](https://github.com/ray7551) |[<img alt="mainyaa" src="https://avatars.githubusercontent.com/u/800781?v=3&s=117" width="117">](https://github.com/mainyaa) |[<img alt="LeonardCModoran" src="https://avatars.githubusercontent.com/u/8460505?v=3&s=117" width="117">](https://github.com/LeonardCModoran) |[<img alt="elfinxx" src="https://avatars.githubusercontent.com/u/4384908?v=3&s=117" width="117">](https://github.com/elfinxx) |[<img alt="Xuefeng-Zhu" src="https://avatars.githubusercontent.com/u/5875315?v=3&s=117" width="117">](https://github.com/Xuefeng-Zhu) |
:---: |:---: |:---: |:---: |:---: |:---: |
[agnislav](https://github.com/agnislav) |[ray7551](https://github.com/ray7551) |[mainyaa](https://github.com/mainyaa) |[LeonardCModoran](https://github.com/LeonardCModoran) |[elfinxx](https://github.com/elfinxx) |[Xuefeng-Zhu](https://github.com/Xuefeng-Zhu) |

[<img alt="rubystream" src="https://avatars.githubusercontent.com/u/3200?v=3&s=117" width="117">](https://github.com/rubystream) |[<img alt="lukaszklis" src="https://avatars.githubusercontent.com/u/11782?v=3&s=117" width="117">](https://github.com/lukaszklis) |[<img alt="susieyy" src="https://avatars.githubusercontent.com/u/62295?v=3&s=117" width="117">](https://github.com/susieyy) |[<img alt="SullyP" src="https://avatars.githubusercontent.com/u/12484363?v=3&s=117" width="117">](https://github.com/SullyP) |[<img alt="giacomocusinato" src="https://avatars.githubusercontent.com/u/7659518?v=3&s=117" width="117">](https://github.com/giacomocusinato) |[<img alt="cironunes" src="https://avatars.githubusercontent.com/u/469908?v=3&s=117" width="117">](https://github.com/cironunes) |
:---: |:---: |:---: |:---: |:---: |:---: |
[rubystream](https://github.com/rubystream) |[lukaszklis](https://github.com/lukaszklis) |[susieyy](https://github.com/susieyy) |[SullyP](https://github.com/SullyP) |[giacomocusinato](https://github.com/giacomocusinato) |[cironunes](https://github.com/cironunes) |

[<img alt="guiltry" src="https://avatars.githubusercontent.com/u/1484308?v=3&s=117" width="117">](https://github.com/guiltry) |[<img alt="MertSKaan" src="https://avatars.githubusercontent.com/u/5517637?v=3&s=117" width="117">](https://github.com/MertSKaan) |[<img alt="mingchen" src="https://avatars.githubusercontent.com/u/1002838?v=3&s=117" width="117">](https://github.com/mingchen) |[<img alt="tornad" src="https://avatars.githubusercontent.com/u/2128499?v=3&s=117" width="117">](https://github.com/tornad) |[<img alt="cavarzan" src="https://avatars.githubusercontent.com/u/3915288?v=3&s=117" width="117">](https://github.com/cavarzan) |[<img alt="jmblog" src="https://avatars.githubusercontent.com/u/86085?v=3&s=117" width="117">](https://github.com/jmblog) |
:---: |:---: |:---: |:---: |:---: |:---: |
[guiltry](https://github.com/guiltry) |[MertSKaan](https://github.com/MertSKaan) |[mingchen](https://github.com/mingchen) |[tornad](https://github.com/tornad) |[cavarzan](https://github.com/cavarzan) |[jmblog](https://github.com/jmblog) |

[<img alt="luixaviles" src="https://avatars.githubusercontent.com/u/3485075?v=3&s=117" width="117">](https://github.com/luixaviles) |[<img alt="kuzzmi" src="https://avatars.githubusercontent.com/u/1727140?v=3&s=117" width="117">](https://github.com/kuzzmi) |[<img alt="andreasonny83" src="https://avatars.githubusercontent.com/u/8806300?v=3&s=117" width="117">](https://github.com/andreasonny83) |[<img alt="tiagobarreto" src="https://avatars.githubusercontent.com/u/45082?v=3&s=117" width="117">](https://github.com/tiagobarreto) |[<img alt="nktssh" src="https://avatars.githubusercontent.com/u/1872256?v=3&s=117" width="117">](https://github.com/nktssh) |[<img alt="clbn" src="https://avatars.githubusercontent.com/u/1071933?v=3&s=117" width="117">](https://github.com/clbn) |
:---: |:---: |:---: |:---: |:---: |:---: |
[luixaviles](https://github.com/luixaviles) |[kuzzmi](https://github.com/kuzzmi) |[andreasonny83](https://github.com/andreasonny83) |[tiagobarreto](https://github.com/tiagobarreto) |[nktssh](https://github.com/nktssh) |[clbn](https://github.com/clbn) |

[<img alt="atodorov" src="https://avatars.githubusercontent.com/u/1002300?v=3&s=117" width="117">](https://github.com/atodorov) |[<img alt="dreame4" src="https://avatars.githubusercontent.com/u/277870?v=3&s=117" width="117">](https://github.com/dreame4) |[<img alt="apetro" src="https://avatars.githubusercontent.com/u/952283?v=3&s=117" width="117">](https://github.com/apetro) |[<img alt="valgreens" src="https://avatars.githubusercontent.com/u/903263?v=3&s=117" width="117">](https://github.com/valgreens) |[<img alt="meetbryce" src="https://avatars.githubusercontent.com/u/1845143?v=3&s=117" width="117">](https://github.com/meetbryce) |[<img alt="unseen1980" src="https://avatars.githubusercontent.com/u/2386570?v=3&s=117" width="117">](https://github.com/unseen1980) |
:---: |:---: |:---: |:---: |:---: |:---: |
[atodorov](https://github.com/atodorov) |[dreame4](https://github.com/dreame4) |[apetro](https://github.com/apetro) |[valgreens](https://github.com/valgreens) |[meetbryce](https://github.com/meetbryce) |[unseen1980](https://github.com/unseen1980) |

[<img alt="cminhho" src="https://avatars.githubusercontent.com/u/10251630?v=3&s=117" width="117">](https://github.com/cminhho) |[<img alt="dwmkerr" src="https://avatars.githubusercontent.com/u/1926984?v=3&s=117" width="117">](https://github.com/dwmkerr) |[<img alt="dchest" src="https://avatars.githubusercontent.com/u/52677?v=3&s=117" width="117">](https://github.com/dchest) |[<img alt="kuzmeig1" src="https://avatars.githubusercontent.com/u/8707951?v=3&s=117" width="117">](https://github.com/kuzmeig1) |[<img alt="gsamokovarov" src="https://avatars.githubusercontent.com/u/604618?v=3&s=117" width="117">](https://github.com/gsamokovarov) |[<img alt="grvcoelho" src="https://avatars.githubusercontent.com/u/7416751?v=3&s=117" width="117">](https://github.com/grvcoelho) |
:---: |:---: |:---: |:---: |:---: |:---: |
[cminhho](https://github.com/cminhho) |[dwmkerr](https://github.com/dwmkerr) |[dchest](https://github.com/dchest) |[kuzmeig1](https://github.com/kuzmeig1) |[gsamokovarov](https://github.com/gsamokovarov) |[grvcoelho](https://github.com/grvcoelho) |

[<img alt="yassirh" src="https://avatars.githubusercontent.com/u/4649139?v=3&s=117" width="117">](https://github.com/yassirh) |[<img alt="bargaorobalo" src="https://avatars.githubusercontent.com/u/993001?v=3&s=117" width="117">](https://github.com/bargaorobalo) |[<img alt="hermankan" src="https://avatars.githubusercontent.com/u/2899106?v=3&s=117" width="117">](https://github.com/hermankan) |[<img alt="jabhishek" src="https://avatars.githubusercontent.com/u/1830537?v=3&s=117" width="117">](https://github.com/jabhishek) |[<img alt="jesselpalmer" src="https://avatars.githubusercontent.com/u/682097?v=3&s=117" width="117">](https://github.com/jesselpalmer) |[<img alt="capaj" src="https://avatars.githubusercontent.com/u/1305378?v=3&s=117" width="117">](https://github.com/capaj) |
:---: |:---: |:---: |:---: |:---: |:---: |
[yassirh](https://github.com/yassirh) |[bargaorobalo](https://github.com/bargaorobalo) |[hermankan](https://github.com/hermankan) |[jabhishek](https://github.com/jabhishek) |[jesselpalmer](https://github.com/jesselpalmer) |[capaj](https://github.com/capaj) |

[<img alt="johnnyghost" src="https://avatars.githubusercontent.com/u/1117330?v=3&s=117" width="117">](https://github.com/johnnyghost) |[<img alt="jordanyee" src="https://avatars.githubusercontent.com/u/3303098?v=3&s=117" width="117">](https://github.com/jordanyee) |[<img alt="whoan" src="https://avatars.githubusercontent.com/u/7103003?v=3&s=117" width="117">](https://github.com/whoan) |[<img alt="nacyot" src="https://avatars.githubusercontent.com/u/148919?v=3&s=117" width="117">](https://github.com/nacyot) |[<img alt="mariolamacchia" src="https://avatars.githubusercontent.com/u/6282722?v=3&s=117" width="117">](https://github.com/mariolamacchia) |[<img alt="mischkl" src="https://avatars.githubusercontent.com/u/8177979?v=3&s=117" width="117">](https://github.com/mischkl) |
:---: |:---: |:---: |:---: |:---: |:---: |
[johnnyghost](https://github.com/johnnyghost) |[jordanyee](https://github.com/jordanyee) |[whoan](https://github.com/whoan) |[nacyot](https://github.com/nacyot) |[mariolamacchia](https://github.com/mariolamacchia) |[mischkl](https://github.com/mischkl) |

[<img alt="michaelmov" src="https://avatars.githubusercontent.com/u/4242002?v=3&s=117" width="117">](https://github.com/michaelmov) |[<img alt="kirstein" src="https://avatars.githubusercontent.com/u/426442?v=3&s=117" width="117">](https://github.com/kirstein) |[<img alt="mo-gr" src="https://avatars.githubusercontent.com/u/95577?v=3&s=117" width="117">](https://github.com/mo-gr) |[<img alt="mortonfox" src="https://avatars.githubusercontent.com/u/495892?v=3&s=117" width="117">](https://github.com/mortonfox) |[<img alt="cryptojuice" src="https://avatars.githubusercontent.com/u/458883?v=3&s=117" width="117">](https://github.com/cryptojuice) |[<img alt="astalker" src="https://avatars.githubusercontent.com/u/1486567?v=3&s=117" width="117">](https://github.com/astalker) |
:---: |:---: |:---: |:---: |:---: |:---: |
[michaelmov](https://github.com/michaelmov) |[kirstein](https://github.com/kirstein) |[mo-gr](https://github.com/mo-gr) |[mortonfox](https://github.com/mortonfox) |[cryptojuice](https://github.com/cryptojuice) |[astalker](https://github.com/astalker) |

[<img alt="qwerfrewq" src="https://avatars.githubusercontent.com/u/7765194?v=3&s=117" width="117">](https://github.com/qwerfrewq) |[<img alt="olov" src="https://avatars.githubusercontent.com/u/19247?v=3&s=117" width="117">](https://github.com/olov) |[<img alt="vorktanamobay" src="https://avatars.githubusercontent.com/u/2623355?v=3&s=117" width="117">](https://github.com/vorktanamobay) |[<img alt="sahat" src="https://avatars.githubusercontent.com/u/544954?v=3&s=117" width="117">](https://github.com/sahat) |[<img alt="smelukov" src="https://avatars.githubusercontent.com/u/6654581?v=3&s=117" width="117">](https://github.com/smelukov) |[<img alt="ganchiku" src="https://avatars.githubusercontent.com/u/149973?v=3&s=117" width="117">](https://github.com/ganchiku) |
:---: |:---: |:---: |:---: |:---: |:---: |
[qwerfrewq](https://github.com/qwerfrewq) |[olov](https://github.com/olov) |[vorktanamobay](https://github.com/vorktanamobay) |[sahat](https://github.com/sahat) |[smelukov](https://github.com/smelukov) |[ganchiku](https://github.com/ganchiku) |

[<img alt="kaneshin" src="https://avatars.githubusercontent.com/u/936972?v=3&s=117" width="117">](https://github.com/kaneshin) |[<img alt="imaimiami" src="https://avatars.githubusercontent.com/u/2256037?v=3&s=117" width="117">](https://github.com/imaimiami) |[<img alt="dooart" src="https://avatars.githubusercontent.com/u/371426?v=3&s=117" width="117">](https://github.com/dooart) |[<img alt="thomastuts" src="https://avatars.githubusercontent.com/u/1914255?v=3&s=117" width="117">](https://github.com/thomastuts) |[<img alt="UrielMiranda" src="https://avatars.githubusercontent.com/u/12901838?v=3&s=117" width="117">](https://github.com/UrielMiranda) |[<img alt="vkarampinis" src="https://avatars.githubusercontent.com/u/330736?v=3&s=117" width="117">](https://github.com/vkarampinis) |
:---: |:---: |:---: |:---: |:---: |:---: |
[kaneshin](https://github.com/kaneshin) |[imaimiami](https://github.com/imaimiami) |[dooart](https://github.com/dooart) |[thomastuts](https://github.com/thomastuts) |[UrielMiranda](https://github.com/UrielMiranda) |[vkarampinis](https://github.com/vkarampinis) |

[<img alt="VladimirKazan" src="https://avatars.githubusercontent.com/u/3514422?v=3&s=117" width="117">](https://github.com/VladimirKazan) |[<img alt="andela-abankole" src="https://avatars.githubusercontent.com/u/11836769?v=3&s=117" width="117">](https://github.com/andela-abankole) |[<img alt="grapswiz" src="https://avatars.githubusercontent.com/u/309459?v=3&s=117" width="117">](https://github.com/grapswiz) |[<img alt="coderhaoxin" src="https://avatars.githubusercontent.com/u/2569835?v=3&s=117" width="117">](https://github.com/coderhaoxin) |[<img alt="giantray" src="https://avatars.githubusercontent.com/u/5054377?v=3&s=117" width="117">](https://github.com/giantray) |[<img alt="ntaoo" src="https://avatars.githubusercontent.com/u/511213?v=3&s=117" width="117">](https://github.com/ntaoo) |
:---: |:---: |:---: |:---: |:---: |:---: |
[VladimirKazan](https://github.com/VladimirKazan) |[andela-abankole](https://github.com/andela-abankole) |[grapswiz](https://github.com/grapswiz) |[coderhaoxin](https://github.com/coderhaoxin) |[giantray](https://github.com/giantray) |[ntaoo](https://github.com/ntaoo) |

[<img alt="dominickolbe" src="https://avatars.githubusercontent.com/u/6094725?v=3&s=117" width="117">](https://github.com/dominickolbe) |
:---: |
[dominickolbe](https://github.com/dominickolbe) |
