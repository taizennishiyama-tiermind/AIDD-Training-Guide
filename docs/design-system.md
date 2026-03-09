# Design System - Reusable Blueprint

> このドキュメントは、同じクオリティで別のアプリ/サイトを作るための完全なデザインシステム仕様書です。
> カラーパレットは **Blue系** に統一しています。Claude Code に `docs/` フォルダごと渡せば自動参照されます。

---

## 1. カラーパレット（Blue Primary）

### Primary - メインブランドカラー

| Token | HEX | 用途 |
|---|---|---|
| `--color-primary-50` | `#eff6ff` | 背景のうすいアクセント、hover状態 |
| `--color-primary-100` | `#dbeafe` | バッジ背景、選択状態の背景 |
| `--color-primary-200` | `#bfdbfe` | ボーダー（アクティブ）、テキスト選択 |
| `--color-primary-300` | `#93c5fd` | ステップ番号（ループ強調）、ドット |
| `--color-primary-400` | `#60a5fa` | グラデーション末端、アクティブインジケーター |
| `--color-primary-500` | `#3b82f6` | CTA補助、タグ、アクティブバー |
| `--color-primary-600` | `#2563eb` | リンク色、ボタンアクセント、グラデーション起点 |
| `--color-primary-700` | `#1d4ed8` | サイドバーのアクティブテキスト |
| `--color-primary-800` | `#1e40af` | 強調テキスト |
| `--color-primary-900` | `#1e3a8a` | テキスト選択時の文字色 |

### Accent - 補助カラー（Warm Sand）

| Token | HEX | 用途 |
|---|---|---|
| `--color-accent-50` | `#fefcf5` | Hands-on ブロック背景 |
| `--color-accent-100` | `#fdf5e3` | Tip ボックス背景 |
| `--color-accent-400` | `#e8b84d` | ダッシュドボーダー（Hands-on） |
| `--color-accent-500` | `#d4a03a` | ラベルテキスト |
| `--color-accent-600` | `#b8882e` | 強調テキスト（Hands-on） |

### Grayscale - ニュートラル

| Token | HEX | 用途 |
|---|---|---|
| `--color-gray-50` | `#fafafa` | ページ背景の微妙な差 |
| `--color-gray-100` | `#f4f4f5` | カード背景、テーブルヘッダー、バッジ |
| `--color-gray-200` | `#e4e4e7` | ボーダー、ディバイダー、スクロールバー |
| `--color-gray-300` | `#d4d4d8` | 非アクティブなアイコン、装飾的番号 |
| `--color-gray-400` | `#a1a1aa` | サブテキスト、キャプション、タイムスタンプ |
| `--color-gray-500` | `#71717a` | セカンダリテキスト、ナビリンク |
| `--color-gray-600` | `#52525b` | ボディテキスト（やや強め） |
| `--color-gray-700` | `#3f3f46` | ボディテキスト |
| `--color-gray-800` | `#27272a` | 見出し、強調テキスト |
| `--color-gray-900` | `#18181b` | 最強調テキスト、ヒーロータイトル |
| `--color-gray-950` | `#09090b` | コードブロック背景 |

### Surface - レイヤーカラー

| Token | HEX | 用途 |
|---|---|---|
| `--color-surface-0` | `#ffffff` | body背景 |
| `--color-surface-50` | `#fafafa` | セクション背景 |
| `--color-surface-100` | `#f4f4f5` | カード内の灰色ゾーン |

### セマンティックカラー

| 用途 | カラー | 使い方 |
|---|---|---|
| Success / 正解 | `green-50/100/500/600` | ComparisonTable の「実際」列、OK状態 |
| Error / 誤解 | `red-50/100/400/500` | ComparisonTable の「誤解」列、Security警告 |
| Warning / Tip | `amber-50/200/500/700/800` | TipBox、注意書き |
| Info / AI | `#c084fc` (purple) | ターミナル上のAI発言 |

### CSS 変数定義（index.css にコピー）

```css
@theme {
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-300: #93c5fd;
  --color-primary-400: #60a5fa;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
  --color-primary-800: #1e40af;
  --color-primary-900: #1e3a8a;

  --color-accent-50: #fefcf5;
  --color-accent-100: #fdf5e3;
  --color-accent-400: #e8b84d;
  --color-accent-500: #d4a03a;
  --color-accent-600: #b8882e;

  --color-gray-50: #fafafa;
  --color-gray-100: #f4f4f5;
  --color-gray-200: #e4e4e7;
  --color-gray-300: #d4d4d8;
  --color-gray-400: #a1a1aa;
  --color-gray-500: #71717a;
  --color-gray-600: #52525b;
  --color-gray-700: #3f3f46;
  --color-gray-800: #27272a;
  --color-gray-900: #18181b;
  --color-gray-950: #09090b;

  --color-surface-0: #ffffff;
  --color-surface-50: #fafafa;
  --color-surface-100: #f4f4f5;
  --color-surface-200: #e4e4e7;
  --color-surface-300: #d4d4d8;
  --color-surface-700: #3f3f46;
  --color-surface-800: #27272a;
  --color-surface-900: #18181b;
  --color-surface-950: #09090b;

  --font-sans: "Inter", "Noto Sans JP", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}
```

