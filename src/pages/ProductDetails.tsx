import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Product } from '../services/product.types';
import { getProductDetails } from '../services/product';
import ProductDetails from '../components/Product/Details';
import {
  FETCH_ERROR_MESSAGE,
  NO_RESULTS_FOUND_MESSAGE,
  UNKNOWN_ERROR_MESSAGE,
} from '../constants/errorMessages';
import NotificationMessage from '../components/common/NotificationMessage';
import Loader from '../components/common/Loader';

const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (productId) {
        setIsLoading(true);
        try {
          const getProductDetailsResponse = await getProductDetails(
            Number(productId)
          );
          setProduct(getProductDetailsResponse);
        } catch (error) {
          setErrorMessage(
            error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE
          );
          setProduct(null);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchProductDetails();
  }, [productId]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : errorMessage ? (
        <NotificationMessage
          title={errorMessage}
          description={FETCH_ERROR_MESSAGE}
        />
      ) : !product ? (
        <NotificationMessage description={NO_RESULTS_FOUND_MESSAGE} />
      ) : (
        <ProductDetails product={product} />
      )}
    </>
  );
};

export default ProductDetailsPage;
