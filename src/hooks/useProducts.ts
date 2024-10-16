import React, { useState } from "react";
import { ICategory, IProduct } from "../models";
import { collection, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthProvider";
import { db, storage } from "../firebase/firebase";
import Swal from "sweetalert2";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

export const useProducts = () => {
  const [file, setFile] = useState<File | null>(null);

  const { setLoading, credentials } = useAuth();

  const HandleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const CreateCategory = async (c: ICategory) => {
    try {
      setLoading(true);
      const newCategoryRef = doc(collection(db, "categories"));
      const newCategory = {
        ...c,
        name: c.name.toLowerCase(),
        uid: credentials?.uid,
      };
      await setDoc(newCategoryRef, {
        ...newCategory,
        id: newCategoryRef.id,
      });

      Swal.fire({
        title: "Category successfully added 😁",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const CreateProduct = async (e: IProduct) => {
    try {
      setLoading(true);

      const uploadedImageURL = await UploadImage();

      const newProductRef = doc(collection(db, "products"));
      const newProductId = newProductRef.id;

      const newProduct = {
        ...e,
        price: Number(e.price),
        image: uploadedImageURL,
        uid: credentials?.uid,
        id: newProductId,
      };

      await setDoc(newProductRef, newProduct);

      Swal.fire({
        title: "Product successfully added 😁",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Oops",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const UploadImage = async (): Promise<string | null> => {
    if (!file) return null;

    try {
      const refFile = ref(storage, `${credentials?.uid}/products/${file.name}`);
      await uploadBytes(refFile, file);
      const url = await getDownloadURL(refFile);
      return url;
    } catch (error) {
      console.log("Upload failed:", error);
      return null;
    }
  };

  const EditProduct = async (data: IProduct, id: string) => {
    try {
      setLoading(true);

      const productRef = doc(db, "products", id);
      const productSnap = await getDoc(productRef);
      const currentImageUrl = productSnap.exists()
        ? productSnap.data().image
        : null;

      const uploadedImageURL = file ? await UploadImage() : null;

      await setDoc(
        productRef,
        {
          ...data,
          price: Number(data.price),
          ...(uploadedImageURL && { image: uploadedImageURL }),
        },
        { merge: true }
      );

      if (uploadedImageURL && currentImageUrl) {
        await deleteObject(ref(storage, currentImageUrl));
      }

      Swal.fire({
        title: "Product successfully edited 😁",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error editing the product",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const DeleteProduct = async (id: string, imageUrl: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        setLoading(true);

        await deleteDoc(doc(db, "products", id));
        if (imageUrl) {
          await deleteObject(ref(storage, imageUrl));
        }

        Swal.fire({
          title: "Product successfully deleted 😁",
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error deleting the product",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const DeleteCategory = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        setLoading(true);

        await deleteDoc(doc(db, "categories", id));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    HandleFileChange,
    CreateCategory,
    CreateProduct,
    EditProduct,
    DeleteProduct,
    DeleteCategory,
  };
};
