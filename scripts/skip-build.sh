if [ "$VERCEL_GIT_COMMIT_REF" != "main" ]; then
  exit 1
fi
