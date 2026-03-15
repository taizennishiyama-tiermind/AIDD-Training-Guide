# GitHub 導入および二要素認証（2FA）設定手順書

## 概要

本手順書は、社員が GitHub を業務利用するにあたり、以下の一連の作業を完了するための手順を記載する。

1. GitHub アカウントの作成（社用 Google Workspace メールアドレスを使用）
2. KeePassXC を使用した二要素認証（2FA）の設定
3. 社内 Organization への参加

GitHub は 2023 年 3 月以降、コードを投稿するすべてのユーザーに対して 2FA を必須としている。また、当社の Organization でも 2FA を要求する設定としているため、**2FA の設定が完了していないと Organization に参加できない。** 必ず本手順書の順序に従って作業を進めること。

> 対象バージョン: KeePassXC 2.7.12（2026年3月10日リリース）

---

## 前提条件

- Windows 64bit または macOS 環境
  - Windows 32bit は KeePassXC 2.6.6 以降サポート対象外
- 社用の Google Workspace メールアドレスを保有していること
- インターネット接続があること

---

## Part 1: GitHub アカウントの作成

### 1.1 アカウント登録

1. ブラウザで https://github.com/signup にアクセスする
2. メールアドレスの入力を求められるので、**社用の Google Workspace メールアドレス**を入力する
3. パスワードを設定する（十分に強力なものを設定すること）
4. ユーザー名を設定する
5. 画面の指示に従い、パズル等の認証チャレンジを完了する
6. **Create account** をクリックする

> **ユーザー名について**: ユーザー名は GitHub 上で公開される識別子となる。本名やハンドルネームなど任意の名称でよいが、後から変更すると既存のリンクが無効になるため、慎重に決めること。

### 1.2 メールアドレスの確認

1. 登録した社用メールアドレスに GitHub から確認コードが届く
2. 受信した確認コードを GitHub の画面に入力する

> メールが届かない場合は、迷惑メールフォルダを確認すること。Google Workspace の場合、管理者によるフィルタ設定で遅延する場合がある。

### 1.3 初期設定のスキップ

1. アカウント作成後、利用目的やチームの規模を聞かれる画面が表示される場合がある
2. これらは **Skip personalization** 等のリンクで全てスキップしてよい

> アカウント作成後、引き続き Part 2 以降の 2FA 設定を行うこと。2FA を設定しないと Organization に参加できない。

---

## Part 2: KeePassXC のインストールとデータベース作成

### 2.1 インストール

1. 公式サイト https://keepassxc.org/download にアクセスする
2. 使用 OS に応じたインストーラーをダウンロードする
   - **Windows**: MSI インストーラーまたはポータブル版
   - **macOS**: DMG ファイル
3. インストーラーを実行し、画面の指示に従いインストールを完了する
   - macOS の場合、ダウンロードした DMG を開き、KeePassXC.app を Applications フォルダにドラッグ＆ドロップする

> GitHub 公式ドキュメントにおいて、デスクトップ向け TOTP アプリとして KeePassXC が明示的に推奨されている。

### 2.2 データベースの作成（初回のみ）

1. KeePassXC を起動する
2. 「新しいデータベースを作成」をクリックする
3. データベース名を入力し「続行」をクリックする
4. 暗号化設定はデフォルト（AES-256 + Argon2id）のまま「続行」をクリックする
5. マスターパスワードを設定する
6. `.kdbx` ファイルの保存先を指定して保存する

> **注意**: マスターパスワードは十分に強力なものを設定すること。このパスワードを忘れるとデータベース内の全データにアクセスできなくなる。

---

## Part 3: GitHub 用エントリの作成

1. KeePassXC でデータベースを開く
2. 新しいエントリを作成する
   - **Windows**: `Ctrl+N` を押すか、メニューから「エントリ → 新しいエントリ」を選択する
   - **macOS**: `Cmd+N` を押すか、メニューから「エントリ → 新しいエントリ」を選択する
3. 以下の情報を入力する：
   - **タイトル**: `GitHub`
   - **ユーザー名**: GitHub のユーザー名
   - **パスワード**: GitHub のパスワード
   - **URL**: `https://github.com`
4. 「OK」をクリックして保存する

> 既に GitHub 用エントリが存在する場合、このステップはスキップしてよい。

---

## Part 4: GitHub 側の 2FA 設定

本手順書では、以下の 2 パターンに分けて記載する。

- **パターン A**: 2FA が未設定の場合（新規設定）— 通常はこちら
- **パターン B**: SMS で 2FA が設定済みの場合（Authenticator app の追加）

### パターン A: 2FA 新規設定

#### 4A.1 2FA 有効化の開始

