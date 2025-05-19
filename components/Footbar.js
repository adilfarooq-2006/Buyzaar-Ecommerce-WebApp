import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Footbar = () => {
    return (
        <><footer className='md:p-7 p-2 bg-white flex justify-between md:px-20'>
            <div className="first">
                <div className='logo text-2xl font-bold text-blue-500'>
                    Buyzaar
                </div>
                <div className="text">
                    <p >Best ecommerce website with variety of products</p>
                    <p className='mb-2'>Developed by Muhammad Adil Farooq</p>
                </div>
                <div className="social flex gap-2">
                    <Link target='_blank' href={"/"}><Image className='hover:cursor-pointer' src="/facebook.svg" alt="facebook" width={30} height={30} /></Link>
                    <Link target='_blank' href={"/"}><Image className='hover:cursor-pointer' src="/instagram.svg" alt="instagram" width={30} height={30} /></Link>
                    <Link target='_blank' href={"/"}><Image className='hover:cursor-pointer' src="/twitter.svg" alt="twitter" width={30} height={30} /></Link>
                    <Link target='_blank' href={"https://www.linkedin.com/in/muhammad-adil-farooq"}><Image className='hover:cursor-pointer' src="/linkedin.svg" alt="linkedin" width={30} height={30} /></Link>
                </div>
            </div>
            <div className="second">
                <h1 className='hidden md:block font-bold text-lg'>About</h1>
                <ul className='text-gray-500'>
                    <li className='hover:cursor-pointer hover:text-blue-500'>About Us</li>
                    <li className='hover:cursor-pointer hover:text-blue-500'>Find Store</li>
                    <li className='hover:cursor-pointer hover:text-blue-500'>Catogary</li>
                    <li className='hover:cursor-pointer hover:text-blue-500'>Blogs</li>
                </ul>

            </div>
            <div className=" hidden md:block third">
                <h1 className='font-bold text-lg'>Partnerships</h1>
                <ul className='text-gray-500'>
                    <li className='hover:cursor-pointer hover:text-blue-500'>About Us</li>
                    <li className='hover:cursor-pointer hover:text-blue-500'>Find Store</li>
                    <li className='hover:cursor-pointer hover:text-blue-500'>Catogary</li>
                    <li className='hover:cursor-pointer hover:text-blue-500'>Blogs</li>
                </ul>

            </div>
            <div className="hidden md:block fourth">
                <h1 className=' font-bold text-lg'>Information</h1>
                <ul className='text-gray-500'>
                    <li className='hover:cursor-pointer hover:text-blue-500'>Help Center</li>
                    <li className='hover:cursor-pointer hover:text-blue-500'>Money Refund</li>
                    <li className='hover:cursor-pointer hover:text-blue-500'>Shipping</li>
                    <li className='hover:cursor-pointer hover:text-blue-500'>Contact Us</li>
                </ul>
            </div>
            <div className="hidden md:block fifth">
                <h1 className='font-bold text-lg'>For users</h1>
                <ul className='text-gray-500'>
                    <li className='hover:cursor-pointer hover:text-blue-500'>Login</li>
                    <li className='hover:cursor-pointer hover:text-blue-500'>Registers</li>
                    <li className='hover:cursor-pointer hover:text-blue-500'>Settings</li>
                    <li className='hover:cursor-pointer hover:text-blue-500'>My Orders</li>
                </ul>
            </div>
        </footer>
        <div className='p-7 bg-gray-200 flex justify-between md:px-20'>
            <div>
                <p>© 2025 Buyzaar. All rights reserved.</p>
            </div>
            <div className="two flex gap-4">
            <span className="flex gap-2">English, USD
              <Image src="/downarrow.svg" alt="arrow-down" width={10} height={10} /></span>
          </div>


        </div>
        </>
    )
}

export default Footbar
