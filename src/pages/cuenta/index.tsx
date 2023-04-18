import { mockUser } from "@/stubs/user";
import { Stack, TextField } from "@mui/material";
import NavBar from "../../components/NavBar";

export default function AccountInformation() {
  const {
    FirstName: firstName,
    LastName: lastName,
    Street: street,
    ZipCode: zipCode,
    State: state,
    City: city,
    Neighbourhood: neighbourhood,
    ExNumber: exNumber,
    InNumber: inNumber,
    PhoneNumber: phoneNumber,
  } = mockUser;

  return (
    <>
      <NavBar userName="Juan Martinez" />
      <Stack margin="2rem" spacing={2} alignItems="center">
        <h3>Información de la cuenta:</h3>
        <Stack direction="row" spacing={2}>
          <TextField
            disabled
            id="standard-disabled"
            label="Nombre"
            defaultValue={firstName}
            variant="standard"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="Apellido"
            defaultValue={lastName}
            variant="standard"
          />
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField
            disabled
            id="standard-disabled"
            label="Calle"
            defaultValue={street}
            variant="standard"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="N° Exterior"
            defaultValue={exNumber}
            variant="standard"
          />
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField
            disabled
            id="standard-disabled"
            label="Ciudad"
            defaultValue={city}
            variant="standard"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="Codigo Postal"
            defaultValue={zipCode}
            variant="standard"
          />
        </Stack>
      </Stack>
    </>
  );
}
