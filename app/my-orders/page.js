"use client"
import React from 'react'
import { useUser, useAuth } from '@clerk/nextjs'
import { useState, useEffect, useCallback } from 'react'

const Orders = () => {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [orders, setorders] = useState([])
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders =useCallback(async () => {
    try {
      console.log("Starting to fetch orders...");
      const token = await getToken();
      console.log("Token received:", token ? "Token exists" : "No token");

      if (!token) {
        setError("Authentication token not available");
        return;
      }

      const res = await fetch('/api/getorders', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await res.json();
      console.log("Response data:", data);

      if (data.success) {
        setorders(data.data);
        setError(null);
      } else {
        setError(data.error || "Failed to fetch orders");
        console.error("API error:", data.error);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setError("Failed to fetch orders. Please try again later.");
    } finally {
      setloading(false);
    }
  }, [getToken]);

  useEffect(() => {
    if (isLoaded && user) {
      fetchOrders();
    }
  }, [isLoaded, user, fetchOrders]);

  if (!isLoaded) {
    return <div className='mt-3 md:mx-20 p-4'>Loading...</div>;
  }

  if (error) {
    return <div className='mt-3 md:mx-20 p-4 text-red-500'>{error}</div>;
  }

  if (loading) {
    return <div className='mt-3 md:mx-20 p-4'>Loading orders...</div>;
  }

  return (
    <div className='mt-3 md:mx-20 p-4'>
      <div className='bg-blue-500 text-white p-4 py-5 rounded-lg' >
        <h1 className='font-bold text-3xl'>Your Orders</h1>
      </div>
      <p className='text-lg mt-3'>Here are the all orders you have done</p>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className='space-y-4'>
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
      )}
    </div>
  );
}

export default Orders;
