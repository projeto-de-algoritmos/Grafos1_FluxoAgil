import type { NextApiRequest, NextApiResponse } from "next";
import curricula from "@/json/curricula.json";

type CoursesQuery = {
  curriculum: keyof typeof curricula;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { curriculum } = req.query as CoursesQuery;

  if (curriculum in curricula) {
    res.status(200).json(curricula[curriculum]);
  }
}
