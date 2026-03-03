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
#
# Workflow:
#   1. /batch 実行前に現在の HEAD を控える:  git rev-parse HEAD
#   2. /batch を実行（複数ブランチ・PR が作成される）
#   3. 各ブランチに対してこのスクリプトを実行:
#      ./scripts/generate-diff-article.sh main feat/batch-unit-1 "Unit 1: コンポーネントテスト"
#
#   または全 PR をまとめて生成:
#      for branch in $(git branch -r --list 'origin/batch/*'); do
#        name=$(basename "$branch")
#        ./scripts/generate-diff-article.sh main "$branch" "$name"
#      done

set -euo pipefail

BASE_REF="${1:?Usage: $0 <base-ref> [head-ref] [title]}"
HEAD_REF="${2:-HEAD}"
TITLE="${3:-batch変更レポート}"
DATE=$(date +%Y-%m-%d)
OUTFILE="docs/${DATE}_${TITLE// /-}.md"

# 差分があるか事前チェック
FILE_COUNT=$(git diff --name-only "${BASE_REF}..${HEAD_REF}" 2>/dev/null | wc -l | tr -d ' ')

if [ "$FILE_COUNT" -eq 0 ]; then
  echo "Error: ${BASE_REF}..${HEAD_REF} の間に差分がありません。"
  echo ""
  echo "Hint: /batch 実行後に、変更が入ったブランチを指定してください。"
  echo "  例: ./scripts/generate-diff-article.sh main feat/add-tests \"テスト追加\""
  echo ""
  echo "  現在のコミット履歴:"
  git log --oneline -5
  exit 1
fi

mkdir -p docs
echo "Generating diff article: ${OUTFILE} (${FILE_COUNT} files changed)"

# --- ヘッダー ---
cat > "$OUTFILE" << HEADER
# ${TITLE}

- **日時**: ${DATE}
- **ベース**: \`${BASE_REF}\`
- **ヘッド**: \`${HEAD_REF}\`
- **変更ファイル数**: ${FILE_COUNT}

---

## 変更サマリー

HEADER

# --stat でファイルごとの変更量
echo '```' >> "$OUTFILE"
git diff --stat "${BASE_REF}..${HEAD_REF}" >> "$OUTFILE"
echo '```' >> "$OUTFILE"
echo "" >> "$OUTFILE"

# --- ファイル別の変更内容 ---
echo "## ファイル別の変更内容" >> "$OUTFILE"
echo "" >> "$OUTFILE"

git diff --name-only "${BASE_REF}..${HEAD_REF}" | while read -r file; do
  # ファイルの拡張子から言語を推定
  ext="${file##*.}"
  case "$ext" in
    ts|tsx) lang="tsx" ;;
    js|jsx) lang="jsx" ;;
    css)    lang="css" ;;
    json)   lang="json" ;;
    md)     lang="markdown" ;;
    sh)     lang="bash" ;;
    *)      lang="diff" ;;
  esac

  echo "### \`${file}\`" >> "$OUTFILE"
  echo "" >> "$OUTFILE"
  echo '<details>' >> "$OUTFILE"
  echo "<summary>差分を表示 ($(git diff --stat "${BASE_REF}..${HEAD_REF}" -- "$file" | tail -1 | sed 's/^ *//'))</summary>" >> "$OUTFILE"
  echo "" >> "$OUTFILE"
  echo "\`\`\`diff" >> "$OUTFILE"
  git diff "${BASE_REF}..${HEAD_REF}" -- "$file" >> "$OUTFILE"
  echo '```' >> "$OUTFILE"
  echo "" >> "$OUTFILE"
  echo '</details>' >> "$OUTFILE"
  echo "" >> "$OUTFILE"
done

# --- コミットログ ---
echo "## コミットログ" >> "$OUTFILE"
echo "" >> "$OUTFILE"

COMMIT_COUNT=$(git log --oneline "${BASE_REF}..${HEAD_REF}" | wc -l | tr -d ' ')
echo "**${COMMIT_COUNT} commits:**" >> "$OUTFILE"
echo "" >> "$OUTFILE"
echo '```' >> "$OUTFILE"
git log --oneline "${BASE_REF}..${HEAD_REF}" >> "$OUTFILE"
echo '```' >> "$OUTFILE"

echo ""
echo "Done: ${OUTFILE}"
echo "  ${FILE_COUNT} files, ${COMMIT_COUNT} commits"
