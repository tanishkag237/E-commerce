import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Star } from "lucide-react";
import { useSelector } from "react-redux";

const ProductsPage = () => {
  const { id } = useParams();
  const {data: products = [], isLoading, error} = useSelector((state)=>state.products);

  const product = products.find((prod) => prod.id === Number(id));
  const navigate = useNavigate()

  if (error)
    return (
      <div className="flex items-center justify-center h-[60vh] text-xl font-semibold text-gray-500">
        Product not found
      </div>
    );

  return (
    <div className="p-4">
       <button
        onClick={() => navigate(-1)}
        //  onClick={() => window.close()}
        className="mb-6 text-custom-wine hover:underline"
      >
        ← Back to Products
      </button>
      <div className=" flex justify-center items-center ">
     
      <div className="bg-white shadow-xl rounded-3xl max-w-5xl w-full grid md:grid-cols-2 gap-8 p-8">
      
        <div className="flex items-center justify-center bg-gray-100 rounded-2xl p-6">
          <img
            src={product.image}
            alt={product.title}
            className="h-72 object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <span className="inline-block bg-primary/20 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {product.category}
            </span>

            <h1 className="text-3xl font-bold text-gray-800">
              {product.title}
            </h1>

            {product?.rating?.rate && (
              <div className="flex items-center gap-2 mt-3">
                <Star size={18} className="text-yellow-500 fill-yellow-500" />
                <span className="text-sm text-gray-600">
                  {product.rating.rate} / 5
                </span>
              </div>
            )}

            <p className="mt-6 text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mt-8">
            <p className="text-3xl font-bold text-primary mb-4">
              $ {product.price}
            </p>

          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default ProductsPage;
