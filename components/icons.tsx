import Image from 'next/image'

export const BrandLogo: React.FC = () => {
  return (
    <div className="flex flex-row items-center gap-2">
      <Image width={32} height={32} src="/images/avatar.avif" alt="穗积" />
      穗积
    </div>
  )
}
