import { useSelector } from 'react-redux';
import { selectedProductDetail } from '../../../store/selectors';

import Image from 'next/image';

const ProductDetailsCard = () => {
  const { productDetails } = useSelector(selectedProductDetail);

  if (!productDetails) return null;

  return (
    <div className="px-6 flex w-full">
      <div className="w-2/4 flex flex-col justify-center p-8">
        <p className="text-xl text-gray-900 mb-4">{productDetails.title}</p>
        <p className="text-sm text-gray-600 mb-4">
          {productDetails.description}
        </p>

        <div className="text-lg font-medium text-gray-800 mb-4">
          Price: ${productDetails.price.toFixed(2)}
        </div>
        <div className="text-sm text-gray-600 mb-2">
          <strong>Category:</strong> {productDetails.category}
        </div>
        <div className="text-sm text-gray-600 mb-2">
          <strong>Stock:</strong> {productDetails.stock} available
        </div>
        <div className="text-sm text-gray-600 mb-2">
          <strong>Rating:</strong> {productDetails.rating} stars
        </div>

        <div className="mt-6">
          <h4 className="font-medium text-gray-900">Warranty Information</h4>
          <p className="text-sm text-gray-600">
            {productDetails.warrantyInformation}
          </p>
        </div>

        <div className="mt-4">
          <h4 className="text-gray-900">Shipping Information</h4>
          <p className="text-sm text-gray-600">
            {productDetails.shippingInformation}
          </p>
        </div>

        <div className="mt-4">
          <h4 className="text-gray-900">Return Policy</h4>
          <p className="text-sm text-gray-600">{productDetails.returnPolicy}</p>
        </div>
      </div>
      <Image
        height="150"
        width="150"
        src={productDetails.images[0]}
        alt={productDetails.title}
        className="object-cover w-2/4 h-[65vh]"
      />
    </div>
  );
};

export default ProductDetailsCard;
