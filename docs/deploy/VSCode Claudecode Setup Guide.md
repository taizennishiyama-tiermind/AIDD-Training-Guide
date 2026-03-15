# VS Code + Claude Code セットアップ手順書

**Windows 11 / macOS 対応 — 2026年3月版**

VS CodeのClaude Code拡張機能のインストールから認証、Git SSH連携、おすすめプラグインまで

---

## 1. 概要

本書では、Visual Studio Code（VS Code）にClaude Code拡張機能を導入し、Anthropicアカウントで認証を行い、GitHubとのSSH接続を設定するまでの手順を、Windows 11とmacOSのそれぞれについて説明します。

**Claude Code for VS Code** は、Anthropicが提供する公式のVS Code拡張機能です。ターミナルベースのClaude Code CLIをVS CodeのIDEに統合し、インラインdiff、ファイル参照、プランレビューなどの機能を提供します。

---

## 2. 前提条件

| 項目 | 要件 | 対象OS |
|------|------|--------|
| Anthropicアカウント | Pro / Max / Teams / Enterprise / Console（無料プランは不可） | 共通 |
| VS Code | バージョン 1.98.0 以降を推奨 | 共通 |
| Git for Windows | gitforwindows.org からインストール | Windowsのみ |
| Git（Xcode CLT） | 通常はmacOSにプリインストール済み | Macのみ |
| GitHubアカウント | SSH連携を行う場合に必要 | 共通 |

> **⚠** Claude Codeは無料のClaude.aiプランでは利用できません。有料プラン（Pro: $20/月、Max: $100〜/月）またはAnthropic Consoleアカウントが必要です。

---

## 3. Windows 11のセットアップ手順

### Step 1: VS Codeのインストール

1. https://code.visualstudio.com/ にアクセスし、Windows用インストーラをダウンロード
2. ダウンロードした `.exe` ファイルを実行し、インストールウィザードに従う
3. 「PATHへの追加」オプションにチェックを入れる（推奨）
4. インストール完了後、VS Codeを起動して動作確認

### Step 2: Git for Windowsのインストール

Claude CodeはGit Bashを内部的に使用するため、Git for Windowsのインストールが必要です。

1. https://gitforwindows.org/ にアクセスし、インストーラをダウンロード
2. インストールオプションは基本的にデフォルトのままでOK
3. インストール完了後、PowerShellで以下を実行して確認

```
git --version
```

> **ℹ** Git for WindowsをインストールするとGit Bashが自動的に含まれます。WSLのセットアップは不要です。

### Step 3: Claude Code拡張機能のインストール

1. VS Codeを起動
2. `Ctrl + Shift + X` を押して拡張機能ビューを開く
3. 検索ボックスに「Claude Code」と入力
4. 発行元が「AnthropicPBC」（または「Anthopic」）の公式拡張を選択し、**Install** をクリック
5. インストール後、VS Codeを再起動（表示されない場合）

> **⚠** 拡張機能が表示されない場合は、`Ctrl + Shift + P` でコマンドパレットを開き、「Developer: Reload Window」を実行してください。

### Step 4: 認証（サインイン）

1. VS Code左サイドバーのSparkアイコン（✨形）をクリック
2. 初回起動時、ブラウザが自動的に開き認証ページが表示される
3. Claude.ai（またはAnthropic Console）のアカウントでログイン
4. 認証が完了すると自動的にVS Codeに戻り、Claude Codeが使用可能になる

> **ℹ** 認証後、エディタ右上のSparkアイコンをクリックすると、ファイルを開いた状態ですぐにClaudeと対話できます。

---

## 4. macOSのセットアップ手順

### Step 1: VS Codeのインストール

1. https://code.visualstudio.com/ にアクセスし、macOS用（Apple Silicon / Intel）をダウンロード
2. ダウンロードした `.zip` を展開し、`Visual Studio Code.app` を `Applications` フォルダにドラッグ
3. VS Codeを起動
4. `Cmd + Shift + P` でコマンドパレットを開き、「Shell Command: Install 'code' command in PATH」を実行（任意だが推奨）

