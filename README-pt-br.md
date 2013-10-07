#Introdução

O objetivo deste guia é aprensetar um conjunto de boas práticas e diretrizes para uma aplicação AngularJS. Estas boas práticas foram colhetadas de:

0. Código Fonte AngularJS
0. Códigos fonte de artigos que li
0. Minha própria experiência

**Nota**: Este ainda é um rascunho de guia, seu objetivo principal é ser construído pela comunidade, então preenchendo as lacunas você será muito apreciado por toda ela.  

Neste guia você **não** vai encontrar diretrizes para desenvolvimento JavaScript. Tal pode ser encontrado em:

0. [Guia JavaScript Google](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
0. [Guia JavaScript Mozilla](https://developer.mozilla.org/en-US/docs/Developer_Guide/Coding_Style)
0. [Guia JavaScript Github](https://github.com/styleguide/javascript)
0. [Guia JavaScript Douglas Crockford](http://javascript.crockford.com/code.html)

Para o desenvolvimento em AngularJS é recomendado o [Guia JavaScript Google](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml).

Na wiki AngularJS do Github temos uma seção similar por [ProLoser](https://github.com/ProLoser), você pode ver isso [aqui](https://github.com/angular/angular.js/wiki).

#Tabela de Conteúdo
* [Geral](#geral)
    * [Estrutura de Diretório](#estrutura-de-diretorio)
    * [Otimizando o ciclo digest](#otimizando-o-ciclo-digest)
    * [Outros](#outros)
* [Módulos](#modulos)
* [Controladores](#controladores)
* [Diretivas](#diretivas)
* [Filtros](#filtros)
* [Serviços](#serviços)
* [Templates](#templates)
* [Roteamento](#roteamento)

#Geral

##Estrutura de Diretório

Uma vez que uma gande aplicação AngularJS tem muitos componentes, é melhor estruturá-la em uma hierarquia de diretórios. Há duas abordagens:

* Criando uma divisão alto nível por tipos de componentes e uma divisão baixo nível por funcionalidade.

Desta maneira o a estrutura do diretório irá se parecer com:

    * app
        * controllers
            * page1
                * FirstCtrl.js
                * SecondCtrl.js
            * page2
                * ThirdCtrl.js
            * //...
        * directives
            * page1
                * directive1.js
            * page2
                * directive2.js
                * directive3.js
            * commonDirective.js
        * filters
            * page1
                * filter1.js
            commonFilter1.js
            commonFilter2.js
        * services
            * cache
                * Cache1.js
                * Cache2.js
            * models
                * Model1.js
                * Model2.js
            CommonService.js
        app.js
    * test
    * lib

* Criando uma divisão alto nível por funcionalidade e baixo nível por tipos de componentes.

Aqui está seu modelo:

    * app
        * page1
            * controllers
                * FirstCtrl.js
                * SecondCtrl.js
            * directives
                * directive1.js
                * directive2.js
            * filters
                * filter1.js
                * filter2.js
            * services
                * service1.js
                * service2.js
            * //...
        * page2
            * controllers
                * ThirdCtrl.js
            * directives
                * directive3.js
                * directive4.js
            * filters
                * filter3.js
            * services
                * service3.js
            //...
        * common
            * controllers
            * directives
            * filters
            * services
        app.js
    * test
    * lib

* Quando criarmos uma diretiva, pode ser útil colocar todos os arquivos associados as diretivas (i.e. templates, arquivos CSS/SASS, JavaScript) em uma pasta única. Se você escolher usar este estilo, seja consistente e use-o em todo seu projeto.

    * app
        * directives
            * directive1
                * directive1.js
                * directive1.html
                * directive1.sass
            * directive2
                * directive2.js
                * directive2.html
                * directive2.sass

Esta abordagem pode ser combinada com ambas as estruturas de diretórios acima.

* O arquivo `app.js` contém definição de rotas, configurações e/ou inicializações manuais (se necessário).
* Cada arquivo JavaScript deve conter apenas um componente. O arquivo deve ser nomeado com o nome do componente.
* Use estruturas de projeto Angular como [Yeoman](http://yeoman.io), [ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home).

Eu prefiro a primeira estrutura porque ela cria componentes comuns e fáceis de se achar.

Convenções sobre nomeação de componentes podem ser achadas em cada seção do componente.

##Otimizando o ciclo digest

* Observe (watch) somente as variáveis vitais (por exemplo: quando se usar comunicação em tempo real, não utilize um loop digest para cada mensagem recebida).
* Faça computações em `$watch` o mais simples que puder. Fazer computações pesadas e lentas em um simples `$watch` irá atrasar toda a aplicação (o loop $digest é feito em 'single thread' por causa da natureza 'single thread' do JavaScript).

##Outros

* Use:
    * `$timeout` ao invés de `setTimeout`
    * `$window` ao invés de `window`
    * `$document` ao invés de `document`
    * `$http` ao invés de `$.ajax`

Isto fará seus testes mais fáceis e em certos casos irá prevenir comportamentos inesperados (por exemplo, se você perder `$scope.$apply` em `setTimeout`).

* Automatize seu fluxo de trabalho (workflow) utilizando ferramentas como:
    * [Yeoman](http://yeoman.io)
    * [Grunt](http://gruntjs.com)
    * [Bower](http://bower.io)

* Use promises (`$q`) ao invés de callbacks. Isso tornará seu código mais elegante e limp, e o salvará do inferno de callbacks.
* Use `$resource` ao invés de `$http` quando possível. Um alto nível de abstração irá lhe salvar de redundância.
* Use um pré-minificador AngularJS (como [ngmin](https://github.com/btford/ngmin) ou [ng-annotate](https://github.com/olov/ng-annotate)) para prevenir problemas depois da minificação.
* Não use globais. Resolva todas as dependências usando a Injeção de Dependências.
* Não polua seu `$scope`. Somente adicione funções e variáveis que irão ser usadas nos templates.

#Módulos

Há duas maneiras comuns de se estruturar os módulos:

0. Por funcionalidade
0. Por tipo de componente

Atualmente não há uma grande diferença, mas a primeira forma parece mais limpa. Também, se os módulos 'lazy-loading' forem implementados (fora do roteiro AngularJS atualmente), isso irá melhorar a performance da sua aplicação.

#Controladores

* Não manipule DOM com controladores. Use diretivas para isso.
* O nome do controlodor é dado pela sua funcionalidade (por exemplo *shopping cart*, *homepage*, *admin panel*) e o adicional `Ctrl` no final. Os controladores são nomeados no formato UpperCamelCase (`HomePageCtrl`, `ShoppingCartCtrl`, `AdminPanelCtrl`, etc.).
* Os controladores não devem ser definidos como globais (não importa que AngularJS permita isso, é uma má pratica pois polui o namespace).
* Use a sintaxe de array para as definições do controlador:



        module.controller('MyCtrl', ['dependency1', 'dependency2', ..., 'dependencyn', function (dependency1, dependency2, ..., dependencyn) {
          //...body
        }]);


Use este tipo de definição para evitar problemas com minificação. Você pode gerar automaticamente o array de definição a partir de um padrão usando ferramentas como [ng-annotate](https://github.com/olov/ng-annotate) (e uma tarefa grunt [grunt-ng-annotate](https://github.com/mzgol/grunt-ng-annotate)).

* Use os nomes originais das dependências dos controladores. Isso irá ajudá-lo a produzir um código mais legível:



        module.controller('MyCtrl', ['$scope', function (s) {
          //...body
        }]);


é menos legível que:


        module.controller('MyCtrl', ['$scope', function ($scope) {
          //...body
        }]);


Isso é especialmente aplicado a um arquivo que contenha muito código que se faça necessário rolar (usar o scroll) por ele. Pois é provável que você esqueça qual variável está amarrada em qual dependência. 

* Faça os controladores o mais enxuto possível. Resuma as funções normalmente usadas no serviço.
* Comunique entre controladores diversos usando o método de invocação (possível quando os elementos filhos querem se comunicar com os pais) ou `$emit`, `$broadcast` e `$on` métodos. As mensagens emitidas ($emit) e transmitidas ($broadcast) devem ser mantidas minimamente.
* Faça uma lista de todas as mensagens que são passadas usando `$emit`, `$broadcast` e administre-as cuidadosamente por causa da coalisão de nomes e possíveis erros.
* Quando você precisar formatar dados, encapsule a lógica de formatação em um [filtro](#filtros) e declare isso como uma dependência:


        module.controller('myFormat', function () {
          return function () {
            //body...
          };
        });

        module.controller('MyCtrl', ['$scope', 'myFormatFilter', function ($scope, myFormatFilter) {
          //body...
        }]);

#Diretivas

* Nomeie suas diretivas no padrão lowerCamelCase
* Use `scope` ao invés de `$scope` na sua função de link. Na compilação, pós/pre funções link que você tenha, definem os argumentos que irão ser passados quando a função é invocada, você não será capaz de muda-los usando DI (injeção de dependências). Este modelo também é usado no código fonte do AngularJS.
* Use prefixos customizados para suas diretivas para previnir colisões de nomes com bibliotecas de terceiros.
* Não use `ng` ou `ui` prefixos pois eles estão reservados para o uso do AngularJS e AngularJS UI.
* Manipulações DOM devem ser feitas somente através de diretivas.
* Crie um escopo isolado/independente quando você for desenvolver componentes reutilizáveis.

#Filtros

* Nomeie seus filtros no padrão lowerCamelCase
* Faça seus filtros o mais leve possível. Eles são chamados frequentemente durante o loop `$digest` então criando filtros lentos você irá atrasar sua aplicação.

#Serviços

* Use camelCase (lower ou upper) para nomear os serviços.
* Encapsule as 'business logic' nos services.
* Serviços encapsulando 'business logic' são preferencialmente um `service` ao invez de um`factory`
* Para cachear a 'session-level' você pode usar `$cacheFactory`. Isto deve ser usado para cachear resultados de requisições ou computações pesadas.

#Templates

* Use `ng-bind` ou `ng-cloak` ao invés de simplesmente `{{ }}` para prevenir conteúdo piscando.
* Evite escrever código complexo no template.

#Roteamento

* Use `resolve` para solucionar as dependências antes que o 'view' seja mostrado.
