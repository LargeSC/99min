import { Avatar } from "@mui/material";
import styles from "@/styles/NavBar.module.css";
import { Container, Stack, Box } from "@mui/system";
import Link from "next/link";

const NavBar = ({ userName }) => {
  // get the initials from the userName
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      spacing={2}
      p="16px"
      boxShadow="0 2px 4px rgba(0, 0, 0, 0.15);"
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Link href="/">Inicio</Link>
        <Link href="/orders">Mis Ordenes</Link>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Link href="/cuenta">
          <Avatar>{initials}</Avatar>
        </Link>
        <Box display={["none", "block"]}>
          <Link href="/cuenta">{userName ? userName : "Log-in"}</Link>
        </Box>
      </Stack>
    </Stack>
  );
};

export default NavBar;
