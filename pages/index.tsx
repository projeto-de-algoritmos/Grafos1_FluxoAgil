import type { NextPage } from "next";
import Head from "next/head";
import {
  Box,
  Container,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
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

      <Box my={3}>
        <Container maxWidth="md">
          <Box mb={3}>
            <Typography variant="h4">Priorizador de disciplinas</Typography>

            <Typography variant="subtitle1" color="text.secondary">
              Saiba quais disciplinas você deve cursar primeiro.
            </Typography>
          </Box>

          <Stepper orientation="vertical">
            <Step active>
              <StepLabel>Selecione seu currículo</StepLabel>

              <StepContent>
                <CurriculumSelect />
              </StepContent>
            </Step>

            <Step active>
              <StepLabel>Selecione as disciplinas que você já cursou</StepLabel>

              <StepContent>
                <CoursesAutocomplete />
              </StepContent>
            </Step>

            <Step active>
              <StepLabel>Recomendação de prioridade de disciplinas</StepLabel>

              <StepContent>
                <CoursesPriority />
              </StepContent>
            </Step>
          </Stepper>
        </Container>
      </Box>
    </>
  );
};

export default Home;
