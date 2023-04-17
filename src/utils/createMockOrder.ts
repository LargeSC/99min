import { mockUser } from "@/stubs/user";
import { OrderInterface } from "@/types/order-interface";

const createMockOrder = (orders: OrderInterface[]) => {
  const nextId = orders.length + 1;

  const randInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const article = {
    id: 1001,
    description: "Product Random",
    weight: randInt(1, 5),
  };

  const articles = new Array(randInt(1, 5)).fill(article);

  const mockOrder: OrderInterface = {
    id: nextId,
    user: "Juan Martinez",
    articles: articles,
    address: { ...mockUser },
    shippingId: null,
    isCancelled: false,
    isRefunded: false,
  };

  return mockOrder;
};

export default createMockOrder;
