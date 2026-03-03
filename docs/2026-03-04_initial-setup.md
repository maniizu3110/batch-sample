# initial-setup

- **日時**: 2026-03-04
- **ベース**: `1218116`
- **ヘッド**: `bfe2429`
- **変更ファイル数**: 21

---

## 変更サマリー

```
 CLAUDE.md                                | 51 +++++++++++++++++
 src/app/about/page.tsx                   | 37 +++++++++++++
 src/app/blog/page.tsx                    | 65 ++++++++++++++++++++++
 src/app/contact/page.tsx                 | 33 +++++++++++
 src/app/dashboard/page.tsx               | 61 ++++++++++++++++++++
 src/app/layout.tsx                       | 10 +++-
 src/app/page.tsx                         | 95 +++++++++++++-------------------
 src/app/settings/page.tsx                | 91 ++++++++++++++++++++++++++++++
 src/components/features/BlogPostCard.tsx | 38 +++++++++++++
 src/components/features/ContactForm.tsx  | 46 ++++++++++++++++
 src/components/features/DataTable.tsx    | 55 ++++++++++++++++++
 src/components/features/StatsCard.tsx    | 34 ++++++++++++
 src/components/features/UserProfile.tsx  | 34 ++++++++++++
 src/components/layout/Footer.tsx         | 35 ++++++++++++
 src/components/layout/Header.tsx         | 38 +++++++++++++
 src/components/layout/Sidebar.tsx        | 36 ++++++++++++
 src/components/ui/Badge.tsx              | 22 ++++++++
 src/components/ui/Button.tsx             | 41 ++++++++++++++
 src/components/ui/Card.tsx               | 25 +++++++++
 src/components/ui/Input.tsx              | 42 ++++++++++++++
 src/components/ui/Modal.tsx              | 32 +++++++++++
 21 files changed, 860 insertions(+), 61 deletions(-)
```

## ファイル別の変更内容

### `CLAUDE.md`

<details>
<summary>差分を表示</summary>

```diff
diff --git a/CLAUDE.md b/CLAUDE.md
new file mode 100644
index 0000000..8d40e62
--- /dev/null
+++ b/CLAUDE.md
@@ -0,0 +1,51 @@
+# BatchSample
+
+Claude Code `/batch` コマンドの動作検証用 Next.js サンプルプロジェクト。
+
+## Project Structure
+
+```
+src/
+├── app/                    # Next.js App Router pages
+│   ├── page.tsx           # Home page
+│   ├── layout.tsx         # Root layout (Header + Footer)
+│   ├── about/page.tsx     # About page
+│   ├── blog/page.tsx      # Blog listing page
+│   ├── contact/page.tsx   # Contact form page
+│   ├── dashboard/page.tsx # Dashboard with stats & table
+│   └── settings/page.tsx  # Settings page
+├── components/
+│   ├── ui/                # Reusable UI primitives
+│   │   ├── Badge.tsx
+│   │   ├── Button.tsx
+│   │   ├── Card.tsx
+│   │   ├── Input.tsx
+│   │   └── Modal.tsx
+│   ├── layout/            # Layout components
+│   │   ├── Header.tsx
+│   │   ├── Footer.tsx
+│   │   └── Sidebar.tsx
+│   └── features/          # Feature-specific components
+│       ├── BlogPostCard.tsx
+│       ├── ContactForm.tsx
+│       ├── DataTable.tsx
+│       ├── StatsCard.tsx
+│       └── UserProfile.tsx
+```
+
+## /batch で試せるタスクの例
+
+- 全コンポーネントに JSDoc を追加
+- Tailwind のクラス名を CSS Modules に移行
+- React.FC を使った型定義に統一
+- 全コンポーネントのテストファイルを生成
+- i18n 対応（ハードコードされた文字列を翻訳キーに置換）
+- shadcn/ui への移行
+
+## Commands
+
+```bash
+npm run dev      # Start dev server
+npm run build    # Build for production
+npm run lint     # Run ESLint
+```
```

</details>

### `src/app/about/page.tsx`

<details>
<summary>差分を表示</summary>

