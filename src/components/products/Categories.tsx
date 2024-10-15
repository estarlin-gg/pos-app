import { useProductsContext } from "../../context/ProductsProvider";
import { CategoryItem } from "./CategoryItem";

interface CategoriesProps {
  mode: "edit" | null;
}

export const Categories = ({ mode }: CategoriesProps) => {
  const { categories } = useProductsContext();

  return (
    <div className=" rounded-lg z-10  hidden lg:block">
      <h2 className="text-2xl font-semibold block">Categories</h2>
      <div className="carousel z-0 gap-4 rounded-box py-2  px-2 w-full">
        <CategoryItem title={"all"} mode={mode} id={""} />
        {categories.map((c) => {
          return (
            <CategoryItem title={c.name} key={c.id} mode={mode} id={c.id} />
          );
        })}
      </div>
    </div>
  );
};
