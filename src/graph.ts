import { JSONCurriculum } from "types";

export class Course {
  public id: string;
  public title: string;
  public recommendedPeriod: number;
  public credits: number;

  constructor(
    id: string,
    title: string,
    recommendedPeriod: number,
    credits: number
  ) {
    this.id = id;
    this.title = title;
    this.recommendedPeriod = recommendedPeriod;
    this.credits = credits;
  }
}

export class CurriculumDAG {
  private adjacencyList: Map<Course["id"], Course[]>;
  private courses: Map<Course["id"], Course>;

  constructor() {
    this.courses = new Map();
    this.adjacencyList = new Map();
  }

  public addNode(course: Course) {
    this.courses.set(course.id, course);
    this.adjacencyList.set(course.id, []);
  }

  public addEdge(prerequisiteCourse: Course, course: Course) {
    if (!this.adjacencyList.has(prerequisiteCourse.id)) {
      this.addNode(prerequisiteCourse);
    }

    if (!this.adjacencyList.has(course.id)) {
      this.addNode(course);
    }

    this.adjacencyList.get(prerequisiteCourse.id)?.push(course);
  }

  public getAdjacencyList(): Map<Course["id"], Course[]> {
    return this.adjacencyList;
  }

  public topologicalSortUtil(
    course: Course,
    visited: Map<Course["id"], boolean>,
    topologicalSort: Course[]
  ) {
    visited.set(course.id, true);

    this.adjacencyList.get(course.id)?.forEach((adjacentCourse) => {
      if (!visited.get(adjacentCourse.id)) {
        this.topologicalSortUtil(adjacentCourse, visited, topologicalSort);
      }
    });

    topologicalSort.unshift(course);
  }

  public getSortedCoursesByRecommendedPeriod(): Course[] {
    return Array.from(this.courses.values()).sort(
      (a, b) => b.recommendedPeriod - a.recommendedPeriod
    );
  }

  public getTopologicalSort(): Course[] {
    const visited: Map<Course["id"], boolean> = new Map();
    const topologicalSort: Course[] = [];

    // Get the courses sorted by recommended period (ascending)
    const sortedCoursesByRecommendedPeriod =
      this.getSortedCoursesByRecommendedPeriod();

    // Initialize all vertices as not visited
    this.adjacencyList.forEach((_, courseId) => {
      visited.set(courseId, false);
    });

    // Call the recursive helper function to store the topological sort
    sortedCoursesByRecommendedPeriod.forEach((course) => {
      if (!visited.get(course.id)) {
        this.topologicalSortUtil(course, visited, topologicalSort);
      }
    });

    return topologicalSort;
  }

  public getCourseAdjacencyList(courseId: Course["id"]): Course[] {
    return this.adjacencyList.get(courseId) || [];
  }
}

export const getCurriculumDAG = (curriculum: JSONCurriculum): CurriculumDAG => {
  const graph = new CurriculumDAG();

  Object.keys(curriculum).forEach((courseId) => {
    const jsonCourse = curriculum[courseId];

    const course = new Course(
      courseId,
      jsonCourse.title,
      jsonCourse.period,
      jsonCourse.credits
    );

    graph.addNode(course);

    if (jsonCourse.prerequisites.length > 0) {
      jsonCourse.prerequisites.forEach((prerequisiteCourseId) => {
        const prerequisiteJSONCourse = curriculum[prerequisiteCourseId];

        if (!prerequisiteJSONCourse) {
          return;
        }

        const prerequisiteCourse = new Course(
          prerequisiteCourseId,
          prerequisiteJSONCourse.title,
          prerequisiteJSONCourse.period,
          prerequisiteJSONCourse.credits
        );

        graph.addEdge(prerequisiteCourse, course);
      });
    }
  });

  return graph;

  // const curriculum: JSONCurriculum = curricula[curriculumId];

  // Object.keys(curriculum).forEach((courseId) => {
  //   const jsonCourse = curriculum[courseId];

  //   const course = getCourseFromJSONCourse(jsonCourse);

  //   graph.addNode(course);

  //   if (jsonCourse.prerequisites.length > 0) {
  //     jsonCourse.prerequisites.forEach((courseId) => {
  //       const prerequisiteJSONCourse = curriculum[courseId];

  //       if (!prerequisiteJSONCourse) {
  //         return;
  //       }

  //       const prerequisiteCourse = getCourseFromJSONCourse(
  //         prerequisiteJSONCourse
  //       );

  //       graph.addEdge(prerequisiteCourse, course);
  //     });
  //   }
  // });

  // return graph;
};
