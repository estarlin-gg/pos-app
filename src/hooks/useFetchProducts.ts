import React, { useEffect, useState } from "react";
import { ICategory, IProduct } from "../models";
import { db } from "../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "../context/AuthProvider";

const useFetchProducts = () => {
  const { credentials } = useAuth();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredP, setFilteredP] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [category, setCategory] = useState("");
  const [modal, setModal] = useState<string | null>(null);
  const [editedProduct, setEditedProduct] = useState<IProduct>({} as IProduct);
  const [search, setSearch] = useState("");

  const CloseModal = () => {
    setModal(null);
    setEditedProduct({
      id: "",
      name: "",
      price: 0,
      category: "",
      image: "",
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
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
    let productFiltered = [...products];

    if (category && category !== "all") {
      productFiltered = productFiltered.filter((p) => p.category === category);
    }

    if (search) {
      productFiltered = productFiltered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredP(productFiltered);

    return () => {
      // setFilteredP([...products]);

    };
  }, [category, search, products]);

  return {
    products,
    filteredP,
    categories,
    setModal,
    modal,
    setEditedProduct,
    editedProduct,
    setCategory,
    CloseModal,
    handleSearch,
  };
};

export default useFetchProducts;
