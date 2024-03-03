import { clsx } from 'clsx'
import { HTMLAttributes } from 'react'

export function HStack(props: {
  children?: React.ReactNode
  className?: HTMLAttributes<HTMLDivElement>['className']
}) {
  return (
    <div className={clsx('flex-row flex', props.className)}>
      {props.children}
    </div>
  )
}

export function VStack(props: {
  children?: React.ReactNode
  className?: HTMLAttributes<HTMLDivElement>['className']
}) {
  return (
    <div className={clsx('flex-col flex', props.className)}>
      {props.children}
    </div>
  )
}
