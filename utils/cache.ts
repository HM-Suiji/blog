//
// 1. 定义 selector 结构（支持嵌套）
//

import { cacheConfig } from '@/config/cacheConfig'

type CacheSelector = string | ((...slugs: string[]) => string)
export interface CacheTree {
  [key: string]: CacheSelector | CacheTree
}

//
// 2. getCacheTag('path.to.xxx')
//   - 自动推断参数
//   - 完全类型安全
//

type PathJoin<A extends string, B extends string> = `${A}.${B}`

type Paths<T> = {
  [K in keyof T & string]: T[K] extends (...args: any[]) => any
    ? K
    : T[K] extends object
      ? K | PathJoin<K, Paths<T[K]>>
      : K
}[keyof T & string]

type SelectorAtPath<T, P extends string> = P extends keyof T
  ? T[P]
  : P extends `${infer K}.${infer Rest}`
    ? K extends keyof T
      ? SelectorAtPath<T[K], Rest>
      : never
    : never

type ArgsForSelector<S> = S extends (...args: infer A) => any ? A : []

function getCacheTag<P extends Paths<typeof cacheConfig>>(
  path: P,
  ...args: ArgsForSelector<SelectorAtPath<typeof cacheConfig, P>>
): string {
  const parts = path.split('.')
  let curr: any = cacheConfig

  for (const p of parts) {
    curr = curr[p]
    if (!curr) throw new TypeError(`Unknown cache tag: ${path}`)
  }

  return typeof curr === 'string' ? curr : curr(...args)
}

//
// 3. cacheTag helper
//   - 静态 string → 直接是 string
//   - 动态 function → 生成函数
//   - 嵌套 object → 生成子对象
//

type HelperFromTree<T> = {
  [K in keyof T & string]: T[K] extends string
    ? T[K] // 👉 静态值：直接是 string
    : T[K] extends (...args: infer A) => string
      ? (...args: A) => string // 函数：保持函数
      : HelperFromTree<T[K]> // 对象：递归
}

function createHelper<T extends CacheTree>(
  tree: T,
  path = ''
): HelperFromTree<T> {
  const obj: any = {}

  for (const key in tree) {
    const val = tree[key]
    const newPath = path ? `${path}.${key}` : key

    if (typeof val === 'string') {
      // static string → direct value
      obj[key] = getCacheTag(newPath as any)
    } else if (typeof val === 'function') {
      // dynamic function → preserve call signature
      obj[key] = (...args: any[]) => getCacheTag(newPath as any, ...args)
    } else {
      // object → recurse
      obj[key] = createHelper(val, newPath)
    }
  }

  return obj
}

export const cacheSelector = createHelper(cacheConfig)
