'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'

const Page = () => {
    const router = useRouter()
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getTotalPrice, 
    isInitialized 
  } = useCart();

  const handleCheckout = () => {
    // Here you would typically process the order
    router.push('/checkout')
    // Clear the cart after successful checkout
  };

  const totalPrice = getTotalPrice();
  
  return (
    <div className='mt-3 mx-20 bg-white rounded-md p-6 min-h-[60vh]'>
      <h1 className='font-bold text-2xl mb-6'>My Cart</h1>
      
      {!isInitialized ? (
        <div className="text-center py-8">Loading...</div>
      ) : cart.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link href="/products">
            <button className="bg-blue-500 hover:cursor-pointer text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <>
          <div className="items flex flex-col gap-4 mb-6">
            {cart.map((item) => (
              <div key={item.id} className="flex border-b pb-4">
                <div className="relative h-24 w-24 flex-shrink-0">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill
                    style={{ objectFit: 'contain' }}
                    className="rounded-md"
                  />
                </div>
                <div className="ml-4 flex-grow">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <div className="flex justify-between items-end mt-2">
                    <div>
                      <p className="font-bold">${item.price.toFixed(2)}</p>
                      <div className="flex items-center mt-1">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 border hover:bg-gray-200 hover:cursor-pointer rounded-l-md flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="w-10 h-8 border-t border-b flex items-center justify-center">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 border hover:bg-gray-200 hover:cursor-pointer rounded-r-md flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <p className="font-bold mr-4">${(item.price * item.quantity).toFixed(2)}</p>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 hover:cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="summary bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full mt-4 bg-blue-500 hover:cursor-pointer font-medium text-white py-3 rounded-md hover:bg-blue-600 transition-colors"
            >
              Checkout
            </button>
            <Link href="/products">
              <button className="w-full hover:cursor-pointer mt-2 font-medium bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition-colors">
                Continue Shopping
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default Page
