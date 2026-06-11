import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({ select: { sku: true, name: true } });

  let updated = 0;
  let fallback = 0;

  for (const product of products) {
    const imageFileName = `${product.sku}.png`;
    const imagePath = path.join(process.cwd(), 'public', 'product_images', 'sliced', imageFileName);
    const exists = fs.existsSync(imagePath);

    const url = exists
      ? `/product_images/sliced/${imageFileName}`
      : '/static/placeholder.webp';

    await prisma.product.update({
      where: { sku: product.sku },
      data: {
        images: [{ url, alt: product.name, isPrimary: true }],
      },
    });

    if (exists) {
      updated++;
      console.log(`✅ ${product.sku}`);
    } else {
      fallback++;
      console.log(`⚠️  ${product.sku} — no image, using placeholder`);
    }
  }

  console.log(`\nDone. ${updated} images updated, ${fallback} using placeholder.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
