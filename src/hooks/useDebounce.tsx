'use client'
import { useEffect, useState } from 'react'

interface Props {
  value: string
  delay: number
}

export default function useDebounce({ value, delay }: Props) {
  const [debounceValue, setDebounceValue] = useState<string>('')

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => clearTimeout(timeoutId)
  }, [value])

  return debounceValue
}
