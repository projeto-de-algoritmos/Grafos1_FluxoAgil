import type { NextPage } from "next";
import Head from "next/head";
import { Container } from "@mui/material";
import CurriculumSelect from "@/components/CurriculumSelect";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Fluxo Ágil</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="sm">
        <CurriculumSelect />
      </Container>
    </>
  );
};

export default Home;
