'use client'
import { ReactNode, createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext({})

export function ContextAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const dataUser = {
      name: "Rodrigo",
      surname: "Rodolfo",
      image: 'https://www.getillustrations.com/photos/pack/3d-avatar-male_lg.png',
      email: 'rodrigorodolfo@gmail.com'
    }
    const localUser = JSON.parse(window.localStorage.getItem('user'))

    if (localUser) {
      setUser(localUser)
    } else {
      window.localStorage.setItem('user', JSON.stringify(dataUser))
      setUser(dataUser)
    }
  }, [])

  return <AuthContext.Provider value={{ user, setUser }}>
    {children}
  </AuthContext.Provider>
}

export const useContextAuth = () => {
  const data = useContext(AuthContext)
  return data
}

export default AuthContext