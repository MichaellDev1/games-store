import { useState } from 'react'

export default function useLoading() {
  const [showMenu, setShowMenu] = useState(false)
  const [loading, setLoading] = useState(false)

  return { showMenu, setShowMenu, setLoading, loading }
}
