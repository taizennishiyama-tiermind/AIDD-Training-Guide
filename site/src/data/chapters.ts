export interface Section {
  readonly id: string
  readonly title: string
  readonly content: string
}

export interface Resource {
  readonly title: string
  readonly url: string
  readonly description: string
  readonly type: 'blog' | 'book' | 'docs' | 'video'
}

export interface PromptExample {
  readonly label: string
  readonly prompt: string
}

export interface ComparisonRow {
  readonly misconception: string
  readonly reality: string
}

export interface Chapter {
  readonly id: number
  readonly slug: string
  readonly title: string
  readonly subtitle: string
  readonly coreMessage: string
  readonly icon: string
  readonly color: string
  readonly duration: string
  readonly sections: readonly Section[]
  readonly resources: readonly Resource[]
  readonly prompts: readonly PromptExample[]
  readonly handsOn?: string
  readonly comparisons?: readonly ComparisonRow[]
}

export const chapters: readonly Chapter[] = [
  {
    id: 1,
    slug: 'what-is-ai-driven-dev',
    title: 'AI駆動開発とは何か',
    subtitle: '思想の転換',
    coreMessage: 'AIに作ってもらう。ただし、うまく作ってもらうための材料は人が渡す。',
    icon: 'Lightbulb',
    color: '#d4764e',
    duration: '20min',
    sections: [
      {
        id: 'definition',
        title: 'AI駆動開発の定義',
        content: `AI駆動開発とは、**人が願望・前提・制約・材料を渡し、AIが自律的に組み上げる**開発スタイルです。

- **願望** — 何を作りたいか
- **前提** — 誰が使うか、どこで使うか、何のためか
- **制約** — セキュリティ、人数、予算、環境、期限
- **材料** — データ、参考資料、既存ファイル、デザインの方向性`
      },
      {
        id: 'difference',
        title: '従来との違い',
        content: `**従来の開発：** 人が設計 → 人が実装 → AIは補完

**AI駆動開発：** 人が材料を渡す → AIが実装・整理・改善・テスト補助まで組み上げる

Claude Codeは「補助ツール」ではなく**「実装の主役」**です。`
      },
      {
        id: 'dont-overdesign',
        title: '「設計しすぎない」という考え方',
        content: `- 技術選定を細かく決めすぎると、AIの最適化余地を潰す
- 古い知識でライブラリを固定すると、最適でないものを指定してしまうリスク
- **基本はAIに任せる。こだわりたい部分だけ人が握る**
- 知識がある人は、その知識でこだわる箇所を明確にする`
      }
    ],
    comparisons: [
      { misconception: 'AIは補助的に使うもの', reality: 'AIを主戦力として使い、材料設計を人がする' },
      { misconception: '全部自分で設計してからAIに渡す', reality: '目的・前提・制約・材料だけ渡せばいい' },
      { misconception: 'コード補完みたいなもの', reality: 'ゼロから組み上げまでやってくれる' },
      { misconception: '要件を短く正確に定義しないといけない', reality: 'ラフでもいいから多く伝えた方がいい' }
    ],
    resources: [
      { title: 'MIT Tech Review「バイブコーディングの衝撃」', url: 'https://www.technologyreview.jp/s/366301/', description: 'AIが生成するコードの比率が9割を超える。AI駆動開発の全体像を掴む記事', type: 'blog' },
      { title: 'もはやClaude Codeはエンジニア以外も全員が使うべきツールになった', url: 'https://note.com/kajiken0630/n/nc0cb92bc080f', description: '非エンジニアがClaude Codeを業務に活用した事例と考察', type: 'blog' },
      { title: '非エンジニアのための Claude Code / Cowork ベストプラクティス', url: 'https://zenn.dev/storehero/articles/18f7cf454ad947', description: 'ファイル読み書き・コマンド実行まで自律的にやってくれる「AI同僚」の使い方', type: 'blog' },
      { title: '技術評論社『Claude CodeによるAI駆動開発入門』', url: 'https://gihyo.jp/book/2025/978-4-297-15275-8', description: 'ハンズオンでWebアプリ構築しながら学べる初の入門書', type: 'book' },
      { title: '技術評論社『実践Claude Code入門』', url: 'https://gihyo.jp/book/2026/978-4-297-15354-0', description: 'スペック駆動開発のフレームワークまで踏み込んだ実践書', type: 'book' }
    ],
    prompts: [
      { label: '体験：丸投げしてみる', prompt: '問い合わせ対応アプリを作ってください。' },
      { label: '体験：ちょっと指定してみる', prompt: '問い合わせ対応アプリを作ってください。和モダンなデザインでお願いします。' }
    ],
    handsOn: undefined
  },
  {
    id: 2,
    slug: 'what-to-give-ai',
    title: '最初に何を渡せばうまくいくか',
    subtitle: '入力の質',
    coreMessage: '最初から綺麗に書かなくていい。まずはできるだけ多く伝える。',
    icon: 'MessageSquare',
    color: '#c06a44',
    duration: '20min',
    sections: [
      {
        id: 'seven-materials',
        title: 'AIに渡す7つの材料',
        content: `#### 1. 願望（何を作りたいか）
何を作りたいのか、どういう体験を作りたいのか。**綺麗に言語化しなくてよい。ラフでもいいので量を出す。**

#### 2. 利用者情報（誰が使うか）
社内向きか顧客向きか、ITリテラシーは高いか低いか。**最低限「誰が使うか」は明確にする。**

#### 3. 利用規模（何人くらいか）
何人くらいが使うのか、同時アクセスはあるか。**これでテストの厚み、構成の堅さが変わる。**

#### 4. 機密性・セキュリティ要件
機密情報を扱うか、外部公開するか。**機密性が高いなら最初に伝える。**

#### 5. 動作環境（どこで動かしたいか）
ローカルだけか、Vercelに出すか、社内環境で閉じたいか。

#### 6. こだわり（人が握るべき部分）
見た目の雰囲気、ブランドトーン、使ってほしくない技術。**ここだけは明確にする。それ以外はAIに任せる。**

#### 7. 実データ・既存資料・参考情報
CSV / Excel / 画像 / PDF / API仕様書。**言葉で説明するより実物を渡した方が早い。**`
      },
      {
        id: 'voice-input',
        title: '音声入力の活用',
        content: `文章にしようとすると止まる人が多いですが、**話すなら意外と出てきます。**

「こういう人が使って」「こういう課題があって」「こんな画面がほしくて」

AI駆動開発では**「ラフな多量入力」**がとても強いです。最初から綺麗に書かなくていい。まずは音声入力で、やりたいことを一気に話してください。`
      }
    ],
    resources: [
      { title: 'GMOペパボ「Claude Code チュートリアル」', url: 'https://zenn.dev/pepabo/articles/898cdc4839acb8', description: 'プロンプトの出し方、CLAUDE.mdの育て方が実務目線で解説', type: 'blog' },
      { title: 'Claude Codeベストプラクティス 7つの鉄則', url: 'https://qiita.com/nogataka/items/392934f79e943e8b9228', description: '「何を」「どこまで」の2点は常に含めたいという指示のコツ', type: 'blog' },
      { title: 'Claude Code 入門: 導入から基本操作まで', url: 'https://tech.quartetcom.co.jp/2026/02/24/claude-code-guide/', description: 'セッション管理、コンテキスト管理、コスト管理の実務ノウハウ', type: 'blog' }
    ],
    prompts: [
      { label: '願望を伝える（ラフでOK）', prompt: '経理部で毎月やってる販管費の分析を楽にしたいです。今はExcelの勘定科目データを手作業で前年と比較して、増えた項目・減った項目を1つずつ確認してシートにまとめています。月に2時間くらいかかります。当月と前年同月のExcelを読み込んだら、自動で増減を分析してくれるWebアプリがほしいです。' },
      { label: '制約を明示する', prompt: '利用者は経理部の3名で、Excelは使えますがプログラミングはできません。扱うデータは社内の財務データなので機密性は高いです。社内ネットワークのみで使い、外部には公開しません。月に1回、月初に使います。' },
      { label: 'デザインのこだわりを握る', prompt: 'マニュアルを見なくても操作方法が直感的にわかるデザインにしてください。数字は見やすい大きめのフォントで、増減が一目で分かるように色分けしてほしいです。グラフも付けて推移が視覚的に分かるようにしてください。技術選定やデータ構造はお任せします。' }
    ],
    handsOn: '自分の作りたいものを2〜3分、音声入力で話す。そのテキストをそのまま manifest.md として保存。Claude Codeに渡して、何が生まれるか見る。'
  },
  {
    id: 3,
    slug: 'files-as-materials',
    title: '材料は言葉だけでなく"ファイル"で渡す',
    subtitle: 'assetsフォルダ',
    coreMessage: '言葉だけで説明しなくていい。材料があるなら最初から渡す。',
    icon: 'FolderOpen',
    color: '#a05839',
    duration: '10min',
    sections: [
      {
        id: 'assets-folder',
        title: 'assets/ フォルダの運用',
        content: `プロジェクトルートに \`assets/\` フォルダを作り、**手持ちの材料をそのまま入れます。**

#### 1. 具体例：経理部の入出金CSV変換アプリの場合

たとえば第2章で出てきた「銀行の入出金CSVを社内Excel書式に自動変換するアプリ」を作るなら：

- **銀行からエクスポートしたCSV** — そのまま \`assets/\` に入れる。AIがカラム構造（日付・摘要・入金・出金・残高 etc.）を読み取り、最適なデータ変換ロジックを組んでくれる
- **社内のExcelひな形** — 変換後のフォーマットを渡すことで、AIが「どこに何を入れるか」を理解できる
- **部門コード表・勘定科目表** — マッピングルールの元データ。CSVやExcelで渡せばAIが自動マッピング機能を組む

#### 2. 他にも入れてよいもの

| 種類 | 具体例 | AIがやってくれること |
|---|---|---|
| 過去のレポート | 月次分析シート、実績報告書 | 同じ書式で自動出力する機能を作る |
| 業務マニュアル | 操作手順書、社内規定PDF | 仕様の前提として読み取り、設計に反映 |
| ロゴ・アイコン | 会社ロゴ、アプリアイコン素材 | ヘッダーやファビコンに自動組み込み |
| 写真・イラスト | 製品写真、サンプル画像 | ギャラリーやカード表示に反映 |
| 参考UI画像 | 「こんな感じにしたい」スクショ | デザインの方向性として解釈して再現 |
| デザインガイド | ブランドカラー、フォント指定 | 色・余白・フォントを一貫して適用 |`
      },
      {
        id: 'why-files',
        title: 'なぜファイルを渡すと強いのか',
        content: `**AIはファイルの中身を読んで理解します。**

たとえばCSVを渡すと、AIは：
- カラム名と型（日付、数値、テキスト）を把握する
- データの件数や傾向を理解する
- そのデータに最適化した入力フォーム、表示画面、変換ロジックを設計する

Excelひな形を渡すと：
- どのセルに何が入るかを読み取る
- 入力データをひな形のどこにマッピングすればいいか判断する
- 書式やレイアウトを再現した出力を作る

**言葉で「CSVには日付と金額と摘要があって…」と説明するより、ファイルを1つ渡す方がはるかに正確。** AIにとって実物は最強の仕様書です。`
      }
    ],
    resources: [
      { title: '個人開発で用意したドキュメント24種を全公開', url: 'https://qiita.com/tomada', description: '実際に用意した24種のドキュメント一覧', type: 'blog' },
      { title: '非エンジニアのVibe coding体験記', url: 'https://note.com/akinat/n/n54ce0bc5b284', description: '非エンジニアが2ヶ月でアプリリリースした実体験', type: 'blog' }
    ],
    prompts: [
      { label: 'assets/ の中身を確認させる', prompt: 'assets/ フォルダの中身を確認して、それぞれのファイルがどんなデータか教えてください。このデータを使ってどんなアプリが作れそうか、提案もお願いします。' },
      { label: 'CSVの構造を理解させる', prompt: 'assets/ にある CSV ファイルを読み込んで、カラム構造とデータの中身を分析してください。このデータをどう活用するか提案してください。' }
    ],
    handsOn: 'assets/ フォルダを作り、自分の業務で使っている実データ（CSV、Excel、PDFマニュアル、ロゴ画像など）を入れる。Claude Codeに中身を確認させて、何が作れそうか提案してもらう。'
  },
  {
    id: 4,
    slug: 'manifest-and-claude-md',
    title: 'manifest.md と CLAUDE.md',
    subtitle: '前提とルール',
    coreMessage: '基本は任せる。必要なところだけ人が握る。',
    icon: 'FileText',
    color: '#e08b63',
    duration: '20min',
    sections: [
      {
        id: 'manifest',
        title: 'docs/manifest.md を作る',
        content: `**manifest.md とは：**
作りたいものについての**前提メモ**です。型に当てはめる書類ではなく、頭の中にあることを外に出す場所。途中でブレたときに戻る軸にもなります。

\`docs/\` フォルダを作り、その中に置きます。Claude Codeは**必要なときに自分でドキュメントを探しに行く（エージェンティックサーチ）**ので、\`docs/\` に入れておくと効率よく参照してくれます。

**最低限入っているとよい項目：**
- 何を作りたいか / どんな課題を解決したいか
- 誰が使うか
- 何人くらいが使うか
- どこで動かしたいか
- 機密情報を扱うか
- こだわりたい点
- assets/ に何を入れたか`
      },
      {
        id: 'claude-md',
        title: 'CLAUDE.md を /init で生成する',
        content: `**CLAUDE.md とは：**
\`manifest.md\` が「何を作るか」なら、\`CLAUDE.md\` は「**どういう方針で作るか**」。Claude Codeがこのプロジェクトでどう動くべきかのルールファイルです。

**なぜ必要か：**
- AIは毎回同じ方向で動くとは限らない
- プロンプトだけで運用すると、実装方針・命名・UI雰囲気がブレる
- \`CLAUDE.md\` があると**一貫性を持って働いてもらえる**

**作り方：**
\`/init\` コマンドを実行するだけで、Claude Codeがプロジェクトの中身（manifest.md や assets/）を読み取って、CLAUDE.md を自動生成してくれます。生成されたら中身を確認して、必要に応じて調整します。

**生成される内容の例（/init で大体こんなものが出来上がります）：**
- プロジェクトの目的・概要
- 技術スタック・コーディング規約
- 想定ユーザーとUI/UX方針
- セキュリティ注意点
- テストの方針`
      },
      {
        id: 'workflow',
        title: 'ここまでの流れの整理',
        content: `#### 1. manifest.md を書く
音声入力でも箇条書きでもOK。作りたいものと前提をラフに書き出す。

#### 2. assets/ にファイルを入れる
実データ（CSV / Excel）、ロゴ、参考画像、マニュアルなど。（ここで manifest.md をさらに深掘りして requirements.md を作ってもらうのも有効）

#### 3. /init で CLAUDE.md を生成する
manifest.md と assets/ がある状態で \`/init\` を実行。AIがプロジェクトの全体像を把握した上で、最適な CLAUDE.md を生成してくれる。

#### 4. アプリを作り始める
ここまで準備できたら、あとは「manifest.md と CLAUDE.md を読んで、アプリを作ってください」と伝えるだけ。`
      }
    ],
    resources: [
      { title: 'CLAUDE.md や AGENTS.md のベストプラクティスな書き方', url: 'https://izanami.dev/post/47b08b5a-6e1c-4fb0-8342-06b8e627450a', description: 'WHY/WHAT/HOWの3要素を300行以内で書く', type: 'blog' },
      { title: 'CLAUDE.md運用のベストプラクティス 7つの原則', url: 'https://zenn.dev/imohuke/articles/claude-code-best-practices-2026', description: '「悪いCLAUDE.md」と「良いCLAUDE.md」を対比して解説', type: 'blog' },
      { title: '効果的なCLAUDE.mdの書き方', url: 'https://zenn.dev/farstep/articles/how-to-write-a-great-claude-md', description: 'CLAUDE.mdの内部メカニズムを技術的に解説', type: 'blog' },
      { title: 'Claude Code公式 ベストプラクティス', url: 'https://code.claude.com/docs/ja/best-practices', description: '公式。CLAUDE.mdのフォーマット、/initの使い方', type: 'docs' }
    ],
    prompts: [
      { label: '/init で CLAUDE.md を生成', prompt: '/init' },
      { label: 'manifest.md を要件定義書に深掘りする', prompt: 'docs/manifest.md を読んで、より詳細な要件定義書を docs/requirements.md として作成してください。画面構成、データの流れ、必要な機能の一覧を整理してください。' }
    ],
    handsOn: 'docs/ フォルダに manifest.md を作成する。assets/ にファイルを入れた状態で /init を実行し、CLAUDE.md を自動生成する。生成された内容を確認して、必要に応じて調整する。'
  },
  {
    id: 5,
    slug: 'implement-with-claude-code',
    title: 'Claude Codeで実装する',
    subtitle: '実装と反復',
    coreMessage: '最初から完璧を狙わず、まず動くものを作る。見ながら直す。',
    icon: 'Terminal',
    color: '#d4764e',
    duration: '30min',
    sections: [
      {
        id: 'basic-flow',
        title: '基本フロー',
        content: `| ステップ | やること | 誰が |
|---|---|---|
| 伝える | manifest.md + assets/ を渡して「作ってください」 | あなた |
| 作る | コードを書いて、画面を構築する | AI |
| 確認する | ブラウザで実際に触って、違和感を見つける | あなた |
| 直す | 「ここを変えて」と伝えるだけで修正される | AI |
| 繰り返す | 確認→直すを何度でも。AIは嫌がらない | 両方 |

**確認→直すのループが核心です。** 最初から完璧なものは出てきません。触って、気づいて、伝えて、直す。これを回すのが AI駆動開発の日常です。`
      },
      {
        id: 'localhost',
        title: 'localhost でアプリを確認する',
        content: `**localhost（ローカルホスト）とは：**
自分のPC上でアプリを動かすこと。インターネットに公開する前に、手元のブラウザで画面を見て触れます。Claude Codeが \`npm run dev\` などのコマンドを実行すると、ブラウザに自分だけのアプリが表示されます。

**なぜ必要か：**
AIの「できました」を鵜呑みにしない。実際に触ると必ず見つかる：

- 動線が分かりづらい
- 文言が不自然
- 思った動きと違う
- レイアウトが崩れている

**小さな違和感を早く見つける → すぐ伝える → すぐ直る。** このサイクルの速さがAI駆動開発の強みです。`
      },
      {
        id: 'feedback',
        title: 'フィードバックのコツ',
        content: `#### 1. 具体的に伝える

| こう伝えると伝わる | 避けたい伝え方 |
|---|---|
| 「ヘッダーの文字が小さくて読みにくい。大きくして」 | 「なんか違う」 |
| 「ボタンが目立たない。色を変えて目立たせて」 | 「もっといい感じにして」 |
| 「スマホだとテーブルがはみ出す。カード表示にして」 | 「レスポンシブにして」 |
| 「登録後に完了メッセージがない。不安になる」 | 「UXが悪い」 |

#### 2. スクリーンショットで伝える

Claude Codeは画像を読み取れます。**言葉で説明するよりスクショ1枚の方が伝わる**場合が多いです。

- 「このスクショの赤枠の部分、レイアウト崩れてるから直して」
- 「このデザインを参考にして、同じ雰囲気にして」

#### 3. 何回直してもOK

AIは修正の反復に強く、何十回でも嫌がりません。「この色を変えて」「文言をこう変えて」と気づいたことをどんどん伝えてください。`
      },
      {
        id: 'design',
        title: 'デザインの扱い方',
        content: `デザインをゼロから考えなくていい。好きな方向があるなら渡す。なければ、用意されたデザインシステムを使えばOK。

#### デザインシステムの使い方

1. 下の**3種類のデザインシステム**から、プロジェクトに近いものを選ぶ
2. Markdownファイルをダウンロードして、\`docs/\` フォルダに入れる
3. Claude Codeが自動で参照して、色・余白・フォントを一貫して適用してくれる

好みがあるなら、参考画像を \`assets/\` に入れたり、CLAUDE.md に「こんな雰囲気で」と書くのも有効です。`
      },
      {
        id: 'skills',
        title: 'スキル（Skills）の紹介',
        content: `**スキルとは：**
Claude Codeが特定の作業をうまく行うための「ベストプラクティス集」です。CLAUDE.mdで指定するだけで、AIの出力の質がグッと上がります。

#### スキルの具体例

| スキル | できること | 使いどころ |
|---|---|---|
| フロントエンド品質 | UIの一貫性、アクセシビリティ、レスポンシブ対応を自動的に考慮 | Webアプリ全般 |
| セキュリティレビュー | APIキーの露出、入力バリデーション漏れ、脆弱性を検出 | 本番公開前のチェック |
| コードレビュー | 可読性、重複、命名の改善を提案 | 実装がひと段落したとき |
| テスト設計 | 壊れると困る箇所を特定してテストを自動生成 | テストを書きたいとき |
| ドキュメント生成 | README、使い方ガイド、API仕様を自動作成 | 引き継ぎやチーム共有時 |

**使い方の例：**
CLAUDE.mdに「セキュリティレビューのスキルを使って、公開前に脆弱性がないかチェックしてください」と書くだけ。`
      }
    ],
    resources: [
      { title: '非エンジニアがClaude Codeを使って1ヶ月でできたこと', url: 'https://qiita.com/ussu_ussu_ussu/items/33ba41fadad02215aede', description: '非エンジニアが1ヶ月間Claude Codeを使った実体験。フィードバックループの実例', type: 'blog' },
      { title: 'バイブコーディングチュートリアル：カンバンアプリケーション', url: 'https://azukiazusa.dev/blog/vibe-coding-tutorial-create-app-with-claude-code/', description: 'Claude Codeでアプリを作る一連の流れ。指示→確認→修正のループが学べる', type: 'blog' },
      { title: 'Claude Codeベストプラクティス2026 最新機能活用ガイド', url: 'https://qiita.com/dai_chi/items/63b15050cc1280c45f86', description: 'Skills、Custom Commands、Hooks、Sub Agentsの使い分け', type: 'blog' },
      { title: 'Claude Code 完全ガイド（30万字、無料）', url: 'https://zenn.dev/tmasuyama1114/books/claude_code_basic', description: '全10パート・約50チャプター。困ったときの自習用リファレンス', type: 'docs' }
    ],
    prompts: [
      { label: '実装してローカルで動かす', prompt: 'それでは実際にアプリを実装してください。ハイクオリティで、ユーザーがマニュアルなしでも直感的に迷わず操作できる洗練されたUI/UXで、機能を完全に作りきってください。ローカルでブラウザから動作確認できる状態までお願いします。' },
      { label: 'UI修正（具体的に伝える）', prompt: '一覧画面の数字が小さくて読みにくいです。フォントサイズを大きくして、前年比で増えている項目は赤、減っている項目は青で色分けしてください。スマホで見たときはテーブルではなくカード表示に切り替えてほしいです。' },
      { label: '機能追加（目的から伝える）', prompt: '毎回全データをスクロールして探すのが面倒なので、絞り込み機能をつけてください。部署名・勘定科目・期間で絞り込めるようにして、入力するたびにリアルタイムで結果が変わるようにしてほしいです。' },
      { label: 'エラー修正（ログを貼る）', prompt: '以下のエラーが出ています。修正してください。\n\nTypeError: Cannot read properties of undefined (reading \'map\')\n  at UserList (src/components/UserList.tsx:12:18)\n\nデータ取得前に画面を描画しようとしているのが原因のようです。データがない場合は「データがありません」と表示してください。' },
      { label: 'デザインの質を上げる', prompt: 'docs/design_system.md を読んで、このデザインシステムに合わせてUI全体を調整してください。特に、マニュアルを見なくても操作が分かるような、直感的で洗練されたデザインを目指してください。' }
    ],
    handsOn: 'manifest.md + CLAUDE.md + assets/ を使って、自分のアプリを作る。Claude Codeに指示 → localhost確認 → フィードバック → 修正のループを最低1回体験する。'
  },
  {
    id: 6,
    slug: 'github-workflow',
    title: 'GitHubと実務運用の流れ',
    subtitle: '変更管理',
    coreMessage: 'AIが高速に変更を加えるほど、差分管理の重要性が増す。',
    icon: 'GitBranch',
    color: '#c06a44',
    duration: '20min',
    sections: [
      {
        id: 'why-github',
        title: 'なぜGitHubが重要か',
        content: `- AIが高速に変更を加えるほど、**差分管理の重要性が増す**
- 「何を変えたか」「戻せるか」「レビューできるか」の基盤
- **AIに自由に触らせるからこそ、管理が必要**`
      },
      {
        id: 'what-to-learn',
        title: '伝える内容',
        content: `- コードの**バージョン管理**
- **変更差分**の確認
- **コミット履歴**の保持
- **Pull Request**によるレビュー導線
- 「どこがどう変わったか」の**可視化**`
      }
    ],
    resources: [
      { title: 'Claude Code 公式：一般的なワークフロー', url: 'https://code.claude.com/docs/ja/common-workflows', description: '公式。コミット、PR作成、ブランチ運用のワークフローガイド', type: 'docs' },
      { title: 'Claude Code 個人的ベストプラクティス', url: 'https://qiita.com/sijiaoh/items/6aea2d31141e5c989bee', description: '小さい単位でレビューしながら進める、コミットメッセージをClaude Codeに書かせる', type: 'blog' },
      { title: 'Vibe Codingで非エンジニアに開発を担ってもらう技術', url: 'https://zenn.dev/coten/articles/c97af3aad358fd', description: '非エンジニアがPRまで作成する構想と実例', type: 'blog' }
    ],
    prompts: [
      { label: '初めてのGitHub登録', prompt: 'このプロジェクトをGitHubに登録してください。秘密情報（.env など）は含めないようにしてください。' },
      { label: '変更を保存する', prompt: '今までの変更を保存（コミット）してください。何を変えたか分かるように、変更内容の説明もつけてください。' },
      { label: '別の作業を始めるとき', prompt: '検索機能を追加したいので、新しいブランチを作って、そこで作業を進めてください。元のコードには影響が出ないようにしてください。' },
      { label: 'チームに変更を共有する', prompt: 'GitHub にプッシュして、変更内容をチームに共有してください。「何を変えたか」「なぜ変えたか」「確認してほしいポイント」を説明文に入れてください。' },
      { label: '変更内容の確認', prompt: '今の変更内容を確認して、意図しない変更（消し忘れ、不要なファイル）がないかチェックしてください。問題があれば教えてください。' },
      { label: '秘密情報の確認', prompt: 'APIキーやパスワードなどの秘密情報がGitHubに上がっていないか確認してください。もし含まれていたら取り除いてください。' }
    ],
    handsOn: '第5章で作ったアプリをGitHubにプッシュする。1箇所修正 → コミット → 差分確認。'
  },
  {
    id: 7,
    slug: 'testing-and-quality',
    title: 'テストと品質',
    subtitle: '品質管理',
    coreMessage: '全部を完璧に守るより、壊れると困るところから守る。',
    icon: 'ShieldCheck',
    color: '#ecac8e',
    duration: '20min',
    sections: [
      {
        id: 'three-layers',
        title: 'テストの3層',
        content: `#### 層1：手で触る確認（必須）
\`localhost\` で実際に触る。主要導線が成立するか確認。UIの違和感をチェック。**これは毎回必ずやる。**

#### 層2：重要ロジックのテスト
対象：計算、バリデーション、データ変換、条件分岐、分類。壊れると困るロジックには簡単でもテストを書く。**テストもClaude Codeに作ってもらってよい。**

#### 層3：主要フローの確認
ログイン、登録、検索、保存、送信 etc. 全部を網羅する必要はない。**「重要な導線」だけは確認できる状態にする。**`
      },
      {
        id: 'test-depth',
        title: 'テストの厚みは前提条件で変わる',
        content: `| 前提 | テストの厚み |
|---|---|
| 自分だけが使う小さな試作 | 手で触る確認だけでもOK |
| 部署内で使う簡易ツール | 重要ロジックのテストまで |
| 顧客が使う本番プロダクト | 主要フローまでしっかり |
| 個人情報を扱う業務システム | ガチガチに固める |

**判断軸：** 何人が使うか / 機密情報を扱うか / 失敗した時の影響 / どのくらい継続運用するか`
      }
    ],
    resources: [
      { title: 'バイブコーディングとは？ TDD的アプローチ', url: 'https://cloud-ace.jp/column/detail534/', description: '仕様からテストを書かせる手順を踏まないとバグごと肯定する無意味なテストが生成されるリスク', type: 'blog' },
      { title: '開発工数の8割減を実現させた「バイブコーディング」実装論', url: 'https://codezine.jp/article/detail/22685', description: 'テスト品質・ゴールラインの設定など、品質管理の考え方が参考になる', type: 'blog' },
      { title: 'Claude Code を使いこなすためのベストプラクティス（実践検証付き）', url: 'https://tech.enechange.co.jp/entry/2026/02/16/195000', description: 'テスト実行・品質チェックのワークフローを実務で検証したレポート', type: 'blog' }
    ],
    prompts: [
      { label: 'テストを作ってもらう', prompt: '経費精算の計算処理にテストを追加してください。正常に計算できる場合、入力データが空の場合、同じ経費を二重に登録しようとした場合をチェックしてほしいです。' },
      { label: 'テストを実行する', prompt: 'テストを全て実行して、結果を教えてください。失敗しているものがあれば原因と修正案を教えてください。' },
      { label: '主要な操作フローの確認', prompt: '問い合わせを受ける → 回答案が生成される → 回答を送信する、という一連の操作が正しく動くか確認するテストを作ってください。' },
      { label: 'テスト方針の相談', prompt: 'このプロジェクトは経理部3人が使う経費精算の問い合わせ対応ツールです。どこまでテストすべきか提案してください。全部をテストする必要はないので、「壊れると業務が止まる部分」を優先してください。' }
    ],
    handsOn: '自分のアプリをlocalhostで触り、3つの改善点を見つける。そのうち1つをClaude Codeにフィードバックして修正。'
  },
  {
    id: 8,
    slug: 'api-and-security',
    title: 'APIと外部連携',
    subtitle: 'つなぎ込み',
    coreMessage: 'AIが作ってくれても、何とどうつながるかは人が理解しておく。',
    icon: 'Plug',
    color: '#a05839',
    duration: '20min',
    sections: [
      {
        id: 'api-basics',
        title: 'APIの基本概念',
        content: `**APIとは：** アプリと外部サービスをつなぐ窓口。レストランで例えると、客（アプリ）がメニュー（API仕様）を見て注文し、キッチン（外部サービス）が料理（データ）を返す、その間の「注文伝票」がAPIです。

**最低限理解すべき6項目：**
1. **どことつながるのか**（連携先：LINE、Gmail、HubSpot、freee etc.）
2. **何を送るのか**（リクエスト：テキスト、画像、CSV etc.）
3. **何が返ってくるのか**（レスポンス：分類結果、生成文、ステータス etc.）
4. **認証が必要か**（APIキー、アクセストークン）
5. **どこに秘密情報を置くべきか**（環境変数 = \`.env\` ファイル）
6. **フロントだけで完結させてよいか**（セキュリティ判断）`
      },
      {
        id: 'line-example',
        title: '具体例：LINE Messaging API',
        content: `**LINE Botの基本的な仕組み：**

1. ユーザーがLINEでメッセージや写真を送信
2. LINEプラットフォームがWebhook URLに転送
3. あなたのサーバーがメッセージを受信
4. AIで内容を分析・分類
5. 結果に応じた返答をLINE APIで送信

**実務での活用例：**
- 製品写真を送ると → AIが品番・カテゴリを自動判定 → 仕様情報を返す
- 「このランプが点かない」と送ると → AIが「不具合報告」と分類 → 対応手順を自動返答
- 現場の施工写真を送ると → 過去の類似事例を検索 → 参考情報を返す

**必要な準備：**
- LINE Developersでチャネルを作成（無料）
- チャネルアクセストークンを取得
- Webhook URLを設定（サーバーが必要）

**ポイント：** LINE APIは無料枠が月200通あるので試作には十分です。Claude Codeに「LINE Botを作って」と伝えれば、Webhookサーバーの雛形まで作ってくれます。`
      },
      {
        id: 'secret-management',
        title: '秘密情報の扱い',
        content: `**鉄則：秘密情報はフロントエンドに直置きしない。**

**フロントに置いてはいけないもの：**
- APIキー / チャネルシークレット / DB接続情報 / 外部サービスの認証情報

**なぜダメか：**
- ブラウザの開発者ツールから丸見えになる
- 悪意あるユーザーに盗まれる
- 悪用される → 従量課金が暴走、不正利用、情報漏洩

**どうすべきか：**
- サーバー側で持つ（フロントからは見えない）
- 環境変数で管理する（\`.env\` ファイル）
- \`.env\` は \`.gitignore\` に入れてGitHubに上げない
- \`.env.example\` だけGitHubに上げて、チームに何が必要か伝える`
      },
      {
        id: 'api-patterns',
        title: 'よくあるAPI連携パターン',
        content: `| パターン | 具体例 | 難易度 |
|---|---|---|
| メール送信 | Gmail API / SendGrid でメール自動送信 | 低 |
| チャット連携 | LINE / Slack にメッセージ送信 | 低 |
| データ取得 | HubSpot / Salesforce から顧客情報を取得 | 中 |
| ファイル操作 | Google Drive にファイルを保存・取得 | 中 |
| 決済・会計 | freee / Stripe で請求書作成・決済処理 | 高 |
| AI処理 | OpenAI / Gemini API で文章生成・画像分析 | 中 |

**Claude Codeに伝えるとき：**
「LINE Messaging API を使って、ユーザーが送った写真を受け取って、その内容を分析して返答するBotを作ってください。LINE Developersのチャネルアクセストークンは .env に入れます。」

→ これだけで、Webhookサーバー + 画像取得 + 返信処理の雛形が生成されます。`
      }
    ],
    resources: [
      { title: 'LINE Messaging API 公式チュートリアル', url: 'https://developers.line.biz/ja/docs/messaging-api/building-bot/', description: 'LINE Botの作り方。チャネル作成→Webhook設定→メッセージ送受信', type: 'docs' },
      { title: 'AIエージェント時代の秘密情報管理 〜 .envを守る5つの防御層', url: 'https://qiita.com/kotaro_ai_lab/items/f8746a5ca8b883f7f5a7', description: 'Claude Code時代の.env管理。パーミッション、サンドボックス、Hooksの活用', type: 'blog' },
      { title: 'Claude Code でLINEミニアプリを開発してみた', url: 'https://dev.classmethod.jp/articles/claude-code-line-liff-app-development-tips/', description: 'Claude CodeでLINE連携アプリを開発した実践レポート', type: 'blog' },
      { title: 'Claudeと対話してLINEジャーナリングBotを作った話', url: 'https://zenn.dev/kamuigp/articles/1798ecbe97dffc', description: 'GAS×Claude APIでLINE Botを構築。Webhook〜返信の実装例', type: 'blog' }
    ],
    prompts: [
      { label: 'LINE Botの雛形を作る', prompt: 'LINE Messaging API を使って、ユーザーがLINEで送ったメッセージに自動で返信するBotを作ってください。チャネルアクセストークンとチャネルシークレットは .env に入れます。まずはオウム返し（送られたメッセージをそのまま返す）から始めてください。' },
      { label: '画像分析Botにする', prompt: 'LINE Botを拡張して、ユーザーが写真を送ったら内容を分析して返答する機能を追加してください。「これは何の製品か」「どんな状態か」を判定して、該当する対応手順を返すようにしてほしいです。' },
      { label: '環境変数を整理する', prompt: 'このプロジェクトで使っている環境変数を整理してください。.env.example を作って、何のキーが必要か・どこで取得するかをコメントで書いてください。.env が .gitignore に入っているかも確認してください。' },
      { label: '秘密情報の安全チェック', prompt: 'APIキーやパスワードなどの秘密情報がソースコードやGitHubに含まれていないか確認してください。フロントエンドのコードからAPIキーが見える状態になっていないかもチェックしてください。' }
    ],
    handsOn: 'LINE Messaging API のチャネルを作成し、Claude Codeでオウム返しBotを実装する。.envにトークンを設定し、Webhookで動作確認。余裕があれば写真送信→AI分類の機能を追加。'
  },
  {
    id: 9,
    slug: 'llm-integration',
    title: 'LLMをアプリに組み込むときの設計',
    subtitle: '番外編',
    coreMessage: 'LLMは、生成だけでなく分類にも使える。',
    icon: 'Brain',
    color: '#834932',
    duration: '30min',
    sections: [
      {
        id: 'two-patterns',
        title: 'LLMの使い方は2種類ある',
        content: `#### パターンA：生成に使う
LLMが最終出力を作る。例：チャット返答、要約文、メール文面、提案文、画像生成。最も「AIっぽい」見え方。

#### パターンB：判定・分類に使う
LLMが最終出力を作らず、**入力を解釈する役割だけ担う**。例：問い合わせ内容の分類、テキストのカテゴリ分け、緊急度判定、意図判定。

入門者には見落とされがちだが、**実務では非常に強い。**`
      },
      {
        id: 'classification-design',
        title: '「分類だけAIに任せる」設計',
        content: `**基本フロー：**
ユーザーが自由入力（非構造データ）
→ LLMで内容を分類（「不具合報告」「要望」「質問」「緊急対応」etc.）
→ 分類結果に応じて分岐
→ 定型メッセージを返す / 担当部署に振り分ける / 別画面に遷移させる

| 観点 | 生成型 | 分類型 |
|---|---|---|
| コスト | 毎回生成で従量課金高め | 入出力が短く安め |
| 安定性 | 文面がぶれる、想定外あり | 出力が安定、テストしやすい |
| 運用性 | 制御しづらい | ルールベースで制御可能 |
| 監査 | AIが何を答えるか不明 | AIは仕分けだけ。最終アクションは定義済み |`
      },
      {
        id: 'secure-design',
        title: 'LLM組み込み時のセキュア設計',
        content: `**必須ルール：**
- APIキーをフロントに置かない（鉄則・再掲）
- サーバー側からLLMを呼ぶ
- 利用量を管理する（従量課金の暴走防止）
- ログ・監査を考える

**LLMを組み込むときに増えるリスク：**
- 従量課金 / 情報送信 / レスポンス遅延 / 出力の揺れ / プロンプトインジェクション`
      }
    ],
    resources: [
      { title: 'KDDI「LLMとは？仕組みや種類、生成AIとの違い」', url: 'https://biz.kddi.com/content/column/smartwork/what-is-llm/', description: 'コンタクトセンター特化型LLMで問い合わせ分類の実務例', type: 'blog' },
      { title: 'Supabase x LINE Bot 編 - Claude Code で効率的に学ぶ', url: 'https://zenn.dev/4geru/books/fukuoka-supabase-line-messaging-api/viewer/intro-03-cursor-development-guide', description: 'LLM + LINE Messaging API + バックエンド連携の実装チュートリアル', type: 'blog' },
      { title: 'Google AI Studio', url: 'https://ai.google.dev/', description: 'LLM機能の試作をノーコードで体験可能。生成型と分類型の違いを試せる', type: 'docs' }
    ],
    prompts: [],
    handsOn: 'Google AI Studio で問い合わせ分類を体験する。生成型と分類型の出力の違いを比較。'
  }
]

