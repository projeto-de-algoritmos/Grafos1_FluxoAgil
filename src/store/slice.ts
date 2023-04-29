import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { Course } from "types";
import curricula from "@/json/curricula.json";

export interface State {
  curriculum: keyof typeof curricula | "";
  courses: Course[];
  remainingCourses: Course[];
}

const initialState: State = {
  curriculum: "",
  courses: [],
  remainingCourses: [],
};

export const mainSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setCurriculum: (state, action: PayloadAction<keyof typeof curricula>) => {
      state.curriculum = action.payload;
      state.courses = curricula[action.payload];
      state.remainingCourses = curricula[action.payload];
    },
    setRemainingCourses: (state, action: PayloadAction<Course[]>) => {
      state.remainingCourses = action.payload;
    },
  },
});

export const { setCurriculum, setRemainingCourses } = mainSlice.actions;

export const selectCurriculum = (state: RootState) => {
  return state.main.curriculum;
};

export const selectCourses = (state: RootState) => {
  return state.main.courses;
};

export const selectRemainingCourses = (state: RootState) => {
  return state.main.remainingCourses;
};