1. GitHub にログインする
2. 右上のプロフィール画像をクリック → **Settings** を選択する
3. 左サイドバーの「Access」セクションにある **Password and authentication** をクリックする
4. 「Two-factor authentication」セクションの **Enable two-factor authentication** をクリックする

#### 4A.2 セットアップキーの取得

1. QR コードが表示される画面で、**setup key** のテキストリンクをクリックする
2. 表示された Base32 形式の文字列をコピーする

> **この画面はまだ閉じないこと。** 後続の手順でコードの入力が求められる。

#### 4A.3 KeePassXC に TOTP を設定

1. KeePassXC で GitHub エントリを右クリックする
2. **TOTP → TOTPの設定…** を選択する
3. 「Secret Key（シークレットキー）」欄に、コピーした文字列を貼り付ける
4. その他の設定はデフォルトのまま（6桁 / 30秒 / SHA-1）とする
5. 「OK」をクリックして保存する

#### 4A.4 検証コードの入力

1. KeePassXC で GitHub エントリを右クリック → **TOTP → TOTP をコピー**
   - **Windows**: ショートカット `Ctrl+T`
   - **macOS**: ショートカット `Cmd+T`
2. GitHub 画面の確認フィールドにコードを貼り付ける
3. **Continue** をクリックする

> コードは 30 秒ごとに更新されるため、コピー後は速やかに貼り付けること。

#### 4A.5 リカバリーコードの保存

1. 2FA 設定完了後にリカバリーコードが表示される
2. **必ず安全な場所に保管する**（以下のいずれかまたは複数）：
   - KeePassXC の GitHub エントリの「メモ」欄にコピーする
   - 印刷して物理的に保管する

> **重要**: GitHub サポートは 2FA クレデンシャルを失ったアカウントへのアクセス復旧を行わない。リカバリーコードの保管は必須である。

---

### パターン B: SMS 設定済みからの移行

SMS で 2FA を運用済みの場合、2FA を無効化せずに Authenticator app を追加できる。

#### 4B.1 Authenticator app の追加

1. GitHub にログインする
2. 右上のプロフィール画像をクリック → **Settings** → **Password and authentication** を開く
3. 「Two-factor methods」セクションの「Authenticator app」横の **Add** をクリックする

#### 4B.2 セットアップキーの取得

パターン A の 4A.2 と同じ手順でセットアップキーをコピーする。

#### 4B.3 KeePassXC に TOTP を設定

パターン A の 4A.3 と同じ手順で KeePassXC に TOTP を設定する。

#### 4B.4 検証コードの入力

パターン A の 4A.4 と同じ手順でコードを入力し、設定を完了する。

#### 4B.5 Preferred 2FA method の変更

1. 「Password and authentication」画面上部の **Preferred 2FA method** ドロップダウンを開く
2. 「SMS/Text message」から **Authenticator app** に変更する

#### 4B.6 SMS の無効化（任意）

SMS を残すかどうかは以下の基準で判断する。

| 条件 | 推奨対応 |
|------|----------|
| リカバリーコードを安全に保管できている | SMS を無効化してよい（Edit → 無効化） |
| リカバリーコードの保管に不安がある | SMS をフォールバックとして残す |

> Preferred method が Authenticator app に設定されていれば、通常のログインでは TOTP が使用される。SMS を残していても日常運用には影響しない。

#### 4B.7 リカバリーコードの再確認

1. 「Recovery codes」セクションの **View** をクリックする
2. 表示されたコードを KeePassXC の GitHub エントリのメモ欄にも保存する
3. 必要に応じて新しいリカバリーコードを再生成する

---

## Part 5: Organization への参加

### 5.1 招待メールの確認

1. 管理者が Organization への招待を行うと、GitHub アカウントに登録した社用メールアドレスに招待メールが届く
2. 届いたメール内の **Join @（Organization名）** のリンクをクリックする
3. GitHub の画面が開き、招待内容が表示される
4. **Join（Organization名）** をクリックして参加を完了する

> **注意**: 招待には **7 日間の有効期限**がある。期限を過ぎた場合は管理者に再招待を依頼すること。

### 5.2 参加の確認

1. GitHub にログインした状態で、右上のプロフィール画像をクリックする
2. **Your organizations** を選択する
3. 参加した Organization が一覧に表示されていれば完了

> 招待メールが届かない場合は、GitHub にログインした状態で直接 Organization のページ（`https://github.com/（Organization名）`）にアクセスすると、画面上部に招待の通知が表示される場合がある。

---

## Part 6: 日常運用

### 6.1 GitHub ログイン時の操作

1. GitHub にユーザー名とパスワードでログインする
2. 6 桁の認証コード入力画面が表示される
3. KeePassXC を開く
4. GitHub エントリを右クリック → **TOTP → TOTP をコピー**
   - **Windows**: ショートカット `Ctrl+T`
   - **macOS**: ショートカット `Cmd+T`
