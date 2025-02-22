import { useGetProductDetailsQuery } from '../services/product';
import ProductDetails from '../components/Product/Details';
import { FETCH_ERROR_MESSAGE } from '../constants/errorMessages';
import NotificationMessage from '../components/common/NotificationMessage';
import Loader from '../components/common/Loader';
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProduct } from '../store/slices/productDetailsSlice';

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { productId, page: searchProductPage } = useParams<{
    productId?: string;
    page?: string;
  }>();

  const productDetailsPage = productId ? Number(productId) : undefined;

  const { data, error, isFetching } = useGetProductDetailsQuery(
    productDetailsPage as number,
    {
      skip: !productDetailsPage,
    }
  );

  useEffect(() => {
    if (data) {
      dispatch(setProduct(data));
    }
  }, [data, dispatch]);

  const closeProductDetailsPage = () =>
    navigate(`/search/${searchProductPage}`);

  return (
    productDetailsPage && (
      <div className="w-1/2 relative bg-gray-100" data-testid="product-details">
        <button
          className="absolute top-4 right-6"
          onClick={closeProductDetailsPage}
        >
          Close
        </button>
        {isFetching ? (
          <Loader />
        ) : error ? (
          <NotificationMessage
            title={error as string | undefined}
            description={FETCH_ERROR_MESSAGE}
          />
        ) : (
          <ProductDetails />
        )}
      </div>
    )
  );
};

export default ProductDetailsPage;
