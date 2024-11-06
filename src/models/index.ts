import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

//AuthProvider
export interface IAuthContext {
  credentials: User | null;
  Register: (user: IUser) => Promise<void>;
  Login: (user: IUser) => Promise<void>;
  LogOut: () => Promise<void>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  firebaseError: string | null;
}

//ProductsProvider
export interface IProductsContext {
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  products: IProduct[];
  filteredP: IProduct[];
  categories: ICategory[];
  setModal: React.Dispatch<React.SetStateAction<string | null>>;
  modal: string | null;
  setEditedProduct: React.Dispatch<React.SetStateAction<IProduct>>;
  editedProduct: IProduct;
  CloseModal: () => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}

//OrdersProvider
export interface IOrdersContext {
  orders: IOrder[];
  invoices: IInvoice[];
  AddOrder: (product: IProduct, quantity: number) => void;
  DeleteOrderItem: (id: string) => void;
  SubmitInvoice: (pdfBlob: Blob, invoiceID: string) => Promise<void>;
  customer: string;
  handleCustomer: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

//User
export interface IUser {
  email: string;
  password: string;
}
//Product
export interface IProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  uid?: string;
  category: string;
}
//Category
export interface ICategory {
  name: string;
  uid?: string;
  id: string;
}

//Order
export interface IOrder extends IProduct {
  quantity: number;
}

//Invoice
export interface IInvoice {
  id: string;
  createdAt: Timestamp;
  customer: string;
  pdfUrl: string;
  totalPay: number;
  uid: string;
}
