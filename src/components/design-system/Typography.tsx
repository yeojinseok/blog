import clsx from 'clsx'
import font from '../../../tailwind-plugins/font'
import { HTMLAttributes } from 'react'

export default function Typography({
  children,
  className,
  variants = '.title_screen',
}: {
  children?: React.ReactNode
  className?: HTMLAttributes<HTMLSpanElement>['className']
  variants?: keyof typeof font
}) {
  return (
    <span className={clsx(className, variants.replace('.', ''))}>
      {children}
    </span>
  )
}
