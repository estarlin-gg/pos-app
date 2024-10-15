import { IoAdd } from "react-icons/io5";
import { Button } from "../Button";
import { IoIosRemove } from "react-icons/io";

interface Props {
  count: number;
  handleAdd: () => void;
  handleRemove: () => void;
}

export const ProductCounter = ({ count, handleAdd, handleRemove }: Props) => {
  return (
    <div className="flex gap-2 items-center bg-gray-200 rounded-full p- justify-evenly w-full">
      <Button
        text=""
        onClick={handleRemove}
        classes="btn btn-circle text-lg bg-white "
      >
        <IoIosRemove color="black" />
      </Button>
      <span className="text-xl">{count}</span>

      <Button
        text=""
        onClick={handleAdd}
        classes="btn btn-circle text-lg bg-white "
      >
        <IoAdd color="black" />
      </Button>
    </div>
  );
};
