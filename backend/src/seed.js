require('dotenv').config();
const prisma = require('./db');

async function main() {
  await prisma.vendor.createMany({
    data: [
      { name: 'Acme Supplies', email: 'acme-vendor@example.com', contact: 'Alice' },
      { name: 'TechWorld', email: 'techworld@example.com', contact: 'Bob' }
    ],
    skipDuplicates: true
  });
  console.log('Seed done');
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
