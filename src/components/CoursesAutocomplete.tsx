import { SyntheticEvent, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, Box, Chip, TextField, Typography } from "@mui/material";

import {
  selectCourses,
  selectCurriculum,
  setRemainingCourses,
} from "@/store/slice";
import { Course } from "types";

const CoursesAutocomplete = () => {
  const dispatch = useDispatch();

  const curriculum = useSelector(selectCurriculum);
  const courses = useSelector(selectCourses);

  const handleCoursesChange = useCallback(
    (_: SyntheticEvent<Element, Event>, concludedCourses: Course[]) => {
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
      renderOption={(props, course) => {
        return (
          <li {...props} key={course.id}>
            <Box minWidth="90px">
              <Chip label={course.id} size="small" />
            </Box>

            <Typography variant="body2">{course.title}</Typography>
          </li>
        );
      }}
      getOptionLabel={(course) => course.id}
      onChange={handleCoursesChange}
    />
  );
};

export default CoursesAutocomplete;