```diff
diff --git a/src/app/about/page.tsx b/src/app/about/page.tsx
new file mode 100644
index 0000000..0baecae
--- /dev/null
+++ b/src/app/about/page.tsx
@@ -0,0 +1,37 @@
+import Card from "@/components/ui/Card";
+import Badge from "@/components/ui/Badge";
+
+const team = [
+  { name: "Alice", role: "Frontend Developer", skill: "React" },
+  { name: "Bob", role: "Backend Developer", skill: "Node.js" },
+  { name: "Charlie", role: "Designer", skill: "Figma" },
+  { name: "Diana", role: "DevOps Engineer", skill: "AWS" },
+];
+
+export default function AboutPage() {
+  return (
+    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
+      <h1 className="text-3xl font-bold text-gray-900 mb-8">About Us</h1>
+
+      <section className="mb-12">
+        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
+        <p className="text-gray-600 text-lg leading-relaxed">
+          We build sample applications to demonstrate the power of modern development tools.
+          This project specifically showcases how Claude Code /batch command can transform
+          codebases efficiently.
+        </p>
+      </section>
+
+      <section>
+        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Our Team</h2>
+        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
+          {team.map((member) => (
+            <Card key={member.name} title={member.name} description={member.role}>
+              <Badge color="blue">{member.skill}</Badge>
+            </Card>
+          ))}
+        </div>
+      </section>
+    </div>
+  );
+}
```

</details>

### `src/app/blog/page.tsx`

<details>
<summary>差分を表示</summary>

```diff
diff --git a/src/app/blog/page.tsx b/src/app/blog/page.tsx
new file mode 100644
index 0000000..498fa6e
--- /dev/null
+++ b/src/app/blog/page.tsx
@@ -0,0 +1,65 @@
+import BlogPostCard from "@/components/features/BlogPostCard";
+
+const posts = [
+  {
+    title: "Getting Started with Next.js",
+    excerpt: "Learn the basics of Next.js and build your first application with App Router and server components.",
+    author: "Alice",
+    date: "2026-03-01",
+    category: "Tutorial",
+    readTime: "5 min read",
+  },
+  {
+    title: "Understanding React Server Components",
+    excerpt: "Deep dive into React Server Components and how they change the way we build web applications.",
+    author: "Bob",
+    date: "2026-02-28",
+    category: "Technical",
+    readTime: "8 min read",
+  },
+  {
+    title: "Tailwind CSS Best Practices",
+    excerpt: "Tips and tricks for writing clean, maintainable Tailwind CSS in your React applications.",
+    author: "Charlie",
+    date: "2026-02-25",
+    category: "Design",
+    readTime: "4 min read",
+  },
+  {
+    title: "TypeScript Tips for Next.js",
+    excerpt: "Essential TypeScript patterns and configurations for productive Next.js development.",
+    author: "Diana",
+    date: "2026-02-20",
+    category: "Technical",
+    readTime: "6 min read",
+  },
+  {
+    title: "Building Accessible Components",
+    excerpt: "How to create reusable UI components that are accessible to everyone.",
+    author: "Alice",
+    date: "2026-02-15",
+    category: "Accessibility",
+    readTime: "7 min read",
+  },
+  {
+    title: "Deploying Next.js to Vercel",
+    excerpt: "Step-by-step guide to deploying your Next.js application to Vercel with custom domains.",
+    author: "Bob",
+    date: "2026-02-10",
+    category: "DevOps",
+    readTime: "3 min read",
+  },
+];
+
+export default function BlogPage() {
+  return (
+    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
+      <h1 className="text-3xl font-bold text-gray-900 mb-8">Blog</h1>
+      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
+        {posts.map((post) => (
+          <BlogPostCard key={post.title} {...post} />
+        ))}
+      </div>
+    </div>
+  );
+}
```

</details>

### `src/app/contact/page.tsx`

<details>
<summary>差分を表示</summary>

```diff
diff --git a/src/app/contact/page.tsx b/src/app/contact/page.tsx
new file mode 100644
index 0000000..cef9fca
--- /dev/null
+++ b/src/app/contact/page.tsx
@@ -0,0 +1,33 @@
+import ContactForm from "@/components/features/ContactForm";
+import Card from "@/components/ui/Card";
+
+export default function ContactPage() {
+  return (
+    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
+      <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h1>
+
+      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
+        <div>
+          <h2 className="text-xl font-semibold text-gray-800 mb-6">Send us a message</h2>
+          <ContactForm />
+        </div>
+
+        <div className="space-y-6">
+          <Card title="Email" description="example@batch-sample.dev">
+            <p className="text-sm text-gray-500">We reply within 24 hours</p>
+          </Card>
+          <Card title="Office" description="Tokyo, Japan">
+            <p className="text-sm text-gray-500">Mon - Fri, 9:00 - 18:00 JST</p>
+          </Card>
+          <Card title="Social" description="Follow us on social media">
+            <div className="flex gap-4 text-blue-600">
+              <a href="#" className="hover:underline">Twitter</a>
+              <a href="#" className="hover:underline">GitHub</a>
+              <a href="#" className="hover:underline">LinkedIn</a>
+            </div>
+          </Card>
+        </div>
+      </div>
+    </div>
+  );
+}
```

