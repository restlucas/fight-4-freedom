import { PrismaClient, Role, Status } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@admin.com";

  await prisma.user.upsert({
    where: { username: "melansia" },
    update: {},
    create: {
      name: "[F4F] melansia",
      username: "melansia",
      password: await bcrypt.hash("slvlucas1", 10),
      ea_id: "RRRRRRRREST",
      role: Role.ADMIN,
      status: Status.ACTIVE,
      platform: "PC",
    },
  });

  console.log("✅ Usuário admin melansia garantido");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
