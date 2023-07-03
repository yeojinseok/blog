import Image from 'next/image'

export default function Profile() {
  return (
    <div className="h-70 flex flex-col items-center justify-center gap-5">
      <Image
        className="rounded-full"
        width={150}
        height={150}
        alt="profile image"
        src={'/profile.JPG'}
      />
      <div className=" font-medium  text-lg">안녕~ 내이름은 여진석</div>
    </div>
  )
}