</details>

### `src/app/dashboard/page.tsx`

<details>
<summary>差分を表示</summary>

```diff
diff --git a/src/app/dashboard/page.tsx b/src/app/dashboard/page.tsx
new file mode 100644
index 0000000..d050f85
--- /dev/null
+++ b/src/app/dashboard/page.tsx
@@ -0,0 +1,61 @@
+import StatsCard from "@/components/features/StatsCard";
+import DataTable from "@/components/features/DataTable";
+import Badge from "@/components/ui/Badge";
+
+const stats = [
+  { title: "Total Users", value: "12,345", change: "+12% from last month", changeType: "positive" as const, icon: "👥" },
+  { title: "Revenue", value: "$45,678", change: "+8% from last month", changeType: "positive" as const, icon: "💰" },
+  { title: "Orders", value: "1,234", change: "-3% from last month", changeType: "negative" as const, icon: "📦" },
+  { title: "Conversion", value: "3.2%", change: "No change", changeType: "neutral" as const, icon: "📊" },
+];
+
+const recentOrders = [
+  { id: "ORD-001", customer: "Alice Johnson", amount: "$120.00", status: "completed", date: "2026-03-04" },
+  { id: "ORD-002", customer: "Bob Smith", amount: "$85.50", status: "pending", date: "2026-03-03" },
+  { id: "ORD-003", customer: "Charlie Brown", amount: "$230.00", status: "completed", date: "2026-03-03" },
+  { id: "ORD-004", customer: "Diana Prince", amount: "$45.00", status: "cancelled", date: "2026-03-02" },
+  { id: "ORD-005", customer: "Eve Davis", amount: "$180.00", status: "pending", date: "2026-03-02" },
+];
+
+const statusColors: Record<string, "green" | "yellow" | "red"> = {
+  completed: "green",
+  pending: "yellow",
+  cancelled: "red",
+};
+
+const columns = [
+  { key: "id" as const, header: "Order ID" },
+  { key: "customer" as const, header: "Customer" },
+  { key: "amount" as const, header: "Amount" },
+  {
+    key: "status" as const,
+    header: "Status",
+    render: (value: unknown) => (
+      <Badge color={statusColors[value as string] || "gray"}>
+        {String(value)}
+      </Badge>
+    ),
+  },
+  { key: "date" as const, header: "Date" },
+];
+
+export default function DashboardPage() {
+  return (
+    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
+      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
+
+      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
+        {stats.map((stat) => (
+          <StatsCard key={stat.title} {...stat} />
+        ))}
+      </div>
+
+      <div className="bg-white rounded-lg shadow-md border border-gray-200">
+        <div className="p-6 border-b border-gray-200">
+          <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
+        </div>
+        <DataTable columns={columns} data={recentOrders} />
+      </div>
+    </div>
+  );
+}
```

</details>

### `src/app/layout.tsx`

<details>
<summary>差分を表示</summary>

```diff
diff --git a/src/app/layout.tsx b/src/app/layout.tsx
index f7fa87e..f0cd7ce 100644
--- a/src/app/layout.tsx
+++ b/src/app/layout.tsx
@@ -1,6 +1,8 @@
 import type { Metadata } from "next";
 import { Geist, Geist_Mono } from "next/font/google";
 import "./globals.css";
+import Header from "@/components/layout/Header";
+import Footer from "@/components/layout/Footer";
 
 const geistSans = Geist({
   variable: "--font-geist-sans",
@@ -13,8 +15,8 @@ const geistMono = Geist_Mono({
 });
 
 export const metadata: Metadata = {
-  title: "Create Next App",
-  description: "Generated by create next app",
+  title: "BatchSample - Claude Code /batch Demo",
+  description: "Sample Next.js project for testing Claude Code /batch command",
 };
 
 export default function RootLayout({
@@ -27,7 +29,9 @@ export default function RootLayout({
       <body
         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
       >
-        {children}
+        <Header />
+        <main className="min-h-screen">{children}</main>
+        <Footer />
       </body>
     </html>
   );
```

</details>

### `src/app/page.tsx`

<details>
<summary>差分を表示</summary>

