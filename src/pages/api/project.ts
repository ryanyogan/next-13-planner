import { validateJWT } from "@/lib/auth";
import { db } from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const cookieName = process.env.COOKIE_NAME;
    if (!cookieName) {
      throw new Error("COOKIE_NAME must be set");
    }
    const user = await validateJWT(req.cookies[cookieName]);

    await db.project.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        ownerId: user.id,
      },
    });

    res.status(201).json({ data: { created: true } });
  } else {
    res.status(402);
    res.end();
  }
}
