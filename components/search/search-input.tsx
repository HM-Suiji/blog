'use client'

import { useSearchBox } from 'react-instantsearch-core'

import { Input } from '@heroui/react'

export function SearchInput() {
  const { query, refine } = useSearchBox()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    refine(e.target.value)
  }

  return (
    <Input
      autoFocus
      className="w-full"
      placeholder="搜索文章..."
      value={query}
      onChange={handleChange}
    />
  )
}
