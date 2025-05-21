"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {  useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { products } from '@/data/products'

const Page = () => {
  const router = useRouter()
  const { cart, getTotalPrice, clearCart, buyNowItem, clearBuyNowItem, getBuyNowTotalPrice } = useCart();

  useEffect(() => {
    // If there's no cart items and no buyNow item, redirect to homepage
    if (cart.length === 0 && !buyNowItem) {
      <p>No order!</p>
    }
  }, [cart, buyNowItem, router]);

  // Calculate the effective total price based on whether we're using buyNow or cart
  const effectiveTotal = buyNowItem ? getBuyNowTotalPrice() : getTotalPrice();

  const [formData, setFormData] = useState({
    email: '',
    fname: '',
    lname: '',
    add: '',
    apar: '',
    city: '',
    pcode: '',
    ph: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    // Use either the buyNow item or the cart
    const orderItems = buyNowItem 
      ? [{
          productId: buyNowItem.id,
          name: buyNowItem.name,
          price: buyNowItem.price,
          quantity: buyNowItem.quantity,
          total: buyNowItem.price * buyNowItem.quantity
        }]
      : cart.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          total: item.price * item.quantity
        }));

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      ...formData,
      products: orderItems,
      totalPrice: effectiveTotal + 10
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    try {
      const response = await fetch("/api/order", requestOptions);
      const result = await response.json();
      
      if (result.success) {
        if (buyNowItem) {
          clearBuyNowItem();
        } else {
          clearCart();
        }
        setFormData({
          email: '',
          fname: '',
          lname: '',
          add: '',
          apar: '',
          city: '',
          pcode: '',
          ph: '',
        })
        router.push('/thankyou')
      } else {
        console.error("Error:", result.error);
        alert("Order failed: " + result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Order failed. Please check console for details.");
    }
  }


  return (
    <div className='mt-3 mx-20 rounded-md flex p-4 h-auto'>
      <div className="left rounded-md flex flex-col bg-white p-4 w-1/2">
        <div className='logo text-7xl font-bold text-blue-500'>
          Buyzaar
        </div>

        <form className='flex flex-col gap-3' onSubmit={handleSubmit} >
          <div className='flex flex-col'>
            <label className='text-2xl py-3 font-medium mt-5' htmlFor="email">Contact</label>
            <input
              onChange={handleChange}
              id="email"
              name='email'
              value={formData.email}
              className='p-3 rounded-lg border border-neutral-400'
              type="email"
              placeholder='Enter your Email'
              required
            />
          </div>

          <p className='text-2xl mt-5 font-medium mb-3'>Delivery</p>
          <div className='flex flex-col'>
            <div className='p-3 rounded-lg border border-neutral-400'>Pakistan</div>
          </div>

          <div className='flex w-full gap-2 mt-2'>
            <input
              onChange={handleChange}
              name='fname'
              value={formData.fname}
              className='p-3 w-full rounded-lg border border-neutral-400'
              type="text"
              placeholder='Enter your first name'
              required
            />
            <input
              onChange={handleChange}
              name='lname'
              value={formData.lname}
              className='p-3 w-full rounded-lg border border-neutral-400'
              type="text"
              placeholder='Enter your last name'
              required
            />
          </div>

          <div className='flex w-full gap-2 mt-2'>
            <input
              onChange={handleChange}
              name='add'
              value={formData.add}
              className='p-3 w-full rounded-lg border border-neutral-400'
              type="text"
              placeholder='Enter your address'
              required
            />
          </div>

          <div className='flex w-full gap-2 mt-2'>
            <input
              onChange={handleChange}
              name='apar'
              value={formData.apar}
              className='p-3 w-full rounded-lg border border-neutral-400'
              type="text"
              placeholder='Apartment, suite, etc. (optional)'
            />
          </div>

          <div className='flex w-full gap-2 mt-2'>
            <input
              onChange={handleChange}
              name='city'
              value={formData.city}
              className='p-3 w-full rounded-lg border border-neutral-400'
              type="text"
              placeholder='Enter your city'
              required
            />
            <input
              onChange={handleChange}
              name='pcode'
              value={formData.pcode}
              className='p-3 w-full rounded-lg border border-neutral-400'
              type="text"
              placeholder='Postal code'
            />
          </div>

          <div className='flex w-full gap-2 mt-2'>
            <input
              onChange={handleChange}
              name='ph'
              value={formData.ph}
              className='p-3 w-full rounded-lg border border-neutral-400'
              type="tel"
              placeholder='Enter your phone number'
              required
            />
          </div>

          <div className='flex flex-col'>
            <p className='text-2xl py-3 font-medium mt-5'>Shipping method</p>
            <div className='p-3 rounded-lg border flex justify-between border-black bg-gray-100'>
              <span>Standard</span>
              <span>$10.00</span>
            </div>
          </div>
          <button type="submit" className='bg-blue-500 hover:cursor-pointer text-white hover:bg-blue-600 transition-colors font-medium text-xl p-3 rounded-lg'>
            Complete Order
          </button>
        </form>
      </div>


      <div className="right w-1/2 relative">
        <div className='sticky top-5 p-4 rounded-md border-l border-neutral-400 bg-gray-200'>
          <div className='flex flex-col gap-4'>
            <div className="cart-items max-h-[50vh] overflow-y-auto pr-2">
              <div className="flex flex-col gap-2 w-full">
                {buyNowItem ? (
                  <div className="flex items-center gap-2 w-full mb-3 pb-2 border-b">
                    <Image
                      src={buyNowItem.image}
                      alt={buyNowItem.name}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                    <div className="text w-full flex justify-between">
                      <div className='flex flex-col'>
                        <span className="font-medium">{buyNowItem.name}</span>
                        <span className='text-neutral-500'>Quantity: {buyNowItem.quantity}</span>
                      </div>
                      <span className="font-medium">${(buyNowItem.price * buyNowItem.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-2 w-full mb-3 pb-2 border-b">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                      <div className="text w-full flex justify-between">
                        <div className='flex flex-col'>
                          <span className="font-medium">{item.name}</span>
                          <span className='text-neutral-500'>Quantity: {item.quantity}</span>
                        </div>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="copuncode gap-3 flex items-center justify-center w-full">
              <input
                onChange={handleChange} className='bg-white p-3 w-full rounded-lg border border-neutral-400' type="text" placeholder='Enter discount code' />
              <button className='bg-blue-500 hover:cursor-pointer hover:bg-blue-600 transition-colors font-medium p-3 rounded-lg text-white'>Apply</button>
            </div>

            <div className="subtotal mt-2">
              <div className='flex justify-between items-center py-1'>
                <span className=''>Subtotal</span>
                <span>$ {effectiveTotal.toFixed(2)}</span>
              </div>
              <div className='flex justify-between items-center py-1'>
                <span className=''>Shipping</span>
                <span>$ 10.00</span>
              </div>
            </div>

            <div className="total flex justify-between mt-2 pt-2 border-t">
              <span className='font-bold text-xl'>Total</span>
              <span className='font-bold text-xl'>USD $ {(effectiveTotal + 10).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page