import { comparePasswords, createJWT } from "@/lib/auth";
import { db } from "@/lib/db";
import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if (
      typeof req.body.email !== "string" ||
      typeof req.body.password !== "string"
    ) {
      res.status(401);
      return res.json({ error: "Missing Email/Password" });
    }

    const user = await db.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      res.status(401);
      return res.json({ error: "Invalid Login" });
    }

    const isUser = await comparePasswords(req.body.password, user.passwordHash);

    if (isUser) {
      const jwt = await createJWT(user);
      res.setHeader(
        "Set-Cookie",
        serialize(process.env.COOKIE_NAME!, jwt, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        })
      );

      res.status(201);
      res.end();
    } else {
      res.status(401);
      res.json({ error: "Invalid Login" });
    }
  } else {
    res.status(402);
    res.end();
  }
}
