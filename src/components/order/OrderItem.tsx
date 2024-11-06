import { FaRegTrashAlt } from "react-icons/fa";
import { Button } from "../Button";
import { useOrderContext } from "../../context/OrdersProvider";

interface CartItemProps {
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  id: string;
}

export const OrderItem = ({
  name,
  price,
  quantity,
  imageUrl,
  id,
}: CartItemProps) => {
  const { DeleteOrderItem } = useOrderContext();

  return (
    <div className="flex border items-center justify-between p-3 bg-white rounded-lg shadow">
      <div className="flex items-center space-x-4">
        <img
          src={imageUrl}
          alt={name}
          width={68}
          height={68}
          className="rounded-md max-w-[68px] aspect-square"
        />
        <div className="max-w-[180px]">
          <h4 className="font-medium text-ellipsis overflow-hidden whitespace-nowrap text-gray-900 capitalize ">
            {name}
          </h4>
          <p className="text-sm text-gray-500">
            ${price.toFixed(2)} x {quantity}
          </p>
        </div>
      </div>
      <Button
        onClick={() => {
          DeleteOrderItem(id);
        }}
        classes="p-2 text-gray-400 hover:text-gray-500"
      >
        <FaRegTrashAlt color="red" className="w-5 h-5" />
      </Button>
    </div>
  );
};
