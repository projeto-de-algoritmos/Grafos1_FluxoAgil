import { SyntheticEvent, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, Box, Chip, TextField, Typography } from "@mui/material";

import {
  selectCourses,
  selectCurriculum,
  setRemainingCourses,
} from "@/store/slice";
import { JSONCourse } from "types";

const CoursesAutocomplete = () => {
  const dispatch = useDispatch();

  const curriculum = useSelector(selectCurriculum);
  const courses = useSelector(selectCourses);

  const handleCoursesChange = useCallback(
    (_: SyntheticEvent<Element, Event>, concludedCourses: JSONCourse[]) => {
      const remainingCourses = courses.filter(
        (course) => !concludedCourses.includes(course)
      );

      dispatch(setRemainingCourses(remainingCourses));
    },
    [dispatch, courses]
  );

  return (
    <Autocomplete
      disabled={!curriculum}
      disableCloseOnSelect
      multiple
      options={courses ?? []}
      renderInput={(params) => <TextField {...params} label="Disciplinas" />}
      getOptionLabel={(course) => course.title}
      onChange={handleCoursesChange}
    />
  );
};

export default CoursesAutocomplete;
