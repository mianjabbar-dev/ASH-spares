import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Naya product add karne ke liye
export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    let category = await prisma.category.findFirst();
    if (!category) {
      category = await prisma.category.create({
        data: { name: "General Parts", slug: "general-parts", active: true }
      });
    }

    const product = await prisma.product.create({
      data: {
        name: body.name,
        sku: `SKU-${Date.now()}`,
        price: parseFloat(body.price),
        imageUrl: body.imageUrl,
        description: body.description,
        categoryId: category.id,
        stock: 10,
        active: true,
        featured: true,
      }
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Product save nahi hua" }, { status: 500 });
  }
}

// Products fetch karne ke liye
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Products fetch nahi hue" }, { status: 500 });
  }
}

// Product ko Edit/Update karne ke liye
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...data } = body;
    
    const updatedProduct = await prisma.product.update({
      where: { id: id },
      data: {
        name: data.name,
        price: parseFloat(data.price),
        imageUrl: data.imageUrl,
        description: data.description,
      }
    });
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Product update nahi hua" }, { status: 500 });
  }
}

// Product ko Delete karne ke liye
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    
    await prisma.product.delete({
      where: { id: body.id }
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Product delete nahi hua" }, { status: 500 });
  }
}