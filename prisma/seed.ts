// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid';
// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const post1 = await prisma.operation.upsert({
    where: { id: 1 },
    update: {},
    create: {
      ip: '127.0.0.1',
      companyCode: 'test',
      uuid: uuid(),
    },
  });

  console.log({ post1 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
