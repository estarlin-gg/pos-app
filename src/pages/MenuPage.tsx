import { useState } from "react";

import { Input } from "../components/form/Input";
import { OrderList } from "../components/order/OrderList";
// import { Categories } from "../components/products/Categories";
import { ProductsList } from "../components/products/ProductsList";
import { FilterCategory } from "../components/FilterCategory";
export const MenuPage = () => {
  const [openOrder, setOpenOrder] = useState(false);

  const handleOpenOrder = () => setOpenOrder(!openOrder);

  return (
    <div className="w-full h-full relative ">
      <div className="grid  lg:grid-cols-7 h-full">
        <div className="col-span-1 lg:col-span-5 space-y-2 px-2 lg:pr-4">
          <div className="flex lg:hidden items-center">
            <FilterCategory />
            <Input
              type="search"
              classes="w-[90%] m input md:input-md bg-base-200"
              defaultValue={""}
              placeholder="Search product"
            />
          </div>
          <div className="bg-white h-full space-y-2">
            <h2 className="text-lg lg:text-2xl font-semibold">Product list</h2>

            <ProductsList
              mode="menu"
              classes="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-2 pb-8"
            />
          </div>
        </div>
        <div
          className={`fixed inset-x-0  top-0 h-full lg:translate-x-0 lg:relative lg:col-span-2 transition-transform duration-300 ease-in-out ${
            openOrder
              ? "translate-x-0 z-50"
              : "-translate-x-full lg:translate-y-0"
          }`}
        >
          <OrderList handleOpenOrder={handleOpenOrder} classes=" " />
        </div>
      </div>
    </div>
  );
};
