import { TbCategory } from "react-icons/tb";
import { useProductsContext } from "../context/ProductsProvider";
import { Button } from "./Button";
import { useProducts } from "../hooks/useProducts";

interface FilterCategoryProps {
  classes?: string;
  mode?: "edit" | "menu" | null;
}

export const FilterCategory = ({ classes, mode }: FilterCategoryProps) => {
  const { categories, setCategory, products } = useProductsContext();
  const { DeleteCategory } = useProducts();

  const handleDeleteCategory = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    categoryId: string
  ) => {
    event.stopPropagation();
    DeleteCategory(categoryId);
  };

  return (
    <div className={`dropdown ${classes}`}>
      <div tabIndex={0} className="btn m-1 flex justify-between items-center">
        <TbCategory size={25} />
      </div>
      <ul
        tabIndex={0}
        className="flex flex-col gap-2 dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        <li
          onClick={() => setCategory("all")}
          className="w-full capitalize flex cursor-pointer justify-between items-center p-2 rounded-lg hover:bg-gray-400"
        >
          <span>All</span>
        </li>
        {categories.map((c) => (
          <li
            key={c.name}
            className="w-full capitalize flex justify-between items-center p-1 rounded-lg hover:bg-gray-400 cursor-pointer"
            onClick={() => setCategory(c.name)}
          >
            <span>
              {c.name}
              <span className="bg-blue-400 px-1 text-sm rounded ml-2">
                {
                  products.filter((product) => product.category === c.name)
                    .length
                }
              </span>
            </span>

            {mode === "edit" && (
              <Button
                classes="btn btn-xs btn-circle w-8 h-8 text-xs bg-red-500 text-white"
                text="x"
                onClick={(event) => handleDeleteCategory(event, c.id)}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
