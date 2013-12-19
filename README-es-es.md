#Introducción

El objetivo de esta guía de estilo es presentar un conjunto de buenas prácticas y reglas de estilo para una aplicación de AngularJS.
Estas buenas pácticas están recogidas de:

0. Código fuente de AngularJS
0. Código fuente de artículos que he leído
0. Mi propia experiencia

**Nota**: esto es un borrador de la guía de estilo, el principal objetivo es que lo dirija la comunidad, asi que será agradecido por la comunidad si se van añadiendo las cosas que faltan.

En esta guía de estilo no encontrarás pautas comunes para el desarrollo en Javascript. Esas las podrás encontrar en:

0. [Google's JavaScript style guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
0. [Mozilla's JavaScript style guide](https://developer.mozilla.org/en-US/docs/Developer_Guide/Coding_Style)
0. [GitHub's JavaScript style guide](https://github.com/styleguide/javascript)
0. [Douglas Crockford's JavaScript style guide](http://javascript.crockford.com/code.html)

Para el desarrollo de AngularJS la recomendada es [Guía de estilo de Javascript de Google](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml).

En la wiki de Github de AngularJS hay una sección similar por [ProLoser](https://github.com/ProLoser), puedes verla [aquí](https://github.com/angular/angular.js/wiki).

#Tabla de contenido
* [General](#general)
    * [Estructura de directorios](#estructura-de-directorios)
    * [Optimiza el ciclo digest](#optimiza-el-ciclo-digest)
    * [Otros](#others)
* [Módulos](#modulos)
* [Controladores](#controladores)
* [Directivas](#directivas)
* [Filtros](#filtros)
* [Servicios](#servicios)
* [Plantillas](#plantillas)
* [Enrutamiento](#enrutamiento)

#General

## Estructura de directorios

Como una aplicación grande de AngularJS tiene muchos componentes, lo mejor es estructurarlos con una jerarquía de directorios.
Principalmente hay dos maneras de hacerlo:

* Creando una division de alto nivel por tipos de componentes y por funcionalidad a menor nivel.

De esta manera la estructura de directorios sería así:

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

* Creando una division de alto nivel por funcionalidad y por tipos de componentes a bajo nivel.

Esta es su estructura:

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

* Cuando se crean directivas puede resultar útil poner todos los archivos relacionados (plantillas, archivos CSS/SASS, Javascript) en el mismo directorio. Si eliges usar este método se consistente y úsalo en todo tu proyecto.

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

Este método se puede combinar con cualquiera de las dos estructuras de arriba.
* Otra pequeña variación en ambas estructuras de directorios es la usada en [ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home). En ella los test unitarios para el componente se colocan en el lugar donde está el componente. De esta manera puedes realizar cambios en los componentes y es más fácil de encontrar sus tests. Los tests también se pueden usar como documentación y mostrar casos de uso.

        services
        ├── cache
        │   ├── cache1.js
        │   └── cache1.spec.js
        └── models
            ├── model1.js
            └── model1.spec.js

* El archivo `app.js` contiene la definición de rutas, configuración y/o arranque manual (si es necesario).
* Cada archivo Javascript debe contener un único componente. El archivo debería tener el mismo nombre que el componente.
* Usa una plantilla para el proyecto de Angular como [Yeoman](http://yeoman.io), [ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home).

Yo prefiero la primera estructura porque es más fácil de encontrar los componentes comunes.

La manera de nombrar a los componentes están en la sección de cada componente.

## Optimiza el ciclo digest

* Observa solo las variables más importantes (por ejemplo: cuando usas comunicación en tiempo real, no fuerces un ciclo `$digest` en cada mensaje recibido).
* Las operaciones en`$watch` deben ser lo más simples posible. Realizar operaciones pesadas y lentas en un simple `$watch` puede ralentizar la aplicacion entera (el ciclo $digest se hace en un unico hilo debido al funcionamiento de Javascript con un único hilo de ejecución).

## Otros

* Usa:
    * `$timeout` en lugar de `setTimeout`
    * `$window` en lugar de `window`
    * `$document` en lugar de `document`
    * `$http` en lugar de `$.ajax`

Esto hará que sea más fácil de testear y, en algunos casos, prevenir comportamientos extraños (por ejemplo, olvidar usar `$scope.$apply` en `setTimeout`).

* Automatiza tu flujo de trabajo usando herramientas como:
    * [Yeoman](http://yeoman.io)
    * [Grunt](http://gruntjs.com)
    * [Bower](http://bower.io)

* Usa promesas (`$q`) en lugar de callbacks. Hará que tu código parezca más limpio y elegante y te salvará del infierno de callbacks anidadas.
* Usa `$resource` en lugar de `$http` cuando puedas. Un nivel alto de abstracción evita la redundancia.
* Usa un pre-minifier de AngularJS (como [ngmin](https://github.com/btford/ngmin) or [ng-annotate](https://github.com/olov/ng-annotate)) para prevenir problemas después de minificar.
* No utilices variables globales. Solventa todas tus dependencias usando la inyección de dependencias.
* No ensucies el `$scope`. Solamente añade funciones que van a ser usadas en las plantillas.

#Modulos

Hay dos maneras de estructurar los módulos:

0. Por funcionalidad
0. Por tipo de componente

Actualmente no hay gran diferencia, pero la primera manera parece más limpia. También si se implementa la carga asíncrona de módulos (todavía no está en el roadmap de AngularJS), mejoraría el rendimiento de la aplicación.

#Controladores

* No modifiques el DOM desde tus controladores. Utiliza directivas para eso.
* El nombre del controlador se basa en su funcionalidad (por ejemplo carrito de compra, página principal, panel de administración) y la subcadena `Ctrl` al final. Los controladores se nombran con UpperCamelCase (`HomePageCtrl`, `ShoppingCartCtrl`, `AdminPanelCtrl`, etc.).
* Los controladores no se deben definir como variables globales (no importa que AngularJS lo permita, ensuciar el espacio global es una mala práctica).
* Utiliza la sintaxis de arrays para definir controladores:



        module.controller('MyCtrl', ['dependency1', 'dependency2', ..., 'dependencyn', function (dependency1, dependency2, ..., dependencyn) {
          //...body
        }]);


Usando este tipo de definición se evitan problemas con la minificación. Puedes generar automáticamente esta definición en vez de la estándar con herramientas como [ng-annotate](https://github.com/olov/ng-annotate) (y la tarea de grunt [grunt-ng-annotate](https://github.com/mzgol/grunt-ng-annotate)).
* Utiliza los nombres originales de las dependencias del controlador. Esto te permitirá escribir código más legible:



        module.controller('MyCtrl', ['$scope', function (s) {
          //...body
        }]);


es menos fácil de leer que:


        module.controller('MyCtrl', ['$scope', function ($scope) {
          //...body
        }]);


Esto se aplica especialmente en archivos en los que hay mucho código y tengas hacer scroll porque que olvides que variable hace referencia a cada dependencia.

* Haz los controladores lo mas sencillos posibles. Abstrae las funciones comunes que uses en un servicio.
* Comunica diferentes controladores usando la invocación de métodos (es posible cuando los controladores hijos quieren comunicarse con los controladores padre) o los métodos `$emit`, `$broadcast` y `$on`. La emisión y broadcast de mensajes debería hacerse lo menos posible.
* Haz una lista de todos los mensajes que son mandados con `$emit`, `$broadcast` y manejalos con cuidado para evitar colisiones de nombres y posibles bugs.
* Cuando necesites formatear datos encapsula la lógica en un [filtro](#filtros) y decláralo como dependencia:


        module.filter('myFormat', function () {
          return function () {
            //body...
          };
        });

        module.controller('MyCtrl', ['$scope', 'myFormatFilter', function ($scope, myFormatFilter) {
          //body...
        }]);

#Directivas

* Nombra tus directivas con lowerCamelCase.
* Usa `scope` en lugar de `$scope` en tu funcion link. En el compilado, ya están definidos los argumentos de las funciones post/pre link cuando son invocadas, no los podrás cambiar después usando la inyección de dependencias. Este estilo es usado también en el código fuente de AngularJS.
* Usa prefijos personalizados para las directivas para prevenir colisiones de nombres con librerías externas.
* No uses los prefijos `ng` o `ui` porque están reservados para uso de AngularJS y AngularJS UI.
* La manipulación del DOM solo se debe hacer mediante directivas.
* Crea un scope aislado cuando desarrollas componentes reusables.

#Filtros

* Nombra tus filtros usando lowerCamelCase.
* Haz tus filtros lo más ligeros posibles. Estos son llamados a menudo durante el ciclo `$digest` asi que un filtro lento puede hacer lenta tu aplicación.

#Servicios

* Utiliza camelCase (con mayúscula o minúscula) para darle nombre a tus servicios.
* Encapsula la lógica de negocio en los servicios.
* Los servicios que encapsulan la lógica de negocio son preferibles como `service` en lugar de `factory`
* Para cachear a nivel de sesión puedes usar `$cacheFactory`. Se debería usar para cachear resultados de peticiones o procesos pesados.

#Plantillas

* Utiliza `ng-bind` o `ng-cloak` en lugar de `{{ }}` para prevenir mostrar contenido sin compilar.
* Evita escribir código complejo en la plantilla.
* Cuando necesites asignar el `src` de una imagen dinamicamente usa `ng-src` en lugar de `src` con `{{}}`.
* En lugar de usar variables del scope como cadenas en el atributo `style` con `{{ }}`, usa la directiva `ng-style` con los parametros como claves de un objeto y las variables del scope como valores:

        ...
        $scope.divStyle = {
          width: 200,
          position: 'relative'
        };
        ...

        <div ng-style="divStyle">my beautifully styled div which will work in IE</div>;

#Enrutamiento

* Usa `resolve` para resolver dependencias antes de que la vista se muestre.
