if [ "$VERCEL_GIT_COMMIT_REF" != "main" ]; then echo "Skipping deployment for non-main branch: $VERCEL_GIT_COMMIT_REF"; exit 0; fi
