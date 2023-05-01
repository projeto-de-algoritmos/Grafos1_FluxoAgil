import curricula from "@/json/curricula.json";

export type CurriculumId = keyof typeof curricula;

export type JSONCurriculum = {
  [key: string]: JSONCourse;
};

export type JSONCourse = {
  title: string;
  prerequisites: string[];
  period: number;
  credits: number;
};
