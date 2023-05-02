import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Chip,
  Divider,
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
    <List>
      {topologicalSort.map((course, index) => (
        <>
          {index > 0 && <Divider component="li" />}
          <ListItem key={course.id} disableGutters>
            <ListItemAvatar>
              <Chip
                sx={{ minWidth: "83px" }}
                label={course.id}
                color="primary"
              />
            </ListItemAvatar>

            <ListItemText
              primary={course.title}
              secondary={
                <>
                  <Typography variant="body2" color="text.secondary">
                    {`Recomendada no ${course.recommendedPeriod}º período.`}
                  </Typography>

                  {graph.getCourseAdjacencyList(course.id).length > 0 && (
                    <Box mt={1}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Tranca as disciplinas:
                      </Typography>

                      <Box mt={1}>
                        {graph
                          .getCourseAdjacencyList(course.id)
                          .map((prerequisite) => (
                            <Chip
                              key={prerequisite.id}
                              sx={{ mr: 1 }}
                              label={prerequisite.id}
                              color="secondary"
                              size="small"
                              variant="outlined"
                            />
                          ))}
                      </Box>
                    </Box>
                  )}
                </>
              }
              inset
            />
          </ListItem>
        </>
      ))}
    </List>
  );
};

export default CoursesPriority;
