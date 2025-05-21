"use client"

import React from 'react'
import { products } from '@/data/products'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'

export default function Search({ searchParams }) {
    const { cart, addToCart } = useCart();
    const query = searchParams?.q || ''
    const filteredProducts = products.filter((product) =>
        product?.name?.toLowerCase().includes(query?.toLowerCase())
    )
    if (!query) return <p>Not found</p>

    
    const handleAddToCart = (e, product) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };
    return (
        <div className='mt-3 md:mx-20 rounded-md flex flex-col gap-3 p-4 h-auto'>
            <h1>Searhed results for: {query}</h1>
            {filteredProducts.length === 0 ? (
                <p>No products found..</p>
            ) : (
                <div className="items">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        {filteredProducts.map((product) => (
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
            )}

        </div>
    )


}
