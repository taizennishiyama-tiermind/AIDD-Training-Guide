import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Clock, Monitor, LogIn, Settings, MessageSquare, X, ZoomIn } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'

import imgInstall from '../assets/captcha/Claude Code VSCode拡張の使い方.webp'
import imgSparkIcon from '../assets/captcha/Claude Code ステータスバー.webp'
import imgLogin from '../assets/captcha/初回ログイン.webp'
import imgSettings from '../assets/captcha/Claude Code VSCode拡張機能の設定.webp'

interface StepProps {
  readonly step: number
  readonly title: string
  readonly icon: React.ReactNode
  readonly children: React.ReactNode
}

function Step({ step, title, icon, children }: StepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-12"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="shrink-0 w-8 h-8 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-bold">
          {step}
        </span>
        <div className="flex items-center gap-2 text-gray-400">
          {icon}
        </div>
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      </div>
      <div className="pl-11">
        {children}
      </div>
    </motion.div>
  )
}

function Lightbox({ src, alt, onClose }: { readonly src: string; readonly alt: string; readonly onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm cursor-zoom-out"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
      >
        <X className="w-5 h-5" />
      </button>
      <motion.img
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        src={src}
        alt={alt}
        className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </motion.div>
  )
}

function StepImage({ src, alt, caption }: { readonly src: string; readonly alt: string; readonly caption?: string }) {
  const [open, setOpen] = useState(false)
  const handleClose = useCallback(() => setOpen(false), [])

  return (
    <>
      <div className="my-5">
        <div
          className="rounded-xl border border-gray-200 overflow-hidden shadow-sm cursor-zoom-in relative group"
          onClick={() => setOpen(true)}
        >
          <img src={src} alt={alt} className="w-full h-auto" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white rounded-full p-2">
              <ZoomIn className="w-4 h-4" />
            </div>
          </div>
        </div>
        {caption && (
          <p className="text-xs text-gray-400 mt-2 text-center">{caption}</p>
        )}
      </div>
      <AnimatePresence>
        {open && <Lightbox src={src} alt={alt} onClose={handleClose} />}
      </AnimatePresence>
    </>
  )
}

function Instruction({ children }: { readonly children: React.ReactNode }) {
  return (
    <div className="text-sm text-gray-700 leading-relaxed space-y-3">
      {children}
    </div>
  )
}

function Highlight({ children }: { readonly children: React.ReactNode }) {
  return (
    <span className="px-1.5 py-0.5 rounded bg-primary-50 text-primary-700 text-xs font-mono font-medium border border-primary-100">
      {children}
    </span>
  )
}

function TipBox({ children }: { readonly children: React.ReactNode }) {
  return (
    <div className="my-4 p-4 rounded-xl bg-amber-50 border border-amber-200">
      <div className="text-sm text-amber-800 leading-relaxed">
        {children}
      </div>
    </div>
  )
}

