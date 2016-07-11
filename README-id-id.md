# Introduksi

Tujuan dari panduan ini adalah memberikan standar gaya dan cara-cara terbaik menulis kode untuk sebuah aplikasi AngularJS.
Cara-cara ini dikumpulkan dari:

0. Kode sumber AngularJS
0. Kode-kode atau artikel yang pernah saya baca
0. Pengalaman saya sendiri

**Catatan 1**: Panduan ini masih berupa konsep, tujuan utamanya adalah agar dikendalikan oleh komunitas, jadi menyumbangkan waktu anda untuk proyek ini akan sangat dihargai seluruh komunitas.

**Catatan 2**: Sebelum mengikuti panduan ini, pastikan bahwa panduan ini versi yang terbaru atau sama dengan versi dalam bahasa inggris (bisa anda cek dari waktu commit).

Dalam panduan ini, anda tidak akan menemukan panduan umum untuk menulis kode javascript. Seperti yang bisa anda temukan di:

0. [Panduan menulis kode javascript milik Google](https://google.github.io/styleguide/javascriptguide.xml)
0. [Panduan menulis kode javascript milik Mozilla](https://developer.mozilla.org/en-US/docs/Developer_Guide/Coding_Style)
0. [Panduan menulis kode javascript milik Douglas](http://javascript.crockford.com/code.html)
0. [Panduan menulis kode javascript milik Airbnb](https://github.com/airbnb/javascript)

Tapi setidaknya kami merekomendasikan anda untuk mengikuti [Panduan menulis kode javascript milik Google](https://google.github.io/styleguide/javascriptguide.xml).

Di halaman GitHub milik AngularJS ada sebuah wiki yang bagus seputar topik ini, kontribusi dari [ProLoser](https://github.com/ProLoser), anda bisa melihatnya di [sini](https://github.com/angular/angular.js/wiki).

# Daftar isi
* [Umum](#umum)
    * [Struktur Direktori](#struktur-direktori)
    * [Markup](#markup)
    * [Optimasi "digest cycle"](#optimasi-digest-cycle)
    * [Lain Lain](#lain-lain)
* [Modules](#modules)
* [Controllers](#controllers)
* [Directives](#directives)
* [Filters](#filters)
* [Services](#services)
* [Templates](#templates)
* [Routing](#routing)
* [Testing](#testing)
* [Kontribusi](#kontribusi)
* [Kontributor](#kontributor)

# Umum

## Struktur Direktori

Karena sebuah aplikasi bisa mempunyai banyak komponen, sangat baik untuk membuatnya terstruktur seperti struktur direktori.
Ada 2 struktur yang biasa digunakan:

**Struktur 1:** Membagi menjadi 2 divisi, divisi atas disusun berdasarkan komponen, divisi bawah berdasarkan fungsionalitas.

Dengan cara ini, struktur akan terlihat seperti ini:

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

**Struktur 2:** Membagi menjadi 2 divisi, divisi atas disusun berdasarkan fungsionalitas, divisi bawah berdasarkan komponen.

Dengan cara ini, struktur akan terlihat seperti ini:

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

**Struktur tambahan:** Ketika membuat directives, akan sangat memudahkan apabila anda menempatkan semua file yang berhubungan (seperti: templates, CSS/SASS) di dalam direktori yang sama. Jika anda mengikuti cara ini, anda harus konsisten.

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

Struktur tambahan ini bisa dikombinasikan dengan 2 struktur di atas.

**Variasi Struktur:** Seperti yang digunakan di proyek [ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home). Di dalam proyek tersebut, setiap unit testing ditempatkan dalam 1 direktori yang sama dengan komponen. Dengan cara tersebut, anda akan menemukannya dengan cepat dan juga bisa digunakan untuk dokumentasi dan cara penggunaan komponen tersebut.

```
services
├── cache
│   ├── cache1.js
│   └── cache1.spec.js
└── models
    ├── model1.js
    └── model1.spec.js
```

* File `app.js` berisi definisi routing dan konfigurasi.
* Setiap file javascript, hanya boleh berisi sebuah komponen. File tersebut harus diberi nama sesuai nama komponen.
* Alternatif lain, gunakan struktur seperti di [Yeoman](http://yeoman.io), [ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home).

Saya sendiri lebih menyukai struktur pertama, karena komponen lebih mudah dicari.

Untuk Aturan standar penamaan komponen bisa ditemukan di panduan tiap bagian.

## Markup

[TLDR;](http://developer.yahoo.com/blogs/ydn/high-performance-sites-rule-6-move-scripts-bottom-7200.html) Letakan semua script di bagian bawah halaman.

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

Buat semuanya simpel dan susun file dari yang sangat umum hingga directive yang spesifik di bagian akhir. Dengan begitu lebih mudah untuk melihat, mencari dan mengubahnya.

```
<form class="frm" ng-submit="login.authenticate()">
  <div>
    <input class="ipt" type="text" placeholder="name" require ng-model="user.name">
  </div>
</form>
```

Untuk atribut HTML yang lain, ikuti panduan [ini](http://mdo.github.io/code-guide/#html-attribute-order)

## Optimasi "digest cycle"

* Hanya 'watch' variabel vital (seperti: ketika menggunakan komunikasi real-time, jangan gunakan `$digest` loop disetiap pesan yang diterima).
* Untuk konten yang diinisialisasi sekali dan tidak pernah berubah lagi, gunakan 'single-time watchers' seperti [`bindonce`](https://github.com/Pasvaz/bindonce).
* Buat komputasi di dalam `$watch` se-simpel mungkin. Karena komputasi berat atau lambat di sebuah `$watch` akan memperlambat seluruh aplikasimu.
* Set false parameter ke 3 di `$timeout` untuk melewatkan `$digest` loop ketika tidak ada lagi variabel yang harus di 'watch'.

## Lain Lain

* Gunakan:
    * `$timeout` daripada `setTimeout`
    * `$interval` daripada `setInterval`
    * `$window` daripada `window`
    * `$document` daripada `document`
    * `$http` daripada `$.ajax`

Ini akan mempermudah testing dan akan mencegah kejadian tidak terduga (seperti, jika anda melewatkan `$scope.$apply` di `setTimeout`).

* Otomatiskan sistem kerja anda dengan tool bantuan seperti:
    * [Yeoman](http://yeoman.io)
    * [Grunt](http://gruntjs.com)
    * [Bower](http://bower.io)

* Gunakan promises (`$q`) daripada callbacks. Ini akan membuat kode anda lebih elegan dan bersih, dan menyelamatkan anda dari 'callback hell'.
* Gunakan `$resource` daripada `$http` jika memungkinkan. Semakin tinggi level abstraksi, akan menyelamatkan anda dari redudansi.
* Gunakan AngularJS pre-minifier (seperti [ngmin](https://github.com/btford/ngmin) atau [ng-annotate](https://github.com/olov/ng-annotate)) untuk mencegah masalah setelah proses minifikasi.
* Jangan gunakan variabel global. Selalu gunakan Dependency Injection.
* Jangan kotori `$scope`. Hanya tambahkan fungsi dan variabel yang benar-benar akan digunakan.
* Lebih baik inisialisasi variabel di [controllers daripada menggunakan `ngInit`](https://github.com/angular/angular.js/pull/4366/files). Hanya gunakan `ngInit` untuk aliasing di `ngRepeat`.
* Jangan gunakan awalan `$` untuk nama variabel, properti dan fungsi. Awalan ini digunakan oleh AngularJS.
* Ketika melakukan Depedency Injection, susun semuanya dimulai dari library AngularJS terlebih dahulu, setelah itu library kustom anda:

```javascript
module.factory('Service', function ($rootScope, $timeout, MyCustomDependency1, MyCustomDependency2) {
  return {
    //Something
  };
});
```

# Modules

* Modules harus diberi nama dengan standar 'lowerCamelCase'. Apabila module `b` adalah submodule dari module `a`, maka anda bisa menumpuknya dengan namespace seperti: `a.b`.

Ada 2 struktur umum untuk modul:

0. Dari fungsionalitas
0. Dari tipe komponen

Saat ini 2 struktur di atas tidak terlalu berbeda, tapi yang pertama lebih terlihat bersih. Namun, apabila module 'lazy-loading' sudah diimplementasikan (walaupun saat ini module tersebut tidak ada dalam roadmap tim AngularJS), struktur pertama dapat menambah performa aplikasi anda.

# Controllers

* Jangan memanipulasi DOM dari controller, akan membuat controller anda sulit di tes dan melawan prinsip [Separation of Concerns](https://en.wikipedia.org/wiki/Separation_of_concerns). Lebih baik gunakan directive.
* Untuk penamaan controller gunakan standar 'UpperCamelCase' dan harus sesuai dengan fungsionalitasnya (seperti: shopping cart, homepage, admin panel) dan diakhiri dengan `Ctrl` (`HomePageCtrl`, `ShoppingCartCtrl`, `AdminPanelCtrl`, dll.).
* Controller tidak boleh didefinisikan secara global (meskipun AngularJS mengijinkan hal ini, namun sangatlah tidak baik mengotori namespace global).
* Gunakan syntax array untuk definisi controller:


```JavaScript
module.controller('MyCtrl', ['dependency1', 'dependency2', ..., 'dependencyN', function (dependency1, dependency2, ..., dependencyN) {
  //...body
}]);
```


Gunakan cara definisi seperti ini untuk menghindarkan masalah minifikasi. Anda dapat secara otomatis menghasilkan definisi seperti di atas dengan menggunakan tool seperti [ng-annotate](https://github.com/olov/ng-annotate) (dan grunt task [grunt-ng-annotate](https://github.com/mzgol/grunt-ng-annotate)).
* Gunakan nama asli dari Dependency Injection, ini akan memudahkanmu membaca kode:

```JavaScript
module.controller('MyCtrl', ['$scope', function (s) {
  //...body
}]);
```

Akan lebih susah dimengerti daripada:

```JavaScript
module.controller('MyCtrl', ['$scope', function ($scope) {
  //...body
}]);
```

Hal ini akan sangat berguna ketika file yang anda baca cukup panjang.

* Buat controller sesimpel mungkin dan abstraksikan semua logika bisnis ke dalam service.
* Komunikasi dengan controller yang berbeda menggunakan method invocation (memungkinkan ketika child controller ingin berkomunikasi dengan parent controller) atau `$emit`, `$broadcast` dan `$on`. Pesan yang disebarkan harus seminimum mungkin.
* Buatlah daftar semua pesan yang digunakan `$emit`, `$broadcast` dan atur secara hati-hati untuk menghindari nama yang sama.
* Ketika anda ingin mengubah format tampilan data, gunakan [filter](#filters):

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
* Untuk controller yang bertumpuk, gunakan "nested scoping" dengan `controllerAs`:

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

# Directives

* Gunakan standar penamaan 'lowerCamelCase'.
* Gunakan `scope` daripada `$scope` di dalam link function. Pada saat proses kompilasi, post/pre link function yang telah didefinisikan dengan argumen, akan diberikan ketika fungsi tersebut dipanggil, anda tidak akan dapat mengubahnya dengan Dependency Injection. Cara ini juga digunakan di kode sumber AngularJS.
* Gunakan awalan yang berbeda untuk directive, untuk mencegah error karena penggunaan nama yang sama dengan third-party library.
* Jangan gunakan awalan `ng` atau `ui` karena telah digunakan untuk AngularJS dan AngularJS UI.
* Manipulasi DOM hanya dilakukan di dalam directive.
* Usahakan scope harus terisolasi ketika membuat komponen yang bisa digunakan kembali.
* Gunakan directive di atribut atau elemen daripada di komentar atau class, ini akan membuat kode lebih mudah dibaca.
* Gunakan `$scope.$on('$destroy', fn)` untuk membersihkan. Sangat berguna terutama ketika anda menggunakan third-party plugin sebagai directive.
* Jangan lupa gunakan `$sce` untuk konten yang tidak dapat dipercaya.

# Filters

* Gunakan standar penamaan 'lowerCamelCase'.
* Buat filter anda se-ringan mungkin karena sering dipanggil selama `$digest` loop.
* Fokus lakukan 1 hal saja untuk setiap filter. Untuk manipulasi lebih kompleks, lebih baik menggabungkan beberapa filter sekaligus.

# Services

Bagian ini adalah informasi tentang komponen service secara umum di AngularJS dan tidak spesifik tentang (`provider`, `.factory` atau `.service`), kecuali ditegaskan demikian.

* Gunakan standar penamaan 'camelCase'.
  * UpperCamelCase (PascalCase) untuk nama service apabila digunakan sebagai konstruktor, seperti:

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

  * lowerCamelCase untuk semua service yang lain.

* Enkapsulasikan semua logika bisnis di dalam service.
* Service yang merepresentasikan domain lebih baik adalah `service` daripada `factory`. Dengan begitu kita dapat lebih mudah mendapatkan keuntungan dari "klassical" inheritance:

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

* Untuk cache pada level session gunakan `$cacheFactory`. Ini harus digunakan untuk meng-cache hasil dari request atau komputasi yang berat.
* Jika sebuah service membutuhkan konfigurasi, maka definisikan service tersebut sebagai provider dan konfigurasikan service itu di dalam `config` callback seperti:

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

* Gunakan `ng-bind` atau `ng-cloak` daripada `{{ }}` untuk mencegah konten yang berkedip (flashing content).
* Hindari menulis ekspresi yang kompleks di dalam template.
* Gunakan `ng-src` dan `{{ }}` daripada hanya `src`
* Gunakan `ng-href` daripada `src` dan `{{ }}`
* Gunakan `ng-style` daripada `style` dan `{{ }}`

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

* Gunakan `resolve` untuk resolve dependencies sebelum view ditampilkan.

# Testing

TBD

Sampai bagian ini selesai, anda bisa menggunakan panduan [ini](https://github.com/daniellmb/angular-test-patterns) terlebih dahulu.

# Kontribusi

Karena panduan ini dibuat oleh komunitas, kontribusi sangatlah dihargai.
Contohnya, anda dapat berkontribusi dengan memperluas bagian testing atau dengan menerjemahkan panduan ini ke dalam bahasa anda.

# Kontributor

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

[![guiltry](http://www.gravatar.com/avatar/40711a2ce1c902845ea33ca0d64c4cd6.png?s=117)](https://github.com/guiltry) |
:---: |
[guiltry](https://github.com/guiltry) |
