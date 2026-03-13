import type { Chapter } from '../data/chapters'
import { chapterQA, concreteExamples } from '../data/qa'
import { chapters, keyMessages, timeline } from '../data/chapters'

/**
 * Chapter-specific inline content that appears on the page but is not part of
 * the chapter data model. This content is rendered as visual components in
 * Chapter.tsx and must be kept in sync with what is displayed on the page.
 *
 * IMPORTANT: When updating Chapter.tsx visuals, update the corresponding
 * markdown here as well to keep the copy feature in sync.
 */
function getChapterSpecificMarkdown(chapterId: number): string {
  const lines: string[] = []

  switch (chapterId) {
    case 1:
      lines.push('---')
      lines.push('')
      lines.push('### AIDD Kit ダウンロード手順')
      lines.push('')
      lines.push('1. **GitHub のリポジトリページを開く**')
      lines.push('2. **緑色の「Code」ボタン → 「Download ZIP」をクリック** — リポジトリページの右上にある緑のボタンです。')
      lines.push('3. **ZIPを展開して、VS Code で開く**')
      lines.push('')
      lines.push('### AIDD Kit フォルダ構成')
      lines.push('')
      lines.push('```')
      lines.push('.claude/')
      lines.push('  rules/')
      lines.push('    azure-deploy.md    — デプロイ先・DB等の技術方針')
      lines.push('docs/')
      lines.push('  manifest.md          — 作りたいもののメモ')
      lines.push('  requirements.md      — 要件定義の雛形')
      lines.push('assets/                — 材料を入れるフォルダ（CSV、Excel、画像など）')
      lines.push('CLAUDE.md              — プロジェクト全体のルールファイル')
      lines.push('```')
      lines.push('')
      lines.push('| フォルダ / ファイル | 役割 |')
      lines.push('|---|---|')
      lines.push('| `.claude/rules/` | AIの行動ルール。デプロイ先（Azure）やDB（Cosmos DB）など、社内で決まっている技術方針がプリセット済み。**基本いじらなくてOK** |')
      lines.push('| `docs/` | 作りたいもののメモ（manifest.md）と要件定義の雛形（requirements.md）。第2章・第4章で詳しく学びます |')
      lines.push('| `assets/` | CSV、Excel、画像などの材料を入れるフォルダ。第3章で解説 |')
      lines.push('| `CLAUDE.md` | プロジェクト全体のルールファイル。第4章で解説 |')
      lines.push('')
      lines.push('> **`.claude/rules/` について**')
      lines.push('> ここには「どんなアプリでもブレてほしくない基本方針」が入っています。')
      lines.push('> タカショーデジテック内ではデプロイ先やDBなど決まっている技術方針があるため、あらかじめ `azure-deploy.md` として組み込んであります。')
      lines.push('> もし皆さんが「毎回AIに守ってほしいルール」を見つけたら、このフォルダにMarkdownファイルを追加していくだけでOKです。')
      lines.push('> ルールの追加もClaude Codeに「こういうルールを追加して」と頼めばやってくれます。')
      lines.push('')
      lines.push('*今は中身が分からなくても大丈夫。研修を進めるうちに、それぞれの役割が分かるようになります。*')
      lines.push('')
      break

    case 3:
      lines.push('---')
      lines.push('')
      lines.push('### フォルダ構成イメージ')
      lines.push('')
      lines.push('```')
      lines.push('my-project/')
      lines.push('  docs/')
      lines.push('  assets/              ← ここに材料を入れる')
      lines.push('    bank_export_202503.csv')
      lines.push('    社内Excel_テンプレート.xlsx')
      lines.push('    勘定科目マスタ.csv')
      lines.push('    company_logo.png')
      lines.push('    操作マニュアル.pdf')
      lines.push('```')
      lines.push('')
      lines.push('### 入れるファイルの種類')
      lines.push('')
      lines.push('| 種類 | 説明 | 例 |')
      lines.push('|---|---|---|')
      lines.push('| CSV / Excel | データの構造をAIが読み取る | 入出金CSV、顧客リスト |')
      lines.push('| PDF / Word | 仕様や手順の前提として活用 | 操作マニュアル、社内規定 |')
      lines.push('| 画像・写真 | UIに組み込み or デザイン参考 | ロゴ、製品写真、参考UI |')
      lines.push('| 雛形・テンプレート | 出力フォーマットとして再現 | 月次報告シート、請求書 |')
      lines.push('| コード・設定 | 既存の仕組みを引き継ぐ | API仕様書、設定ファイル |')
      lines.push('| 参考スクショ | デザインの方向性を指示 | 「こんな感じ」の画面写真 |')
      lines.push('')
      lines.push('---')
      lines.push('')
      lines.push('### 比較：言葉 vs ファイル')
      lines.push('')
      lines.push('**言葉で説明した場合：**')
      lines.push('- 入力: 「CSVには日付、摘要、入金、出金、残高の列があって、日付はYYYY/MM/DD形式で、金額はカンマ区切りで…」')
      lines.push('- AIの理解: 列構造を**推測**、データ型を**推測**、例外パターンは**不明**')
      lines.push('- → 伝え漏れ・解釈ズレが起きやすい')
      lines.push('')
      lines.push('**ファイルを渡した場合：**')
      lines.push('- 入力: `bank_export.csv`（置くだけ）')
      lines.push('- AIの理解: 列名・型を**正確に把握**、実データから**傾向を理解**、例外・欠損を**自動検出**')
      lines.push('- → **実物 = 最強の仕様書**')
      lines.push('')
      lines.push('> **ポイント:** AIにとって、実際のファイルは**最強の仕様書**です。言葉で100行説明するより、ファイルを1つ渡す方が正確で速い。**まず手持ちの材料をそのまま assets/ に入れてみましょう。**')
      lines.push('')
      break

    case 4:
      lines.push('---')
      lines.push('')
      lines.push('> **ワンポイント:** manifest.md + assets/ だけで第5章に進んでも、ちゃんと動くアプリが作れます。この章は「もっとこだわりたい」人向けのオプションです。気楽に読んでください。')
      lines.push('')
      lines.push('### requirements.md に入れる5つの観点')
      lines.push('')
      lines.push('| 観点 | 説明 |')
      lines.push('|---|---|')
      lines.push('| ユーザージャーニー | 初回アクセスから目的達成まで、使う人の行動を順番に書く |')
      lines.push('| 画面ごとの体験 | そのページで何が見えて、次にどこを押すかを書く |')
      lines.push('| 画面遷移と導線 | 戻るボタンやエラー時に、ユーザーが迷子にならない動線 |')
      lines.push('| 使い心地 | 読み込み中の表示、スマホ対応、文字サイズなどの体験 |')
      lines.push('| やらないこと | 最初のバージョンで対応しない機能を明記しておく |')
      lines.push('')
      lines.push('> **技術的なことは書かなくてOK。**「Reactで作る」のような技術選定はAIに任せましょう。あなたが書くのは「このページを開いたらまず何が見えるか」「ボタンを押したらどこに行くか」だけです。')
      lines.push('')
      lines.push('### requirements.md の見本')
      lines.push('')
      lines.push('Claude Code に作ってもらうと、こんなものが出来上がります。中身はユーザー体験の言語化です。')
      lines.push('')
      lines.push('```markdown')
      lines.push('# requirements.md - 入出金CSV変換ツール')
      lines.push('')
      lines.push('## ユーザージャーニー')
      lines.push('1. トップページを開くと「CSVファイルをアップロード」が目に入る')
      lines.push('2. ファイルをドラッグ＆ドロップ（または選択）する')
      lines.push('3. 変換プレビューが表示される → 内容を確認')
      lines.push('4. 「Excelに変換」ボタンを押す → ダウンロード完了')
      lines.push('5. 「もう1件変換する」で最初に戻れる')
      lines.push('')
      lines.push('## 画面ごとの体験')
      lines.push('')
      lines.push('### トップ画面')
      lines.push('- 「何をするアプリか」が一目で分かるタイトル')
      lines.push('- ファイルのドロップエリアが大きく目立つ')
      lines.push('- 使い方は3ステップで表示（アップロード → 確認 → 変換）')
      lines.push('')
      lines.push('### プレビュー画面')
      lines.push('- 取り込んだ件数が上部に表示される')
      lines.push('- 部門コード・勘定科目の自動マッピング結果が一覧で見える')
      lines.push('- 「マッピングできなかった行」が赤くハイライトされる')
      lines.push('')
      lines.push('### エラー時')
      lines.push('- ファイル形式が違う → 「CSVファイルを選んでください」と案内')
      lines.push('- 空のCSV → 「データが見つかりません」と表示')
      lines.push('')
      lines.push('## 使い心地')
      lines.push('- スマホでも最低限使える（PCメイン想定）')
      lines.push('- 読み込み中は進捗バーを表示')
      lines.push('- ダウンロード完了後「完了しました」のフィードバック')
      lines.push('')
      lines.push('## やらないこと（v1）')
      lines.push('- 複数ファイルの同時変換')
      lines.push('- ユーザー登録・ログイン')
      lines.push('- 変換履歴の保存')
      lines.push('```')
      lines.push('')
      lines.push('> **コツ：読み返してフィードバックする** — AIが作った requirements.md をそのまま使うのではなく、必ず読み返しましょう。「この画面遷移は違う」「エラー時にもっと親切なメッセージがほしい」など、気づいたことを何度でも伝えてOKです。')
      lines.push('')
      lines.push('### requirements.md vs CLAUDE.md')
      lines.push('')
      lines.push('| | requirements.md | CLAUDE.md |')
      lines.push('|---|---|---|')
      lines.push('| 対象 | ユーザーのための文書 | AIエージェントのための文書 |')
      lines.push('| 内容 | 使い心地・体験・導線を定義 | 実装方針・命名規則・制約 |')
      lines.push('| 書くこと | 画面ごとに何が見えるかを書く | /init で自動生成される |')
      lines.push('| 例え | お客さん目線の仕様書 | AIへの作業マニュアル |')
      lines.push('')
      lines.push('> **CLAUDE.md は自分で書かなくてOK。** `/init` を実行するだけで、AIがプロジェクトの中身を読み取って最適なルールファイルを作ってくれます。生成後に「ここを変えて」と調整するだけです。')
      lines.push('')
      lines.push('### 準備から実装までの5ステップ')
      lines.push('')
      lines.push('| ステップ | 内容 | 説明 | 参照 |')
      lines.push('|---|---|---|---|')
      lines.push('| 1 | manifest.md を書く | 作りたいものをラフに書き出す | 第2章 |')
      lines.push('| 2 | assets/ にファイルを入れる | CSV・画像・参考資料を入れる | 第3章 |')
      lines.push('| 3 *(optional)* | requirements.md を作る | ユーザー体験を言語化する | この章 |')
      lines.push('| 4 *(optional)* | CLAUDE.md を生成する | /init でAIの行動ルールを作る | この章 |')
      lines.push('| 5 | アプリを作り始める | AIに「作ってください」と伝える | 第5章 |')
      lines.push('')
      lines.push('> **ステップ3・4 は省略してもOK** — manifest.md と assets/ だけで第5章に進んでも、十分に動くアプリが作れます。requirements.md と CLAUDE.md は「もう一歩こだわりたい」ときに活用してください。')
      lines.push('')
      break

    case 5:
      lines.push('---')
      lines.push('')
      lines.push('### Claude Code に送るプロンプト')
      lines.push('')
      lines.push('```')
      lines.push('Requirements.md、docs/ 配下のドキュメント、assets/ の参考資料をすべて読んだ上で、アプリを実装してください。ハイクオリティで、ユーザーがマニュアルなしでも直感的に操作できる洗練されたUI/UXにしてください。ローカルでブラウザから動作確認できる状態までお願いします。')
      lines.push('```')
      lines.push('')
      lines.push('### AI駆動開発の基本サイクル')
      lines.push('')
      lines.push('| # | ステップ | 説明 | 誰が |')
      lines.push('|---|---|---|---|')
      lines.push('| 1 | 伝える | ドキュメント + assets/ を渡して「作ってください」 | あなた |')
      lines.push('| 2 | 作る | コードを書いて、画面を構築する | AI |')
      lines.push('| 3 | 確認する | ブラウザで実際に触って、違和感を見つける | あなた |')
      lines.push('| 4 | 直す | 「ここを変えて」と伝えるだけで修正される | AI |')
      lines.push('| 5 | 繰り返す | 確認→直すを何度でも。AIは嫌がらない | 両方 |')
      lines.push('')
      lines.push('> **結局大事なのは、フィードバック** — 最初から完璧なものは出てきません。**触って、気づいて、伝えて、直す。**このループを回す速さが、AI駆動開発の実力差になります。')
      lines.push('')
      lines.push('### デザインシステム')
      lines.push('')
      lines.push('| 名前 | 説明 | 向いている用途 |')
      lines.push('|---|---|---|')
      lines.push('| TierMind | AI開発支援のテック企業。ブルー×グラスモーフィズム、先進的でモダンなデザイン。 | テック系LP・SaaSダッシュボード・ポートフォリオ |')
      lines.push('| デジタル庁 (DADS) | 政府のデザインシステム。アクセシビリティ最優先、誰もが使えるユニバーサル設計。 | 行政・公共サービス・アクセシビリティ重視のアプリ |')
      lines.push('| チームみらい | 福祉・政策のスタートアップ。グリーン系で温かみがあり、分かりやすさ重視。 | 業務ツール・福祉・社内アプリ・非エンジニア向け |')
      lines.push('')
      lines.push('デザイン適用プロンプト:')
      lines.push('')
      lines.push('```')
      lines.push('docs/design_system.md を読んで、このデザインシステムに合わせてUI全体を調整してください。直感的で洗練されたデザインを目指してください。')
      lines.push('```')
      lines.push('')
      lines.push('### スクリーンショットで伝える')
      lines.push('')
      lines.push('| テキストだけ | スクショ + 具体的指示 |')
      lines.push('|---|---|')
      lines.push('| 「なんかレイアウトが崩れてる気がする。直して」 | 「この赤枠の部分、スマホだとはみ出してるからカード表示に切り替えて」 |')
      lines.push('| AIが何を直すべきか推測する必要がある | AIが一発で正確に修正できる |')
      lines.push('')
      lines.push('> **何回直してもOK** — AIは修正の反復に強く、何十回でも嫌がりません。「この色を変えて」「文言をこう変えて」と気づいたことをどんどん伝えてください。')
      lines.push('')
      lines.push('### コンテキストウィンドウの管理')
      lines.push('')
      lines.push('入力欄の下に表示される **「63% used」** がコンテキスト使用量。これがAIの記憶のキャパシティです。')
      lines.push('')
      lines.push('| 使用量 | 状態 |')
      lines.push('|---|---|')
      lines.push('| 0〜50% | 余裕あり。そのまま続けてOK |')
      lines.push('| 50〜80% | そろそろ注意。キリの良いところでまとめる |')
      lines.push('| 80%以上 | 危険ゾーン。新しい会話を始める |')
      lines.push('')
      lines.push('**100%に近づくとどうなる？**')
      lines.push('コンテキストが100%に近づくと、AIの**パフォーマンスが一気に落ちます。**記憶のキャパを超えている状態なので、回答が途中で切れたり、前の指示を忘れたり、意図を取り違えることが増えます。')
      lines.push('')
      lines.push('**自動コンパクト機能**')
      lines.push('使用量の円グラフをクリックすると、**AIが自動で記憶を圧縮**してくれます。ただし圧縮されると、今までのやりとりが断片的にしか残らなくなります。')
      lines.push('')
      lines.push('**おすすめの対処法:**')
      lines.push('1. **キリの良いところで新しいチャットに切り替える** — 右上のClaudeボタンを押すか、`/clear` を実行')
      lines.push('2. **CLAUDE.md があれば安心** — 新しいチャットでもプロジェクトのルールは自動で読み込まれる')
      lines.push('3. **作業をこまめにコミットする** — コードが保存されていれば、チャットが切れても続きから作業できる')
      lines.push('')
      lines.push('> **コツ：** 「実装 → 確認 → コミット」のサイクルごとに新しいチャットにすると、コンテキストが溢れにくくなります。')
      lines.push('')
      break

    case 6:
      lines.push('---')
      lines.push('')
      lines.push('### デプロイの流れ')
      lines.push('')
      lines.push('| ステップ | 内容 | 誰が |')
      lines.push('|---|---|---|')
      lines.push('| 1 | PCでアプリを作る（Claude Codeで開発） | あなた |')
      lines.push('| 2 | GitHubにプッシュ（「プッシュして」と伝えるだけ） | Claude Code |')
      lines.push('| 3 | GitHub Actions（自動でビルド＆デプロイ） | 自動 |')
      lines.push('| 4 | Azureで公開（アプリURLでアクセス可能に） | 自動 |')
      lines.push('')
      lines.push('> **Q: 「GitHub Actions」って何ですか？自分で何かする必要がありますか？**')
      lines.push('> A: 大下さんが環境を作るときに自動で設定してくれます。あなたは「プッシュして」と伝えるだけ。あとは全部自動です。')
      lines.push('')
      lines.push('### 環境申請のステップ')
      lines.push('')
      lines.push('| # | 誰 | アクション | 詳細 |')
      lines.push('|---|---|---|---|')
      lines.push('| 1 | あなた | JANDIで大下さんに連絡 | 「開発環境がほしいです。〇〇アプリ用です」 |')
      lines.push('| 2 | 大下さん | 空のGitHub + Azure環境を作成 | 5〜10分で用意してくれる |')
      lines.push('| 3 | 大下さん | URLを共有 | GitHubリポジトリURL + アプリURL |')
      lines.push('| 4 | あなた | Claude Codeでプッシュ | 「このURLにプッシュして」と伝えるだけ |')
      lines.push('')
      lines.push('> **ポイント:** 環境を作るのは大下さんの役割。あなたがやることは「JANDIで連絡する」と「プッシュする」の2つだけです。難しい設定は一切不要。')
      lines.push('')
      lines.push('### 日常のサイクル')
      lines.push('')
      lines.push('| # | ステップ | 説明 | 誰が |')
      lines.push('|---|---|---|---|')
      lines.push('| 1 | 修正する | Claude Codeに修正を指示 | あなた |')
      lines.push('| 2 | 確認する | localhostで画面を確認 | あなた |')
      lines.push('| 3 | プッシュ | 「プッシュして」と伝える | Claude Code |')
      lines.push('| 4 | 自動デプロイ | Azureが数分で更新 | 自動 |')
      lines.push('| 5 | 公開URL確認 | アプリURLで最新を確認 | あなた |')
      lines.push('')
      lines.push('> **アドバイス:** 修正するたびにプッシュする必要はありません。localhostで何回か確認して、「よし、これでOK」と思ったタイミングでプッシュすれば大丈夫です。')
      lines.push('')
      break

    case 8:
      lines.push('---')
      lines.push('')
      lines.push('### LINE Bot のコード例')
      lines.push('')
      lines.push('写真を送ったら製品を判定、テキストなら問い合わせを分類して回答。Claude Codeがこの雛形を生成します。')
      lines.push('')
      lines.push('```typescript')
      lines.push('// LINE Bot: 写真を送ったら製品情報を返す')
      lines.push("app.post('/webhook', async (req, res) => {")
      lines.push('  const events = req.body.events;')
      lines.push('')
      lines.push('  for (const event of events) {')
      lines.push("    if (event.type === 'message') {")
      lines.push("      if (event.message.type === 'image') {")
      lines.push('        // 1. LINEから画像を取得')
      lines.push('        const image = await getImage(event.message.id);')
      lines.push('        // 2. AIで画像を分析（何の製品か判定）')
      lines.push('        const result = await analyzeImage(image);')
      lines.push('        // 3. 分類結果に応じた回答を返す')
      lines.push('        await replyMessage(event.replyToken,')
      lines.push('          `この製品は「${result.name}」です。\\n${result.info}`')
      lines.push('        );')
      lines.push('      } else {')
      lines.push('        // テキストの場合は問い合わせ分類')
      lines.push('        const category = await classifyInquiry(event.message.text);')
      lines.push('        await replyMessage(event.replyToken, answers[category]);')
      lines.push('      }')
      lines.push('    }')
      lines.push('  }')
      lines.push('  res.sendStatus(200);')
      lines.push('});')
      lines.push('```')
      lines.push('')
      lines.push('### .env.example の例')
      lines.push('')
      lines.push('実際の値は `.env` に、`.gitignore` で除外。')
      lines.push('')
      lines.push('```bash')
      lines.push('# .env.example')
      lines.push('# LINE Messaging API - LINE Developersで取得')
      lines.push('LINE_CHANNEL_ACCESS_TOKEN=your-channel-access-token-here')
      lines.push('LINE_CHANNEL_SECRET=your-channel-secret-here')
      lines.push('')
      lines.push('# AI API（画像分析で使う場合）')
      lines.push('OPENAI_API_KEY=your-api-key-here')
      lines.push('')
      lines.push('# これらの値は .env に書き、.gitignore で除外する')
      lines.push('# 絶対にフロントエンド（ブラウザ）から見える場所に置かない')
      lines.push('```')
      lines.push('')
      lines.push('> **Security Rule:** 見える場所に鍵を置かない。APIキーはフロントに置かない。これは鉄則です。')
      lines.push('')
      break

    case 9:
      lines.push('---')
      lines.push('')
      lines.push('### 分類型LLMのコード例')
      lines.push('')
      lines.push('LLMに「仕分ける」だけ任せる。安くて安定します。')
      lines.push('')
      lines.push('```typescript')
      lines.push('// Pattern B: 分類型 - LLMは仕分け係')
      lines.push('const prompt = `')
      lines.push('以下のユーザーの問い合わせを分類してください。')
      lines.push('カテゴリ: 不具合報告 | 要望 | 質問 | 緊急対応')
      lines.push('')
      lines.push('問い合わせ内容: ${userInput}')
      lines.push('')
      lines.push('JSONで回答: { "category": "..." }')
      lines.push('`;')
      lines.push('')
      lines.push('// Response: { "category": "要望" }')
      lines.push('// → カテゴリに応じて定型処理を実行')
      lines.push('```')
      lines.push('')
      break

    default:
      break
  }

  return lines.join('\n')
}

