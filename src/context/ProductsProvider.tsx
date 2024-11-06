import { createContext, ReactNode, useContext } from "react";
import { IProductsContext } from "../models";
import useFetchProducts from "../hooks/useFetchProducts";

const Context = createContext<IProductsContext>({} as IProductsContext);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const {
    products,
    filteredP,
    categories,
    setModal,
    modal,
    setEditedProduct,
    editedProduct,
    setCategory,
    CloseModal,
    handleSearch
  } = useFetchProducts();

  return (
    <Context.Provider
      value={{
        handleSearch,
        products,
        filteredP,
        categories,
        setModal,
        modal,
        setEditedProduct,
        editedProduct,
        setCategory,
        CloseModal,
      }}
    >
      {children}
    </Context.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProductsContext = () => useContext(Context);
