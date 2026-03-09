import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductCard = ({ product }) => {
  const { role } = useSelector((state)=>state.auth);
  
  const basepath = role === "admin" ? "/admin/dashboard" : "/products";

  return (
    <Link to={`${basepath}/${product.id}`}>
      <div className="group p-4 shadow-lg hover:shadow-custom-wine bg-custom-bg/25 border-2 border-custom-wine/30 rounded-2xl h-96 flex flex-col transition-all duration-300 hover:-translate-y-1">
        <div className="overflow-hidden rounded-xl flex items-center justify-center bg-white p-4">
          <img
            className="h-60 object-contain transition-transform duration-500 group-hover:scale-105"
            src={product.image}
            alt={product.title}
          />
        </div>
        <div className="flex flex-col justify-between flex-1 mt-4">
          <div>
            <h2 className="font-semibold text-md text-primary line-clamp-1">
              {product.title}
            </h2>

            {/* <p className="text-sm text-black line-clamp-3 mt-2">
            {product.description}
          </p> */}
          </div>

          <div className="mt-3">
            {/* <h2 className="bg-primary/20 text-sm p-1 text-center rounded-2xl mb-3">
            {product.category}
          </h2> */}

            <div className="flex items-center justify-between">
              <p className="font-bold">${product.price}</p>
              {/* <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-full border border-gray-200 shadow-sm">
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium text-gray-700">
                  {product.rating.rate}
                </span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
