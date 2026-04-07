import { prisma } from './src/lib/prisma';
async function main() {
  try {
    const users = await prisma.user.findMany();
    console.log('Success!', users);
  } catch (err) {
    console.error('ERROR:', err);
  }
}
main();
