import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { chapters } from '../data/chapters'
import { chapterQA, concreteExamples } from '../data/qa'
import { SectionRenderer } from '../components/ui/SectionRenderer'
import { KeyMessageBanner } from '../components/ui/KeyMessageBanner'
import { ComparisonTable } from '../components/ui/ComparisonTable'
import { PromptCard } from '../components/ui/PromptCard'
import { ResourceCard } from '../components/ui/ResourceCard'
import { HandsOnBlock } from '../components/ui/HandsOnBlock'
import { CodeBlock } from '../components/ui/CodeBlock'
import { QADialogue } from '../components/ui/QADialogue'
import { ConcreteExampleCard } from '../components/ui/ConcreteExampleCard'
import { VSCodeSimulator, githubLines } from '../components/ui/VSCodeSimulator'
import { AnimatedComparison } from '../components/ui/AnimatedComparison'
import { CopyPageButton } from '../components/ui/CopyPageButton'
import { generateChapterMarkdown } from '../utils/generateMarkdown'
import { ArrowLeft, ArrowRight, Clock, ShieldCheck, Lightbulb, Download, Users, Layout, ArrowRightLeft, Smartphone, Ban, FileText, Bot, ChevronRight, Send, Copy, Check, MessageSquare, Camera, Image, RotateCcw, RefreshCw, Folder, FolderOpen, FileCode, ExternalLink, FileSpreadsheet, Table2, ArrowDown, Zap, Eye, Upload, Cloud, Monitor, GitBranch } from 'lucide-react'
import { useEffect, useCallback, useState } from 'react'
import { chapterIllustrations } from '../data/illustrations'

import imgTipHuman from '../assets/illustration/png/s_human13.png'
import imgM14 from '../assets/illustration/png/m_14_white.png'
import imgHuman04 from '../assets/illustration/png/s_human04.png'
import imgHuman07 from '../assets/illustration/png/s_human07.png'
import imgS03 from '../assets/illustration/png/s_03.png'
import imgContextWindow from '../assets/captcha/context-window-usage.png'
import imgHuman09 from '../assets/illustration/png/s_human09.png'
import imgHuman15 from '../assets/illustration/png/s_human15.png'
import imgHuman20 from '../assets/illustration/png/s_human20.png'

import imgTierMind from '../assets/design_image/TierMind.png'
import imgDigitalAgency from '../assets/design_image/デジタル庁.png'
import imgTeamMirai from '../assets/design_image/チームみらい.png'
import mdTierMind from '../assets/design_system_sample/design_system_tiermind.md?url'
import mdDigitalAgency from '../assets/design_system_sample/design_system_digital_agency.md?url'
import mdTeamMirai from '../assets/design_system_sample/design_system_team_mirai.md?url'

const designSystems = [
  {
    name: 'TierMind',
    description: 'AI開発支援のテック企業。ブルー×グラスモーフィズム、先進的でモダンなデザイン。',
    suited: 'テック系LP・SaaSダッシュボード・ポートフォリオ',
    excerpt: 'プライマリ: #0066FF / グラスモーフィズム + Spring アニメーション / Inter + Noto Sans JP',
    image: imgTierMind,
    mdUrl: mdTierMind,
    mdFilename: 'design_system_tiermind.md',
  },
  {
    name: 'デジタル庁 (DADS)',
    description: '政府のデザインシステム。アクセシビリティ最優先、誰もが使えるユニバーサル設計。',
    suited: '行政・公共サービス・アクセシビリティ重視のアプリ',
    excerpt: 'プライマリ: #1A73E8 / WCAG 2.1 AA準拠 / Noto Sans JP / 35種以上のコンポーネント',
    image: imgDigitalAgency,
    mdUrl: mdDigitalAgency,
    mdFilename: 'design_system_digital_agency.md',
  },
  {
    name: 'チームみらい',
    description: '福祉・政策のスタートアップ。グリーン系で温かみがあり、分かりやすさ重視。',
    suited: '業務ツール・福祉・社内アプリ・非エンジニア向け',
    excerpt: 'プライマリ: #2AA693 / 大きめフォント / ウォームグレー背景 / シンプルなカード設計',
    image: imgTeamMirai,
    mdUrl: mdTeamMirai,
    mdFilename: 'design_system_team_mirai.md',
  },
] as const

const requirementsMdTemplate = `# requirements.md - 入出金CSV変換ツール

## ユーザージャーニー
1. トップページを開くと「CSVファイルをアップロード」が目に入る
2. ファイルをドラッグ＆ドロップ（または選択）する
3. 変換プレビューが表示される → 内容を確認
4. 「Excelに変換」ボタンを押す → ダウンロード完了
5. 「もう1件変換する」で最初に戻れる

## 画面ごとの体験

### トップ画面
- 「何をするアプリか」が一目で分かるタイトル
- ファイルのドロップエリアが大きく目立つ
- 使い方は3ステップで表示（アップロード → 確認 → 変換）

### プレビュー画面
- 取り込んだ件数が上部に表示される
- 部門コード・勘定科目の自動マッピング結果が一覧で見える
- 「マッピングできなかった行」が赤くハイライトされる

### エラー時
- ファイル形式が違う → 「CSVファイルを選んでください」と案内
- 空のCSV → 「データが見つかりません」と表示

## 使い心地
- スマホでも最低限使える（PCメイン想定）
- 読み込み中は進捗バーを表示
- ダウンロード完了後「完了しました」のフィードバック

## やらないこと（v1）
- 複数ファイルの同時変換
- ユーザー登録・ログイン
- 変換履歴の保存`

const requirementsChecklist = [
  { icon: 'Users', label: 'ユーザージャーニー', desc: '初回アクセスから目的達成まで、使う人の行動を順番に書く' },
  { icon: 'Layout', label: '画面ごとの体験', desc: 'そのページで何が見えて、次にどこを押すかを書く' },
  { icon: 'ArrowRightLeft', label: '画面遷移と導線', desc: '戻るボタンやエラー時に、ユーザーが迷子にならない動線' },
  { icon: 'Smartphone', label: '使い心地', desc: '読み込み中の表示、スマホ対応、文字サイズなどの体験' },
  { icon: 'Ban', label: 'やらないこと', desc: '最初のバージョンで対応しない機能を明記しておく' },
] as const

const iconMap = { Users, Layout, ArrowRightLeft, Smartphone, Ban } as const

const workflowSteps = [
  { num: '1', label: 'manifest.md を書く', desc: '作りたいものをラフに書き出す', chapter: '第2章', isOptional: false },
  { num: '2', label: 'assets/ にファイルを入れる', desc: 'CSV・画像・参考資料を入れる', chapter: '第3章', isOptional: false },
  { num: '3', label: 'requirements.md を作る', desc: 'ユーザー体験を言語化する', chapter: 'この章', isOptional: true },
  { num: '4', label: 'CLAUDE.md を生成する', desc: '/init でAIの行動ルールを作る', chapter: 'この章', isOptional: true },
  { num: '5', label: 'アプリを作り始める', desc: 'AIに「作ってください」と伝える', chapter: '第5章', isOptional: false },
] as const

const envExampleCode = `# .env.example
# LINE Messaging API - LINE Developersで取得
LINE_CHANNEL_ACCESS_TOKEN=your-channel-access-token-here
LINE_CHANNEL_SECRET=your-channel-secret-here

# AI API（画像分析で使う場合）
OPENAI_API_KEY=your-api-key-here

# これらの値は .env に書き、.gitignore で除外する
# 絶対にフロントエンド（ブラウザ）から見える場所に置かない`

