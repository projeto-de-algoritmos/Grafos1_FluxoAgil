import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import curricula from "@/json/curricula.json";
import { selectCurriculumId, setCurriculum } from "@/store/slice";
import { CurriculumId } from "types";

const CurriculumSelect = () => {
  const dispatch = useDispatch();
  const curriculumId = useSelector(selectCurriculumId);

  const curriculaIds: CurriculumId[] = useMemo(() => {
    return Object.keys(curricula) as CurriculumId[];
  }, []);

  const handleCurriculumChange = useCallback(
    (event: SelectChangeEvent) => {
      dispatch(setCurriculum(event.target.value as keyof typeof curricula));
    },
    [dispatch]
  );

  return (
    <FormControl fullWidth>
      <InputLabel>Currículo</InputLabel>

      <Select
        label="Currículo"
        value={curriculumId}
        onChange={handleCurriculumChange}
      >
        {curriculaIds.map((curriculum) => (
          <MenuItem key={curriculum} value={curriculum}>
            {curriculum}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CurriculumSelect;