export function generateChapterMarkdown(chapter: Chapter): string {
  const lines: string[] = []

  lines.push(`# Chapter ${chapter.id}: ${chapter.title}`)
  lines.push('')
  lines.push(`> ${chapter.coreMessage}`)
  lines.push('')
  lines.push(`**${chapter.subtitle}** | ${chapter.duration}`)
  lines.push('')

  for (const section of chapter.sections) {
    lines.push(`## ${section.title}`)
    lines.push('')
    lines.push(section.content)
    lines.push('')

    // Insert chapter-specific inline content after the relevant sections
    const inlineContent = getInlineSectionContent(chapter.id, section.id)
    if (inlineContent) {
      lines.push(inlineContent)
      lines.push('')
    }
  }

  if (chapter.comparisons && chapter.comparisons.length > 0) {
    lines.push('## よくある誤解 vs 実際')
    lines.push('')
    lines.push('| 誤解 | 実際 |')
    lines.push('|---|---|')
    for (const row of chapter.comparisons) {
      lines.push(`| ${row.misconception} | ${row.reality} |`)
    }
    lines.push('')
  }

  const examples = concreteExamples[chapter.id]
  if (examples && examples.length > 0) {
    lines.push('## 具体例')
    lines.push('')
    for (const ex of examples) {
      lines.push(`### ${ex.situation}`)
      lines.push('')
      lines.push(`**入力:** ${ex.input}`)
      lines.push('')
      lines.push(`**結果:** ${ex.result}`)
      lines.push('')
    }
  }

  // Ch.6: Deploy Demo section
  if (chapter.id === 6) {
    lines.push('## Demo: プッシュ & デプロイ')
    lines.push('')
    lines.push('コミット、プッシュもClaude Codeに任せられます。プッシュすればAzureが自動で更新。')
    lines.push('')
  }

  if (chapter.prompts.length > 0) {
    lines.push('## Prompt Collection')
    lines.push('')
    for (const prompt of chapter.prompts) {
      lines.push(`### ${prompt.label}`)
      lines.push('')
      lines.push('```')
      lines.push(prompt.prompt)
      lines.push('```')
      lines.push('')
    }

    // Ch.1: prompt callout
    if (chapter.id === 1) {
      lines.push('> **まずは体感する** — 「丸投げ」でも、AIがタスクやニーズを分解・解釈して、ちゃんと形にしてくれることを実感してください。さらに「和モダンで」とひと言添えるだけで、デザインの方向性まで汲み取って反映してくれます。')
      lines.push('>')
      lines.push('> では、実際にこれを**現場で使えるレベルのアプリ**に仕上げていくにはどうすればいいか？ — この後の章で紹介していきます。')
      lines.push('')
    }
  }

  // Ch.8 & Ch.9: Code examples (placed after prompts, before Q&A)
  const chapterSpecific = getChapterSpecificMarkdown(chapter.id)
  if (chapterSpecific) {
    lines.push(chapterSpecific)
  }

  const qa = chapterQA[chapter.id]
  if (qa && qa.length > 0) {
    lines.push('## よくある質問')
    lines.push('')
    for (const item of qa) {
      lines.push(`**Q: ${item.q}**`)
      lines.push('')
      lines.push(`A: ${item.a}`)
      lines.push('')
    }
  }

  if (chapter.handsOn) {
    lines.push('## ハンズオン')
    lines.push('')
    lines.push(chapter.handsOn)
    lines.push('')
  }

  if (chapter.resources.length > 0) {
    lines.push('## Resources')
    lines.push('')
    for (const resource of chapter.resources) {
      lines.push(`- [${resource.title}](${resource.url}) - ${resource.description}`)
    }
    lines.push('')
  }

  return lines.join('\n')
}

