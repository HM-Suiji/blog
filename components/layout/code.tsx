import {
  transformerNotationHighlight,
  transformerNotationDiff,
} from '@shikijs/transformers'
import { FileTerminal, FileCode } from 'lucide-react'
import { IconType } from 'react-icons'
import { BsFiletypeJava } from 'react-icons/bs'
import { FaRust, FaGolang } from 'react-icons/fa6'
import {
  PiFileJsLight,
  PiFileJsx,
  PiFileTsLight,
  PiFileTsx,
  PiFileCpp,
  PiFileC,
  PiFileSqlLight,
} from 'react-icons/pi'
import { TbBrandKotlin } from 'react-icons/tb'
import { BundledLanguage, BundledTheme, codeToHtml } from 'shiki'

import { CopyToClipboard } from './code-to-clipboard'

const IconMap: Partial<Record<BundledLanguage, IconType>> = {
  javascript: PiFileJsLight,
  jsx: PiFileJsx,
  typescript: PiFileTsLight,
  tsx: PiFileTsx,
  java: BsFiletypeJava,
  rust: FaRust,
  kotlin: TbBrandKotlin,
  cpp: PiFileCpp,
  c: PiFileC,
  go: FaGolang,
  sql: PiFileSqlLight,
  bash: FileTerminal,
  shell: FileTerminal,
  cmd: FileTerminal,
}

export const Code: React.FC<{
  code: string
  lang?: BundledLanguage
  theme?: BundledTheme
  filename?: string
}> = async ({ code, lang = 'typescript', theme = 'ayu-dark', filename }) => {
  const html = await codeToHtml(code, {
    lang,
    theme,
    transformers: [transformerNotationHighlight(), transformerNotationDiff()],
  })

  const Icon = IconMap[lang] || FileCode

  return (
    <div className="group pr-0! [&>pre]:rounded-none">
      <div className="overflow-hidden rounded-2xl offset-border ring-offset-1">
        {filename && (
          <div className="flex items-center justify-between bg-linear-to-r from-neutral-900 to-neutral-800 py-2 px-4 text-sm text-content4-foreground">
            <span>{filename}</span>
            <Icon size={24} />
          </div>
        )}
        <div className="relative">
          <div
            dangerouslySetInnerHTML={{ __html: html }}
            className="h-full border-neutral-700 text-sm [&>pre]:overflow-x-auto [&>pre]:bg-neutral-900! [&>pre]:py-3 [&>pre]:pl-4 [&>pre]:pr-5 [&>pre]:leading-snug [&_code]:block [&_code]:w-fit [&_code]:min-w-full"
          />

          <CopyToClipboard
            className="absolute z-10 top-2 right-4"
            code={code}
          />
        </div>
      </div>
    </div>
  )
}