> **ℹ** macOSにはXcode Command Line Toolsの一部としてGitが含まれているため、通常はGitの別途インストールは不要です。ターミナルで `git --version` を実行して確認できます。

### Step 2: Claude Code拡張機能のインストール

1. VS Codeを起動
2. `Cmd + Shift + X` を押して拡張機能ビューを開く
3. 「Claude Code」と検索し、Anthropic公式の拡張機能を **Install**

### Step 3: 認証（サインイン）

1. サイドバーのSparkアイコンをクリックしてClaude Codeパネルを開く
2. ブラウザが開き、Claude.aiまたはAnthropic Consoleでのログインを求められる
3. 認証完了後、VS Codeに戻ればすぐに使用可能

---

## 5. Git SSH認証の設定

GitHubとのやり取りをSSH経由で行うことで、毎回のパスワード入力が不要になります。ここでは、GitHubが推奨するEd25519鍵を使用した手順を説明します。

### 5-1. Gitの初期設定（Windows / Mac共通）

ターミナル（Windowsの場合はGit Bash）で以下を実行し、コミット時の名前とメールアドレスを設定します。GitHubアカウントに登録しているメールアドレスを使用してください。

```bash
git config --global user.name "あなたの名前"
git config --global user.email "your_email@example.com"
```

### 5-2. SSHキーの生成

#### Windows（Git Bash で実行）

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

- 保存先はデフォルト（`C:\Users\ユーザー名\.ssh\id_ed25519`）のままEnterで進む
- パスフレーズは任意（セキュリティ強化のため設定推奨。省略も可）

#### macOS（ターミナルで実行）

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

- 保存先はデフォルト（`~/.ssh/id_ed25519`）のままEnterで進む
- パスフレーズは任意

> **ℹ** Ed25519はGitHubが推奨する鍵形式です。古いシステムでEd25519が使えない場合は `ssh-keygen -t rsa -b 4096 -C "your_email@example.com"` で代替できます。

### 5-3. ssh-agentへの鍵の登録

#### Windows（Git Bash）

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

#### macOS

macOS Monterey（12.0）以降の場合、まず `~/.ssh/config` を作成・編集します。

```bash
touch ~/.ssh/config
open ~/.ssh/config
```

以下の内容を追記してください。

```
Host github.com
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_ed25519
```

> **ℹ** パスフレーズを設定しなかった場合は `UseKeychain yes` の行を削除してください。

その後、ssh-agentに鍵を追加します。

```bash
eval "$(ssh-agent -s)"
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
```

### 5-4. 公開鍵をGitHubに登録

#### 公開鍵のコピー

**Windows（Git Bash）:**

```bash
clip < ~/.ssh/id_ed25519.pub
```

**macOS:**

```bash
pbcopy < ~/.ssh/id_ed25519.pub
```

#### GitHubへの登録

