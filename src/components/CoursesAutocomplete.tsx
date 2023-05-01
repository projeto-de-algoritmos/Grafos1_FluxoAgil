import { SyntheticEvent, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, TextField } from "@mui/material";

import {
  selectCurriculumCourses,
  selectCurriculumId,
  setRemainingCourses,
} from "@/store/slice";
import { JSONCourse } from "types";

type Course = JSONCourse & { id: string };

const CoursesAutocomplete = () => {
  const dispatch = useDispatch();

  const curriculumId = useSelector(selectCurriculumId);
  const curriculumCourses = useSelector(selectCurriculumCourses);

  const courses = useMemo(() => {
    return Object.entries(curriculumCourses).map(([id, course]) => ({
      id,
      ...course,
    }));
  }, [curriculumCourses]);

  const handleCoursesChange = useCallback(
    (_: SyntheticEvent<Element, Event>, concludedCourses: Course[]) => {
      const concludedCoursesIds = concludedCourses.map((course) => course.id);

      const remainingCourses = Object.fromEntries(
        Object.entries(curriculumCourses).filter(
          ([id]) => !concludedCoursesIds.includes(id)
        )
      );

      dispatch(setRemainingCourses(remainingCourses));
    },
    [curriculumCourses, dispatch]
  );

  return (
    <Autocomplete
      disabled={!curriculumId}
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
