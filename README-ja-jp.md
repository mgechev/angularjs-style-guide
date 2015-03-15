[![Join the chat at https://gitter.im/mgechev/angularjs-style-guide](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/mgechev/angularjs-style-guide?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# はじめに

このスタイルガイドの目的はAngularJSアプリケーションのベストプラクティスとスタイルガイドラインを提供することです。
これらのベストプラクティスは以下から集めたものです：

0. AngularJSソースコード
0. 私が読んだコードや文章
0. 私の経験

**注意1**： このスタイルガイドは草稿であり、その主な目的はコミュニティ駆動にすることです。足りない部分を補うことはコミュニティ全体から大きな賞賛を受けることになります。

**注意2**：
日本語版ガイドラインを読み始める前に、最新の状態であるか確認しましょう。[英語版](https://github.com/mgechev/angularjs-style-guide/blob/master/README.md)のAngularJSスタイルガイドが最新版のドキュメントになります。

当ガイドラインは、JavaScript開発のガイドラインではありません。JavaScript開発のガイドラインはこちらで見つけることができます：

0. [Google JavaScript スタイルガイド](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
0. [Mozilla JavaScript スタイルガイド](https://developer.mozilla.org/en-US/docs/Developer_Guide/Coding_Style)
0. [GitHub JavaScript スタイルガイド](https://github.com/styleguide/javascript)
0. [Douglas Crockford JavaScript スタイルガイド](http://javascript.crockford.com/code.html)
0. [Airbnb JavaScript スタイルガイド](https://github.com/airbnb/javascript)

AngularJS開発での推奨は[Google JavaScript スタイルガイド](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)です。

AngularJSのGitHub Wikiに[ProLoser](https://github.com/ProLoser)の書いた類似のセクションがあります。[こちら](https://github.com/angular/angular.js/wiki)から見つけることができます。

# 目次

* [全般](#全般)
    * [ディレクトリ構造](#ディレクトリ構造)
    * [マークアップ](#マークアップ)
    * [digestサイクルの最適化](#digestサイクルの最適化)
    * [その他](#その他)
* [モジュール](#モジュール)
* [コントローラ](#コントローラ)
* [ディレクティブ](#ディレクティブ)
* [フィルタ](#フィルタ)
* [サービス](#サービス)
* [テンプレート](#テンプレート)
* [ルーティング](#ルーティング)
* [i18n](#i18n)
* [コントリビューション](#コントリビューション)

# 全般

## ディレクトリ構造

AngularJSを用いて作った大きなアプリケーションは複数のコンポーネントを持つため、ディレクトリ階層でコンポーネントを構造化するのが最善です。
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

* ディレクトリ名に複数の単語が含まれる場合は、lisp-case構文で記述します：

```
app
 ├── app.js
 └── my-complex-module
     ├── controllers
     ├── directives
     ├── filters
     └── services
```

* ディレクティブに関連するファイル(例：templates, CSS/SASS files, JavaScript)は全て１つのディレクトリに格納しています。このスタイルを選択する場合は、プロジェクト全体に一貫してこのスタイルを適用します。

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

## digestサイクルの最適化

* 特に重要な変数に注意を払います（例：リアルタイム通信を使用する場合は、各受信メッセージ内で `$digest` ループが発生しないようにします）。
* 初期化後に変更のないコンテンツを扱う場合、AngularJSの古いバージョンでは[`bindonce`](https://github.com/Pasvaz/bindonce)のようなシングルタイム・ワッチャーを使います。AngularJSのバージョン1.3.0以降では組み込みのワンタイム・バインディングを利用します。
* $watch 内はできるだけシンプルな処理にします。一つの `$watch` 内で重くて遅い処理を作ってしまうとアプリケーション全体が遅くなります。(JavaScriptがシングルスレッドである性質上、 `$digest` のループはシングルスレッドで処理されます)。
* `$timeout` のコールバック関数が呼ばれることによって影響を受ける監視対象の変数がない場合に、 `$timeout` 関数の3番目のパラメタをfalseにすることで `$digest` ループをスキップします。

## その他

* これらを使うようにしましょう:
    * `setTimeout` の代わりに `$timeout`
    * `setInterval` の代わりに `$interval`
    * `window` の代わりに `$window`
    * `document` の代わりに `$document`
    * `$.ajax` の代わりに `$http`

これによってテストを簡単にし、いくつかのケースでは予期しない動作を防ぐことができます(例えば、 `$scope.$apply` を `setTimeout` 内に書き忘れる)。

* 以下のツールを使用してワークフローを自動化する：
    * [Yeoman](http://yeoman.io)
    * [Gulp](http://gulpjs.com)
    * [Grunt](http://gruntjs.com)
    * [Bower](http://bower.io)

* コールバックの代わりにpromise( `$q` )を使います。コードはよりエレガントでクリーンになり、コールバック地獄から解放されます。
* 可能な場合は `$http` の代わりに `$resource` を使います。抽象性を高めることにより冗長なコードから解放されます。
* AngularJS pre-minifier([ng-annotate](https://github.com/olov/ng-annotate))を使うことで、minifyした後に発生する問題を回避しましょう。
* グローバル変数を使用してはいけません。依存性の注入を使って全ての依存関係を解決することで、バグやテスト時のモンキーパッチを防ぎます。
* `$scope` を汚染してはいけません。テンプレートで使用するメソッドや変数のみ追加しましょう。
* [`ngInit` の代わりにcontroller](https://github.com/angular/angular.js/pull/4366/files)の使用を優先します。 `ngRepeat` のプロパティのエイリアスを作る場合にのみ `ngInit` を利用します。このケースに加え、スコープの変数を初期化する際にも `ngInit` よりもcontrollerを利用するべきです。
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

今現在、2つに大きな違いはありませんが、1.の方法がクリーンに見えます。また、もしモジュールの遅延ローディング・モジュールが実装されたら(AnglarJSのロードマップにはありませんが)、アプリケーションのパフォーマンスが向上するでしょう。

# コントローラ

* コントローラ内でDOMを操作してはいけません。テストがやりにくくなりますし、[関心の分離](https://en.wikipedia.org/wiki/Separation_of_concerns)の原則を破ることになります。代わりにティレクティブを使いましょう。
* コントローラ名は、そのコントローラの機能を表す名前(例: shopping cart, homepage, admin panel)にし、最後に `Ctrl` を付けます。UpperCamelCase(`HomePageCtrl`, `ShoppingCartCtrl`, `AdminPanelCtrl`, etc.)を使いましょう。
* コントローラはグローバルな名前空間に定義してはいけません。(たとえAngularJSが許可しても、グローバルな名前空間を汚染するバッドプラクティスになります)。
* コントローラの定義には下記の構文を使いましょう：

```JavaScript
function MyCtrl(dependency1, dependency2, ..., dependencyn) {
  // ...
}
module.controller('MyCtrl', MyCtrl);
```

minifyの問題を回避するために、[ng-annotate](https://github.com/olov/ng-annotate)や(grunt task [grunt-ng-annotate](https://github.com/mzgol/grunt-ng-annotate))などの標準的なツールを使って配列定義構文を自動的に生成することができます。
* 配列定義構文を利用する場合、コントローラの依存性の名前をそのまま使いましょう。読みやすいコードを書く助けになります：

```JavaScript
function MyCtrl(s) {
  // ...
}

module.controller('MyCtrl', ['$scope', MyCtrl]);
```

次のほうが読みやすくなります：

```JavaScript
function MyCtrl($scope) {
  // ...
}
module.controller('MyCtrl', ['$scope', MyCtrl]);
```

これは特に、スクロールが必要なほどとても多くのコードのあるファイルに当てはまります。どの変数がどの依存性と結びついているか忘れてしまうかもしれません。

* なるべく無駄のないようにコントローラを作りましょう。抽象的で広く使われているロジックはサービス内に入れましょう。
* メソッド呼び出し（子が親へアクセスしたいと思った時に利用可能）や `$emit` `$broadcast` `$on` メソッドで他のコントローラと連携を取るようにします。emitとbroadcastするメッセージは最小限に保ちましょう。
* `$emit` `$broadcast` に渡すメッセージは、名前の衝突やバグの可能性があるため、全てのメッセージのリストを作成しましょう。

例：

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

* ネストしたコントローラを利用する場合、ネストスコープ（ `controllerAs` 構文）を使います。

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
* link関数では `$scope` の代わりに `scope` を使用します。compileメソッドやpre/post link関数が呼び出されるときには、引数は定義済みです。あなたはDIを使用してそれらを変更することはできません。この方式はAngularJSのソースコードでも使用されています。
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

このセクションにはAngularJSのサービスコンポーネントについての情報を含みます。特に言及されていない限り、定義方法（例： プロバイダ、 `.factory` 、 `.service` ）とは関係ありません。

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

* ビジネスロジックはカプセル化してサービスに入れます。
* ドメインを表現するサービスはなるべく `factory` の代わりに `service` を利用するのがよいでしょう。"klassical"な継承を利用できるメリットがあります：

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
* `style` 属性を付ける際に `{{ }}` とともにscopeの変数を文字列として使う代わりに、 `ng-style` を利用することでオブジェクトのパラーメタのように記述できます。また、scopeの変数も値として利用できます：

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

# コントリビューション

このスタイルガイドの目的はコミュニティ駆動であることです。ご協力いただけると大変ありがたいです。例えば、テストセクションを拡張することによって、または、このスタイルガイドをあなたの言語に翻訳することによってコミュニティに貢献することができます。
