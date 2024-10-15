/* eslint-disable react-hooks/exhaustive-deps */
import { useOrderContext } from "../../context/OrdersProvider";
import { Button } from "../Button";
import { Input } from "../form/Input";
import { OrderItem } from "./OrderItem";
import { pdf } from "@react-pdf/renderer";
import { InvoicePDF } from "../InvoicePDF";
import { uid } from "uid";
import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";

interface OrderList {
  classes: string;
  handleOpenOrder: () => void;
}

export const OrderList = ({ classes, handleOpenOrder }: OrderList) => {
  const [randomID, setRandomID] = useState("");
  const { orders, SubmitInvoice, customer, handleCustomer } = useOrderContext();
  const invoiceID = uid();

  useEffect(() => {
    setRandomID(invoiceID);
  }, []);

  const subtotal = orders.map((o) => o.price * o.quantity);
  const totalPay = subtotal.reduce((acc, subtotal) => acc + subtotal, 0);
  const tax = totalPay * 0.1;
  const payWithTax = parseFloat((totalPay + tax).toFixed(2));

  const handleGenerateAndUploadPDF = async () => {
    if (orders.length <= 0) {
      return;
    }
    try {
      const pdfBlob = await pdf(
        <InvoicePDF
          customer={customer}
          orders={orders}
          totalPay={totalPay}
          tax={tax}
          payWithTax={payWithTax}
          invoiceID={randomID}
        />
      ).toBlob();
      console.log(pdfBlob);

      if (pdfBlob) {
        await SubmitInvoice(pdfBlob, randomID);
      }
    } catch (error) {
      console.error("Error en handleGenerateAndUploadPDF:", error);
    }
  };

  return (
    <div
      className={`${classes} relative z-50 h-screen bg-white bg-  border-l p-4`}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Order Detail</h2>
        <Button
          classes="btn btn-sm btn-circle btn-ghost z-50 lg:hidden "
          onClick={handleOpenOrder}
        >
          <CgClose size={30} />
        </Button>
      </div>
      <div className="w-full shadow p-4 rounded-lg flex flex-col gap-3">
        <div className="">
          <span className="text-gray-400">
            Customer name:{" "}
            <span className="capitalize text-black font-medium">
              {customer}
            </span>
          </span>
        </div>
        <Input
          onChange={handleCustomer}
          type="text"
          classes="border-2 border-gray-300 input-sm"
        />
      </div>
      <div className="divider"></div>
      <div className="overflow-auto no-scrollbar flex flex-col gap-2 h-[50%] lg:h-[38%] pb-2">
        {orders.length > 0 ? (
          orders.map((o) => (
            <OrderItem
              key={o.id}
              id={o.id}
              name={o.name}
              price={o.price}
              quantity={o.quantity}
              imageUrl={o.image}
            />
          ))
        ) : (
          <p className="text-center mt-4">There are no products in the order.</p>
        )}
      </div>
      <div className="absolute bottom-0 lg:bottom-14 bg-slate-50 px-4 py-2 left-0 right-0 flex flex-col">
        <div className="space-y-1">
          <h4 className="flex justify-between text-sm font-medium capitalize text-black ">
            <span className="text-gray-500 ">Subtotal</span> $
            {totalPay.toFixed(2)}
          </h4>
          <h4 className="flex justify-between text-sm font-medium capitalize text-black ">
            <span className="text-gray-500 ">Tax 10%</span> ${tax.toFixed(2)}
          </h4>
          <div className="divider"></div>
          <div className="space-y-2 pb-2">
            <h2 className="text-lg font-bold capitalize flex justify-between items-center">
              <span>Pay</span>
              {payWithTax.toFixed(2)}
            </h2>

            <Button
              classes="w-full btn btn-primary"
              text={`Pay ${payWithTax}`}
              onClick={handleGenerateAndUploadPDF}
              disabled={orders.length <= 0 ? true : false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
