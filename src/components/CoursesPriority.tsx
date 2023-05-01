import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Card,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
} from "@mui/material";

import { selectRemainingCourses } from "@/store/slice";
import { getCurriculumDAG } from "@/src/graph";

const CoursesPriority = () => {
  const remainingCourses = useSelector(selectRemainingCourses);

  const topologicalSort = useMemo(() => {
    const graph = getCurriculumDAG(remainingCourses);

    return graph.getTopologicalSort();
  }, [remainingCourses]);

  return (
    <Box display="flex">
      <Card sx={{ width: "250px" }}>
        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Disciplinas
            </ListSubheader>
          }
        >
          {topologicalSort.map((course) => (
            <ListItem key={course.id}>
              <ListItemText primary={course.title} />
            </ListItem>
          ))}
        </List>
      </Card>
    </Box>
  );
};

export default CoursesPriority;
