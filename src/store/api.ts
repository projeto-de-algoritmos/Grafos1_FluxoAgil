import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Course } from "types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    fetchCurricula: builder.query<string[], void>({
      query: () => "/curricula",
    }),
    fetchCourses: builder.query<Course[], string>({
      query: (curriculumId) => `/courses?curriculum=${curriculumId}`,
    }),
  }),
});

export const { useFetchCurriculaQuery, useFetchCoursesQuery } = api;
