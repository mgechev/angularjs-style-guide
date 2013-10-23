#はじめに

このスタイルガイドのゴールは現在のAngularJSアプリケーションのベストプラクティスとガイドラインを提供することです。
これらのベストプラクティスは以下から集めたものです:

0. AngularJS ソースコード
0. 私が読んだコードや文章
0. 私の経験

**注意**: このスタイルガイドはまだドラフトであり、そのメインゴールはcommunity-drivenになることであり、そのためにコミュニティ全体との理解のギャップを大いに埋めることになるだろう。

ここでのガイドラインでは、JavaScript開発の共通のガイドラインではありません。それらはここで見つかります:

0. [Google JavaScript スタイルガイド](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
0. [Mozilla JavaScript スタイルガイド](https://developer.mozilla.org/en-US/docs/Developer_Guide/Coding_Style)
0. [GitHub JavaScript スタイルガイド](https://github.com/styleguide/javascript)
0. [Douglas Crockford JavaScript スタイルガイド](http://javascript.crockford.com/code.html)


AngularJS開発での推奨は[Google JavaScript スタイルガイド](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)です。

AngularJSのGitHub Wikiに[ProLoser](https://github.com/ProLoser)が書いた似たセクションがあります。 [ここ](https://github.com/angular/angular.js/wiki)からみつかります。

#目次
* [全般](#general)
    * [ディレクトリ構造](#directory-structure)
    * [digest cycle最適化](#optimize-the-digest-cycle)
    * [その他](#others)
* [モジュール](#modules)
* [コントローラー](#controllers)
* [ディレクティブ](#directives)
* [フィルター](#filters)
* [サービス](#services)
* [テンプレート](#templates)
* [ルーティング](#routing)
* [テスト](#testing)
* [コントリビュート](#contribution)

#全般

## ディレクトリ構造


AngularJS を用いて作った大きなアプリケーションは複数のコンポーネントを持ってるため、ディレクトリ階層でコンポーネントを構築するのが最も良いでしょう。
主に2つのアプローチがあります:

* 上の階層をコンポーネントタイプで分けて作成し、下の階層は機能性で分けて作成します。

この場合のディレクトリ構造は以下のようになります:

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

* 上の階層を機能性で分けて作成し、下の階層はコンポーネントタイプで分けて作成します。

レイアウトは以下のとおりです:

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

* ディレクティブを作成するとき、全てひとつのフォルダ内に入れてディレクティブファイル(テンプレート、CSS/SASS, JavaScript)として関連付けてしまうと便利です。もしこのスタイルを使う場合は、プロジェクト全体どこでもこのスタイルを一貫して使います。

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

この方法は、上記の両方のディレクトリ構造と組み合わせられます。
* 両方のディレクトリ構造のもう一つのバリエーションは[ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home)を使うことです。特定のコンポーネント中の単体テストは、コンポーネントが配置されているフォルダに配置されるようにします。この方法なら、あなたが特定のコンポーネントに変更を加えた時にそのテストを見つけるのが簡単になり、テスト自体がマニュアルやショーケースのようになります。

        services
        ├── cache
        │   ├── cache1.js
        │   └── cache1.spec.js
        └── models
            ├── model1.js
            └── model1.spec.js

* `app.js` ファイルはルート定義、設定(もし必要なら手動のブートストラップも）含まれています。
* JavaScriptファイルは単一のコンポーネントを保持する必要があります。ファイル名には、コンポーネント名を付ける必要があります。
* Angular プロジェクト構造のテンプレート[Yeoman](http://yeoman.io), [ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home)を使いましょう。

私は共通のコンポーネントを見つけるのが簡単になる最初の構造のほうが好みです。

コンポーネントの命名規則は、各コンポーネントのセクションで見つけられます。

## digest cycle最適化

* 最も重要な変数を見る (例: リアルタイム通信を使用する場合は、各受信メッセージ内で、digestループを引き起こしていないなど).
* $watch 内はできるだけシンプルな処理にする。一つの `$watch` 内で重くて遅い処理を作ってしまうとアプリケーション全体が遅くなります。( JavaScriptがシングルスレッドである性質上、$digest のループはシングルスレッドで処理されます)。

## その他

* 使用する:
    * `setTimeout` の代わりに `$timeout` を使う
    * `window` の代わりに `$window` を使う
    * `document` の代わりに `$document` を使う
    * `$.ajax` の代わりに `$http` を使う

これによってテストを簡単にし、いくつかのケースでは予期しない動作を防ぐことができます(例: `$scope.$apply` を `setTimeout` 内に書き忘れる)。

* 以下のツールを使用してワークフローを自動化する:
    * [Yeoman](http://yeoman.io)
    * [Grunt](http://gruntjs.com)
    * [Bower](http://bower.io)

* コールバックの代わりにpromise(`$q`)を使う。これであなたのコードはよりエレガントでクリーンになり、コールバック地獄からあなたを救うでしょう。
* 可能な場合は `$http` の代わりに `$resource` を使う。抽象度の高いコードは、冗長なコードからあなたを救います。
* AngularJS pre-minifier ([ngmin](https://github.com/btford/ngmin), [ng-annotate](https://github.com/olov/ng-annotate)) を使い、先にminifyすることで、後からminifyするときの問題を防止できます。
* グローバル変数を使用してはいけません。依存性の注入 を使って全ての依存関係を解決しましょう。
* `$scope` を汚してはいけません。テンプレートで使用するメソッドや変数のみ追加しましょう。

* [`ngInit` の代わりに controllers を使うほうがよい](https://github.com/angular/angular.js/pull/4366/files)。`ngInit` の唯一の適切な使用方法は `ngRepeat` のプロパティのエイリアスを作るのに使用する方法のみである。他にも、スコープ上の値を初期化するのに `ngInit` 使う必要はなく、controllers を使ったほうが良い。
* 変数名やメソッド名に`$`プレフィックスを使ってはいけません。このプレフィックスはAngularJSで予約されています。

#モジュール

モジュールを構造化する方法は一般的に2つあります:

0. 機能性
0. コンポーネントタイプ

今現在、2つに大きな違いはありませんが、1.の方法はクリーンに見えます。また、もしもモジュールの遅延ローディングが実装されたら(AnglarJSのロードマップにはありませんが)、アプリケーションのパフォーマンスが向上するでしょう。

#コントローラー

* コントローラー内でDOMを操作してはいけません。代わりにディレクティブを使いましょう。
* コントローラー名は、そのコントローラーの機能に則った名前を付けましょう(例: shopping cart, homepage, admin panel)。また、コントローラー名の最後には `Ctrl` を付けて、コントローラー名は UpperCamelCase (`HomePageCtrl`, `ShoppingCartCtrl`, `AdminPanelCtrl`, etc.)を使いましょう。
* コントローラーはグローバルな名前空間に定義してはいけません。 (たとえAngularJSが許可しても、グローバルな名前空間を汚すのはバッドプラクティスです)。
* コントローラーの定義には配列を使いましょう



        module.controller('MyCtrl', ['dependency1', 'dependency2', ..., 'dependencyn', function (dependency1, dependency2, ..., dependencyn) {
          //...body
        }]);


このようなタイプの定義を使用すると、 minify の問題を回避できます。[ng-annotate](https://github.com/olov/ng-annotate) (grunt task [grunt-ng-annotate](https://github.com/mzgol/grunt-ng-annotate))これらの標準的なツールを使えば配列定義を自動的に生成できます
*コントローラーの依存関係に則って名前を付けましょう。これはより読みやすいコードを生成するのに役立ちます:



        module.controller('MyCtrl', ['$scope', function (s) {
          //...body
        }]);


このコードは以下の方が読みやすい:


        module.controller('MyCtrl', ['$scope', function ($scope) {
          //...body
        }]);


これは特に、多くのコードをスクロールしながら眺める必要がある時に当てはまります。

* なるべく無駄のないようにコントローラーを作りましょう。抽象的で一般的な機能はサービス内に入れて使いましょう。
* メソッド呼び出しを使用して他のコントローラー内で通信したい場合(可能なら子供から親へと通信したい場合)、 `$emit` `$broadcast` `$on` メソッド使う場合、 broadcast する メッセージ は最小限に保ちましょう。
* `$emit` `$broadcast` に渡すメッセージは、名前の衝突やバグの可能性があるため、全てのメッセージのリストを作成・管理しましょう
* [filter](#filters)内に、データのフォーマットロジックを、カプセル化する必要がある場合、このように依存関係を宣言する:


        module.controller('myFormat', function () {
          return function () {
            //body...
          };
        });

        module.controller('MyCtrl', ['$scope', 'myFormatFilter', function ($scope, myFormatFilter) {
          //body...
        }]);

#ディレクティブ

* ディレクティブ名は lowerCamelCase
* linkメソッドには `$scope` の代わりに `scope` を使用しましょう。 compileメソッドやpre/post link メソッドが呼び出されるときには、 link メソッドに渡される引数は定義済みです。あなたは DI を使用してそれらを変更することはできません。このスタイルは AngularJS のソースコードでも使用されています。
* あなたのディレクティブ名にプレフィックス付けましょう。サードパーティ製ライブラリとの名前空間の衝突を防ぎます。
* `ng` や `ui` などのプレフィックスは使わないようにしましょう。これらはAngularJS や AngularJS UI で使うように予約されています。
* DOM 操作を行うのは全てディレクティブを介してのみにする必要があります。
* isolated スコープを作り、コンポーネントを再利用可能なように開発しましょう。

#フィルター

* フィルター名は lowerCamelCase
* フィルターを作るときにはできるだけ軽くしましょう。フィルターは `$digest` ループ内で頻繁に呼ばれるため、フィルターが遅いとあなたのアプリ全体が遅くなります。

#サービス

* サービス名は camelCase (lower or upper)
* サービスはカプセル化したビジネスロジックを入れましょう。
* サービスのビジネスロジックのカプセル化には `factory` の代わりに `service` が好ましいでしょう
* セッションレベルでのキャッシュには `$cacheFactory` が使えます。これはリクエスト結果をキャッシュしたい時や重い処理をキャッシュしたいときに使えます。

#テンプレート

* コンテンツの点滅を防ぐため、 `{{ }}` の代わりに `ng-bind` か `ng-cloak` を使いましょう。 
* テンプレートに複雑なコードを書くのは避けましょう。
* 動的な表現で `src` を設定する必要がある場合は `src` や `{{}}` の代わりに `ng-src` を使いましょう
* scope変数の代わりに文字列のように使いたいときや、 `style` 属性を `{{ }}` と一緒に使ってみたいとき、`ng-style` ディレクティブによって object-like パラメーターと、scope 変数をvalueと同様に使えます:

        ...
        $scope.divStyle = {
          width: 200,
          position: relative
        };
        ...

        <div ng-style="divStyle">my beautifully styled div which will work in IE</div>;

#ルーティング

* viewが表示される前に、 `resolve` を使って依存関係の解決をしましょう

#テスト

TBD

#コントリビュート

このスタイルガイドのゴールは community-driven であることです。よってコントリビュートをよろしくお願いします。
例えば、テストセクションを拡張することによって、または、このスタイルガイドをあなたの言語に翻訳することによって貢献することができます。