/**
 * Returns markdown content that should be inserted after a specific section
 * within a chapter. This corresponds to the inline visual components rendered
 * in Chapter.tsx after each section.
 *
 * IMPORTANT: When adding/updating visual components in Chapter.tsx that appear
 * after a section, update this function to include the markdown equivalent.
 */
function getInlineSectionContent(chapterId: number, sectionId: string): string | null {
  const key = `${chapterId}:${sectionId}`
  const lines: string[] = []

  switch (key) {
    // Ch.1: AIDD Kit folder visualization
    case '1:aidd-kit':
      lines.push('#### ダウンロード手順')
      lines.push('')
      lines.push('1. **GitHub のリポジトリページを開く**')
      lines.push('2. **緑色の「Code」ボタン → 「Download ZIP」をクリック** — リポジトリページの右上にある緑のボタンです。')
      lines.push('3. **ZIPを展開して、VS Code で開く**')
      lines.push('')
      lines.push('#### AIDD Kit フォルダ構成')
      lines.push('')
      lines.push('```')
      lines.push('.claude/')
      lines.push('  rules/')
      lines.push('    azure-deploy.md    — デプロイ先・DB等の技術方針')
      lines.push('docs/')
      lines.push('  manifest.md          — 作りたいもののメモ')
      lines.push('  requirements.md      — 要件定義の雛形')
      lines.push('assets/                — 材料を入れるフォルダ（CSV、Excel、画像など）')
      lines.push('CLAUDE.md              — プロジェクト全体のルールファイル')
      lines.push('```')
      lines.push('')
      lines.push('| フォルダ / ファイル | 役割 |')
      lines.push('|---|---|')
      lines.push('| `.claude/rules/` | AIの行動ルール。デプロイ先（Azure）やDB（Cosmos DB）など、社内で決まっている技術方針がプリセット済み。**基本いじらなくてOK** |')
      lines.push('| `docs/` | 作りたいもののメモ（manifest.md）と要件定義の雛形（requirements.md）。第2章・第4章で詳しく学びます |')
      lines.push('| `assets/` | CSV、Excel、画像などの材料を入れるフォルダ。第3章で解説 |')
      lines.push('| `CLAUDE.md` | プロジェクト全体のルールファイル。第4章で解説 |')
      lines.push('')
      lines.push('> **`.claude/rules/` について** — ここには「どんなアプリでもブレてほしくない基本方針」が入っています。タカショーデジテック内ではデプロイ先やDBなど決まっている技術方針があるため、あらかじめ `azure-deploy.md` として組み込んであります。もし皆さんが「毎回AIに守ってほしいルール」を見つけたら、このフォルダにMarkdownファイルを追加していくだけでOKです。ルールの追加もClaude Codeに「こういうルールを追加して」と頼めばやってくれます。')
      lines.push('')
      lines.push('*今は中身が分からなくても大丈夫。研修を進めるうちに、それぞれの役割が分かるようになります。*')
      return lines.join('\n')

    // Ch.3: Folder tree after assets-folder section
    case '3:assets-folder':
      lines.push('#### フォルダ構成イメージ')
      lines.push('')
      lines.push('```')
      lines.push('my-project/')
      lines.push('  docs/')
      lines.push('  assets/              ← ここに材料を入れる')
      lines.push('    bank_export_202503.csv')
      lines.push('    社内Excel_テンプレート.xlsx')
      lines.push('    勘定科目マスタ.csv')
      lines.push('    company_logo.png')
      lines.push('    操作マニュアル.pdf')
      lines.push('```')
      lines.push('')
      lines.push('#### 入れるファイルの種類')
      lines.push('')
      lines.push('| 種類 | 説明 | 例 |')
      lines.push('|---|---|---|')
      lines.push('| CSV / Excel | データの構造をAIが読み取る | 入出金CSV、顧客リスト |')
      lines.push('| PDF / Word | 仕様や手順の前提として活用 | 操作マニュアル、社内規定 |')
      lines.push('| 画像・写真 | UIに組み込み or デザイン参考 | ロゴ、製品写真、参考UI |')
      lines.push('| 雛形・テンプレート | 出力フォーマットとして再現 | 月次報告シート、請求書 |')
      lines.push('| コード・設定 | 既存の仕組みを引き継ぐ | API仕様書、設定ファイル |')
      lines.push('| 参考スクショ | デザインの方向性を指示 | 「こんな感じ」の画面写真 |')
      return lines.join('\n')

    // Ch.3: Words vs File after why-files section
    case '3:why-files':
      lines.push('#### 比較：言葉 vs ファイル')
      lines.push('')
      lines.push('**言葉で説明した場合：**')
      lines.push('- 入力: 「CSVには日付、摘要、入金、出金、残高の列があって、日付はYYYY/MM/DD形式で、金額はカンマ区切りで…」')
      lines.push('- AIの理解: 列構造を**推測**、データ型を**推測**、例外パターンは**不明**')
      lines.push('- → 伝え漏れ・解釈ズレが起きやすい')
      lines.push('')
      lines.push('**ファイルを渡した場合：**')
      lines.push('- 入力: `bank_export.csv`（置くだけ）')
      lines.push('- AIの理解: 列名・型を**正確に把握**、実データから**傾向を理解**、例外・欠損を**自動検出**')
      lines.push('- → **実物 = 最強の仕様書**')
      lines.push('')
      lines.push('> **ポイント:** AIにとって、実際のファイルは**最強の仕様書**です。言葉で100行説明するより、ファイルを1つ渡す方が正確で速い。**まず手持ちの材料をそのまま assets/ に入れてみましょう。**')
      return lines.join('\n')

    // Ch.4: Beginner tip after intro
    case '4:intro':
      lines.push('> **ワンポイント:** manifest.md + assets/ だけで第5章に進んでも、ちゃんと動くアプリが作れます。この章は「もっとこだわりたい」人向けのオプションです。気楽に読んでください。')
      return lines.join('\n')

    // Ch.4: requirements checklist + tip after requirements section
    case '4:requirements':
      lines.push('#### requirements.md に入れる5つの観点')
      lines.push('')
      lines.push('| 観点 | 説明 |')
      lines.push('|---|---|')
      lines.push('| ユーザージャーニー | 初回アクセスから目的達成まで、使う人の行動を順番に書く |')
      lines.push('| 画面ごとの体験 | そのページで何が見えて、次にどこを押すかを書く |')
      lines.push('| 画面遷移と導線 | 戻るボタンやエラー時に、ユーザーが迷子にならない動線 |')
      lines.push('| 使い心地 | 読み込み中の表示、スマホ対応、文字サイズなどの体験 |')
      lines.push('| やらないこと | 最初のバージョンで対応しない機能を明記しておく |')
      lines.push('')
      lines.push('> **技術的なことは書かなくてOK。**「Reactで作る」のような技術選定はAIに任せましょう。あなたが書くのは「このページを開いたらまず何が見えるか」「ボタンを押したらどこに行くか」だけです。')
      return lines.join('\n')

    // Ch.4: requirements.md template + feedback tip after requirements-prompt section
    case '4:requirements-prompt':
      lines.push('#### requirements.md の見本')
      lines.push('')
      lines.push('Claude Code に作ってもらうと、こんなものが出来上がります。中身はユーザー体験の言語化です。')
      lines.push('')
      lines.push('```markdown')
      lines.push('# requirements.md - 入出金CSV変換ツール')
      lines.push('')
      lines.push('## ユーザージャーニー')
      lines.push('1. トップページを開くと「CSVファイルをアップロード」が目に入る')
      lines.push('2. ファイルをドラッグ＆ドロップ（または選択）する')
      lines.push('3. 変換プレビューが表示される → 内容を確認')
      lines.push('4. 「Excelに変換」ボタンを押す → ダウンロード完了')
      lines.push('5. 「もう1件変換する」で最初に戻れる')
      lines.push('')
      lines.push('## 画面ごとの体験')
      lines.push('')
      lines.push('### トップ画面')
      lines.push('- 「何をするアプリか」が一目で分かるタイトル')
      lines.push('- ファイルのドロップエリアが大きく目立つ')
      lines.push('- 使い方は3ステップで表示（アップロード → 確認 → 変換）')
      lines.push('')
      lines.push('### プレビュー画面')
      lines.push('- 取り込んだ件数が上部に表示される')
      lines.push('- 部門コード・勘定科目の自動マッピング結果が一覧で見える')
      lines.push('- 「マッピングできなかった行」が赤くハイライトされる')
      lines.push('')
      lines.push('### エラー時')
      lines.push('- ファイル形式が違う → 「CSVファイルを選んでください」と案内')
      lines.push('- 空のCSV → 「データが見つかりません」と表示')
      lines.push('')
      lines.push('## 使い心地')
      lines.push('- スマホでも最低限使える（PCメイン想定）')
      lines.push('- 読み込み中は進捗バーを表示')
      lines.push('- ダウンロード完了後「完了しました」のフィードバック')
      lines.push('')
      lines.push('## やらないこと（v1）')
      lines.push('- 複数ファイルの同時変換')
      lines.push('- ユーザー登録・ログイン')
      lines.push('- 変換履歴の保存')
      lines.push('```')
      lines.push('')
      lines.push('> **コツ：読み返してフィードバックする** — AIが作った requirements.md をそのまま使うのではなく、必ず読み返しましょう。「この画面遷移は違う」「エラー時にもっと親切なメッセージがほしい」など、気づいたことを何度でも伝えてOKです。')
      return lines.join('\n')

    // Ch.4: Requirements vs CLAUDE.md comparison + /init tip
    case '4:claude-md':
      lines.push('#### requirements.md vs CLAUDE.md')
      lines.push('')
      lines.push('| | requirements.md | CLAUDE.md |')
      lines.push('|---|---|---|')
      lines.push('| 対象 | ユーザーのための文書 | AIエージェントのための文書 |')
      lines.push('| 内容 | 使い心地・体験・導線を定義 | 実装方針・命名規則・制約 |')
      lines.push('| 書くこと | 画面ごとに何が見えるかを書く | /init で自動生成される |')
      lines.push('| 例え | お客さん目線の仕様書 | AIへの作業マニュアル |')
      lines.push('')
      lines.push('> **CLAUDE.md は自分で書かなくてOK。** `/init` を実行するだけで、AIがプロジェクトの中身を読み取って最適なルールファイルを作ってくれます。生成後に「ここを変えて」と調整するだけです。')
      return lines.join('\n')

    // Ch.4: 5-step workflow after workflow section
    case '4:workflow':
      lines.push('#### 準備から実装までの5ステップ')
      lines.push('')
      lines.push('| ステップ | 内容 | 説明 | 参照 |')
      lines.push('|---|---|---|---|')
      lines.push('| 1 | manifest.md を書く | 作りたいものをラフに書き出す | 第2章 |')
      lines.push('| 2 | assets/ にファイルを入れる | CSV・画像・参考資料を入れる | 第3章 |')
      lines.push('| 3 *(optional)* | requirements.md を作る | ユーザー体験を言語化する | この章 |')
      lines.push('| 4 *(optional)* | CLAUDE.md を生成する | /init でAIの行動ルールを作る | この章 |')
      lines.push('| 5 | アプリを作り始める | AIに「作ってください」と伝える | 第5章 |')
      lines.push('')
      lines.push('> **ステップ3・4 は省略してもOK** — manifest.md と assets/ だけで第5章に進んでも、十分に動くアプリが作れます。requirements.md と CLAUDE.md は「もう一歩こだわりたい」ときに活用してください。')
      return lines.join('\n')

    // Ch.5: Prompt + feedback cycle after basic-flow section
    case '5:basic-flow':
      lines.push('#### Claude Code に送るプロンプト')
      lines.push('')
      lines.push('```')
      lines.push('Requirements.md、docs/ 配下のドキュメント、assets/ の参考資料をすべて読んだ上で、アプリを実装してください。ハイクオリティで、ユーザーがマニュアルなしでも直感的に操作できる洗練されたUI/UXにしてください。ローカルでブラウザから動作確認できる状態までお願いします。')
      lines.push('```')
      lines.push('')
      lines.push('#### AI駆動開発の基本サイクル')
      lines.push('')
      lines.push('| # | ステップ | 説明 | 誰が |')
      lines.push('|---|---|---|---|')
      lines.push('| 1 | 伝える | ドキュメント + assets/ を渡して「作ってください」 | あなた |')
      lines.push('| 2 | 作る | コードを書いて、画面を構築する | AI |')
      lines.push('| 3 | 確認する | ブラウザで実際に触って、違和感を見つける | あなた |')
      lines.push('| 4 | 直す | 「ここを変えて」と伝えるだけで修正される | AI |')
      lines.push('| 5 | 繰り返す | 確認→直すを何度でも。AIは嫌がらない | 両方 |')
      lines.push('')
      lines.push('> **結局大事なのは、フィードバック** — 最初から完璧なものは出てきません。**触って、気づいて、伝えて、直す。**このループを回す速さが、AI駆動開発の実力差になります。')
      return lines.join('\n')

    // Ch.5: Design system showcase after design section
    case '5:design':
      lines.push('#### デザインシステム')
      lines.push('')
      lines.push('| 名前 | 説明 | 向いている用途 |')
      lines.push('|---|---|---|')
      lines.push('| TierMind | AI開発支援のテック企業。ブルー×グラスモーフィズム、先進的でモダンなデザイン。 | テック系LP・SaaSダッシュボード・ポートフォリオ |')
      lines.push('| デジタル庁 (DADS) | 政府のデザインシステム。アクセシビリティ最優先、誰もが使えるユニバーサル設計。 | 行政・公共サービス・アクセシビリティ重視のアプリ |')
      lines.push('| チームみらい | 福祉・政策のスタートアップ。グリーン系で温かみがあり、分かりやすさ重視。 | 業務ツール・福祉・社内アプリ・非エンジニア向け |')
      lines.push('')
      lines.push('デザイン適用プロンプト:')
      lines.push('')
      lines.push('```')
      lines.push('docs/design_system.md を読んで、このデザインシステムに合わせてUI全体を調整してください。直感的で洗練されたデザインを目指してください。')
      lines.push('```')
      return lines.join('\n')

    // Ch.5: Browser mock after localhost section
    case '5:localhost':
      lines.push('*（ブラウザで `localhost:5173` にアクセスすると、Claude Code が生成したアプリがそのまま動きます）*')
      return lines.join('\n')

    // Ch.5: Screenshot feedback after feedback section
    case '5:feedback':
      lines.push('#### スクリーンショットで伝える')
      lines.push('')
      lines.push('| テキストだけ | スクショ + 具体的指示 |')
      lines.push('|---|---|')
      lines.push('| 「なんかレイアウトが崩れてる気がする。直して」 | 「この赤枠の部分、スマホだとはみ出してるからカード表示に切り替えて」 |')
      lines.push('| AIが何を直すべきか推測する必要がある | AIが一発で正確に修正できる |')
      lines.push('')
      lines.push('> **何回直してもOK** — AIは修正の反復に強く、何十回でも嫌がりません。「この色を変えて」「文言をこう変えて」と気づいたことをどんどん伝えてください。')
      return lines.join('\n')

    // Ch.5: Context window management after context-management section
    case '5:context-management':
      lines.push('入力欄の下に表示される **「63% used」** がコンテキスト使用量。これがAIの記憶のキャパシティです。')
      lines.push('')
      lines.push('| 使用量 | 状態 |')
      lines.push('|---|---|')
      lines.push('| 0〜50% | 余裕あり。そのまま続けてOK |')
      lines.push('| 50〜80% | そろそろ注意。キリの良いところでまとめる |')
      lines.push('| 80%以上 | 危険ゾーン。新しい会話を始める |')
      lines.push('')
      lines.push('**100%に近づくとどうなる？**')
      lines.push('コンテキストが100%に近づくと、AIの**パフォーマンスが一気に落ちます。**記憶のキャパを超えている状態なので、回答が途中で切れたり、前の指示を忘れたり、意図を取り違えることが増えます。')
      lines.push('')
      lines.push('**自動コンパクト機能**')
      lines.push('使用量の円グラフをクリックすると、**AIが自動で記憶を圧縮**してくれます。ただし圧縮されると、今までのやりとりが断片的にしか残らなくなります。')
      lines.push('')
      lines.push('**おすすめの対処法:**')
      lines.push('1. **キリの良いところで新しいチャットに切り替える** — 右上のClaudeボタンを押すか、`/clear` を実行')
      lines.push('2. **CLAUDE.md があれば安心** — 新しいチャットでもプロジェクトのルールは自動で読み込まれる')
      lines.push('3. **作業をこまめにコミットする** — コードが保存されていれば、チャットが切れても続きから作業できる')
      lines.push('')
      lines.push('> **コツ：** 「実装 → 確認 → コミット」のサイクルごとに新しいチャットにすると、コンテキストが溢れにくくなります。')
      return lines.join('\n')

    // Ch.6: Deploy flow after overall-flow section
    case '6:overall-flow':
      lines.push('#### デプロイの流れ')
      lines.push('')
      lines.push('| ステップ | 内容 | 誰が |')
      lines.push('|---|---|---|')
      lines.push('| 1 | PCでアプリを作る（Claude Codeで開発） | あなた |')
      lines.push('| 2 | GitHubにプッシュ（「プッシュして」と伝えるだけ） | Claude Code |')
      lines.push('| 3 | GitHub Actions（自動でビルド＆デプロイ） | 自動 |')
      lines.push('| 4 | Azureで公開（アプリURLでアクセス可能に） | 自動 |')
      lines.push('')
      lines.push('> **Q: 「GitHub Actions」って何ですか？自分で何かする必要がありますか？**')
      lines.push('> A: 大下さんが環境を作るときに自動で設定してくれます。あなたは「プッシュして」と伝えるだけ。あとは全部自動です。')
      return lines.join('\n')

    // Ch.6: Request flow after deploy-steps section
    case '6:deploy-steps':
      lines.push('#### 環境申請のステップ')
      lines.push('')
      lines.push('| # | 誰 | アクション | 詳細 |')
      lines.push('|---|---|---|---|')
      lines.push('| 1 | あなた | JANDIで大下さんに連絡 | 「開発環境がほしいです。〇〇アプリ用です」 |')
      lines.push('| 2 | 大下さん | 空のGitHub + Azure環境を作成 | 5〜10分で用意してくれる |')
      lines.push('| 3 | 大下さん | URLを共有 | GitHubリポジトリURL + アプリURL |')
      lines.push('| 4 | あなた | Claude Codeでプッシュ | 「このURLにプッシュして」と伝えるだけ |')
      lines.push('')
      lines.push('> **ポイント:** 環境を作るのは大下さんの役割。あなたがやることは「JANDIで連絡する」と「プッシュする」の2つだけです。難しい設定は一切不要。')
      return lines.join('\n')

    // Ch.6: Daily flow after daily-flow section
    case '6:daily-flow':
      lines.push('#### 日常のサイクル')
      lines.push('')
      lines.push('| # | ステップ | 説明 | 誰が |')
      lines.push('|---|---|---|---|')
      lines.push('| 1 | 修正する | Claude Codeに修正を指示 | あなた |')
      lines.push('| 2 | 確認する | localhostで画面を確認 | あなた |')
      lines.push('| 3 | プッシュ | 「プッシュして」と伝える | Claude Code |')
      lines.push('| 4 | 自動デプロイ | Azureが数分で更新 | 自動 |')
      lines.push('| 5 | 公開URL確認 | アプリURLで最新を確認 | あなた |')
      lines.push('')
      lines.push('> **アドバイス:** 修正するたびにプッシュする必要はありません。localhostで何回か確認して、「よし、これでOK」と思ったタイミングでプッシュすれば大丈夫です。')
      return lines.join('\n')

    default:
      return null
  }
}

