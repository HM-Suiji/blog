import Link from 'next/link'

export default function PostNotFound() {
  return (
    <div className="flex flex-col">
      <h1>PostNotFound</h1>
      <Link href={'/posts'}>Posts</Link>
    </div>
  )
}
