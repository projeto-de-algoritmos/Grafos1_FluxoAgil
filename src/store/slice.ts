import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

export interface State {
  curriculum: string;
}

const initialState: State = {
  curriculum: "",
};

export const mainSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setCurriculum: (state, action: PayloadAction<string>) => {
      state.curriculum = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurriculum } = mainSlice.actions;

export const selectCurriculum = (state: RootState) => state.main.curriculum;