---

## 2. タイポグラフィ

### フォントファミリー

| 種別 | フォントスタック | 用途 |
|---|---|---|
| Sans | `"Inter", "Noto Sans JP", ui-sans-serif, system-ui, sans-serif` | 本文、UI テキスト全般 |
| Mono | `"JetBrains Mono", ui-monospace, monospace` | コードブロック、プロンプト、タイムスタンプ |

### タイプスケール

| レベル | クラス | サイズ | Weight | Tracking | 用途 |
|---|---|---|---|---|---|
| Hero Title | `text-[27px] sm:text-4xl lg:text-5xl` | 27/36/48px | `font-black` (900) | `tracking-[0.01em]` | ページ最上部の大見出し |
| Page Title | `text-[24px] sm:text-3xl lg:text-4xl` | 24/30/36px | `font-black` (900) | `tracking-[0.01em]` | 各章のタイトル |
| Section Title | `text-[20px] sm:text-[22px]` | 20/22px | `font-bold` (700) | `tracking-[0.01em]` | セクション見出し（h2相当） |
| Subsection | `text-[16px]` | 16px | `font-bold` (700) | `tracking-[0.01em]` | h4見出し |
| Numbered Sub | `text-[15px]` | 15px | `font-semibold` (600) | `tracking-[0.01em]` | 番号付きサブセクション |
| Body | `text-[14px]` | 14px | `font-normal` (400) | ― | 本文テキスト |
| Body (large) | `text-base` | 16px | `font-normal` (400) | ― | リード文 |
| Small | `text-sm` | 14px | ― | ― | カード内テキスト |
| XSmall | `text-xs` | 12px | ― | ― | キャプション、サブラベル |
| Micro | `text-[11px]` | 11px | ― | ― | ファイル名、TOCピル |
| Nano | `text-[10px]` | 10px | ― | ― | カテゴリラベル、タグ |
| Tiny | `text-[9px]` | 9px | ― | ― | Q&A のラベル |

### 行間 (line-height)

| クラス | 値 | 用途 |
|---|---|---|
| `leading-[1.25]` | 1.25 | ヒーロータイトル |
| `leading-[1.3]` | 1.3 | ページタイトル |
| `leading-[1.52]` | 1.52 | セクション見出し |
| `leading-relaxed` | 1.625 | 本文・説明文 |
| `leading-6` | 1.5rem | ターミナル行 |

### ユーティリティクラス

| クラス | 効果 | 用途 |
|---|---|---|
| `text-gradient` | `bg-clip-text text-transparent` + primary のリニアグラデーション | ヒーローの強調テキスト |
| `uppercase tracking-widest` | 大文字 + 広い字間 | カテゴリラベル、セクション分類名 |
| `tabular-nums` | 等幅数字 | タイムスタンプ、カウンター |
| `truncate` | 1行省略 | サイドバーのタイトル |
| `line-clamp-2` | 2行省略 | カードの説明文 |

---

## 3. スペーシング & レイアウト

### グリッドシステム

