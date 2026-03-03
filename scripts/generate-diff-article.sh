#!/bin/bash
# generate-diff-article.sh
# /batch 実行前後の git 差分を記事形式の Markdown にまとめるスクリプト
#
# Usage:
#   ./scripts/generate-diff-article.sh <base-ref> [head-ref] [title]
#
# Examples:
#   ./scripts/generate-diff-article.sh main                          # main..HEAD の差分
#   ./scripts/generate-diff-article.sh abc1234 def5678 "i18n移行"    # 特定コミット間

set -euo pipefail

BASE_REF="${1:?Usage: $0 <base-ref> [head-ref] [title]}"
HEAD_REF="${2:-HEAD}"
TITLE="${3:-batch変更レポート}"
DATE=$(date +%Y-%m-%d)
OUTFILE="docs/${DATE}_${TITLE// /-}.md"

echo "Generating diff article: ${OUTFILE}"

cat > "$OUTFILE" << HEADER
# ${TITLE}

- **日時**: ${DATE}
- **ベース**: \`${BASE_REF}\`
- **ヘッド**: \`${HEAD_REF}\`
- **変更ファイル数**: $(git diff --name-only "${BASE_REF}..${HEAD_REF}" | wc -l | tr -d ' ')

---

## 変更サマリー

HEADER

# --stat でファイルごとの変更量
echo '```' >> "$OUTFILE"
git diff --stat "${BASE_REF}..${HEAD_REF}" >> "$OUTFILE"
echo '```' >> "$OUTFILE"
echo "" >> "$OUTFILE"

# 変更ファイルごとにセクションを生成
echo "## ファイル別の変更内容" >> "$OUTFILE"
echo "" >> "$OUTFILE"

git diff --name-only "${BASE_REF}..${HEAD_REF}" | while read -r file; do
  echo "### \`${file}\`" >> "$OUTFILE"
  echo "" >> "$OUTFILE"
  echo '<details>' >> "$OUTFILE"
  echo "<summary>差分を表示</summary>" >> "$OUTFILE"
  echo "" >> "$OUTFILE"
  echo '```diff' >> "$OUTFILE"
  git diff "${BASE_REF}..${HEAD_REF}" -- "$file" >> "$OUTFILE"
  echo '```' >> "$OUTFILE"
  echo "" >> "$OUTFILE"
  echo '</details>' >> "$OUTFILE"
  echo "" >> "$OUTFILE"
done

# コミットログ
echo "## コミットログ" >> "$OUTFILE"
echo "" >> "$OUTFILE"
echo '```' >> "$OUTFILE"
git log --oneline "${BASE_REF}..${HEAD_REF}" >> "$OUTFILE"
echo '```' >> "$OUTFILE"

echo "Done: ${OUTFILE}"
