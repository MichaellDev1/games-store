import Image from "next/image"
import Link from "next/link"

interface Props {
    id: string
    background_image: string
    name: string
    width: string
}


export default function ChildrenCarrousel({ id, background_image, name, width }: Props) {
    return <Link
        href={`/detail/${id}`}
        className={`h-[100%] flex-shrink-0 overflow-hidden w-[${width}] outline-none relative rounded-[5px]`}>
        <Image src={background_image ? background_image : 'https://media.rawg.io/media/screenshots/9b7/9b7c58a798097736955185b0d8f7843f.jpg'} alt={`image background game ${name}`} width={900} height={900} className='w-full h-full object-cover' />
    </Link>
}
