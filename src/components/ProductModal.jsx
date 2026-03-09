import React, { useEffect, useState } from 'react'
// import { addProduct } from '../api/products.api'
import { X } from 'lucide-react'

const ProductModal = ({onProductAddition,selectedProduct, closeModal}) => {
    const [formData, setFormData]= useState({
        title:"",
        price:"",
        description:"",
        category:"",
        image:null,
    })

    const isEditMode = !!selectedProduct

    useEffect(()=>{
        if (selectedProduct) {
      setFormData({
        title: selectedProduct.title || "",
        price: selectedProduct.price || "",
        description: selectedProduct.description || "",
        category: selectedProduct.category || "",
        image: selectedProduct.image || "",
      });
    }
    },[selectedProduct])

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name] : e.target.value })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
        let productsToSend;
        if(isEditMode){
            productsToSend = {...formData, id:selectedProduct.id}
        } else{
            productsToSend = formData
        }
        onProductAddition(productsToSend,isEditMode)
        }
        catch (error) {
      console.log("Error creating product from modal", error);
    } finally {
      console.log("Product creation executed");
    }
    }

    
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
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Title
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="title"
            value={formData.title}
            placeholder="Enter title"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Price
          </label>
          <input
            onChange={handleChange}
            type="number"
            name="price"
            value={formData.price}
            placeholder="Enter price"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Description
          </label>
          <textarea
            onChange={handleChange}
            name="description"
            value={formData.description}
            placeholder="Enter description"
            rows="3"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Category
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="category"
            value={formData.category}
            placeholder="Enter category"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Image
          </label>
          <input
            onChange={handleChange}
            type="file"
            name="image"
            className="w-full text-sm"
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
}

export default ProductModal