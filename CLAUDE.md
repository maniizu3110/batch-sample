# BatchSample

Claude Code `/batch` コマンドの動作検証用 Next.js サンプルプロジェクト。

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout (Header + Footer)
│   ├── about/page.tsx     # About page
│   ├── blog/page.tsx      # Blog listing page
│   ├── contact/page.tsx   # Contact form page
│   ├── dashboard/page.tsx # Dashboard with stats & table
│   └── settings/page.tsx  # Settings page
├── components/
│   ├── ui/                # Reusable UI primitives
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   ├── layout/            # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   └── features/          # Feature-specific components
│       ├── BlogPostCard.tsx
│       ├── ContactForm.tsx
│       ├── DataTable.tsx
│       ├── StatsCard.tsx
│       └── UserProfile.tsx
```

## /batch で試せるタスクの例

- 全コンポーネントに JSDoc を追加
- Tailwind のクラス名を CSS Modules に移行
- React.FC を使った型定義に統一
- 全コンポーネントのテストファイルを生成
- i18n 対応（ハードコードされた文字列を翻訳キーに置換）
- shadcn/ui への移行

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run lint     # Run ESLint
```
