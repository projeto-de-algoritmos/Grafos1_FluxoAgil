import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Card,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

import { selectRemainingCourses } from "@/store/slice";
import { getCurriculumDAG } from "@/src/graph";

const CoursesPriority = () => {
  const remainingCourses = useSelector(selectRemainingCourses);

  const graph = useMemo(() => {
    return getCurriculumDAG(remainingCourses);
  }, [remainingCourses]);

  const topologicalSort = useMemo(() => {
    return graph.getTopologicalSort();
  }, [graph]);

  return (
    <Box>
      <Typography variant="h5">Prioridade de disciplinas</Typography>

      <List>
        {topologicalSort.map((course) => (
          <ListItem key={course.id}>
            <ListItemAvatar>
              <Chip
                label={course.id}
                color="primary"
                variant="outlined"
                size="small"
              />
            </ListItemAvatar>
            <ListItemText primary={course.title} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CoursesPriority;
