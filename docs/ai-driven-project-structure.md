
# AI駆動開発向け シンプル構成案

非エンジニアでも迷いにくく、Claude Code や Codex で回しやすいことを優先した、できるだけ薄いディレクトリ構成案。

今回は意図的に複雑さを削り、考える場所を最小限にしています。

## 結論

分けるのは基本的に3つだけです。

- `master/`  
  全案件で使い回すもの
- `projects/`  
  案件ごとの材料、進行中ドキュメント、成果物
- `.claude/rules/`  
  AI エージェントの挙動ルール

## 推奨ルート構成

```text
├── .claude/
│   └── rules/
│       ├── common-workflow.md
│       ├── document-output.md
│       └── build-policy.md
├── master/
│   ├── design/
│   ├── assets/
│   ├── templates/
│   └── docs/
├── projects/
│   └── YYYYMMDD_案件名/
│       ├── README.md
│       ├── input/
│       ├── working/
│       └── output/
└── scratch/
```

`scratch/` は AI に雑に試させる場所です。正式な案件ファイルと混ぜません。

## これで十分な理由

初心者が迷うのは、たいていファイル名ではなく「どこに置くか」です。  
なので案件側は細かく分けず、まずは3フォルダで固定します。

- `input/` = 最初にもらったもの
- `working/` = 進行中に更新されるもの
- `output/` = 最終的に使うもの

この3つだけなら、かなり迷いにくくなります。

## `master/` の考え方

`master/` は「案件をまたいで再利用するもの」だけを置く場所です。

```text
master/
├── design/
│   ├── design-system.md
│   ├── ui-patterns.md
│   └── copy-guidelines.md
├── assets/
│   ├── images/
│   ├── icons/
│   └── brand/
├── templates/
│   ├── project-template/
│   │   ├── README.md
│   │   ├── input/
│   │   │   ├── manifest.md
│   │   │   ├── source-files/
│   │   │   └── links.md
│   │   ├── working/
│   │   │   ├── updates/
│   │   │   ├── requirements.md
│   │   │   ├── tasks.md
│   │   │   └── notes/
│   │   └── output/
│   │       ├── site/
│   │       ├── app/
│   │       └── deliverables/
│   ├── manifest.md
│   ├── requirements.md
│   ├── meeting-note.md
│   └── project-readme.md
└── docs/
    ├── business.md
    ├── service-overview.md
    └── case-studies.md
```

### `master/` に置くもの

- デザインシステム
- 共通アセット
- テンプレート
- 共通説明資料
- 使い回すコピーや表現ルール

### `master/` に置かないもの

- 特定顧客だけの資料
- 特定案件の議事録
- 特定案件の要件定義
- 特定案件でもらった原本 Excel や PDF

## 案件側はこの形で固定

```text
projects/YYYYMMDD_案件名/
├── README.md
├── input/
│   ├── manifest.md
│   ├── source-files/
│   └── links.md
├── working/
│   ├── updates/
│   ├── requirements.md
│   ├── tasks.md
│   └── notes/
└── output/
    ├── site/
    ├── app/
    └── deliverables/
```

案件を新しく始めるときは、毎回ゼロから手で切るのではなく、
`master/templates/project-template/` を複製して
`projects/YYYYMMDD_案件名/` にリネームして使う運用にすると安定します。

## 各フォルダの役割

### `input/`

人間が最初に入れる場所です。

- `manifest.md`
  音声入力や雑メモで入れる最初の構想
- `source-files/`
  顧客から共有された Excel、PDF、画像、資料原本
- `links.md`
  参考リンク、競合、参考サイト

ここは整っていなくて構いません。  
むしろ「雑に入れてよい箱」と明確にするのが大事です。

### テンプレート複製の考え方

`master/templates/project-template/` には、案件開始時に最初から必要になる
最低限の空フォルダと雛形だけを入れておきます。

- `README.md`
  案件の概要や参照先を書く
- `input/manifest.md`
  最初の構想を書く
- `working/requirements.md`
  要件整理の起点
- `working/tasks.md`
  実務タスクの一覧
- `working/updates/`
  打ち合わせメモを追加していく場所

このテンプレートを複製してから案件名に合わせてフォルダ名を変えると、
人間も AI も毎回同じ前提で始められます。

### `working/`

AI と人間で進めながら育てる場所です。

- `updates/`
  打ち合わせごとの議事録、文字起こし要約、判断ログを
  `YYYYMMDD_打ち合わせ名.md` のように1ファイルずつ追加
