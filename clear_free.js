const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Nullifying FREE plans in School and SubscriptionInvoice...');
  await prisma.$executeRawUnsafe(`UPDATE "School" SET "plan" = NULL WHERE "plan"::text = 'FREE'`);
  await prisma.$executeRawUnsafe(`UPDATE "SubscriptionInvoice" SET "plan" = NULL WHERE "plan"::text = 'FREE'`);
  console.log('Done.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