1. ブラウザで [GitHub](https://github.com) にログイン
2. 右上のプロフィールアイコン → **Settings**
3. 左メニューの「Access」セクションから **SSH and GPG keys** をクリック
4. **New SSH key** をクリック
5. 「Title」に識別しやすい名前を入力（例：`Windows-Work-PC`、`MacBook-Pro-2025`）
6. 「Key type」は **Authentication Key** を選択
7. 「Key」欄にコピーした公開鍵を貼り付け
8. **Add SSH key** をクリック

### 5-5. 接続テスト

```bash
ssh -T git@github.com
```

初回接続時に以下のようなメッセージが表示されます。

```
The authenticity of host 'github.com (IP ADDRESS)' can't be established.
ED25519 key fingerprint is SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

`yes` と入力してください。成功すると以下が表示されます。

```
Hi ユーザー名! You've successfully authenticated, but GitHub does not provide shell access.
```

### 5-6. VS CodeでのSSH利用

VS CodeはSSH鍵が正しく設定されていれば、自動的にSSH経由でGit操作を行います。リポジトリのクローン時にはSSH URLを使用してください。

```bash
# SSH URL（推奨）
git clone git@github.com:ユーザー名/リポジトリ名.git

# HTTPS URL（パスワード入力が必要になる場合がある）
git clone https://github.com/ユーザー名/リポジトリ名.git
```

VS Code内のソース管理機能（`Ctrl + Shift + G` / `Cmd + Shift + G`）からもプッシュ・プルが可能です。ssh-agentが起動していれば、パスフレーズの再入力なしで操作できます。

---

## 6. トラブルシューティング

### 認証関連

**ANTHROPIC_API_KEY環境変数の競合**

システムにANTHROPIC_API_KEY環境変数が設定されている場合、Claude CodeはサブスクリプションではなくそのAPIキーを使用し、API使用量として課金されます。不要な場合は環境変数を削除してください。

**認証方式の切り替え**

Console PAYGでログイン済みの場合、Claude Code内で `/login` コマンドを実行すればサブスクリプションに切り替えられます。

**認証アカウントが選択できない場合**

以下の手順を試してください：Claude Code内で `/logout` → ターミナルで `claude update` → ターミナルを完全に再起動 → `claude` を再実行して正しいアカウントを選択

### Windows固有の問題

**Git Bashが見つからない**

Claude CodeがGit Bashのパスを検出できない場合、環境変数 `CLAUDE_CODE_GIT_BASH_PATH` にパスを明示的に設定してください。

**拡張機能が表示されない**

インストール後に拡張が表示されない場合、VS Codeを再起動するか、コマンドパレット（`Ctrl + Shift + P`）から「Developer: Reload Window」を実行してください。

### SSH関連の問題

**Permission denied (publickey)**

- 公開鍵がGitHubに正しく登録されているか確認
- `ssh-add -l` で鍵がagentに登録されているか確認
- 鍵のファイルパーミッションを確認：秘密鍵は `600`、`.ssh` ディレクトリは `700` であること

**Windowsでssh-agentが自動起動しない**

PowerShell（管理者権限）で以下を実行して、ssh-agentサービスを自動起動に設定できます。

```powershell
Get-Service ssh-agent | Set-Service -StartupType Automatic
Start-Service ssh-agent
```

**macOSでパスフレーズを毎回聞かれる**

`~/.ssh/config` に `UseKeychain yes` と `AddKeysToAgent yes` が正しく設定されているか確認してください（セクション5-3参照）。

### 共通の問題

**claude doctorによる診断**

何か問題がある場合、ターミナルで `claude doctor` を実行すると、インストール状態、バージョン、一般的な設定の問題を自動検出できます。

---

## 7. ショートカットキー一覧

| 操作 | Windows | Mac |
|------|---------|-----|
| 拡張機能ビューを開く | `Ctrl + Shift + X` | `Cmd + Shift + X` |
| コマンドパレット | `Ctrl + Shift + P` | `Cmd + Shift + P` |
| 新規セッション開始 | `Ctrl + N` | `Cmd + N` |
| 統合ターミナルを開く | `` Ctrl + ` `` | `` Cmd + ` `` |
| ソース管理ビューを開く | `Ctrl + Shift + G` | `Cmd + Shift + G` |
| Claude Codeにファイル参照を挿入 | `Alt + K` | `Option + K` |

---

## 8. おすすめのVS Code拡張機能

VS Codeをより快適に使うために、以下の拡張機能のインストールを推奨します。

> **⚠ 拡張機能の選定について**
>
> VS Code Marketplaceには膨大な数の拡張機能が公開されていますが、品質やセキュリティはまちまちです。過去には悪意あるコードが含まれた拡張機能が公開されていた事例もあります。インストール前に以下の点を確認してください。
>
> - **開発元（Publisher）の確認** — Marketplaceの拡張機能ページに表示される発行元名を確認する。Microsoft、GitHub、Anthropicなど著名な企業や、✔マーク付きの「Verified Publisher」は信頼性の目安になる
> - **ダウンロード数と評価** — ダウンロード数が多く（目安として数十万〜数百万以上）、星評価が高いものは、多くの開発者に検証されている可能性が高い
> - **更新頻度** — 最終更新日が極端に古い拡張機能は、VS Codeの最新バージョンとの互換性問題やセキュリティリスクがある。直近1年以内に更新されているかを確認する
> - **GitHubリポジトリの有無** — ソースコードが公開されている拡張機能は、第三者による監査が可能であり透明性が高い
> - **類似名称に注意** — 人気拡張の名前に似せた偽拡張が存在することがある。発行元名とスペルを必ず照合すること
>
> 以下で紹介する拡張機能は、いずれもMicrosoftや著名な開発元が提供しているか、数百万規模のダウンロード実績があり、広く利用されているものです。

### 日本語化

| 拡張機能名 | 開発元 | 説明 |
|------------|--------|------|
| **Japanese Language Pack for Visual Studio Code** | Microsoft | VS CodeのUI全体を日本語化する公式言語パック。インストール後、VS Codeを再起動すると日本語UIが適用される。コマンドパレットで「Configure Display Language」を実行して手動切り替えも可能 |

### Git連携強化

| 拡張機能名 | 開発元 | 説明 |
|------------|--------|------|
| **GitLens** | GitKraken | 各行のblame情報（誰がいつ変更したか）をインライン表示。コミット履歴、ブランチ比較、ファイルの変更履歴の可視化など、VS Code標準のGit機能を大幅に拡張する。基本機能は無料 |
| **Git Graph** | mhutchie | ブランチのマージ状況やコミット履歴をグラフィカルに表示。ブランチ構造の把握に便利 |

### コード品質・フォーマット

| 拡張機能名 | 開発元 | 説明 |
|------------|--------|------|
| **Prettier - Code formatter** | Prettier | JavaScript、TypeScript、CSS、HTML、JSON、Markdownなど多くの言語に対応した自動フォーマッター。保存時の自動フォーマットを設定しておくと、チーム内のコードスタイルを統一できる |
| **ESLint** | Microsoft | JavaScript / TypeScriptのコード品質を静的解析で検証。Prettierと併用することで、フォーマットはPrettier、ロジックの問題検出はESLintと役割分担できる |
| **Code Spell Checker** | Street Side Software | 変数名やコメント内のスペルミスを検出。camelCaseにも対応しており、英語コードのtypo防止に有効 |

### 視認性・編集効率の向上

| 拡張機能名 | 開発元 | 説明 |
|------------|--------|------|
| **indent-rainbow** | oderwat | インデントの深さに応じて色分け表示する。ネストの深いコードの構造把握に役立つ |
| **Error Lens** | Alexander | ESLintやTypeScriptの警告・エラーメッセージを該当行にインライン表示する。問題のある行がひと目でわかる |
| **Auto Rename Tag** | Jun Han | HTML/XMLの開始タグを編集すると、対応する閉じタグも自動でリネームされる |
| **Path Intellisense** | Christian Kohler | ファイルパスの入力時に候補を自動補完する。import文の記述が効率化される |

### Web開発向け

| 拡張機能名 | 開発元 | 説明 |
|------------|--------|------|
| **Live Server** | Ritwick Dey | HTMLファイルをローカルサーバーで起動し、変更時にブラウザを自動リロードする。フロントエンドの確認作業に便利 |
| **Thunder Client** | Thunder Client | VS Code内で完結するREST APIクライアント。Postmanのような操作がエディタ内で可能 |

> **ℹ** 拡張機能は `Ctrl + Shift + X`（Mac: `Cmd + Shift + X`）で検索・インストールできます。必要なものから順に導入し、使わないものは無効化してパフォーマンスを維持してください。

---

## 9. 参考リンク

- VS Codeダウンロード: https://code.visualstudio.com/
- Git for Windows: https://gitforwindows.org/
- Claude Code公式ドキュメント: https://code.claude.com/docs/en/vs-code
- Claude Code VS Code Marketplace: https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code
- GitHub SSH設定ガイド: https://docs.github.com/en/authentication/connecting-to-github-with-ssh
- Anthropicサポート: https://support.claude.com/
- プランアップグレード: https://claude.ai/upgrade

---

以上
