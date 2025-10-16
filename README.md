# TodoGenius 🎯

## AI-Powered Task Management for Everyone

TodoGeniusは、AIの力を活用してタスクを効率的に管理し、先延ばしを克服するためのスマートなTodoアプリケーションです。タスクの嫌悪度や種類を考慮し、AIが最適なアドバイスとサポートを提供します。

## ✨ 主な機能

### 🎯 スマートなタスク分類

- **3つのカテゴリー**でタスクを整理
  - 🔹 **Personal** - 個人的なタスク
  - 🔹 **Delegated** - 他者のためのタスク
  - 🔹 **Administrative** - 事務的なタスク

### 📊 嫌悪度スコア機能

- タスクの嫌悪度を1-5段階で評価
- AIがスコアに基づいて最適なサポートを提供

### 🤖 AI-Powered機能

- **AI Task Breakdown** - 大きなタスクを小さなステップに分解
- **AI Task Guidance** - 事務的タスクの詳細な手順ガイド
- **Smart Reminders** - タスクの種類と嫌悪度に基づくインテリジェントなリマインダー

### 🎉 モチベーション向上

- タスク完了時の祝福メッセージ
- 視覚的なフィードバックでやる気をアップ
- 清潔で美しいUIデザイン

## 🎨 デザインコンセプト

- **プライマリカラー**: ソフトブルー (#79A3B1) - 集中力と安らぎを促進
- **背景色**: ライトブルー (#E8F0F2) - 清潔で邪魔にならない背景
- **アクセントカラー**: ミューテッドグリーン (#89A379) - 完了タスクの表示
- **フォント**: PT Sans - モダンでアクセシブルな印象

## 🚀 技術スタック

### フロントエンド

- **Next.js 15** - React フレームワーク
- **TypeScript** - 型安全な開発
- **Tailwind CSS** - ユーティリティファーストCSS
- **Radix UI** - アクセシブルなUIコンポーネント
- **Lucide React** - アイコンライブラリ

### AI & バックエンド

- **Firebase Genkit** - AI開発フレームワーク
- **Google Gen AI** - AI機能の実装
- **Firebase** - バックエンドサービス

### UI コンポーネント

豊富なUIコンポーネントライブラリを内蔵：

- Dialog, Alert, Toast - ユーザーインタラクション
- Form, Input, Select - データ入力
- Progress, Badge, Avatar - 状態表示
- Accordion, Tabs, Collapsible - コンテンツ組織化

## 📂 プロジェクト構造

```text
todo-genius/
├── src/
│   ├── ai/                    # AI機能の実装
│   │   ├── flows/            # AIフロー定義
│   │   │   ├── ai-task-breakdown.ts
│   │   │   ├── ai-task-guidance.ts
│   │   │   └── smart-ai-reminders.ts
│   │   ├── genkit.ts         # Genkit設定
│   │   └── dev.ts           # 開発用AI設定
│   ├── app/                  # Next.jsアプリケーション
│   │   ├── page.tsx         # メインページ
│   │   ├── layout.tsx       # レイアウト
│   │   ├── actions.ts       # サーバーアクション
│   │   └── globals.css      # グローバルスタイル
│   ├── components/          # Reactコンポーネント
│   │   ├── app/            # アプリ固有コンポーネント
│   │   │   ├── task-list.tsx
│   │   │   ├── task-details.tsx
│   │   │   ├── add-task-dialog.tsx
│   │   │   ├── smart-reminder-card.tsx
│   │   │   ├── task-breakdown-card.tsx
│   │   │   └── task-guidance-card.tsx
│   │   └── ui/             # 再利用可能UIコンポーネント
│   ├── hooks/              # カスタムReactフック
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   └── lib/                # ユーティリティとタイプ
│       ├── types.ts        # TypeScript型定義
│       ├── utils.ts        # ユーティリティ関数
│       └── placeholder-images.ts
├── docs/
│   └── blueprint.md        # アプリ設計書
├── next.config.ts          # Next.js設定
├── tailwind.config.ts      # Tailwind設定
├── tsconfig.json          # TypeScript設定
└── apphosting.yaml        # Firebase App Hosting設定
```

## 🛠️ 開発環境のセットアップ

### 必要要件

- Node.js 18以上
- npm または yarn

### インストールと起動

1. **リポジトリのクローン**

   ```bash
   git clone <repository-url>
   cd todo-genius
   ```

2. **依存関係のインストール**

   ```bash
   npm install
   ```

3. **環境変数の設定**

   `.env`ファイルを作成し、Gemini APIキーを設定してください：

   ```bash
   cp .env-EXAMPLE .env
   ```

   `.env`ファイルを編集して、実際のAPIキーを設定：

   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

   > APIキーは [Google AI Studio](https://aistudio.google.com/app/apikey) で取得できます。

4. **🚨 重要：AI機能を使うための開発サーバー起動**

   **AI機能を利用するには、必ず2つのプロセスを同時に起動する必要があります！**

   **ターミナル1** - Next.jsアプリ:

   ```bash
   npm run dev
   ```

   **ターミナル2** - Genkit AIサーバー:

   ```bash
   # AI機能の開発用
   npm run genkit:dev

   # または、ファイル変更を監視して自動再起動
   npm run genkit:watch
   ```

   **起動後のアクセス先:**
   - 📱 **アプリケーション**: <http://localhost:9002>
   - 🤖 **Genkit Developer UI**: <http://localhost:4000> (AIフローのテスト・デバッグ用)

   > **⚠️ 注意**: `npm run dev` だけではAI機能は動作しません！必ずGenkitサーバーも併せて起動してください。

### その他のコマンド

```bash
# プロダクションビルド
npm run build

# プロダクションサーバー起動
npm start

# Linting
npm run lint

# 型チェック
npm run typecheck
```

## 🎯 使い方

1. **タスクの追加** - 新しいタスクを作成し、カテゴリーと嫌悪度を設定
2. **AI分解機能** - 大きなタスクをAIが小さなステップに分解
3. **ガイダンス機能** - 事務的タスクの詳細な手順をAIが提案
4. **スマートリマインダー** - 最適なタイミングでタスクを通知
5. **進捗管理** - タスクの完了とお祝いメッセージでモチベーション維持

## 🤝 貢献

プロジェクトへの貢献を歓迎します！Issue報告やプルリクエストをお気軽にお送りください。

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

---

**TodoGenius** - AIの力で、タスク管理をもっとスマートに！ 🚀
