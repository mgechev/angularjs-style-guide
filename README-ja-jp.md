#はじめに

このスタイルガイドのゴールは現在のAngularJSアプリケーションのベストプラクティスとガイドラインを提供することです。
これらのベストプラクティスは以下から集めたものです:

0. AngularJS ソースコード
0. 私が読んだコードや文章
0. 私の経験

**注意1**: このスタイルガイドはまだドラフトであり、そのメインゴールはcommunity-drivenになることであり、そのためにコミュニティ全体との理解のギャップを大いに埋めることになるだろう。

**注意2**:
日本語版ガイドラインを読み始める前に、最新の状態であるか確認しましょう。[英語版](https://github.com/mgechev/angularjs-style-guide/blob/master/README.md)のAngularJSスタイルガイドが最新版のドキュメントになります。

当ガイドラインは、JavaScript開発の共通のガイドラインではありません。それらはここで見つかります:

0. [Google JavaScript スタイルガイド](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
0. [Mozilla JavaScript スタイルガイド](https://developer.mozilla.org/en-US/docs/Developer_Guide/Coding_Style)
0. [GitHub JavaScript スタイルガイド](https://github.com/styleguide/javascript)
0. [Douglas Crockford JavaScript スタイルガイド](http://javascript.crockford.com/code.html)
0. [Airbnb JavaScript スタイルガイド](https://github.com/airbnb/javascript)

AngularJS開発での推奨は[Google JavaScript スタイルガイド](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)です。

AngularJSのGitHub Wikiに[ProLoser](https://github.com/ProLoser)が書いた似たセクションがあります。 [ここ](https://github.com/angular/angular.js/wiki)からみつかります。

#目次
* [全般](#全般)
    * [ディレクトリ構造](#ディレクトリ構造)
    * [マークアップ](#マークアップ)
    * [digestサイクルの最適化](#digestサイクルの最適化)
    * [その他](#その他)
* [モジュール](#モジュール)
* [コントローラー](#コントローラー)
* [ディレクティブ](#ディレクティブ)
* [フィルター](#フィルター)
* [サービス](#サービス)
* [テンプレート](#テンプレート)
* [ルーティング](#ルーティング)
* [テスト](#テスト)
* [コントリビュート](#コントリビュート)

#全般

## ディレクトリ構造


AngularJS を用いて作った大きなアプリケーションは複数のコンポーネントを持ってるため、ディレクトリ階層でコンポーネントを構築するのが最も良いでしょう。
主に2つのアプローチがあります:

* 上の階層をコンポーネントタイプで分けて、下の階層は機能性で分ける。

この場合のディレクトリ構造は以下のようになります:

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

* 上の階層を機能性で分けて、下の階層はコンポーネントタイプで分ける。

レイアウトは以下のとおりです:

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

* ディレクトリ名に複数の単語が含まれる場合は、lispケースで記述します:

```
app
 ├── app.js
 └── my-complex-module
     ├── controllers
     ├── directives
     ├── filters
     └── services
```

* ディレクティブを作成するとき、全てひとつのフォルダ内に入れてディレクティブファイル(テンプレート、CSS/SASS, JavaScript)として関連付けてしまうと便利です。もしこのスタイルを使う場合は、プロジェクト全体どこでもこのスタイルを一貫して使います。

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
* それぞれのディレクトリ構造のバリエーションとして[ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home)を利用するパターンがあります。特定のコンポーネント中の単体テストは、そのコンポーネントが配置されているフォルダ内に配置されます。このパターンでは特定のコンポーネントに変更を加えた際に、容易にテストを見つけることができます。テストはドキュメントやユースケースのようになります。

```
services
├── cache
│   ├── cache1.js
│   └── cache1.spec.js
└── models
    ├── model1.js
    └── model1.spec.js
```

* `app.js` ファイルはルート定義、設定(もし必要なら手動のブートストラップも）含まれています。
* JavaScriptファイルは単一のコンポーネントを保持する必要があります。ファイル名には、コンポーネント名を付ける必要があります。
* [Yeoman](http://yeoman.io)や[ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home)のようなAngularプロジェクト構造のテンプレートを使いましょう。

私は共通のコンポーネントを見つけるのが簡単になる最初の構造のほうが好みです。

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

* 特に重要な変数に注意を払います（例：リアルタイム通信を使用する場合は、各受信メッセージ内で`$digest`ループが発生しないようにします）。
* 初期化後に変更のないコンテンツを扱う場合、AngularJSの古いバージョンでは[`bindonce`](https://github.com/Pasvaz/bindonce)のようなシングルタイム・ワッチャーを使います。AngularJSのバージョン1.3.0以降では組み込みのワンタイム・バインディングを利用します。
* $watch 内はできるだけシンプルな処理にします。一つの `$watch` 内で重くて遅い処理を作ってしまうとアプリケーション全体が遅くなります。( JavaScriptがシングルスレッドである性質上、`$digest`のループはシングルスレッドで処理されます)。
* `$timeout`のコールバック関数が呼ばれることによって影響を受ける監視対象の変数がない場合に、`$digest`ループをスキップするために、`$timeout`関数の3番目のパラメタをfalseにします。

## その他

* 使用する:
    * `setTimeout` の代わりに `$timeout` を使う
    * `setInterval` の代わりに `$interval` を使う
    * `window` の代わりに `$window` を使う
    * `document` の代わりに `$document` を使う
    * `$.ajax` の代わりに `$http` を使う

これによってテストを簡単にし、いくつかのケースでは予期しない動作を防ぐことができます(例: `$scope.$apply` を `setTimeout` 内に書き忘れる)。

* 以下のツールを使用してワークフローを自動化する:
    * [Yeoman](http://yeoman.io)
    * [Gulp](http://gulpjs.com)
    * [Grunt](http://gruntjs.com)
    * [Bower](http://bower.io)

* コールバックの代わりにpromise(`$q`)を使います。コードはよりエレガントでクリーンになり、コールバック地獄から解放されます。
* 可能な場合は `$http` の代わりに `$resource` を使います。抽象性を高めることにより冗長なコードから解放されます。
* minifyした後に発生する問題を回避する為に、AngularJS pre-minifier ([ng-annotate](https://github.com/olov/ng-annotate)) を使います。
* グローバル変数を使用してはいけません。依存性の注入を使って全ての依存関係を解決することで、バグやテスト時のモンキーパッチを防ぎます。
* `$scope` を汚してはいけません。テンプレートで使用するメソッドや変数のみ追加しましょう。
* [`ngInit` の代わりに controller](https://github.com/angular/angular.js/pull/4366/files)の使用を優先します。`ngInit` の唯一の適切な使用方法は `ngRepeat` のプロパティのエイリアスを作る場合のみです。このケースに加え、スコープの変数を初期化する際にも`ngInit`よりもcontrollerを利用するべきです。
* 変数名やメソッド名に`$`プレフィックスを使ってはいけません。このプレフィックスはAngularJSによって予約されています。
* AngularJSの依存性の注入メカニズムによって依存性の解決を行う際には、AngularJSのビルトイン、カスタムというように並べます。

```javascript
module.factory('Service', function ($rootScope, $timeout, MyCustomDependency1, MyCustomDependency2) {
  return {
    //Something
  };
});
```

# モジュール

* モジュールはlowerCamelCaseで命名されるべきです。モジュール`b`がモジュール`a`のサブモジュールである場合、`a.b`のようにネームスペースを利用してネストすることができます。

モジュールを構造化する方法は一般的に2つあります:

0. 機能性
0. コンポーネントタイプ

今現在、2つに大きな違いはありませんが、1.の方法がクリーンに見えます。また、もしモジュールの遅延ローディング・モジュールが実装されたら(AnglarJSのロードマップにはありませんが)、アプリケーションのパフォーマンスが向上するでしょう。

# コントローラ

* コントローラ内でDOMを操作してはいけません。テストがしづらくなりますし、[関心の分離](https://en.wikipedia.org/wiki/Separation_of_concerns)の原則を破ることになります。代わりにティレクティブを使いましょう。
* コントローラ名は、そのコントローラの機能に則った名前をにしましょう(例: shopping cart, homepage, admin panel)。また、コントローラ名の最後には `Ctrl` を付けて、コントローラ名は UpperCamelCase (`HomePageCtrl`, `ShoppingCartCtrl`, `AdminPanelCtrl`, etc.)を使いましょう。
* コントローラはグローバルな名前空間に定義してはいけません。 (たとえAngularJSが許可しても、グローバルな名前空間を汚すのはバッドプラクティスです)。
* コントローラの定義には下記の構文を使いましょう：


```JavaScript
function MyCtrl(dependency1, dependency2, ..., dependencyn) {
  // ...
}
module.controller('MyCtrl', MyCtrl);
```

このようなタイプの定義を使用すると、 minify の問題を回避できます。[ng-annotate](https://github.com/olov/ng-annotate) (grunt task [grunt-ng-annotate](https://github.com/mzgol/grunt-ng-annotate))などの標準的なツールを使えば配列定義を自動的に生成できます
* 配列定義構文を利用する場合、コントローラの依存性の名前をそのまま使いましょう。読みやすいコードを書く助けになります：

```JavaScript
function MyCtrl(s) {
  // ...
}

module.controller('MyCtrl', ['$scope', MyCtrl]);
```

次のほうが読みやすくなります:

```JavaScript
function MyCtrl($scope) {
  // ...
}
module.controller('MyCtrl', ['$scope', MyCtrl]);
```

これは特に、スクロールが必要なほどとても多くのコードのあるファイルに当てはまります。ひょっとしたらあなたはどの変数がどの依存性を作っているかを忘れてしまうことになるでしょう。

* なるべく無駄のないようにコントローラーを作りましょう。抽象的で広く使われているロジックはサービス内に入れましょう。
* メソッド呼び出しを使用して他のコントローラー内で通信したい場合や(可能なら子供から親へと通信したい場合)、 `$emit` `$broadcast` `$on` メソッド使う場合、 emitとbroadcastするメッセージ は最小限に保ちましょう。
* `$emit` `$broadcast` に渡すメッセージは、名前の衝突やバグの可能性があるため、全てのメッセージのリストを作成・管理しましょう

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

* ネストしたコントローラを利用する場合、ネストスコープ（`controllerAs`構文）を使います。

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
* link関数では`$scope`の代わりに`scope`を使用します。compileメソッドやpre/post link 関数が呼び出されるときには、渡される引数は定義済みです。あなたはDIを使用してそれらを変更することはできません。この方式はAngularJSのソースコードでも使用されています。
* サードパーティ製ライブラリとの名前空間の衝突を防ぐために、新たに作成するディレクティブ名にはプレフィックスを付けましょう。
* `ng`や`ui`などのプレフィックスは使わないようにしましょう。これらはAngularJSやAngularJS UIによって予約されています。
* DOM操作を行うのは全てディレクティブを介してのみにします。
* 再利用可能なコンポーネントを開発する際は、分離スコープを作りましょう。
* ディレクティブはコメントやクラスではなく、属性やエレメントとして使います。これによって可読性が上がります。
* 後片付けのために`scope.$on('$destroy', fn)`を使いましょう。特にサードパーティー製のプラグインをディレクティブとして利用する際に便利です。
* 信用出来ない内容を扱う際には`$sce`を使うのを忘れないようにしましょう。

#フィルタ

* フィルター名は lowerCamelCase
* フィルターを作るときにはできるだけ軽くしましょう。フィルターは `$digest` ループ内で頻繁に呼ばれるため、フィルターが遅いとあなたのアプリ全体が遅くなります。

#サービス

* サービス名は camelCase (lower or upper)
* カプセル化したビジネスロジックはサービスに入れます。
* サービスカプセル化ビジネスロジックは `factory` の代わりに `service` が好ましいでしょう
* セッションレベルでのキャッシュには `$cacheFactory` が使えます。これはリクエスト結果をキャッシュしたい時や重い処理をキャッシュしたいときに使えます。

#テンプレート

* コンテンツの点滅を防ぐため、 `{{ }}` の代わりに `ng-bind` か `ng-cloak` を使いましょう。
* テンプレートに複雑なコードを書くのは避けましょう。
* 動的な表現で `src` を設定する必要がある場合は `src` や `{{}}` の代わりに `ng-src` を使いましょう
* scope の変数を文字列のように `style` 属性や、 `{{ }}` で使ってみたいとき、`ng-style` ディレクティブなら scope の変数を object-like パラメーターのように使えます:

```html
...
$scope.divStyle = {
  width: 200,
  position: 'relative'
};
...

<div ng-style="divStyle">my beautifully styled div which will work in IE</div>;
```

#ルーティング

* viewが表示される前に、 `resolve` を使って依存関係の解決をしましょう

#テスト

TBD

#コントリビュート

このスタイルガイドのゴールは community-driven であることです。よってコントリビュートをよろしくお願いします。
例えば、テストセクションを拡張することによって、または、このスタイルガイドをあなたの言語に翻訳することによって貢献することができます。
