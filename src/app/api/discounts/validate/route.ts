import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { code } = await req.json();
    const discount = await prisma.discountCode.findUnique({ 
      where: { code: code.toUpperCase() } 
    });
    
    if (!discount || !discount.active) {
      return NextResponse.json({ error: "Invalid ya expired discount code!" }, { status: 400 });
    }
    
    return NextResponse.json(discount, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Code check karne mein masla aaya" }, { status: 500 });
  }
}