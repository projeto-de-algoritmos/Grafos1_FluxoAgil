import type { NextApiRequest, NextApiResponse } from "next";
import curricula from "@/json/curricula.json";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(Object.keys(curricula));
}
