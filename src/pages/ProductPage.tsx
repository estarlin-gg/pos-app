import { Button } from "../components/Button";
import { Input } from "../components/form/Input";
import { ProductsList } from "../components/products/ProductsList";
import { CreateCategory } from "../components/form/CreateCategory";
import { FormProduct } from "../components/form/FormProduct";
import { useProductsContext } from "../context/ProductsProvider";
import { Categories } from "../components/products/Categories";
import { FilterCategory } from "../components/FilterCategory";

export const ProductPage = () => {
  const { modal, setModal } = useProductsContext();

  return (
    <>
      <div className="py-1">
        <div className="flex lg:hidden items-center ">
          <FilterCategory />
          <Input
            type="search"
            classes="w-[90%] m input md:input-md bg-base-200"
            defaultValue={""}
            placeholder="Search product"
          />
        </div>
        <Categories mode={"edit"} />
        <div className="space-y-2 ">
          <div className="flex justify-between items-center py-2 border-b-2  ">
            <h2 className="text-lg lg:text-2xl font-semibold">Product list</h2>
            <div className="flex flex-row gap-2 items-center">
              <Input
                type="search"
                classes="hidden lg:block input md:input-md bg-gray-200"
                defaultValue={""}
              />
              <Button
                text="Add category"
                classes="btn btn-sm btn-success lg:btn-md"
                onClick={() => setModal("category")}
              />
              <Button
                text="Add product"
                classes="btn btn-sm btn-info lg:btn-md "
                onClick={() => setModal("product")}
              />
            </div>
          </div>

          <ProductsList
            mode="edit"
            classes="min-h-[70dvh] lg:h-[60dvh] grid-cols-1 p-2 sm:grid-cols-2  lg:grid-cols-4 w-full gap-2"
          />
        </div>
      </div>

      {modal === "category" && <CreateCategory />}
      {modal === "product" && <FormProduct />}
    </>
  );
};
