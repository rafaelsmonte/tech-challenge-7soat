import { CategoryType, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const mealCategory = await prisma.categories.upsert({
    where: { id: 1 },
    update: {
      type: CategoryType.MEAL,
    },
    create: {
      type: CategoryType.MEAL,
    },
  });

  const drinkCategory = await prisma.categories.upsert({
    where: { id: 2 },
    update: {
      type: CategoryType.DRINK,
    },
    create: {
      type: CategoryType.DRINK,
    },
  });

  const sideCategory = await prisma.categories.upsert({
    where: { id: 3 },
    update: {
      type: CategoryType.SIDE,
    },
    create: {
      type: CategoryType.SIDE,
    },
  });

  const dessertCategory = await prisma.categories.upsert({
    where: { id: 4 },
    update: {
      type: CategoryType.DESSERT,
    },
    create: {
      type: CategoryType.DESSERT,
    },
  });

  console.log({
    mealCategory,
    drinkCategory,
    sideCategory,
    dessertCategory,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
