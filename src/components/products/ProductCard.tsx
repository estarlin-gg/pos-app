import { useState } from "react";
import { Button } from "../Button";
import { IoAdd } from "react-icons/io5";
import { IProduct } from "../../models";
import { useOrderContext } from "../../context/OrdersProvider";
import { ProductCounter } from "./ProductCounter";
import { useProducts } from "../../hooks/useProducts";
import { useProductsContext } from "../../context/ProductsProvider";

interface Props {
  id: string;
  image: string;
  price: number;
  name: string;
  category: string;
  mode: string;
}

export const ProductCard = ({
  id,
  image,
  price,
  name,
  category,
  mode,
}: Props) => {
  const { orders, AddOrder } = useOrderContext();
  const { DeleteProduct } = useProducts();
  const { setEditedProduct, setModal } = useProductsContext();
  const [count, setCount] = useState(0);
  const data: IProduct = { id, image, price, name, category };
  const orderExist = orders.find((o) => o.id === id);

  const handleAdd = () => {
    setCount(count + 1);
    AddOrder(data, count + 1);
  };

  const handleRemove = () => {
    if (count > 0) {
      setCount(count - 1);
      AddOrder(data, count - 1);
    }
  };

  return (
    <div className="flex flex-col border rounded-xl max-h-[350px]  p-2 gap-2 ">
      <figure className="w-full flex justify-center">
        <img
          src={image}
          alt={name}
          className="w-[95%] min-h-[200px] max-h-[200px] rounded-lg"
        />
      </figure>
      <div className="">
        <h2 className="text-lg font-semibold capitalize">
          <span>{name}</span>
          <span className="text-gray-400">(${price})</span>
        </h2>
      </div>
      <div className="mt-auto flex justify-between items-center gap-4">
        {mode === "menu" ? (
          count <= 0 || !orderExist ? (
            <Button
              onClick={handleAdd}
              classes="btn btn-primary text-lg rounded-2xl w-full"
              text="Choose"
            >
              <IoAdd size={23} />
            </Button>
          ) : (
            <ProductCounter
              count={count}
              handleAdd={handleAdd}
              handleRemove={handleRemove}
            />
          )
        ) : mode === "edit" ? (
          <>
            <Button
              text="Edit"
              onClick={() => {
                setEditedProduct(data);
                setModal("product");
              }}
              classes="btn btn-primary w-[40%]"
            />
            <Button
              text="Delete"
              onClick={() => DeleteProduct(id, image)}
              classes="btn btn-error w-[40%]"
            />
          </>
        ) : null}
      </div>
    </div>
  );
};
