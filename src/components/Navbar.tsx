import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav>
        <ul className='flex flex-col gap-5'>
            <Link href="/">
                <li className='w-full py-2 px-5 cursor-pointer text-center border-2 border-gray-200 rounded-lg hover:bg-gray-100 transition-all'>
                    Dashboard
                </li>
            </Link>

            <Link href="/spend">
                <li className='w-full py-2 px-5 cursor-pointer text-center border-2 border-gray-200 rounded-lg hover:bg-gray-100 transition-all'>
                    Adicionar Gasto
                </li>
            </Link>
        </ul>
    </nav>
  )
}

export default Navbar