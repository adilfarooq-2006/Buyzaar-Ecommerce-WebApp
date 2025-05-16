"use client"
import { products } from '@/data/products'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const page = ({ params }) => {
    const router = useRouter();
    const { cart, addToCart, buyNow } = useCart();
  
    const handleAddToCart = (e, product) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };

    const handleBuyNow = (e, product) => {
        e.preventDefault();
        e.stopPropagation();
        buyNow(product, quantity);
        router.push('/checkout');
    };

    const [quantity, setQuantity] = useState(1)
    
    // Find the product by its ID instead of using params.id as an array index
    const product = products.find(p => p.id === params.id) || products[0]

    return (
        <>
            <div className=' mt-3 mx-20 rounded-md flex bg-white p-4 h-auto'>
                <div className="image w-1/2 flex justify-center items-center">
                    <Image src={product.image} alt={product.name} width={450} height={450} />
                </div>
                <div className="data w-1/2 flex flex-col gap-2">
                    <h1 className='text-4xl font-bold'>{product.name}</h1>
                    <p className='text-xl text-neutral-500'>{product.description}</p>
                    <p className='text-sm text-neutral-500'>Items Sold: {product.sold}</p>
                    <div className="box flex gap-2">
                        <span className='text-lg bg-green-500 text-white px-2 py-1 rounded-md w-fit'>In Stock</span>
                        <span className='text-lg bg-blue-500 text-white px-2 py-1 rounded-md w-fit'>Free Shipping</span>
                    </div>
                    <div className='text-sm text-black flex gap-2'>
                        <span className='text-2xl font-bold'>${product.price}</span>
                        <span className='text-sm  text-neutral-500'>/pc</span>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                className='border border-neutral-500 rounded-md p-2 w-16 text-center'
                                min="1"
                            />
                        </div>
                    </div>
                    <div className="buttons flex gap-3">
                        <button onClick={(e)=> handleAddToCart(e, product)} className='bg-blue-500 cursor-pointer font-medium text-white hover:bg-blue-600 transition-all duration-300 p-2 px-4 rounded-md w-fit'>Add to Cart</button>
                        <button onClick={(e)=> handleBuyNow(e, product)} className='bg-white border cursor-pointer border-blue-500 font-medium text-blue-500 hover:bg-gray-100 hover:text-black transition-all duration-300 p-2 px-4 rounded-md w-fit'>Buy Now</button>
                    </div>
                </div>
            </div>
            <div className=' mt-3 mx-20 rounded-md flex gap-3  p-4 h-auto'>
                <div className="description w-3/4 bg-white p-4 rounded-md">
                    <h1 className='text-2xl font-bold'>Description</h1>
                    <p className='text-lg text-neutral-500'>{product.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident eveniet quia ratione dolorem numquam iste nostrum, a assumenda dicta inventore illum, recusandae reiciendis. Distinctio consequatur minus quam placeat, possimus reprehenderit quos odit neque aliquam ipsa fuga rerum accusamus? Iste veniam delectus excepturi ea aperiam rerum fugit incidunt ducimus totam veritatis!</p>
                </div>
                <div className="youmaylike w-1/4 p-4 h-auto bg-white rounded-md">
                    <h1 className='font-bold text-xl'>You may also like</h1>
                    <div className="flex flex-col gap-2">
                        {/* populating to show random 4 products with there title, image and price */}
                        {[...products]
                            .sort(() => 0.5 - Math.random()) // shuffle the array
                            .slice(0, 5)                     // take first 5 items
                            .map((product) => (
                                <Link key={product.id} href={`/product/${product.id}`}>
                                <div key={product.id} className='flex gap-2 hover:bg-gray-100 border-t transition-all duration-300 p-2 rounded-md'>
                                    <div>
                                        <Image src={product.image} alt={product.name} width={100} height={100} />
                                        </div>
                                        <div className='flex flex-col gap-2 mt-4 text-black'>
                                        <h1 className='text-lg font-bold '>{product.name}</h1>
                                    
                                    <p className='text-lg font-bold '>${product.price}</p>
                                    </div>
                                </div>
                                </Link>
                            ))}
                    </div>


                </div>
            </div>

        </>
    )
}

export default page
