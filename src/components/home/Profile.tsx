import Image from 'next/image'

export default function Profile() {
  return (
    <div className="flex flex-col justify-center ">
      <Image
        className="rounded-full"
        width={150}
        height={150}
        alt="profile image"
        src={'/profile.JPG'}
      />
      <div className="text-lg font-medium ">안녕~ 내이름은 여진석</div>
    </div>
  )
}
