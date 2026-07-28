import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient()

export const signInWithGithub = async () => {
  const data = await authClient.signIn.social({
    provider: 'github',
  })
  return data
}
