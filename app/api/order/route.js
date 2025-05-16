import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Order from "@/models/Order";

export async function GET() {
    try {
        // Connect to db
        await mongoose.connect(process.env.MONGODB_URI);
        
        // Fetch all orders from the database
        const orders = await Order.find({}).sort({ createdAt: -1 });
        
        return NextResponse.json({ 
            success: true, 
            data: orders 
        });
    }
    catch (error) {
        console.error("Error fetching orders:", error);
        
        return NextResponse.json({ 
            success: false, 
            error: error.message || "An error occurred while fetching orders" 
        }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        
        // Validate required fields
        if (!body.email || !body.fname || !body.lname || !body.add || !body.city || !body.ph) {
            return NextResponse.json({ 
                success: false, 
                error: "Missing required customer information" 
            }, { status: 400 });
        }
        
        // Validate products array
        if (!body.products || !Array.isArray(body.products) || body.products.length === 0) {
            return NextResponse.json({ 
                success: false, 
                error: "No products in order" 
            }, { status: 400 });
        }

        // Connect to db
        await mongoose.connect(process.env.MONGODB_URI);

        // Create and save the order
        const order = new Order(body);
        const savedOrder = await order.save();

        return NextResponse.json({ 
            success: true, 
            data: savedOrder,
            message: "Order created successfully"
        });
    }
    catch (error) {
        console.error("Order API error:", error);
        
        return NextResponse.json({ 
            success: false, 
            error: error.message || "An error occurred while processing your order" 
        }, { status: 500 });
    }
}




