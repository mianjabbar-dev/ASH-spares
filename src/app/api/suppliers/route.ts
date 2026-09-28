import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const supplier = await prisma.supplier.create({
      data: {
        name: body.name,
        companyName: body.companyName,
        phone: body.phone,
        city: body.city,
        supplierType: "WHOLESALER", // Default type aapke schema ke mutabiq
        status: "ACTIVE"
      }
    });

    return NextResponse.json(supplier, { status: 201 });
  } catch (error) {
    console.error("Supplier create error:", error);
    return NextResponse.json({ error: "Supplier save nahi hua" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const suppliers = await prisma.supplier.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(suppliers, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Suppliers fetch nahi hue" }, { status: 500 });
  }
}