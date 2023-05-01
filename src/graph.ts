import { JSONCourse } from "types";

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

  public getTopologicalSort(): Course[] {
    const visited: Map<Course["id"], boolean> = new Map();
    const topologicalSort: Course[] = [];

    this.courses.forEach((course) => {
      visited.set(course.id, false);
    });

    this.courses.forEach((course) => {
      if (!visited.get(course.id)) {
        this.topologicalSortUtil(course, visited, topologicalSort);
      }
    });

    return topologicalSort;
  }
}

const getCourseFromJSONCourse = (jsonCourse: JSONCourse): Course => {
  return new Course(
    jsonCourse.id,
    jsonCourse.title,
    jsonCourse.period,
    jsonCourse.credits
  );
};

export const getCurriculumDAG = (courses: JSONCourse[]): CurriculumDAG => {
  const graph = new CurriculumDAG();

  courses.forEach((jsonCourse) => {
    const course = getCourseFromJSONCourse(jsonCourse);

    graph.addNode(course);

    if (jsonCourse.prerequisites.length > 0) {
      jsonCourse.prerequisites.forEach((courseId) => {
        const prerequisiteJSONCourse = courses.find(
          (jsonCourse) => jsonCourse.id === courseId
        );

        if (!prerequisiteJSONCourse) {
          return;
        }

        const prerequisiteCourse = getCourseFromJSONCourse(
          prerequisiteJSONCourse
        );

        graph.addEdge(prerequisiteCourse, course);
      });
    }
  });

  return graph;
};
