import React from 'react'

import NextHead from 'next/head'

interface HeadProps {
  title: string
  description?: string
}

export const Head = ({ title, description }: HeadProps) => {
  return (
    <NextHead>
      <title>FastFeet | {title}</title>
      <meta name="description" content={description} />
    </NextHead>
  )
}
