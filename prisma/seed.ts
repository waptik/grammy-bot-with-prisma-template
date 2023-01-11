import { Prisma, prisma } from "./mod.ts";

const userData: Prisma.UserCreateInput[] = [
    {
        name: "Aardonyx",
    },
    {
        name: "Abelisaurus",
    },
    {
        name: "Acanthopholis",
    },
];

/**
 * Seed the database.
 */

for (const u of userData) {
    const dinosaur = await prisma.user.create({
        data: u,
    });
    console.log(`Created dinosaur with id: ${dinosaur.id}`);
}
console.log(`Seeding finished.`);

await prisma.$disconnect();
