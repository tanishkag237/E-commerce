import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import FormInput from "./common/FormInput";

const ProductModal = ({ onProductAddition, selectedProduct, closeModal }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: null,
  });

  const isEditMode = !!selectedProduct;

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        title: selectedProduct.title || "",
        price: selectedProduct.price || "",
        description: selectedProduct.description || "",
        category: selectedProduct.category || "",
        image: selectedProduct.image || "",
      });
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let productsToSend;
      if (isEditMode) {
        productsToSend = { ...formData, id: selectedProduct.id };
      } else {
        productsToSend = formData;
      }
      onProductAddition(productsToSend, isEditMode);
    } catch (error) {
      console.log("Error creating product from modal", error);
    } finally {
      console.log("Product creation executed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-custom-wine mb-6 text-center">
          {isEditMode ? "Edit Product" : "Add Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <FormInput
              labelTitle="Title"
              placeholder="Enter Title"
              name="title"
              inputValue={formData.title}
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <FormInput
              labelTitle="Price"
              placeholder="Enter Price"
              name="price"
              type="number"
              inputValue={formData.price}
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <FormInput
              isTextArea
              labelTitle="Description"
              placeholder="Enter Description"
              name="description"
              type="number"
              inputValue={formData.description}
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <FormInput
              labelTitle="Category"
              placeholder="Enter Category"
              name="category"
              inputValue={formData.category}
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <FormInput
              labelTitle="Image"
              name="image"
              type="file"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-custom-wine transition"
          >
            {isEditMode ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
