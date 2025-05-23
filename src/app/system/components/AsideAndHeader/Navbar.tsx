import { LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { BsCashCoin } from 'react-icons/bs'

type props = {
    openAside?: boolean
}

const Navbar: React.FC<props> = ({openAside}) => {


  return (
    <nav className='h-full'>
        <ul className='w-full'>
            <li className='my-1 text-black'>
                <Link href="/system/dashboard" className='flex items-center p-3 hover:bg-gray-100 rounded-lg transition-all' title="Dashboard">
                    <LayoutDashboard className='flex flex-shrink-0 w-6 h-6' />
                    <span className={`${openAside ? "lg:ml-3 lg:w-full" : "lg:w-0 lg:ml-0"} ml-3 w-full overflow-hidden text-nowrap`}>Dashboard</span>
                </Link>
            </li>
            <li className='my-1 text-black'>
                <Link href="/system/expenses" className='flex items-center p-3 hover:bg-gray-100 rounded-lg transition-all' title="Gastos">
                    <BsCashCoin className='flex flex-shrink-0 w-6 h-6' />
                    <span className={`${openAside ? "lg:ml-3 lg:w-full" : "lg:w-0 lg:ml-0"} ml-3 w-full overflow-hidden text-nowrap`}>Gastos</span>
                </Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar