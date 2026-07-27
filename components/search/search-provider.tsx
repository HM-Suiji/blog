'use client'

import { InstantSearch } from 'react-instantsearch-core'

import { searchClient } from '@/utils/algolia'

export function SearchProvider({ children }: { children: React.ReactNode }) {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!}
    >
      {children}
    </InstantSearch>
  )
}
