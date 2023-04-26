import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { useFetchCurriculaQuery } from "@/store/api";
import { selectCurriculum, setCurriculum } from "@/store/slice";

const CurriculumSelect = () => {
  const { data: curricula, isLoading } = useFetchCurriculaQuery();

  const dispatch = useDispatch();
  const curriculum = useSelector(selectCurriculum);

  const handleCurriculumChange = useCallback(
    (event: SelectChangeEvent) => {
      dispatch(setCurriculum(event.target.value));
    },
    [dispatch]
  );

  return (
    <FormControl fullWidth disabled={isLoading}>
      <InputLabel>Currículo</InputLabel>

      <Select
        label="Currículo"
        value={curriculum}
        onChange={handleCurriculumChange}
      >
        {curricula?.map((curriculum) => (
          <MenuItem key={curriculum} value={curriculum}>
            {curriculum}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CurriculumSelect;
