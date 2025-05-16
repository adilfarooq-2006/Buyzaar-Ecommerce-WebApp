import React from 'react'
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
}
    from '@clerk/nextjs'

const page = () => {
    return (
        <div className='mx-80 mt-10 rounded-md flex flex-col gap-3 p-4 h-auto'>
            <div className='bg-red-500 text-white flex flex-col justify-center items-center'>
                <h1 className='text-xl font-medium'>First you have to SignIn/SignUP</h1>
                <div className='flex justify-end items-center p-4 gap-4 h-16'>
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>

                </div>

            </div>
        </div>
    )
}

export default page
