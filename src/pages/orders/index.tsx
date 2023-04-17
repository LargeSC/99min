import styles from "@/styles/Orders.module.css";
import NavBar from "../../components/NavBar";
import { mockOrders } from "@/stubs/orders";
import { useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { OrderInterface } from "@/types/order-interface";
import axios from "axios";

const env = process.env.NODE_ENV;
const API_URL = env === "production" ? "/api/" : "http://localhost:3000/api/";

export default function Orders() {
  const [orders, setOrders] = useState(mockOrders);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [isCancelledConfirmation, setIsCancelledConfirmation] =
    useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderInterface | null>(
    null
  );

  const checkOrderStatus = async (order: OrderInterface) => {
    setIsRefreshing(true);
    const response = await axios.get(`${API_URL}get-order/${order.id}`);
    const orderStatus = await response.data?.Order?.Status;
    if (orderStatus === "cancelado") {
      setOrders((prevOrders) => {
        const newOrders = prevOrders.map((prevOrder) => {
          if (prevOrder.id === order.id) {
            return { ...prevOrder, isCancelled: true };
          }
          return prevOrder;
        });
        return newOrders;
      });
    }
    setIsRefreshing(false);
  };

  const requestShipment = async (order: OrderInterface) => {
    setIsRefreshing(true);
    console.log("Pedido solicitado para la orden: ", order);
    const response = await axios.post(`${API_URL}create-order`, order);
    const shippingId = await response.data?.Order?.ID;
    setOrders((prevOrders) => {
      const newOrders = prevOrders.map((prevOrder) => {
        if (prevOrder.id === order.id) {
          return { ...prevOrder, shippingId: shippingId };
        }
        return prevOrder;
      });
      return newOrders;
    });
    setIsRefreshing(false);
  };

  const cancelShipment = async (order: OrderInterface) => {
    setIsRefreshing(true);
    setSelectedOrder(order);
    if (!isCancelledConfirmation) {
      setOpenAlert(true);
      setIsRefreshing(false);
    } else {
      setIsCancelledConfirmation(false);
      const response = await axios.put(`${API_URL}cancel-order`, order);
      if (response.status === 200) {
        setOrders((prevOrders) => {
          const newOrders = prevOrders.map((prevOrder) => {
            if (prevOrder.id === order.id) {
              return { ...prevOrder, isCancelled: true };
            }
            return prevOrder;
          });
          return newOrders;
        });
      }
      console.log(response);
    }
    setIsRefreshing(false);
  };

  const updateOrders = () => {
    console.log("Actualizando ordenes");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleClose = () => {
    setOpenAlert(false);
  };

  const handleConfirm = () => {
    setIsCancelledConfirmation(true);
    console.log("Handle Confirm - Cancelando orden: ", selectedOrder);
    cancelShipment(selectedOrder as OrderInterface);
    setOpenAlert(false);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  return (
    <>
      <NavBar userName="Juan Martinez" />
      <Container maxWidth="md" sx={{ marginTop: "1rem" }}>
        <Stack direction="column" spacing={2}>
          <h3>Tus ordenes disponibles: </h3>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>ID</StyledTableCell>
                    <StyledTableCell>Nombre</StyledTableCell>
                    <StyledTableCell># Art</StyledTableCell>
                    <StyledTableCell>Dirección</StyledTableCell>
                    <StyledTableCell># Rastreo</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow
                      key={order.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {order.id}
                      </TableCell>
                      <TableCell>{order.user}</TableCell>
                      <TableCell>{order.articles.length}</TableCell>
                      <TableCell>
                        {`${order.address.Street} ${order.address.ExNumber}`}{" "}
                      </TableCell>
                      {order.shippingId ? (
                        <TableCell>{order.shippingId}</TableCell>
                      ) : (
                        <TableCell
                          className={styles.link}
                          onClick={() => requestShipment(order)}
                        >
                          {"Solicitar envío"}
                        </TableCell>
                      )}

                      {order.shippingId && !order.isCancelled ? (
                        <TableCell>
                          <Box
                            display="flex"
                            justifyContent="flex-start"
                            alignItems="center"
                          >
                            Activa
                            <DeleteOutlineIcon
                              onClick={() => cancelShipment(order)}
                            />
                          </Box>
                        </TableCell>
                      ) : order.isCancelled ? (
                        <TableCell>Cancelada sin Reembolso</TableCell>
                      ) : (
                        <TableCell>Pendiente de creación</TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <Button
            variant="contained"
            onClick={updateOrders}
            color="info"
            sx={{ maxWidth: "250px" }}
          >
            Actualizar ordenes
          </Button>
        </Stack>
      </Container>

      <Dialog
        open={openAlert}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Estás seguro de eliminar esta orden?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tu orden no aplica para un reembolso. Si cancelas perderás tu
            dinero.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>NO, Me equivoqué</Button>
          <Button onClick={handleConfirm} autoFocus>
            Sí, Cancelar
          </Button>
        </DialogActions>
      </Dialog>

      {isRefreshing && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
          onClick={() => setIsRefreshing(false)}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
}