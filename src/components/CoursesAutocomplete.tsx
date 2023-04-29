import { useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { Autocomplete, Box, Chip, TextField, Typography } from "@mui/material";
import { useFetchCoursesQuery } from "@/store/api";
import { selectCurriculum } from "@/store/slice";

const CoursesAutocomplete = () => {
  const curriculum = useSelector(selectCurriculum);
  const { data: courses } = useFetchCoursesQuery(curriculum ?? skipToken);

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
    />
  );
};

export default CoursesAutocomplete;
