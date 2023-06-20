'use client'
import { ContextAuthProvider } from '@/context/AuthContext'
import React, { ReactNode } from 'react'

export default function ContentContext({ children }: { children: ReactNode }) {
    return <ContextAuthProvider>
        {children}
    </ContextAuthProvider>
}
