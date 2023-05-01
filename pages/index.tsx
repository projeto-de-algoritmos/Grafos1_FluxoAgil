import type { NextPage } from "next";
import Head from "next/head";
import { Container, Grid } from "@mui/material";
import CurriculumSelect from "@/components/CurriculumSelect";
import CoursesAutocomplete from "@/components/CoursesAutocomplete";
import CoursesPriority from "@/components/CoursesPriority";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Fluxo Ágil</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="sm">
        <Grid container spacing={4} py={4}>
          <Grid item xs={12}>
            <CurriculumSelect />
          </Grid>

          <Grid item xs={12}>
            <CoursesAutocomplete />
          </Grid>

          <Grid item xs={12}>
            <CoursesPriority />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