```diff
diff --git a/src/app/page.tsx b/src/app/page.tsx
index 295f8fd..b30fa0b 100644
--- a/src/app/page.tsx
+++ b/src/app/page.tsx
@@ -1,65 +1,44 @@
-import Image from "next/image";
+import Button from "@/components/ui/Button";
+import Card from "@/components/ui/Card";
+import Badge from "@/components/ui/Badge";
 
 export default function Home() {
   return (
-    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
-      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
-        <Image
-          className="dark:invert"
-          src="/next.svg"
-          alt="Next.js logo"
-          width={100}
-          height={20}
-          priority
-        />
-        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
-          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
-            To get started, edit the page.tsx file.
-          </h1>
-          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
-            Looking for a starting point or more instructions? Head over to{" "}
-            <a
-              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
-              className="font-medium text-zinc-950 dark:text-zinc-50"
-            >
-              Templates
-            </a>{" "}
-            or the{" "}
-            <a
-              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
-              className="font-medium text-zinc-950 dark:text-zinc-50"
-            >
-              Learning
-            </a>{" "}
-            center.
-          </p>
+    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
+      <section className="text-center mb-16">
+        <h1 className="text-4xl font-bold text-gray-900 mb-4">
+          Welcome to BatchSample
+        </h1>
+        <p className="text-xl text-gray-600 mb-8">
+          A sample Next.js project for testing Claude Code /batch command
+        </p>
+        <div className="flex justify-center gap-4">
+          <Button variant="primary" size="lg">Get Started</Button>
+          <Button variant="secondary" size="lg">Learn More</Button>
         </div>
-        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
-          <a
-            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
-            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
-            target="_blank"
-            rel="noopener noreferrer"
-          >
-            <Image
-              className="dark:invert"
-              src="/vercel.svg"
-              alt="Vercel logomark"
-              width={16}
-              height={16}
-            />
-            Deploy Now
-          </a>
-          <a
-            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
-            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
-            target="_blank"
-            rel="noopener noreferrer"
-          >
-            Documentation
-          </a>
-        </div>
-      </main>
+      </section>
+
+      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
+        <Card title="Fast" description="Built with Next.js for optimal performance">
+          <Badge color="green">Performance</Badge>
+        </Card>
+        <Card title="Scalable" description="Designed to grow with your needs">
+          <Badge color="blue">Architecture</Badge>
+        </Card>
+        <Card title="Modern" description="Using the latest web technologies">
+          <Badge color="yellow">Technology</Badge>
+        </Card>
+      </section>
+
+      <section className="bg-gray-50 rounded-lg p-8 text-center">
+        <h2 className="text-2xl font-bold text-gray-900 mb-4">
+          Ready to try /batch?
+        </h2>
+        <p className="text-gray-600 mb-6">
+          This project has multiple pages and components perfect for batch operations.
+        </p>
+        <Button variant="primary">Explore the Code</Button>
+      </section>
     </div>
   );
 }
```

</details>

### `src/app/settings/page.tsx`

<details>
<summary>差分を表示</summary>

```diff
diff --git a/src/app/settings/page.tsx b/src/app/settings/page.tsx
new file mode 100644
index 0000000..ba7129d
--- /dev/null
+++ b/src/app/settings/page.tsx
@@ -0,0 +1,91 @@
+"use client";
+
+import React, { useState } from "react";
+import Input from "@/components/ui/Input";
+import Button from "@/components/ui/Button";
+import Card from "@/components/ui/Card";
+
+export default function SettingsPage() {
+  const [settings, setSettings] = useState({
+    displayName: "John Doe",
+    email: "john@example.com",
+    language: "en",
+    timezone: "Asia/Tokyo",
+    notifications: true,
+    darkMode: false,
+  });
+
+  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
+    setSettings((prev) => ({ ...prev, [field]: e.target.value }));
+  };
+
+  const handleToggle = (field: string) => () => {
+    setSettings((prev) => ({ ...prev, [field]: !prev[field as keyof typeof prev] }));
+  };
+
+  return (
+    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
+      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>
+
+      <div className="space-y-6">
+        <Card title="Profile Settings">
+          <Input label="Display Name" value={settings.displayName} onChange={handleInputChange("displayName")} />
+          <Input label="Email" type="email" value={settings.email} onChange={handleInputChange("email")} />
+        </Card>
+
+        <Card title="Preferences">
+          <div className="space-y-4">
+            <div className="flex items-center justify-between">
+              <div>
+                <p className="font-medium text-gray-900">Email Notifications</p>
+                <p className="text-sm text-gray-500">Receive email notifications for updates</p>
+              </div>
+              <button
+                onClick={handleToggle("notifications")}
+                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
+                  settings.notifications ? "bg-blue-600" : "bg-gray-200"
+                }`}
+              >
+                <span
+                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
+                    settings.notifications ? "translate-x-6" : "translate-x-1"
+                  }`}
+                />
+              </button>
+            </div>
+            <div className="flex items-center justify-between">
+              <div>
+                <p className="font-medium text-gray-900">Dark Mode</p>
+                <p className="text-sm text-gray-500">Use dark theme for the interface</p>
+              </div>
+              <button
+                onClick={handleToggle("darkMode")}
+                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
+                  settings.darkMode ? "bg-blue-600" : "bg-gray-200"
+                }`}
+              >
+                <span
+                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
+                    settings.darkMode ? "translate-x-6" : "translate-x-1"
+                  }`}
+                />
+              </button>
+            </div>
+          </div>
+        </Card>
+
+        <Card title="Danger Zone">
+          <p className="text-gray-600 mb-4">
+            Once you delete your account, there is no going back. Please be certain.
+          </p>
+          <Button variant="danger">Delete Account</Button>
+        </Card>
+
+        <div className="flex justify-end gap-4">
+          <Button variant="secondary">Cancel</Button>
+          <Button variant="primary">Save Changes</Button>
+        </div>
+      </div>
+    </div>
+  );
+}
```

