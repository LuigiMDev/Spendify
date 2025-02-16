import { CirclePlus, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type props = {
    openAside?: boolean
}

const Navbar: React.FC<props> = ({openAside}) => {
  return (
    <nav>
        <ul className='w-full'>
            <li className='my-1 text-black'>
                <Link href="/dashboard" className='flex items-center p-3 hover:bg-gray-100 rounded-lg transition-all'>
                    <LayoutDashboard className='flex flex-shrink-0' />
                    <span className={`${openAside ? "lg:ml-3 lg:w-full" : "lg:w-0 lg:ml-0"} ml-3 w-full overflow-hidden text-nowrap`}>Dashboard</span>
                </Link>
            </li>
            <li className='my-1 text-black'>
                <Link href="/spend" className='flex items-center p-3 hover:bg-gray-100 rounded-lg transition-all'>
                    <CirclePlus className='flex flex-shrink-0' />
                    <span className={`${openAside ? "lg:ml-3 lg:w-full" : "lg:w-0 lg:ml-0"} ml-3 w-full overflow-hidden text-nowrap`}>Adicionar gasto</span>
                </Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar