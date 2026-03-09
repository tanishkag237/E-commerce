import React, { useEffect, useMemo, useState } from "react";
import Table from "../../components/common/Table";
import { Edit, Trash2 } from "lucide-react";
import Loader from "../../components/common/Loader";
import { toast } from "sonner";
import Search from "../../components/common/Search";
import ProductModal from "../../components/ProductModal";
import { Link } from "react-router-dom";
import DeleteModal from "../../components/common/DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsThunk,
  addProductsThunk,
  updateProductsThunk,
  deleteProductsThunk,
} from "../../features/products/productSlice";

import PageNotFound from '../PageNotFound'

const productColumns = [
  { header: "ID", accessor: "id" },
  {
    header: "Title",
    accessor: "title",
    cell: (row) => (
      <Link
        className="text-gray-900 hover:underline truncate"
        to={`/admin/dashboard/${row.id}`}
      >
        {row.title.length > 55 ? row.title.slice(0, 55) + "..." : row.title}
      </Link>
    ),
  },
  { header: "Price ($)", accessor: "price" },
  {
    header: "Category",
    accessor: "category",
    cell: (row) => {
      const colors = [
        "bg-yellow-100 text-yellow-700",
        "bg-purple-100 text-purple-700",
        "bg-green-100 text-green-700",
        "bg-pink-100 text-pink-700",
        "bg-blue-100 text-blue-700",
        "bg-red-100 text-red-700",
      ];

      const color = colors[row.category.length % 6];

      return (
        <div
          className={`px-2 py-1 rounded-full text-center text-xs font-semibold ${color}`}
        >
          {row.category}
        </div>
      );
    },
  },
];

const ManageProducts = () => {
  const dispatch = useDispatch();
  const {
    data: products = [],
    isLoading,
    error,
  } = useSelector((state) => state.products);
  const [openProductModal, setOpenProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [deleteProduct, setDeleteProduct] = useState();
  const [isSorted, setIsSorted] = useState("default");

  useEffect(() => {
    if (!products || products?.length === 0) {
      dispatch(fetchProductsThunk());
      //console.log("data in manage prod: ", data)
    }
  }, [dispatch]);

  const sortedProducts = useMemo(() => {
    let newdata = [...products];
    //console.log("data in manage prod; ", newdata);

    if (isSorted === "asc") {
      newdata.sort((a, b) =>
        a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
      );
    }

    if (isSorted === "desc") {
      newdata.sort((a, b) =>
        b.title.toLowerCase().localeCompare(a.title.toLowerCase()),
      );
    }

    if (isSorted === "hightolow") {
      newdata.sort((a, b) => a.price - b.price);
    }

    if (isSorted === "lowtohigh") {
      newdata.sort((a, b) => b.price - a.price);
    }

    if (isSorted === "default") {
      newdata.sort((a, b) => a.id - b.id);
    }
    return newdata;
  }, [products, isSorted]);

  const handleProductAddition = async (newProduct, isEditMode) => {
    try {
      if (isEditMode) {
        await dispatch(
          updateProductsThunk({ id: newProduct.id, newData: newProduct }),
        ).unwrap();
        toast.success("Product updated successfully");
      } else {
        await dispatch(addProductsThunk(newProduct)).unwrap();
        toast.success("Product added successfully");
      }
      setOpenProductModal(false);
    } catch (err) {
      toast.error(err || "Something went wrong.");
    }
  };

  const handleProductDeletion = async(id) => {
    try{
      await dispatch(deleteProductsThunk(id)).unwrap()
      setDeleteProduct(null);
    } catch (err) {
      toast.error(err || "Something went wrong.");
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <PageNotFound/>

  return (
    <div className="m-3">
      <div className="flex p-3 justify-end gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-600">Sort By</span>

          <select
            value={isSorted}
            onChange={(e) => setIsSorted(e.target.value)}
            className="px-2 py-2 text-sm border border-gray-300 rounded-lg 
    bg-white shadow-sm focus:outline-none focus:ring-2 
    focus:ring-green-500 focus:border-green-500 
    cursor-pointer transition-all"
          >
            <option value="default">Default</option>
            <option value="asc">Title A → Z</option>
            <option value="desc">Title Z → A</option>
            <option value="hightolow">Price Low → High</option>
            <option value="lowtohigh">Price High → Low</option>
          </select>
        </div>
        <Search onSearchChange={""} />
        <button
          onClick={() => {
            (setOpenProductModal(true), setSelectedProduct(null));
          }}
          className="p-3 hover:bg-custom-green bg-green-600 text-white font-medium tracking-wide text-sm rounded-full "
        >
          Add Product
        </button>
      </div>

      {openProductModal && (
        <ProductModal
          closeModal={() => setOpenProductModal(false)}
          onProductAddition={handleProductAddition}
          selectedProduct={selectedProduct}
        />
      )}
      <div>
        <Table
          data={sortedProducts}
          columns={productColumns}
          action={(row) => (
            <div className="flex items-center gap-3">
              <button className=" px-2 hover:bg-green-100  py-2 rounded">
                <Edit
                  onClick={() => {
                    setOpenProductModal(true);
                    setSelectedProduct(row);
                  }}
                  size={15}
                  className="text-custom-green hover:text-green-500 "
                />
              </button>
              <button
                onClick={() => setDeleteProduct(row)}
                className=" px-2 hover:bg-red-100  py-2 rounded"
              >
                <Trash2 size={15} className="text-red-500 hover:text-red-500" />
              </button>
            </div>
          )}
        />
        {deleteProduct && (
          <DeleteModal
            deleteEntity={() => handleProductDeletion(deleteProduct.id)}
            title={deleteProduct.title}
            closeModal={() => setDeleteProduct(null)}
          />
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
