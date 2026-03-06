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
import { VSCodeSimulator, demoLines, feedbackLines, githubLines } from '../components/ui/VSCodeSimulator'
import { AnimatedComparison } from '../components/ui/AnimatedComparison'
import { FlowDiagram } from '../components/ui/FlowDiagram'
import { CopyPageButton } from '../components/ui/CopyPageButton'
import { generateChapterMarkdown } from '../utils/generateMarkdown'
import { ArrowLeft, ArrowRight, Clock, ShieldCheck, Lightbulb, Download } from 'lucide-react'
import { useEffect, useCallback } from 'react'
import { chapterIllustrations } from '../data/illustrations'

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

const claudeMdTemplate = `# CLAUDE.md

## Project Goal
このプロジェクトは、○○を実現するWebアプリを作ることを目的とします。
まずはローカルで動く最小構成を作り、必要に応じて改善します。

## Priority
1. まず動くこと
2. シンプルでわかりやすいこと
3. 保守しやすいこと
4. 必要以上に複雑にしないこと

## Users
主な利用者は○○です。
複雑なUIや専門用語は避け、迷いにくい導線を優先してください。

## Environment
- まずはローカルで起動確認できる状態を作る
- 必要に応じてVercelへデプロイしやすい構成にする
- 環境変数が必要な場合は .env.example を用意する

## Implementation Policy
- まず最小構成で実装する
- 一度に過剰実装しない
- 読みやすい構成を優先する

## UI / UX
- シンプル・クリーン・わかりやすく
- 迷いにくいUIを優先する

## Security
- APIキーや秘密情報をフロントエンドに直書きしない
- 認証情報は環境変数で扱う

## Testing
- 実装後はローカルで起動確認できる状態にする
- 重要なロジックにはテストを追加する

## Completion Criteria
- ローカルで起動できる
- 主要機能が最低限動く
- 次に直すべき点が明確になっている`

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

          {/* Ch.5: Design System Showcase after design section */}
          {chapter.id === 5 && section.id === 'design' && (
            <div className="mb-10 pl-0 lg:pl-10">
              <p className="text-sm text-gray-500 mb-5">プロジェクトに近いものを選んでダウンロード。<code className="px-1.5 py-0.5 rounded bg-gray-100 text-primary-600 text-xs font-mono">docs/</code> フォルダに入れるだけで、AIが自動参照していい感じのデザインに仕上げてくれます。</p>
              <div className="space-y-6">
                {designSystems.map((ds, di) => (
                  <motion.div
                    key={ds.name}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: di * 0.1 }}
                    className="rounded-2xl border border-gray-200 bg-white overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                      <div className="aspect-[16/10] md:aspect-auto bg-gray-50 overflow-hidden">
                        <img src={ds.image} alt={ds.name} className="w-full h-full object-cover object-top" />
                      </div>
                      <div className="p-6 flex flex-col justify-center">
                        <h4 className="text-lg font-bold text-gray-900">{ds.name}</h4>
                        <p className="text-sm text-gray-600 mt-2 leading-relaxed">{ds.description}</p>
                        <p className="text-xs text-gray-400 mt-3 font-mono leading-relaxed">{ds.excerpt}</p>
                        <p className="text-xs text-primary-500 mt-3 font-medium">{ds.suited}</p>
                        <a
                          href={ds.mdUrl}
                          download={ds.mdFilename}
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
            </div>
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

      {/* CLAUDE.md Template (Ch.4) */}
      {chapter.id === 4 && (
        <div className="my-10">
          <h3 className="text-lg font-bold text-gray-900 leading-[1.52] tracking-[0.01em] mb-1">CLAUDE.md の見本</h3>
          <p className="text-sm text-gray-500 mb-4"><code className="px-1.5 py-0.5 rounded bg-gray-100 text-primary-600 text-xs font-mono">/init</code> で自動生成すると、大体こんなものが出来上がります。参考としてご覧ください。</p>
          <CodeBlock code={claudeMdTemplate} language="markdown" title="CLAUDE.md (Template)" />
        </div>
      )}


      {/* Ch.5: VS Code Demos + Flow */}
      {chapter.id === 5 && (
        <div className="my-10 space-y-10">
          <div>
            <h3 className="text-lg font-bold text-gray-900 leading-[1.52] tracking-[0.01em] mb-1">Demo: ゼロから実装する</h3>
            <p className="text-sm text-gray-500 mb-4">Claude Codeがプロジェクトを構築する流れです。</p>
            <VSCodeSimulator lines={demoLines} title="my-project - Claude Code" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 leading-[1.52] tracking-[0.01em] mb-1">Demo: フィードバック → 修正</h3>
            <p className="text-sm text-gray-500 mb-4">見て気づいたことをそのまま伝えるだけ。</p>
            <VSCodeSimulator lines={feedbackLines} title="my-project - Claude Code" activeFile="Terminal - Feedback" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 leading-[1.52] tracking-[0.01em] mb-1">AI駆動開発の基本フロー</h3>
            <FlowDiagram />
          </div>
        </div>
      )}

      {/* Ch.6: GitHub Demo */}
      {chapter.id === 6 && (
        <div className="my-10">
          <h3 className="text-lg font-bold text-gray-900 leading-[1.52] tracking-[0.01em] mb-1">Demo: Git管理 & PR作成</h3>
          <p className="text-sm text-gray-500 mb-4">コミット、プッシュ、PR作成もClaude Codeに任せられます。</p>
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
