const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
  const username = process.env.SUPER_ADMIN_USERNAME || 'superadmin';
  const password = process.env.SUPER_ADMIN_PASSWORD || 'Admin@123';

  console.log(`🚀 Creating Super Admin with username: ${username}...`);

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const superAdmin = await prisma.user.upsert({
    where: { username: username },
    update: {
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
    create: {
      username: username,
      password: hashedPassword,
      email: 'admin@edupulse.com',
      role: 'SUPER_ADMIN',
      firstName: 'System',
      lastName: 'Administrator',
    },
  });

  console.log('✅ Super Admin account is live in the database.');
  console.log(`   Username: ${username}`);
  console.log('   Password: [Set in your .env file]');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
