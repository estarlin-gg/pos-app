import { useForm } from "react-hook-form";
import { useProducts } from "../../hooks/useProducts";
import { Button } from "../Button";
import { Input } from "./Input";
import { ICategory } from "../../models";
import { Modal } from "../Modal";

export const CreateCategory = () => {
  const { CreateCategory } = useProducts();
  const { register, handleSubmit } = useForm<ICategory>();
  
  const onSubmit = (data: ICategory) => {
    CreateCategory(data);
  };
  
  return (
    <Modal title="Create Category">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="space-y-4">
          <label htmlFor="" className="block">
            Category Name:
          </label>
          <Input
            defaultValue={""}
            {...register("name", { maxLength: 12 })}
            type="text"
            classes="input-bordered border-2  w-full outline-2"
          />
        </div>
        <div className="">
          <Button classes="btn btn-primary w-full " text="Create" />
        </div>
      </form>
    </Modal>
  );
};
