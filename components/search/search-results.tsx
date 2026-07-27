'use client'

import {
  useHits,
  useInstantSearch,
  useSearchBox,
} from 'react-instantsearch-core'

import SearchItem from './search-item'

export function SearchResults() {
  const { items } = useHits()

  const { status } = useInstantSearch()
  const { query } = useSearchBox()
  if (!query.trim()) {
    return (
      <div className="py-8 text-center text-default-500">
        输入关键词开始搜索
      </div>
    )
  }

  if (status === 'loading') {
    return <div className="text-center py-8 opacity-60">搜索中...</div>
  }

  if (items.length === 0) {
    return <div className="text-center py-8 opacity-60">没有找到相关内容</div>
  }

  return (
    <div className="flex flex-col gap-2">
      {items.map(item => (
        <SearchItem key={item.objectID} hit={item} />
      ))}
    </div>
  )
}
