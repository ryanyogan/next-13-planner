import { hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { TASK_STATUS } from "@prisma/client";

function getRandomStatus() {
  const statuses = [
    TASK_STATUS.COMPLETED,
    TASK_STATUS.NOT_STARTED,
    TASK_STATUS.STARTED,
  ];

  return statuses[Math.floor(Math.random() * statuses.length)];
}

async function main() {
  await db.task.deleteMany();
  await db.project.deleteMany();
  await db.user.deleteMany();

  const user = await db.user.upsert({
    where: { email: "ryan@jk.com" },
    update: {},
    create: {
      email: "ryan@jk.com",
      firstName: "Ryan",
      lastName: "Yogan",
      passwordHash: await hashPassword("password"),
      projects: {
        create: new Array(5).fill(1).map((_, i) => ({
          name: `Project ${i}`,
          due: new Date(2022, 11, 25),
        })),
      },
    },
    include: {
      projects: true,
    },
  });

  const tasks = await Promise.all(
    user.projects.map((project) => {
      return db.task.createMany({
        data: new Array(10).fill(1).map((_, i) => {
          return {
            name: `Task ${i}`,
            ownerId: user.id,
            projectId: project.id,
            description: `Do this ${i} times.`,
            status: getRandomStatus(),
          };
        }),
      });
    })
  );

  console.log({ user, tasks });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
