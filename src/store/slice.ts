import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { CurriculumId, JSONCurriculum } from "types";
import curricula from "@/json/curricula.json";

export interface State {
  curriculum: CurriculumId | "";
  courses: JSONCurriculum;
  remainingCourses: JSONCurriculum;
}

const initialState: State = {
  curriculum: "",
  courses: {},
  remainingCourses: {},
};

export const mainSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setCurriculum: (state, action: PayloadAction<CurriculumId>) => {
      state.curriculum = action.payload;
      state.courses = curricula[action.payload];
      state.remainingCourses = curricula[action.payload];
    },
    setRemainingCourses: (state, action: PayloadAction<JSONCurriculum>) => {
      state.remainingCourses = action.payload;
    },
  },
});

export const { setCurriculum, setRemainingCourses } = mainSlice.actions;

export const selectCurriculumId = (state: RootState) => {
  return state.main.curriculum;
};

export const selectCurriculumCourses = (state: RootState) => {
  return state.main.courses;
};

export const selectRemainingCourses = (state: RootState) => {
  return state.main.remainingCourses;
};