| パターン | クラス | 用途 |
|---|---|---|
| 2列均等 | `grid grid-cols-2` | 統計カード（モバイル） |
| 2→4列 | `grid grid-cols-2 md:grid-cols-4` | 統計カード（4つ並ぶ） |
| 1→2列 | `grid grid-cols-1 sm:grid-cols-2` | プロンプトカード |
| 1→3列 | `grid grid-cols-1 sm:grid-cols-3` | フェーズカード |
| 1→2→3列 | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` | フローダイアグラム |
| 2→3列 | `grid grid-cols-2 sm:grid-cols-3` | ツールチェーン |
| マルチカラム | `columns-1 sm:columns-2` | キーメッセージ |

### コンテンツ幅

| 用途 | クラス | 実サイズ |
|---|---|---|
| メインコンテンツ | `max-w-3xl mx-auto` | 768px |
| リード文 | `max-w-xl` | 576px |
| サイドバー | `w-[272px]` | 272px |

### 共通マージン/パディング

| パターン | 値 | 使用場所 |
|---|---|---|
| セクション間 | `mb-16` | ホームページの各セクション |
| セクション間（章） | `my-10` / `mb-10` | チャプターページの各ブロック |
| カード内パディング | `p-4` / `p-5` / `p-6` | カードサイズに応じて |
| リスト項目間 | `space-y-1.5` / `space-y-3` | リンクリスト / カードリスト |
| グリッドギャップ | `gap-3` | 標準 |
| ページパディング | `px-6 py-8 lg:py-12` | メインエリア |

---

## 4. ボーダー & ラディウス

### ボーダー

| パターン | クラス | 用途 |
|---|---|---|
| 標準ボーダー | `border border-gray-200` | カード、テーブル |
| 軽いボーダー | `border border-gray-100` | リスト項目 |
| アクセントボーダー | `border border-primary-200` | アクティブ / ループ要素 |
| ダッシュドボーダー | `border border-dashed border-accent-400` | ハンズオンブロック |
| 左ボーダー | `border-l-2 border-primary-400` | キーメッセージバナー |
| 左ボーダー（太） | `border-l-4` + `style={{ borderLeftColor }}` | コアメッセージ |
| 分割線 | `divide-y divide-gray-100` | リソースリスト |
| 太ボーダー | `border-2 border-red-200/60` / `border-2 border-green-200/60` | 比較カード |

### 角丸

| クラス | 用途 |
|---|---|
| `rounded` | 小さいバッジ |
| `rounded-md` | コピーボタン |
| `rounded-lg` | カード、ボタン、バッジ |
| `rounded-xl` | 標準カード、テーブルコンテナ |
| `rounded-2xl` | 大きめカード、VS Code シミュレーター、比較パネル |
| `rounded-full` | アバター、ピル、ドットインジケーター |

---

## 5. シャドウ & エフェクト

### シャドウ

| クラス | 用途 |
|---|---|
| `shadow-sm` | 軽いカードホバー、ブラウザモック |
| `shadow-lg shadow-primary-100/50` | プロンプトカードホバー |
| `shadow-2xl shadow-black/20` | VS Code シミュレーター |
| `hover:shadow-lg` | デザインシステムショーケース |

### Glass Effect

```css
.glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--color-gray-200);
}
```
用途: モバイルヘッダーの固定バー

### テキストグラデーション

```css
.text-gradient {
  @apply bg-clip-text text-transparent;
  background-image: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-400));
}
```
用途: ヒーローの強調ワード

### 背景グラデーション

```css
/* 比較カード: ポジティブ */
bg-gradient-to-b from-green-50/50 to-white

/* 比較カード: ネガティブ */
bg-gradient-to-b from-red-50/50 to-white

/* ラジアルグラデーション（ホバーエフェクト） */
background: radial-gradient(circle at 80% 20%, rgba(74, 222, 128, 0.08) 0%, transparent 50%)
```

### テキスト選択色

```css
::selection {
  @apply bg-primary-200 text-primary-900;
}
```

### スクロールバー

```css
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { @apply bg-gray-300 rounded-full; }
```

---

## 6. アニメーション (Framer Motion)

### ページトランジション

```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={location.pathname}
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.2, ease: 'easeOut' }}
  />
</AnimatePresence>
```

### Fade In + Slide Up（セクション単位）

```tsx
<motion.div
  initial={{ opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: index * 0.06, duration: 0.35 }}
/>
```
- `delay: index * 0.04〜0.1` でスタガー効果
- `viewport={{ once: true }}` で初回のみ発火

### サイドバーのアクティブインジケーター

```tsx
<motion.div
  layoutId="sidebar-active"
  className="w-[3px] h-4 rounded-full bg-primary-500"
  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
/>
```

### タブ切り替え（AnimatedComparison）

```tsx
<motion.div
  layoutId="comparison-tab"
  className="absolute inset-0 bg-white rounded-lg shadow-sm"
  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
/>
```

### アクティブ/非アクティブの切り替え

```tsx
<motion.div
  animate={{
    opacity: activeTab === 'ai' ? 1 : 0.4,
    scale: activeTab === 'ai' ? 1 : 0.97,
  }}
  transition={{ duration: 0.3 }}
/>
```

### ホバーで浮かび上がるカード

```tsx
<motion.div
  whileHover={{ y: -6, scale: 1.01 }}
  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
/>
```

### カウンターアニメーション

```tsx
const spring = useSpring(0, { duration: 2000 })
const rounded = useTransform(spring, (latest) => Math.round(latest))
// isInView で spring.set(value) を呼び出し
```

### GridBackground パーティクル

```tsx
// 浮遊ドット
animate={{
  y: [-20, 20, -20],
  x: [-10, 10, -10],
  opacity: [0.2, 0.5, 0.2],
}}
transition={{
  duration: 4 + i * 1.5,
  repeat: Infinity,
  delay: i * 0.8,
  ease: 'easeInOut',
}}

// グラデーションオーブ
animate={{ x: [0, 30, -20, 0], y: [0, -20, 10, 0] }}
transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
```

### パルスアニメーション

```tsx
// 「10x faster」バッジ
animate={{ scale: [1, 1.1, 1] }}
transition={{ duration: 2, repeat: Infinity }}

// 接続インジケーター
className="animate-pulse"
```

### カーソル点滅（VSCodeSimulator）

```tsx
animate={{ opacity: [1, 0] }}
transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
```

### Lightbox 開閉

```tsx
// オーバーレイ
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}

