'use client'

import React from 'react'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import Image from 'next/image'
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
}
    from '@clerk/nextjs'

const Navbar = () => {
    const { cart } = useCart();
    // Calculate total quantity of items in cart
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <nav className='flex items-center justify-between p-4 px-20 bg-white'>
            <Link href="/">
                <div className='logo text-2xl font-bold text-blue-500'>
                    Buyzaar
                </div>
            </Link>
            <div className="searchbar flex items-center justify-center relative">
                <input className='w-2xl border-2 focus:ring-1 focus:ring-blue-500 outline-none relative border-blue-500 p-2 rounded-md' type="text" placeholder='Search for products, brands and more' />
                <span className="flex gap-2 items-center justify-center catogary absolute right-22 px-1 border-l">
                    All catogaries
                    <Image src="/downarrow.svg" alt="arrow-down" width={10} height={10} />
                </span>
                <button className='bg-blue-500 absolute right-0 px-4 text-white p-2 rounded-r-md'>Search</button>
            </div>
            <div className="icons">
                <ul className='flex items-center justify-center gap-3'>
                    <div>
                        <SignedOut>
                            <SignInButton>
                                <button className='bg-blue-500 p-3 px-5 rounded-lg text-white font-medium text-md hover:bg-blue-600 hover:cursor-pointer'>SignIn</button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>

                    <Link href={"/my-orders"} >
                    <li className='flex flex-col items-center justify-center text-[#8b96a5]'>
                        <Image src="/order.svg" alt="order" width={30} height={30} />
                        Order
                    </li>
                    </Link>
                    <Link href={"/mycart"} >
                        <li className='flex flex-col items-center justify-center text-[#8b96a5]'>
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
    )
}

export default Navbar
