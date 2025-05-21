import React from 'react'
import Link from 'next/link'

const Page = () => {
  return (
    <div className='mt-3 mx-20 rounded-md flex justify-center items-center flex-col gap-3 p-4 h-auto'>
      <h1 className='text-6xl text-blue-500 text-center font-bold mt-10'>You are not authorized</h1>
      <p className='p-2 text-center text-2xl'>You are not authorized to access the admin console</p>
      <Link href="/">
        <button className='bg-blue-500 hover:cursor-pointer hover:bg-blue-600 transition-colors p-3 px-5 text-xl font-medium rounded-lg text-white'>Continue Shopping</button>
      </Link>
    </div>
  )
}

export default Page
export const metadata = {
  title: "You are-not authorized - Buyzaar"
}