export const keyMessages = [
  'AIに作ってもらう。ただし、材料は人が渡す。',
  '最初から綺麗に書かなくていい。まずは多く伝える。',
  '言葉だけで説明しなくていい。材料があるなら最初から渡す。',
  '基本は任せる。必要なところだけ人が握る。',
  'まず動くものを作る。見ながら直す。',
  '壊れると困るところから守る。',
  'APIキーはフロントに置かない。',
  'LLMは、生成だけでなく分類にも使える。',
  '毎回フル生成しなくてもいい。分類だけAIに任せる設計は安くて安定しやすい。'
]

export const timeline = [
  { time: '0:00-0:20', content: 'AI駆動開発とは何か / 思想の転換', chapter: 1 },
  { time: '0:20-0:40', content: '何をAIに渡すか / 音声入力の活用', chapter: 2 },
  { time: '0:40-0:50', content: 'assets フォルダの考え方', chapter: 3 },
  { time: '0:50-1:10', content: 'manifest.md と CLAUDE.md', chapter: 4 },
  { time: '1:10-1:15', content: '休憩', chapter: 0 },
  { time: '1:15-1:50', content: 'デモ1: ゼロから作る', chapter: 5 },
  { time: '1:50-2:20', content: 'Claude Codeで実装 / localhost確認', chapter: 5 },
  { time: '2:20-2:30', content: '休憩', chapter: 0 },
  { time: '2:30-2:50', content: 'デモ2: localhost確認 → フィードバック', chapter: 5 },
  { time: '2:50-3:10', content: 'GitHub・PR', chapter: 6 },
  { time: '3:10-3:15', content: 'デモ3: GitHub・PR', chapter: 6 },
  { time: '3:15-3:35', content: 'テストと品質', chapter: 7 },
  { time: '3:35-3:55', content: 'API・外部連携・秘密情報', chapter: 8 },
  { time: '3:55-4:00', content: '休憩', chapter: 0 },
  { time: '4:00-4:30', content: '番外編: LLM組み込み設計', chapter: 9 },
  { time: '4:30-4:40', content: 'デモ4: LLMの2パターン比較', chapter: 9 },
  { time: '4:40-5:00', content: 'まとめ / 配布物説明 / Q&A', chapter: 0 }
]
