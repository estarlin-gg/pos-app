import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IProductsContext } from "../models";
import { ICategory, IProduct } from "../models";
import { db } from "../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "./AuthProvider";

const Context = createContext<IProductsContext>({} as IProductsContext);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const { credentials } = useAuth();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredP, setFilteredP] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [category, setCategory] = useState("");
  const [modal, setModal] = useState<string | null>(null);
  const [editedProduct, setEditedProduct] = useState<IProduct>({} as IProduct);

  const CloseModal = () => {
    setModal(null);
    const resetProduct: IProduct = {
      id: "",
      name: "",
      price: 0,
      category: "",
      image: "",
    };
    setEditedProduct(resetProduct);
  };
  useEffect(() => {
    const getCategories = async () => {
      if (!credentials?.uid) return;

      const categoriesCollection = collection(db, "categories");
      const q = query(
        categoriesCollection,
        where("uid", "==", credentials.uid)
      );
      const docSnap = await getDocs(q);

      const categoriesData: ICategory[] = docSnap.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<ICategory, "id">),
      }));

      setCategories(categoriesData);
    };

    const getProducts = async () => {
      if (!credentials?.uid) return;

      const productsCollection = collection(db, "products");
      const q = query(productsCollection, where("uid", "==", credentials.uid));
      const docSnap = await getDocs(q);

      const productsData: IProduct[] = docSnap.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<IProduct, "id">),
      }));

      setProducts(productsData);
    };
    getCategories();
    getProducts();
  }, [credentials?.uid]);

  useEffect(() => {
    if (category === "" || category === "all") {
      setFilteredP(products);
      return;
    }
    const productFiltered = products.filter((p) => p.category === category);
    console.log(productFiltered);
    setFilteredP(productFiltered);
  }, [category, products]);

  return (
    <Context.Provider
      value={{
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
