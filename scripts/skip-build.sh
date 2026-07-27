if git diff --name-only $VERCEL_GIT_PREVIOUS_SHA $VERCEL_GIT_COMMIT_SHA | grep -qv '^content/'; then
  exit 1
else
  exit 0
fi