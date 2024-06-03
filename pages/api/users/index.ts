// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import clientPromise from "@/utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const db = (await clientPromise).db();
    const usersTable = db.collection("users");

    const { method } = req;

    if (method === "POST") {
      const user = req.body;
      const newUser = usersTable.insertOne(user);

      return res.json(newUser);
    }

    const users = await usersTable.find().toArray();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Unable to connect to database" });
  }
}
