import React, { useEffect, useState, useMemo } from "react";
import ProductCard from "../../components/ProductCard";
import Search from "../../components/common/Search";
import { ChevronLeftIcon, ChevronRightIcon, Filter } from "lucide-react";
import { usePagination } from "../../hooks/usePagination";

import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsThunk } from "../../features/products/productSlice";
import PageNotFound from "../PageNotFound";
import SkeletonCard from "../../components/common/SkeletonCard";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const {
    data: products = [],
    isLoading,
    error,
  } = useSelector((state) => state.products);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isSorted, setIsSorted] = useState("default");

  useEffect(() => {
    if (!products || products?.length === 0) {
      dispatch(fetchProductsThunk());
    }
  }, [dispatch]);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map((p) => p.category))];
    return ["All", ...uniqueCategories];
  }, [products]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      const matchesSearch = (prod.title ?? "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        prod.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const sortedProducts = useMemo(() => {
    let newdata = [...filteredProducts];

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

    if (isSorted === "lowtohigh") {
      newdata.sort((a, b) => a.price - b.price);
    }

    if (isSorted === "hightolow") {
      newdata.sort((a, b) => b.price - a.price);
    }

    if (isSorted === "default") {
      newdata.sort((a, b) => a.id - b.id);
    }
    return newdata;
  }, [filteredProducts, isSorted]);

  const { currentData, currentPage, totalPages, nextPage, prevPage } =
    usePagination(sortedProducts, 5);

  if (isLoading)
    return (
      <div className="grid md:grid-cols-3 gap-10 p-2 md:p-5">
        <SkeletonCard />
      </div>
    );
  if (error) return <PageNotFound />;

  return (
    <div>
      <div className="m-2 md:flex mb-2 justify-end">
        <div className="flex mx-3 items-center gap-3">
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
            <option value="lowtohigh">Price Low → High</option>
            <option value="hightolow">Price High → Low</option>
          </select>
        </div>
        <Search onSearchChange={setSearchTerm} />

        <div className="flex bg-custom-wine p-2 rounded-4xl justify-between items-center text-center mx-2">
          <Filter size={15} className="text-white" />
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="text-white title text-sm outline-none focus:outline-none border-none focus:ring-0"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-10 p-2 md:p-5">
        {currentData.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
      <div className="flex justify-center gap-10  md:p-10">
        <button
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded 
      ${
        currentPage === 1
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-custom-wine text-white"
      }`}
          onClick={prevPage}
        >
          <ChevronLeftIcon />
        </button>
        <p className="text-custom-wine font-medium text-md text-center">
          {currentPage} / {totalPages}
        </p>
        <button
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded 
      ${
        currentPage === totalPages
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-custom-wine text-white"
      }`}
          onClick={nextPage}
        >
          <ChevronRightIcon />
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
