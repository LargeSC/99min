import { AddressInterface, OrderInterface } from "@/types/order-interface";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
interface Product {
  Weight: number;
}

type Data = {
  name: string;
};

const URL = "https://prueba-tecninca-backend-qndxoltwga-uc.a.run.app/orders/";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body: OrderInterface = req.body;
  const shippingId = body.shippingId;

  let data = {};

  if (req.method === "PUT") {
    // Process a PUT request
    // En produccion, el usuario y password estarían en variables de entorno
    try {
      const response = await axios.put(
        `${URL}${shippingId}/cancelado`,
        {},
        {
          auth: {
            username: "j.mtz@gmail.com",
            password: "123456",
          },
        }
      );
      data = await response.data;
    } catch (e) {
      console.error(e);
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }
  res.status(200).json(data);
}
