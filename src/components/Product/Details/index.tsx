import { useGetProductDetailsQuery } from '../../../services/product';
import ProductDetailsCard from './Card';
import { FETCH_ERROR_MESSAGE } from '../../../constants/errorMessages';
import NotificationMessage from '../../common/NotificationMessage';
import Loader from '../../common/Loader';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProduct } from '../../../store/slices/productDetailsSlice';
import { useRouter } from 'next/router';

const ProductDetails = () => {
  const router = useRouter();
  const { page, query, productId } = router.query;
  const dispatch = useDispatch();

  const productDetailsPage = productId ? Number(productId) : null;

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
    router.push(`/?query=${query}&page=${page}`, undefined, { shallow: true });

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
          <ProductDetailsCard />
        )}
      </div>
    )
  );
};

export default ProductDetails;
