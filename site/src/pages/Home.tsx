import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { chapters, keyMessages, timeline } from '../data/chapters'
import { heroIllustration, designPhaseHumans } from '../data/illustrations'
import { GridBackground } from '../components/ui/GridBackground'
import { AnimatedCounter } from '../components/ui/AnimatedCounter'
import { AnimatedComparison } from '../components/ui/AnimatedComparison'
import { FlowDiagram } from '../components/ui/FlowDiagram'
import { VSCodeSimulator, demoLines } from '../components/ui/VSCodeSimulator'
import {
  ArrowRight, ExternalLink,
  Play, ChevronRight, Monitor
} from 'lucide-react'
import { CopyPageButton } from '../components/ui/CopyPageButton'
import { generateHomeMarkdown } from '../utils/generateMarkdown'
import claudeLogo from '../assets/Claude Logo.png'

export function Home() {
  return (
    <div className="relative">
      {/* Copy button */}
      <div className="flex justify-end mb-2">
        <CopyPageButton getMarkdown={generateHomeMarkdown} />
      </div>

      {/* Hero */}
      <section className="relative mb-20 pt-4">
        <GridBackground />
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:gap-8">
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-[11px] font-semibold border border-primary-100">
              <img src={claudeLogo} alt="" className="w-3.5 h-3.5" /> AI-Driven Development
            </span>
            <span className="text-[11px] text-gray-400 font-medium">5h training</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-5"
          >
            <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase">
              Claude Code ではじめる
            </span>
            <h1 className="text-[27px] sm:text-4xl lg:text-5xl font-black tracking-[0.01em] leading-[1.25] mt-1">
              AI駆動開発
              <span className="text-gradient"> 入門研修</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-base text-gray-500 leading-relaxed max-w-xl mb-8"
          >
            AIに作ってもらう。ただし、うまく作ってもらうための<strong className="text-gray-800">材料は人が渡す。</strong>
            <br />
            Claude Codeを主役に、実務で自走できる状態を目指します。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            <Link
              to="/chapter/1"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors"
            >
              <Play className="w-3.5 h-3.5" /> 研修を始める
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/setup"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <Monitor className="w-3.5 h-3.5" /> セットアップガイド
            </Link>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
          className="hidden lg:block shrink-0 w-64 xl:w-80"
        >
          <img
            src={heroIllustration}
            alt=""
            className="w-full h-auto mix-blend-multiply"
          />
        </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <AnimatedCounter value={9} suffix=" chapters" label="Content" description="基礎から応用まで" color="#d4764e" />
          <AnimatedCounter value={5} suffix=" hours" label="Duration" description="実践型ハンズオン" color="#d4764e" />
          <AnimatedCounter value={30} suffix="+" label="Resources" description="厳選リソースリンク" color="#d4764e" />
          <AnimatedCounter value={20} suffix="+" label="Prompts" description="すぐ使えるプロンプト集" color="#d4764e" />
        </div>
      </section>

      {/* VS Code Demo */}
      <section className="mb-16">
        <SectionLabel>Live Demo</SectionLabel>
        <p className="text-sm text-gray-500 mb-4">
          Claude Codeがプロジェクトをゼロから構築する流れ。これが「AIに作ってもらう」体験です。
        </p>
        <VSCodeSimulator
          lines={demoLines}
          title="my-project - Claude Code"
          files={['manifest.md', 'CLAUDE.md', 'assets/data.csv', 'package.json', 'src/App.tsx', 'src/components/']}
        />
      </section>

      {/* Comparison */}
      <section className="mb-16">
        <SectionLabel>Comparison</SectionLabel>
        <p className="text-sm text-gray-500 mb-6">同じ成果物を作るのに、これだけの差が生まれます。</p>
        <AnimatedComparison />
      </section>

      {/* Flow */}
      <section className="mb-16">
        <SectionLabel>Workflow</SectionLabel>
        <p className="text-sm text-gray-500 mb-2">材料を渡して、AIが作って、見て直す。このループで開発を進めます。</p>
        <FlowDiagram />
      </section>

      {/* 3-phase */}
      <section className="mb-16">
        <SectionLabel>Design Philosophy</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          {[
            { step: '01', title: 'まず作れるようにする', desc: '成功体験を通じて感覚を掴む', range: 'Ch.1-5' },
            { step: '02', title: '品質を上げるコツ', desc: 'デザイン・スキル・テストの活用', range: 'Ch.5-7' },
            { step: '03', title: '実務運用の勘所', desc: 'API連携、セキュリティ、LLM設計', range: 'Ch.8-9' }
          ].map((p, i) => (
            <motion.div
              key={p.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative p-5 rounded-xl border border-gray-200 bg-white overflow-hidden"
            >
              <span className="text-2xl font-black text-gray-100">{p.step}</span>
              <h3 className="text-sm font-bold text-gray-900 mt-1">{p.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{p.desc}</p>
              <span className="inline-block mt-3 text-[10px] font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded">{p.range}</span>
              <img
                src={designPhaseHumans[i]}
                alt=""
                className="absolute -right-3 -bottom-4 w-20 h-20 object-cover object-top opacity-[0.12] pointer-events-none select-none"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Chapters */}
      <section className="mb-16">
        <SectionLabel>Curriculum</SectionLabel>
        <div className="mt-4 space-y-1.5">
          {chapters.map((chapter, i) => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                to={`/chapter/${chapter.id}`}
                className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-all"
              >
                <span className="shrink-0 w-7 h-7 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center text-xs font-bold group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                  {chapter.id}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">{chapter.title}</h3>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{chapter.coreMessage}</p>
                </div>
                <span className="text-[10px] text-gray-400 shrink-0 tabular-nums">{chapter.duration}</span>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Key Messages - compact */}
      <section className="mb-16">
        <SectionLabel>Key Messages</SectionLabel>
        <p className="text-sm text-gray-500 mb-4">研修を通して繰り返し定着させるフレーズ</p>
        <div className="columns-1 sm:columns-2 gap-3 space-y-3">
          {keyMessages.map((msg, i) => (
            <motion.div
              key={msg}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="break-inside-avoid p-3 rounded-lg border border-gray-100 bg-white"
            >
              <span className="text-[10px] font-bold text-gray-300 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <p className="text-sm font-medium text-gray-700 mt-0.5 leading-relaxed">{msg}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="mb-16">
        <SectionLabel>Timeline (5h)</SectionLabel>
        <div className="mt-4 space-y-px">
          {timeline.map((entry, i) => (
            <motion.div
              key={entry.time}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.02 }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${
                entry.chapter === 0 ? 'text-gray-400 italic' : 'hover:bg-gray-50 transition-colors'
              }`}
            >
              <span className="shrink-0 w-16 text-[11px] font-mono text-gray-400 tabular-nums text-right">{entry.time}</span>
              <span className={`shrink-0 w-1.5 h-1.5 rounded-full ${entry.chapter === 0 ? 'bg-gray-200' : 'bg-primary-400'}`} />
              <span className="flex-1 min-w-0 truncate">
                {entry.chapter > 0 ? (
                  <Link to={`/chapter/${entry.chapter}`} className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                    {entry.content}
                  </Link>
                ) : (
                  entry.content
                )}
              </span>
              {entry.chapter > 0 && (
                <span className="text-[10px] text-gray-400 shrink-0">Ch.{entry.chapter}</span>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Toolchain */}
      <section className="mb-16">
        <SectionLabel>Toolchain</SectionLabel>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { name: 'Claude Code', desc: '実装の主役', url: 'https://docs.anthropic.com/ja/docs/claude-code/overview' },
            { name: 'GitHub', desc: '変更履歴と共同開発', url: 'https://github.com' },
            { name: 'VS Code', desc: '人とAIの作業ハブ', url: 'https://code.visualstudio.com' },
            { name: 'Vercel', desc: '最短で公開', url: 'https://vercel.com' },
            { name: 'Google AI Studio', desc: '発想整理・試作', url: 'https://ai.google.dev' },
            { name: 'Cloudflare Workers', desc: '本番拡張先', url: 'https://workers.cloudflare.com' }
          ].map((tool, i) => (
            <motion.a
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group p-4 rounded-xl border border-gray-200 bg-white hover:border-gray-300 transition-all"
            >
              <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                {tool.name}
                <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-gray-400 transition-colors" />
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">{tool.desc}</p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Reference Links */}
      <section id="resources" className="mb-16">
        <SectionLabel>Reference Links</SectionLabel>
        <p className="text-sm text-gray-500 mb-5">研修後の自習に役立つリソース集</p>
        <div className="space-y-6">
          {[
            {
              label: 'Getting Started',
              links: [
                { title: 'Claude Code 公式ドキュメント', url: 'https://docs.anthropic.com/ja/docs/claude-code/overview' },
                { title: 'Claude Code ベストプラクティス', url: 'https://code.claude.com/docs/ja/best-practices' },
                { title: 'Zenn 完全ガイド（30万字）', url: 'https://zenn.dev/tmasuyama1114/books/claude_code_basic' },
                { title: 'ClaudeCode JP', url: 'https://claudecode.jp/ja' }
              ]
            },
            {
              label: 'Practical',
              links: [
                { title: 'GMOペパボ チュートリアル', url: 'https://zenn.dev/pepabo/articles/898cdc4839acb8' },
                { title: 'QUARTETCOM 導入ガイド', url: 'https://tech.quartetcom.co.jp/2026/02/24/claude-code-guide/' },
                { title: 'ENECHANGE ベスプラ検証', url: 'https://tech.enechange.co.jp/entry/2026/02/16/195000' },
                { title: 'CLAUDE.md の書き方', url: 'https://zenn.dev/farstep/articles/how-to-write-a-great-claude-md' }
              ]
            },
            {
              label: 'Deploy & Books',
              links: [
                { title: '5分で作って30分で公開', url: 'https://gihyo.jp/article/2025/11/get-started-claude-code-03' },
                { title: 'Vercel + TiDB Cloud', url: 'https://dev.classmethod.jp/articles/v0-claude-code-vercel-tidb-cloud/' },
                { title: 'AI駆動開発入門（書籍）', url: 'https://gihyo.jp/book/2025/978-4-297-15275-8' },
                { title: '実践Claude Code入門（書籍）', url: 'https://gihyo.jp/book/2026/978-4-297-15354-0' }
              ]
            }
          ].map((group) => (
            <div key={group.label}>
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{group.label}</h3>
              <div className="border border-gray-200 rounded-xl divide-y divide-gray-100 overflow-hidden">
                {group.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 shrink-0 text-gray-300" />
                    <span>{link.title}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center py-10 mb-4"
      >
        <p className="text-sm text-gray-400 mb-4">第1章から順に進めていきましょう。</p>
        <Link
          to="/chapter/1"
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors"
        >
          <Play className="w-3.5 h-3.5" /> Chapter 1 から始める
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </motion.section>
    </div>
  )
}

function SectionLabel({ children }: { readonly children: React.ReactNode }) {
  return (
    <h2 className="text-[20px] font-bold text-gray-900 leading-[1.52] tracking-[0.01em] mb-1">{children}</h2>
  )
}
