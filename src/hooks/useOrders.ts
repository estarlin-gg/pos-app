import { useState } from "react";
import { IOrder, IProduct } from "../models";
import { db, storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthProvider";
import Swal from "sweetalert2";

export const useOrders = () => {
  const { credentials, setLoading } = useAuth();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [customer, setCustomer] = useState("unknown");

  const handleCustomer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer(e.target.value);
  };

  const AddOrder = (product: IProduct, quantity: number) => {
    const existingOrder = orders.find((order) => order.id === product.id);

    if (existingOrder) {
      const updatedOrders = orders
        .map((order) =>
          order.id === product.id ? { ...order, quantity } : order
        )
        .filter((order) => order.quantity > 0);
      setOrders(updatedOrders);
    } else {
      const newOrder: IOrder = { ...product, quantity };
      setOrders([...orders, newOrder]);
    }
  };

  const DeleteOrderItem = (id: string) => {
    const filtered = orders.filter((o) => o.id !== id);
    setOrders(filtered);
  };

  const UploadPDF = async (pdfBlob: Blob, invoiceID: string) => {
    try {
      const fileRef = ref(
        storage,
        `${credentials?.uid}/invoices/${invoiceID}.pdf`
      );
      const uploadTask = await uploadBytes(fileRef, pdfBlob);
      const downloadUrl = await getDownloadURL(uploadTask.ref);
      return downloadUrl;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const SubmitInvoice = async (pdfBlob: Blob, invoiceID: string) => {
    setLoading(true);

    const pdfUrl = await UploadPDF(pdfBlob, invoiceID);

    if (pdfUrl) {
      try {
        const totalPayment = orders.reduce(
          (total, order) => total + order.price * order.quantity,
          0
        );
        const tax = totalPayment * 0.1;
        const finalTotal = totalPayment + tax;

        await setDoc(doc(db, "invoices", invoiceID), {
          id: invoiceID,
          uid: credentials?.uid,
          customer,
          totalPay: finalTotal,
          pdfUrl,
          createdAt: new Date(),
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        Swal.fire({
          title: "Successful payment!",
          icon: "success",
        });
      }
    }
  };

  return {
    handleCustomer,
    customer,
    orders,
    AddOrder,
    DeleteOrderItem,
    SubmitInvoice,
  };
};