export function generateHomeMarkdown(): string {
  const lines: string[] = []

  lines.push('# AI駆動開発 入門研修')
  lines.push('')
  lines.push('Claude Code ではじめる AI駆動開発の研修資料です。')
  lines.push('')
  lines.push('AIに作ってもらう。ただし、うまく作ってもらうための**材料は人が渡す。**')
  lines.push('Claude Codeを主役に、実務で自走できる状態を目指します。')
  lines.push('')

  lines.push('## Curriculum')
  lines.push('')
  for (const chapter of chapters) {
    lines.push(`- **Chapter ${chapter.id}: ${chapter.title}** (${chapter.duration}) - ${chapter.coreMessage}`)
  }
  lines.push('')

  lines.push('## Design Philosophy')
  lines.push('')
  lines.push('1. **まず作れるようにする** - 成功体験を通じて感覚を掴む (Ch.1-5)')
  lines.push('2. **品質を上げるコツ** - デザイン・スキル・テストの活用 (Ch.5-7)')
  lines.push('3. **実務運用の勘所** - API連携、セキュリティ、LLM設計 (Ch.8-9)')
  lines.push('')

  lines.push('## Key Messages')
  lines.push('')
  for (const msg of keyMessages) {
    lines.push(`- ${msg}`)
  }
  lines.push('')

  lines.push('## Timeline (5h)')
  lines.push('')
  lines.push('| 時間 | 内容 |')
  lines.push('|---|---|')
  for (const entry of timeline) {
    const chapterLabel = entry.chapter > 0 ? ` (Ch.${entry.chapter})` : ''
    lines.push(`| ${entry.time} | ${entry.content}${chapterLabel} |`)
  }
  lines.push('')

  lines.push('## Toolchain')
  lines.push('')
  lines.push('- Claude Code - 実装の主役')
  lines.push('- GitHub - 変更履歴と共同開発')
  lines.push('- VS Code - 人とAIの作業ハブ')
  lines.push('- Vercel - 最短で公開')
  lines.push('- Google AI Studio - 発想整理・試作')
  lines.push('- Cloudflare Workers - 本番拡張先')
  lines.push('')

  return lines.join('\n')
}
