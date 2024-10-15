import { Input } from "./Input";
import { useProducts } from "../../hooks/useProducts";
import { Button } from "../Button";
import { useForm } from "react-hook-form";
import { IProduct } from "../../models";
import { useProductsContext } from "../../context/ProductsProvider";
import { Modal } from "../Modal";

export const FormProduct = () => {
  const { HandleFileChange, CreateProduct, EditProduct } = useProducts();
  const { editedProduct, CloseModal } = useProductsContext();
  const { categories } = useProductsContext();
  const { register, handleSubmit } = useForm<IProduct>({
    defaultValues: editedProduct || {
      name: "",
      price: 0,
      category: "",
      image: "",
    },
  });

  const onSubmit = (data: IProduct) => {
    if (editedProduct && editedProduct.id) {
      EditProduct(data, editedProduct.id);
    } else {
      CreateProduct(data);
    }
  };

  return (
    <Modal title={editedProduct?.id ? "Edit Product" : "Create Product"}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="space-y-4">
          <label htmlFor="name" className="block">
            Product Name:
          </label>
          <Input
            defaultValue={editedProduct?.name || ""}
            id="name"
            {...register("name", { required: true, maxLength: 40 })}
            type="text"
            classes="input-bordered border-2 w-full outline-2"
          />
        </div>

        <div className="space-y-4">
          <label htmlFor="price" className="block">
            Product Price:
          </label>
          <Input
            defaultValue={editedProduct?.price || ""}
            id="price"
            {...register("price", { required: true })}
            type="number"
            classes="input-bordered border-2 w-full outline-2"
          />
        </div>

        <div className="space-y-4">
          <label htmlFor="category" className="block">
            Category:
          </label>
          <select
            defaultValue={editedProduct?.category || ""}
            className="select select-bordered border-2 w-full capitalize"
            {...register("category", { required: false })}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((c) => (
              <option value={c.name} key={c.id} className="capitalize">
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          <label htmlFor="image" className="block">
            Image:
          </label>
          <input
            id="image"
            type="file"
            onChange={HandleFileChange}
            className="file-input file-input-bordered w-full border-2"
          />
        </div>

        <div className="flex gap-4 items-center">
          <Button
            classes="btn btn-primary"
            text={editedProduct?.id ? "Edit" : "Create"}
          />
          <Button classes="btn btn-error" text="Cancel" onClick={CloseModal} />
        </div>
      </form>
    </Modal>
  );
};
