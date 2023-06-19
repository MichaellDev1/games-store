import { useEffect, useRef, useState } from 'react'

export default function useNearScreen({ rootMargin = '200px', externalRef, isContinuous = false }: any = {}) {
  const [isNear, setNear] = useState(false)
  const refEle: any = useRef()

  useEffect(() => {
    let observer: any;
    const element = externalRef ? externalRef.current : refEle.current

    const visibilityFoo = (entries: any) => {
      const el = entries[0]
      if (el.isIntersecting) {
        setNear(true)
      } else {
        isContinuous && setNear(false)
      }
    }

    Promise.resolve(
      typeof IntersectionObserver == 'undefined'
        ? IntersectionObserver
        : import('intersection-observer')
    ).then(() => {
      observer = new IntersectionObserver(visibilityFoo, {
        rootMargin
      })
      if (element) observer.observe(element)
    })

    return () => observer && observer.disconnect()
  }, [refEle, externalRef])

  return { refEle, isNear }
}
