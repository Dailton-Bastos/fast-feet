import React from 'react'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <main>{children}</main>
}

export const authLayout = (page: React.ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}