const lineBotCode = `// LINE Bot: 写真を送ったら製品情報を返す
app.post('/webhook', async (req, res) => {
  const events = req.body.events;

  for (const event of events) {
    if (event.type === 'message') {
      if (event.message.type === 'image') {
        // 1. LINEから画像を取得
        const image = await getImage(event.message.id);
        // 2. AIで画像を分析（何の製品か判定）
        const result = await analyzeImage(image);
        // 3. 分類結果に応じた回答を返す
        await replyMessage(event.replyToken,
          \`この製品は「\${result.name}」です。\\n\${result.info}\`
        );
      } else {
        // テキストの場合は問い合わせ分類
        const category = await classifyInquiry(event.message.text);
        await replyMessage(event.replyToken, answers[category]);
      }
    }
  }
  res.sendStatus(200);
});`

const classificationCode = `// Pattern B: 分類型 - LLMは仕分け係
const prompt = \`
以下のユーザーの問い合わせを分類してください。
カテゴリ: 不具合報告 | 要望 | 質問 | 緊急対応

問い合わせ内容: \${userInput}

JSONで回答: { "category": "..." }
\`;

// Response: { "category": "要望" }
// → カテゴリに応じて定型処理を実行`

const ch5Prompt = 'Requirements.md、docs/ 配下のドキュメント、assets/ の参考資料をすべて読んだ上で、アプリを実装してください。ハイクオリティで、ユーザーがマニュアルなしでも直感的に操作できる洗練されたUI/UXにしてください。ローカルでブラウザから動作確認できる状態までお願いします。'

const ch5DesignPrompt = 'docs/design_system.md を読んで、このデザインシステムに合わせてUI全体を調整してください。直感的で洗練されたデザインを目指してください。'

const feedbackCycleSteps = [
  { label: '伝える', desc: 'ドキュメント + assets/ を渡して「作ってください」', who: 'あなた' },
  { label: '作る', desc: 'コードを書いて、画面を構築する', who: 'AI' },
  { label: '確認する', desc: 'ブラウザで実際に触って、違和感を見つける', who: 'あなた' },
  { label: '直す', desc: '「ここを変えて」と伝えるだけで修正される', who: 'AI' },
  { label: '繰り返す', desc: '確認→直すを何度でも。AIは嫌がらない', who: '両方' },
] as const

function Ch1AiddKitVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-10 pl-0 lg:pl-10 space-y-6"
    >
      {/* Step 1: GitHub link */}
      <div className="space-y-3">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">ダウンロード手順</p>
        <div className="space-y-3">
          {/* Step 1 */}
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-800">GitHub のリポジトリページを開く</p>
              <a
                href="https://github.com/PLACEHOLDER/aidd-kit"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-sm font-medium text-gray-800 group"
              >
                <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                <span>GitHub でリポジトリを開く</span>
                <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </a>
            </div>
          </div>
          {/* Step 2 */}
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-800">緑色の「Code」ボタン → 「Download ZIP」をクリック</p>
              <p className="text-xs text-gray-500 mt-1">リポジトリページの右上にある緑のボタンです。</p>
            </div>
          </div>
          {/* Step 3 */}
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-800">ZIPを展開して、VS Code で開く</p>
              <p className="text-xs text-gray-500 mt-1">
                VS Code をまだインストールしていない方は
                <a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline font-medium ml-1">
                  こちらからダウンロード
                  <ExternalLink className="w-3 h-3 inline ml-0.5 -mt-0.5" />
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Folder Tree Visualization */}
      <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="bg-gray-800 px-4 py-2.5 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span className="text-xs text-gray-400 font-mono ml-2">AIDD Kit — フォルダ構成</span>
        </div>

        <div className="bg-gray-900 p-5 space-y-2.5">
          {/* .claude/ */}
          <motion.div initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0 }}>
            <div className="flex items-center gap-2 mb-1">
              <FolderOpen className="w-4 h-4 text-primary-400" />
              <span className="text-sm font-mono font-bold text-gray-100">.claude/</span>
            </div>
            <div className="ml-5 pl-3 border-l border-gray-700 space-y-1">
              <div className="flex items-center gap-2">
                <Folder className="w-3.5 h-3.5 text-primary-400" />
                <span className="text-xs font-mono text-gray-300">rules/</span>
                <span className="text-[10px] text-gray-500">— AIの行動ルール</span>
              </div>
              <div className="ml-5 pl-3 border-l border-gray-700">
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-primary-400" />
                  <span className="text-xs font-mono text-gray-400">azure-deploy.md</span>
                  <span className="text-[10px] text-gray-600">— デプロイ先・DB等の技術方針</span>
                </div>
              </div>
            </div>
          </motion.div>
          {/* docs/ */}
          <motion.div initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}>
            <div className="flex items-center gap-2 mb-1">
              <FolderOpen className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-mono font-bold text-gray-100">docs/</span>
            </div>
            <div className="ml-5 pl-3 border-l border-gray-700 space-y-1">
              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-xs font-mono text-gray-300">manifest.md</span>
                <span className="text-[10px] text-gray-500">— 作りたいもののメモ</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-xs font-mono text-gray-300">requirements.md</span>
                <span className="text-[10px] text-gray-500">— 要件定義の雛形</span>
              </div>
            </div>
          </motion.div>
          {/* assets/ */}
          <motion.div initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.16 }}>
            <div className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-mono font-bold text-gray-100">assets/</span>
              <span className="text-[10px] text-gray-500">— 材料を入れるフォルダ（CSV、Excel、画像など）</span>
            </div>
          </motion.div>
          {/* CLAUDE.md */}
          <motion.div initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.24 }}>
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-primary-400" />
              <span className="text-sm font-mono font-bold text-gray-100">CLAUDE.md</span>
              <span className="text-[10px] text-gray-500">— プロジェクト全体のルールファイル</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Description table */}
      <div className="rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-2.5 text-xs font-bold text-gray-500 w-1/3">フォルダ / ファイル</th>
              <th className="text-left px-4 py-2.5 text-xs font-bold text-gray-500">役割</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="px-4 py-3"><code className="text-xs font-mono text-primary-600 bg-primary-50 px-1.5 py-0.5 rounded">.claude/rules/</code></td>
              <td className="px-4 py-3 text-xs text-gray-600">AIの行動ルール。デプロイ先（Azure）やDB（Cosmos DB）など、社内で決まっている技術方針がプリセット済み。<strong className="text-gray-800">基本いじらなくてOK</strong></td>
            </tr>
            <tr>
              <td className="px-4 py-3"><code className="text-xs font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">docs/</code></td>
              <td className="px-4 py-3 text-xs text-gray-600">作りたいもののメモ（manifest.md）と要件定義の雛形（requirements.md）。第2章・第4章で詳しく学びます</td>
            </tr>
            <tr>
              <td className="px-4 py-3"><code className="text-xs font-mono text-yellow-600 bg-yellow-50 px-1.5 py-0.5 rounded">assets/</code></td>
              <td className="px-4 py-3 text-xs text-gray-600">CSV、Excel、画像などの材料を入れるフォルダ。第3章で解説</td>
            </tr>
            <tr>
              <td className="px-4 py-3"><code className="text-xs font-mono text-primary-600 bg-primary-50 px-1.5 py-0.5 rounded">CLAUDE.md</code></td>
              <td className="px-4 py-3 text-xs text-gray-600">プロジェクト全体のルールファイル。第4章で解説</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Rules explanation card */}
      <div className="p-5 rounded-xl bg-gray-50 border border-gray-200">
        <p className="text-sm font-bold text-gray-800 mb-2">
          <code className="text-xs font-mono text-primary-600 bg-primary-50 px-1.5 py-0.5 rounded mr-1">.claude/rules/</code>
          について
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          ここには「どんなアプリでもブレてほしくない基本方針」が入っています。
          タカショーデジテック内ではデプロイ先やDBなど決まっている技術方針があるため、あらかじめ <code className="px-1 py-0.5 rounded bg-gray-100 text-gray-700 text-xs font-mono">azure-deploy.md</code> として組み込んであります。
        </p>
        <p className="text-sm text-gray-600 leading-relaxed mt-2">
          もし皆さんが「毎回AIに守ってほしいルール」を見つけたら、このフォルダにMarkdownファイルを追加していくだけでOKです。
          ルールの追加もClaude Codeに「こういうルールを追加して」と頼めばやってくれます。
        </p>
      </div>

      {/* Reassurance */}
      <p className="text-xs text-gray-400 text-center">
        今は中身が分からなくても大丈夫。研修を進めるうちに、それぞれの役割が分かるようになります。
      </p>
    </motion.div>
  )
}