</details>

### `src/components/features/BlogPostCard.tsx`

<details>
<summary>差分を表示</summary>

```diff
diff --git a/src/components/features/BlogPostCard.tsx b/src/components/features/BlogPostCard.tsx
new file mode 100644
index 0000000..358a13d
--- /dev/null
+++ b/src/components/features/BlogPostCard.tsx
@@ -0,0 +1,38 @@
+import React from "react";
+import Badge from "../ui/Badge";
+
+interface BlogPostCardProps {
+  title: string;
+  excerpt: string;
+  author: string;
+  date: string;
+  category: string;
+  readTime: string;
+}
+
+export default function BlogPostCard({
+  title,
+  excerpt,
+  author,
+  date,
+  category,
+  readTime,
+}: BlogPostCardProps) {
+  return (
+    <article className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
+      <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500" />
+      <div className="p-6">
+        <div className="flex items-center gap-2 mb-3">
+          <Badge color="blue">{category}</Badge>
+          <span className="text-sm text-gray-500">{readTime}</span>
+        </div>
+        <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
+        <p className="text-gray-600 mb-4 line-clamp-2">{excerpt}</p>
+        <div className="flex items-center justify-between text-sm text-gray-500">
+          <span>{author}</span>
+          <span>{date}</span>
+        </div>
+      </div>
+    </article>
+  );
+}
```

</details>

### `src/components/features/ContactForm.tsx`

<details>
<summary>差分を表示</summary>

```diff
diff --git a/src/components/features/ContactForm.tsx b/src/components/features/ContactForm.tsx
new file mode 100644
index 0000000..244e877
--- /dev/null
+++ b/src/components/features/ContactForm.tsx
@@ -0,0 +1,46 @@
+"use client";
+
+import React, { useState } from "react";
+import Input from "../ui/Input";
+import Button from "../ui/Button";
+
+export default function ContactForm() {
+  const [formData, setFormData] = useState({
+    name: "",
+    email: "",
+    subject: "",
+    message: "",
+  });
+
+  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
+    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
+  };
+
+  const handleSubmit = (e: React.FormEvent) => {
+    e.preventDefault();
+    console.log("Form submitted:", formData);
+    alert("Message sent!");
+  };
+
+  return (
+    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
+      <Input label="Name" placeholder="Your name" value={formData.name} onChange={handleChange("name")} required />
+      <Input label="Email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleChange("email")} required />
+      <Input label="Subject" placeholder="Subject" value={formData.subject} onChange={handleChange("subject")} required />
+      <div className="mb-4">
+        <label className="block text-sm font-medium text-gray-700 mb-1">
+          Message <span className="text-red-500 ml-1">*</span>
+        </label>
+        <textarea
+          placeholder="Your message..."
+          value={formData.message}
+          onChange={handleChange("message")}
+          rows={5}
+          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
+          required
+        />
+      </div>
+      <Button variant="primary" size="lg">Send Message</Button>
+    </form>
+  );
+}
```

</details>

### `src/components/features/DataTable.tsx`

<details>
<summary>差分を表示</summary>

