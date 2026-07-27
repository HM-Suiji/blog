CHANGED=$(git diff --name-only $VERCEL_GIT_PREVIOUS_SHA $VERCEL_GIT_COMMIT_SHA)

if echo "$CHANGED" | grep -qvE '^(\.github/|\.vscode/|\.agents/|skills/)'; then
  exit 1
else
  exit 0
fi