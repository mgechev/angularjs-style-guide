[![Join the chat at https://gitter.im/mgechev/angularjs-style-guide](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/mgechev/angularjs-style-guide?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# はじめに

このスタイルガイドの目的はAngularJSアプリケーションのベストプラクティスとスタイルガイドラインを提供することです。
これらのベストプラクティスは以下から集めたものです：

0. AngularJSソースコード
0. 私が読んだコードや文章
0. 私の経験

**注意1**： このスタイルガイドは草稿であり、その主な目的はコミュニティ駆動にすることです。足りない部分を補うことはコミュニティ全体から大きな賞賛を受けることになります。

**注意2**：
 翻訳版のガイドラインを読み始める前に、それが最新の状態であるか確認しましょう。[英語版](https://github.com/mgechev/angularjs-style-guide/blob/master/README.md)のAngularJSスタイルガイドが最新版となります。

当ガイドラインは、JavaScript開発のガイドラインではありません。JavaScript開発のガイドラインはこちらで見つけることができます：

0. [Google JavaScript スタイルガイド](https://google.github.io/styleguide/javascriptguide.xml)
0. [Mozilla JavaScript スタイルガイド](https://developer.mozilla.org/en-US/docs/Developer_Guide/Coding_Style)
0. [Douglas Crockford JavaScript スタイルガイド](http://javascript.crockford.com/code.html)
0. [Airbnb JavaScript スタイルガイド](https://github.com/airbnb/javascript)

AngularJSの開発をする上でのおすすめは[Google JavaScript スタイルガイド](https://google.github.io/styleguide/javascriptguide.xml)です。

AngularJSのGitHub Wikiに[ProLoser](https://github.com/ProLoser)の書いた類似のセクションがあります。[こちら](https://github.com/angular/angular.js/wiki)で確認することができます。

# Translations

- [German](https://github.com/mgechev/angularjs-style-guide/blob/master/README-de-de.md)
- [Spanish](https://github.com/mgechev/angularjs-style-guide/blob/master/README-es-es.md)
- [French](https://github.com/mgechev/angularjs-style-guide/blob/master/README-fr-fr.md)
- [Indonesian](https://github.com/mgechev/angularjs-style-guide/blob/master/README-id-id.md)
- [Italian](https://github.com/mgechev/angularjs-style-guide/blob/master/README-it-it.md)
- [Japanese](https://github.com/mgechev/angularjs-style-guide/blob/master/README-ja-jp.md)
- [Korean](https://github.com/mgechev/angularjs-style-guide/blob/master/README-ko-kr.md)
- [Polish](https://github.com/mgechev/angularjs-style-guide/blob/master/README-pl-pl.md)
- [Portuguese](https://github.com/mgechev/angularjs-style-guide/blob/master/README-pt-br.md)
- [Russian](https://github.com/mgechev/angularjs-style-guide/blob/master/README-ru-ru.md)
- [Serbian](https://github.com/mgechev/angularjs-style-guide/blob/master/README-sr.md)
- [Serbian lat](https://github.com/mgechev/angularjs-style-guide/blob/master/README-sr-lat.md)
- [Chinese](https://github.com/mgechev/angularjs-style-guide/blob/master/README-zh-cn.md)
- [Turkish](https://github.com/mgechev/angularjs-style-guide/blob/master/README-tr-tr.md)

# 目次

* [全般](#全般)
    * [ディレクトリ構造](#ディレクトリ構造)
    * [マークアップ](#マークアップ)
    * [その他](#その他)
* [モジュール](#モジュール)
* [コントローラ](#コントローラ)
* [ディレクティブ](#ディレクティブ)
* [フィルタ](#フィルタ)
* [サービス](#サービス)
* [テンプレート](#テンプレート)
* [ルーティング](#ルーティング)
* [i18n](#i18n)
* [パフォーマンス](#パフォーマンス)
* [コントリビューション](#コントリビューション)
* [Contributors](#contributors)

# 全般

## ディレクトリ構造

規模の大きなAngularJSのアプリケーションは複数のコンポーネントを持つため、ディレクトリ階層でコンポーネントを構造化するのがよいでしょう。
主に2つのアプローチがあります：

* 上位の階層をコンポーネントの種類で分けて、下位の階層は機能性で分ける。

この場合のディレクトリ構造は以下のようになります：

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

* 上位の階層を機能性で分けて、下位の階層はコンポーネントの種類で分ける。

レイアウトは以下のとおりです：

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

* ディレクトリ名に複数の単語が含まれる場合は、lisp-caseシンタックスで記述します：

```
app
 ├── app.js
 └── my-complex-module
     ├── controllers
     ├── directives
     ├── filters
     └── services
```

* ディレクティブに関連するファイル(例：templates, CSS/SASS files, JavaScript)は全て１つのディレクトリに格納しています。このスタイルを選択する場合、プロジェクト全体に一貫してこのスタイルを適用します。

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

このアプローチは、上記のそれぞれのディレクトリ構造と組み合わせることができます。
* コンポーネントに対するユニット・テストは対象のコンポーネントが位置するディレクトリ内に置いてしまうべきです。特定のコンポーネントに変更を加えた際に、容易にテストを見つけることができます。テストはドキュメントやユースケースのような存在になります。

```
services
├── cache
│   ├── cache1.js
│   └── cache1.spec.js
└── models
    ├── model1.js
    └── model1.spec.js
```

* `app.js` ファイルにはルート定義、設定、(もし必要なら）手動のブートストラップも含まれるべきです。
* 1つのJavaScriptファイルには、１つのコンポーネントのみがあるようにします。ファイル名にはコンポーネント名を付けます。
* [Yeoman](http://yeoman.io)や[ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home)のようなAngularプロジェクト構造のテンプレートを使いましょう。

コンポーネントの命名に関する慣例は、各コンポーネントのセクションで見ることができます。

## マークアップ

[TLDR;](http://developer.yahoo.com/blogs/ydn/high-performance-sites-rule-6-move-scripts-bottom-7200.html) scriptは一番下に配置します。

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

シンプルに保ちましょう。AngularJS固有のディレクティブは後ろに配置しましょう。コードが見やすくなりますし、フレームワークによって拡張されたHTMLを見つけやすくなります（保守性も高くなります）。

```
<form class="frm" ng-submit="login.authenticate()">
  <div>
    <input class="ipt" type="text" placeholder="name" require ng-model="user.name">
  </div>
</form>
```

その他のHTML属性はCode Guideの[方針](http://mdo.github.io/code-guide/#html-attribute-order)に従うのがよいでしょう。

## その他

* これらを使うようにしましょう:
    * `setTimeout` の代わりに `$timeout`
    * `setInterval` の代わりに `$interval`
    * `window` の代わりに `$window`
    * `document` の代わりに `$document`
    * `$.ajax` の代わりに `$http`

テストがしやすくなり、また、予期しない動作を防ぐことができます(例えば、 `$scope.$apply` を `setTimeout` 内に書き忘れる)。

* 以下のツールを使用してワークフローを自動化しましょう：
    * [Yeoman](http://yeoman.io)
    * [Gulp](http://gulpjs.com)
    * [Grunt](http://gruntjs.com)
    * [Bower](http://bower.io)

* コールバックの代わりにpromise( `$q` )を使います。コードはよりエレガントですっきりとしますし、コールバック地獄から解放されます。
* できるだけ `$http` の代わりに `$resource` を使います。抽象性を高めることにより冗長なコードから解放されます。
* AngularJS pre-minifier([ng-annotate](https://github.com/olov/ng-annotate))を使うことで、minifyした後に発生する問題を回避しましょう。
* グローバル変数を使用してはいけません。依存性の注入を使って全ての依存関係を解決することで、バグやテスト時のモンキーパッチを防ぎます。
* GruntやGulpを使ってコードをIIFE（Immediately Invoked Function Expression）にラップすることによってglobalを使わないようにしましょう。プラグインとしては[grunt-wrap](https://www.npmjs.com/package/grunt-wrap) や [gulp-wrap](https://www.npmjs.com/package/gulp-wrap/) があります。Gulpを使った場合の例です。

	```Javascript
	gulp.src("./src/*.js")
    .pipe(wrap('(function(){\n"use strict";\n<%= contents %>\n})();'))
    .pipe(gulp.dest("./dist"));
    ```
* `$scope` を汚染してはいけません。テンプレートで使用するメソッドや変数のみ追加しましょう。
* [`ngInit` の代わりにcontroller](https://github.com/angular/angular.js/pull/4366/files)の使用を優先します。 `ngRepeat` のプロパティのエイリアスを作る場合にのみ `ngInit` を利用します。このケースに加え、スコープの変数を初期化する際にも `ngInit` よりもcontrollerを利用するべきです。 `ng-init` に渡されたエクスプレッションは `$parse` サービスに実装されたAngularのインタープリタによって字句解析されパースされ、評価されます。これは次のことを引き起こします。
  - インタープリタはJavaScriptで実装されているのでパフォーマンスに影響が出ます。
  - `$parse` サービス内でのパース済みエクスプレッションのキャッシュはうまい具外に働からないことが多いです。 `ng-init` エクスプレッションが多くの場合1度しか実行されないからです。
  - エラーを起こしやすくなります。文字列をテンプレートに書くことになるので、エディタのシンタックスハイライトやその他のサポートが効きません。
  - ランタイムエラーがでません。

* 変数名やメソッド名に `$` プレフィックスを使ってはいけません。このプレフィックスはAngularJSによって予約されています。
* AngularJSの依存性の注入メカニズムによって依存性の解決を行う際には、AngularJSのビルトイン、カスタムという順に並べます。

```javascript
module.factory('Service', function ($rootScope, $timeout, MyCustomDependency1, MyCustomDependency2) {
  return {
    //Something
  };
});
```

# モジュール

* モジュールはlowerCamelCaseで命名します。モジュール `b` がモジュール `a` のサブモジュールである場合、 `a.b` のようにネームスペースを利用してネストすることができます。

  モジュールを構造化する方法は一般的に2つあります：

  0. 機能性
  0. コンポーネントタイプ

  今現在、2つに大きな違いはありませんが、1.の方法がより整って見えます。また、もし遅延ローディング・モジュールが実装されたら(AnglarJSのロードマップにはありませんが)、アプリケーションのパフォーマンスが向上するでしょう。

# コントローラ

* コントローラ内でDOMを操作してはいけません。テストがしづらくなりますし、[関心の分離](https://en.wikipedia.org/wiki/Separation_of_concerns)の原則を破ることになります。代わりにティレクティブを使いましょう。
* コントローラ名は、そのコントローラの機能を表す名前(例: shopping cart, homepage, admin panel)にし、最後に `Ctrl` を付けます。
* コントローラは素のJavascriptなので（[constructors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)）、命名はUpperCamelCase(`HomePageCtrl`, `ShoppingCartCtrl`, `AdminPanelCtrl`, etc.)を使います。
* コントローラはグローバルな名前空間に定義してはいけません。(たとえAngularJSが許可しても、グローバルな名前空間を汚染するバッドプラクティスになります)。
* コントローラの定義には下記のシンタックスを使いましょう：

  ```JavaScript
  function MyCtrl(dependency1, dependency2, ..., dependencyn) {
    // ...
  }
  module.controller('MyCtrl', MyCtrl);
  ```

  minifyの問題を回避するために、[ng-annotate](https://github.com/olov/ng-annotate)や(grunt task [grunt-ng-annotate](https://github.com/mzgol/grunt-ng-annotate))などの標準的なツールを使って配列定義シンタックスを自動的に生成することができます。
* `controller as`シンタックスを使いましょう。

   ```
   <div ng-controller="MainCtrl as main">
      {{ main.title }}
   </div>
   ```

   ```JavaScript
   app.controller('MainCtrl', MainCtrl);

   function MainCtrl () {
      this.title = 'Some title';
   };
   ```

   このシンタックスを使う利点は下記のとおりです：
   * '分離' されたコンポーネントが作成される。バインドされたプロパティは `$scope` プロトタイプ・チェーンに含まれません。 `$scope` プロトタイプ継承は大きな欠点（多分この欠点のために Angular 2 では採用されていません）があるのでこれは良いやり方です。
      * データがどこから来たのかわからない。
      * スコープの値の変更が想定していないところに影響する。
      * リファクタが大変になる。
      * '[ドット・ルール](http://jimhoskins.com/2012/12/14/nested-scopes-in-angularjs.html)' 。
   * 特別な事情（ `$scope.$broadcast`など ）がない限り、 `$scope` は使わないようにしましょう。これはAngularJS V2 への良い備えになります。
   * シンタックスは 'vanilla' JavaScriptのコンストラクタに近いです。

   `controller as` について詳しくは、 [digging-into-angulars-controller-as-syntax](http://toddmotto.com/digging-into-angulars-controller-as-syntax/) を参照してください。
* 配列で定義する場合は、依存性の正しい名前を使いましょう。コードが読みやすくなります:

  ```JavaScript
  function MyCtrl(s) {
    // ...
  }

  module.controller('MyCtrl', ['$scope', MyCtrl]);
  ```

   次に書くようにすることで読みやすくなります:

  ```JavaScript
  function MyCtrl($scope) {
    // ...
  }
  module.controller('MyCtrl', ['$scope', MyCtrl]);
  ```
   特にスクロールしなければ読みきれないようなコードを含んだファイルに適用します。どの変数がどの依存性に結びついているのか忘れてしまうことを防げます。

* なるべく無駄のないようにコントローラを作りましょう。抽象的で広く使われているロジックはサービス内に入れましょう。
* ビジネスロジックをコントローラ内に書かないようにしましょう。ビジネスロジックは、サービスを使って `model` に委譲します。
  例:

  ```Javascript
  //これはビジネスロジックをコントローラの中に書く良く行われる例です（悪い例ですが）
  angular.module('Store', [])
  .controller('OrderCtrl', function ($scope) {

    $scope.items = [];

    $scope.addToOrder = function (item) {
      $scope.items.push(item);//-->Business logic inside controller
    };

    $scope.removeFromOrder = function (item) {
      $scope.items.splice($scope.items.indexOf(item), 1);//-->Business logic inside controller
    };

    $scope.totalPrice = function () {
      return $scope.items.reduce(function (memo, item) {
        return memo + (item.qty * item.price);//-->Business logic inside controller
      }, 0);
    };
  });
  ```

  `model` にビジネスロジックを委譲すると、コントローラはこのようになります（）。
  When delegating business logic into a 'model' service, controller will look like this (サービスモデルの実装はサービスの項目で確認できます):

  ```Javascript
  //Orderは `model` として扱われています
  angular.module('Store', [])
  .controller('OrderCtrl', function (Order) {

    $scope.items = Order.items;

    $scope.addToOrder = function (item) {
      Order.addToOrder(item);
    };

    $scope.removeFromOrder = function (item) {
      Order.removeFromOrder(item);
    };

    $scope.totalPrice = function () {
      return Order.total();
    };
  });
  ```

  どうしてビジネスロジックとステートをコントローラの中に書くのが悪いのでしょうか？
  * コントローラはそれぞれのビューで生成され、ビューがアンロードされた時に消滅します。
  * コントローラはビューと結びついているので再利用可能なものではありません。
  * コントローラはインジェクションできません。

   Example:

   ```JavaScript
   // app.js
   /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
   Custom events:
     - 'authorization-message' - description of the message
       - { user, role, action } - data format
         - user - a string, which contains the username
         - role - an ID of the role the user has
         - action - specific ation the user tries to perform
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
   ```

* データのフォーマットロジックを、[filter](#フィルタ)内にカプセル化する必要がある場合、このように依存関係を宣言します：

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

* ネストしたコントローラを利用する場合、ネストスコープ（ `controllerAs` シンタックス）を使います。

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

# ディレクティブ

* ディレクティブ名はlowerCamelCaseで記述します。
* link関数では `$scope` の代わりに `scope` を使用します。compileメソッドやpre/post link関数が呼び出されるときには、引数は定義済みです。DIを使用してそれらを変更することはできません。この方式はAngularJSのソースコードでも使用されています。
* サードパーティ製ライブラリとの名前空間の衝突を防ぐために、新たに作成するディレクティブ名にはプレフィックスを付けましょう。
* `ng` や `ui` などのプレフィックスは使わないようにしましょう。これらはAngularJSやAngularJS UIによって予約されています。
* DOMの操作は全てディレクティブを介してのみ行うようにします。
* 再利用可能なコンポーネントを開発する際は、分離スコープを作りましょう。
* ディレクティブはコメントやクラスではなく、属性やエレメントとして使います。これによって可読性が上がります。
* 後片付けのために `scope.$on('$destroy', fn)` を使いましょう。特にサードパーティー製のプラグインをディレクティブとして利用する際に便利です。
* 信用出来ない内容を扱う際には `$sce` を忘ずに使いましょう。

# フィルタ

* フィルタ名はlowerCamelCaseで記述します。
* できるだけ軽量なフィルタを作りましょう。フィルタは `$digest` ループ内で頻繁に呼ばれるため、フィルタが遅いとアプリ全体が遅くなります。
* 明瞭さを保つために１つのフィルタでは1つのことだけをやらせましょう。複雑な操作は既存のフィルタのパイプで行います。

# サービス

このセクションにはAngularJSのサービスコンポーネントについての情報を含みます。特に言及されていない限り、定義方法（例： プロバイダ、 `.factory` 、 `.service` ）と関係しています。

* サービス名はcamelCaseで記述します。
  * コンストラクタ関数として利用される場合、サービス名はUpperCamelCase(PascalCase)で記述します。例：

    ```JavaScript
    function MainCtrl($scope, User) {
      $scope.user = new User('foo', 42);
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

  * その他のサービス名はlowerCamelCaseで記述します。

* ビジネスロジックはカプセル化してサービスに入れます。 `model` として利用するのがよいでしょう。例えば:

  ```Javascript
  //Order is the 'model'
  angular.module('Store')
  .factory('Order', function () {
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


  Controllersの項目でコントローラがこのサービスを使った例はを確認できます。
* 問題領域(ドメイン)に関わる処理を行うサービスは `factory` の代わりに `service` を利用するのがよいでしょう。"klassical"な継承を利用できるメリットがあります：

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

* セッションレベルでのキャッシュには `$cacheFactory` が使えます。これはリクエスト結果をキャッシュしたい時や重い処理をキャッシュしたいときに使えます。
* 設定が必要なサービスを利用する場合は、サービスをプロバイダとして利用し、 `config` コールバックで設定をします。

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

# テンプレート

* コンテンツのチラつきを防ぐため、 `{{ }}` の代わりに `ng-bind` か `ng-cloak` を使いましょう。
* テンプレートに複雑なコードを書くのは避けましょう。
* イメージを動的に読み込むために `src` を使う必要がある場合は `src` と `{{ }}` を組み合わせて使う代わりに `ng-src` を使いましょう。
* アンカータグの `href` の内容が動的な場合は、 `href` と `{{ }}` を組み合わせて使う代わりに `ng-href` を使いましょう。
* `style` 属性を付ける際に `{{ }}` とともにscopeの変数を文字列として使う代わりに、 `ng-style` を利用することでオブジェクトのパラメータのように記述できます。また、scopeの変数も値として利用できます：

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

# ルーティング

* ビューが表示される前に、 `resolve` を使って依存関係の解決をしましょう。
* `resolve` コールバックの中に明示的なRESTfulの呼び出しはしないようにしましょう。全てのリクエストは適切なサービスに隠蔽します。この方法でキャッシュを使うことができますし、関心の分離の原則に則ることができます。

# i18n

* バージョン1.4.0以降でビルトインのi18nツールを利用することができます。1.4.0より前のバージョンを利用している場合は、[`angular-translate`](https://github.com/angular-translate/angular-translate)を利用することができます。

# パフォーマンス

* digestサイクルの最適化

  * 特に重要な変数に対してのみ監視を行います。 `$digest` ループを明示的に記述する必要がある場合（例外的なケースだと思いますが）、本当に必要なときにのみ呼び出すようにします。（例えば、リアルタイム通信を使用する場合は、各受信メッセージ内で `$digest` ループが発生しないようにします）。
  * 初期化後に変更のないコンテンツを扱う場合、AngularJSの古いバージョンでは[`bindonce`](https://github.com/Pasvaz/bindonce)のようなシングルタイム・ワッチャーを使います。AngularJSのバージョン1.3.0以降では組み込みのワンタイム・バインディングを利用します。
  * `$watch` 内はできるだけシンプルな処理にします。一つの `$watch` 内で重くて遅い処理を作ってしまうとアプリケーション全体が遅くなってしまいます。(JavaScriptがシングルスレッドである性質上、 `$digest` のループはシングルスレッドで処理されます)。
  * コレクションを監視する場合、ほんとうに必要でなければオブジェクトの中身まで監視をするのはやめましょう。 `$watchCollection` を用いて同等性の浅いレベルでの監視にとどめておくべきです。
  * `$timeout` のコールバック関数が呼ばれることによって影響を受ける監視対象の変数がない場合に、 `$timeout` 関数の3番目のパラメータをfalseにすることで `$digest` ループをスキップします。
  * 巨大なコレクションを扱う場合、それはほとんど変更されません。[不可変データ構造を利用しましょう](http://blog.mgechev.com/2015/03/02/immutability-in-angularjs-immutablejs)。 -->

# コントリビューション

このスタイルガイドの目的はコミュニティ駆動であることです。ご協力いただけると大変ありがたいです。例えば、テストセクションを拡張することによって、または、このスタイルガイドをあなたの言語に翻訳することによってコミュニティに貢献することができます。

# Contributors

[<img alt="mgechev" src="https://avatars.githubusercontent.com/u/455023?v=3&s=117" width="117">](https://github.com/mgechev) |[<img alt="morizotter" src="https://avatars.githubusercontent.com/u/536954?v=3&s=117" width="117">](https://github.com/morizotter) |[<img alt="pascalockert" src="https://avatars.githubusercontent.com/u/4253438?v=3&s=117" width="117">](https://github.com/pascalockert) |[<img alt="ericguirbal" src="https://avatars.githubusercontent.com/u/322135?v=3&s=117" width="117">](https://github.com/ericguirbal) |[<img alt="yanivefraim" src="https://avatars.githubusercontent.com/u/1336186?v=3&s=117" width="117">](https://github.com/yanivefraim) |[<img alt="mainyaa" src="https://avatars.githubusercontent.com/u/800781?v=3&s=117" width="117">](https://github.com/mainyaa) |
:---: |:---: |:---: |:---: |:---: |:---: |
[mgechev](https://github.com/mgechev) |[morizotter](https://github.com/morizotter) |[pascalockert](https://github.com/pascalockert) |[ericguirbal](https://github.com/ericguirbal) |[yanivefraim](https://github.com/yanivefraim) |[mainyaa](https://github.com/mainyaa) |

[<img alt="elfinxx" src="https://avatars.githubusercontent.com/u/4384908?v=3&s=117" width="117">](https://github.com/elfinxx) |[<img alt="agnislav" src="https://avatars.githubusercontent.com/u/364255?v=3&s=117" width="117">](https://github.com/agnislav) |[<img alt="Xuefeng-Zhu" src="https://avatars.githubusercontent.com/u/5875315?v=3&s=117" width="117">](https://github.com/Xuefeng-Zhu) |[<img alt="lukaszklis" src="https://avatars.githubusercontent.com/u/11782?v=3&s=117" width="117">](https://github.com/lukaszklis) |[<img alt="previousdeveloper" src="https://avatars.githubusercontent.com/u/6371971?v=3&s=117" width="117">](https://github.com/previousdeveloper) |[<img alt="susieyy" src="https://avatars.githubusercontent.com/u/62295?v=3&s=117" width="117">](https://github.com/susieyy) |
:---: |:---: |:---: |:---: |:---: |:---: |
[elfinxx](https://github.com/elfinxx) |[agnislav](https://github.com/agnislav) |[Xuefeng-Zhu](https://github.com/Xuefeng-Zhu) |[lukaszklis](https://github.com/lukaszklis) |[previousdeveloper](https://github.com/previousdeveloper) |[susieyy](https://github.com/susieyy) |

[<img alt="rubystream" src="https://avatars.githubusercontent.com/u/3200?v=3&s=117" width="117">](https://github.com/rubystream) |[<img alt="cironunes" src="https://avatars.githubusercontent.com/u/469908?v=3&s=117" width="117">](https://github.com/cironunes) |[<img alt="cavarzan" src="https://avatars.githubusercontent.com/u/3915288?v=3&s=117" width="117">](https://github.com/cavarzan) |[<img alt="guiltry" src="https://avatars.githubusercontent.com/u/1484308?v=3&s=117" width="117">](https://github.com/guiltry) |[<img alt="tornad" src="https://avatars.githubusercontent.com/u/2128499?v=3&s=117" width="117">](https://github.com/tornad) |[<img alt="jmblog" src="https://avatars.githubusercontent.com/u/86085?v=3&s=117" width="117">](https://github.com/jmblog) |
:---: |:---: |:---: |:---: |:---: |:---: |
[rubystream](https://github.com/rubystream) |[cironunes](https://github.com/cironunes) |[cavarzan](https://github.com/cavarzan) |[guiltry](https://github.com/guiltry) |[tornad](https://github.com/tornad) |[jmblog](https://github.com/jmblog) |

[<img alt="kuzzmi" src="https://avatars.githubusercontent.com/u/1727140?v=3&s=117" width="117">](https://github.com/kuzzmi) |[<img alt="dchest" src="https://avatars.githubusercontent.com/u/52677?v=3&s=117" width="117">](https://github.com/dchest) |[<img alt="clbn" src="https://avatars.githubusercontent.com/u/1071933?v=3&s=117" width="117">](https://github.com/clbn) |[<img alt="apetro" src="https://avatars.githubusercontent.com/u/952283?v=3&s=117" width="117">](https://github.com/apetro) |[<img alt="valgreens" src="https://avatars.githubusercontent.com/u/903263?v=3&s=117" width="117">](https://github.com/valgreens) |[<img alt="astalker" src="https://avatars.githubusercontent.com/u/1486567?v=3&s=117" width="117">](https://github.com/astalker) |
:---: |:---: |:---: |:---: |:---: |:---: |
[kuzzmi](https://github.com/kuzzmi) |[dchest](https://github.com/dchest) |[clbn](https://github.com/clbn) |[apetro](https://github.com/apetro) |[valgreens](https://github.com/valgreens) |[astalker](https://github.com/astalker) |

[<img alt="bradgearon" src="https://avatars.githubusercontent.com/u/1731943?v=3&s=117" width="117">](https://github.com/bradgearon) |[<img alt="dreame4" src="https://avatars.githubusercontent.com/u/277870?v=3&s=117" width="117">](https://github.com/dreame4) |[<img alt="gsamokovarov" src="https://avatars.githubusercontent.com/u/604618?v=3&s=117" width="117">](https://github.com/gsamokovarov) |[<img alt="grvcoelho" src="https://avatars.githubusercontent.com/u/7416751?v=3&s=117" width="117">](https://github.com/grvcoelho) |[<img alt="bargaorobalo" src="https://avatars.githubusercontent.com/u/993001?v=3&s=117" width="117">](https://github.com/bargaorobalo) |[<img alt="olov" src="https://avatars.githubusercontent.com/u/19247?v=3&s=117" width="117">](https://github.com/olov) |
:---: |:---: |:---: |:---: |:---: |:---: |
[bradgearon](https://github.com/bradgearon) |[dreame4](https://github.com/dreame4) |[gsamokovarov](https://github.com/gsamokovarov) |[grvcoelho](https://github.com/grvcoelho) |[bargaorobalo](https://github.com/bargaorobalo) |[olov](https://github.com/olov) |

[<img alt="hermankan" src="https://avatars.githubusercontent.com/u/2899106?v=3&s=117" width="117">](https://github.com/hermankan) |[<img alt="jesselpalmer" src="https://avatars.githubusercontent.com/u/682097?v=3&s=117" width="117">](https://github.com/jesselpalmer) |[<img alt="capaj" src="https://avatars.githubusercontent.com/u/1305378?v=3&s=117" width="117">](https://github.com/capaj) |[<img alt="johnnyghost" src="https://avatars.githubusercontent.com/u/1117330?v=3&s=117" width="117">](https://github.com/johnnyghost) |[<img alt="jordanyee" src="https://avatars.githubusercontent.com/u/3303098?v=3&s=117" width="117">](https://github.com/jordanyee) |[<img alt="nacyot" src="https://avatars.githubusercontent.com/u/148919?v=3&s=117" width="117">](https://github.com/nacyot) |
:---: |:---: |:---: |:---: |:---: |:---: |
[hermankan](https://github.com/hermankan) |[jesselpalmer](https://github.com/jesselpalmer) |[capaj](https://github.com/capaj) |[johnnyghost](https://github.com/johnnyghost) |[jordanyee](https://github.com/jordanyee) |[nacyot](https://github.com/nacyot) |

[<img alt="mariolamacchia" src="https://avatars.githubusercontent.com/u/6282722?v=3&s=117" width="117">](https://github.com/mariolamacchia) |[<img alt="kirstein" src="https://avatars.githubusercontent.com/u/426442?v=3&s=117" width="117">](https://github.com/kirstein) |[<img alt="mo-gr" src="https://avatars.githubusercontent.com/u/95577?v=3&s=117" width="117">](https://github.com/mo-gr) |[<img alt="cryptojuice" src="https://avatars.githubusercontent.com/u/458883?v=3&s=117" width="117">](https://github.com/cryptojuice) |[<img alt="jabhishek" src="https://avatars.githubusercontent.com/u/1830537?v=3&s=117" width="117">](https://github.com/jabhishek) |[<img alt="vorktanamobay" src="https://avatars.githubusercontent.com/u/2623355?v=3&s=117" width="117">](https://github.com/vorktanamobay) |
:---: |:---: |:---: |:---: |:---: |:---: |
[mariolamacchia](https://github.com/mariolamacchia) |[kirstein](https://github.com/kirstein) |[mo-gr](https://github.com/mo-gr) |[cryptojuice](https://github.com/cryptojuice) |[jabhishek](https://github.com/jabhishek) |[vorktanamobay](https://github.com/vorktanamobay) |

[<img alt="sahat" src="https://avatars.githubusercontent.com/u/544954?v=3&s=117" width="117">](https://github.com/sahat) |[<img alt="kaneshin" src="https://avatars.githubusercontent.com/u/936972?v=3&s=117" width="117">](https://github.com/kaneshin) |[<img alt="imaimiami" src="https://avatars.githubusercontent.com/u/2256037?v=3&s=117" width="117">](https://github.com/imaimiami) |[<img alt="thomastuts" src="https://avatars.githubusercontent.com/u/1914255?v=3&s=117" width="117">](https://github.com/thomastuts) |[<img alt="grapswiz" src="https://avatars.githubusercontent.com/u/309459?v=3&s=117" width="117">](https://github.com/grapswiz) |[<img alt="coderhaoxin" src="https://avatars.githubusercontent.com/u/2569835?v=3&s=117" width="117">](https://github.com/coderhaoxin) |
:---: |:---: |:---: |:---: |:---: |:---: |
[sahat](https://github.com/sahat) |[kaneshin](https://github.com/kaneshin) |[imaimiami](https://github.com/imaimiami) |[thomastuts](https://github.com/thomastuts) |[grapswiz](https://github.com/grapswiz) |[coderhaoxin](https://github.com/coderhaoxin) |

[<img alt="ntaoo" src="https://avatars.githubusercontent.com/u/511213?v=3&s=117" width="117">](https://github.com/ntaoo) |[<img alt="kuzmeig1" src="https://avatars.githubusercontent.com/u/8707951?v=3&s=117" width="117">](https://github.com/kuzmeig1) |
:---: |:---: |
[ntaoo](https://github.com/ntaoo) |[kuzmeig1](https://github.com/kuzmeig1) |
