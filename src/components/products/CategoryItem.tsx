// import { GrStatusUnknown } from "react-icons/gr";
import { Button } from "../Button";
import { useProductsContext } from "../../context/ProductsProvider";
import { useProducts } from "../../hooks/useProducts";

interface CategoryProps {
  title: string;
  // icon?: React.ReactNode;
  mode?: "edit" | null;
  id: string;
}
export const CategoryItem = ({
  title,
  // icon = <GrStatusUnknown />,
  mode,
  id,
}: CategoryProps) => {
  const { setCategory } = useProductsContext();
  const { DeleteCategory } = useProducts();

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    DeleteCategory(id);
  };

  return (
    <Button
      onClick={() => setCategory(title)}
      classes="btn-md flex z-0 relative items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
    >
      <div className=" text-left">
        <p className="text-xs md:text-sm font-medium text-gray-900 capitalize">
          {title}
        </p>
      </div>
      {mode === "edit" && title !== "all" && (
        <Button
          onClick={handleDeleteClick}
          classes="btn-circle p- text-xs w-5 h-5 bg-red-300 text-white absolute -right-4 -top-2 p-0 z-50"
          text="x"
        />
      )}
    </Button>
  );
};