5. コピーしたコードを GitHub の入力フィールドに貼り付ける

### 6.2 ブラウザ拡張による自動入力（任意）

KeePassXC-Browser 拡張を使えば、ユーザー名・パスワード・TOTP を自動入力できる。

#### 設定手順

**KeePassXC 側：**

1. メニュー → **ツール → 設定 → ブラウザ統合** を開く
2. 使用するブラウザ（Chrome / Firefox / Edge）にチェックを入れる
3. 「OK」で保存する

**ブラウザ側：**

1. 各ブラウザのストアから **KeePassXC-Browser** 拡張をインストールする
   - Chrome / Edge: Chrome ウェブストアから取得
   - Firefox: Firefox Add-ons から取得
   - Safari（macOS）: 現時点では KeePassXC-Browser の Safari 版は提供されていない。Chrome または Firefox を使用すること
2. 拡張のポップアップから「接続」をクリックする
3. KeePassXC 側でペアリング承認ダイアログが表示されるので、接続名を入力して許可する

#### 利用方法

- GitHub のログイン画面にアクセスすると、拡張アイコンまたはフィールド内のアイコンからユーザー名・パスワードが自動入力される
- TOTP 入力画面でも同様にコードが自動入力される

> ブラウザ拡張が動作するには、KeePassXC でデータベースがロック解除されている必要がある。

---

## Part 7: セキュリティ上の注意事項

### パスワードと TOTP の同一保管について

パスワードと TOTP シークレットを同じ KeePassXC データベースに保管する場合、厳密には「二要素」が「一箇所に集約」されることになる。これは 2FA の理念からは逸脱するが、以下の脅威に対しては依然として有効である：

- フィッシング攻撃（パスワードが漏洩しても TOTP なしではログインできない）
- サーバー側のパスワード漏洩
- パスワードリスト攻撃

より厳密な運用を求める場合は、TOTP シークレットをスマートフォンの認証アプリにも登録し、KeePassXC とは別の場所にバックアップを持つことを推奨する。

### データベースのバックアップ

KeePassXC 自体にはクラウド同期機能がないが、KeePassXC 公式 FAQ でも案内されているとおり、`.kdbx` ファイルを Google Drive・Dropbox・OneDrive 等の共有フォルダに配置し、各サービスの同期クライアントに同期を任せる方式が推奨されている。

#### Google Workspace 環境での運用（当社推奨構成）

当社では Google Workspace を利用しているため、以下の構成でクラウド保存と複数端末からのアクセスを実現できる。

1. **Google ドライブ デスクトップ アプリ**をインストールする（Windows / Mac 両対応）
2. エクスプローラー（Windows）または Finder（Mac）に Google ドライブがマウントされる
3. マウントされたドライブ上に `.kdbx` ファイルを配置する
4. KeePassXC からこのファイルを直接開いて使用する

この構成により、データベースの変更は自動的に Google ドライブに同期され、Windows と Mac の両方から同じデータベースにアクセスできる。

#### 注意事項：同期競合とファイルロック

Google ドライブ経由で `.kdbx` を運用する場合、以下の既知の問題に留意すること。

| 問題 | 原因 | 対策 |
|------|------|------|
| 同期競合（ファイル名末尾に `(1)` 等が付いた重複ファイルが生成される） | 複数端末で同時にデータベースを開いた状態で保存した場合に発生する | **同時に複数端末でデータベースを開かない。** 一方の端末で閉じ、同期完了を待ってからもう一方で開く |
| 保存失敗（「file sync services holding a lock on the save file」エラー） | 同期クライアントがファイルをロックしている間に KeePassXC が保存を試みた場合に発生する | KeePassXC の設定で「安全な保存を無効化（Disable safe saves）」を試す。それでも解消しない場合はローカルにコピーして編集後に戻す |

**運用上の鉄則：同じデータベースを複数端末で同時に開かないこと。** これを守れば、上記の問題はほぼ回避できる。

#### ローカルバックアップの併用

Google ドライブへの保存に加え、`.kdbx` ファイルの定期的なローカルバックアップ（USB メモリ、別ドライブ等）も併用することを推奨する。クラウドサービスの障害やアカウントロックアウト時のリスクに備えるためである。

---

## 参考情報

- GitHub アカウント作成: https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github
- GitHub 2FA 設定ドキュメント: https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication
- GitHub 2FA 必須化について: https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/about-mandatory-two-factor-authentication
- GitHub Organization への招待: https://docs.github.com/en/organizations/managing-membership-in-your-organization/inviting-users-to-join-your-organization
- KeePassXC 公式サイト: https://keepassxc.org/
- KeePassXC ユーザーガイド: https://keepassxc.org/docs/KeePassXC_UserGuide