export function Setup() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-8">
        <Link to="/" className="hover:text-gray-600 transition-colors">Overview</Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">Episode 0</span>
      </nav>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <div className="flex items-center gap-2.5 mb-4">
          <span className="text-[11px] font-bold text-primary-500 uppercase tracking-widest">
            Episode 0
          </span>
          <span className="flex items-center gap-1 text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full font-medium">
            <Clock className="w-3 h-3" /> 10min
          </span>
        </div>
        <h1 className="text-[24px] sm:text-3xl lg:text-4xl font-black tracking-[0.01em] leading-[1.3] mb-4 text-gray-900">
          Claude Code VSCode拡張の<br className="sm:hidden" />セットアップ
        </h1>
        <p className="text-base text-gray-500 leading-relaxed">
          VS Code上でClaude Codeを動かすまでの手順を、画像付きで解説します。<br />
          この手順を終えれば、すぐに研修を始められます。
        </p>

        {/* TOC */}
        <div className="flex flex-wrap gap-1.5 mt-5">
          {[
            { id: 'install', label: 'インストール' },
            { id: 'spark', label: 'Sparkアイコンの確認' },
            { id: 'login', label: '初回ログイン' },
            { id: 'settings', label: '初期設定' },
            { id: 'first-chat', label: '最初の指示を出す' },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-[11px] px-2.5 py-1 rounded-full border border-gray-200 text-gray-500 hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50 transition-all"
            >
              {item.label}
            </a>
          ))}
        </div>
      </motion.header>

      {/* Core Message */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="mb-10 p-4 rounded-xl border-l-4 bg-gray-50"
        style={{ borderLeftColor: '#d4764e' }}
      >
        <p className="text-sm font-bold text-gray-800">
          ここまでやれば、Claude Codeが使える状態になります。
        </p>
      </motion.div>

      {/* Step 1: Install */}
      <div id="install">
        <Step step={1} title="拡張機能をインストールする" icon={<Monitor className="w-4 h-4" />}>
          <Instruction>
            <p>VS Codeを起動して、以下の手順でClaude Code拡張をインストールします。</p>

            <ol className="list-decimal list-inside space-y-2 ml-1">
              <li>
                左サイドバーの<strong>拡張機能アイコン</strong>（四角が4つのアイコン）をクリック
              </li>
              <li>
                検索バーに <Highlight>Claude Code</Highlight> と入力
              </li>
              <li>
                発行元が <strong>Anthropic</strong> の「Claude Code for VS Code」を見つける
              </li>
              <li>
                <strong>「インストール」</strong>ボタンをクリック
              </li>
            </ol>

            <StepImage
              src={imgInstall}
              alt="VS Code拡張機能マーケットプレイスでClaude Codeを検索した画面"
              caption="拡張機能の検索画面。発行元が「Anthropic」であることを確認してください。"
            />

            <TipBox>
              <strong>VS Codeのバージョンに注意：</strong>Claude Code拡張は VS Code 1.98.0 以上が必要です。
              古いバージョンの場合は、まずVS Codeを最新版にアップデートしてください。
            </TipBox>
          </Instruction>
        </Step>
      </div>

      {/* Step 2: Spark Icon */}
      <div id="spark">
        <Step step={2} title="Sparkアイコンが表示されたことを確認" icon={<Monitor className="w-4 h-4" />}>
          <Instruction>
            <p>インストールが完了すると、エディタ右上に<strong>Sparkアイコン</strong>（✱マーク）が追加されます。</p>
            <p>このアイコンが見えていれば、インストール成功です。</p>

            <StepImage
              src={imgSparkIcon}
              alt="VS Codeのエディタ右上に表示されるSparkアイコン"
              caption="赤い矢印の先にあるSparkアイコン（✱マーク）をクリックすると、Claude Codeパネルが開きます。"
            />

            <TipBox>
              <strong>アイコンが出ない場合：</strong>エディタでファイルを1つ開いてみてください。
              フォルダだけ開いた状態ではアイコンが表示されないことがあります。
              それでも出ない場合は、VS Codeを再起動（<Highlight>Developer: Reload Window</Highlight>）してみてください。
            </TipBox>
          </Instruction>
        </Step>
      </div>

      {/* Step 3: Login */}
      <div id="login">
        <Step step={3} title="初回ログイン" icon={<LogIn className="w-4 h-4" />}>
          <Instruction>
            <p>Sparkアイコン（✱マーク）をクリックすると、Claude Codeパネルが開き、ログイン画面が表示されます。</p>

            <StepImage
              src={imgLogin}
              alt="Claude Codeの初回ログイン画面。3つのログイン方法が表示されている"
              caption="初回ログイン画面。利用形態に応じてボタンを選んでください。"
            />

            <p className="font-bold text-gray-800 mt-4">ログイン方法は3つあります：</p>

            <div className="space-y-4 mt-3">
              <div className="p-4 rounded-xl border border-primary-200 bg-primary-50">
                <p className="text-sm font-bold text-primary-800 mb-1">
                  「Claude.ai Subscription」ボタン（オレンジ色）
                </p>
                <p className="text-sm text-primary-700">
                  個人でClaude Pro / Team / Enterpriseプランを使っている場合はこれを選択。
                  ブラウザが開くので、Claudeアカウントでログインすれば完了です。
                </p>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 bg-white">
                <p className="text-sm font-bold text-gray-800 mb-1">
                  「Anthropic Console」ボタン
                </p>
                <p className="text-sm text-gray-600">
                  API従量課金で使いたい場合はこちら。Anthropic Consoleのアカウントで認証します。
                </p>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 bg-white">
                <p className="text-sm font-bold text-gray-800 mb-1">
                  「Bedrock, Foundry, or Vertex」ボタン
                </p>
                <p className="text-sm text-gray-600">
                  組織でAWS Bedrock / Google Vertex AI / Microsoft Foundryを経由して利用する場合はこちら。
                  別途、プロバイダ側の設定が必要です。
                </p>
              </div>
            </div>

            <TipBox>
              <strong>研修で初めて使う場合：</strong>一番上の<strong>「Claude.ai Subscription」</strong>（オレンジ色のボタン）を押してください。
              ブラウザが開いたら、Claudeアカウントでログインすればすぐに使えます。
            </TipBox>
          </Instruction>
        </Step>
      </div>

      {/* Step 4: Settings */}
      <div id="settings">
        <Step step={4} title="初期設定を確認する" icon={<Settings className="w-4 h-4" />}>
          <Instruction>
            <p>ログインできたら、設定を確認しておきましょう。</p>
            <p>VS Codeの <strong>設定</strong>（<Highlight>Cmd + ,</Highlight> / <Highlight>Ctrl + ,</Highlight>）を開き、左のメニューから<strong>「拡張機能」→「Claude Code」</strong>を選択します。</p>

            <StepImage
              src={imgSettings}
              alt="VS Codeの設定画面。Claude Code拡張の設定項目が表示されている"
              caption="設定画面。左メニューの「拡張機能」→「Claude Code」から開けます。"
            />

            <p className="font-bold text-gray-800 mt-4">確認しておきたい設定項目：</p>

            <div className="mt-3 border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
              <div className="px-4 py-3">
                <p className="text-sm font-bold text-gray-800">Autosave</p>
                <p className="text-xs text-gray-500 mt-0.5">Claudeがファイルを読み書きする前に自動保存するか。<strong>ONのままにしておく</strong>のがおすすめ。</p>
              </div>
              <div className="px-4 py-3">
                <p className="text-sm font-bold text-gray-800">Allow Dangerously Skip Permissions</p>
                <p className="text-xs text-gray-500 mt-0.5">権限チェックをスキップする設定。<strong>OFFのまま</strong>にしてください（安全のため）。</p>
              </div>
              <div className="px-4 py-3">
                <p className="text-sm font-bold text-gray-800">Enable New Conversation Shortcut</p>
                <p className="text-xs text-gray-500 mt-0.5"><Highlight>Cmd+N</Highlight> / <Highlight>Ctrl+N</Highlight> で新しい会話を開始。ONにしておくと便利です。</p>
              </div>
            </div>

            <TipBox>
              <strong>初めての場合は、設定をいじる必要はありません。</strong>デフォルトのままで問題なく使えます。
              上の項目は「こういう設定があるんだな」と把握しておくだけでOKです。
            </TipBox>
          </Instruction>
        </Step>
      </div>

      {/* Step 5: First Chat */}
      <div id="first-chat">
        <Step step={5} title="Claude Codeに最初の指示を出す" icon={<MessageSquare className="w-4 h-4" />}>
          <Instruction>
            <p>準備ができたら、実際にClaude Codeに話しかけてみましょう。</p>

            <p className="font-bold text-gray-800 mt-4">パネルの開き方（3通り）：</p>
            <ul className="list-disc list-inside space-y-1 ml-1 text-sm">
              <li>エディタ右上の<strong>Sparkアイコン（✱）</strong>をクリック</li>
              <li>ステータスバー右下の<strong>「✱ Claude Code」</strong>をクリック</li>
              <li>コマンドパレット（<Highlight>Cmd+Shift+P</Highlight>）→ <Highlight>Claude Code: Open</Highlight></li>
            </ul>

            <p className="mt-4">パネルが開いたら、チャット欄に文章を入力して送信するだけです。</p>

            <p className="font-bold text-gray-800 mt-4">試しに、こんなふうに聞いてみてください：</p>

            <div className="mt-3 space-y-2">
              {[
                'このプロジェクトのフォルダ構造をざっくり説明して',
                'このファイルにどんなコードが書いてあるか教えて',
                'Hello World を表示するHTMLを作って',
              ].map((prompt) => (
                <div
                  key={prompt}
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors cursor-default"
                >
                  <span className="shrink-0 w-6 h-6 rounded-md bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-bold">
                    &gt;
                  </span>
                  <span className="text-sm text-gray-700 font-mono">{prompt}</span>
                </div>
              ))}
            </div>

            <TipBox>
              <strong>応答が返ってきたら、セットアップ完了です。</strong>
              ここからは研修の第1章に進んで、AI駆動開発の基本を学んでいきましょう。
            </TipBox>
          </Instruction>
        </Step>
      </div>

      {/* Next Step CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-14 pt-6 border-t border-gray-200"
      >
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-4">セットアップが完了したら、研修を始めましょう。</p>
          <Link
            to="/chapter/1"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors"
          >
            Chapter 1: AI駆動開発とは何か
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
