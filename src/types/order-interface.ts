export interface AddressInterface {
  Coordinates: string;
  FirstName: string;
  LastName: string;
  Street: string;
  ZipCode: string;
  State: string;
  City: string;
  Neighbourhood: string;
  ExNumber: string;
  InNumber: string;
  PhoneNumber: string;
}

export interface ArticleInterface {
  id: number;
  description: string;
  weight: number;
}

export interface OrderInterface {
  id: number;
  user: string;
  articles: ArticleInterface[];
  address: AddressInterface;
  shippingId: number | null;
  isCancelled: boolean;
  isRefunded: boolean;
}

export interface OrderResponseInterface {
  Order: {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    PackageSize: "S" | "M" | "L";
    Status: "creado" | "en_proceso" | "en_camino" | "entregado" | "cancelado";
    Refund: boolean;
    DestinationAddress: {
      ID: number;
      CreatedAt: string;
      UpdatedAt: string;
      DeletedAt: string | null;
      Coordinates: string;
      FirstName: string;
      LastName: string;
      Street: string;
      ZipCode: string;
      State: string;
      City: string;
      Neighbourhood: string;
      ExNumber: string;
      InNumber: string;
      PhoneNumber: string;
      OrderID: number;
    };
    Products: {
      ID: number;
      CreatedAt: string;
      UpdatedAt: string;
      DeletedAt: string | null;
      Weight: number;
      OrderID: number;
    }[];
  };
}
