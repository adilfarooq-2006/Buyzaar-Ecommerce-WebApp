'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { products } from '@/data/products'
import { useCart } from '@/context/CartContext'

const Page = () => {
  const { cart, addToCart } = useCart();
  
  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className='mt-3 mx-20 rounded-md flex flex-col gap-3 p-4 h-auto'>
      
      
      <div className='flex gap-3'>
        <div className="left bg-white p-4 rounded-md h-fit sticky top-0 self-start w-1/5">
        <div className='mt-3'>        
          <span className='flex items-center text-lg font-medium  justify-between'>
            Catogaries
            <Image src="/downarrow.svg" alt="arrow-down" width={10} height={10} />
          </span>
          <ul className='text-neutral-400 '>
            <li className='hover:cursor-pointer hover:text-neutral-700 '>Mobile Acsessories</li>
            <li className='hover:cursor-pointer hover:text-neutral-700 '>Smart Phones</li>
            <li className='hover:cursor-pointer hover:text-neutral-700 '>Electronics</li>
            <li className='hover:cursor-pointer text-blue-500'>See All</li>
          </ul>
        </div>
        <div className='mt-3 border-t'>        
          <span className='flex items-center text-lg font-medium  justify-between'>
            Brands
            <Image src="/downarrow.svg" alt="arrow-down" width={10} height={10} />
          </span>
          <ul className='text-neutral-400 '>
            <li className='hover:cursor-pointer hover:text-neutral-700 '>Samsung</li>
            <li className='hover:cursor-pointer hover:text-neutral-700 '>Apple</li>
            <li className='hover:cursor-pointer hover:text-neutral-700 '>Haier</li>
            <li className='hover:cursor-pointer text-blue-500'>See All</li>
          </ul>
        </div>
        <div className='mt-3 border-t'>        
          <span className='flex items-center text-lg font-medium  justify-between'>
            Body type
            <Image src="/downarrow.svg" alt="arrow-down" width={10} height={10} />
          </span>
          <ul className='text-neutral-400 '>
            <li className='hover:cursor-pointer hover:text-neutral-700 '>Metalic</li>
            <li className='hover:cursor-pointer hover:text-neutral-700 '>Plastic</li>
            <li className='hover:cursor-pointer hover:text-neutral-700 '>Titanium</li>
            <li className='hover:cursor-pointer text-blue-500'>See All</li>
          </ul>
        </div>
        <div className='mt-3 border-t'>        
          <span className='flex items-center text-lg font-medium  justify-between'>
            Features
            <Image src="/downarrow.svg" alt="arrow-down" width={10} height={10} />
          </span>
          <ul className='text-neutral-400 '>
            <li className='hover:cursor-pointer hover:text-neutral-700 '>Super Fast Charging</li>
            <li className='hover:cursor-pointer hover:text-neutral-700 '>Wireless</li>
            <li className='hover:cursor-pointer hover:text-neutral-700 '>8GB RAM</li>
            <li className='hover:cursor-pointer text-blue-500'>See All</li>
          </ul>
        </div>
        <div className='mt-3 border-t'>        
          <span className='flex hover:cursor-pointer items-center text-lg font-medium  justify-between'>
            Price Range
            <Image src="/downarrow.svg" alt="arrow-down" width={10} height={10} />
          </span>
          </div>
        <div className='mt-3 border-t'>        
          <span className='flex hover:cursor-pointer items-center text-lg font-medium  justify-between'>
            Condition
            <Image src="/downarrow.svg" alt="arrow-down" width={10} height={10} />
          </span>
          </div>
        <div className='mt-3 border-t'>        
          <span className='flex hover:cursor-pointer items-center text-lg font-medium  justify-between'>
            Ratings
            <Image src="/downarrow.svg" alt="arrow-down" width={10} height={10} />
          </span>
          </div>
        <div className='mt-3 border-t'>        
          <span className='flex hover:cursor-pointer items-center text-lg font-medium  justify-between'>
            Manufacturer
            <Image src="/downarrow.svg" alt="arrow-down" width={10} height={10} />
          </span>
          </div>
        </div>


        <div className="right p-4 w-4/5">
          <div className="firstbar flex justify-between bg-white p-3 items-center rounded-md">
            <span>{products.length} <b>Total Products</b> </span>
            <span className='p-2 px-4 border text-neutral-400 border-neutral-400 rounded-md flex gap-5'>Featured
            <Image src="/downarrow.svg" alt="arrow-down" width={10} height={10} />
            </span>
          </div>
          <div className="items">
            <div className="grid grid-cols-3 gap-4 mt-4">
              {products.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`}>
                <div className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative h-48 mb-3">
                    <Image 
                      src={product.image} 
                      alt={product.name} 
                      fill
                      style={{ objectFit: 'contain' }}
                      className="rounded-md"
                    />
                  </div>
                  <h3 className="font-medium text-lg">{product.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-bold text-xl">${product.price.toFixed(2)}</span>
                    <span className="text-sm text-gray-500">{product.sold} sold</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 overflow-hidden text-ellipsis h-10">{product.description}</p>
                  <button 
                    onClick={(e) => handleAddToCart(e, product)}
                    className="w-full mt-3 hover:cursor-pointer bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
