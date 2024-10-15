import { ReactNode } from "react";
import { Button } from "./Button";
import { useProductsContext } from "../context/ProductsProvider";

interface ModalProps {
  children?: ReactNode;
  title?: string;
}
export const Modal = ({ children, title }: ModalProps) => {
  const { CloseModal } = useProductsContext();

  return (
    <dialog className="modal no-scrollbar bg-black/60 " open>
      <div className="modal-box py-4">
        <div className="flex flex-row-reverse items-center justify-between border-b-2 py-2">
          <Button
            classes="btn btn-sm btn-circle btn-ghost "
            onClick={CloseModal}
          >
            ✕
          </Button>
          <h2 className="text-xl capitalize">{title}</h2>
        </div>

        <div className="mt-4">{children}</div>
      </div>
    </dialog>
  );
};
