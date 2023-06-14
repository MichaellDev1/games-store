import Image from "next/image"
import Link from "next/link"

interface Props {
  id: string
  background_image: string
  name: string
  width: string
  height?: string
}

export default function ChildrenCarrousel({ id, background_image, name, width = '180px', height = '100%' }: Props) {
  return <Link
    href={`/detail/${id}`}
    className={`flex-shrink-0 overflow-hidden outline-none relative rounded-[5px]`} style={{ width: width, height: height }}>
    <Image src={background_image ? background_image : 'https://media.rawg.io/media/screenshots/9b7/9b7c58a798097736955185b0d8f7843f.jpg'} alt={`image background game ${name}`} width={900} height={900} className='w-full h-full object-cover' />
    <div className="px-2 absolute bottom-1 flex">
      <span className="left-0 bg-[#00000049] backdrop-blur-md py-1 px-3 rounded-lg text-xs">
        {name}
      </span>
    </div>
  </Link>
}
