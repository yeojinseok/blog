export default function Divider({ height }: { height?: number }) {
  return (
    <div
      className="w-full bg-grey-100 opacity-80"
      style={{ height: height ?? 2 }}
    />
  )
}