```diff
diff --git a/src/components/features/DataTable.tsx b/src/components/features/DataTable.tsx
new file mode 100644
index 0000000..81b25a6
--- /dev/null
+++ b/src/components/features/DataTable.tsx
@@ -0,0 +1,55 @@
+import React from "react";
+
+interface Column<T> {
+  key: keyof T;
+  header: string;
+  render?: (value: T[keyof T], row: T) => React.ReactNode;
+}
+
+interface DataTableProps<T> {
+  columns: Column<T>[];
+  data: T[];
+  emptyMessage?: string;
+}
+
+export default function DataTable<T extends Record<string, unknown>>({
+  columns,
+  data,
+  emptyMessage = "No data available",
+}: DataTableProps<T>) {
+  if (data.length === 0) {
+    return (
+      <div className="text-center py-8 text-gray-500">{emptyMessage}</div>
+    );
+  }
+
+  return (
+    <div className="overflow-x-auto">
+      <table className="min-w-full divide-y divide-gray-200">
+        <thead className="bg-gray-50">
+          <tr>
+            {columns.map((col) => (
+              <th
+                key={String(col.key)}
+                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
+              >
+                {col.header}
+              </th>
+            ))}
+          </tr>
+        </thead>
+        <tbody className="bg-white divide-y divide-gray-200">
+          {data.map((row, idx) => (
+            <tr key={idx} className="hover:bg-gray-50">
+              {columns.map((col) => (
+                <td key={String(col.key)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
+                  {col.render ? col.render(row[col.key], row) : String(row[col.key])}
+                </td>
+              ))}
+            </tr>
+          ))}
+        </tbody>
+      </table>
+    </div>
+  );
+}
```

</details>

### `src/components/features/StatsCard.tsx`

<details>
<summary>差分を表示</summary>

```diff
diff --git a/src/components/features/StatsCard.tsx b/src/components/features/StatsCard.tsx
new file mode 100644
index 0000000..8b7b4c9
--- /dev/null
+++ b/src/components/features/StatsCard.tsx
@@ -0,0 +1,34 @@
+import React from "react";
+
+interface StatsCardProps {
+  title: string;
+  value: string | number;
+  change?: string;
+  changeType?: "positive" | "negative" | "neutral";
+  icon: string;
+}
+
+export default function StatsCard({ title, value, change, changeType = "neutral", icon }: StatsCardProps) {
+  const changeColors = {
+    positive: "text-green-600",
+    negative: "text-red-600",
+    neutral: "text-gray-600",
+  };
+
+  return (
+    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
+      <div className="flex items-center justify-between">
+        <div>
+          <p className="text-sm font-medium text-gray-600">{title}</p>
+          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
+          {change && (
+            <p className={`text-sm mt-1 ${changeColors[changeType]}`}>
+              {change}
+            </p>
+          )}
+        </div>
+        <div className="text-3xl">{icon}</div>
+      </div>
+    </div>
+  );
+}
```

</details>

### `src/components/features/UserProfile.tsx`

<details>
<summary>差分を表示</summary>

```diff
diff --git a/src/components/features/UserProfile.tsx b/src/components/features/UserProfile.tsx
new file mode 100644
index 0000000..371e498
--- /dev/null
+++ b/src/components/features/UserProfile.tsx
@@ -0,0 +1,34 @@
+import React from "react";
+import Card from "../ui/Card";
+import Badge from "../ui/Badge";
+import Button from "../ui/Button";
+
+interface UserProfileProps {
+  name: string;
+  email: string;
+  role: string;
+  avatarUrl?: string;
+}
+
+export default function UserProfile({ name, email, role, avatarUrl }: UserProfileProps) {
+  return (
+    <Card title={name} description={email}>
+      <div className="flex items-center gap-4 mb-4">
+        <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-xl">
+          {avatarUrl ? (
+            <img src={avatarUrl} alt={name} className="w-full h-full rounded-full" />
+          ) : (
+            name.charAt(0).toUpperCase()
+          )}
+        </div>
+        <div>
+          <Badge color="blue">{role}</Badge>
+        </div>
+      </div>
+      <div className="flex gap-2">
+        <Button variant="primary" size="sm">Edit Profile</Button>
+        <Button variant="secondary" size="sm">Message</Button>
+      </div>
+    </Card>
+  );
+}
```

</details>

### `src/components/layout/Footer.tsx`

<details>
<summary>差分を表示</summary>

