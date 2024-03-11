import { useBoolean } from 'usehooks-ts'

export default function useInputFocusHandler(props?: {
  onFocus?: (e: React.FocusEvent<HTMLInputElement, Element>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void
}) {
  const { value: isFocus, setTrue: focus, setFalse: blur } = useBoolean(false)

  function onFocus(e: React.FocusEvent<HTMLInputElement, Element>) {
    focus()
    props?.onFocus?.(e)
    return
  }

  function onBlur(e: React.FocusEvent<HTMLInputElement, Element>) {
    blur()
    props?.onBlur?.(e)
    return
  }

  return { isFocus, event: { onFocus, onBlur } }
}
