'use client'

import React, { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton, } from '@clerk/nextjs'

const Navbar = () => {
    const [query, setquery] = useState('')
    const { cart } = useCart();
    const router = useRouter();
    // Calculate total quantity of items in cart
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`)
        }
    }


    return (
        <>        
        <nav className='flex items-center justify-between p-4 md:px-20 bg-white'>
            <Link href="/">
                <div className='md:block hidden logo text-2xl font-bold text-blue-500'>
                    Buyzaar
                </div>
            </Link>
            <div className="searchbar flex items-center justify-center relative">
                <form onSubmit={handleSearch}>
                    <input
                        className='md:w-2xl w-96  border-2 focus:ring-1 focus:ring-blue-500 outline-none relative border-blue-500 p-2 rounded-md'
                        type="text"
                        value={query}
                        onChange={(e) => setquery(e.target.value)}
                        placeholder='Search for products, brands and more' />
                    <button
                        type='submit'
                        className='bg-blue-500 absolute right-0 px-4 text-white p-2 rounded-r-md'>
                        Search
                    </button>
                </form>
            </div>
            <div className="icons">
                <ul className='flex items-center justify-center gap-3'>
                    <div className='hidden md:block'>
                        <SignedOut>
                            <SignInButton>
                                <button className='bg-blue-500 p-3 md:px-5 rounded-lg text-white font-medium text-md hover:bg-blue-600 hover:cursor-pointer'>SignIn</button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>

                    <Link href={"/my-orders"} >
                        <li className='md:flex hidden flex-col items-center justify-center text-[#8b96a5]'>
                            <Image src="/order.svg" alt="order" width={30} height={30} />
                            Orders
                        </li>
                    </Link>
                    <Link href={"/mycart"} >
                        <li className='md:flex hidden flex-col items-center justify-center text-[#8b96a5]'>
                            <div className="relative">
                                <Image src="/cart.svg" alt="cart" width={30} height={30} />
                                {cartItemCount > 0 && (
                                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {cartItemCount}
                                    </div>
                                )}
                            </div>
                            My Cart
                        </li>
                    </Link>
                </ul>
            </div>
        </nav >

            {/* Mobile Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 mx-8 bg-white border-t border-gray-200 md:hidden z-50">
                <div className="flex justify-around items-center h-16">
                <Link href={"/"} className="flex-1">
                        <div className="flex flex-col items-center justify-center text-[#8b96a5]">
                            <Image src="/home.svg" alt="home" width={24} height={24} />
                            <span className="text-xs mt-1">Home</span>
                        </div>
                    </Link>
                    <Link href={"/my-orders"} className="flex-1">
                        <div className="flex flex-col items-center justify-center text-[#8b96a5]">
                            <Image src="/order.svg" alt="order" width={24} height={24} />
                            <span className="text-xs mt-1">Orders</span>
                        </div>
                    </Link>
                    <Link href={"/mycart"} className="flex-1">
                        <div className="flex flex-col items-center justify-center text-[#8b96a5]">
                            <div className="relative">
                                <Image src="/cart.svg" alt="cart" width={24} height={24} />
                                {cartItemCount > 0 && (
                                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {cartItemCount}
                                    </div>
                                )}
                            </div>
                            <span className="text-xs mt-1">My Cart</span>
                        </div>
                    </Link>
                    
                    <div>
                        <SignedOut>
                            <SignInButton>
                                <button className='bg-blue-500 p-3 md:px-5 rounded-xl text-white font-medium text-md hover:bg-blue-600 hover:cursor-pointer'>Sign In</button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>

                </div>
            </div>
        </>

    )
}

export default Navbar
