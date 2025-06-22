# t-facimoni-frontend

施設監視システムのフロントエンドアプリケーション

## 必要な環境

- Node.js v22.16.0 以上（LTS版推奨）
- npm v10.x 以上

## セットアップ

### 1. リポジトリのクローン

```bash
git clone [repository-url]
cd tepco-facility-monitor
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. Huskyのセットアップ（初回のみ）

```bash
npx husky install
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:5173 にアクセスしてください。

## 利用可能なスクリプト

```bash
# 開発サーバーの起動
npm run dev

# プロダクションビルド
npm run build

# ビルドのプレビュー
npm run preview

# ESLintの実行
npm run lint

# Biomeでコードフォーマット
npm run format

# Biomeでフォーマットチェック（CIで使用）
npm run format:check

# Biomeで総合チェック（lint + format）
npm run biome:check

# Biomeで自動修正
npm run biome:fix
```

## ディレクトリ構成

```
tepco-facility-monitor/
├── .husky/                   # Git hooks設定
├── .vscode/                  # VSCode設定
├── public/                   # 静的ファイル
├── src/                      # ソースコード
│   ├── assets/              # 画像などの静的アセット
│   ├── components/          # Reactコンポーネント
│   │   ├── common/         # 共通コンポーネント
│   │   │   ├── GlobalHeader.tsx
│   │   │   └── GlobalSideBar.tsx
│   │   └── ui/            # UIコンポーネント（shadcn/ui）
│   ├── features/           # 機能別モジュール
│   │   ├── admin/         # 管理者機能（空）
│   │   ├── application/   # アプリケーション機能（空）
│   │   ├── dashboard/     # ダッシュボード機能
│   │   │   └── MapComponent.tsx
│   │   └── installation/  # 施設管理機能
│   │       └── InstallationTypeFilter.tsx
│   ├── hooks/             # カスタムフック
│   ├── lib/               # ユーティリティ関数
│   ├── routes/            # ルーティング設定
│   │   ├── __root.tsx
│   │   ├── admin.tsx
│   │   ├── application.tsx
│   │   ├── index.tsx
│   │   └── installation.tsx
│   ├── App.css            # アプリケーションスタイル（未使用）
│   ├── App.tsx            # メインアプリケーション
│   ├── index.css          # グローバルスタイル
│   ├── main.tsx           # エントリーポイント
│   ├── routeTree.gen.ts   # TanStack Router自動生成ファイル
│   ├── router.tsx         # ルーター設定
│   └── vite-env.d.ts      # Vite型定義
├── biome.json             # Biome設定
├── components.json        # shadcn/ui設定
├── package.json           # プロジェクト設定
├── tsconfig.app.json      # アプリケーション用TypeScript設定
├── tsconfig.json          # TypeScript設定（親）
├── tsconfig.node.json     # Node.js環境用TypeScript設定
└── vite.config.ts         # Vite設定
```

## 開発ガイドライン

### UIコンポーネントの実装

このプロジェクトでは**shadcn/ui**を採用しています。基本的なUIコンポーネント（ボタン、フォーム、ダイアログなど）を実装する際は、まずshadcn/uiのコンポーネントを使用してください。

```bash
# 新しいコンポーネントの追加例
npx shadcn@latest add dialog
npx shadcn@latest add form
```

利用可能なコンポーネント: https://ui.shadcn.com/docs/components/accordion

### コード品質の維持

このプロジェクトでは、コード品質を維持するために以下のツールを使用しています：

- **Biome**: コードフォーマットとlinting
- **TypeScript**: 型安全性の確保
- **Husky + lint-staged**: コミット時の自動チェック

### 自動フォーマット

- VSCodeを使用している場合、保存時に自動的にコードがフォーマットされます
- 手動でフォーマットする場合: `npm run format`
- コミット時にも自動的にフォーマットが実行されます

### VSCode拡張機能

推奨される拡張機能は `.vscode/extensions.json` に定義されています。
VSCodeを開くと自動的にインストールを促されます。

**重要**: 保存時の自動フォーマットを有効にするには、VSCodeで以下の手順を実行してください：
1. プロジェクトをVSCodeで開く
2. 右下に表示される「推奨拡張機能をインストール」の通知をクリック
3. Biome拡張機能をインストール
4. これで保存時に自動フォーマットが有効になります！

## トラブルシューティング

### Huskyが動作しない場合

```bash
# Huskyを再インストール
npx husky install
```

### 依存関係の問題

```bash
# node_modulesとpackage-lock.jsonを削除して再インストール
rm -rf node_modules package-lock.json
npm install
```