import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import logo from '../../../public/images/header-logo.svg'

export const Logo = () => {
  return (
    <Link href="/deliveries">
      <a>
        <Image src={logo} width={135} height={26} />
      </a>
    </Link>
  )
}
