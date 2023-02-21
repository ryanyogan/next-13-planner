import { Project, User } from "@prisma/client";

export async function fetcher({
  url,
  method,
  body,
  json = true,
}: {
  url: string;
  method: "POST" | "GET";
  body: any;
  json?: boolean;
}) {
  const res = await fetch(url, {
    method,
    body: body && JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("API Error");
  }

  if (json) {
    const data = await res.json();
    return data;
  }
}

export async function register(user: Partial<User>) {
  return fetcher({
    url: "/api/register",
    method: "POST",
    body: user,
    json: false,
  });
}

export async function signin(user: Partial<User>) {
  return fetcher({
    url: "/api/signin",
    method: "POST",
    body: user,
    json: false,
  });
}

export async function createNewProject({
  name,
  description,
}: Partial<Project>) {
  return fetcher({
    url: "/api/project",
    method: "POST",
    body: { name, description },
  });
}
