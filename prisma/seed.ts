import { PrismaClient, TaskStatus } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();
const salt = process.env.BCRYPT_SALT as string

async function main() {
  const password = await hash("secret123", salt);
  const user = await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      email: "admin@admin.com",
      name: "Admin",
      password,
    },
  });
  const data = Array.from({ length: 400 }, (_, i) => ({
    description: `Task ${i + 1}`,
    status: TaskStatus.pending,
    name: `Task ${i + 1}`,
    userId: user.id,
  }));
  const tasks = await prisma.task.createMany({
    data,
  });
  console.log({ user, tasks });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
