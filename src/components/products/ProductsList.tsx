import { useProductsContext } from "../../context/ProductsProvider";
import { ProductCard } from "./ProductCard";

interface ProductsListProps {
  mode: "menu" | "edit";
  classes?: string;
}

export function ProductsList({ mode, classes }: ProductsListProps) {
  const { filteredP } = useProductsContext();

  return (
    <div
      className={`grid overflow-y-auto no-scrollbar pb-6 overflow-x-hidden max-h-[calc(100vh-170px)] lg:max-h-[calc(100vh-100px)]  ${classes}`}
    >
      {filteredP.map((product) => (
        <ProductCard
          key={product.id}
          category={product.category}
          image={product.image}
          price={product.price}
          name={product.name}
          id={product.id}
          mode={mode}
        />
      ))}
    </div>
  );
}