- `requirements.md`
  今の要件定義
- `tasks.md`
  やること一覧
- `notes/`
  検討メモ、叩き台、補助資料

案件中に見る場所は、基本ここだけで十分です。

### `output/`

外に出せる成果物だけを置く場所です。

- `site/`
  LP、提案サイト、ストーリーブック
- `app/`
  アプリやプロトタイプ
- `deliverables/`
  顧客共有資料、納品物、完成版ドキュメント

## デザインはできるだけ `master/` に寄せる

この考え方でよいです。  
案件ごとにゼロからデザインを持つより、以下を `master/design/` に寄せた方が運用しやすいです。

- カラー
- タイポグラフィ
- 余白ルール
- ボタンやカードなどの UI パターン
- コピーのトーン
- アニメーション方針

案件側では「この案件でどのパターンを使うか」だけ決めます。  
つまり、デザインシステムは共通、使い方だけ案件ごとに変えるイメージです。

## `.claude/rules/` を明示的に使う

これはかなり相性がいいです。  
ディレクトリ構造だけでなく、AI の振る舞いを一定にするレイヤーとして使います。

```text
.claude/
└── rules/
    ├── common-workflow.md
    ├── document-output.md
    ├── design-usage.md
    └── build-policy.md
```

### 役割の分け方

- `common-workflow.md`
  AI がまず何を読むか、どの順で進めるか
- `document-output.md`
  要件定義書や議事録の書き方
- `design-usage.md`
  `master/design/` をどう参照するか
- `build-policy.md`
  実装先、技術方針、ファイル配置ルール

### ここに書くべきこと

- 最初に `projects/<案件>/input/manifest.md` を読む
- 次に `working/requirements.md` と `working/updates/` 配下の最新メモを読む
- デザインは `master/design/` を優先参照する
- 共通アセットは `master/assets/` を使う
- 案件固有アセットだけ `projects/<案件>/output/` 側に置く
- 実装は `projects/<案件>/output/site` または `output/app` に作る

つまり、`.claude/rules/` は「AI の行動ルール」、`master/` は「参照する共通資産」です。

## かなりシンプルにするなら、これが最小セット

```text
master/
  design/
  assets/
  templates/
    project-template/

projects/YYYYMMDD_案件名/
  input/
    manifest.md
    source-files/
  working/
    updates/
    requirements.md
  output/
    site/

.claude/rules/
  common-workflow.md
```

これだけでも十分回せます。

## 今の構成との対応

現在:

```text
master/
  assets/
  design/
  docs/
projects/YYYYMMDD_案件名/
  input/
  working/
  output/
.claude/rules/
```

対応はこうです。

- 既存 `assets/` -> `master/assets/`
- 既存 `docs/design-system.md` -> `master/design/design-system.md`
- 既存 `docs/business.md` -> `master/docs/business.md`
- 案件開始時は `master/templates/project-template/` を複製して `projects/<案件>/` にする
- 既存 `event/<案件>/manifest.md` -> `projects/<案件>/input/manifest.md`
- 既存 `event/<案件>/outline.md` -> `projects/<案件>/working/requirements.md` のたたき台
- 既存 `event/<案件>/update.md` -> `projects/<案件>/working/updates/YYYYMMDD_打ち合わせ名.md`
- 既存 `event/<案件>/site/` -> `projects/<案件>/output/site/`

## おすすめの運用順

1. 人間が `master/templates/project-template/` を複製して `projects/<案件>/` を作る
2. 人間が `input/manifest.md` と `input/source-files/` を入れる
3. AI が `working/requirements.md` を整理する
4. 打ち合わせのたびに `working/updates/` に日付と会議名がわかる `.md` を追加する
5. 実装物は `output/site/` か `output/app/` に作る
6. デザイン判断は毎回 `master/design/` を参照する
7. AI の振る舞いは `.claude/rules/` で固定する

## この案の強み

- 案件側の構成がかなり薄い
- 何をどこに置くか説明しやすい
- デザインやルールの再利用性が高い
- AI エージェントの挙動を `.claude/rules/` で固定できる
- 将来フォルダを増やしたくなっても、`working/notes/` から拡張できる

## 実務的な判断

最初からきれいに分類しすぎると、非エンジニア運用では続きません。  
なので最初は `input / working / output` の3分割で始めるのがちょうどいいです。

そのうえで、

- 再利用したいものは `master/`
- AI の行動ルールは `.claude/rules/`

この2つだけを別軸で持つのが、一番バランスがよい構成です。
