import { delay } from "@/lib/async";
import { getUserFromCookie } from "@/lib/auth";
import { cookies } from "next/headers";
import { Button } from "./button";
import { Card } from "./card";

async function getData() {
  await delay(500);
  const user = await getUserFromCookie(cookies());
  return user;
}
export async function Hero() {
  const user = await getData();

  return (
    <Card className="w-full py-4 relative">
      <div className="mb-4">
        <h1 className="text-3xl text-gray-700 font-bold mb-4">
          Hello, {user?.firstName}!
        </h1>
        <h4 className="text-xl text-gray-400">
          Check your daily tasks and schedule
        </h4>
      </div>
      <div>
        <Button size="large">Today&apos;s Schedule</Button>
      </div>
    </Card>
  );
}