```diff
diff --git a/src/components/layout/Footer.tsx b/src/components/layout/Footer.tsx
new file mode 100644
index 0000000..3703e59
--- /dev/null
+++ b/src/components/layout/Footer.tsx
@@ -0,0 +1,35 @@
+import React from "react";
+
+export default function Footer() {
+  return (
+    <footer className="bg-gray-800 text-white">
+      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
+        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
+          <div>
+            <h3 className="text-lg font-semibold mb-4">BatchSample</h3>
+            <p className="text-gray-400">
+              A sample Next.js project for testing Claude Code /batch command.
+            </p>
+          </div>
+          <div>
+            <h3 className="text-lg font-semibold mb-4">Links</h3>
+            <ul className="space-y-2 text-gray-400">
+              <li><a href="/about" className="hover:text-white">About</a></li>
+              <li><a href="/blog" className="hover:text-white">Blog</a></li>
+              <li><a href="/contact" className="hover:text-white">Contact</a></li>
+            </ul>
+          </div>
+          <div>
+            <h3 className="text-lg font-semibold mb-4">Contact</h3>
+            <p className="text-gray-400">
+              example@batch-sample.dev
+            </p>
+          </div>
+        </div>
+        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
+          <p>&copy; 2026 BatchSample. All rights reserved.</p>
+        </div>
+      </div>
+    </footer>
+  );
+}
```

</details>

### `src/components/layout/Header.tsx`

<details>
<summary>差分を表示</summary>

```diff
diff --git a/src/components/layout/Header.tsx b/src/components/layout/Header.tsx
new file mode 100644
index 0000000..057686d
--- /dev/null
+++ b/src/components/layout/Header.tsx
@@ -0,0 +1,38 @@
+import React from "react";
+import Link from "next/link";
+
+export default function Header() {
+  const navItems = [
+    { href: "/", label: "Home" },
+    { href: "/about", label: "About" },
+    { href: "/blog", label: "Blog" },
+    { href: "/dashboard", label: "Dashboard" },
+    { href: "/contact", label: "Contact" },
+    { href: "/settings", label: "Settings" },
+  ];
+
+  return (
+    <header className="bg-white shadow-sm border-b border-gray-200">
+      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
+        <div className="flex justify-between h-16 items-center">
+          <div className="flex-shrink-0">
+            <Link href="/" className="text-xl font-bold text-blue-600">
+              BatchSample
+            </Link>
+          </div>
+          <nav className="hidden md:flex space-x-8">
+            {navItems.map((item) => (
+              <Link
+                key={item.href}
+                href={item.href}
+                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
+              >
+                {item.label}
+              </Link>
+            ))}
+          </nav>
+        </div>
+      </div>
+    </header>
+  );
+}
```

</details>

### `src/components/layout/Sidebar.tsx`

<details>
<summary>差分を表示</summary>

