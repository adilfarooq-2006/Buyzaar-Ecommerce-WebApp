"use client"

import React from 'react'
import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const page = () => {
    const { user, isLoaded } = useUser();
    const [orders, setorders] = useState([])
    const [completed, setcompleted] = useState(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("completedOrders");
            return stored ? JSON.parse(stored) : {};
        }
        return {};
    });
    const [loading, setloading] = useState(false)
    const router = useRouter();

    const toggleCompleted = (orderID) => {
        setcompleted(prev => {
            const updated = { ...prev, [orderID]: !prev[orderID] };
            localStorage.setItem("completedOrders", JSON.stringify(updated));
            return updated;
        });
    }

    const fetchOrders = async () => {
        try {
            setloading(true)
            const res = await fetch('/api/order')
            const result = await res.json()
            
            if (result.success) {
                setorders(result.data)
            } else {
                console.error("API error:", result.error)
            }
        } catch (error) {
            console.error("Error fetching orders:", error)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        // Only redirect if user is not admin
        if (isLoaded && user && user.primaryEmailAddress?.emailAddress !== "adilfarooqop@gmail.com") {
            router.push("/not-authorized"); // redirect non-admin users to home
        }
    }, [isLoaded, user, router]);

    // Fetch orders when user is loaded and is admin
    useEffect(() => {
        if (isLoaded && user && user.primaryEmailAddress?.emailAddress === "adilfarooqop@gmail.com") {
            fetchOrders();
            router.push("/dashboard");
        }
    }, [isLoaded, user]);

    if (!isLoaded) return <p>Loading...</p>;

    return (
        <div className='mt-3 mx-20 rounded-md flex flex-col gap-3 p-4 h-auto'>
            <div className='bg-blue-500 text-white p-4 py-5 rounded-lg'>
                <h1 className='font-bold text-3xl'>Welcome {user.fullName}!</h1>
                <p className='font-medium text-lg'>This is your admin console</p>
            </div>
            <div className="main">
                <p className='text-lg'>Here are the all orders you received</p>

                {loading ? (
                    <p>Loading orders...</p>
                ) : orders.length > 0 ? (
                    <div className="orderslist">
                        {orders.map((order) => (
                            <div key={order._id || order.id} className="border p-4 my-2 rounded-lg bg-gray-200 ">
                                <div className="flex justify-between mb-3">
                                    <div>
                                        <p className='text-lg font-semibold'>Order ID: {order._id}</p>
                       
                                        <p className='text-black'>Customer: {order.fname} {order.lname}</p>
                                        <p className='text-black'>Email: {order.email}</p>
                                        <p className='text-black'>Address: {order.add}, {order.city}</p>
                                        <p className='text-black'>Phone: {order.ph}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className='text-lg font-bold'>Total: ${order.totalPrice?.toFixed(2)}</p>
                                        <p className='text-sm'>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                        <button 
                                        onClick={()=> toggleCompleted(order._id)} 
                                        className={` transition-colors p-3 mt-2 px-5 rounded-lg text-white font-medium text-md hover:cursor-pointer
                                        ${completed[order._id] ? 'bg-green-500' : 'bg-red-500'}
                                        `}>
                                            {completed[order._id]? 'Completed' : 'Not Completed'}
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="mt-4">
                                    <h3 className="font-semibold border-b pb-2 mb-2">Products ({order.products?.length || 0})</h3>
                                    <table className="w-full">
                                        <thead className="bg-gray-300">
                                            <tr>
                                                <th className="text-left p-2">Name</th>
                                                <th className="text-center p-2">Price</th>
                                                <th className="text-center p-2">Qty</th>
                                                <th className="text-right p-2">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.products?.map((product, idx) => (
                                                <tr key={idx} className="border-b">
                                                    <td className="p-2">{product.name}</td>
                                                    <td className="text-center p-2">${product.price?.toFixed(2)}</td>
                                                    <td className="text-center p-2">{product.quantity}</td>
                                                    <td className="text-right p-2">${product.total?.toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
        </div>
    )
}

export default page
