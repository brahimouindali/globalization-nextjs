// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import clientPromise from "@/utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const db = (await clientPromise).db();
    const accountsTable = db.collection("accounts");

    const { method } = req;

    if (method === "POST") {
      const account = req.body;
      const newAccount = accountsTable.insertOne(account);
      return res.json(newAccount);
    }

    const accounts = await accountsTable.find().toArray();

    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ error: "Unable to connect to database" });
  }
}