```diff
diff --git a/src/components/layout/Sidebar.tsx b/src/components/layout/Sidebar.tsx
new file mode 100644
index 0000000..b9f2981
--- /dev/null
+++ b/src/components/layout/Sidebar.tsx
@@ -0,0 +1,36 @@
+import React from "react";
+import Link from "next/link";
+
+interface SidebarItem {
+  href: string;
+  label: string;
+  icon: string;
+}
+
+interface SidebarProps {
+  items: SidebarItem[];
+  activeHref?: string;
+}
+
+export default function Sidebar({ items, activeHref }: SidebarProps) {
+  return (
+    <aside className="w-64 bg-gray-50 border-r border-gray-200 min-h-screen">
+      <nav className="p-4 space-y-1">
+        {items.map((item) => (
+          <Link
+            key={item.href}
+            href={item.href}
+            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
+              activeHref === item.href
+                ? "bg-blue-100 text-blue-700"
+                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
+            }`}
+          >
+            <span className="mr-3">{item.icon}</span>
+            {item.label}
+          </Link>
+        ))}
+      </nav>
+    </aside>
+  );
+}
```

</details>

### `src/components/ui/Badge.tsx`

<details>
<summary>差分を表示</summary>

```diff
diff --git a/src/components/ui/Badge.tsx b/src/components/ui/Badge.tsx
new file mode 100644
index 0000000..df8a4bd
--- /dev/null
+++ b/src/components/ui/Badge.tsx
@@ -0,0 +1,22 @@
+import React from "react";
+
+interface BadgeProps {
+  children: React.ReactNode;
+  color?: "blue" | "green" | "red" | "yellow" | "gray";
+}
+
+export default function Badge({ children, color = "blue" }: BadgeProps) {
+  const colorStyles = {
+    blue: "bg-blue-100 text-blue-800",
+    green: "bg-green-100 text-green-800",
+    red: "bg-red-100 text-red-800",
+    yellow: "bg-yellow-100 text-yellow-800",
+    gray: "bg-gray-100 text-gray-800",
+  };
+
+  return (
+    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorStyles[color]}`}>
+      {children}
+    </span>
+  );
+}
```

</details>

### `src/components/ui/Button.tsx`

<details>
<summary>差分を表示</summary>

```diff
diff --git a/src/components/ui/Button.tsx b/src/components/ui/Button.tsx
new file mode 100644
index 0000000..725ae97
--- /dev/null
+++ b/src/components/ui/Button.tsx
@@ -0,0 +1,41 @@
+import React from "react";
+
+interface ButtonProps {
+  children: React.ReactNode;
+  variant?: "primary" | "secondary" | "danger";
+  size?: "sm" | "md" | "lg";
+  onClick?: () => void;
+  disabled?: boolean;
+}
+
+export default function Button({
+  children,
+  variant = "primary",
+  size = "md",
+  onClick,
+  disabled = false,
+}: ButtonProps) {
+  const baseStyles = "rounded font-medium transition-colors focus:outline-none";
+
+  const variantStyles = {
+    primary: "bg-blue-600 text-white hover:bg-blue-700",
+    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
+    danger: "bg-red-600 text-white hover:bg-red-700",
+  };
+
+  const sizeStyles = {
+    sm: "px-3 py-1 text-sm",
+    md: "px-4 py-2 text-base",
+    lg: "px-6 py-3 text-lg",
+  };
+
+  return (
+    <button
+      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
+      onClick={onClick}
+      disabled={disabled}
+    >
+      {children}
+    </button>
+  );
+}
```

</details>

### `src/components/ui/Card.tsx`

<details>
<summary>差分を表示</summary>

```diff
diff --git a/src/components/ui/Card.tsx b/src/components/ui/Card.tsx
new file mode 100644
index 0000000..3bbf6c3
--- /dev/null
+++ b/src/components/ui/Card.tsx
@@ -0,0 +1,25 @@
+import React from "react";
+
+interface CardProps {
+  title: string;
+  description?: string;
+  children?: React.ReactNode;
+  footer?: React.ReactNode;
+}
+
+export default function Card({ title, description, children, footer }: CardProps) {
+  return (
+    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
+      <div className="p-6">
+        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
+        {description && <p className="text-gray-600 mb-4">{description}</p>}
+        {children}
+      </div>
+      {footer && (
+        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
+          {footer}
+        </div>
+      )}
+    </div>
+  );
+}
```

</details>

### `src/components/ui/Input.tsx`

<details>
<summary>差分を表示</summary>

```diff
diff --git a/src/components/ui/Input.tsx b/src/components/ui/Input.tsx
new file mode 100644
index 0000000..2a6930b
--- /dev/null
+++ b/src/components/ui/Input.tsx
@@ -0,0 +1,42 @@
+import React from "react";
+
+interface InputProps {
+  label: string;
+  type?: string;
+  placeholder?: string;
+  value?: string;
+  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
+  error?: string;
+  required?: boolean;
+}
+
+export default function Input({
+  label,
+  type = "text",
+  placeholder,
+  value,
+  onChange,
+  error,
+  required = false,
+}: InputProps) {
+  return (
+    <div className="mb-4">
+      <label className="block text-sm font-medium text-gray-700 mb-1">
+        {label}
+        {required && <span className="text-red-500 ml-1">*</span>}
+      </label>
+      <input
+        type={type}
+        placeholder={placeholder}
+        value={value}
+        onChange={onChange}
+        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
+          error
+            ? "border-red-500 focus:ring-red-500"
+            : "border-gray-300 focus:ring-blue-500"
+        }`}
+      />
+      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
+    </div>
+  );
+}
```

</details>

### `src/components/ui/Modal.tsx`

<details>
<summary>差分を表示</summary>

```diff
diff --git a/src/components/ui/Modal.tsx b/src/components/ui/Modal.tsx
new file mode 100644
index 0000000..9beec07
--- /dev/null
+++ b/src/components/ui/Modal.tsx
@@ -0,0 +1,32 @@
+"use client";
+
+import React from "react";
+
+interface ModalProps {
+  isOpen: boolean;
+  onClose: () => void;
+  title: string;
+  children: React.ReactNode;
+}
+
+export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
+  if (!isOpen) return null;
+
+  return (
+    <div className="fixed inset-0 z-50 flex items-center justify-center">
+      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
+      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
+        <div className="flex items-center justify-between p-4 border-b">
+          <h2 className="text-lg font-semibold">{title}</h2>
+          <button
+            onClick={onClose}
+            className="text-gray-400 hover:text-gray-600"
+          >
+            ✕
+          </button>
+        </div>
+        <div className="p-4">{children}</div>
+      </div>
+    </div>
+  );
+}
```

</details>

## コミットログ

```
bfe2429 feat: add pages, components, and CLAUDE.md for /batch testing
```
