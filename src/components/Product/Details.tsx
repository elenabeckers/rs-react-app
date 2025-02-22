import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const ProductDetails = () => {
  const product = useSelector(
    (state: RootState) => state.productDetails.product
  );

  if (!product) return null;

  return (
    <div className="px-6 flex w-full">
      <div className="w-2/4 flex flex-col justify-center p-8">
        <p className="text-xl text-gray-900 mb-4">{product.title}</p>
        <p className="text-sm text-gray-600 mb-4">{product.description}</p>

        <div className="text-lg font-medium text-gray-800 mb-4">
          Price: ${product.price.toFixed(2)}
        </div>
        <div className="text-sm text-gray-600 mb-2">
          <strong>Category:</strong> {product.category}
        </div>
        <div className="text-sm text-gray-600 mb-2">
          <strong>Stock:</strong> {product.stock} available
        </div>
        <div className="text-sm text-gray-600 mb-2">
          <strong>Rating:</strong> {product.rating} stars
        </div>

        <div className="mt-6">
          <h4 className="font-medium text-gray-900">Warranty Information</h4>
          <p className="text-sm text-gray-600">{product.warrantyInformation}</p>
        </div>

        <div className="mt-4">
          <h4 className="text-gray-900">Shipping Information</h4>
          <p className="text-sm text-gray-600">{product.shippingInformation}</p>
        </div>

        <div className="mt-4">
          <h4 className="text-gray-900">Return Policy</h4>
          <p className="text-sm text-gray-600">{product.returnPolicy}</p>
        </div>
      </div>
      <img
        height="150"
        width="150"
        src={product.images[0]}
        alt={product.title}
        className="object-cover w-2/4 h-[65vh]"
      />
    </div>
  );
};

export default ProductDetails;