function Ch5BasicFlowVisual() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(ch5Prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mb-10 pl-0 lg:pl-10 space-y-8">
      {/* Chat input window style prompt */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="flex items-start gap-4">
          <img src={imgHuman04} alt="" className="w-12 h-12 shrink-0 hidden sm:block" />
          <div className="flex-1">
            <p className="text-xs font-semibold text-gray-400 mb-2 ml-1">Claude Code に送るプロンプト</p>
            {/* Chat bubble */}
            <div className="rounded-2xl border-2 border-primary-200 bg-gradient-to-b from-white to-primary-50/30 shadow-lg shadow-primary-100/30 overflow-hidden">
              {/* Message body */}
              <div className="p-5">
                <p className="text-[14px] text-gray-800 leading-[1.7] font-medium">
                  {ch5Prompt}
                </p>
              </div>
              {/* Input bar footer */}
              <div className="border-t border-primary-100 bg-primary-50/50 px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>1回の指示で動くアプリが出てきます</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-600 transition-all"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                  <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center">
                    <Send className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Feedback cycle - vertical flow table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">AI駆動開発の基本サイクル</p>
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          {feedbackCycleSteps.map((step, i) => (
            <div
              key={step.label}
              className={`flex items-center gap-4 px-4 py-3 ${i < feedbackCycleSteps.length - 1 ? 'border-b border-gray-100' : ''} ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
            >
              <span className="text-xs font-bold text-gray-300 w-4 text-center shrink-0">{i + 1}</span>
              <span className="text-sm font-bold text-gray-900 w-20 shrink-0">{step.label}</span>
              <span className="text-sm text-gray-600 flex-1">{step.desc}</span>
              <span className="text-[11px] text-gray-400 font-medium shrink-0">{step.who}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Feedback is key banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="relative rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 p-6 overflow-hidden"
      >
        <div className="flex items-center gap-5">
          <div className="hidden sm:block shrink-0">
            <motion.div
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <RefreshCw className="w-12 h-12 text-amber-400" />
            </motion.div>
          </div>
          <div>
            <p className="text-lg font-black text-amber-900 mb-1">結局大事なのは、フィードバック</p>
            <p className="text-sm text-amber-700 leading-relaxed">
              最初から完璧なものは出てきません。<strong>触って、気づいて、伝えて、直す。</strong>このループを回す速さが、AI駆動開発の実力差になります。
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function Ch5DesignSection({ designSystems: ds }: { readonly designSystems: typeof designSystems }) {
  const [copiedDesign, setCopiedDesign] = useState(false)

  const handleCopyDesign = async () => {
    await navigator.clipboard.writeText(ch5DesignPrompt)
    setCopiedDesign(true)
    setTimeout(() => setCopiedDesign(false), 2000)
  }

  return (
    <div className="mb-10 pl-0 lg:pl-10 space-y-6">
      {/* Design system cards — large 2-col layout */}
      <div className="space-y-5">
        {ds.map((system, di) => (
          <motion.div
            key={system.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: di * 0.1 }}
            className="rounded-2xl border border-gray-200 bg-white overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="aspect-[16/10] md:aspect-auto bg-gray-50 overflow-hidden">
                <img src={system.image} alt={system.name} className="w-full h-full object-cover object-top" />
              </div>
              <div className="p-6 flex flex-col justify-center">
                <h4 className="text-lg font-bold text-gray-900">{system.name}</h4>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{system.description}</p>
                <p className="text-xs text-primary-500 mt-3 font-medium">{system.suited}</p>
                <a
                  href={system.mdUrl}
                  download={system.mdFilename}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Markdownをダウンロード
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Design prompt — compact chat style */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-start gap-3">
          <img src={imgHuman07} alt="" className="w-10 h-10 shrink-0 hidden sm:block" />
          <div className="flex-1 rounded-xl border border-gray-200 bg-white overflow-hidden">
            <div className="p-4">
              <p className="text-sm text-gray-800 font-medium leading-relaxed">{ch5DesignPrompt}</p>
            </div>
            <div className="border-t border-gray-100 px-4 py-2 flex items-center justify-between bg-gray-50/50">
              <span className="text-[11px] text-gray-400">デザイン適用プロンプト</span>
              <button
                onClick={handleCopyDesign}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-white border border-gray-200 text-gray-500 hover:text-primary-600 hover:border-primary-200 transition-all"
              >
                {copiedDesign ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                {copiedDesign ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function Ch5FeedbackVisual() {
  return (
    <div className="mb-10 pl-0 lg:pl-10 space-y-6">
      {/* Screenshot demo */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">スクリーンショットで伝える</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Before: text-only feedback */}
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-semibold text-gray-500">テキストだけ</span>
            </div>
            <div className="rounded-lg bg-gray-50 p-3 mb-3">
              <p className="text-sm text-gray-600 italic">「なんかレイアウトが崩れてる気がする。直して」</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>AIが何を直すべきか推測する必要がある</span>
            </div>
          </div>
          {/* After: screenshot feedback */}
          <div className="rounded-xl border-2 border-primary-200 bg-primary-50/20 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Camera className="w-4 h-4 text-primary-500" />
              <span className="text-xs font-semibold text-primary-600">スクショ + 具体的指示</span>
            </div>
            {/* Mini screenshot mock */}
            <div className="rounded-lg border border-primary-200 bg-white p-3 mb-3 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-full h-3 bg-gray-100 rounded-sm" />
              </div>
              <div className="grid grid-cols-3 gap-1 mb-2">
                <div className="h-8 bg-gray-100 rounded-sm" />
                <div className="h-8 bg-gray-100 rounded-sm" />
                <div className="h-8 bg-red-100 rounded-sm relative">
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 border-2 border-red-400 rounded-sm"
                  />
                </div>
              </div>
              <div className="h-6 bg-gray-100 rounded-sm w-2/3" />
              <div className="absolute top-1 right-1">
                <Image className="w-3 h-3 text-primary-400" />
              </div>
            </div>
            <div className="rounded-lg bg-white border border-primary-100 p-2.5">
              <p className="text-xs text-gray-700 font-medium">「この赤枠の部分、スマホだとはみ出してるからカード表示に切り替えて」</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-primary-500 mt-2">
              <Check className="w-3.5 h-3.5" />
              <span>AIが一発で正確に修正できる</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Iteration is OK */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="flex items-start gap-4 p-5 rounded-2xl bg-blue-50 border border-blue-200"
      >
        <img src={imgS03} alt="" className="w-14 h-14 shrink-0 -mt-1 hidden sm:block" />
        <div>
          <p className="text-sm font-bold text-blue-800 mb-1">何回直してもOK</p>
          <p className="text-sm text-blue-700 leading-relaxed">
            AIは修正の反復に強く、何十回でも嫌がりません。
            「この色を変えて」「文言をこう変えて」と気づいたことをどんどん伝えてください。
          </p>
        </div>
      </motion.div>
    </div>
  )
}

function Ch5ContextVisual() {
  return (
    <div className="mb-10 pl-0 lg:pl-10 space-y-6">
      {/* Screenshot of context window */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Claude Code の入力欄</p>
        <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <img src={imgContextWindow} alt="Context Window 63% used" className="w-full h-auto" />
        </div>
        <p className="text-xs text-gray-500 mt-2 leading-relaxed">
          入力欄の下に表示される <strong>「63% used」</strong> がコンテキスト使用量。これがAIの記憶のキャパシティです。
        </p>
      </motion.div>

      {/* What happens as it fills up */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="space-y-3"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl border border-green-200 bg-green-50/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-3 rounded-full bg-gradient-to-r from-green-300 to-green-400" />
              <span className="text-xs font-bold text-green-700">0〜50%</span>
            </div>
            <p className="text-xs text-green-700">余裕あり。そのまま続けてOK</p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-3 rounded-full bg-gradient-to-r from-amber-300 to-amber-400" />
              <span className="text-xs font-bold text-amber-700">50〜80%</span>
            </div>
            <p className="text-xs text-amber-700">そろそろ注意。キリの良いところでまとめる</p>
          </div>
          <div className="p-4 rounded-xl border border-red-200 bg-red-50/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-3 rounded-full bg-gradient-to-r from-red-300 to-red-400" />
              <span className="text-xs font-bold text-red-700">80%以上</span>
            </div>
            <p className="text-xs text-red-700">危険ゾーン。新しい会話を始める</p>
          </div>
        </div>
      </motion.div>

      {/* Auto compact explanation */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="rounded-2xl border border-gray-200 bg-white p-5 space-y-4"
      >
        <div>
          <p className="text-sm font-bold text-gray-900 mb-1">100%に近づくとどうなる？</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            コンテキストが100%に近づくと、AIの<strong>パフォーマンスが一気に落ちます。</strong>
            記憶のキャパを超えている状態なので、回答が途中で切れたり、前の指示を忘れたり、意図を取り違えることが増えます。
          </p>
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900 mb-1">自動コンパクト機能</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            使用量の円グラフをクリックすると、<strong>AIが自動で記憶を圧縮</strong>してくれます。
            ただし圧縮されると、今までのやりとりが断片的にしか残らなくなります。
          </p>
        </div>
        <div className="border-t border-gray-100 pt-4">
          <p className="text-sm font-bold text-gray-900 mb-2">おすすめの対処法</p>
          <div className="space-y-2">
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-600 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
              <p className="text-sm text-gray-700"><strong>キリの良いところで新しいチャットに切り替える</strong> — 右上のClaudeボタンを押すか、<code className="px-1.5 py-0.5 rounded bg-gray-100 text-primary-600 text-xs font-mono">/clear</code> を実行</p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-600 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
              <p className="text-sm text-gray-700"><strong>CLAUDE.md があれば安心</strong> — 新しいチャットでもプロジェクトのルールは自動で読み込まれる</p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-600 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
              <p className="text-sm text-gray-700"><strong>作業をこまめにコミットする</strong> — コードが保存されていれば、チャットが切れても続きから作業できる</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tip */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-200"
      >
        <Lightbulb className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700 leading-relaxed">
          <strong>コツ：</strong>「実装 → 確認 → コミット」のサイクルごとに新しいチャットにすると、コンテキストが溢れにくくなります。
        </p>
      </motion.div>
    </div>
  )
}

function Ch6DeployFlowVisual() {
  const flowSteps = [
    { icon: Monitor, label: 'PCでアプリを作る', desc: 'Claude Codeで開発', who: 'あなた', color: 'primary' },
    { icon: Upload, label: 'GitHubにプッシュ', desc: '「プッシュして」と伝えるだけ', who: 'Claude Code', color: 'gray' },
    { icon: GitBranch, label: 'GitHub Actions', desc: '自動でビルド＆デプロイ', who: '自動', color: 'gray' },
    { icon: Cloud, label: 'Azureで公開', desc: 'アプリURLでアクセス可能に', who: '自動', color: 'blue' },
  ] as const

  const colorMap = {
    primary: { bg: 'bg-primary-50', border: 'border-primary-200', icon: 'text-primary-500', label: 'text-primary-700' },
    gray: { bg: 'bg-gray-50', border: 'border-gray-200', icon: 'text-gray-500', label: 'text-gray-700' },
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-500', label: 'text-blue-700' },
  } as const

  return (
    <div className="mb-10 pl-0 lg:pl-10 space-y-6">
      {/* Deploy Flow Diagram */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">デプロイの流れ</p>
        <div className="space-y-0">
          {flowSteps.map((step, i) => {
            const colors = colorMap[step.color]
            const Icon = step.icon
            return (
              <div key={step.label}>
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className={`flex items-center gap-4 p-4 rounded-xl border ${colors.border} ${colors.bg}`}
                >
                  <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 ${colors.icon}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-bold ${colors.label}`}>{step.label}</p>
                    <p className="text-xs text-gray-500">{step.desc}</p>
                  </div>
                  <span className="text-[10px] font-medium text-gray-400 shrink-0 bg-white px-2 py-1 rounded-full border border-gray-100">{step.who}</span>
                </motion.div>
                {i < flowSteps.length - 1 && (
                  <div className="flex justify-center py-1">
                    <ArrowDown className="w-4 h-4 text-gray-300" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Beginner comment 1 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="flex items-start gap-3"
      >
        <img src={imgHuman09} alt="" className="w-10 h-10 shrink-0" />
        <div className="flex-1 rounded-2xl bg-amber-50 border border-amber-200 p-4">
          <p className="text-xs font-bold text-amber-700 mb-1">初心者のツッコミ</p>
          <p className="text-sm text-amber-800">「GitHub Actions」って何ですか？自分で何かする必要がありますか？</p>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="flex items-start gap-3"
      >
        <img src={imgHuman15} alt="" className="w-10 h-10 shrink-0" />
        <div className="flex-1 rounded-2xl bg-green-50 border border-green-200 p-4">
          <p className="text-xs font-bold text-green-700 mb-1">回答</p>
          <p className="text-sm text-green-800">大下さんが環境を作るときに自動で設定してくれます。あなたは「プッシュして」と伝えるだけ。あとは全部自動です。</p>
        </div>
      </motion.div>
    </div>
  )
}

function Ch6RequestFlowVisual() {
  const steps = [
    { num: '1', who: 'あなた', action: 'JANDIで大下さんに連絡', detail: '「開発環境がほしいです。〇〇アプリ用です」', whoColor: 'primary' },
    { num: '2', who: '大下さん', action: '空のGitHub + Azure環境を作成', detail: '5〜10分で用意してくれる', whoColor: 'blue' },
    { num: '3', who: '大下さん', action: 'URLを共有', detail: 'GitHubリポジトリURL + アプリURL', whoColor: 'blue' },
    { num: '4', who: 'あなた', action: 'Claude Codeでプッシュ', detail: '「このURLにプッシュして」と伝えるだけ', whoColor: 'primary' },
  ] as const

  return (
    <div className="mb-10 pl-0 lg:pl-10 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">環境申請のステップ</p>
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`flex items-center gap-4 px-4 py-3.5 ${i < steps.length - 1 ? 'border-b border-gray-100' : ''} ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
            >
              <span className="w-7 h-7 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center shrink-0">{step.num}</span>
              <span className={`text-xs font-bold shrink-0 px-2 py-1 rounded-full ${step.whoColor === 'primary' ? 'bg-primary-100 text-primary-700' : 'bg-blue-100 text-blue-700'}`}>{step.who}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900">{step.action}</p>
                <p className="text-xs text-gray-500">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Point callout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="relative rounded-2xl bg-gradient-to-r from-blue-50 to-primary-50 border-2 border-blue-200 p-5 overflow-hidden"
      >
        <div className="flex items-center gap-4">
          <div className="hidden sm:block shrink-0">
            <img src={imgHuman20} alt="" className="w-14 h-14" />
          </div>
          <div>
            <p className="text-sm font-black text-blue-900 mb-1">ポイント</p>
            <p className="text-sm text-blue-700 leading-relaxed">
              環境を作るのは大下さんの役割。あなたがやることは「JANDIで連絡する」と「プッシュする」の2つだけです。
              難しい設定は一切不要。
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function Ch6DailyFlowVisual() {
  const cycleSteps = [
    { label: '修正する', desc: 'Claude Codeに修正を指示', who: 'あなた' },
    { label: '確認する', desc: 'localhostで画面を確認', who: 'あなた' },
    { label: 'プッシュ', desc: '「プッシュして」と伝える', who: 'Claude Code' },
    { label: '自動デプロイ', desc: 'Azureが数分で更新', who: '自動' },
    { label: '公開URL確認', desc: 'アプリURLで最新を確認', who: 'あなた' },
  ] as const

  return (
    <div className="mb-10 pl-0 lg:pl-10 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">日常のサイクル</p>
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          {cycleSteps.map((step, i) => (
            <div
              key={step.label}
              className={`flex items-center gap-4 px-4 py-3 ${i < cycleSteps.length - 1 ? 'border-b border-gray-100' : ''} ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
            >
              <span className="text-xs font-bold text-gray-300 w-4 text-center shrink-0">{i + 1}</span>
              <span className="text-sm font-bold text-gray-900 w-24 shrink-0">{step.label}</span>
              <span className="text-sm text-gray-600 flex-1">{step.desc}</span>
              <span className="text-[11px] text-gray-400 font-medium shrink-0">{step.who}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Beginner tip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="flex items-start gap-3"
      >
        <img src={imgTipHuman} alt="" className="w-10 h-10 shrink-0" />
        <div className="flex-1 rounded-2xl bg-primary-50 border border-primary-200 p-4">
          <p className="text-xs font-bold text-primary-700 mb-1">アドバイス</p>
          <p className="text-sm text-primary-800">修正するたびにプッシュする必要はありません。localhostで何回か確認して、「よし、これでOK」と思ったタイミングでプッシュすれば大丈夫です。</p>
        </div>
      </motion.div>
    </div>
  )
}

export function Chapter() {
  const { id } = useParams<{ id: string }>()
  const chapterId = Number(id)
  const chapter = chapters.find(c => c.id === chapterId)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [chapterId])

  if (!chapter) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 mb-4">Chapter not found</p>
        <Link to="/" className="text-primary-600 hover:underline">Back to home</Link>
      </div>
    )
  }

  const prevChapter = chapters.find(c => c.id === chapterId - 1)
  const nextChapter = chapters.find(c => c.id === chapterId + 1)
  const qa = chapterQA[chapterId]
  const examples = concreteExamples[chapterId]
  const getMarkdown = useCallback(() => generateChapterMarkdown(chapter), [chapter])

  return (
    <div>
      {/* Breadcrumb + Copy */}
      <div className="flex items-center justify-between mb-8">
        <nav className="flex items-center gap-1.5 text-xs text-gray-400">
          <Link to="/" className="hover:text-gray-600 transition-colors">Overview</Link>
          <span>/</span>
          <span className="text-gray-700 font-medium">Chapter {chapter.id}</span>
        </nav>
        <CopyPageButton getMarkdown={getMarkdown} />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10 relative overflow-hidden"
      >
        <div className="flex items-start gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="text-[11px] font-bold text-primary-500 uppercase tracking-widest">
                {chapter.id === 9 ? 'Bonus Chapter' : `Chapter ${chapter.id}`}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full font-medium">
                <Clock className="w-3 h-3" /> {chapter.duration}
              </span>
            </div>

            <h1 className="text-[24px] sm:text-3xl lg:text-4xl font-black tracking-[0.01em] leading-[1.3] mb-4 text-gray-900">
              {chapter.title}
            </h1>

        {/* TOC pills */}
        <div className="flex flex-wrap gap-1.5">
          {chapter.sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-[11px] px-2.5 py-1 rounded-full border border-gray-200 text-gray-500 hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50 transition-all"
            >
              {s.title}
            </a>
          ))}
          {chapter.prompts.length > 0 && (
            <a href="#prompts" className="text-[11px] px-2.5 py-1 rounded-full border border-primary-200 text-primary-500 hover:bg-primary-50 transition-all">
              Prompts
            </a>
          )}
        </div>
          </div>
          {chapterIllustrations[chapter.id] && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5, ease: 'easeOut' }}
              className="hidden md:block shrink-0 w-32 lg:w-44 self-center"
            >
              <img
                src={chapterIllustrations[chapter.id]}
                alt=""
                className="w-full h-auto"
              />
            </motion.div>
          )}
        </div>
      </motion.header>

      {/* Core Message */}
      <KeyMessageBanner message={chapter.coreMessage} color="#d4764e" />

      {/* Chapter 1: Comparison */}
      {chapter.id === 1 && (
        <div className="my-10">
          <AnimatedComparison />
        </div>
      )}

      {/* Sections */}
      {chapter.sections.map((section, i) => (
        <div key={section.id}>
          <SectionRenderer section={section} index={i} />

          {/* Ch.1: AIDD Kit visual after aidd-kit section */}
          {chapter.id === 1 && section.id === 'aidd-kit' && (
            <Ch1AiddKitVisual />
          )}

          {/* Ch.3: Folder tree visualization after assets-folder section */}
          {chapter.id === 3 && section.id === 'assets-folder' && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10 pl-0 lg:pl-10"
            >
              <p className="text-xs font-bold text-primary-500 uppercase tracking-widest mb-3">フォルダ構成イメージ</p>
              <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-5 sm:p-6">
                {/* Folder tree */}
                <div className="font-mono text-sm space-y-1.5">
                  <div className="flex items-center gap-2 text-gray-800">
                    <FolderOpen className="w-4.5 h-4.5 text-gray-500" />
                    <span className="font-bold text-[15px]">my-project/</span>
                  </div>
                  <div className="ml-6 space-y-1.5">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Folder className="w-4 h-4" />
                      <span>docs/</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FolderOpen className="w-4.5 h-4.5 text-primary-500" />
                      <span className="font-bold text-[15px] text-primary-600">assets/</span>
                      <span className="text-[11px] font-semibold text-primary-500 bg-primary-50 px-2.5 py-0.5 rounded-full">← ここに材料を入れる</span>
                    </div>
                    <div className="ml-6 space-y-1.5 border-l-2 border-primary-100 pl-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Table2 className="w-3.5 h-3.5 text-primary-400" />
                        <span className="font-medium">bank_export_202503.csv</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <FileSpreadsheet className="w-3.5 h-3.5 text-primary-400" />
                        <span className="font-medium">社内Excel_テンプレート.xlsx</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Table2 className="w-3.5 h-3.5 text-primary-400" />
                        <span className="font-medium">勘定科目マスタ.csv</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Image className="w-3.5 h-3.5 text-primary-400" />
                        <span className="font-medium">company_logo.png</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <FileText className="w-3.5 h-3.5 text-primary-400" />
                        <span className="font-medium">操作マニュアル.pdf</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-5 border-t border-gray-200" />

                {/* File type cards */}
                <p className="text-xs font-bold text-primary-500 uppercase tracking-widest mb-3">入れるファイルの種類</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {[
                    { icon: Table2, label: 'CSV / Excel', desc: 'データの構造をAIが読み取る', example: '入出金CSV、顧客リスト' },
                    { icon: FileText, label: 'PDF / Word', desc: '仕様や手順の前提として活用', example: '操作マニュアル、社内規定' },
                    { icon: Image, label: '画像・写真', desc: 'UIに組み込み or デザイン参考', example: 'ロゴ、製品写真、参考UI' },
                    { icon: FileSpreadsheet, label: '雛形・テンプレート', desc: '出力フォーマットとして再現', example: '月次報告シート、請求書' },
                    { icon: FileCode, label: 'コード・設定', desc: '既存の仕組みを引き継ぐ', example: 'API仕様書、設定ファイル' },
                    { icon: Eye, label: '参考スクショ', desc: 'デザインの方向性を指示', example: '「こんな感じ」の画面写真' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3 p-3 rounded-lg bg-white border border-gray-200 hover:border-primary-200 transition-colors">
                      <div className="w-7 h-7 rounded-md bg-primary-50 flex items-center justify-center shrink-0 mt-0.5">
                        <item.icon className="w-4 h-4 text-primary-500" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-gray-900">{item.label}</p>
                        <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5 italic">{item.example}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Ch.3: Words vs File comparison after why-files section */}
          {chapter.id === 3 && section.id === 'why-files' && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10 pl-0 lg:pl-10"
            >
              <p className="text-xs font-bold text-primary-500 uppercase tracking-widest mb-3">比較：言葉 vs ファイル</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Words approach */}
                <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
                  <div className="px-4 py-2.5 bg-gray-100 border-b border-gray-200">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">言葉で説明した場合</p>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="rounded-lg bg-gray-50 p-3">
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">あなたの入力</p>
                      <p className="text-sm text-gray-600 leading-relaxed italic">
                        「CSVには日付、摘要、入金、出金、残高の列があって、日付はYYYY/MM/DD形式で、金額はカンマ区切りで…」
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <ArrowDown className="w-4 h-4 text-gray-300" />
                    </div>
                    <div className="rounded-lg border border-gray-200 p-3">
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">AIの理解</p>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                          <span className="text-sm text-gray-500">列構造を<strong className="text-gray-700">推測</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                          <span className="text-sm text-gray-500">データ型を<strong className="text-gray-700">推測</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                          <span className="text-sm text-gray-500">例外パターンは<strong className="text-gray-700">不明</strong></span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 text-center font-medium">伝え漏れ・解釈ズレが起きやすい</p>
                  </div>
                </div>

                {/* File approach */}
                <div className="rounded-xl border-2 border-primary-200 bg-white overflow-hidden">
                  <div className="px-4 py-2.5 bg-primary-50 border-b border-primary-200">
                    <p className="text-xs font-bold text-primary-600 uppercase tracking-widest">ファイルを渡した場合</p>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="rounded-lg bg-primary-50/50 p-3">
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">あなたの入力</p>
                      <div className="flex items-center gap-2">
                        <Table2 className="w-4 h-4 text-primary-500" />
                        <span className="text-sm font-mono font-bold text-gray-800">bank_export.csv</span>
                        <span className="text-[11px] text-gray-400">（置くだけ）</span>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <ArrowDown className="w-4 h-4 text-primary-400" />
                    </div>
                    <div className="rounded-lg border border-primary-200 p-3">
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">AIの理解</p>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                          <span className="text-sm text-gray-700">列名・型を<strong className="text-primary-600 font-bold">正確に把握</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                          <span className="text-sm text-gray-700">実データから<strong className="text-primary-600 font-bold">傾向を理解</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                          <span className="text-sm text-gray-700">例外・欠損を<strong className="text-primary-600 font-bold">自動検出</strong></span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-primary-600 text-center font-bold">実物 = 最強の仕様書</p>
                  </div>
                </div>
              </div>

              {/* Bottom tip */}
              <div className="mt-4 flex items-start gap-3 p-4 rounded-xl bg-primary-50/60 border border-primary-100">
                <Zap className="w-4 h-4 text-primary-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-primary-700">ポイント</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    AIにとって、実際のファイルは<strong className="text-gray-900">最強の仕様書</strong>です。言葉で100行説明するより、ファイルを1つ渡す方が正確で速い。
                    <strong className="text-primary-600">まず手持ちの材料をそのまま assets/ に入れてみましょう。</strong>
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Ch.4: Beginner tip after intro */}
          {chapter.id === 4 && section.id === 'intro' && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10 pl-0 lg:pl-10"
            >
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-amber-50 border border-amber-200">
                <img src={imgTipHuman} alt="" className="w-14 h-14 shrink-0 -mt-1" />
                <div>
                  <p className="text-sm font-bold text-amber-800 mb-1">ワンポイント</p>
                  <p className="text-sm text-amber-700 leading-relaxed">
                    manifest.md + assets/ だけで第5章に進んでも、ちゃんと動くアプリが作れます。
                    この章は「もっとこだわりたい」人向けのオプションです。気楽に読んでください。
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Ch.4: requirements.md checklist cards after requirements section */}
          {chapter.id === 4 && section.id === 'requirements' && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10 pl-0 lg:pl-10"
            >
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">requirements.md に入れる5つの観点</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {requirementsChecklist.map((item, ci) => {
                  const Icon = iconMap[item.icon as keyof typeof iconMap]
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: ci * 0.06 }}
                      className="p-4 rounded-xl border border-gray-200 bg-white hover:border-primary-200 hover:bg-primary-50/30 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary-500 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-bold text-gray-900">{item.label}</span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                    </motion.div>
                  )
                })}
              </div>

              {/* Beginner tip */}
              <div className="mt-4 flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-200">
                <Lightbulb className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-sm text-blue-700 leading-relaxed">
                  <strong>技術的なことは書かなくてOK。</strong>「Reactで作る」のような技術選定はAIに任せましょう。
                  あなたが書くのは「このページを開いたらまず何が見えるか」「ボタンを押したらどこに行くか」だけです。
                </p>
              </div>
            </motion.div>
          )}

          {/* Ch.4: requirements.md template + prompt after requirements-prompt section */}
          {chapter.id === 4 && section.id === 'requirements-prompt' && (
            <div className="mb-10 pl-0 lg:pl-10 space-y-6">
              {/* requirements.md template */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-primary-500" />
                  <p className="text-sm font-bold text-gray-700">requirements.md の見本</p>
                </div>
                <p className="text-xs text-gray-400 mb-3">Claude Code に作ってもらうと、こんなものが出来上がります。中身はユーザー体験の言語化です。</p>
                <CodeBlock code={requirementsMdTemplate} language="markdown" title="docs/requirements.md (例)" />
              </motion.div>

              {/* Feedback tip */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-amber-50 border border-amber-200"
              >
                <img src={imgTipHuman} alt="" className="w-14 h-14 shrink-0 -mt-1" />
                <div>
                  <p className="text-sm font-bold text-amber-800 mb-1">コツ：読み返してフィードバックする</p>
                  <p className="text-sm text-amber-700 leading-relaxed">
                    AIが作った requirements.md をそのまま使うのではなく、必ず読み返しましょう。
                    「この画面遷移は違う」「エラー時にもっと親切なメッセージがほしい」など、
                    気づいたことを何度でも伝えてOKです。
                  </p>
                </div>
              </motion.div>
            </div>
          )}

          {/* Ch.4: Visual comparison (Requirements vs CLAUDE.md) after claude-md section */}
          {chapter.id === 4 && section.id === 'claude-md' && (
            <div className="mb-10 pl-0 lg:pl-10 space-y-6">
              {/* Side-by-side comparison cards */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="rounded-2xl border-2 border-primary-200 bg-primary-50/30 p-5">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">requirements.md</p>
                      <p className="text-[11px] text-primary-500 font-medium">ユーザーのための文書</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary-400 shrink-0 mt-0.5" /> 使い心地・体験・導線を定義</li>
                    <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary-400 shrink-0 mt-0.5" /> 画面ごとに何が見えるかを書く</li>
                    <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary-400 shrink-0 mt-0.5" /> 例え：お客さん目線の仕様書</li>
                  </ul>
                </div>
                <div className="rounded-2xl border-2 border-gray-200 bg-gray-50/50 p-5">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-gray-200 text-gray-600 flex items-center justify-center">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">CLAUDE.md</p>
                      <p className="text-[11px] text-gray-500 font-medium">AIエージェントのための文書</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" /> 実装方針・命名規則・制約</li>
                    <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" /> /init で自動生成される</li>
                    <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" /> 例え：AIへの作業マニュアル</li>
                  </ul>
                </div>
              </motion.div>

              {/* /init tip */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-200"
              >
                <Lightbulb className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-sm text-blue-700 leading-relaxed">
                  <strong>CLAUDE.md は自分で書かなくてOK。</strong>
                  <code className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-600 text-xs font-mono">/init</code> を実行するだけで、
                  AIがプロジェクトの中身を読み取って最適なルールファイルを作ってくれます。
                  生成後に「ここを変えて」と調整するだけです。
                </p>
              </motion.div>
            </div>
          )}

          {/* Ch.4: Visual 5-step flow after workflow section */}
          {chapter.id === 4 && section.id === 'workflow' && (
            <div className="mb-10 pl-0 lg:pl-10 space-y-6">
              {/* Flow diagram */}
              <div className="space-y-3">
                {workflowSteps.map((step, si) => (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: si * 0.08 }}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                      step.isOptional
                        ? 'border-dashed border-primary-300 bg-primary-50/30'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <span className={`text-2xl font-black tabular-nums leading-none shrink-0 w-8 text-center ${
                      step.isOptional ? 'text-primary-300' : 'text-gray-200'
                    }`}>
                      {step.num}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-gray-900">{step.label}</h4>
                        {step.isOptional && (
                          <span className="text-[9px] font-bold text-primary-500 bg-primary-100 px-2 py-0.5 rounded-full">OPTIONAL</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{step.desc}</p>
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium shrink-0 hidden sm:block">{step.chapter}</span>
                  </motion.div>
                ))}
              </div>

              {/* Illustration + final message */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-200"
              >
                <img src={imgM14} alt="" className="w-24 h-auto shrink-0" />
                <div>
                  <p className="text-sm font-bold text-gray-800 mb-1">ステップ3・4 は省略してもOK</p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    manifest.md と assets/ だけで第5章に進んでも、十分に動くアプリが作れます。
                    requirements.md と CLAUDE.md は「もう一歩こだわりたい」ときに活用してください。
                  </p>
                </div>
              </motion.div>
            </div>
          )}

          {/* Ch.5: Chat Input Prompt + Feedback emphasis after basic-flow section */}
          {chapter.id === 5 && section.id === 'basic-flow' && (
            <Ch5BasicFlowVisual />
          )}

          {/* Ch.5: Design System Showcase after design section */}
          {chapter.id === 5 && section.id === 'design' && (
            <Ch5DesignSection designSystems={designSystems} />
          )}

          {/* Ch.5: Browser Mock after localhost section */}
          {chapter.id === 5 && section.id === 'localhost' && (
            <div className="mb-10 pl-0 lg:pl-10">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-xl border border-gray-200 overflow-hidden shadow-sm"
              >
                {/* Browser chrome */}
                <div className="bg-gray-100 border-b border-gray-200 px-4 py-2.5 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-white rounded-md px-3 py-1 text-xs text-gray-500 font-mono border border-gray-200">
                      localhost:5173
                    </div>
                  </div>
                </div>
                {/* App content mock */}
                <div className="bg-white p-6">
                  <div className="max-w-lg mx-auto space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600 text-xs font-bold">CSV</div>
                        <span className="text-sm font-bold text-gray-800">入出金CSV変換ツール</span>
                      </div>
                      <span className="text-xs text-gray-400">経理部用</span>
                    </div>
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
                      <div className="text-gray-400 text-sm">CSVファイルをドラッグ&ドロップ</div>
                      <div className="text-xs text-gray-300 mt-1">または クリックしてファイルを選択</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="rounded-lg bg-gray-50 p-3 text-center">
                        <div className="text-xs text-gray-400">取込件数</div>
                        <div className="text-lg font-bold text-gray-800">—</div>
                      </div>
                      <div className="rounded-lg bg-gray-50 p-3 text-center">
                        <div className="text-xs text-gray-400">マッピング済</div>
                        <div className="text-lg font-bold text-gray-800">—</div>
                      </div>
                      <div className="rounded-lg bg-gray-50 p-3 text-center">
                        <div className="text-xs text-gray-400">エラー</div>
                        <div className="text-lg font-bold text-gray-800">—</div>
                      </div>
                    </div>
                    <button className="w-full bg-primary-600 text-white text-sm font-semibold py-2.5 rounded-lg opacity-50 cursor-not-allowed">
                      Excel に変換してダウンロード
                    </button>
                  </div>
                </div>
              </motion.div>
              <p className="text-xs text-gray-400 mt-2 text-center">※ これは表示イメージです。実際にはClaude Codeが生成したアプリがブラウザで動きます。</p>
            </div>
          )}

          {/* Ch.5: Screenshot visual after feedback section */}
          {chapter.id === 5 && section.id === 'feedback' && (
            <Ch5FeedbackVisual />
          )}

          {/* Ch.5: Context management visual after context-management section */}
          {chapter.id === 5 && section.id === 'context-management' && (
            <Ch5ContextVisual />
          )}

          {/* Ch.6: Deploy flow visual after overall-flow section */}
          {chapter.id === 6 && section.id === 'overall-flow' && (
            <Ch6DeployFlowVisual />
          )}

          {/* Ch.6: Request flow visual after deploy-steps section */}
          {chapter.id === 6 && section.id === 'deploy-steps' && (
            <Ch6RequestFlowVisual />
          )}

          {/* Ch.6: Daily flow visual after daily-flow section */}
          {chapter.id === 6 && section.id === 'daily-flow' && (
            <Ch6DailyFlowVisual />
          )}
        </div>
      ))}

      {/* Comparison Table (Ch.1) */}
      {chapter.comparisons && chapter.comparisons.length > 0 && (
        <div className="my-10">
          <h3 className="text-lg font-bold text-gray-900 leading-[1.52] tracking-[0.01em] mb-3">よくある誤解 vs 実際</h3>
          <ComparisonTable rows={chapter.comparisons} />
        </div>
      )}

      {/* Concrete Examples */}
      {examples && examples.length > 0 && (
        <div className="my-10">
          <h3 className="text-lg font-bold text-gray-900 leading-[1.52] tracking-[0.01em] mb-1">具体例</h3>
          <p className="text-sm text-gray-500 mb-4">実際にどんな入力をすると、何が起きるか</p>
          <div className="space-y-4">
            {examples.map((ex, i) => (
              <ConcreteExampleCard key={ex.situation} example={ex} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Ch.6: Deploy Demo */}
      {chapter.id === 6 && (
        <div className="my-10">
          <h3 className="text-lg font-bold text-gray-900 leading-[1.52] tracking-[0.01em] mb-1">Demo: プッシュ & デプロイ</h3>
          <p className="text-sm text-gray-500 mb-4">コミット、プッシュもClaude Codeに任せられます。プッシュすればAzureが自動で更新。</p>
          <VSCodeSimulator lines={githubLines} title="my-project - Claude Code" activeFile="Terminal - Git" />
        </div>
      )}

      {/* Ch.8: LINE Bot Code + .env + Security */}
      {chapter.id === 8 && (
        <div className="my-10 space-y-8">
          <div>
            <h3 className="text-lg font-bold text-gray-900 leading-[1.52] tracking-[0.01em] mb-1">LINE Bot のコード例</h3>
            <p className="text-sm text-gray-500 mb-4">写真を送ったら製品を判定、テキストなら問い合わせを分類して回答。Claude Codeがこの雛形を生成します。</p>
            <CodeBlock code={lineBotCode} language="typescript" title="server.ts (LINE Webhook)" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 leading-[1.52] tracking-[0.01em] mb-1">.env.example の例</h3>
            <p className="text-sm text-gray-500 mb-4">
              実際の値は <code className="px-1 py-0.5 rounded bg-gray-100 text-gray-600 text-xs font-mono">.env</code> に、
              <code className="px-1 py-0.5 rounded bg-gray-100 text-gray-600 text-xs font-mono">.gitignore</code> で除外。
            </p>
            <CodeBlock code={envExampleCode} language="bash" title=".env.example" />
          </div>
          <div className="p-4 rounded-xl bg-red-50 border border-red-100">
            <div className="flex items-center gap-2 mb-1.5">
              <ShieldCheck className="w-4 h-4 text-red-400" />
              <span className="text-sm font-bold text-red-700">Security Rule</span>
            </div>
            <p className="text-sm text-red-600">見える場所に鍵を置かない。APIキーはフロントに置かない。これは鉄則です。</p>
          </div>
        </div>
      )}

      {/* Ch.9: Classification code */}
      {chapter.id === 9 && (
        <div className="my-10">
          <h3 className="text-lg font-bold text-gray-900 leading-[1.52] tracking-[0.01em] mb-1">分類型LLMのコード例</h3>
          <p className="text-sm text-gray-500 mb-4">LLMに「仕分ける」だけ任せる。安くて安定します。</p>
          <CodeBlock code={classificationCode} language="typescript" title="classification.ts" />
        </div>
      )}

      {/* Q&A */}
      {qa && qa.length > 0 && (
        <div className="my-10">
          <h3 className="text-lg font-bold text-gray-900 leading-[1.52] tracking-[0.01em] mb-1">よくある質問</h3>
          <p className="text-sm text-gray-500 mb-2">初心者目線で気になるポイント</p>
          <QADialogue items={qa} />
        </div>
      )}

      {/* Prompts */}
      {chapter.prompts.length > 0 && (
        <div id="prompts" className="my-10">
          <h3 className="text-lg font-bold text-gray-900 leading-[1.52] tracking-[0.01em] mb-1">Prompt Collection</h3>
          <p className="text-sm text-gray-500 mb-4">そのままClaude Codeに投げられます。コピーボタンで取得。</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {chapter.prompts.map((prompt, i) => (
              <PromptCard key={prompt.label} label={prompt.label} prompt={prompt.prompt} index={i} />
            ))}
          </div>

          {/* Ch.1 callout: compare the two prompts */}
          {chapter.id === 1 && (
            <div className="mt-5 p-4 rounded-xl bg-amber-50 border border-amber-200">
              <div className="flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <span className="text-sm font-bold text-amber-800">まずは体感する</span>
                  <p className="text-sm text-amber-700 mt-1 leading-relaxed">
                    「丸投げ」でも、AIがタスクやニーズを分解・解釈して、ちゃんと形にしてくれることを実感してください。
                    さらに「和モダンで」とひと言添えるだけで、デザインの方向性まで汲み取って反映してくれます。
                  </p>
                  <p className="text-sm text-amber-700 mt-2 leading-relaxed">
                    では、実際にこれを<strong>現場で使えるレベルのアプリ</strong>に仕上げていくにはどうすればいいか？ — この後の章で紹介していきます。
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Hands-on */}
      {chapter.handsOn && <HandsOnBlock description={chapter.handsOn} />}

      {/* Resources */}
      {chapter.resources.length > 0 && (
        <div className="my-10">
          <h3 className="text-lg font-bold text-gray-900 leading-[1.52] tracking-[0.01em] mb-4">Resources</h3>
          <div className="border border-gray-200 rounded-xl divide-y divide-gray-100 overflow-hidden">
            {chapter.resources.map((resource, i) => (
              <ResourceCard key={resource.url} resource={resource} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-14 pt-6 border-t border-gray-200">
        {prevChapter ? (
          <Link
            to={`/chapter/${prevChapter.id}`}
            className="group flex items-center gap-2 py-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="font-medium">{prevChapter.title}</span>
          </Link>
        ) : (
          <Link to="/" className="group flex items-center gap-2 py-2 text-sm text-gray-500 hover:text-gray-800 transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="font-medium">Overview</span>
          </Link>
        )}
        {nextChapter ? (
          <Link
            to={`/chapter/${nextChapter.id}`}
            className="group flex items-center gap-2 py-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
          >
            <span className="font-medium">{nextChapter.title}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        ) : (
          <Link to="/" className="group flex items-center gap-2 py-2 text-sm text-gray-500 hover:text-gray-800 transition-colors">
            <span className="font-medium">Overview に戻る</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        )}
      </div>
    </div>
  )
}
