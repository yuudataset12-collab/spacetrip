import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Try finding a user, mostly just testing DB.
  console.log("Seeding database...")

  const kaosCategory = await prisma.category.upsert({
    where: { slug: 'kaos' },
    update: {},
    create: { name: 'Kaos', slug: 'kaos' },
  })

  const celanaCategory = await prisma.category.upsert({
    where: { slug: 'celana' },
    update: {},
    create: { name: 'Celana', slug: 'celana' },
  })

  const kemejaCategory = await prisma.category.upsert({
    where: { slug: 'kemeja' },
    update: {},
    create: { name: 'Kemeja', slug: 'kemeja' },
  })

  await prisma.product.upsert({
    where: { slug: 'basic-oversize-tee' },
    update: {},
    create: {
      name: 'Basic Oversize Tee (Black)',
      slug: 'basic-oversize-tee',
      description: 'The essential oversized t-shirt for your everyday casual style. 100% Cotton.',
      price: 150000,
      stock: 50,
      categoryId: kaosCategory.id,
      imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=60'
    }
  })

  await prisma.product.upsert({
    where: { slug: 'vintage-washed-denim' },
    update: {},
    create: {
      name: 'Vintage Washed Denim',
      slug: 'vintage-washed-denim',
      description: 'Classic straight cut denim with vintage washed details. Perfect for daily wear.',
      price: 350000,
      stock: 30,
      categoryId: celanaCategory.id,
      imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=500&q=60'
    }
  })

  await prisma.product.upsert({
    where: { slug: 'flannel-shirt-boxy' },
    update: {},
    create: {
      name: 'Flannel Shirt Boxy Fit',
      slug: 'flannel-shirt-boxy',
      description: 'Boxy fit flannel shirt with premium fabric. Great for layering.',
      price: 220000,
      stock: 40,
      categoryId: kemejaCategory.id,
      imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?auto=format&fit=crop&w=500&q=60'
    }
  })

  console.log("Database seeded successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
