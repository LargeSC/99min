import { AddressInterface, OrderInterface } from "@/types/order-interface";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
interface Product {
  Weight: number;
}

interface ReqBodyNewOrder {
  DestinationAddress: AddressInterface;
  Products: Product[];
}

type Data = {
  name: string;
};

const URL =
  "https://prueba-tecninca-backend-qndxoltwga-uc.a.run.app/orders/create";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body: OrderInterface = req.body;

  const orderMapped: ReqBodyNewOrder = {
    DestinationAddress: { ...body.address },
    Products: body.articles.map((article) => {
      return {
        Weight: article.weight,
      };
    }),
  };
  let data = {};

  if (req.method === "POST") {
    // Process a POST request
    // En produccion, el usuario y password estarían en variables de entorno
    console.log("Processing request with orderMapped :", orderMapped);
    try {
      const response = await axios.post(URL, orderMapped, {
        auth: {
          username: "j.mtz@gmail.com",
          password: "123456",
        },
      });
      data = await response.data;
      console.log("Response from API: ", data);
    } catch (e) {
      console.error(e);
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }
  res.status(200).json(data);
}
