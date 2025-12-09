import Image from 'next/image'
import React, { ReactNode } from 'react'

const AuthLayout = ({ children }: { children: ReactNode}) => {
  return (
    <main className='flex min-h-screen items-center justify-center'>
      <Image
        src='/images/auth-light.png'
        alt='Authentication Background'
        fill
        className='absolute -z-10 object-cover blur-sm'
      />
        {children}
    </main>
  )
}

export default AuthLayout