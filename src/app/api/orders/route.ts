import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Admin panel ke liye sab orders fetch karna
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: { 
        customer: true,
        items: true
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Orders fetch nahi hue" }, { status: 500 });
  }
}

// Order ka status update karna (Pending -> Shipped waghera)
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const updatedOrder = await prisma.order.update({
      where: { id: body.id },
      data: { status: body.status }
    });
    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Order status update nahi hua" }, { status: 500 });
  }
}

// Website se naya order receive karna (Guest Checkout ke liye)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Pehle customer ka record banayein
    const customer = await prisma.customer.create({
      data: {
        name: body.customer.name,
        phone: body.customer.phone,
        address: body.customer.address,
        city: body.customer.city,
      }
    });

    // Phir uska order save karein
    const order = await prisma.order.create({
      data: {
        orderId: `ORD-${Date.now().toString().slice(-6)}`,
        customerId: customer.id,
        subtotal: parseFloat(body.subtotal),
        total: parseFloat(body.total),
        discount: parseFloat(body.discount || 0),
        status: "PENDING",
        items: {
          create: body.items.map((item: any) => ({
            productId: item.productId,
            name: item.name,
            sku: item.sku || "N/A",
            price: parseFloat(item.price),
            quantity: item.quantity,
            total: parseFloat(item.price) * item.quantity
          }))
        }
      }
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Order create error:", error);
    return NextResponse.json({ error: "Order place nahi hua" }, { status: 500 });
  }
}