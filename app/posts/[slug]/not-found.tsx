import Link from 'next/link'

export default function PostNotFound() {
  return (
    <section className="flex flex-col">
      <h1>PostNotFound</h1>
      <Link href={'/posts'}>Posts</Link>
    </section>
  )
}
