if [ "$VERCEL_GIT_COMMIT_REF" != "prod" ]; then echo "Skipping deployment for non-prod branch: $VERCEL_GIT_COMMIT_REF"; exit 0; fi
