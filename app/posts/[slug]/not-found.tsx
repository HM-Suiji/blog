import Link from 'next/link'

export default function PostNotFound() {
  return (
    <div className="flex flex-col">
      <h1>未找到当前这条博客，请检查路径是否正确</h1>
      <Link href={'/posts'}>博客列表</Link>
    </div>
  )
}
