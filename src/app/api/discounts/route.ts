import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const discount = await prisma.discountCode.create({
      data: {
        code: body.code.toUpperCase(), // Hamesha capital letters mein save hoga
        type: body.type, // "PERCENTAGE" ya "FIXED"
        value: parseFloat(body.value),
        active: true,
      }
    });
    return NextResponse.json(discount, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Discount code save nahi hua (shayad code pehle se maujood hai)" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const discounts = await prisma.discountCode.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(discounts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Discounts fetch nahi hue" }, { status: 500 });
  }
}