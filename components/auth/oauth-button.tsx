'use client'

import { LogOut } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'

import { Button } from '@heroui/react'

import { signInWithGithub, signout } from '@/utils/auth-client'

export const GithubOAuth: React.FC = () => {
  return (
    <Button onPress={signInWithGithub} variant="secondary">
      <FaGithub />
      使用 Github 登录
    </Button>
  )
}

export const SignoutButton: React.FC = () => {
  return (
    <Button onPress={signout} variant="outline">
      <LogOut />
      退出登录
    </Button>
  )
}
