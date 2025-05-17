import { NextResponse } from "next/server";
import { auth } from '@clerk/nextjs/server'
import { currentUser } from '@clerk/nextjs/server'
import mongoose from "mongoose";
import Order from "@/models/Order";

export async function GET() {
    try {
        const { userId, sessionClaims } = await auth();
        
        if (!userId) {
            return NextResponse.json({
                success: false,
                error: "Authentication required"
            }, { status: 401 });
        }

        console.log("User ID:", userId);
        console.log("Session claims:", sessionClaims);
        
        // Get the current user to access email
        const user = await currentUser();
        console.log("Current user:", user);
        
        if (!user?.emailAddresses?.[0]?.emailAddress) {
            return NextResponse.json({
                success: false,
                error: "User email not found"
            }, { status: 401 });
        }

        const userEmail = user.emailAddresses[0].emailAddress;
        
        //connect to DB
        await mongoose.connect(process.env.MONGODB_URI);
        //finding the orders against email
        const orders = await Order.find({email: userEmail}).sort({createdAt: -1});

        return NextResponse.json({
            success: true,
            data: orders,
            message: "Found your order"
        })
        
    } catch (error) {
        console.error("Got error while fetching: " , error)
        return NextResponse.json({
            success: false,
            error: error.message || "An error occurred while fetching"
        }, {status:500} )   
    }
}