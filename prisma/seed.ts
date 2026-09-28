import { PrismaClient, SupplierType, DiscountType } from "@prisma/client";
import { hashPassword } from "@/lib/auth";

const prisma = new PrismaClient();

async function main() {
  // Seed admin user from env or defaults
  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  await prisma.adminUser.upsert({
    where: { username: adminUsername },
    update: {},
    create: {
      username: adminUsername,
      password: await hashPassword(adminPassword),
      name: "Administrator",
    },
  });

  // Seed business settings
  await prisma.businessSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      businessName: "ASH Spares",
      email: "team.ashspare@gmail.com",
      phone: "+92-304-7084692",
      whatsapp: "923047084692",
      instagram: "https://www.instagram.com/ash.spares/",
      ceoName: "MIAN JABBAR",
      ceoLinkedInUrl1: "https://www.linkedin.com/in/mian-jabbar-dev/",
      ceoLinkedInUrl2: "https://www.linkedin.com/in/saad-riaz-90aa05382/",
      address: "Faisalabad, Punjab, Pakistan",
      city: "Faisalabad",
      country: "Pakistan",
      importSource: "Dubai, UAE",
      aboutText:
        "Faisalabad-based automotive spare parts supplier offering quality components with competitive market pricing and reliable sourcing through Dubai.",
    },
  });

  // Seed categories
  const categories = [
    { name: "Filters", slug: "filters", description: "Air, oil, cabin and fuel filters" },
    { name: "Braking System", slug: "braking-system", description: "Brake pads, discs, shoes and more" },
    { name: "Engine Parts", slug: "engine-parts", description: "Spark plugs, mounts, belts and engine components" },
    { name: "Suspension", slug: "suspension", description: "Shocks, control arms, bushings and suspension parts" },
    { name: "Electrical Parts", slug: "electrical-parts", description: "Alternators, starters, batteries and electrics" },
    { name: "Body Parts", slug: "body-parts", description: "Lights, mirrors, bumpers and body components" },
    { name: "Cooling System", slug: "cooling-system", description: "Radiators, fans, water pumps and cooling" },
    { name: "Lubricants & Maintenance", slug: "lubricants-maintenance", description: "Engine oil and maintenance fluids" },
    { name: "Car Accessories", slug: "car-accessories", description: "Horn, wiper blades and accessories" },
  ];

  const createdCategories: Record<string, string> = {};
  for (const cat of categories) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    createdCategories[cat.slug] = created.id;
  }

  // Seed suppliers (fictional demo data)
  const suppliers = [
    {
      name: "Ahmad Traders",
      companyName: "Ahmad Auto Parts",
      phone: "+92-300-1111111",
      whatsapp: "+92-300-1111111",
      email: "ahmad@example.com",
      address: "Al-Aweer Auto Market",
      city: "Dubai",
      country: "UAE",
      supplierType: SupplierType.IMPORTER,
      notes: "Demo supplier - replace with real data",
    },
    {
      name: "Bilal Motors",
      companyName: "Bilal Spare Parts",
      phone: "+92-301-2222222",
      whatsapp: "+92-301-2222222",
      email: "bilal@example.com",
      address: "Montgomery Bazaar",
      city: "Faisalabad",
      country: "Pakistan",
      supplierType: SupplierType.WHOLESALER,
      notes: "Demo supplier - replace with real data",
    },
    {
      name: "Chaudhry Enterprises",
      companyName: "Chaudhry Auto Distributors",
      phone: "+92-302-3333333",
      whatsapp: "+92-302-3333333",
      email: "chaudhry@example.com",
      address: "Industrial Estate",
      city: "Faisalabad",
      country: "Pakistan",
      supplierType: SupplierType.DISTRIBUTOR,
      notes: "Demo supplier - replace with real data",
    },
    {
      name: "Dubai Auto Zone",
      companyName: "Dubai Auto Zone LLC",
      phone: "+971-50-4444444",
      whatsapp: "+971-50-4444444",
      email: "dubaiauto@example.com",
      address: "Deira",
      city: "Dubai",
      country: "UAE",
      supplierType: SupplierType.DEALER,
      notes: "Demo supplier - replace with real data",
    },
    {
      name: "Elite Parts Manufacturer",
      companyName: "Elite Brake & Suspension",
      phone: "+92-303-5555555",
      whatsapp: "+92-303-5555555",
      email: "elite@example.com",
      address: "Gujranwala Road",
      city: "Gujranwala",
      country: "Pakistan",
      supplierType: SupplierType.MANUFACTURER,
      notes: "Demo supplier - replace with real data",
    },
  ];

  const createdSuppliers: string[] = [];
  for (const sup of suppliers) {
    const existing = await prisma.supplier.findFirst({ where: { name: sup.name } });
    if (existing) {
      createdSuppliers.push(existing.id);
    } else {
      const created = await prisma.supplier.create({ data: sup as any });
      createdSuppliers.push(created.id);
    }
  }

  // Seed products
  const products = [
    {
      name: "High-Flow Air Filter",
      sku: "AF-001",
      categorySlug: "filters",
      brand: "Bosch",
      vehicle: "Toyota Corolla 2009-2013",
      description: "Premium air filter for improved airflow and engine protection.",
      imageUrl: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80",
      price: 1200,
      discountPrice: 999,
      stock: 45,
      featured: true,
    },
    {
      name: "Oil Filter",
      sku: "OF-002",
      categorySlug: "filters",
      brand: "Mann-Filter",
      vehicle: "Honda Civic 2012-2016",
      description: "Reliable oil filter for clean engine oil circulation.",
      imageUrl: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=800&q=80",
      price: 650,
      stock: 80,
      featured: false,
    },
    {
      name: "Cabin Air Filter",
      sku: "CAF-003",
      categorySlug: "filters",
      brand: "Bosch",
      vehicle: "Toyota Corolla 2014-2019",
      description: "Keeps cabin air clean by filtering dust and pollen.",
      imageUrl: "https://images.unsplash.com/photo-1619642719696-114ee59b5796?auto=format&fit=crop&w=800&q=80",
      price: 850,
      stock: 60,
      featured: false,
    },
    {
      name: "Ceramic Brake Pads",
      sku: "BP-004",
      categorySlug: "braking-system",
      brand: "Akebono",
      vehicle: "Suzuki Swift 2010-2019",
      description: "Low-dust ceramic brake pads for smooth and quiet braking.",
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
      price: 3200,
      discountPrice: 2899,
      stock: 30,
      featured: true,
    },
    {
      name: "Vented Brake Disc",
      sku: "BD-005",
      categorySlug: "braking-system",
      brand: "Brembo",
      vehicle: "Toyota Corolla 2009-2013",
      description: "Vented brake disc for optimal heat dissipation.",
      imageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
      price: 4500,
      stock: 20,
      featured: true,
    },
    {
      name: "Iridium Spark Plug",
      sku: "SP-006",
      categorySlug: "engine-parts",
      brand: "NGK",
      vehicle: "Honda City 2009-2019",
      description: "Long-life iridium spark plug for efficient combustion.",
      imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80",
      price: 950,
      stock: 100,
      featured: false,
    },
    {
      name: "Engine Mount",
      sku: "EM-007",
      categorySlug: "engine-parts",
      brand: "Genuine Parts",
      vehicle: "Toyota Vitz 2005-2010",
      description: "Durable engine mount to reduce vibration.",
      imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
      price: 2100,
      stock: 25,
      featured: false,
    },
    {
      name: "Gas Shock Absorber",
      sku: "SA-008",
      categorySlug: "suspension",
      brand: "KYB",
      vehicle: "Toyota Corolla 2014-2019",
      description: "Gas-filled shock absorber for comfortable ride.",
      imageUrl: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
      price: 5800,
      discountPrice: 5299,
      stock: 18,
      featured: true,
    },
    {
      name: "Control Arm",
      sku: "CA-009",
      categorySlug: "suspension",
      brand: "Moog",
      vehicle: "Honda Civic 2006-2011",
      description: "Forged steel control arm with ball joint.",
      imageUrl: "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?auto=format&fit=crop&w=800&q=80",
      price: 3400,
      stock: 22,
      featured: false,
    },
    {
      name: "Tie Rod End",
      sku: "TRE-010",
      categorySlug: "suspension",
      brand: "Moog",
      vehicle: "Suzuki Mehran 2005-2019",
      description: "Precision tie rod end for accurate steering.",
      imageUrl: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80",
      price: 750,
      stock: 55,
      featured: false,
    },
    {
      name: "Alternator",
      sku: "ALT-011",
      categorySlug: "electrical-parts",
      brand: "Denso",
      vehicle: "Toyota Corolla 2009-2013",
      description: "High-output alternator for reliable charging.",
      imageUrl: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=800&q=80",
      price: 12500,
      stock: 12,
      featured: true,
    },
    {
      name: "Starter Motor",
      sku: "SM-012",
      categorySlug: "electrical-parts",
      brand: "Bosch",
      vehicle: "Honda Civic 2012-2016",
      description: "Reliable starter motor for quick engine starts.",
      imageUrl: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80",
      price: 8900,
      stock: 14,
      featured: false,
    },
    {
      name: "Car Battery",
      sku: "BAT-013",
      categorySlug: "electrical-parts",
      brand: "Exide",
      vehicle: "Universal",
      description: "Maintenance-free battery with strong cranking power.",
      imageUrl: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=800&q=80",
      price: 9500,
      discountPrice: 8999,
      stock: 20,
      featured: true,
    },
    {
      name: "LED Headlight Assembly",
      sku: "HL-014",
      categorySlug: "body-parts",
      brand: "Osram",
      vehicle: "Toyota Corolla 2014-2019",
      description: "Bright LED headlight assembly for enhanced visibility.",
      imageUrl: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=800&q=80",
      price: 7200,
      stock: 15,
      featured: true,
    },
    {
      name: "Tail Light",
      sku: "TL-015",
      categorySlug: "body-parts",
      brand: "TYC",
      vehicle: "Honda City 2009-2019",
      description: "OEM-style tail light replacement.",
      imageUrl: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80",
      price: 3800,
      stock: 28,
      featured: false,
    },
    {
      name: "Aluminum Radiator",
      sku: "RAD-016",
      categorySlug: "cooling-system",
      brand: "Nissens",
      vehicle: "Toyota Corolla 2010-2013",
      description: "Aluminum radiator for efficient cooling.",
      imageUrl: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=800&q=80",
      price: 8900,
      stock: 10,
      featured: true,
    },
    {
      name: "Water Pump",
      sku: "WP-017",
      categorySlug: "cooling-system",
      brand: "Gates",
      vehicle: "Honda Civic 2006-2011",
      description: "Coolant water pump for reliable engine cooling.",
      imageUrl: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80",
      price: 2600,
      stock: 24,
      featured: false,
    },
    {
      name: "Synthetic Engine Oil 4L",
      sku: "EO-018",
      categorySlug: "lubricants-maintenance",
      brand: "Liqui Moly",
      vehicle: "Universal",
      description: "Fully synthetic engine oil for extended drain intervals.",
      imageUrl: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&w=800&q=80",
      price: 5200,
      discountPrice: 4799,
      stock: 40,
      featured: true,
    },
    {
      name: "Wiper Blade Set",
      sku: "WB-019",
      categorySlug: "car-accessories",
      brand: "Bosch",
      vehicle: "Toyota Corolla 2014-2019",
      description: "Aerodynamic wiper blades for clear vision.",
      imageUrl: "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&w=800&q=80",
      price: 1100,
      stock: 70,
      featured: false,
    },
    {
      name: "Universal Car Horn",
      sku: "HORN-020",
      categorySlug: "car-accessories",
      brand: "Hella",
      vehicle: "Universal",
      description: "Loud and durable 12V car horn.",
      imageUrl: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80",
      price: 650,
      stock: 90,
      featured: false,
    },
  ];

  for (const prod of products) {
    const { categorySlug, ...rest } = prod as any;
    const created = await prisma.product.upsert({
      where: { sku: prod.sku },
      update: {},
      create: {
        ...rest,
        categoryId: createdCategories[categorySlug],
      },
    });

    // Link first supplier to every product as demo supplier relationship
    await prisma.supplierProduct.upsert({
      where: {
        supplierId_productId: {
          supplierId: createdSuppliers[0],
          productId: created.id,
        },
      },
      update: {},
      create: {
        supplierId: createdSuppliers[0],
        productId: created.id,
        supplierPrice: Number((Number(created.price) * 0.7).toFixed(2)),
        notes: "Demo supplier relationship",
      },
    });
  }

  // Seed discount codes
  const discountCodes = [
    { code: "WELCOME10", type: DiscountType.PERCENTAGE, value: 10, minOrderAmount: 2000, usageLimit: 100 },
    { code: "SAVE500", type: DiscountType.FIXED, value: 500, minOrderAmount: 5000, usageLimit: 50 },
    { code: "AUTO5", type: DiscountType.PERCENTAGE, value: 5, minOrderAmount: 1000, usageLimit: 200 },
    { code: "BULK15", type: DiscountType.PERCENTAGE, value: 15, minOrderAmount: 15000, usageLimit: 30 },
    { code: "FIRST1000", type: DiscountType.FIXED, value: 1000, minOrderAmount: 8000, usageLimit: 20 },
  ];

  for (const dc of discountCodes) {
    await prisma.discountCode.upsert({
      where: { code: dc.code },
      update: {},
      create: dc as any,
    });
  }

  console.log("Database seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
