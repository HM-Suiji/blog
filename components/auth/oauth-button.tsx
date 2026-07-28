'use client'

import { FaGithub } from 'react-icons/fa'

import { Button } from '@heroui/react'

import { signInWithGithub } from '@/utils/auth-client'

export const GithubOAuth: React.FC = () => {
  return (
    <Button onPress={signInWithGithub}>
      <FaGithub />
      使用 Github 登录
    </Button>
  )
}
