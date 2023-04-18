import Head from "next/head";
import styles from "@/styles/Home.module.css";
import NavBar from "../components/NavBar";
import { Stack } from "@mui/system";
import Link from "next/link";
import { Box, Button } from "@mui/material";

export default function Home() {
  return (
    <>
      <Head>
        <title>Portal de Administrador</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar userName="Juan Martinez" />
      <Stack
        direction="column"
        width="100%"
        justifyContent="center"
        textAlign="center"
        height="80vh"
        p="1rem"
        spacing={2}
      >
        <h2>Bienvenid@ a tu portal de administrador</h2>
        <Box>
          <p>
            Aquí podrás encontrar tus{" "}
            <Link href="/ordenes">pedidos realizados</Link> y el status de los
            mismos.
          </p>
          <p>Recuerda que los pedidos cancelados no son sujetos a reembolso</p>
        </Box>
        <Link href="/ordenes">
          <Button variant="contained" color="info" sx={{ maxWidth: "250px" }}>
            Mis Ordenes
          </Button>
        </Link>
      </Stack>
    </>
  );
}
