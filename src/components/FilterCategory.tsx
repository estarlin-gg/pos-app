import { TbCategory } from "react-icons/tb";
import { useProductsContext } from "../context/ProductsProvider";

interface FilterCategoryProps {
  classes?: string;
}

export const FilterCategory = ({ classes }: FilterCategoryProps) => {
  const { categories, setCategory } = useProductsContext();
  return (
    <div className={`dropdown ${classes} `}>
      <div tabIndex={0} className="btn m-1">
        <TbCategory size={25} />
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        <li onClick={() => setCategory("all")}>
          <span>All</span>
        </li>
        {categories.map((c) => (
          <li onClick={() => setCategory(c.name)}>
            <span>{c.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

{
  /* <div className="dropdown">
  <div tabIndex={0} role="button" className="btn m-1">Click</div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</div */
}
