import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";
import { productSchema } from "@/lib/validation";

export async function GET() {
  try {
    await requireAdminSession();
    const products = await prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products);
  } catch (error) {
    if ((error as Error).message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdminSession();
    const body = await req.json();
    const parsed = productSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues.map((e) => e.message).join(", ") },
        { status: 400 }
      );
    }

    const existing = await prisma.product.findUnique({
      where: { sku: parsed.data.sku },
    });
    if (existing) {
      return NextResponse.json({ error: "SKU already exists" }, { status: 409 });
    }

    const product = await prisma.product.create({
      data: {
        ...parsed.data,
        imageUrl: parsed.data.imageUrl || null,
        discountPrice: parsed.data.discountPrice || null,
        description: parsed.data.description || null,
        brand: parsed.data.brand || null,
        vehicle: parsed.data.vehicle || null,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    if ((error as Error).message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
