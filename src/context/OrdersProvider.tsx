import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IInvoice, IOrdersContext } from "../models";
import { useOrders } from "../hooks/useOrders";
import { useAuth } from "./AuthProvider";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

interface OrdersProviderProps {
  children: ReactNode;
}

const OrdersContext = createContext<IOrdersContext>({} as IOrdersContext);

export const OrdersProvider = ({ children }: OrdersProviderProps) => {
  const [invoices, setInvoices] = useState<IInvoice[]>([]);

  const { credentials } = useAuth();
  const {
    handleCustomer,
    customer,
    orders,
    AddOrder,
    DeleteOrderItem,
    SubmitInvoice,
  } = useOrders();

  useEffect(() => {
    const getInvoices = async () => {
      if (!credentials?.uid) return;

      const productsCollection = collection(db, "invoices");
      const q = query(productsCollection, where("uid", "==", credentials.uid));
      const docSnap = await getDocs(q);

      const fetchedInvoices = docSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as IInvoice[];

      setInvoices(fetchedInvoices);
      console.log(fetchedInvoices);
    };

    getInvoices();
  }, [credentials?.uid]);

  return (
    <OrdersContext.Provider
      value={{
        handleCustomer,
        customer,
        orders,
        AddOrder,
        DeleteOrderItem,
        SubmitInvoice,
        invoices,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useOrderContext = () => useContext(OrdersContext);
