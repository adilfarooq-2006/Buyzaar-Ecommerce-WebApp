"use client"
import React from 'react'
import { useUser, useAuth } from '@clerk/nextjs'
import { useState, useEffect } from 'react'

const Orders = () => {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [orders, setorders] = useState([])
  const [loading, setloading] = useState(true);

  const fetchOrders = async () => {
    try {
      console.log("Starting to fetch orders...");
      const token = await getToken();
      console.log("Token received:", token ? "Token exists" : "No token");
      const res = await fetch('/api/getorders', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

      const data = await res.json();
      console.log("Data: " ,data)
      if (data.success) {
        setorders(data.data);
      }
      else {
        console.error("Error: ", data.error)
      }

    } catch (error) {
      console.error("Fetch Error: ", error)
    } finally {
      setloading(false);
    }
  }

  useEffect(() => {
    if (isLoaded && user) {
      fetchOrders()
    }
  }, [isLoaded, user])

  if (!isLoaded) {
    return <div className='mt-3 mx-20 p-4'>Loading...</div>
  }



  return (
    <div>
      <div className='mt-3 mx-20 rounded-md flex flex-col gap-3 p-4 h-auto'>
        <div className='bg-blue-500 text-white p-4 py-5 rounded-lg'>
          <h1 className='text-3xl font-bold'>Your Orders</h1>
          <p className='font-medium'>Hi {user.fullName}! these are your recent orders</p>
        </div>
        {loading ? (
          <p>Loading your orders...</p>
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="border p-4 my-2 rounded-lg bg-gray-100"
            >
              <p>Order ID: {order._id}</p>
              <p>Email: {order.email}</p>
              <p>City: {order.city}</p>
              <p>Phone: {order.ph}</p>
              <p>Products: {order.products}</p>
            </div>
          ))
        ) : (
          <p>No orders found :)</p>
        )}
      </div>
    </div>
  )
}

export default Orders