// 画像
initial={{ scale: 0.9, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
exit={{ scale: 0.9, opacity: 0 }}
```

### Easing 一覧

| 名前 | 値 | 用途 |
|---|---|---|
| Spring (stiff) | `stiffness: 400, damping: 30` | タブ、スイッチ |
| Spring (soft) | `stiffness: 300, damping: 20` | カードホバー |
| Spring (medium) | `stiffness: 350, damping: 30` | アクティブインジケーター |
| Custom ease | `[0.16, 1, 0.3, 1]` | フローステップ、カード出現 |
| Sidebar | `[0.25, 0.1, 0.25, 1]` | サイドバー開閉 |
| Default | `easeOut` | ページトランジション |

---

## 7. コンポーネントカタログ

### 7.1 Layout - レイアウト構造

#### Sidebar

- 幅: `w-[272px]` 固定
- 背景: `bg-white`, 右ボーダー `border-r border-gray-200`
- ロゴ領域: `px-5 py-4 border-b border-gray-100`
- ナビリンク: `px-3 py-2 rounded-lg text-[13px] font-medium`
  - 通常: `text-gray-500 hover:bg-gray-50 hover:text-gray-800`
  - アクティブ: `bg-primary-50 text-primary-700 font-medium` + `layoutId` インジケーター
- カテゴリラベル: `text-[10px] font-semibold text-gray-400 uppercase tracking-widest`
- モバイル: `fixed inset-y-0 left-0 z-50 w-72` + スライドイン
- 折りたたみ: `motion.aside` で `width: 0` にアニメーション

#### Main Content Area

```
max-w-3xl mx-auto px-6 py-8 lg:py-12
```

#### Mobile Header (Glass)

```
sticky top-0 z-30 flex items-center gap-3 px-5 py-3 glass
```

---

### 7.2 SectionLabel（ホーム用セクション見出し）

```tsx
<h2 className="text-[20px] font-bold text-gray-900 leading-[1.52] tracking-[0.01em] mb-1">
  {children}
</h2>
```

---

### 7.3 AnimatedCounter - 数値カウンター

```tsx
<AnimatedCounter
  value={9}
  suffix=" chapters"
  label="Content"
  description="基礎から応用まで"
  color="#3b82f6"
/>
```

- 外枠: `p-4 rounded-xl border border-gray-200 bg-white`
- ラベル: `text-[10px] font-bold text-gray-400 uppercase tracking-widest`
- 数値: `text-2xl font-black text-gray-900 tabular-nums`
- 説明: `text-xs text-gray-400`
- アニメ: `useSpring` + `useTransform` で数値をカウントアップ

---

### 7.4 AnimatedComparison - タブ切り替え比較

- タブ: `inline-flex rounded-xl bg-gray-100 p-1`
  - アクティブ: `layoutId` による白背景スライド
- 左パネル（従来）: `rounded-2xl border-2 border-red-200/60 bg-gradient-to-b from-red-50/50 to-white p-6`
- 右パネル（AI）: `rounded-2xl border-2 border-green-200/60 bg-gradient-to-b from-green-50/50 to-white p-6`
- ステップ: 丸数字 + テキスト + 時間バッジ
  - Red: `bg-red-100 text-red-500` / `text-red-500 bg-red-50 rounded-full`
  - Green: `bg-green-100 text-green-600` / `text-green-600 bg-green-50 rounded-full`

---

### 7.5 FlowDiagram - フロー図

- グリッド: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3`
- 通常ステップ: `border-gray-200 bg-white`
- ループステップ: `border-primary-200 bg-primary-50/40`
- ステップ番号: `text-2xl font-black tabular-nums` + `text-gray-200` or `text-primary-300`
- LOOPバッジ: `text-[9px] font-bold text-primary-500 bg-primary-50 border border-primary-200 px-2 py-0.5 rounded-full`
- 注釈: `text-xs text-gray-400 text-center`

---

### 7.6 VSCodeSimulator - ターミナルシミュレーター

- 外枠: `rounded-2xl shadow-2xl shadow-black/20 border border-gray-800/50`
- タイトルバー: `bg-[#1e1e1e]` + macOS風トラフィックライト（`#ff5f57`, `#febc2e`, `#28c840`）
- ファイルエクスプローラー: `w-48 bg-[#252526]`
- ターミナル: `bg-[#1e1e1e] font-mono text-[13px] leading-6`
- ステータスバー: `bg-[#007acc]` (VS Code Blue)
- 行タイプ別の色:
  - `input`: `text-[#4ade80]` (green prompt `$`)
  - `output`: `text-[#999]`
  - `ai`: `text-[#c084fc]` (purple "Claude" label)
  - `system`: `text-[#569cd6]`
  - `file-create`: `text-[#4ade80]` (`+`) + `text-[#89d185]`
- タイピングアニメ: 35ms/文字 + ブリンクカーソル
- IntersectionObserver で自動再生開始

---

### 7.7 ComparisonTable - 誤解 vs 実際テーブル

```tsx
<ComparisonTable rows={[
  { misconception: "AIが全部やってくれる", reality: "材料を渡す必要がある" }
]} />
```

- 外枠: `rounded-xl border border-gray-200 overflow-hidden`
- ヘッダー: `bg-gray-50 border-b border-gray-200`
  - 左列: `text-red-500` + `X` アイコン
  - 右列: `text-green-600` + `Check` アイコン
- 行:
  - 左: `bg-red-50/40 text-gray-700`
  - 右: `bg-green-50/40 text-gray-900 font-medium`
- アニメ: 行ごとにスライドイン `initial={{ opacity: 0, x: -10 }}`

---

### 7.8 CodeBlock - コードブロック

```tsx
<CodeBlock code={codeString} language="typescript" title="server.ts" />
```

- ヘッダー: `bg-gray-50 border-b border-gray-200` + `Terminal` アイコン + Copy ボタン
- コード領域: `bg-gray-950 text-gray-100 text-sm font-mono p-4`
- コピー: AnimatePresence で `Copy` / `Copied` を切り替え（緑チェック表示）

---

### 7.9 PromptCard - プロンプトカード

```tsx
<PromptCard label="実装指示" prompt="manifest.mdを読んで..." index={0} />
```

- 外枠: `rounded-xl border border-gray-200 bg-white`
- ホバー: `hover:border-primary-300 hover:shadow-lg hover:shadow-primary-100/50`
- ラベル: `text-primary-600 bg-primary-50 px-2.5 py-1 rounded-full` + `Sparkles` アイコン
- プロンプト文: `font-mono bg-gray-50 rounded-lg p-3`
- コピーボタン: `Copy` / `Check` のアニメーション切り替え

---

### 7.10 KeyMessageBanner - キーメッセージ

```tsx
<KeyMessageBanner message="AIに作ってもらう。材料は人が渡す。" />
```

- `pl-5 border-l-2 border-primary-400`
- テキスト: `text-lg font-bold text-gray-800 leading-relaxed`
- アニメ: `initial={{ opacity: 0, x: -12 }}`

---

### 7.11 HandsOnBlock - ハンズオンブロック

```tsx
<HandsOnBlock description="Claude Codeに指示を出して..." />
```

- 外枠: `rounded-xl border border-dashed border-accent-400 bg-accent-50`
- ヘッダー: `text-[10px] font-bold text-accent-600 uppercase tracking-widest` "HANDS-ON"
- イラスト: 右下に `absolute` 配置、`opacity-[0.18]`、背面透過PNG
- テキスト: `text-sm text-gray-700 leading-relaxed` + 右側にイラスト用余白 `pr-28 sm:pr-36`

---

### 7.12 QADialogue - Q&A 対話形式

```tsx
<QADialogue items={[{ q: "質問", a: "回答" }]} />
```

- 質問: 左アバター + `bg-gray-50 rounded-2xl rounded-tl-sm`
- 回答: 左にインデント `pl-6` + `bg-primary-50/50 rounded-2xl rounded-tl-sm`
- アバター: `w-9 h-9 rounded-full` + イラストPNG
  - 質問者: `bg-gray-50 border-gray-200`
  - 回答者: `bg-primary-50 border-primary-100`
- ラベル: `text-[9px] font-bold uppercase tracking-widest`

---

### 7.13 ConcreteExampleCard - 具体例カード

```tsx
<ConcreteExampleCard example={{ situation, input, result }} index={0} />
```

- 3段構成:
  1. **Scenario** ヘッダー: `bg-gray-50 border-b border-gray-200` + `text-[10px] uppercase`
  2. **Input**: `font-mono bg-gray-50 rounded-lg p-3 border border-gray-100`
  3. **Result**: 通常テキスト
- 各セクション: `text-[10px] font-bold uppercase tracking-widest` のラベル色が異なる
  - Scenario: `text-gray-400`
  - Input: `text-primary-400`
  - Result: `text-green-500`

---

### 7.14 ResourceCard - リソースリンク

```tsx
<ResourceCard resource={{ title, url, description, type: "blog" }} index={0} />
```

- `hover:bg-gray-50` + `ExternalLink` アイコン
- タイプバッジ: `text-[10px] font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded`
- リスト全体: `border border-gray-200 rounded-xl divide-y divide-gray-100 overflow-hidden`

---

### 7.15 InteractiveChapterCard - チャプターカード

```tsx
<InteractiveChapterCard chapter={chapter} index={0} />
```

- `rounded-2xl border border-gray-200 bg-white`
- ホバー: `whileHover={{ y: -6, scale: 1.01 }}` + グラデーションオーバーレイ
- アイコン: `w-12 h-12 rounded-2xl` + チャプター固有色
- タグ: `text-[10px] px-2 py-0.5 rounded-full bg-gray-50 border border-gray-100`

---

### 7.16 SectionRenderer - Markdown セクション描画

テーブル、番号付き見出し、太字リスト、インラインコードを自動パース:

- テーブル: `rounded-xl border border-gray-200 overflow-hidden` + `thead bg-gray-50`
- リスト: プライマリ色のドット `text-primary-400`
- インラインコード: `px-1.5 py-0.5 rounded bg-gray-100 text-primary-600 text-xs font-mono`
- 番号付き見出し: 番号バッジ `bg-gray-100 w-5 h-5 rounded` + テキスト

---

### 7.17 GridBackground - 背景パターン

- グリッド線: `opacity-[0.03]`, 40px間隔, primary色ベース
- グラデーションオーブ: 2つ、`radial-gradient` で `opacity-30`, 20-25秒で浮遊
- パーティクル: 6個、`w-1.5 h-1.5 rounded-full bg-primary-400`, 4-13秒周期で浮遊

---

### 7.18 CopyPageButton - ページコピーボタン

```tsx
<CopyPageButton getMarkdown={generateHomeMarkdown} />
```

- `rounded-lg border border-gray-200 bg-white text-xs font-medium shadow-sm`
- ホバー: `hover:border-gray-300 hover:text-gray-700 hover:bg-gray-50`
- コピー後: `Check` アイコン + `text-green-600` "Copied!" を2秒表示

---

### 7.19 Setup 専用コンポーネント

#### Step

```tsx
<Step step={1} title="拡張機能をインストールする" icon={<Monitor />}>
  <Instruction>...</Instruction>
</Step>
```
- 番号バッジ: `w-8 h-8 rounded-lg bg-primary-100 text-primary-600 text-sm font-bold`

#### StepImage + Lightbox

- 画像: `rounded-xl border border-gray-200 shadow-sm cursor-zoom-in`
- ホバー: `bg-black/5` オーバーレイ + `ZoomIn` アイコン
- Lightbox: `fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm`
  - 画像: `max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl`

#### TipBox

```tsx
<TipBox>
  <strong>注意:</strong> 補足テキスト
</TipBox>
```
- `p-4 rounded-xl bg-amber-50 border border-amber-200`
- テキスト: `text-sm text-amber-800`

#### Highlight（インラインコード強調）

```tsx
<Highlight>Cmd + ,</Highlight>
```
- `px-1.5 py-0.5 rounded bg-primary-50 text-primary-700 text-xs font-mono font-medium border border-primary-100`

---

## 8. イラスト素材・背面透過画像ガイド

### ファイル命名規則

```
assets/illustration/png/
  m_01_white.png       # Medium サイズ、背景白 (透過)
  m_02_white.png
  l_01_rectangle_white.png  # Large サイズ、横長
  s_human01.png        # Small サイズ、人物アバター
```

| プレフィックス | サイズ感 | 用途 |
|---|---|---|
| `l_` | 大（横長） | ヒーローイラスト |
| `m_` | 中 | チャプターヘッダー、装飾 |
| `s_human` | 小 | Q&A のアバター |

### イラストの配置パターン

#### A. ヒーロー右側配置

```tsx
<img
  src={heroIllustration}
  alt=""
  className="w-full h-auto mix-blend-multiply"
/>
```
- `hidden lg:block shrink-0 w-64 xl:w-80`
- `mix-blend-multiply` で白背景に溶け込ませる

#### B. カード右下の装飾（背面透過）

```tsx
<img
  src={illustration}
  alt=""
  className="absolute -right-3 -bottom-4 w-20 h-20 object-cover object-top opacity-[0.12] pointer-events-none select-none"
/>
```
- `absolute` 配置で右下にはみ出させる
- `opacity-[0.12]` でうっすら透かし
- `pointer-events-none select-none` でインタラクション無効

#### C. ハンズオンブロックのイラスト

```tsx
<motion.img
  src={illustration}
  alt=""
  initial={{ opacity: 0, x: 20, rotate: -5 }}
  whileInView={{ opacity: 0.18, x: 0, rotate: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.2, duration: 0.5 }}
  className="absolute -right-2 -bottom-2 w-28 sm:w-36 h-auto pointer-events-none select-none"
/>
```
- スクロールインで `opacity: 0 -> 0.18`, `rotate: -5 -> 0` のアニメーション
- テキスト側に `pr-28 sm:pr-36` で余白を確保

#### D. チャプターヘッダーのイラスト

```tsx
<img
  src={chapterIllustrations[chapter.id]}
  alt=""
  className="w-full h-auto"
/>
```
- `hidden md:block shrink-0 w-32 lg:w-44 self-center`
- Fade in + Scale アニメーション

#### E. Q&A のアバター

```tsx
<img
  src={avatar}
  alt=""
  className="w-full h-full object-cover object-top"
/>
```
- `w-9 h-9 rounded-full` のコンテナ内
- `object-cover object-top` で顔が見えるようにトリミング

### イラスト素材の入手・準備チェックリスト

1. **背景透過PNG** で書き出す（白背景不可）
2. ファイルサイズ: Medium 50-100KB, Large 100-200KB 目安
3. `alt=""` でアクセシビリティ属性を設定（装飾的画像のため空文字）
4. データファイル（`illustrations.ts`）で一元管理し、コンポーネントから import

---

## 9. テーブルのあしらい

### 標準テーブル（SectionRenderer）

```tsx
<div className="my-4 rounded-xl border border-gray-200 overflow-hidden overflow-x-auto">
  <table className="w-full text-sm">
    <thead>
      <tr className="bg-gray-50">
        <th className="text-left px-4 py-2.5 font-semibold text-gray-800 border-b border-gray-200">
          ヘッダー
        </th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-gray-100">
        <td className="px-4 py-2.5 text-gray-700">データ</td>
      </tr>
    </tbody>
  </table>
</div>
```

### 比較テーブル（ComparisonTable）

```tsx
<div className="rounded-xl border border-gray-200 overflow-hidden">
  <div className="grid grid-cols-2 bg-gray-50 border-b border-gray-200">
    <div className="px-4 py-3 text-xs font-bold text-red-500 uppercase tracking-wider">
      <X /> 誤解
    </div>
    <div className="px-4 py-3 text-xs font-bold text-green-600 uppercase tracking-wider">
      <Check /> 実際
    </div>
  </div>
  {/* 行: grid grid-cols-2 */}
  <div className="grid grid-cols-2">
    <div className="px-4 py-3 text-sm text-gray-700 bg-red-50/40">...</div>
    <div className="px-4 py-3 text-sm text-gray-900 font-medium bg-green-50/40">...</div>
  </div>
</div>
```

### 設定テーブル（Setup ページ）

```tsx
<div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
  <div className="px-4 py-3">
    <p className="text-sm font-bold text-gray-800">設定名</p>
    <p className="text-xs text-gray-500 mt-0.5">説明テキスト</p>
  </div>
</div>
```

### テーブルの共通ルール

1. **常に `rounded-xl border border-gray-200 overflow-hidden`** でラップ
2. ヘッダー行: `bg-gray-50 border-b border-gray-200`
3. 行間: `border-b border-gray-100`（最終行は境界線なし）
4. セルパディング: `px-4 py-2.5` or `px-4 py-3`
5. ヘッダーテキスト: `font-semibold text-gray-800`
6. データテキスト: `text-gray-700`

---

## 10. 図解・ダイアグラムのパターン

### フローダイアグラム（FlowDiagram）

6ステップのカードをグリッド配置し、ループ区間を色で強調:

```
通常ステップ: border-gray-200 bg-white
ループステップ: border-primary-200 bg-primary-50/40
```

- 番号: `text-2xl font-black` + 色分け
- LOOPバッジ: `absolute -top-2 right-3` に `rounded-full` ピル
- 下部注釈: `text-xs text-gray-400 text-center`

### ブラウザモック（localhost 表示イメージ）

```tsx
{/* ブラウザ chrome */}
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
{/* コンテンツ */}
<div className="bg-white p-6">
  {/* アプリのモック */}
</div>
```

### フェーズカード（3段階の設計思想）

```tsx
<div className="relative p-5 rounded-xl border border-gray-200 bg-white overflow-hidden">
  <span className="text-2xl font-black text-gray-100">01</span>
  <h3 className="text-sm font-bold text-gray-900 mt-1">タイトル</h3>
  <p className="text-xs text-gray-500 mt-1">説明</p>
  <span className="inline-block mt-3 text-[10px] font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded">
    Ch.1-5
  </span>
  {/* 右下の装飾イラスト */}
  <img className="absolute -right-3 -bottom-4 w-20 h-20 opacity-[0.12] pointer-events-none select-none" />
</div>
```

---

## 11. ページコンテンツのコピー機能

### 仕組み

各ページに `CopyPageButton` を配置し、ページ全体をMarkdown形式でクリップボードにコピーする機能。
LLMにページ内容を渡す用途を想定。

### アーキテクチャ

```
CopyPageButton (UI)
  └── getMarkdown: () => string  (prop)
        ├── generateHomeMarkdown()      ← Home ページ用
        └── generateChapterMarkdown()   ← Chapter ページ用
```

### CopyPageButton コンポーネント

```tsx
interface CopyPageButtonProps {
  readonly getMarkdown: () => string
}

function CopyPageButton({ getMarkdown }: CopyPageButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    const markdown = getMarkdown()
    await navigator.clipboard.writeText(markdown)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [getMarkdown])

  return (
    <button onClick={handleCopy} className="...">
      {copied ? <><Check /> Copied!</> : <><Copy /> ページをコピー</>}
    </button>
  )
}
```

### Markdown 生成関数の実装パターン

```tsx
// 1. lines 配列に push していく
const lines: string[] = []
lines.push(`# タイトル`)
lines.push('')
lines.push(`> 引用`)
lines.push('')

// 2. セクションをループ
for (const section of sections) {
  lines.push(`## ${section.title}`)
  lines.push('')
  lines.push(section.content)
  lines.push('')
}

// 3. テーブルを生成
lines.push('| ヘッダー1 | ヘッダー2 |')
lines.push('|---|---|')
for (const row of rows) {
  lines.push(`| ${row.col1} | ${row.col2} |`)
}

// 4. 結合して返す
return lines.join('\n')
```

### 新しいページに追加する手順

1. `utils/generateMarkdown.ts` に `generateXxxMarkdown()` 関数を追加
2. ページコンポーネントの上部に `CopyPageButton` を配置:

```tsx
import { CopyPageButton } from '../components/ui/CopyPageButton'
import { generateXxxMarkdown } from '../utils/generateMarkdown'

function XxxPage() {
  return (
    <div>
      <div className="flex justify-end mb-2">
        <CopyPageButton getMarkdown={generateXxxMarkdown} />
      </div>
      {/* ページコンテンツ */}
    </div>
  )
}
```

---

## 12. ボタン & インタラクション

### プライマリ CTA

```
group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors
```
- アイコン付き: `Play` + `ArrowRight` (ホバーで `translate-x-0.5`)

### セカンダリ CTA

```
inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors
```

### ゴーストボタン（サイドバー切り替え）

```
p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600
```

### コピーボタン

```
inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 hover:bg-gray-50 transition-all shadow-sm
```

### TOC ピル（目次リンク）

```
text-[11px] px-2.5 py-1 rounded-full border border-gray-200 text-gray-500 hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50 transition-all
```

---

## 13. アイコン (Lucide React)

### 使用アイコン一覧

| アイコン名 | 用途 |
|---|---|
| `Play` | 研修開始 CTA |
| `ArrowRight` / `ArrowLeft` | ナビゲーション |
| `ChevronRight` | リスト項目の右矢印 |
| `ExternalLink` | 外部リンク |
| `Copy` / `Check` | コピー機能 |
| `Sparkles` | AIラベル、プロンプトカード |
| `Terminal` | コードブロックヘッダー |
| `Menu` / `X` | モバイルメニュー開閉 |
| `Home` / `Clock` / `Monitor` | サイドバーナビ |
| `Download` | ファイルダウンロード |
| `ZoomIn` | 画像拡大 |
| `Lightbulb` | ヒント、Chapter 1 |
| `ShieldCheck` | セキュリティ警告 |
| `Zap` | AI駆動開発タブ |
| `FileText` / `FolderOpen` | ファイルエクスプローラー |

---

## 14. 技術スタック

| カテゴリ | ライブラリ | バージョン | 用途 |
|---|---|---|---|
| UI | React | ^19.2.0 | UI構築 |
| ルーティング | react-router-dom | ^7.13.1 | SPA ルーティング |
| スタイル | Tailwind CSS v4 | ^4.2.1 | ユーティリティCSS |
| アニメーション | Framer Motion | ^12.35.0 | トランジション・インタラクション |
| アイコン | Lucide React | ^0.577.0 | SVGアイコン |
| ビルド | Vite | ^7.3.1 | 開発サーバー・バンドル |
| 言語 | TypeScript | ~5.9.3 | 型安全 |

---

## 15. 新規プロジェクトへの適用手順

### Step 1: プロジェクト初期化

```bash
npm create vite@latest my-project -- --template react-ts
cd my-project
npm install react-router-dom
npm install -D tailwindcss @tailwindcss/vite framer-motion lucide-react
```

### Step 2: Tailwind v4 設定

`vite.config.ts`:
```ts
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### Step 3: index.css にデザイントークンをコピー

本ドキュメントの「CSS 変数定義」セクションを `src/index.css` にコピー。

### Step 4: コンポーネントをコピー

必要なコンポーネントを `src/components/ui/` にコピー。依存関係:
- 全コンポーネント → `framer-motion`, `lucide-react`
- `CopyPageButton` → `generateMarkdown.ts`
- `HandsOnBlock`, `QADialogue` → `illustrations.ts`

### Step 5: カラーのカスタマイズ

`--color-primary-*` の値を差し替えるだけで全体の色調が変わる。
Accent, Gray, Surface はそのまま流用可能。

---

## 16. チェックリスト（実装時に確認）

- [ ] `@theme` でカラートークンを定義した
- [ ] フォント（Inter, Noto Sans JP, JetBrains Mono）をロードした
- [ ] `scroll-behavior: smooth` を設定した
- [ ] `::selection` のカラーを設定した
- [ ] スクロールバーのスタイルを設定した
- [ ] `.glass` と `.text-gradient` ユーティリティを定義した
- [ ] `AnimatePresence` でページトランジションを設定した
- [ ] レスポンシブ対応（モバイルメニュー、グリッドのブレイクポイント）
- [ ] イラスト素材は背面透過PNGで配置した
- [ ] `CopyPageButton` でページコピー機能を実装した
- [ ] テーブルは `rounded-xl border overflow-hidden` でラップした
- [ ] コードブロックにコピーボタンを付けた
